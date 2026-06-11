import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';
import { getWcExtraChannels } from '@/lib/wc-channels';

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const PAGE_URL = `${SITE}/sweden-vs-tunisia-2026`;

export const metadata: Metadata = {
  title: 'Sweden vs Tunisia LIVE — World Cup 2026 Free Stream | beIN Sport · M6',
  description: '🔴 Watch Sweden vs Tunisia FIFA World Cup 2026 FREE in HD. Group F at Estadio BBVA, Monterrey. Stream on beIN Sport 1, M6. No subscription.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Sweden vs Tunisia',
  startDate: '2026-06-15T02:00:00Z', endDate: '2026-06-15T04:00:00Z',
  location: { '@type': 'Place', name: 'Estadio BBVA, Monterrey' },
  competitor: [{ '@type': 'SportsTeam', name: 'Sweden' }, { '@type': 'SportsTeam', name: 'Tunisia' }],
  organizer: { '@type': 'Organization', name: 'FIFA' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: PAGE_URL },
};


export default async function Page() {
  const [beinMax2, beinMax1, m6, beinGlobal] = await getWcExtraChannels();

  return (
    <>
      <JsonLd data={jsonLd} />
      <WC2026MatchLayout
        home={{ name: 'Sweden', flag: 'se', nickname: 'Blågult', formation: '4-3-3' }}
        away={{ name: 'Tunisia', flag: 'tn', nickname: 'Eagles of Carthage', formation: '4-3-3' }}
        meta={{ date: 'Sunday, 14 June 2026', time: '02:00 UTC (15 Jun)', venue: 'Estadio BBVA, Monterrey', group: 'F', matchday: 1, prediction: 'Sweden 2-0 Tunisia' }}
        servers={[
          { label: 'beIN MAX 2', sublabel: 'beIN · MAX 2 · FHD', channel: beinMax2   as any },
          { label: 'beIN MAX 1', sublabel: 'beIN · MAX 1 · FHD', channel: beinMax1   as any },
          { label: 'M6',         sublabel: 'France · M6 · FHD',   channel: m6         as any },
          { label: 'beIN Global', sublabel: 'beIN · Global · HD', channel: beinGlobal as any },
        ]}
        blog={blogs['sweden-vs-tunisia']}
        kickoffTimes={[{"flag":"🇲🇽","country":"Monterrey","time":"20:00"},{"flag":"🇫🇷","country":"Paris","time":"04:00+1"},{"flag":"🇬🇧","country":"London","time":"03:00+1"},{"flag":"🇺🇸","country":"New York","time":"22:00"},{"flag":"🇸🇦","country":"Riyadh","time":"05:00+1"},{"flag":"🌍","country":"UTC","time":"02:00+1"}]}
        faqs={[
          { q: 'Where to watch Sweden vs Tunisia World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is Sweden vs Tunisia kick-off?', a: 'Sunday, 14 June 2026 at 02:00 UTC (15 Jun). Watch free on SportaLive.' },
          { q: 'كيف أشاهد Sweden ضد Tunisia مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/netherlands-vs-japan-2026', label: '🇳🇱 Netherlands vs Japan' }, { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' }, { href: '/chaines-marocaines', label: '🇲🇦 Chaînes Marocaines' }]}
      />
    </>
  );
}

