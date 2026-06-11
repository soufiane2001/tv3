import { prisma } from './prisma';

// Server lineup shown in the player switcher. Order = display order.
// goattv channels use HLS (.m3u8) not raw .ts: segmented HLS lets the manifest/
// segment CDN cache coalesce viewers onto goattv's single allowed connection
// (max_connections=1), and avoids holding a continuous stream open through a
// serverless function (which times out and monopolises the one connection slot).
// Stream IDs from goattv get_live_streams: MAX2=301, MAX1=299, M6=323, Global=262.
const EXTRA = [
  { slug: 'bein-max-2',  name: 'beIN SPORTS MAX 2',  streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/301.m3u8', sublabel: 'beIN · MAX 2 · FHD' },
  { slug: 'bein-max-1',  name: 'beIN SPORTS MAX 1',  streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/299.m3u8', sublabel: 'beIN · MAX 1 · FHD' },
  { slug: 'm6',          name: 'M6',                 streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/323.m3u8', sublabel: 'France · M6 · FHD' },
  { slug: 'bein-global', name: 'beIN SPORTS Global', streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/262.m3u8', sublabel: 'beIN · Global · HD' },
] as const;

export async function getWcExtraChannels() {
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
