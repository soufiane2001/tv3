import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';
import { getWcExtraChannels } from '@/lib/wc-channels';

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const PAGE_URL = `${SITE}/usa-vs-paraguay-2026`;

export const metadata: Metadata = {
  title: 'USA vs Paraguay LIVE — World Cup 2026 Free Stream | beIN Sport · M6',
  description: '🔴 Watch USA vs Paraguay FIFA World Cup 2026 FREE in HD. Group A at MetLife Stadium, New York. Stream on beIN Sport 1, M6. No subscription.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — USA vs Paraguay',
  location: { '@type': 'Place', name: 'MetLife Stadium, New York' },
  competitor: [{ '@type': 'SportsTeam', name: 'USA' }, { '@type': 'SportsTeam', name: 'Paraguay' }],
  organizer: { '@type': 'Organization', name: 'FIFA' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: PAGE_URL },
};


export default async function Page() {
  const [etv] = await getWcExtraChannels();

  return (
    <>
      <JsonLd data={jsonLd} />
      <WC2026MatchLayout
        home={{ name: 'USA', flag: 'us', nickname: 'USMNT', formation: '4-3-3' }}
        away={{ name: 'Paraguay', flag: 'py', nickname: 'La Albirroja', formation: '4-4-2' }}
        meta={{ date: 'Saturday, 13 June 2026', time: '19:00 UTC', venue: 'MetLife Stadium, New York', group: 'A', matchday: 1, prediction: 'USA 3-1 Paraguay' }}
        servers={[
          { label: 'ETV', sublabel: 'Estonia · ERR · HD', channel: etv as any },
        ]}
        blog={blogs['usa-vs-paraguay']}
        kickoffTimes={[{"flag":"🇺🇸","country":"New York","time":"15:00"},{"flag":"🇫🇷","country":"Paris","time":"21:00"},{"flag":"🇸🇦","country":"Riyadh","time":"22:00"},{"flag":"🇬🇧","country":"London","time":"20:00"},{"flag":"🇵🇾","country":"Asunción","time":"15:00"},{"flag":"🌍","country":"UTC","time":"19:00"}]}
        faqs={[
          { q: 'Where to watch USA vs Paraguay World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is USA vs Paraguay kick-off?', a: 'Saturday, 13 June 2026 at 19:00 UTC. Watch free on SportaLive.' },
          { q: 'كيف أشاهد USA ضد Paraguay مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/canada-vs-bosnia-2026', label: '🇨🇦 Canada vs Bosnia' }, { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' }]}
      />
    </>
  );
}

