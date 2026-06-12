import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';
import { getWcExtraChannels } from '@/lib/wc-channels';

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sportalive.live';
const PAGE_URL = `${SITE}/brazil-vs-morocco-2026`;

export const metadata: Metadata = {
  title: 'Brazil vs Morocco LIVE — World Cup 2026 Free Stream | beIN Sport · M6',
  description: '🔴 Watch Brazil vs Morocco FIFA World Cup 2026 FREE in HD. Group C at MetLife Stadium, New Jersey. Stream on beIN Sport 1, M6. No subscription.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Brazil vs Morocco',
  startDate: '2026-06-13T22:00:00Z', endDate: '2026-06-14T00:00:00Z',
  location: { '@type': 'Place', name: 'MetLife Stadium, New Jersey' },
  competitor: [{ '@type': 'SportsTeam', name: 'Brazil' }, { '@type': 'SportsTeam', name: 'Morocco' }],
  organizer: { '@type': 'Organization', name: 'FIFA' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: PAGE_URL },
};


export default async function Page() {
  const [beinMax2, beinMax1, m6, beinGlobal] = await getWcExtraChannels();

  return (
    <>
      <JsonLd data={jsonLd} />
      <WC2026MatchLayout
        home={{ name: 'Brazil', flag: 'br', nickname: 'Seleção', formation: '4-3-3' }}
        away={{ name: 'Morocco', flag: 'ma', nickname: 'Atlas Lions', formation: '4-3-3' }}
        meta={{ date: 'Saturday, 13 June 2026', time: '22:00 UTC', venue: 'MetLife Stadium, New Jersey', group: 'C', matchday: 1, prediction: 'Brazil 2-1 Morocco' }}
        servers={[
          { label: 'beIN MAX 2', sublabel: 'beIN · MAX 2 · FHD', channel: beinMax2   as any },
          { label: 'beIN MAX 1', sublabel: 'beIN · MAX 1 · FHD', channel: beinMax1   as any },
          { label: 'M6',         sublabel: 'France · M6 · FHD',   channel: m6         as any },
          { label: 'beIN Global', sublabel: 'beIN · Global · HD', channel: beinGlobal as any },
        ]}
        blog={blogs['brazil-vs-morocco']}
        kickoffTimes={[{"flag":"🇺🇸","country":"New York","time":"18:00"},{"flag":"🇫🇷","country":"Paris","time":"00:00+1"},{"flag":"🇬🇧","country":"London","time":"23:00"},{"flag":"🇸🇦","country":"Riyadh","time":"01:00+1"},{"flag":"🌍","country":"UTC","time":"22:00"}]}
        faqs={[
          { q: 'Where to watch Brazil vs Morocco World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is Brazil vs Morocco kick-off?', a: 'Saturday, 13 June 2026 at 22:00 UTC. Watch free on SportaLive.' },
          { q: 'كيف أشاهد Brazil ضد Morocco مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/mexico-vs-south-africa-2026', label: '🇲🇽 Mexico vs South Africa' }, { href: '/germany-vs-curacao-2026', label: '🇩🇪 Germany vs Curaçao' }, { href: '/chaines-marocaines', label: '🇲🇦 Chaînes Marocaines' }]}
      />
    </>
  );
}

