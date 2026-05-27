import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

// Browser UA — IPTV CDNs allow browser requests; VLC/curl UAs are often blocked
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Range',
  'Access-Control-Expose-Headers': 'Content-Length, Content-Range',
};

// Rewrite all URLs in M3U8 (segments, nested playlists, keys, init segments)
function rewriteM3u8(text: string, baseUrl: string, proxyBase: string): string {
  return text.split('\n').map(line => {
    const t = line.trim();
    if (!t) return line;

    // Rewrite URI="..." inside tags like EXT-X-KEY, EXT-X-MAP
    if (t.startsWith('#') && t.includes('URI="')) {
      return line.replace(/URI="([^"]+)"/g, (_, uri) => {
        const full = uri.startsWith('http') ? uri : new URL(uri, baseUrl).href;
        return `URI="${proxyBase}${encodeURIComponent(full)}"`;
      });
    }

    // Non-comment lines are segment/playlist URLs
    if (!t.startsWith('#')) {
      const full = t.startsWith('http') ? t : new URL(t, baseUrl).href;
      return proxyBase + encodeURIComponent(full);
    }

    return line;
  }).join('\n');
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return new Response('Missing url', { status: 400, headers: CORS });

  try {
    const fetchHeaders: Record<string, string> = {
      'User-Agent': UA,
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'identity',  // no compression — stream binary as-is
      'Referer': 'https://sportalive.live/',
    };

    // Forward client's real IP — some CDNs bind stream tokens to the viewer's IP
    const xfwd = req.headers.get('x-forwarded-for');
    const clientIp = xfwd ? xfwd.split(',')[0].trim() : null;
    if (clientIp) {
      fetchHeaders['X-Forwarded-For'] = clientIp;
      fetchHeaders['X-Real-IP'] = clientIp;
    }

    // Forward Range header so byte-range HLS streams work
    const range = req.headers.get('range');
    if (range) fetchHeaders['Range'] = range;

    const res = await fetch(url, {
      headers: fetchHeaders,
      signal: AbortSignal.timeout(28_000),
      redirect: 'follow',
    });

    const ct = res.headers.get('content-type') ?? '';
    const isM3u8 = ct.includes('mpegurl') || url.split('?')[0].endsWith('.m3u8');

    // ── M3U8 manifest: rewrite all URLs through proxy ──────────────────
    if (isM3u8) {
      const text = await res.text();
      const baseUrl = res.url.substring(0, res.url.lastIndexOf('/') + 1);
      const proxyBase = `${req.nextUrl.origin}/api/proxy?url=`;
      const rewritten = rewriteM3u8(text, baseUrl, proxyBase);
      return new Response(rewritten, {
        headers: {
          'Content-Type': 'application/vnd.apple.mpegurl',
          'Cache-Control': 'no-cache, no-store',
          ...CORS,
        },
      });
    }

    // ── TS segments / binary ───────────────────────────────────────────
    const respHeaders: Record<string, string> = {
      'Content-Type': ct || 'video/MP2T',
      // Only cache successful segments; never cache error responses
      'Cache-Control': res.ok ? 'public, s-maxage=30, max-age=30' : 'no-store',
      ...CORS,
    };

    const contentLength = res.headers.get('content-length');
    if (contentLength) respHeaders['Content-Length'] = contentLength;

    const contentRange = res.headers.get('content-range');
    if (contentRange) respHeaders['Content-Range'] = contentRange;

    return new Response(res.body, {
      status: res.status,
      headers: respHeaders,
    });
  } catch (err) {
    return new Response(String(err), { status: 502, headers: CORS });
  }
}
