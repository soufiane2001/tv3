import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import AdBanner from '@/components/ads/AdBanner';
import WC2026StreamClient from '@/components/worldcup/WC2026StreamClient';

export const revalidate = 3600;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const SLUG = 'usa-vs-paraguay-2026';
const PAGE_URL = `${SITE}/${SLUG}`;

const TITLE = 'USA vs Paraguay LIVE — World Cup 2026 Free Stream | M6 · beIN Sport · La 1';
const DESC = '🔴 LIVE — Watch USA vs Paraguay FIFA World Cup 2026 FREE. Group D match at SoFi Stadium Los Angeles. Stream HD on M6, beIN Sport 1, La 1. No subscription. Ver gratis · Regarder gratuit.';

const KEYWORDS = [
  'usa vs paraguay world cup 2026 live stream free','united states vs paraguay 2026',
  'watch usa vs paraguay online free','world cup 2026 group d usa paraguay',
  'etats unis paraguay coupe du monde 2026 en direct','usa paraguay streaming gratuit',
  'usa paraguay copa del mundo 2026 en vivo gratis',
  'usa vs paraguay dünya kupası 2026 canlı izle',
  'أمريكا ضد باراغواي كأس العالم 2026 بث مباشر',
  'usa vs paraguay weltmeisterschaft 2026 live',
  'usa vs paraguay coppa del mondo 2026 in diretta',
  'usa vs paraguai copa do mundo 2026 ao vivo',
  'usa vs paraguay wereldkampioenschap 2026 live',
  '미국 대 파라과이 2026 월드컵 무료 생중계',
  'christian pulisic world cup 2026','usa lineup world cup 2026',
  'where to watch usa vs paraguay world cup 2026',
  'sofi stadium los angeles world cup 2026',
].join(', ');

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: KEYWORDS,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'en': PAGE_URL, 'fr': PAGE_URL, 'ar': PAGE_URL, 'es': PAGE_URL,
      'pt': PAGE_URL, 'de': PAGE_URL, 'tr': PAGE_URL, 'nl': PAGE_URL,
      'it': PAGE_URL, 'ko': PAGE_URL,
    },
  },
  openGraph: {
    title: '🔴 LIVE: USA vs Paraguay — World Cup 2026 FREE',
    description: 'Watch USA vs Paraguay FIFA World Cup 2026 Group D FREE in HD.',
    type: 'website', siteName: 'SportaLive',
    images: [{ url: `${SITE}/og-wc2026.jpg`, width: 1200, height: 630, alt: 'USA vs Paraguay World Cup 2026 Live Stream' }],
  },
  twitter: { card: 'summary_large_image', title: '🔴 USA vs Paraguay LIVE — World Cup 2026', description: 'Watch free HD on SportaLive.', images: [`${SITE}/og-wc2026.jpg`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — USA vs Paraguay',
  description: 'FIFA World Cup 2026 Group D match between USA and Paraguay at SoFi Stadium Los Angeles.',
  startDate: '2026-06-12T23:00:00Z',
  endDate: '2026-06-13T01:00:00Z',
  sport: 'https://en.wikipedia.org/wiki/Association_football',
  location: { '@type': 'Place', name: 'SoFi Stadium', address: { '@type': 'PostalAddress', addressLocality: 'Inglewood', addressRegion: 'California', addressCountry: 'US' } },
  offers: { '@type': 'Offer', name: 'Free Live Stream', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: PAGE_URL, validFrom: '2026-06-12T00:00:00Z', seller: { '@type': 'Organization', name: 'SportaLive', url: SITE } },
  url: PAGE_URL,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  competitor: [
    { '@type': 'SportsTeam', name: 'United States', sameAs: 'https://en.wikipedia.org/wiki/United_States_men%27s_national_soccer_team' },
    { '@type': 'SportsTeam', name: 'Paraguay', sameAs: 'https://en.wikipedia.org/wiki/Paraguay_national_football_team' },
  ],
  organizer: { '@type': 'Organization', name: 'FIFA', url: 'https://www.fifa.com' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where to watch USA vs Paraguay World Cup 2026 for free?', acceptedAnswer: { '@type': 'Answer', text: 'Watch USA vs Paraguay World Cup 2026 free on SportaLive. M6, beIN Sport 1, and La 1 live in HD — no subscription needed.' } },
    { '@type': 'Question', name: 'What time is USA vs Paraguay at World Cup 2026?', acceptedAnswer: { '@type': 'Answer', text: 'USA vs Paraguay kicks off 12 June 2026 at 23:00 UTC (16:00 Los Angeles, 19:00 New York, 01:00+1 Paris, 00:00+1 London).' } },
    { '@type': 'Question', name: 'Which TV channel shows USA vs Paraguay 2026?', acceptedAnswer: { '@type': 'Answer', text: 'M6 (France — free), beIN Sports 1 (MENA), La 1 RTVE (Spain — free), Fox Soccer (USA), Telemundo (Spanish USA). Free worldwide on SportaLive.' } },
    { '@type': 'Question', name: '¿Dónde ver USA vs Paraguay Mundial 2026 gratis?', acceptedAnswer: { '@type': 'Answer', text: 'En SportaLive en directo gratis en HD. Sin suscripción, sin registro. El partido es el 12 de junio a las 23:00 UTC.' } },
  ],
};

async function findChannel(slugs: string[], patterns: string[]) {
  const bySlug = await prisma.channel.findFirst({ where: { slug: { in: slugs }, isActive: true }, orderBy: { order: 'asc' } }).catch(() => null);
  if (bySlug) return bySlug;
  for (const p of patterns) {
    const ch = await prisma.channel.findFirst({ where: { name: { contains: p, mode: 'insensitive' }, isActive: true }, orderBy: { order: 'asc' } }).catch(() => null);
    if (ch) return ch;
  }
  return null;
}

export default async function UsaVsParaguayPage() {
  const [m6, bein, la1] = await Promise.all([
    findChannel(['m6', 'm6-hd', 'm6-fr'], ['M6']),
    findChannel(['ar-bein-sport-uhd-1', 'bein-sport-1', 'bein-sport-uhd-1'], ['beIN Sports 1', 'beIN Sport 1', 'beIN Sports UHD']),
    findChannel(['la-1', 'la-1-rtve', 'la1'], ['La 1', 'RTVE']),
  ]);

  const homeLineup = ['Turner', 'Dest', 'Richards', 'Zimmerman', 'Robinson', 'McKennie', 'Adams', 'Musah', 'Reyna', 'Balogun', 'Pulisic'];
  const awayLineup = ['Silva', 'Alderete', 'Alonso', 'Balbuena', 'Arzamendia', 'Almirón', 'Sánchez', 'Cubas', 'Gómez', 'Enciso', 'Ocampos'];

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-4xl mx-auto space-y-8">

        <section>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h1 className="text-white font-extrabold text-lg md:text-2xl leading-tight">
              🔴 USA vs Paraguay — <span className="text-yellow-400">World Cup 2026 LIVE</span>
            </h1>
            <span className="flex items-center gap-1.5 text-red-400 text-xs font-bold bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />LIVE
            </span>
          </div>
          <WC2026StreamClient
            servers={[
              { label: 'M6', sublabel: 'France · Gratuit', channel: m6 as any },
              { label: 'beIN Sport 1', sublabel: 'UHD · عربي', channel: bein as any },
              { label: 'La 1', sublabel: 'RTVE · España', channel: la1 as any },
            ]}
            match={{ home: 'USA', homeFlag: 'us', away: 'Paraguay', awayFlag: 'py', date: 'Friday, 12 June 2026', time: '23:00 UTC' }}
          />
        </section>

        <AdBanner />

        <section className="relative rounded-3xl overflow-hidden border border-white/10"
          style={{ background: 'linear-gradient(135deg, #030818 0%, #0a1020 50%, #030818 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="relative px-4 md:px-10 py-8 space-y-6">
            <div className="flex items-center justify-center gap-3">
              <span className="text-yellow-400 text-lg">⚽</span>
              <p className="text-yellow-300 text-xs md:text-sm font-bold uppercase tracking-[0.3em]">FIFA World Cup 2026 — Group D</p>
              <span className="text-yellow-400 text-lg">⚽</span>
            </div>
            <div className="flex items-center justify-center gap-6 md:gap-16">
              <div className="flex flex-col items-center gap-3">
                <img src="https://flagcdn.com/w160/us.png" alt="USA" className="w-20 h-auto rounded shadow-lg" />
                <div className="text-center"><p className="text-white font-black text-lg md:text-2xl uppercase">USA</p><p className="text-blue-400 text-xs uppercase tracking-widest">USMNT</p></div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Live</span>
                </div>
                <p className="text-white/20 font-black text-2xl md:text-4xl tracking-[0.4em]">VS</p>
                <p className="text-gray-400 text-xs">12 June 2026 · 23:00 UTC</p>
                <p className="text-yellow-400 text-xs font-bold">SoFi Stadium · Los Angeles</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <img src="https://flagcdn.com/w160/py.png" alt="Paraguay" className="w-20 h-auto rounded shadow-lg" />
                <div className="text-center"><p className="text-white font-black text-lg md:text-2xl uppercase">Paraguay</p><p className="text-red-400 text-xs uppercase tracking-widest">La Albirroja</p></div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {[{ icon: '📅', text: '12 June 2026' }, { icon: '⏰', text: '23:00 UTC · 16:00 LA' }, { icon: '🏟️', text: 'SoFi Stadium' }, { icon: '🏆', text: 'Group D · Matchday 1' }].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300"><span>{icon}</span>{text}</span>
              ))}
            </div>
            <div className="text-center"><p className="text-gray-400 text-sm">Prediction: <span className="text-white font-bold">USA 2-1 Paraguay</span></p></div>
          </div>
        </section>

        <section className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-3">
          <h2 className="text-white font-bold text-lg">🕒 Kickoff Times by Country</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {[{ flag: '🇺🇸', country: 'Los Angeles', time: '16:00' }, { flag: '🇺🇸', country: 'New York', time: '19:00' }, { flag: '🇫🇷', country: 'France', time: '01:00+1' }, { flag: '🇸🇦', country: 'Arabia S.', time: '02:00+1' }, { flag: '🇬🇧', country: 'UK', time: '00:00+1' }, { flag: '🌍', country: 'UTC', time: '23:00' }].map(({ flag, country, time }) => (
              <div key={country} className="flex justify-between px-3 py-2 bg-white/[0.03] rounded-lg">
                <span className="text-gray-400">{flag} {country}</span>
                <span className="text-white font-bold">{time}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-white font-bold text-xl">⚽ Predicted Lineups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-950/30 border border-blue-500/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img src="https://flagcdn.com/w40/us.png" alt="USA" className="w-8 h-auto rounded" />
                <div><p className="text-white font-black uppercase">USA</p><p className="text-blue-400 text-xs">4-3-3 · Predicted XI</p></div>
              </div>
              <div className="space-y-1">{homeLineup.map((name) => (<div key={name} className="flex items-center gap-2 py-1 border-b border-white/5 text-sm"><span className="text-gray-200">{name}</span></div>))}</div>
            </div>
            <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img src="https://flagcdn.com/w40/py.png" alt="Paraguay" className="w-8 h-auto rounded" />
                <div><p className="text-white font-black uppercase">Paraguay</p><p className="text-red-400 text-xs">4-4-2 · Predicted XI</p></div>
              </div>
              <div className="space-y-1">{awayLineup.map((name) => (<div key={name} className="flex items-center gap-2 py-1 border-b border-white/5 text-sm"><span className="text-gray-200">{name}</span></div>))}</div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">Frequently Asked Questions</h2>
          {[
            { q: 'Where to watch USA vs Paraguay World Cup 2026 for free?', a: 'Watch on SportaLive — stream M6, beIN Sport 1, and La 1 live in HD for free. No account needed.' },
            { q: 'What time is USA vs Paraguay at World Cup 2026?', a: 'Kick-off: 12 June 2026 at 23:00 UTC (16:00 LA, 19:00 New York, 01:00+1 Paris, 00:00+1 London).' },
            { q: 'Which TV channel shows USA vs Paraguay 2026?', a: 'M6 (France — free), beIN Sports 1 (MENA), La 1 RTVE (Spain — free), Fox Soccer (USA). Free on SportaLive.' },
            { q: '¿Dónde ver USA vs Paraguay Mundial 2026 gratis?', a: 'En SportaLive en directo gratis en HD. Sin suscripción. El partido es el 12 de junio a las 23:00 UTC (16:00 hora de Los Ángeles).' },
          ].map(({ q, a }, i) => (
            <details key={i} className="bg-gray-800/40 border border-white/5 rounded-xl p-4 cursor-pointer group">
              <summary className="text-white font-semibold text-sm list-none flex justify-between items-center gap-3">
                {q}<span className="text-purple-400 text-lg group-open:rotate-45 transition-transform flex-shrink-0">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{a}</p>
            </details>
          ))}
        </section>

        <AdBanner />

        <section className="flex flex-wrap gap-3 justify-center pb-4">
          {[
            { href: '/live', label: '📡 All Live Channels' },
            { href: '/world-cup-2026', label: '🏆 World Cup 2026' },
            { href: '/canada-vs-bosnia-2026', label: '🇨🇦 Canada vs Bosnia' },
            { href: '/mexico-vs-south-africa-2026', label: '🇲🇽 Mexico vs South Africa' },
            { href: '/germany-vs-curacao-2026', label: '🇩🇪 Germany vs Curaçao' },
            { href: '/arsenal-vs-psg', label: '⚽ Arsenal vs PSG' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="px-4 py-2 bg-gray-800/60 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/30 text-gray-400 hover:text-white text-sm rounded-xl transition-all">
              {label}
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}
