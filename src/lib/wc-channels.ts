import { prisma } from './prisma';

const EXTRA = [
  { slug: 'bein-max-2',    name: 'beIN SPORTS MAX 2',  streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/301.m3u8', sublabel: 'beIN · MAX 2 · FHD'   },
  { slug: 'bein-max-1',    name: 'beIN SPORTS MAX 1',  streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/299.m3u8', sublabel: 'beIN · MAX 1 · FHD'   },
  { slug: 'bein-max-3',    name: 'beIN SPORTS MAX 3',  streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/303.m3u8', sublabel: 'beIN · MAX 3 · FHD'   },
  { slug: 'bein-max-4',    name: 'beIN SPORTS MAX 4',  streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/305.m3u8', sublabel: 'beIN · MAX 4 · FHD'   },
  { slug: 'bein-1',        name: 'beIN SPORTS 1',      streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/8.m3u8',   sublabel: 'beIN · Sport 1 · AR'  },
  { slug: 'bein-global',   name: 'beIN SPORTS Global', streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/262.m3u8', sublabel: 'beIN · Global · EN'   },
  { slug: 'bein-fr-1',     name: 'beIN SPORTS 1 FR',   streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/240.m3u8', sublabel: 'France · beIN 1 · HD' },
  { slug: 'bein-fr-2',     name: 'beIN SPORTS 2 FR',   streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/241.m3u8', sublabel: 'France · beIN 2 · HD' },
  { slug: 'm6-fhd',        name: 'M6 FHD',             streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/323.m3u8', sublabel: 'France · M6 · FHD'    },
  { slug: 'etv-ee',        name: 'ETV',                streamUrl: 'https://sb.err.ee/live/etv.m3u8',                        sublabel: 'Estonia · ERR · HD'   },
  { slug: 'sigma-tv',      name: 'SigmaTV',            streamUrl: 'https://sl2.sigmatv.com/hls/live.m3u8',                  sublabel: 'Cyprus · Sigma · HD'  },
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
