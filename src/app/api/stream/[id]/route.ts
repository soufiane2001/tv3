import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36';

// Convert bare Xtream-Codes TS stream URLs to HLS on the fly
function toHlsUrl(url: string): string {
  if (/\.(m3u8|ts|mp4|mkv)(\?.*)?$/i.test(url)) return url;
  if (/\/live\/[^/]+\/[^/]+\/\d+$/.test(url) || /\/[^/]+\/[^/]+\/\d+$/.test(url)) {
    return url + '.m3u8';
  }
  return url;
}

// In-memory cache for channel URL lookups — warm within the same serverless instance
// so repeated manifest refreshes (every 2-6s for live streams) skip the DB call
const urlCache = new Map<string, { url: string; ts: number }>();
const URL_CACHE_TTL = 5 * 60_000; // 5 minutes

async function getStreamUrl(id: string): Promise<string | null> {
  const cached = urlCache.get(id);
  if (cached && Date.now() - cached.ts < URL_CACHE_TTL) return cached.url;

  const channel = await prisma.channel.findFirst({
    where: { OR: [{ id }, { slug: id }], isActive: true },
    select: { streamUrl: true },
  });

  if (channel?.streamUrl) {
    urlCache.set(id, { url: channel.streamUrl, ts: Date.now() });
    return channel.streamUrl;
  }
  return null;
}

function rewriteM3u8(text: string, baseUrl: string, proxyBase: string): string {
  return text.split('\n').map(line => {
    const t = line.trim();
    if (!t) return line;

    // Rewrite URI="..." inside tags (EXT-X-KEY, EXT-X-MAP, etc.)
    if (t.startsWith('#') && t.includes('URI="')) {
      return line.replace(/URI="([^"]+)"/g, (_, uri) => {
        const full = uri.startsWith('http') ? uri : new URL(uri, baseUrl).href;
        return `URI="${proxyBase}${encodeURIComponent(full)}"`;
      });
    }

    if (!t.startsWith('#')) {
      const full = t.startsWith('http') ? t : new URL(t, baseUrl).href;
      return proxyBase + encodeURIComponent(full);
    }
    return line;
  }).join('\n');
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // DB lookup with cache — must finish fast (Vercel Hobby: 10s limit)
    const raw = await getStreamUrl(id);
    if (!raw) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    // Auto-upgrade bare TS stream URLs to HLS
    const upstream = toHlsUrl(raw);

    // Keep upstream fetch well under Vercel's 10s serverless limit
    const res = await fetch(upstream, {
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(7_000),
    });

    if (!res.ok) return NextResponse.json({ error: 'Stream unavailable' }, { status: 502 });

    const ct = res.headers.get('content-type') ?? '';
    const proxyBase = `${req.nextUrl.origin}/api/proxy?url=`;
    const isM3u8 = ct.includes('mpegurl') || upstream.split('?')[0].endsWith('.m3u8');

    if (isM3u8) {
      const text = await res.text();
      // Use the final URL (after redirects) as base for relative paths
      const finalUrl = res.url || upstream;
      const baseUrl = finalUrl.substring(0, finalUrl.lastIndexOf('/') + 1);
      const rewritten = rewriteM3u8(text, baseUrl, proxyBase);
      return new Response(rewritten, {
        headers: {
          'Content-Type': 'application/vnd.apple.mpegurl',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache, no-store',
        },
      });
    }

    // Direct TS stream (uncommon but handle it)
    return new Response(res.body, {
      headers: {
        'Content-Type': ct || 'video/MP2T',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
