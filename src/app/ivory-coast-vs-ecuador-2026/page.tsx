import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';
import { getWcExtraChannels } from '@/lib/wc-channels';

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const PAGE_URL = `${SITE}/ivory-coast-vs-ecuador-2026`;

export const metadata: Metadata = {
  title: 'Ivory Coast vs Ecuador LIVE — World Cup 2026 Free Stream | beIN Sport · M6',
  description: "🔴 Watch Ivory Coast vs Ecuador FIFA World Cup 2026 FREE in HD. Group I at Levi's Stadium, San Francisco. Stream on beIN Sport 1, M6. No subscription.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Ivory Coast vs Ecuador',
  location: { '@type': 'Place', name: "Levi's Stadium, San Francisco" },
  competitor: [{ '@type': 'SportsTeam', name: 'Ivory Coast' }, { '@type': 'SportsTeam', name: 'Ecuador' }],
  organizer: { '@type': 'Organization', name: 'FIFA' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: PAGE_URL },
};


export default async function Page() {
  const [beinMax2, beinMax1, m6, beinGlobal] = await getWcExtraChannels();

  return (
    <>
      <JsonLd data={jsonLd} />
      <WC2026MatchLayout
        home={{ name: 'Ivory Coast', flag: 'ci', nickname: 'Les Éléphants', formation: '4-3-3' }}
        away={{ name: 'Ecuador', flag: 'ec', nickname: 'La Tri', formation: '4-3-3' }}
        meta={{ date: 'Monday, 15 June 2026', time: '22:00 UTC', venue: "Levi's Stadium, San Francisco", group: 'I', matchday: 1, prediction: 'Ivory Coast 1-1 Ecuador' }}
        servers={[
          { label: 'beIN MAX 2', sublabel: 'beIN · MAX 2 · FHD', channel: beinMax2   as any },
          { label: 'beIN MAX 1', sublabel: 'beIN · MAX 1 · FHD', channel: beinMax1   as any },
          { label: 'M6',         sublabel: 'France · M6 · FHD',   channel: m6         as any },
          { label: 'beIN Global', sublabel: 'beIN · Global · HD', channel: beinGlobal as any },
        ]}
        blog={blogs['ivory-coast-vs-ecuador']}
        kickoffTimes={[{"flag":"🇺🇸","country":"San Francisco","time":"15:00"},{"flag":"🇫🇷","country":"Paris","time":"00:00+1"},{"flag":"🇸🇦","country":"Riyadh","time":"01:00+1"},{"flag":"🇬🇧","country":"London","time":"23:00"},{"flag":"🇪🇨","country":"Quito","time":"17:00"},{"flag":"🌍","country":"UTC","time":"22:00"}]}
        faqs={[
          { q: 'Where to watch Ivory Coast vs Ecuador World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is Ivory Coast vs Ecuador kick-off?', a: 'Monday, 15 June 2026 at 22:00 UTC. Watch free on SportaLive.' },
          { q: 'كيف أشاهد Ivory Coast ضد Ecuador مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/germany-vs-curacao-2026', label: '🇩🇪 Germany vs Curaçao' }, { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' }]}
      />
    </>
  );
}

