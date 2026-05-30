import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import AdBanner from '@/components/ads/AdBanner';
import WC2026StreamClient from '@/components/worldcup/WC2026StreamClient';
import MatchBlog from '@/components/match/MatchBlog';
import { blogs } from '@/data/wc2026-blogs';

export const revalidate = 3600;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const SLUG = 'haiti-vs-scotland-2026';
const PAGE_URL = `${SITE}/${SLUG}`;

const TITLE = 'Haiti vs Scotland LIVE — World Cup 2026 Free Stream | M6 · beIN Sport · La 1';
const DESC = '🔴 LIVE — Watch Haiti vs Scotland FIFA World Cup 2026 FREE. Group C match at Gillette Stadium Boston. Stream HD on M6, beIN Sport 1, La 1. No subscription. Ver gratis · Regarder gratuit.';

const KEYWORDS = [
  'haiti vs scotland world cup 2026 live stream free','haiti scotland 2026 world cup',
  'watch haiti vs scotland online free','world cup 2026 group c haiti scotland',
  'haïti ecosse coupe du monde 2026 en direct','haïti ecosse streaming gratuit',
  'haiti vs scotland copa del mundo 2026 en vivo gratis',
  'haiti vs iskocya dünya kupası 2026 canlı izle',
  'هايتي ضد اسكتلندا كأس العالم 2026 بث مباشر',
  'haiti vs schottland weltmeisterschaft 2026 live',
  'haiti vs scozia coppa del mondo 2026 in diretta',
  'haiti vs escócia copa do mundo 2026 ao vivo',
  'haiti vs schotland wereldkampioenschap 2026 live',
  '아이티 대 스코틀랜드 2026 월드컵 생중계',
  'scotland lineup world cup 2026','mcginn mctominay world cup 2026',
  'where to watch haiti vs scotland world cup 2026',
  'gillette stadium boston world cup 2026',
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
    title: '🔴 LIVE: Haiti vs Scotland — World Cup 2026 FREE',
    description: 'Watch Haiti vs Scotland FIFA World Cup 2026 Group C FREE in HD.',
    type: 'website', siteName: 'SportaLive',
    images: [{ url: `${SITE}/api/og?home=Haiti&away=Scotland&hf=ht&af=gb&date=Jun+13`, width: 1200, height: 630, alt: 'Haiti vs Scotland World Cup 2026 Live Stream' }],
  },
  twitter: { card: 'summary_large_image', title: '🔴 Haiti vs Scotland LIVE — World Cup 2026', description: 'Watch free HD on SportaLive.', images: [`${SITE}/og-wc2026.jpg`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Haiti vs Scotland',
  description: 'FIFA World Cup 2026 Group C match between Haiti and Scotland at Gillette Stadium Boston.',
  startDate: '2026-06-13T20:00:00Z',
  endDate: '2026-06-13T22:00:00Z',
  sport: 'https://en.wikipedia.org/wiki/Association_football',
  location: { '@type': 'Place', name: 'Gillette Stadium', address: { '@type': 'PostalAddress', addressLocality: 'Foxborough', addressRegion: 'Massachusetts', addressCountry: 'US' } },
  offers: { '@type': 'Offer', name: 'Free Live Stream', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: PAGE_URL, validFrom: '2026-06-13T00:00:00Z', seller: { '@type': 'Organization', name: 'SportaLive', url: SITE } },
  url: PAGE_URL,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  competitor: [
    { '@type': 'SportsTeam', name: 'Haiti', sameAs: 'https://en.wikipedia.org/wiki/Haiti_national_football_team' },
    { '@type': 'SportsTeam', name: 'Scotland', sameAs: 'https://en.wikipedia.org/wiki/Scotland_national_football_team' },
  ],
  organizer: { '@type': 'Organization', name: 'FIFA', url: 'https://www.fifa.com' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where to watch Haiti vs Scotland World Cup 2026 for free?', acceptedAnswer: { '@type': 'Answer', text: 'Watch Haiti vs Scotland World Cup 2026 free on SportaLive. M6, beIN Sport 1, and La 1 live in HD — no subscription needed.' } },
    { '@type': 'Question', name: 'What time is Haiti vs Scotland at World Cup 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Haiti vs Scotland kicks off 13 June 2026 at 20:00 UTC (16:00 Boston, 22:00 Paris, 21:00 London, 23:00 Riyadh).' } },
    { '@type': 'Question', name: 'Which TV channel shows Haiti vs Scotland 2026?', acceptedAnswer: { '@type': 'Answer', text: 'M6 (France — free), beIN Sports 1 (MENA), La 1 RTVE (Spain — free), BBC Scotland (UK — free). Free worldwide on SportaLive.' } },
    { '@type': 'Question', name: 'Comment voir Haïti vs Écosse Coupe du Monde 2026 gratuitement?', acceptedAnswer: { '@type': 'Answer', text: 'Sur SportaLive, stream M6 en direct et gratuit en HD. Sans abonnement, sans inscription. Le match commence le 13 juin à 22h00 heure française.' } },
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

export default async function HaitiVsScotlandPage() {
  const [m6, bein, la1] = await Promise.all([
    findChannel(['m6', 'm6-hd', 'm6-fr'], ['M6']),
    findChannel(['ar-bein-sport-uhd-1', 'bein-sport-1', 'bein-sport-uhd-1'], ['beIN Sports 1', 'beIN Sport 1', 'beIN Sports UHD']),
    findChannel(['la-1', 'la-1-rtve', 'la1'], ['La 1', 'RTVE']),
  ]);

  const homeLineup = ['Décélus', 'Pierre', 'Berrouet', 'Angellot', 'Gilles', 'Nazon', 'Louis', 'Pierrot', 'Jean', 'Franking', 'Lherisson'];
  const awayLineup = ['Gordon', 'Ralston', 'Souttar', 'Hendry', 'Robertson', 'McTominay', 'Gilmour', 'McGinn', 'Christie', 'Adams', 'Dykes'];

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-4xl mx-auto space-y-8">

        <section>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h1 className="text-white font-extrabold text-lg md:text-2xl leading-tight">
              🔴 Haiti vs Scotland — <span className="text-yellow-400">World Cup 2026 LIVE</span>
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
            match={{ home: 'Haiti', homeFlag: 'ht', away: 'Scotland', awayFlag: 'gb', date: 'Saturday, 13 June 2026', time: '20:00 UTC' }}
          />
        </section>

        <AdBanner />

        <section className="relative rounded-3xl overflow-hidden border border-white/10"
          style={{ background: 'linear-gradient(135deg, #03071a 0%, #050d1f 50%, #03071a 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="relative px-4 md:px-10 py-8 space-y-6">
            <div className="flex items-center justify-center gap-3">
              <span className="text-yellow-400 text-lg">⚽</span>
              <p className="text-yellow-300 text-xs md:text-sm font-bold uppercase tracking-[0.3em]">FIFA World Cup 2026 — Group C</p>
              <span className="text-yellow-400 text-lg">⚽</span>
            </div>
            <div className="flex items-center justify-center gap-6 md:gap-16">
              <div className="flex flex-col items-center gap-3">
                <img src="https://flagcdn.com/w160/ht.png" alt="Haiti" className="w-20 h-auto rounded shadow-lg" />
                <div className="text-center"><p className="text-white font-black text-lg md:text-2xl uppercase">Haiti</p><p className="text-blue-400 text-xs uppercase tracking-widest">Les Grenadiers</p></div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Live</span>
                </div>
                <p className="text-white/20 font-black text-2xl md:text-4xl tracking-[0.4em]">VS</p>
                <p className="text-gray-400 text-xs">13 June 2026 · 20:00 UTC</p>
                <p className="text-yellow-400 text-xs font-bold">Gillette Stadium · Boston</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <img src="https://flagcdn.com/w160/gb.png" alt="Scotland" className="w-20 h-auto rounded shadow-lg" />
                <div className="text-center"><p className="text-white font-black text-lg md:text-2xl uppercase">Scotland</p><p className="text-blue-400 text-xs uppercase tracking-widest">The Tartan Army</p></div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {[{ icon: '📅', text: '13 June 2026' }, { icon: '⏰', text: '20:00 UTC · 16:00 Boston' }, { icon: '🏟️', text: 'Gillette Stadium' }, { icon: '🏆', text: 'Group C · Matchday 1' }].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300"><span>{icon}</span>{text}</span>
              ))}
            </div>
            <div className="text-center"><p className="text-gray-400 text-sm">Prediction: <span className="text-white font-bold">Scotland 3-0 Haiti</span></p></div>
          </div>
        </section>

        <section className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-3">
          <h2 className="text-white font-bold text-lg">🕒 Kickoff Times by Country</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {[{ flag: '🇺🇸', country: 'Boston', time: '16:00' }, { flag: '🇬🇧', country: 'Scotland', time: '21:00' }, { flag: '🇫🇷', country: 'France', time: '22:00' }, { flag: '🇸🇦', country: 'Arabia S.', time: '23:00' }, { flag: '🇭🇹', country: 'Haiti', time: '16:00' }, { flag: '🌍', country: 'UTC', time: '20:00' }].map(({ flag, country, time }) => (
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
                <img src="https://flagcdn.com/w40/ht.png" alt="Haiti" className="w-8 h-auto rounded" />
                <div><p className="text-white font-black uppercase">Haiti</p><p className="text-blue-400 text-xs">4-4-2 · Predicted XI</p></div>
              </div>
              <div className="space-y-1">{homeLineup.map((name) => (<div key={name} className="flex items-center gap-2 py-1 border-b border-white/5 text-sm"><span className="text-gray-200">{name}</span></div>))}</div>
            </div>
            <div className="bg-blue-950/20 border border-blue-400/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img src="https://flagcdn.com/w40/gb.png" alt="Scotland" className="w-8 h-auto rounded" />
                <div><p className="text-white font-black uppercase">Scotland</p><p className="text-blue-400 text-xs">4-3-3 · Predicted XI</p></div>
              </div>
              <div className="space-y-1">{awayLineup.map((name) => (<div key={name} className="flex items-center gap-2 py-1 border-b border-white/5 text-sm"><span className="text-gray-200">{name}</span></div>))}</div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">Frequently Asked Questions</h2>
          {[
            { q: 'Where to watch Haiti vs Scotland World Cup 2026 for free?', a: 'Watch on SportaLive — stream M6, beIN Sport 1, and La 1 live in HD for free. No account needed.' },
            { q: 'What time is Haiti vs Scotland at World Cup 2026?', a: 'Kick-off: 13 June 2026 at 20:00 UTC (16:00 Boston, 22:00 Paris, 21:00 London, 23:00 Riyadh).' },
            { q: 'Which TV channel shows Haiti vs Scotland 2026?', a: 'M6 (France — free), beIN Sports 1 (MENA), La 1 RTVE (Spain — free), BBC Scotland (UK — free). All free on SportaLive.' },
            { q: 'Comment voir Haïti vs Écosse Coupe du Monde 2026 gratuitement?', a: 'Sur SportaLive, stream M6 en direct et gratuit en HD. Sans abonnement. Le match commence le 13 juin à 22h00 heure française.' },
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
            { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' },
            { href: '/australia-vs-turkiye-2026', label: '🇦🇺 Australia vs Türkiye' },
            { href: '/canada-vs-bosnia-2026', label: '🇨🇦 Canada vs Bosnia' },
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
