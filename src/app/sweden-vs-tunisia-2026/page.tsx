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
  description: '🔴 Watch Sweden vs Tunisia FIFA World Cup 2026 FREE in HD. Group L at Arrowhead Stadium, Kansas City. Stream on beIN Sport 1, M6. No subscription.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Sweden vs Tunisia',
  location: { '@type': 'Place', name: 'Arrowhead Stadium, Kansas City' },
  competitor: [{ '@type': 'SportsTeam', name: 'Sweden' }, { '@type': 'SportsTeam', name: 'Tunisia' }],
  organizer: { '@type': 'Organization', name: 'FIFA' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: PAGE_URL },
};


export default async function Page() {
  const [sigma, etv] = await getWcExtraChannels();

  return (
    <>
      <JsonLd data={jsonLd} />
      <WC2026MatchLayout
        home={{ name: 'Sweden', flag: 'se', nickname: 'Blågult', formation: '4-3-3' }}
        away={{ name: 'Tunisia', flag: 'tn', nickname: 'Eagles of Carthage', formation: '4-3-3' }}
        meta={{ date: 'Tuesday, 16 June 2026', time: '22:00 UTC', venue: 'Arrowhead Stadium, Kansas City', group: 'L', matchday: 1, prediction: 'Sweden 2-0 Tunisia' }}
        servers={[
          { label: 'ETV',     sublabel: 'Estonia · ERR · HD',  channel: etv   as any },
          { label: 'SigmaTV', sublabel: 'Cyprus · Sigma · HD', channel: sigma as any },
        ]}
        blog={blogs['sweden-vs-tunisia']}
        kickoffTimes={[{"flag":"🇸🇪","country":"Stockholm","time":"00:00+1"},{"flag":"🇫🇷","country":"Paris","time":"00:00+1"},{"flag":"🇸🇦","country":"Riyadh","time":"01:00+1"},{"flag":"🇬🇧","country":"London","time":"23:00"},{"flag":"🇹🇳","country":"Tunis","time":"23:00"},{"flag":"🌍","country":"UTC","time":"22:00"}]}
        faqs={[
          { q: 'Where to watch Sweden vs Tunisia World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is Sweden vs Tunisia kick-off?', a: 'Tuesday, 16 June 2026 at 22:00 UTC. Watch free on SportaLive.' },
          { q: 'كيف أشاهد Sweden ضد Tunisia مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/netherlands-vs-japan-2026', label: '🇳🇱 Netherlands vs Japan' }, { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' }, { href: '/chaines-marocaines', label: '🇲🇦 Chaînes Marocaines' }]}
      />
    </>
  );
}

