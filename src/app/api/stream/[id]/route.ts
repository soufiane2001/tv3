import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

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
const URL_CACHE_TTL = 5 * 60_000;

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

// Public broadcaster CDNs that have open CORS and allow residential IPs.
// For these, we return the manifest with absolute (non-proxied) URLs so the
// browser fetches segments directly with the user's residential IP — same as VLC.
function isPublicCdn(hostname: string): boolean {
  return (
    hostname.endsWith('.rtve.es') ||
    hostname.endsWith('.cloudfront.net') ||
    hostname.endsWith('.akamaized.net') ||
    hostname.endsWith('.akamaihd.net') ||
    hostname.endsWith('.fastly.net') ||
    hostname.endsWith('.llnwd.net')
  );
}

// Resolve relative URLs to absolute without proxying — for public CDN streams.
function makeAbsoluteM3u8(text: string, baseUrl: string): string {
  return text.split('\n').map(line => {
    const t = line.trim();
    if (!t) return line;
    if (t.startsWith('#') && t.includes('URI="')) {
      return line.replace(/URI="([^"]+)"/g, (_, uri) => {
        const abs = uri.startsWith('http') ? uri : new URL(uri, baseUrl).href;
        return `URI="${abs}"`;
      });
    }
    if (!t.startsWith('#')) {
      return t.startsWith('http') ? t : new URL(t, baseUrl).href;
    }
    return line;
  }).join('\n');
}

// Rewrite M3U8 playlist: proxy all URLs, carry relay base so /api/proxy can
// fall back to the IPTV origin server when the CDN returns 403.
function rewriteM3u8(
  text: string,
  baseUrl: string,
  proxyBase: string,
  relayBase: string,   // e.g. "http://goat2027.alwanvipsaw.store:80"
): string {
  const relayParam = `&relay=${encodeURIComponent(relayBase)}`;

  return text.split('\n').map(line => {
    const t = line.trim();
    if (!t) return line;

    // Rewrite URI="…" inside tag attributes (EXT-X-KEY, EXT-X-MAP, …)
    if (t.startsWith('#') && t.includes('URI="')) {
      return line.replace(/URI="([^"]+)"/g, (_, uri) => {
        const abs = uri.startsWith('http') ? uri : new URL(uri, baseUrl).href;
        return `URI="${proxyBase}${encodeURIComponent(abs)}${relayParam}"`;
      });
    }

    // Non-comment lines = segment / sub-playlist URLs
    if (!t.startsWith('#')) {
      const abs = t.startsWith('http') ? t : new URL(t, baseUrl).href;
      return `${proxyBase}${encodeURIComponent(abs)}${relayParam}`;
    }

    return line;
  }).join('\n');
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const raw = await getStreamUrl(id);
    if (!raw) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const upstream = toHlsUrl(raw);

    // Extract the IPTV origin base (protocol + host) to use as relay fallback.
    // When the CDN (e.g. 95.179.178.148) blocks Vercel IPs with 403, the proxy
    // will retry the same path through this origin server instead.
    let relayBase: string;
    try {
      const u = new URL(upstream);
      relayBase = `${u.protocol}//${u.host}`;
    } catch {
      relayBase = '';
    }

    // Try fetching manifest with progressively more permissive headers.
    // Some CDNs/S3 buckets check Referer; try without first, then with source host.
    let res = await fetch(upstream, {
      headers: { 'User-Agent': UA, 'Accept': '*/*' },
      signal: AbortSignal.timeout(12_000),
      redirect: 'follow',
    });

    // On 403: retry with the source site as Referer (S3 bucket policy may require it)
    if (res.status === 403) {
      try {
        const srcOrigin = `${new URL(upstream).protocol}//${new URL(upstream).hostname}`;
        res = await fetch(upstream, {
          headers: {
            'User-Agent': UA,
            'Accept': '*/*',
            'Referer': srcOrigin + '/',
            'Origin': srcOrigin,
          },
          signal: AbortSignal.timeout(10_000),
          redirect: 'follow',
        });
      } catch { /* ignore retry error, fall through to original response */ }
    }

    if (!res.ok) {
      console.error(`[stream/${id}] upstream ${res.status}: ${upstream}`);
      return NextResponse.json(
        { error: 'Stream unavailable', status: res.status, url: upstream },
        { status: 502 },
      );
    }

    const ct = res.headers.get('content-type') ?? '';
    const proxyBase = `${req.nextUrl.origin}/api/proxy?url=`;
    const isM3u8 = ct.includes('mpegurl') || upstream.split('?')[0].endsWith('.m3u8');

    if (isM3u8) {
      const text = await res.text();
      const finalUrl = res.url || upstream;
      const baseUrl = finalUrl.substring(0, finalUrl.lastIndexOf('/') + 1);

      // Public CDNs (RTVE, CloudFront, Akamai…): return manifest with absolute
      // URLs but WITHOUT proxy rewriting. The browser fetches segments directly
      // from its own residential IP — CORS is open on these CDNs, and the CDN
      // allows residential IPs (same as VLC). Avoids Vercel datacenter IP blocks.
      const upstreamHost = new URL(finalUrl).hostname;
      if (isPublicCdn(upstreamHost)) {
        const absolute = makeAbsoluteM3u8(text, baseUrl);
        return new Response(absolute, {
          headers: {
            'Content-Type': 'application/vnd.apple.mpegurl',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache, no-store',
          },
        });
      }

      const rewritten = rewriteM3u8(text, baseUrl, proxyBase, relayBase);
      return new Response(rewritten, {
        headers: {
          'Content-Type': 'application/vnd.apple.mpegurl',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache, no-store',
        },
      });
    }

    // Direct TS stream (rare — Xtream Codes usually returns HLS)
    return new Response(res.body, {
      headers: {
        'Content-Type': ct || 'video/MP2T',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err: any) {
    const isTimeout = err?.name === 'AbortError' || err?.name === 'TimeoutError';
    console.error('[stream] error:', err);
    return NextResponse.json(
      { error: isTimeout ? 'Stream timeout — server unreachable' : String(err) },
      { status: 502 },
    );
  }
}
