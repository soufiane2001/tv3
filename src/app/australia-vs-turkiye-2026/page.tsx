import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';
import { getWcExtraChannels } from '@/lib/wc-channels';

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const PAGE_URL = `${SITE}/australia-vs-turkiye-2026`;

export const metadata: Metadata = {
  title: 'Australia vs Türkiye LIVE — World Cup 2026 Free Stream | beIN Sport · M6',
  description: '🔴 Watch Australia vs Türkiye FIFA World Cup 2026 FREE in HD. Group F at Rose Bowl, Los Angeles. Stream on beIN Sport 1, M6. No subscription.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Australia vs Türkiye',
  location: { '@type': 'Place', name: 'Rose Bowl, Los Angeles' },
  competitor: [{ '@type': 'SportsTeam', name: 'Australia' }, { '@type': 'SportsTeam', name: 'Türkiye' }],
  organizer: { '@type': 'Organization', name: 'FIFA' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: PAGE_URL },
};


export default async function Page() {
  const [sigma, etv] = await getWcExtraChannels();

  return (
    <>
      <JsonLd data={jsonLd} />
      <WC2026MatchLayout
        home={{ name: 'Australia', flag: 'au', nickname: 'Socceroos', formation: '4-4-2' }}
        away={{ name: 'Türkiye', flag: 'tr', nickname: 'Ay-Yıldızlılar', formation: '4-2-3-1' }}
        meta={{ date: 'Sunday, 14 June 2026', time: '20:00 UTC', venue: 'Rose Bowl, Los Angeles', group: 'F', matchday: 1, prediction: 'Australia 1-2 Türkiye' }}
        servers={[
          { label: 'ETV',     sublabel: 'Estonia · ERR · HD',  channel: etv   as any },
          { label: 'SigmaTV', sublabel: 'Cyprus · Sigma · HD', channel: sigma as any },
        ]}
        blog={blogs['australia-vs-turkiye']}
        kickoffTimes={[{"flag":"🇦🇺","country":"Sydney","time":"06:00+1"},{"flag":"🇫🇷","country":"Paris","time":"22:00"},{"flag":"🇸🇦","country":"Riyadh","time":"23:00"},{"flag":"🇬🇧","country":"London","time":"21:00"},{"flag":"🇹🇷","country":"Istanbul","time":"23:00"},{"flag":"🌍","country":"UTC","time":"20:00"}]}
        faqs={[
          { q: 'Where to watch Australia vs Türkiye World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is Australia vs Türkiye kick-off?', a: 'Sunday, 14 June 2026 at 20:00 UTC. Watch free on SportaLive.' },
          { q: 'كيف أشاهد Australia ضد Türkiye مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' }, { href: '/netherlands-vs-japan-2026', label: '🇳🇱 Netherlands vs Japan' }]}
      />
    </>
  );
}

