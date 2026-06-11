import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';
import { getWcExtraChannels } from '@/lib/wc-channels';

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const PAGE_URL = `${SITE}/mexico-vs-south-africa-2026`;

export const metadata: Metadata = {
  title: 'Mexico vs South Africa LIVE — World Cup 2026 Free Stream | ETV · M6 · beIN Sport · La 1',
  description: '🔴 Watch Mexico vs South Africa FIFA World Cup 2026 FREE in HD. Group A opener at Estadio Azteca, 19:00 UTC. Stream on ETV, M6, beIN Sport 1. No subscription. مشاهدة مباشرة مجاناً.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Mexico vs South Africa',
  startDate: '2026-06-11T19:00:00Z', endDate: '2026-06-11T21:00:00Z',
  location: { '@type': 'Place', name: 'Estadio Azteca', address: { '@type': 'PostalAddress', addressLocality: 'Mexico City', addressCountry: 'MX' } },
  competitor: [{ '@type': 'SportsTeam', name: 'Mexico' }, { '@type': 'SportsTeam', name: 'South Africa' }],
  organizer: { '@type': 'Organization', name: 'FIFA' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: PAGE_URL },
};


export default async function Page() {
  const [sigma, beinMax2, dazn, etv] = await getWcExtraChannels();

  return (
    <>
      <JsonLd data={jsonLd} />
      <WC2026MatchLayout
        home={{ name: 'Mexico', flag: 'mx', nickname: 'El Tri', formation: '4-3-3', lineup: ['Malagón','Sánchez','Araujo','Montes','Gallardo','E.Álvarez','Rodríguez','Romo','Antuna','Giménez','Lozano'] }}
        away={{ name: 'South Africa', flag: 'za', nickname: 'Bafana Bafana', formation: '4-5-1', lineup: ['Williams','Sesane','Shalulile','Dolly','Tau','Mokoena','Maart','Ndlovu','Zwane','Jali','Mabunda'] }}
        meta={{ date: 'Thursday, 11 June 2026', time: '19:00 UTC', venue: 'Estadio Azteca, Mexico City', group: 'A', matchday: 1, prediction: 'Mexico 3-1 South Africa' }}
        servers={[
          { label: 'SigmaTV',  sublabel: 'Cyprus · Sigma · HD', channel: sigma    as any },
          { label: 'beIN MAX 2',sublabel: 'beIN · MAX 2 · FHD', channel: beinMax2 as any },
          { label: 'DAZN',     sublabel: 'DAZN · Mundial · ES', channel: dazn     as any },
          { label: 'ETV',      sublabel: 'Estonia · ERR · HD',  channel: etv      as any },
        ]}
        blog={blogs['mexico-vs-south-africa']}
        kickoffTimes={[
          { flag: '🇲🇽', country: 'Mexico City', time: '13:00' },
          { flag: '🇫🇷', country: 'Paris', time: '21:00' },
          { flag: '🇸🇦', country: 'Riyadh', time: '22:00' },
          { flag: '🇬🇧', country: 'London', time: '20:00' },
          { flag: '🇺🇸', country: 'New York', time: '15:00' },
          { flag: '🌍', country: 'UTC', time: '19:00' },
        ]}
        faqs={[
          { q: 'Where to watch Mexico vs South Africa World Cup 2026 free?', a: 'Watch on SportaLive — ETV, M6, beIN Sport 1 and La 1 live HD. No subscription, no account needed.' },
          { q: 'What time is Mexico vs South Africa kick-off?', a: '11 June 2026 at 19:00 UTC · 13:00 Mexico City · 21:00 Paris · 20:00 London · 15:00 New York.' },
          { q: '¿Dónde ver México vs Sudáfrica Mundial 2026 gratis?', a: 'En SportaLive en directo gratis en HD. Sin suscripción. El partido es el 11 de junio a las 13:00 hora de México en el Estadio Azteca.' },
          { q: 'كيف أشاهد المكسيك ضد جنوب أفريقيا مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك. الكرة على الساعة 19:00 UTC.' },
        ]}
        relatedLinks={[
          { href: '/world-cup-2026-live', label: '🔴 WC2026 Live Stream' },
          { href: '/wc2026', label: '📅 Full Schedule' },
          { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' },
          { href: '/germany-vs-curacao-2026', label: '🇩🇪 Germany vs Curaçao' },
          { href: '/channel/m6', label: '🇫🇷 M6 Live' },
          { href: '/channel/ar-bein-sport-uhd-1', label: '📡 beIN Sport 1' },
        ]}
      />
    </>
  );
}
