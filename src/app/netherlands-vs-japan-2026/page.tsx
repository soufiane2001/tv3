import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';
import { getWcExtraChannels } from '@/lib/wc-channels';

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const PAGE_URL = `${SITE}/netherlands-vs-japan-2026`;

export const metadata: Metadata = {
  title: 'Netherlands vs Japan LIVE — World Cup 2026 Free Stream | beIN Sport · M6',
  description: '🔴 Watch Netherlands vs Japan FIFA World Cup 2026 FREE in HD. Group K at Gillette Stadium, Boston. Stream on beIN Sport 1, M6. No subscription.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Netherlands vs Japan',
  location: { '@type': 'Place', name: 'Gillette Stadium, Boston' },
  competitor: [{ '@type': 'SportsTeam', name: 'Netherlands' }, { '@type': 'SportsTeam', name: 'Japan' }],
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
  const [[m6, rmc, arryadia, dasErste], [rai1, ert1, sigma, tv2, etv]] = await Promise.all([
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
        home={{ name: 'Netherlands', flag: 'nl', nickname: 'Oranje', formation: '4-3-3' }}
        away={{ name: 'Japan', flag: 'jp', nickname: 'Samurai Blue', formation: '4-2-3-1' }}
        meta={{ date: 'Tuesday, 16 June 2026', time: '19:00 UTC', venue: 'Gillette Stadium, Boston', group: 'K', matchday: 1, prediction: 'Netherlands 2-1 Japan' }}
        servers={[
          { label: 'Rai 1',        sublabel: 'Italy · RAI · HD',     channel: rai1     as any },
          { label: 'M6',           sublabel: 'France · Gratuit',     channel: m6       as any },
          { label: 'RMC Sport',    sublabel: 'HD',                   channel: rmc      as any },
          { label: 'Arryadia TNT', sublabel: 'Maroc · مجاني',         channel: arryadia as any },
          { label: 'Das Erste',    sublabel: 'Germany · ARD',        channel: dasErste as any },
          { label: 'ERT1',         sublabel: 'Greece · ERT · HD',    channel: ert1     as any },
          { label: 'SigmaTV',      sublabel: 'Cyprus · Sigma · HD',  channel: sigma    as any },
          { label: 'DR1',          sublabel: 'Denmark · DR · Free', channel: tv2      as any },
          { label: 'ETV',          sublabel: 'Estonia · ERR · HD',   channel: etv      as any },
        ]}
        blog={blogs['netherlands-vs-japan']}
        kickoffTimes={[{"flag":"🇳🇱","country":"Amsterdam","time":"21:00"},{"flag":"🇫🇷","country":"Paris","time":"21:00"},{"flag":"🇸🇦","country":"Riyadh","time":"22:00"},{"flag":"🇬🇧","country":"London","time":"20:00"},{"flag":"🇯🇵","country":"Tokyo","time":"04:00+1"},{"flag":"🌍","country":"UTC","time":"19:00"}]}
        faqs={[
          { q: 'Where to watch Netherlands vs Japan World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is Netherlands vs Japan kick-off?', a: 'Tuesday, 16 June 2026 at 19:00 UTC. Watch free on SportaLive.' },
          { q: 'كيف أشاهد Netherlands ضد Japan مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/sweden-vs-tunisia-2026', label: '🇸🇪 Sweden vs Tunisia' }, { href: '/germany-vs-curacao-2026', label: '🇩🇪 Germany vs Curaçao' }]}
      />
    </>
  );
}

