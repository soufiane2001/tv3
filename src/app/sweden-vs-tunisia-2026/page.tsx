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
const SLUG = 'sweden-vs-tunisia-2026';
const PAGE_URL = `${SITE}/${SLUG}`;

const TITLE = 'Sweden vs Tunisia LIVE — World Cup 2026 Free Stream | M6 · beIN Sport · La 1';
const DESC = '🔴 LIVE — Watch Sweden vs Tunisia FIFA World Cup 2026 FREE. Group F at Estadio BBVA Monterrey. Stream HD on M6, beIN Sport 1, La 1. No subscription. تونس ضد السويد بث مباشر · Ver gratis.';

const KEYWORDS = [
  'sweden vs tunisia world cup 2026 live stream free','suede tunisie coupe du monde 2026',
  'watch sweden vs tunisia online free','world cup 2026 group f sweden tunisia',
  'suède tunisie coupe du monde 2026 en direct','suède tunisie streaming gratuit',
  'suecia vs tunez copa del mundo 2026 en vivo gratis',
  'isveç tunus dünya kupası 2026 canlı izle',
  'السويد ضد تونس كأس العالم 2026 بث مباشر مجاناً',
  'مشاهدة السويد تونس مجاناً بين سبورت',
  'schweden tunesien weltmeisterschaft 2026 live stream',
  'svezia vs tunisia coppa del mondo 2026 in diretta',
  'suécia vs tunísia copa do mundo 2026 ao vivo',
  'zweden vs tunesië wereldkampioenschap 2026 live',
  '스웨덴 대 튀니지 2026 월드컵 생중계',
  'gyokeres isak sweden world cup 2026','msakni jebali tunisia world cup 2026',
  'where to watch sweden vs tunisia world cup 2026',
  'estadio bbva monterrey world cup 2026',
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
    title: '🔴 LIVE: Sweden vs Tunisia — World Cup 2026 FREE',
    description: 'Watch Sweden vs Tunisia FIFA World Cup 2026 Group F FREE in HD.',
    type: 'website', siteName: 'SportaLive',
    images: [{ url: `${SITE}/api/og?home=Sweden&away=Tunisia&hf=se&af=tn&date=Jun+16`, width: 1200, height: 630, alt: 'Sweden vs Tunisia World Cup 2026 Live Stream' }],
  },
  twitter: { card: 'summary_large_image', title: '🔴 Sweden vs Tunisia LIVE — World Cup 2026', description: 'Watch free HD on SportaLive — beIN Sport 1, M6.', images: [`${SITE}/og-wc2026.jpg`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Sweden vs Tunisia',
  description: 'FIFA World Cup 2026 Group F match between Sweden and Tunisia at Estadio BBVA Monterrey.',
  startDate: '2026-06-14T23:00:00Z',
  endDate: '2026-06-15T01:00:00Z',
  sport: 'https://en.wikipedia.org/wiki/Association_football',
  location: { '@type': 'Place', name: 'Estadio BBVA', address: { '@type': 'PostalAddress', addressLocality: 'Monterrey', addressCountry: 'MX' } },
  offers: { '@type': 'Offer', name: 'Free Live Stream', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: PAGE_URL, validFrom: '2026-06-14T00:00:00Z', seller: { '@type': 'Organization', name: 'SportaLive', url: SITE } },
  url: PAGE_URL,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  competitor: [
    { '@type': 'SportsTeam', name: 'Sweden', sameAs: 'https://en.wikipedia.org/wiki/Sweden_national_football_team' },
    { '@type': 'SportsTeam', name: 'Tunisia', sameAs: 'https://en.wikipedia.org/wiki/Tunisia_national_football_team' },
  ],
  organizer: { '@type': 'Organization', name: 'FIFA', url: 'https://www.fifa.com' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where to watch Sweden vs Tunisia World Cup 2026 for free?', acceptedAnswer: { '@type': 'Answer', text: 'Watch Sweden vs Tunisia World Cup 2026 free on SportaLive. beIN Sport 1, M6, and La 1 live in HD — no subscription needed.' } },
    { '@type': 'Question', name: 'What time is Sweden vs Tunisia at World Cup 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Sweden vs Tunisia kicks off 14 June 2026 at 23:00 UTC (18:00 Monterrey, 01:00+1 Stockholm, 02:00+1 Tunis).' } },
    { '@type': 'Question', name: 'Which TV channel shows Sweden vs Tunisia 2026?', acceptedAnswer: { '@type': 'Answer', text: 'M6 (France — free), beIN Sports 1 (MENA — biggest for Tunisia fans), La 1 RTVE (Spain — free), SVT (Sweden — free). Free worldwide on SportaLive.' } },
    { '@type': 'Question', name: 'أين أشاهد السويد ضد تونس كأس العالم 2026 مجاناً؟', acceptedAnswer: { '@type': 'Answer', text: 'شاهد السويد ضد تونس مجاناً وبجودة HD على موقع SportaLive. اختر قناة beIN Sport 1 أو M6. المباراة في 14 يونيو الساعة 23:00 UTC (02:00+1 بتوقيت تونس).' } },
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

export default async function SwedenVsTunisiaPage() {
  const [m6, bein, la1] = await Promise.all([
    findChannel(['m6', 'm6-hd', 'm6-fr'], ['M6']),
    findChannel(['ar-bein-sport-uhd-1', 'bein-sport-1', 'bein-sport-uhd-1'], ['beIN Sports 1', 'beIN Sport 1', 'beIN Sports UHD']),
    findChannel(['la-1', 'la-1-rtve', 'la1'], ['La 1', 'RTVE']),
  ]);

  const homeLineup = ['Olsen', 'Lustig', 'Lindelöf', 'Danielson', 'Augustinsson', 'Forsberg', 'Ekdal', 'Olsson', 'Kulusevski', 'Gyökeres', 'Isak'];
  const awayLineup = ['Hassen', 'Bronn', 'Meriah', 'Ben Romdhane', 'Abdi', 'Skhiri', 'Sassi', 'Laidouni', 'Msakni', 'Jebali', 'Khazri'];

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-4xl mx-auto space-y-8">

        <section>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h1 className="text-white font-extrabold text-lg md:text-2xl leading-tight">
              🔴 Sweden vs Tunisia — <span className="text-yellow-400">World Cup 2026 LIVE</span>
            </h1>
            <span className="flex items-center gap-1.5 text-red-400 text-xs font-bold bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />LIVE
            </span>
          </div>
          <WC2026StreamClient
            servers={[
              { label: 'beIN Sport 1', sublabel: 'UHD · عربي', channel: bein as any },
              { label: 'M6', sublabel: 'France · Gratuit', channel: m6 as any },
              { label: 'La 1', sublabel: 'RTVE · España', channel: la1 as any },
            ]}
            match={{ home: 'Sweden', homeFlag: 'se', away: 'Tunisia', awayFlag: 'tn', date: 'Sunday, 14 June 2026', time: '23:00 UTC' }}
          />
        </section>

        <AdBanner />

        <section className="relative rounded-3xl overflow-hidden border border-white/10"
          style={{ background: 'linear-gradient(135deg, #06121a 0%, #1a0a05 50%, #06121a 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="relative px-4 md:px-10 py-8 space-y-6">
            <div className="flex items-center justify-center gap-3">
              <span className="text-yellow-400 text-lg">⚽</span>
              <p className="text-yellow-300 text-xs md:text-sm font-bold uppercase tracking-[0.3em]">FIFA World Cup 2026 — Group F</p>
              <span className="text-yellow-400 text-lg">⚽</span>
            </div>
            <div className="flex items-center justify-center gap-6 md:gap-16">
              <div className="flex flex-col items-center gap-3">
                <img src="https://flagcdn.com/w160/se.png" alt="Sweden" className="w-20 h-auto rounded shadow-lg" />
                <div className="text-center"><p className="text-white font-black text-lg md:text-2xl uppercase">Sweden</p><p className="text-yellow-400 text-xs uppercase tracking-widest">Blågult</p></div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Live</span>
                </div>
                <p className="text-white/20 font-black text-2xl md:text-4xl tracking-[0.4em]">VS</p>
                <p className="text-gray-400 text-xs">14 June 2026 · 23:00 UTC</p>
                <p className="text-yellow-400 text-xs font-bold">Estadio BBVA · Monterrey</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <img src="https://flagcdn.com/w160/tn.png" alt="Tunisia" className="w-20 h-auto rounded shadow-lg" />
                <div className="text-center"><p className="text-white font-black text-lg md:text-2xl uppercase">Tunisia</p><p className="text-red-400 text-xs uppercase tracking-widest">Aigles de Carthage</p></div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {[{ icon: '📅', text: '14 June 2026' }, { icon: '⏰', text: '23:00 UTC · 18:00 Monterrey' }, { icon: '🏟️', text: 'Estadio BBVA' }, { icon: '🏆', text: 'Group F · Matchday 1' }].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300"><span>{icon}</span>{text}</span>
              ))}
            </div>
            <div className="text-center"><p className="text-gray-400 text-sm">Prediction: <span className="text-white font-bold">Sweden 2-0 Tunisia</span></p></div>
          </div>
        </section>

        <section className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-3">
          <h2 className="text-white font-bold text-lg">🕒 Kickoff Times by Country</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {[{ flag: '🇸🇪', country: 'Stockholm', time: '01:00+1' }, { flag: '🇹🇳', country: 'Tunis', time: '02:00+1' }, { flag: '🇫🇷', country: 'France', time: '01:00+1' }, { flag: '🇸🇦', country: 'Arabia S.', time: '02:00+1' }, { flag: '🇬🇧', country: 'UK', time: '00:00+1' }, { flag: '🌍', country: 'UTC', time: '23:00' }].map(({ flag, country, time }) => (
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
            <div className="bg-yellow-950/20 border border-yellow-500/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img src="https://flagcdn.com/w40/se.png" alt="Sweden" className="w-8 h-auto rounded" />
                <div><p className="text-white font-black uppercase">Sweden</p><p className="text-yellow-400 text-xs">4-3-3 · Predicted XI</p></div>
              </div>
              <div className="space-y-1">{homeLineup.map((name) => (<div key={name} className="flex items-center gap-2 py-1 border-b border-white/5 text-sm"><span className="text-gray-200">{name}</span></div>))}</div>
            </div>
            <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img src="https://flagcdn.com/w40/tn.png" alt="Tunisia" className="w-8 h-auto rounded" />
                <div><p className="text-white font-black uppercase">Tunisia</p><p className="text-red-400 text-xs">4-3-3 · Predicted XI</p></div>
              </div>
              <div className="space-y-1">{awayLineup.map((name) => (<div key={name} className="flex items-center gap-2 py-1 border-b border-white/5 text-sm"><span className="text-gray-200">{name}</span></div>))}</div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">Frequently Asked Questions</h2>
          {[
            { q: 'Where to watch Sweden vs Tunisia World Cup 2026 for free?', a: 'Watch on SportaLive — beIN Sport 1, M6, and La 1 live in HD for free. No account needed.' },
            { q: 'What time is Sweden vs Tunisia at World Cup 2026?', a: 'Kick-off: 14 June 2026 at 23:00 UTC (18:00 Monterrey, 01:00+1 Stockholm, 02:00+1 Tunis).' },
            { q: 'Which TV channel shows Sweden vs Tunisia 2026?', a: 'beIN Sports 1 (MENA — key for Tunisia fans), M6 (France — free), La 1 RTVE (Spain — free), SVT (Sweden — free). Free on SportaLive.' },
            { q: 'أين أشاهد السويد ضد تونس كأس العالم 2026 مجاناً؟', a: 'على موقع SportaLive — اختر beIN Sport 1 أو M6. بجودة HD، بدون اشتراك. المباراة في 14 يونيو الساعة 23:00 UTC (02:00+1 بتوقيت تونس).' },
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
            { href: '/netherlands-vs-japan-2026', label: '🇳🇱 Netherlands vs Japan' },
            { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' },
            { href: '/mexico-vs-south-africa-2026', label: '🇲🇽 Mexico vs South Africa' },
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
