import { prisma } from './prisma';

// Server lineup shown in the player switcher. Order = display order.
// goattv channels use the raw .ts (continuous) endpoint, NOT .m3u8: this server's
// HLS is degenerate (a single rolling segment, MEDIA-SEQUENCE always 0) and, with
// max_connections=1, the manifest poll and the 8 MB FHD segment download serialise
// onto one connection → 10-30s startup. The .ts endpoint streams as ONE continuous
// connection (exactly like VLC) → ~3s startup. VideoPlayer routes .ts to mpegts.js.
// Stream IDs from goattv get_live_streams: MAX2=301, MAX1=299, M6=323, Global=262.
const EXTRA = [
  { slug: 'bein-max-2',  name: 'beIN SPORTS MAX 2',  streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/301.ts', sublabel: 'beIN · MAX 2 · FHD' },
  { slug: 'bein-max-1',  name: 'beIN SPORTS MAX 1',  streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/299.ts', sublabel: 'beIN · MAX 1 · FHD' },
  { slug: 'm6',          name: 'M6',                 streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/323.ts', sublabel: 'France · M6 · FHD' },
  { slug: 'bein-global', name: 'beIN SPORTS Global', streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/262.ts', sublabel: 'beIN · Global · HD' },
] as const;

// Memoise per process so prerendering 72 match pages doesn't fire the upserts
// hundreds of times (and so runtime requests reuse one DB round-trip).
let _cache: Awaited<ReturnType<typeof upsertExtra>> | null = null;
let _cacheTs = 0;
const CACHE_TTL = 5 * 60_000;

function upsertExtra() {
  return Promise.all(
    EXTRA.map(ch =>
      prisma.channel.upsert({
        where:  { slug: ch.slug },
        update: { streamUrl: ch.streamUrl, isActive: true },
        create: { slug: ch.slug, name: ch.name, streamUrl: ch.streamUrl, groupTitle: 'Sports', isActive: true, order: 999 },
      }).catch(() => null)
    )
  );
}

export async function getWcExtraChannels() {
  if (_cache && Date.now() - _cacheTs < CACHE_TTL) return _cache;
  _cache = await upsertExtra();
  _cacheTs = Date.now();
  return _cache;
}
