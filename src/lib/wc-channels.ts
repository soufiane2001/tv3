import { prisma } from './prisma';

const EXTRA = [
  { slug: 'dazn-es',  name: 'DAZN Mundial', streamUrl: 'http://goattv.store:80/6MQDXbURQj/VVdSS4UxyV/238.m3u8', sublabel: 'DAZN · Mundial · ES' },
  { slug: 'etv-ee',   name: 'ETV',          streamUrl: 'https://sb.err.ee/live/etv.m3u8',                        sublabel: 'Estonia · ERR · HD'  },
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
