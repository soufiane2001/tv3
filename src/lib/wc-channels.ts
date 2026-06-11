import { prisma } from './prisma';

const EXTRA = [
  { slug: 'bein-max-1',   name: 'beIN SPORTS MAX 1', streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/299.m3u8', sublabel: 'beIN · MAX 1 · FHD' },
  { slug: 'm6-fhd',       name: 'M6 FHD',            streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/323.m3u8', sublabel: 'France · M6 · FHD'  },
  { slug: 'etv-ee',       name: 'ETV',               streamUrl: 'https://sb.err.ee/live/etv.m3u8',                        sublabel: 'Estonia · ERR · HD'  },
  { slug: 'sigma-tv',     name: 'SigmaTV',           streamUrl: 'https://sl2.sigmatv.com/hls/live.m3u8',                  sublabel: 'Cyprus · Sigma · HD' },
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
