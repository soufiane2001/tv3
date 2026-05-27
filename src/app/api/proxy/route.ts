import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

function rewriteM3u8(text: string, baseUrl: string, proxyBase: string): string {
  return text.split('\n').map(line => {
    const t = line.trim();
    if (!t || t.startsWith('#')) return line;
    const full = t.startsWith('http') ? t : new URL(t, baseUrl).href;
    return proxyBase + encodeURIComponent(full);
  }).join('\n');
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return new Response('Missing url', { status: 400 });

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(25_000),
    });

    const ct = res.headers.get('content-type') ?? '';

    // Rewrite nested M3U8 manifests (variant playlists)
    if (ct.includes('mpegurl') || url.includes('.m3u8')) {
      const text = await res.text();
      const baseUrl = url.substring(0, url.lastIndexOf('/') + 1);
      const proxyBase = `${req.nextUrl.origin}/api/proxy?url=`;
      const rewritten = rewriteM3u8(text, baseUrl, proxyBase);
      return new Response(rewritten, {
        headers: { 'Content-Type': 'application/vnd.apple.mpegurl', 'Cache-Control': 'no-cache', ...CORS },
      });
    }

    // TS segments and other binary content — stream directly
    return new Response(res.body, {
      status: res.status,
      headers: {
        'Content-Type': ct || 'video/MP2T',
        'Cache-Control': 'no-cache',
        ...CORS,
      },
    });
  } catch (err) {
    return new Response(String(err), { status: 502, headers: CORS });
  }
}
