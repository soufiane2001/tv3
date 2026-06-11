import { prisma } from './prisma';

const EXTRA = [
  { slug: 'sigma-tv',   name: 'SigmaTV',         streamUrl: 'https://sl2.sigmatv.com/hls/live.m3u8',                  sublabel: 'Cyprus · Sigma · HD' },
  // HLS (.m3u8) not raw .ts: segmented HLS lets the manifest/segment CDN cache
  // coalesce viewers onto goattv's single allowed connection, and avoids holding
  // a continuous stream open through a serverless function (which times out and
  // monopolises the one connection slot). Server allows m3u8 + ts output.
  { slug: 'bein-max-2', name: 'beIN SPORTS MAX 2',streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/301.m3u8', sublabel: 'beIN · MAX 2 · FHD'  },
  { slug: 'dazn-es',   name: 'DAZN Mundial',     streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/238.m3u8', sublabel: 'DAZN · Mundial · ES' },
  { slug: 'etv-ee',    name: 'ETV',              streamUrl: 'https://sb.err.ee/live/etv.m3u8',                        sublabel: 'Estonia · ERR · HD'  },
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
