import { prisma } from './prisma';

// Server lineup shown in the player switcher. Order here = default display order;
// the admin can promote any server to "main" (it then renders first) via the
// `mainServer` Setting (admin panel → main server picker).
//
// SigmaTV is a public HLS CDN with NO connection limit → scales to many viewers,
// so it's the default main. goattv channels are .ts (continuous, mpegts.js):
// great quality but capped at max_connections=1 (one viewer at a time).
// Verified working HTTPS streams (both send CORS → play directly from the CDN,
// like VLC: no proxy, no connection limit, multi-viewer). Al Aoula TNT carries
// the matches and is the default main; SigmaTV is the backup.
const EXTRA = [
  { slug: 'al-aoula-tnt', name: 'Al Aoula TNT', label: 'Al Aoula TNT', sublabel: 'Maroc · TNT · 1080p', streamUrl: 'https://stream-lb.livemediama.com/alaoula-tnt/hls/master.m3u8' },
  { slug: 'sigma-tv',     name: 'SigmaTV',      label: 'SigmaTV',      sublabel: 'HD · Multi-viewer',  streamUrl: 'https://sl2.sigmatv.com/hls/live.m3u8' },
] as const;

export interface WcServer { slug: string; label: string; sublabel: string; channel: any }

export const MAIN_SERVER_KEY = 'mainServer';

// The lineup as defined here (slug + labels), for the admin picker.
export const WC_SERVER_LINEUP = EXTRA.map(({ slug, label, sublabel }) => ({ slug, label, sublabel }));

// Memoise the upserts (not the ordering) so prerendering many pages doesn't
// hammer the DB. The main-server setting is read fresh on every call so an admin
// change takes effect immediately (after the page cache is revalidated).
let _cache: { slug: string; label: string; sublabel: string; channel: any }[] | null = null;
let _ts = 0;
const TTL = 5 * 60_000;

async function upsertAll() {
  const rows = await Promise.all(
    EXTRA.map(async ch => {
      const channel = await prisma.channel.upsert({
        where:  { slug: ch.slug },
        update: { streamUrl: ch.streamUrl, isActive: true },
        create: { slug: ch.slug, name: ch.name, streamUrl: ch.streamUrl, groupTitle: 'Sports', isActive: true, order: 999 },
      }).catch(() => null);
      return channel ? { slug: ch.slug, label: ch.label, sublabel: ch.sublabel, channel } : null;
    })
  );
  return rows.filter(Boolean) as { slug: string; label: string; sublabel: string; channel: any }[];
}

// Returns the servers ordered with the admin-chosen "main" first.
export async function getWcExtraChannels(): Promise<WcServer[]> {
  if (!_cache || Date.now() - _ts > TTL) {
    _cache = await upsertAll();
    _ts = Date.now();
  }
  const main = await prisma.setting.findUnique({ where: { key: MAIN_SERVER_KEY } }).catch(() => null);
  const mainSlug = main?.value;
  const list = [..._cache];
  if (mainSlug) list.sort((a, b) => (b.slug === mainSlug ? 1 : 0) - (a.slug === mainSlug ? 1 : 0));
  return list;
}
