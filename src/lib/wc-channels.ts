import { prisma } from './prisma';

// Server lineup shown in the player switcher. Order here = default display order;
// the admin can promote any server to "main" (it then renders first) via the
// `mainServer` Setting (admin panel → main server picker).
//
// SigmaTV is a public HLS CDN with NO connection limit → scales to many viewers,
// so it's the default main. goattv channels are .ts (continuous, mpegts.js):
// great quality but capped at max_connections=1 (one viewer at a time).
// Match servers = public CDN HLS (HTTPS + CORS, NO connection limit) → play
// directly from the CDN, scale to thousands of viewers for free. THIS is the
// multi-viewer solution. (The 119 goattv channels live in the DB as a browsable
// library — 1 viewer each — not here.)
// beIN MAX 2 only (per request). goattv HTTP .ts, max_connections=1 → 1 viewer.
const EXTRA = [
  { slug: 'bein-max-2', name: 'beIN SPORTS MAX 2', label: 'beIN MAX 2', sublabel: 'beIN · MAX 2 · FHD', streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/301.ts' },
  { slug: 'dazn-mundial', name: 'DAZN Mundial', label: 'DAZN Mundial', sublabel: 'DAZN · Mundial · ES', streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/238.ts' },
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
