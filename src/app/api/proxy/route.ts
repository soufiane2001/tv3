import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge'; // 30s limit needed for segment streaming; Node.js = 10s on Hobby

// ─── Constants ────────────────────────────────────────────────────────────────

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Range, Content-Type',
  'Access-Control-Expose-Headers': 'Content-Length, Content-Range, Content-Type',
};

// Try these UAs in order on 403. CDNs differ in what they block/allow.
const UA_LIST = [
  // Modern Chrome desktop — most permissive CDN whitelist
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  // Mobile Safari — IPTV CDNs often whitelist iOS as end-user device
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
  // Android Chrome
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
];

// Block SSRF: loopback, private, link-local ranges
const PRIVATE_RE = [
  /^localhost$/i,
  /^127\./,
  /^0\.0\.0\.0$/,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[01])\./,
  /^192\.168\./,
  /^169\.254\./,
  /^::1$/,
  /^fc00:/i,
  /^fe80:/i,
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isPrivate(hostname: string): boolean {
  return PRIVATE_RE.some(r => r.test(hostname));
}

function isM3u8(url: string, ct: string): boolean {
  if (ct.includes('mpegurl') || ct.includes('x-mpegurl')) return true;
  const path = url.split('?')[0].toLowerCase();
  return path.endsWith('.m3u8') || path.endsWith('.m3u');
}

function rewriteM3u8(
  text: string,
  baseUrl: string,
  proxyBase: string,
  relayParam: string,
): string {
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

async function upstream(
  url: string,
  headers: Record<string, string>,
  timeoutMs: number,
): Promise<Response> {
  return fetch(url, {
    headers,
    signal: AbortSignal.timeout(timeoutMs),
    redirect: 'follow',
  });
}

// ─── Route handlers ───────────────────────────────────────────────────────────

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const rawUrl = sp.get('url');
  const relayRaw = sp.get('relay'); // IPTV origin server base — used as 403 fallback

  // ── Validate primary URL ───────────────────────────────────────────────────
  if (!rawUrl) {
    return new Response('Missing url parameter', { status: 400, headers: CORS });
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return new Response('Invalid URL', { status: 400, headers: CORS });
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return new Response('Only http/https allowed', { status: 400, headers: CORS });
  }

  if (isPrivate(parsed.hostname)) {
    return new Response('Host not allowed', { status: 403, headers: CORS });
  }

  // ── Validate relay ─────────────────────────────────────────────────────────
  let relayOrigin: string | null = null;
  if (relayRaw) {
    try {
      const r = new URL(relayRaw);
      if (['http:', 'https:'].includes(r.protocol) && !isPrivate(r.hostname)) {
        relayOrigin = r.origin; // e.g. "http://goat2027.alwanvipsaw.store:80"
      }
    } catch {
      // ignore invalid relay
    }
  }

  // ── Build request headers ──────────────────────────────────────────────────
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const range = req.headers.get('range');

  const buildHeaders = (ua: string): Record<string, string> => ({
    'User-Agent': ua,
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'identity',        // keep binary data uncompressed
    'Referer': 'https://sportalive.live/',
    'Origin': 'https://sportalive.live',
    ...(clientIp && { 'X-Forwarded-For': clientIp, 'X-Real-IP': clientIp }),
    ...(range && { 'Range': range }),
  });

  // ── Fetch with retry strategy ──────────────────────────────────────────────
  //
  // Strategy (in order, stop at first success):
  //   1. Direct fetch with each UA in UA_LIST
  //   2. On 403: try HTTPS upgrade (some CDNs allow HTTPS but block HTTP)
  //   3. On 403: relay through IPTV origin server (same path, different host)
  //
  // Why relay works: goat2027.alwanvipsaw.store does NOT block Vercel IPs.
  // The CDN (95.179.178.148) does. If the IPTV server has the segment at the
  // same path, routing through it bypasses the CDN block entirely.

  let res: Response | null = null;

  try {
    for (const ua of UA_LIST) {
      const h = buildHeaders(ua);

      // 1. Direct
      const direct = await upstream(rawUrl, h, 20_000);
      if (direct.status !== 403 && direct.status !== 401) {
        res = direct;
        break;
      }

      // 2. HTTPS upgrade (if currently HTTP)
      if (parsed.protocol === 'http:') {
        const httpsUrl = rawUrl.replace(/^http:\/\//, 'https://');
        try {
          const secure = await upstream(httpsUrl, h, 10_000);
          if (secure.ok) { res = secure; break; }
        } catch { /* HTTPS not supported by CDN — continue */ }
      }

      // 3. Relay: same path through the IPTV origin server
      if (relayOrigin) {
        const relayUrl = relayOrigin + parsed.pathname + parsed.search;
        try {
          const relayed = await upstream(relayUrl, h, 20_000);
          if (relayed.ok) { res = relayed; break; }
        } catch { /* relay unreachable — continue */ }
      }
    }

    // All strategies exhausted — do one clean fetch to get proper error response
    if (!res) {
      res = await upstream(rawUrl, buildHeaders(UA_LIST[0]), 10_000);
    }

    const ct = res.headers.get('content-type') ?? '';
    const finalUrl = res.url || rawUrl;

    // ── M3U8 playlist: rewrite all URLs through this proxy ─────────────────
    if (isM3u8(rawUrl, ct) || isM3u8(finalUrl, ct)) {
      const text = await res.text();
      const baseUrl = finalUrl.substring(0, finalUrl.lastIndexOf('/') + 1);
      const proxyBase = `${req.nextUrl.origin}/api/proxy?url=`;
      // Carry the relay param forward so nested playlists + segments can also retry
      const relayParam = relayOrigin ? `&relay=${encodeURIComponent(relayOrigin)}` : '';
      const rewritten = rewriteM3u8(text, baseUrl, proxyBase, relayParam);

      return new Response(rewritten, {
        status: res.ok ? 200 : res.status,
        headers: {
          'Content-Type': 'application/vnd.apple.mpegurl',
          'Cache-Control': 'no-cache, no-store',
          ...CORS,
        },
      });
    }

    // ── Binary (TS segments, key files, init segments) ─────────────────────
    const respHeaders: Record<string, string> = {
      'Content-Type': ct || 'video/MP2T',
      // Only cache successful responses — never cache error codes
      'Cache-Control': res.ok ? 'public, s-maxage=30, max-age=30' : 'no-store',
      ...CORS,
    };

    const cl = res.headers.get('content-length');
    if (cl) respHeaders['Content-Length'] = cl;

    const cr = res.headers.get('content-range');
    if (cr) respHeaders['Content-Range'] = cr;

    return new Response(res.body, { status: res.status, headers: respHeaders });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[proxy] ${rawUrl} → ${msg}`);
    return new Response(`Proxy error: ${msg}`, { status: 502, headers: CORS });
  }
}
