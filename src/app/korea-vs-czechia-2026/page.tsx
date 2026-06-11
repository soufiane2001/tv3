import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';
import { getWcExtraChannels } from '@/lib/wc-channels';

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const PAGE_URL = `${SITE}/korea-vs-czechia-2026`;

export const metadata: Metadata = {
  title: 'Korea vs Czechia LIVE — World Cup 2026 Free Stream | beIN Sport · M6',
  description: '🔴 Watch Korea vs Czechia FIFA World Cup 2026 FREE in HD. Group A at Estadio Akron, Guadalajara. Stream on beIN Sport 1, M6. No subscription.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Korea vs Czechia',
  startDate: '2026-06-12T02:00:00Z', endDate: '2026-06-12T04:00:00Z',
  location: { '@type': 'Place', name: 'Estadio Akron, Guadalajara' },
  competitor: [{ '@type': 'SportsTeam', name: 'Korea' }, { '@type': 'SportsTeam', name: 'Czechia' }],
  organizer: { '@type': 'Organization', name: 'FIFA' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: PAGE_URL },
};


export default async function Page() {
  const [beinMax2, beinMax1, m6, beinGlobal] = await getWcExtraChannels();

  return (
    <>
      <JsonLd data={jsonLd} />
      <WC2026MatchLayout
        home={{ name: 'Korea', flag: 'kr', nickname: 'Taeguk Warriors', formation: '4-2-3-1' }}
        away={{ name: 'Czechia', flag: 'cz', nickname: 'Lions', formation: '4-3-3' }}
        meta={{ date: 'Thursday, 11 June 2026', time: '02:00 UTC (12 Jun)', venue: 'Estadio Akron, Guadalajara', group: 'A', matchday: 1, prediction: 'Korea 2-1 Czechia' }}
        servers={[
          { label: 'beIN MAX 2', sublabel: 'beIN · MAX 2 · FHD', channel: beinMax2   as any },
          { label: 'beIN MAX 1', sublabel: 'beIN · MAX 1 · FHD', channel: beinMax1   as any },
          { label: 'M6',         sublabel: 'France · M6 · FHD',   channel: m6         as any },
          { label: 'beIN Global', sublabel: 'beIN · Global · HD', channel: beinGlobal as any },
        ]}
        blog={blogs['korea-vs-czechia']}
        kickoffTimes={[{"flag":"🇲🇽","country":"Guadalajara","time":"20:00"},{"flag":"🇫🇷","country":"Paris","time":"04:00+1"},{"flag":"🇬🇧","country":"London","time":"03:00+1"},{"flag":"🇺🇸","country":"New York","time":"22:00"},{"flag":"🇸🇦","country":"Riyadh","time":"05:00+1"},{"flag":"🌍","country":"UTC","time":"02:00+1"}]}
        faqs={[
          { q: 'Where to watch Korea vs Czechia World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is Korea vs Czechia kick-off?', a: 'Thursday, 11 June 2026 at 02:00 UTC (12 Jun). Watch free on SportaLive.' },
          { q: 'كيف أشاهد Korea ضد Czechia مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/canada-vs-bosnia-2026', label: '🇨🇦 Canada vs Bosnia' }, { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' }]}
      />
    </>
  );
}

