import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36';

function rewriteM3u8(text: string, baseUrl: string, proxyBase: string): string {
  return text.split('\n').map(line => {
    const t = line.trim();
    if (!t || t.startsWith('#')) return line;
    const full = t.startsWith('http') ? t : new URL(t, baseUrl).href;
    return proxyBase + encodeURIComponent(full);
  }).join('\n');
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const channel = await prisma.channel.findFirst({
      where: { OR: [{ id }, { slug: id }], isActive: true },
      select: { streamUrl: true },
    });

    if (!channel) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const upstream = channel.streamUrl;
    const res = await fetch(upstream, {
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) return NextResponse.json({ error: 'Stream unavailable' }, { status: 502 });

    const ct = res.headers.get('content-type') ?? '';
    const proxyBase = `${req.nextUrl.origin}/api/proxy?url=`;

    if (ct.includes('mpegurl') || upstream.includes('.m3u8')) {
      const text = await res.text();
      const baseUrl = upstream.substring(0, upstream.lastIndexOf('/') + 1);
      const rewritten = rewriteM3u8(text, baseUrl, proxyBase);
      return new Response(rewritten, {
        headers: {
          'Content-Type': 'application/vnd.apple.mpegurl',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache, no-store',
        },
      });
    }

    // Non-M3U8 (direct TS or other): stream through
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
