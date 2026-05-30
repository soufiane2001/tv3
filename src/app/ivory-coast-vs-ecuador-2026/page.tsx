import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import AdBanner from '@/components/ads/AdBanner';
import WC2026StreamClient from '@/components/worldcup/WC2026StreamClient';

export const revalidate = 3600;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const SLUG = 'ivory-coast-vs-ecuador-2026';
const PAGE_URL = `${SITE}/${SLUG}`;

const TITLE = "Côte d'Ivoire vs Ecuador LIVE — World Cup 2026 Free Stream | M6 · beIN Sport · La 1";
const DESC = "🔴 LIVE — Watch Côte d'Ivoire vs Ecuador FIFA World Cup 2026 FREE. Group E at Lincoln Financial Field Philadelphia. Stream HD on M6, beIN Sport 1, La 1. Ver gratis · Regarder gratuit.";

const KEYWORDS = [
  "ivory coast vs ecuador world cup 2026 live stream free","cote d'ivoire ecuador 2026 world cup",
  "watch ivory coast vs ecuador online free","world cup 2026 group e ivory coast ecuador",
  "côte d'ivoire equateur coupe du monde 2026 en direct","côte d'ivoire équateur streaming gratuit",
  "costa de marfil vs ecuador copa del mundo 2026 en vivo gratis",
  "fildişi sahili ekvador dünya kupası 2026 canlı izle",
  "ساحل العاج ضد الإكوادور كأس العالم 2026 بث مباشر",
  "elfenbeinküste ekuador weltmeisterschaft 2026 live stream",
  "costa d'avorio vs ecuador coppa del mondo 2026 in diretta",
  "costa do marfim vs equador copa do mundo 2026 ao vivo",
  "ivoorkust vs ecuador wereldkampioenschap 2026 live",
  "아이보리코스트 대 에콰도르 2026 월드컵 생중계",
  "haller pepe ivory coast world cup 2026","caicedo ecuador world cup 2026",
  "where to watch ivory coast vs ecuador world cup 2026",
  "lincoln financial field philadelphia world cup 2026",
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
    title: "🔴 LIVE: Côte d'Ivoire vs Ecuador — World Cup 2026 FREE",
    description: "Watch Côte d'Ivoire vs Ecuador FIFA World Cup 2026 Group E FREE in HD.",
    type: 'website', siteName: 'SportaLive',
    images: [{ url: `${SITE}/api/og?home=Ivory+Coast&away=Ecuador&hf=ci&af=ec&date=Jun+15`, width: 1200, height: 630, alt: "Ivory Coast vs Ecuador World Cup 2026 Live Stream" }],
  },
  twitter: { card: 'summary_large_image', title: "🔴 Côte d'Ivoire vs Ecuador LIVE — World Cup 2026", description: 'Watch free HD on SportaLive.', images: [`${SITE}/og-wc2026.jpg`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: "FIFA World Cup 2026 — Côte d'Ivoire vs Ecuador",
  description: "FIFA World Cup 2026 Group E match between Côte d'Ivoire and Ecuador at Lincoln Financial Field Philadelphia.",
  startDate: '2026-06-14T20:00:00Z',
  endDate: '2026-06-14T22:00:00Z',
  sport: 'https://en.wikipedia.org/wiki/Association_football',
  location: { '@type': 'Place', name: 'Lincoln Financial Field', address: { '@type': 'PostalAddress', addressLocality: 'Philadelphia', addressRegion: 'Pennsylvania', addressCountry: 'US' } },
  offers: { '@type': 'Offer', name: 'Free Live Stream', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: PAGE_URL, validFrom: '2026-06-14T00:00:00Z', seller: { '@type': 'Organization', name: 'SportaLive', url: SITE } },
  url: PAGE_URL,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  competitor: [
    { '@type': 'SportsTeam', name: "Côte d'Ivoire", sameAs: 'https://en.wikipedia.org/wiki/Ivory_Coast_national_football_team' },
    { '@type': 'SportsTeam', name: 'Ecuador', sameAs: 'https://en.wikipedia.org/wiki/Ecuador_national_football_team' },
  ],
  organizer: { '@type': 'Organization', name: 'FIFA', url: 'https://www.fifa.com' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Where to watch Côte d'Ivoire vs Ecuador World Cup 2026 for free?", acceptedAnswer: { '@type': 'Answer', text: "Watch Côte d'Ivoire vs Ecuador World Cup 2026 free on SportaLive. M6, beIN Sport 1, and La 1 live in HD — no subscription needed." } },
    { '@type': 'Question', name: "What time is Côte d'Ivoire vs Ecuador at World Cup 2026?", acceptedAnswer: { '@type': 'Answer', text: "Côte d'Ivoire vs Ecuador kicks off 14 June 2026 at 20:00 UTC (16:00 Philadelphia, 22:00 Paris, 21:00 London, 23:00 Riyadh)." } },
    { '@type': 'Question', name: "Which TV channel shows Côte d'Ivoire vs Ecuador 2026?", acceptedAnswer: { '@type': 'Answer', text: "M6 (France — free), beIN Sports 1 (MENA), La 1 RTVE (Spain — free), RTI 1 (Ivory Coast — free). Free worldwide on SportaLive." } },
    { '@type': 'Question', name: "Comment voir Côte d'Ivoire vs Équateur Coupe du Monde 2026 gratuitement?", acceptedAnswer: { '@type': 'Answer', text: "Sur SportaLive, stream M6 en direct et gratuit en HD. Sans abonnement. Le match commence le 14 juin à 22h00 heure française." } },
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

export default async function IvoryCoastVsEcuadorPage() {
  const [m6, bein, la1] = await Promise.all([
    findChannel(['m6', 'm6-hd', 'm6-fr'], ['M6']),
    findChannel(['ar-bein-sport-uhd-1', 'bein-sport-1', 'bein-sport-uhd-1'], ['beIN Sports 1', 'beIN Sport 1', 'beIN Sports UHD']),
    findChannel(['la-1', 'la-1-rtve', 'la1'], ['La 1', 'RTVE']),
  ]);

  const homeLineup = ['Sangaré', 'Aurier', 'Bailly', 'Diallo', 'Konan', 'Kessié', 'Seri', 'Gbamin', 'Pépé', 'Haller', 'Zaha'];
  const awayLineup = ['Domínguez', 'Preciado', 'Hincapié', 'Paez', 'Estupiñán', 'Caicedo', 'Gruezo', 'Sarmiento', 'Plata', 'Enner', 'Ibarra'];

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-4xl mx-auto space-y-8">

        <section>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h1 className="text-white font-extrabold text-lg md:text-2xl leading-tight">
              🔴 {"Côte d'Ivoire"} vs Ecuador — <span className="text-yellow-400">World Cup 2026 LIVE</span>
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
            match={{ home: "Côte d'Ivoire", homeFlag: 'ci', away: 'Ecuador', awayFlag: 'ec', date: 'Sunday, 14 June 2026', time: '20:00 UTC' }}
          />
        </section>

        <AdBanner />

        <section className="relative rounded-3xl overflow-hidden border border-white/10"
          style={{ background: 'linear-gradient(135deg, #1a0a00 0%, #0a0f05 50%, #1a0a00 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="relative px-4 md:px-10 py-8 space-y-6">
            <div className="flex items-center justify-center gap-3">
              <span className="text-yellow-400 text-lg">⚽</span>
              <p className="text-yellow-300 text-xs md:text-sm font-bold uppercase tracking-[0.3em]">FIFA World Cup 2026 — Group E</p>
              <span className="text-yellow-400 text-lg">⚽</span>
            </div>
            <div className="flex items-center justify-center gap-6 md:gap-16">
              <div className="flex flex-col items-center gap-3">
                <img src="https://flagcdn.com/w160/ci.png" alt="Côte d'Ivoire" className="w-20 h-auto rounded shadow-lg" />
                <div className="text-center"><p className="text-white font-black text-lg md:text-2xl uppercase">{"Côte d'Ivoire"}</p><p className="text-orange-400 text-xs uppercase tracking-widest">Éléphants</p></div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Live</span>
                </div>
                <p className="text-white/20 font-black text-2xl md:text-4xl tracking-[0.4em]">VS</p>
                <p className="text-gray-400 text-xs">14 June 2026 · 20:00 UTC</p>
                <p className="text-yellow-400 text-xs font-bold">Lincoln Financial · Philadelphia</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <img src="https://flagcdn.com/w160/ec.png" alt="Ecuador" className="w-20 h-auto rounded shadow-lg" />
                <div className="text-center"><p className="text-white font-black text-lg md:text-2xl uppercase">Ecuador</p><p className="text-yellow-400 text-xs uppercase tracking-widest">La Tri</p></div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {[{ icon: '📅', text: '14 June 2026' }, { icon: '⏰', text: '20:00 UTC · 16:00 Philadelphia' }, { icon: '🏟️', text: 'Lincoln Financial Field' }, { icon: '🏆', text: 'Group E · Matchday 1' }].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300"><span>{icon}</span>{text}</span>
              ))}
            </div>
            <div className="text-center"><p className="text-gray-400 text-sm">Prediction: <span className="text-white font-bold">{"Côte d'Ivoire"} 1-1 Ecuador</span></p></div>
          </div>
        </section>

        <section className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-3">
          <h2 className="text-white font-bold text-lg">🕒 Kickoff Times by Country</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {[{ flag: '🇺🇸', country: 'Philadelphia', time: '16:00' }, { flag: '🇨🇮', country: 'Abidjan', time: '20:00' }, { flag: '🇫🇷', country: 'France', time: '22:00' }, { flag: '🇸🇦', country: 'Arabia S.', time: '23:00' }, { flag: '🇬🇧', country: 'UK', time: '21:00' }, { flag: '🇪🇨', country: 'Ecuador', time: '15:00' }].map(({ flag, country, time }) => (
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
            <div className="bg-orange-950/20 border border-orange-500/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img src="https://flagcdn.com/w40/ci.png" alt="Côte d'Ivoire" className="w-8 h-auto rounded" />
                <div><p className="text-white font-black uppercase">{"Côte d'Ivoire"}</p><p className="text-orange-400 text-xs">4-3-3 · Predicted XI</p></div>
              </div>
              <div className="space-y-1">{homeLineup.map((name) => (<div key={name} className="flex items-center gap-2 py-1 border-b border-white/5 text-sm"><span className="text-gray-200">{name}</span></div>))}</div>
            </div>
            <div className="bg-yellow-950/20 border border-yellow-500/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img src="https://flagcdn.com/w40/ec.png" alt="Ecuador" className="w-8 h-auto rounded" />
                <div><p className="text-white font-black uppercase">Ecuador</p><p className="text-yellow-400 text-xs">4-3-3 · Predicted XI</p></div>
              </div>
              <div className="space-y-1">{awayLineup.map((name) => (<div key={name} className="flex items-center gap-2 py-1 border-b border-white/5 text-sm"><span className="text-gray-200">{name}</span></div>))}</div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">Frequently Asked Questions</h2>
          {[
            { q: "Where to watch Côte d'Ivoire vs Ecuador World Cup 2026 for free?", a: 'Watch on SportaLive — M6, beIN Sport 1, and La 1 live in HD for free. No account needed.' },
            { q: "What time is Côte d'Ivoire vs Ecuador at World Cup 2026?", a: 'Kick-off: 14 June 2026 at 20:00 UTC (16:00 Philadelphia, 22:00 Paris, 21:00 London, 20:00 Abidjan).' },
            { q: "Which TV channel shows Côte d'Ivoire vs Ecuador 2026?", a: 'M6 (France — free), beIN Sports 1 (MENA), La 1 RTVE (Spain — free), RTI 1 (Ivory Coast — free). Free on SportaLive.' },
            { q: "Comment voir Côte d'Ivoire vs Équateur Coupe du Monde 2026 gratuitement?", a: "Sur SportaLive, stream M6 en direct et gratuit en HD. Le match commence le 14 juin à 22h00 heure française." },
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
            { href: '/germany-vs-curacao-2026', label: '🇩🇪 Germany vs Curaçao' },
            { href: '/netherlands-vs-japan-2026', label: '🇳🇱 Netherlands vs Japan' },
            { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' },
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
