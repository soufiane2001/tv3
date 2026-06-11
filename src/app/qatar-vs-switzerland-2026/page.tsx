import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';
import { getWcExtraChannels } from '@/lib/wc-channels';

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const PAGE_URL = `${SITE}/qatar-vs-switzerland-2026`;

export const metadata: Metadata = {
  title: 'Qatar vs Switzerland LIVE — World Cup 2026 Free Stream | beIN Sport · M6',
  description: '🔴 Watch Qatar vs Switzerland FIFA World Cup 2026 FREE in HD. Group H at Estadio Azteca, Mexico City. Stream on beIN Sport 1, M6. No subscription.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Qatar vs Switzerland',
  location: { '@type': 'Place', name: 'Estadio Azteca, Mexico City' },
  competitor: [{ '@type': 'SportsTeam', name: 'Qatar' }, { '@type': 'SportsTeam', name: 'Switzerland' }],
  organizer: { '@type': 'Organization', name: 'FIFA' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: PAGE_URL },
};


export default async function Page() {
  const [sigma, etv, beinMax1, m6fhd] = await getWcExtraChannels();

  return (
    <>
      <JsonLd data={jsonLd} />
      <WC2026MatchLayout
        home={{ name: 'Qatar', flag: 'qa', nickname: 'Al Annabi', formation: '4-3-3' }}
        away={{ name: 'Switzerland', flag: 'ch', nickname: 'Nati', formation: '4-2-3-1' }}
        meta={{ date: 'Monday, 15 June 2026', time: '19:00 UTC', venue: 'Estadio Azteca, Mexico City', group: 'H', matchday: 1, prediction: 'Qatar 1-2 Switzerland' }}
        servers={[
          { label: 'ETV',     sublabel: 'Estonia · ERR · HD',  channel: etv   as any },
          { label: 'SigmaTV', sublabel: 'Cyprus · Sigma · HD', channel: sigma as any },
          { label: 'beIN MAX 1', sublabel: 'beIN · MAX 1 · FHD', channel: beinMax1 as any },
          { label: 'M6 FHD',    sublabel: 'France · M6 · FHD',  channel: m6fhd   as any },
        ]}
        blog={blogs['qatar-vs-switzerland']}
        kickoffTimes={[{"flag":"🇶🇦","country":"Doha","time":"22:00"},{"flag":"🇫🇷","country":"Paris","time":"21:00"},{"flag":"🇸🇦","country":"Riyadh","time":"22:00"},{"flag":"🇬🇧","country":"London","time":"20:00"},{"flag":"🇨🇭","country":"Bern","time":"21:00"},{"flag":"🌍","country":"UTC","time":"19:00"}]}
        faqs={[
          { q: 'Where to watch Qatar vs Switzerland World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is Qatar vs Switzerland kick-off?', a: 'Monday, 15 June 2026 at 19:00 UTC. Watch free on SportaLive.' },
          { q: 'كيف أشاهد Qatar ضد Switzerland مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' }, { href: '/ivory-coast-vs-ecuador-2026', label: '🇨🇮 Ivory Coast vs Ecuador' }]}
      />
    </>
  );
}

