import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import AdBanner from '@/components/ads/AdBanner';
import WC2026StreamClient from '@/components/worldcup/WC2026StreamClient';

export const revalidate = 3600;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const SLUG = 'mexico-vs-south-africa-2026';
const PAGE_URL = `${SITE}/${SLUG}`;

const TITLE = 'Mexico vs South Africa LIVE — World Cup 2026 Free Stream | M6 · beIN Sport · La 1';
const DESC = '🔴 LIVE — Watch Mexico vs South Africa FIFA World Cup 2026 FREE. Group A opening match. Stream HD on M6, beIN Sport 1, La 1. No subscription. مشاهدة مباشرة مجاناً · Ver gratis · Regarder gratuit.';

const KEYWORDS = [
  // English
  'mexico vs south africa live stream free','mexico south africa world cup 2026',
  'watch mexico vs south africa online free','world cup 2026 group a live stream',
  'mexico south africa fifa world cup live','mexico vs south africa free stream',
  'world cup 2026 live stream free','mexico south africa 2026 kickoff',
  // French
  'mexique afrique du sud coupe du monde 2026 en direct','mexique afrique du sud streaming gratuit',
  'voir mexique afrique du sud gratuit','coupe du monde 2026 groupe a en direct',
  'mexique afrique du sud m6 en direct gratuit',
  // Spanish
  'mexico contra sudafrica en vivo gratis','copa del mundo 2026 grupo a en directo',
  'ver mexico sudafrica gratis online','mexico sudafrica mundial 2026 en vivo',
  // Arabic
  'المكسيك ضد جنوب افريقيا بث مباشر','كأس العالم 2026 بث مباشر مجاناً',
  'مشاهدة المكسيك جنوب افريقيا مجاناً','بين سبورت كأس العالم 2026',
  // Portuguese
  'mexico x africa do sul copa do mundo 2026 ao vivo','mexico africa do sul gratis',
  // German
  'mexiko südafrika weltmeisterschaft 2026 live stream','weltmeisterschaft 2026 gruppe a live',
  // Turkish
  'meksika güney afrika dünya kupası 2026 canlı izle',
  // Dutch
  'mexico vs south africa wereldkampioenschap 2026 live',
  // Italian
  'messico sudafrica coppa del mondo 2026 in diretta gratis',
  // Korean
  '멕시코 대 남아프리카공화국 2026 월드컵 무료 생중계',
  // Lineup / prediction
  'mexico vs south africa lineup 2026','mexico south africa prediction world cup',
  'tshikila mexico sudafrica 2026','mexico world cup 2026 starting 11',
  'where to watch mexico vs south africa world cup 2026',
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
    title: '🔴 LIVE: Mexico vs South Africa — World Cup 2026 FREE',
    description: 'Watch Mexico vs South Africa FIFA World Cup 2026 Group A FREE in HD — no registration.',
    type: 'website',
    siteName: 'SportaLive',
    images: [{ url: `${SITE}/api/og?home=Mexico&away=South+Africa&hf=mx&af=za&date=Jun+11`, width: 1200, height: 630, alt: 'Mexico vs South Africa World Cup 2026 Live Stream' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🔴 Mexico vs South Africa LIVE — World Cup 2026 Free Stream',
    description: 'Watch free HD — FIFA World Cup 2026 live on M6, beIN Sport.',
    images: [`${SITE}/og-wc2026.jpg`],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Mexico vs South Africa',
  alternateName: ['Mexico vs South Africa World Cup 2026', 'WC 2026 Group A'],
  description: 'FIFA World Cup 2026 Group A match between Mexico and South Africa. Watch live free on M6, beIN Sport 1, La 1.',
  startDate: '2026-06-11T20:00:00Z',
  endDate: '2026-06-11T22:00:00Z',
  sport: 'https://en.wikipedia.org/wiki/Association_football',
  location: {
    '@type': 'Place',
    name: 'Estadio Azteca',
    address: { '@type': 'PostalAddress', addressLocality: 'Mexico City', addressCountry: 'MX' },
  },
  offers: {
    '@type': 'Offer',
    name: 'Free Live Stream — Mexico vs South Africa World Cup 2026',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: PAGE_URL,
    validFrom: '2026-06-11T00:00:00Z',
    seller: { '@type': 'Organization', name: 'SportaLive', url: SITE },
  },
  url: PAGE_URL,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  competitor: [
    { '@type': 'SportsTeam', name: 'Mexico', sameAs: 'https://en.wikipedia.org/wiki/Mexico_national_football_team' },
    { '@type': 'SportsTeam', name: 'South Africa', sameAs: 'https://en.wikipedia.org/wiki/South_Africa_national_football_team' },
  ],
  organizer: { '@type': 'Organization', name: 'FIFA', url: 'https://www.fifa.com' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where to watch Mexico vs South Africa World Cup 2026 for free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Watch Mexico vs South Africa World Cup 2026 free on SportaLive. We stream M6, beIN Sport 1, and La 1 live in HD — no subscription, no registration. Click Watch and the stream starts instantly.' },
    },
    {
      '@type': 'Question',
      name: 'What time is Mexico vs South Africa kick-off at World Cup 2026?',
      acceptedAnswer: { '@type': 'Answer', text: 'Mexico vs South Africa kicks off on 11 June 2026 at 20:00 UTC (15:00 Mexico City, 22:00 Paris, 23:00 Riyadh, 21:00 London, 16:00 New York).' },
    },
    {
      '@type': 'Question',
      name: 'Which channel broadcasts Mexico vs South Africa at the 2026 World Cup?',
      acceptedAnswer: { '@type': 'Answer', text: 'Mexico vs South Africa is broadcast on M6 (France — free), beIN Sport 1 (MENA), La 1 RTVE (Spain — free), and other local broadcasters. Watch free on SportaLive worldwide.' },
    },
    {
      '@type': 'Question',
      name: 'How to watch Mexico vs South Africa World Cup 2026 online free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Go to SportaLive.live, open the Mexico vs South Africa page, pick a server (M6, beIN Sport 1, or La 1), and click Watch. HD quality, no subscription, no registration needed.' },
    },
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

export default async function MexicoVsSouthAfricaPage() {
  const [m6, bein, la1] = await Promise.all([
    findChannel(['m6', 'm6-hd', 'm6-fr'], ['M6']),
    findChannel(['ar-bein-sport-uhd-1', 'bein-sport-1', 'bein-sport-uhd-1'], ['beIN Sports 1', 'beIN Sport 1', 'beIN Sports UHD']),
    findChannel(['la-1', 'la-1-rtve', 'la1'], ['La 1', 'RTVE']),
  ]);

  const homeLineup = ['Malagón', 'Sánchez', 'Araujo', 'Montes', 'Gallardo', 'E.Álvarez', 'Rodríguez', 'Romo', 'Antuna', 'Giménez', 'Lozano'];
  const awayLineup = ['Williams', 'Sesane', 'Shalulile', 'Dolly', 'Tau', 'Mokoena', 'Maart', 'Ndlovu', 'Zwane', 'Jali', 'Mabunda'];

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-4xl mx-auto space-y-8">

        {/* Player first */}
        <section>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h1 className="text-white font-extrabold text-lg md:text-2xl leading-tight">
              🔴 Mexico vs South Africa — <span className="text-yellow-400">World Cup 2026 LIVE</span>
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
            match={{ home: 'Mexico', homeFlag: 'mx', away: 'South Africa', awayFlag: 'za', date: 'Thursday, 11 June 2026', time: '20:00 UTC' }}
          />
        </section>

        <AdBanner />

        {/* Hero */}
        <section className="relative rounded-3xl overflow-hidden border border-white/10"
          style={{ background: 'linear-gradient(135deg, #060f1a 0%, #0a1f12 50%, #060f1a 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-green-900/30 via-transparent to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-yellow-900/20 via-transparent to-transparent" />
          <div className="relative px-4 md:px-10 py-8 space-y-6">
            <div className="flex items-center justify-center gap-3">
              <span className="text-yellow-400 text-lg">⚽</span>
              <p className="text-yellow-300 text-xs md:text-sm font-bold uppercase tracking-[0.3em]">FIFA World Cup 2026 — Group A</p>
              <span className="text-yellow-400 text-lg">⚽</span>
            </div>
            <div className="flex items-center justify-center gap-6 md:gap-16">
              <div className="flex flex-col items-center gap-3">
                <img src="https://flagcdn.com/w160/mx.png" alt="Mexico" className="w-20 h-auto rounded shadow-lg" />
                <div className="text-center">
                  <p className="text-white font-black text-lg md:text-2xl uppercase">Mexico</p>
                  <p className="text-green-400 text-xs uppercase tracking-widest">El Tri</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Live</span>
                </div>
                <p className="text-white/20 font-black text-2xl md:text-4xl tracking-[0.4em]">VS</p>
                <p className="text-gray-400 text-xs">11 June 2026 · 20:00 UTC</p>
                <p className="text-yellow-400 text-xs font-bold">Estadio Azteca · Mexico City</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <img src="https://flagcdn.com/w160/za.png" alt="South Africa" className="w-20 h-auto rounded shadow-lg" />
                <div className="text-center">
                  <p className="text-white font-black text-lg md:text-2xl uppercase">South Africa</p>
                  <p className="text-yellow-400 text-xs uppercase tracking-widest">Bafana Bafana</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {[
                { icon: '📅', text: '11 June 2026' },
                { icon: '⏰', text: '20:00 UTC · 15:00 Mexico City' },
                { icon: '🏟️', text: 'Estadio Azteca' },
                { icon: '🏆', text: 'Group A · Matchday 1' },
              ].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300">
                  <span>{icon}</span>{text}
                </span>
              ))}
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Prediction: <span className="text-white font-bold">Mexico 2-1 South Africa</span></p>
            </div>
          </div>
        </section>

        {/* Kickoff times */}
        <section className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-3">
          <h2 className="text-white font-bold text-lg">🕒 Kickoff Times by Country</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {[
              { flag: '🇲🇽', country: 'Mexico', time: '15:00' },
              { flag: '🇫🇷', country: 'France', time: '22:00' },
              { flag: '🇸🇦', country: 'Arabia S.', time: '23:00' },
              { flag: '🇬🇧', country: 'UK', time: '21:00' },
              { flag: '🇺🇸', country: 'New York', time: '16:00' },
              { flag: '🌍', country: 'UTC', time: '20:00' },
            ].map(({ flag, country, time }) => (
              <div key={country} className="flex justify-between px-3 py-2 bg-white/[0.03] rounded-lg">
                <span className="text-gray-400">{flag} {country}</span>
                <span className="text-white font-bold">{time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Lineups */}
        <section className="space-y-4">
          <h2 className="text-white font-bold text-xl">⚽ Predicted Lineups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-950/30 border border-green-500/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img src="https://flagcdn.com/w40/mx.png" alt="Mexico" className="w-8 h-auto rounded" />
                <div>
                  <p className="text-white font-black uppercase">Mexico</p>
                  <p className="text-green-400 text-xs">4-3-3 · Predicted XI</p>
                </div>
              </div>
              <div className="space-y-1">
                {homeLineup.map((name) => (
                  <div key={name} className="flex items-center gap-2 py-1 border-b border-white/5 text-sm">
                    <span className="text-gray-200">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-yellow-950/20 border border-yellow-500/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img src="https://flagcdn.com/w40/za.png" alt="South Africa" className="w-8 h-auto rounded" />
                <div>
                  <p className="text-white font-black uppercase">South Africa</p>
                  <p className="text-yellow-400 text-xs">4-4-2 · Predicted XI</p>
                </div>
              </div>
              <div className="space-y-1">
                {awayLineup.map((name) => (
                  <div key={name} className="flex items-center gap-2 py-1 border-b border-white/5 text-sm">
                    <span className="text-gray-200">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">Frequently Asked Questions</h2>
          {[
            { q: 'Where to watch Mexico vs South Africa World Cup 2026 for free?', a: 'Watch right here on SportaLive — we stream M6, beIN Sport 1, and La 1 live in HD for free. No account needed. Click a server tab above.' },
            { q: 'What time is Mexico vs South Africa at World Cup 2026?', a: 'Kick-off: 11 June 2026 at 20:00 UTC (15:00 Mexico City, 22:00 Paris, 21:00 London, 16:00 New York, 23:00 Riyadh).' },
            { q: 'Which TV channel shows Mexico vs South Africa?', a: 'M6 (France — free), La 1 RTVE (Spain — free), beIN Sports 1 (MENA), plus local broadcasters. All free on SportaLive.' },
            { q: '¿Dónde ver México vs Sudáfrica Mundial 2026 gratis?', a: 'En SportaLive en directo gratis en HD. Sin suscripción, sin registro. El partido es el 11 de junio a las 15:00 hora de México.' },
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

        {/* Internal links */}
        <section className="flex flex-wrap gap-3 justify-center pb-4">
          {[
            { href: '/live', label: '📡 All Live Channels' },
            { href: '/world-cup-2026', label: '🏆 World Cup 2026' },
            { href: '/arsenal-vs-psg', label: '⚽ Arsenal vs PSG' },
            { href: '/korea-vs-czechia-2026', label: '🇰🇷 Korea vs Czechia' },
            { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' },
            { href: '/germany-vs-curacao-2026', label: '🇩🇪 Germany vs Curaçao' },
          ].map(({ href, label }) => (
            <Link key={href} href={href}
              className="px-4 py-2 bg-gray-800/60 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/30 text-gray-400 hover:text-white text-sm rounded-xl transition-all">
              {label}
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}
