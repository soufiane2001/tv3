import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// VLC UA first — IPTV servers often whitelist it; Chrome as fallback
const UA_VLC    = 'VLC/3.0.21 LibVLC/3.0.21';
const UA_CHROME = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const UA        = UA_VLC;

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

// Known public CDNs with open CORS — always bypass proxy for these.
function isPublicCdn(hostname: string): boolean {
  return (
    hostname.endsWith('.cloudfront.net') ||
    hostname.endsWith('.akamaized.net') ||
    hostname.endsWith('.akamaihd.net') ||
    hostname.endsWith('.fastly.net') ||
    hostname.endsWith('.llnwd.net') ||
    // French public/commercial broadcasters
    hostname.endsWith('.m6web.fr') ||
    hostname.endsWith('.m6cdn.fr') ||
    hostname.endsWith('.6play.fr') ||
    hostname.endsWith('.ftven.fr') ||
    hostname.endsWith('.france.tv') ||
    hostname.endsWith('.tf1.fr')
  );
}

// Dynamic CORS detection: if upstream explicitly allows cross-origin requests,
// let the browser fetch segments directly (user's residential IP = same as VLC).
// This bypasses Vercel IP blocks on IPTV servers without any header tricks.
function hasCorsOpen(res: Response): boolean {
  const acao = res.headers.get('access-control-allow-origin');
  return acao !== null; // '*' or specific origin — either way browser can fetch
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

    // Parallel probe: try VLC UA and Chrome UA simultaneously (Vercel 10s budget)
    const fetchWith = (ua: string, extra?: Record<string, string>) =>
      fetch(upstream, {
        headers: { 'User-Agent': ua, 'Accept': '*/*', 'Accept-Encoding': 'identity', ...extra },
        signal: AbortSignal.timeout(7_000),
        redirect: 'follow',
      }).catch(() => null);

    let res: Response | null = null;
    const [r1, r2] = await Promise.all([fetchWith(UA_VLC), fetchWith(UA_CHROME)]);
    for (const r of [r1, r2]) {
      if (r && r.status !== 403 && r.status !== 401) { res = r; break; }
    }

    // On 403: try Referer strategies (sequential, short timeouts)
    if (!res) {
      const srcOrigin = `${new URL(upstream).protocol}//${new URL(upstream).hostname}`;
      const rootDomain = new URL(upstream).hostname.split('.').slice(-2).join('.');

      const refererCandidates = [
        { 'User-Agent': UA_VLC,    'Referer': srcOrigin + '/',              'Origin': srcOrigin },
        { 'User-Agent': UA_VLC,    'Referer': `https://www.${rootDomain}/`, 'Origin': `https://www.${rootDomain}` },
        { 'User-Agent': UA_CHROME, 'Referer': 'https://www.m6.fr/',         'Origin': 'https://www.m6.fr' },
        { 'User-Agent': UA_CHROME, 'Referer': 'https://www.canalplus.com/', 'Origin': 'https://www.canalplus.com' },
      ];

      for (const hdrs of refererCandidates) {
        const r = await fetchWith(hdrs['User-Agent'], hdrs);
        if (r && r.status !== 403 && r.status !== 401) { res = r; break; }
      }
    }

    if (!res) res = r1 ?? r2 ?? await fetchWith(UA_VLC);
    if (!res) return NextResponse.json({ error: 'Stream unreachable' }, { status: 502 });

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

      // Only bypass proxy if stream is HTTPS — HTTP absolute URLs would trigger
      // mixed-content blocks on our HTTPS site. HTTP streams must stay proxied
      // (/api/proxy is HTTPS, so the browser→proxy leg is always secure).
      const upstreamHost = new URL(finalUrl).hostname;
      const isHttpsStream = finalUrl.startsWith('https://');
      if (isHttpsStream && (isPublicCdn(upstreamHost) || hasCorsOpen(res))) {
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
