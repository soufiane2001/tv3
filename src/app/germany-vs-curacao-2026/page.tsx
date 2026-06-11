import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';
import { getWcExtraChannels } from '@/lib/wc-channels';

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const PAGE_URL = `${SITE}/germany-vs-curacao-2026`;

export const metadata: Metadata = {
  title: 'Germany vs Curaçao LIVE — World Cup 2026 Free Stream | beIN Sport · M6',
  description: '🔴 Watch Germany vs Curaçao FIFA World Cup 2026 FREE in HD. Group E at NRG Stadium, Houston. Stream on beIN Sport 1, M6. No subscription.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Germany vs Curaçao',
  startDate: '2026-06-14T17:00:00Z', endDate: '2026-06-14T19:00:00Z',
  location: { '@type': 'Place', name: 'NRG Stadium, Houston' },
  competitor: [{ '@type': 'SportsTeam', name: 'Germany' }, { '@type': 'SportsTeam', name: 'Curaçao' }],
  organizer: { '@type': 'Organization', name: 'FIFA' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: PAGE_URL },
};


export default async function Page() {
  const [beinMax2, beinMax1, m6, beinGlobal] = await getWcExtraChannels();

  return (
    <>
      <JsonLd data={jsonLd} />
      <WC2026MatchLayout
        home={{ name: 'Germany', flag: 'de', nickname: 'Die Mannschaft', formation: '4-2-3-1' }}
        away={{ name: 'Curaçao', flag: 'cw', nickname: 'Marchena Boys', formation: '5-4-1' }}
        meta={{ date: 'Sunday, 14 June 2026', time: '17:00 UTC', venue: 'NRG Stadium, Houston', group: 'E', matchday: 1, prediction: 'Germany 5-1 Curaçao' }}
        servers={[
          { label: 'beIN MAX 2', sublabel: 'beIN · MAX 2 · FHD', channel: beinMax2   as any },
          { label: 'beIN MAX 1', sublabel: 'beIN · MAX 1 · FHD', channel: beinMax1   as any },
          { label: 'M6',         sublabel: 'France · M6 · FHD',   channel: m6         as any },
          { label: 'beIN Global', sublabel: 'beIN · Global · HD', channel: beinGlobal as any },
        ]}
        blog={blogs['germany-vs-curacao']}
        kickoffTimes={[{"flag":"🇺🇸","country":"Houston","time":"12:00"},{"flag":"🇫🇷","country":"Paris","time":"19:00"},{"flag":"🇬🇧","country":"London","time":"18:00"},{"flag":"🇺🇸","country":"New York","time":"13:00"},{"flag":"🇸🇦","country":"Riyadh","time":"20:00"},{"flag":"🌍","country":"UTC","time":"17:00"}]}
        faqs={[
          { q: 'Where to watch Germany vs Curaçao World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is Germany vs Curaçao kick-off?', a: 'Sunday, 14 June 2026 at 17:00 UTC. Watch free on SportaLive.' },
          { q: 'كيف أشاهد Germany ضد Curaçao مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/netherlands-vs-japan-2026', label: '🇳🇱 Netherlands vs Japan' }, { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' }]}
      />
    </>
  );
}

