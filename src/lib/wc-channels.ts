import { prisma } from './prisma';

const EXTRA = [
  { slug: 'ert1-gr',  name: 'ERT1',    streamUrl: 'https://ert-ucdn.broadpeak-aas.com/bpk-tv/ERT1/default/index.m3u8',        sublabel: 'Greece · ERT · HD' },
  { slug: 'sigma-tv', name: 'SigmaTV', streamUrl: 'https://sl2.sigmatv.com/hls/live.m3u8',                                    sublabel: 'Cyprus · Sigma · HD' },
  { slug: 'tv2-iptv', name: 'TV2',     streamUrl: 'http://46.149.191.217:9005/play/a01q',                                     sublabel: 'TV2 · HD' },
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
