import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
// Switched from 'edge' to Node.js runtime: Node.js IPs are not blocked by some IPTV CDNs
// that firewall Vercel's edge network. Node.js = 10s on Hobby (sufficient for HLS segments).

// ─── Constants ────────────────────────────────────────────────────────────────

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Range, Content-Type',
  'Access-Control-Expose-Headers': 'Content-Length, Content-Range, Content-Type',
};

// Try these UAs in order on 403. CDNs differ in what they block/allow.
const UA_LIST = [
  // VLC — IPTV servers most commonly whitelist VLC UAs (same as what the user uses)
  'VLC/3.0.21 LibVLC/3.0.21',
  // Modern Chrome desktop
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  // Mobile Safari — IPTV CDNs often whitelist iOS
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
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

  // The source server's own origin — used as Referer for Referer-gated servers
  const srcOrigin = `${parsed.protocol}//${parsed.host}`;

  // Root registrable domain (e.g. ztnr.rtve.es → rtve.es) — broadcasters like RTVE
  // require their human-facing domain as Referer, not the CDN subdomain.
  const rootDomain = parsed.hostname.split('.').slice(-2).join('.');
  const rootOrigin = `${parsed.protocol}//${rootDomain}`;

  // Headers without Referer (mimics VLC / native players — most permissive)
  const buildHeadersClean = (ua: string): Record<string, string> => ({
    'User-Agent': ua,
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'identity',
    ...(clientIp && { 'X-Forwarded-For': clientIp, 'X-Real-IP': clientIp }),
    ...(range && { 'Range': range }),
  });

  // Headers with source CDN subdomain as Referer
  const buildHeadersSrcRef = (ua: string): Record<string, string> => ({
    ...buildHeadersClean(ua),
    'Referer': srcOrigin + '/',
    'Origin': srcOrigin,
  });

  // Headers with root domain as Referer (e.g. rtve.es for ztnr.rtve.es CDN)
  const buildHeadersRootRef = (ua: string): Record<string, string> => ({
    ...buildHeadersClean(ua),
    'Referer': `https://www.${rootDomain}/`,
    'Origin': `https://www.${rootDomain}`,
  });

  // Headers with our own domain as Referer (last resort)
  const buildHeaders = (ua: string): Record<string, string> => ({
    ...buildHeadersClean(ua),
    'Referer': 'https://sportalive.live/',
    'Origin': 'https://sportalive.live',
  });

  // ── Fetch with retry strategy ──────────────────────────────────────────────
  //
  // Order (stop at first non-403 response):
  //   1. No Referer — mimics VLC; works on servers that block unknown Referers
  //   2. Source CDN as Referer
  //   3. Root domain as Referer (e.g. rtve.es) — for broadcast CDNs
  //   4. HTTPS upgrade
  //   5. Relay through IPTV origin server

  let res: Response | null = null;

  // Vercel Hobby functions have a 10s max. Keep total retry budget under 8s.
  // VLC UA is now first — IPTV servers typically whitelist it like end-user players.
  try {
    // ── Fast parallel probe: try VLC + Chrome UA simultaneously ─────────────
    const [vlcRes, chromeRes] = await Promise.allSettled([
      upstream(rawUrl, buildHeadersClean(UA_LIST[0]), 7_000),
      upstream(rawUrl, buildHeadersClean(UA_LIST[1]), 7_000),
    ]);
    for (const r of [vlcRes, chromeRes]) {
      if (r.status === 'fulfilled' && r.value.status !== 403 && r.value.status !== 401) {
        res = r.value; break;
      }
    }

    if (!res) {
      // ── Sequential fallback: try with Referer headers ─────────────────────
      for (const ua of UA_LIST) {
        // Source CDN Referer
        const srcRef = await upstream(rawUrl, buildHeadersSrcRef(ua), 5_000).catch(() => null);
        if (srcRef && srcRef.status !== 403 && srcRef.status !== 401) { res = srcRef; break; }

        // Root domain Referer
        if (rootOrigin !== srcOrigin) {
          const rootRef = await upstream(rawUrl, buildHeadersRootRef(ua), 5_000).catch(() => null);
          if (rootRef && rootRef.status !== 403 && rootRef.status !== 401) { res = rootRef; break; }
        }
      }
    }

    // ── Relay through IPTV origin server ──────────────────────────────────
    // Also relay when CDN returns 404 — CDN may IP-lock Vercel but goattv.store
    // can re-issue a fresh token redirect for the same path.
    if ((!res || res.status === 404) && relayOrigin) {
      const relayUrl = relayOrigin + parsed.pathname + parsed.search;
      const relayed = await upstream(relayUrl, buildHeadersClean(UA_LIST[0]), 5_000).catch(() => null);
      if (relayed?.ok) res = relayed;
    }

    // All strategies exhausted — one final attempt to get proper error response
    if (!res) {
      res = await upstream(rawUrl, buildHeadersClean(UA_LIST[0]), 5_000);
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
          // Browser revalidates each poll; Vercel's edge coalesces concurrent
          // viewers onto one upstream fetch for ~2s (only cache successful
          // manifests — never cache an error body).
          'Cache-Control': 'no-cache',
          ...(res.ok && { 'CDN-Cache-Control': 'public, s-maxage=2, stale-while-revalidate=4' }),
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
