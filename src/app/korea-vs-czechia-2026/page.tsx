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
  description: '🔴 Watch Korea vs Czechia FIFA World Cup 2026 FREE in HD. Group C at AT&T Stadium, Dallas. Stream on beIN Sport 1, M6. No subscription.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Korea vs Czechia',
  location: { '@type': 'Place', name: 'AT&T Stadium, Dallas' },
  competitor: [{ '@type': 'SportsTeam', name: 'Korea' }, { '@type': 'SportsTeam', name: 'Czechia' }],
  organizer: { '@type': 'Organization', name: 'FIFA' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: PAGE_URL },
};


export default async function Page() {
  const [dazn, etv] = await getWcExtraChannels();

  return (
    <>
      <JsonLd data={jsonLd} />
      <WC2026MatchLayout
        home={{ name: 'Korea', flag: 'kr', nickname: 'Taeguk Warriors', formation: '4-2-3-1' }}
        away={{ name: 'Czechia', flag: 'cz', nickname: 'Lions', formation: '4-3-3' }}
        meta={{ date: 'Friday, 12 June 2026', time: '19:00 UTC', venue: 'AT&T Stadium, Dallas', group: 'C', matchday: 1, prediction: 'Korea 2-1 Czechia' }}
        servers={[
          { label: 'DAZN', sublabel: 'DAZN · Mundial · ES', channel: dazn as any },
          { label: 'ETV',  sublabel: 'Estonia · ERR · HD',  channel: etv  as any },
        ]}
        blog={blogs['korea-vs-czechia']}
        kickoffTimes={[{"flag":"🇰🇷","country":"Seoul","time":"04:00+1"},{"flag":"🇫🇷","country":"Paris","time":"21:00"},{"flag":"🇸🇦","country":"Riyadh","time":"22:00"},{"flag":"🇬🇧","country":"London","time":"20:00"},{"flag":"🇺🇸","country":"Dallas","time":"14:00"},{"flag":"🌍","country":"UTC","time":"19:00"}]}
        faqs={[
          { q: 'Where to watch Korea vs Czechia World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is Korea vs Czechia kick-off?', a: 'Friday, 12 June 2026 at 19:00 UTC. Watch free on SportaLive.' },
          { q: 'كيف أشاهد Korea ضد Czechia مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/canada-vs-bosnia-2026', label: '🇨🇦 Canada vs Bosnia' }, { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' }]}
      />
    </>
  );
}

