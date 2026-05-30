import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import AdBanner from '@/components/ads/AdBanner';
import WC2026StreamClient from '@/components/worldcup/WC2026StreamClient';

export const revalidate = 3600;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const SLUG = 'qatar-vs-switzerland-2026';
const PAGE_URL = `${SITE}/${SLUG}`;

const TITLE = 'Qatar vs Switzerland LIVE — World Cup 2026 Free Stream | M6 · beIN Sport · La 1';
const DESC = '🔴 LIVE — Watch Qatar vs Switzerland FIFA World Cup 2026 FREE. Group B at Levi\'s Stadium San Francisco. Stream HD on M6, beIN Sport 1, La 1. No subscription. قطر ضد سويسرا بث مباشر.';

const KEYWORDS = [
  'qatar vs switzerland world cup 2026 live stream free','qatar switzerland 2026 world cup',
  'watch qatar vs switzerland online free','world cup 2026 group b qatar switzerland',
  'qatar suisse coupe du monde 2026 en direct','qatar suisse streaming gratuit',
  'qatar vs suiza copa del mundo 2026 en vivo gratis',
  'katar isviçre dünya kupası 2026 canlı izle',
  'قطر ضد سويسرا كأس العالم 2026 بث مباشر مجاناً',
  'مشاهدة قطر سويسرا مجاناً',
  'katar schweiz weltmeisterschaft 2026 live stream',
  'qatar vs svizzera coppa del mondo 2026 in diretta',
  'qatar vs suíça copa do mundo 2026 ao vivo',
  'qatar vs zwitserland wereldkampioenschap 2026 live',
  '카타르 대 스위스 2026 월드컵 생중계',
  'xhaka embolo switzerland world cup 2026',
  'where to watch qatar vs switzerland world cup 2026',
  "levi's stadium san francisco world cup 2026",
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
    title: '🔴 LIVE: Qatar vs Switzerland — World Cup 2026 FREE',
    description: "Watch Qatar vs Switzerland FIFA World Cup 2026 Group B FREE in HD at Levi's Stadium.",
    type: 'website', siteName: 'SportaLive',
    images: [{ url: `${SITE}/og-wc2026.jpg`, width: 1200, height: 630, alt: 'Qatar vs Switzerland World Cup 2026 Live Stream' }],
  },
  twitter: { card: 'summary_large_image', title: '🔴 Qatar vs Switzerland LIVE — World Cup 2026', description: 'Watch free HD on SportaLive.', images: [`${SITE}/og-wc2026.jpg`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Qatar vs Switzerland',
  description: "FIFA World Cup 2026 Group B match between Qatar and Switzerland at Levi's Stadium San Francisco.",
  startDate: '2026-06-13T23:00:00Z',
  endDate: '2026-06-14T01:00:00Z',
  sport: 'https://en.wikipedia.org/wiki/Association_football',
  location: { '@type': 'Place', name: "Levi's Stadium", address: { '@type': 'PostalAddress', addressLocality: 'Santa Clara', addressRegion: 'California', addressCountry: 'US' } },
  offers: { '@type': 'Offer', name: 'Free Live Stream', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: PAGE_URL, validFrom: '2026-06-13T00:00:00Z', seller: { '@type': 'Organization', name: 'SportaLive', url: SITE } },
  url: PAGE_URL,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  competitor: [
    { '@type': 'SportsTeam', name: 'Qatar', sameAs: 'https://en.wikipedia.org/wiki/Qatar_national_football_team' },
    { '@type': 'SportsTeam', name: 'Switzerland', sameAs: 'https://en.wikipedia.org/wiki/Switzerland_national_football_team' },
  ],
  organizer: { '@type': 'Organization', name: 'FIFA', url: 'https://www.fifa.com' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where to watch Qatar vs Switzerland World Cup 2026 for free?', acceptedAnswer: { '@type': 'Answer', text: 'Watch Qatar vs Switzerland World Cup 2026 free on SportaLive. beIN Sport 1, M6, and La 1 live in HD — no subscription needed.' } },
    { '@type': 'Question', name: 'What time is Qatar vs Switzerland at World Cup 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Qatar vs Switzerland kicks off 13 June 2026 at 23:00 UTC (16:00 San Francisco, 01:00+1 Paris, 02:00+1 Doha).' } },
    { '@type': 'Question', name: 'Which TV channel shows Qatar vs Switzerland 2026?', acceptedAnswer: { '@type': 'Answer', text: 'beIN Sports 1 (Qatar/MENA — biggest channel for Qatar), M6 (France — free), La 1 RTVE (Spain — free), SRF (Switzerland — free). Free on SportaLive.' } },
    { '@type': 'Question', name: 'أين أشاهد قطر ضد سويسرا كأس العالم 2026 مجاناً؟', acceptedAnswer: { '@type': 'Answer', text: 'شاهد قطر ضد سويسرا مجاناً وبجودة HD على موقع SportaLive. اختر قناة beIN Sport 1 أو M6. المباراة في 13 يونيو الساعة 23:00 UTC (02:00+1 بتوقيت الدوحة).' } },
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

export default async function QatarVsSwitzerlandPage() {
  const [m6, bein, la1] = await Promise.all([
    findChannel(['m6', 'm6-hd', 'm6-fr'], ['M6']),
    findChannel(['ar-bein-sport-uhd-1', 'bein-sport-1', 'bein-sport-uhd-1'], ['beIN Sports 1', 'beIN Sport 1', 'beIN Sports UHD']),
    findChannel(['la-1', 'la-1-rtve', 'la1'], ['La 1', 'RTVE']),
  ]);

  const homeLineup = ['Barsham', 'Ahmed', 'Al-Rawi', 'Khoukhi', 'Salman', 'Boudiaf', 'Hatem', 'Al-Haydos', 'Afif', 'Ali', 'Muntari'];
  const awayLineup = ['Sommer', 'Widmer', 'Akanji', 'Schär', 'Rodriguez', 'Vargas', 'Xhaka', 'Freuler', 'Steffen', 'Shaqiri', 'Embolo'];

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-4xl mx-auto space-y-8">

        <section>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h1 className="text-white font-extrabold text-lg md:text-2xl leading-tight">
              🔴 Qatar vs Switzerland — <span className="text-yellow-400">World Cup 2026 LIVE</span>
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
            match={{ home: 'Qatar', homeFlag: 'qa', away: 'Switzerland', awayFlag: 'ch', date: 'Saturday, 13 June 2026', time: '23:00 UTC' }}
          />
        </section>

        <AdBanner />

        <section className="relative rounded-3xl overflow-hidden border border-white/10"
          style={{ background: 'linear-gradient(135deg, #1a0308 0%, #0a0808 50%, #1a0308 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="relative px-4 md:px-10 py-8 space-y-6">
            <div className="flex items-center justify-center gap-3">
              <span className="text-yellow-400 text-lg">⚽</span>
              <p className="text-yellow-300 text-xs md:text-sm font-bold uppercase tracking-[0.3em]">FIFA World Cup 2026 — Group B</p>
              <span className="text-yellow-400 text-lg">⚽</span>
            </div>
            <div className="flex items-center justify-center gap-6 md:gap-16">
              <div className="flex flex-col items-center gap-3">
                <img src="https://flagcdn.com/w160/qa.png" alt="Qatar" className="w-20 h-auto rounded shadow-lg" />
                <div className="text-center"><p className="text-white font-black text-lg md:text-2xl uppercase">Qatar</p><p className="text-red-400 text-xs uppercase tracking-widest">Al Annabi</p></div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Live</span>
                </div>
                <p className="text-white/20 font-black text-2xl md:text-4xl tracking-[0.4em]">VS</p>
                <p className="text-gray-400 text-xs">13 June 2026 · 23:00 UTC</p>
                <p className="text-yellow-400 text-xs font-bold">{"Levi's Stadium · San Francisco"}</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <img src="https://flagcdn.com/w160/ch.png" alt="Switzerland" className="w-20 h-auto rounded shadow-lg" />
                <div className="text-center"><p className="text-white font-black text-lg md:text-2xl uppercase">Switzerland</p><p className="text-red-400 text-xs uppercase tracking-widest">La Nati</p></div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {[{ icon: '📅', text: '13 June 2026' }, { icon: '⏰', text: '23:00 UTC · 16:00 San Francisco' }, { icon: '🏟️', text: "Levi's Stadium" }, { icon: '🏆', text: 'Group B · Matchday 1' }].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300"><span>{icon}</span>{text}</span>
              ))}
            </div>
            <div className="text-center"><p className="text-gray-400 text-sm">Prediction: <span className="text-white font-bold">Switzerland 2-0 Qatar</span></p></div>
          </div>
        </section>

        <section className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-3">
          <h2 className="text-white font-bold text-lg">🕒 Kickoff Times by Country</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {[{ flag: '🇶🇦', country: 'Doha', time: '02:00+1' }, { flag: '🇨🇭', country: 'Zurich', time: '01:00+1' }, { flag: '🇫🇷', country: 'France', time: '01:00+1' }, { flag: '🇸🇦', country: 'Arabia S.', time: '02:00+1' }, { flag: '🇬🇧', country: 'UK', time: '00:00+1' }, { flag: '🌍', country: 'UTC', time: '23:00' }].map(({ flag, country, time }) => (
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
            <div className="bg-red-950/30 border border-red-500/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img src="https://flagcdn.com/w40/qa.png" alt="Qatar" className="w-8 h-auto rounded" />
                <div><p className="text-white font-black uppercase">Qatar</p><p className="text-red-400 text-xs">4-3-3 · Predicted XI</p></div>
              </div>
              <div className="space-y-1">{homeLineup.map((name) => (<div key={name} className="flex items-center gap-2 py-1 border-b border-white/5 text-sm"><span className="text-gray-200">{name}</span></div>))}</div>
            </div>
            <div className="bg-red-950/20 border border-red-400/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img src="https://flagcdn.com/w40/ch.png" alt="Switzerland" className="w-8 h-auto rounded" />
                <div><p className="text-white font-black uppercase">Switzerland</p><p className="text-red-400 text-xs">4-4-2 · Predicted XI</p></div>
              </div>
              <div className="space-y-1">{awayLineup.map((name) => (<div key={name} className="flex items-center gap-2 py-1 border-b border-white/5 text-sm"><span className="text-gray-200">{name}</span></div>))}</div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">Frequently Asked Questions</h2>
          {[
            { q: 'Where to watch Qatar vs Switzerland World Cup 2026 for free?', a: 'Watch on SportaLive — beIN Sport 1, M6, and La 1 live in HD for free. No account needed.' },
            { q: 'What time is Qatar vs Switzerland at World Cup 2026?', a: 'Kick-off: 13 June 2026 at 23:00 UTC (16:00 San Francisco, 01:00+1 Zurich, 02:00+1 Doha).' },
            { q: 'Which TV channel shows Qatar vs Switzerland 2026?', a: 'beIN Sports 1 (Qatar/MENA — free in Qatar), M6 (France — free), La 1 RTVE (Spain — free), SRF (Switzerland — free). Free on SportaLive.' },
            { q: 'أين أشاهد قطر ضد سويسرا كأس العالم 2026 مجاناً؟', a: 'على موقع SportaLive — اختر beIN Sport 1 أو M6. بجودة HD، بدون اشتراك. المباراة في 13 يونيو الساعة 23:00 UTC (02:00+1 بتوقيت الدوحة).' },
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
            { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' },
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
