import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';
import { getWcExtraChannels } from '@/lib/wc-channels';

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const PAGE_URL = `${SITE}/haiti-vs-scotland-2026`;

export const metadata: Metadata = {
  title: 'Haiti vs Scotland LIVE — World Cup 2026 Free Stream | beIN Sport · M6',
  description: '🔴 Watch Haiti vs Scotland FIFA World Cup 2026 FREE in HD. Group E at NRG Stadium, Houston. Stream on beIN Sport 1, M6. No subscription.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Haiti vs Scotland',
  location: { '@type': 'Place', name: 'NRG Stadium, Houston' },
  competitor: [{ '@type': 'SportsTeam', name: 'Haiti' }, { '@type': 'SportsTeam', name: 'Scotland' }],
  organizer: { '@type': 'Organization', name: 'FIFA' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: PAGE_URL },
};

async function find(slugs: string[], patterns: string[]) {
  const r = await prisma.channel.findFirst({ where: { slug: { in: slugs }, isActive: true }, orderBy: { order: 'asc' } }).catch(() => null);
  if (r) return r;
  for (const p of patterns) {
    const c = await prisma.channel.findFirst({ where: { name: { contains: p, mode: 'insensitive' }, isActive: true }, orderBy: { order: 'asc' } }).catch(() => null);
    if (c) return c;
  }
  return null;
}

export default async function Page() {
  const [[m6, rmc, arryadia, dasErste], [ert1, sigma, tv2]] = await Promise.all([
    Promise.all([
      find(['m6', 'm6-hd'], ['M6']),
      find(['rmc-sport-1', 'rmc-sport'], ['RMC Sport', 'RMC']),
      find(['arryadia-tnt', 'arryadia-sport-tnt'], ['Arryadia TNT', 'الرياضية TNT']),
      find(['das-erste', 'ard-das-erste'], ['Das Erste', 'ARD']),
    ]),
    getWcExtraChannels(),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <WC2026MatchLayout
        home={{ name: 'Haiti', flag: 'ht', nickname: 'Les Grenadiers', formation: '4-5-1' }}
        away={{ name: 'Scotland', flag: 'gb-sct', nickname: 'The Scots', formation: '3-4-3' }}
        meta={{ date: 'Saturday, 13 June 2026', time: '22:00 UTC', venue: 'NRG Stadium, Houston', group: 'E', matchday: 1, prediction: 'Haiti 1-2 Scotland' }}
        servers={[
          { label: 'M6',           sublabel: 'France · Gratuit',     channel: m6       as any },
          { label: 'RMC Sport',    sublabel: 'HD',                   channel: rmc      as any },
          { label: 'Arryadia TNT', sublabel: 'Maroc · مجاني',         channel: arryadia as any },
          { label: 'Das Erste',    sublabel: 'Germany · ARD',        channel: dasErste as any },
          { label: 'ERT1',         sublabel: 'Greece · ERT · HD',    channel: ert1     as any },
          { label: 'SigmaTV',      sublabel: 'Cyprus · Sigma · HD',  channel: sigma    as any },
          { label: 'TV2',          sublabel: 'TV2 · HD',             channel: tv2      as any },
        ]}
        blog={blogs['haiti-vs-scotland']}
        kickoffTimes={[{"flag":"🇺🇸","country":"Houston","time":"17:00"},{"flag":"🇫🇷","country":"Paris","time":"00:00+1"},{"flag":"🇸🇦","country":"Riyadh","time":"01:00+1"},{"flag":"🇬🇧","country":"London","time":"23:00"},{"flag":"🇭🇹","country":"Port-au-Prince","time":"18:00"},{"flag":"🌍","country":"UTC","time":"22:00"}]}
        faqs={[
          { q: 'Where to watch Haiti vs Scotland World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is Haiti vs Scotland kick-off?', a: 'Saturday, 13 June 2026 at 22:00 UTC. Watch free on SportaLive.' },
          { q: 'كيف أشاهد Haiti ضد Scotland مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/usa-vs-paraguay-2026', label: '🇺🇸 USA vs Paraguay' }, { href: '/australia-vs-turkiye-2026', label: '🇦🇺 Australia vs Türkiye' }]}
      />
    </>
  );
}
