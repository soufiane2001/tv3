import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import MatchBlog from '@/components/match/MatchBlog';
import { uclBlogs } from '@/data/ucl-blogs';

export const revalidate = 600;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sportalive.live';

export const metadata: Metadata = {
  title: 'Champions League Final 2026 LIVE — Arsenal vs PSG Free Stream | Dove Vedere | Donde Ver',
  description: 'Watch Arsenal vs PSG Champions League Final 2026 FREE in HD. Dove vedere la finale di Champions League gratis. Dónde ver la final de la Champions League 2026 gratis. بث مباشر مجاني نهائي 2026.',
  keywords: [
    // English
    'champions league final 2026','ucl final 2026 live stream','arsenal vs psg',
    'arsenal psg live free','watch ucl final online','champions league final live',
    'arsenal psg champions league final 2026','watch champions league final free',
    'ucl final munich 2026','allianz arena final 2026','arsenal vs psg final live stream',
    // French
    'finale champions league 2026','ligue des champions finale streaming',
    'arsenal psg finale 2026 gratuit','finale ligue des champions 2026 direct',
    'regarder finale champions league 2026','arsenal psg m6 gratuit',
    // Arabic
    'نهائي دوري أبطال أوروبا 2026','ارسنال باريس سان جيرمان بث مباشر',
    'نهائي دوري أبطال أوروبا مجانا','ارسنال ضد باريس نهائي 2026',
    'مشاهدة نهائي تشامبيونز ليج 2026 مجاناً','بث مباشر نهائي كأس دوري الأبطال',
    // Spanish
    'champions league final en directo 2026','arsenal psg 2026',
    'donde ver la final de la champions','donde ver arsenal psg 2026',
    'a qué hora es la final de la champions league','final champions league hora',
    'ver final champions gratis la 1','arsenal psg la 1 directo gratis',
    // Italian
    'dove vedere finale champions league 2026','dove vedere arsenal psg',
    'dove vedere la finale di champions league','finale champions league dove vedere',
    'arsenal psg finale champions canale 5','finale champions league 2026 streaming gratis',
    // Portuguese
    'arsenal psg final champions 2026','assistir final champions league 2026 online',
    'onde ver final champions league 2026 gratis','arsenal psg ao vivo gratis',
    // German
    'champions league finale 2026','arsenal psg champions league finale live stream',
    'champions league finale kostenlos schauen','ucl finale 2026 münchen',
    // Turkish
    'arsenal psg champions league finali 2026','şampiyonlar ligi finali 2026 canlı',
    'arsenal psg trt canlı izle','champions league finali canlı ücretsiz',
    // Dutch
    'arsenal psg champions league finale 2026','champions league finale gratis kijken',
    'arsenal psg finale live stream gratis',
    // Korean
    'arsenal psg 챔피언스리그 결승 2026','챔피언스리그 결승 무료 시청',
    'psg vs arsenal c1','psg squad arsenal champions league',
  ].join(', '),
  openGraph: {
    title: '🏆 Champions League Final 2026 — Arsenal vs PSG Live',
    description: 'Free HD live stream — UEFA Champions League Final 2026. Arsenal vs PSG.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: '🏆 UCL Final 2026 LIVE — Arsenal vs PSG' },
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE}/champions-league-final-2026` },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'UEFA Champions League Final 2026',
  startDate: '2026-05-30T20:00:00Z',
  endDate: '2026-05-30T22:30:00Z',
  description: 'The UEFA Champions League Final 2026 between Arsenal FC and Paris Saint-Germain. Watch live free on SportaLive.',
  sport: 'Football',
  url: `${SITE}/champions-league-final-2026`,
  location: {
    '@type': 'Place',
    name: 'Allianz Arena',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Werner-Heisenberg-Allee 25',
      addressLocality: 'Munich',
      addressRegion: 'Bavaria',
      postalCode: '80939',
      addressCountry: 'DE',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 48.2188, longitude: 11.6247 },
  },
  offers: {
    '@type': 'Offer',
    name: 'Free Live Stream — Champions League Final 2026',
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: `${SITE}/arsenal-vs-psg`,
    validFrom: '2026-05-30T00:00:00Z',
  },
  competitor: [
    { '@type': 'SportsTeam', name: 'Arsenal FC',             sameAs: 'https://en.wikipedia.org/wiki/Arsenal_F.C.' },
    { '@type': 'SportsTeam', name: 'Paris Saint-Germain FC', sameAs: 'https://en.wikipedia.org/wiki/Paris_Saint-Germain_F.C.' },
  ],
  performer: [
    { '@type': 'SportsTeam', name: 'Arsenal FC' },
    { '@type': 'SportsTeam', name: 'Paris Saint-Germain FC' },
  ],
  organizer: { '@type': 'Organization', name: 'UEFA', url: 'https://www.uefa.com' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where to watch Champions League Final 2026 for free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Watch the Champions League Final 2026 free on SportaLive. La 1 is broadcasting the Arsenal vs PSG match live in HD.' },
    },
    {
      '@type': 'Question',
      name: 'What channel is showing Arsenal vs PSG?',
      acceptedAnswer: { '@type': 'Answer', text: 'La 1 (Spain) is airing the Champions League Final 2026 between Arsenal and PSG. Available free on SportaLive.' },
    },
    {
      '@type': 'Question',
      name: 'Comment regarder la finale Champions League 2026 gratuitement?',
      acceptedAnswer: { '@type': 'Answer', text: 'Regardez la finale Arsenal contre PSG gratuitement sur SportaLive via La 1 en direct.' },
    },
    {
      '@type': 'Question',
      name: 'كيف أشاهد نهائي دوري أبطال أوروبا 2026 مجاناً؟',
      acceptedAnswer: { '@type': 'Answer', text: 'شاهد مباراة ارسنال وباريس سان جيرمان مباشرة مجاناً على منصة SportaLive.' },
    },
    {
      '@type': 'Question',
      name: 'Dove vedere la finale di Champions League 2026 gratis?',
      acceptedAnswer: { '@type': 'Answer', text: 'Puoi vedere la finale Arsenal vs PSG gratis su SportaLive. La partita viene trasmessa in diretta HD su Canale 5 e La 1. Nessuna registrazione richiesta.' },
    },
    {
      '@type': 'Question',
      name: 'Dónde ver la final de la Champions League 2026?',
      acceptedAnswer: { '@type': 'Answer', text: 'Puedes ver la final Arsenal vs PSG gratis en SportaLive. La 1 de TVE transmite el partido en directo y en HD sin coste. Sin registro.' },
    },
    {
      '@type': 'Question',
      name: 'A qué hora es la final de la Champions League 2026?',
      acceptedAnswer: { '@type': 'Answer', text: 'La final de la Champions League 2026 Arsenal vs PSG empieza a las 21:00 CET (22:00 Marruecos, 23:00 Arabia Saudí) el 30 de mayo de 2026.' },
    },
  ],
};

const STREAMS = [
  { label: '🔴 Arsenal vs PSG — Watch Live',    href: '/arsenal-vs-psg',       badge: 'LIVE', hot: true },
  { label: '📺 La 1 En Directo',                href: '/channel/la-1',          badge: 'HD'  },
  { label: '📺 M6 En Direct',                   href: '/channel/m6',            badge: 'HD'  },
  { label: '📺 Canal+ Sport',                   href: '/channel/canal-sport',   badge: 'HD'  },
  { label: "📺 RTI 1 — Côte d'Ivoire",          href: '/channel/rti-1',         badge: 'HD'  },
];

export default function UclFinalPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-4xl mx-auto space-y-10">

        {/* ── UCL Hero ──────────────────────────────────────── */}
        <section className="relative rounded-3xl overflow-hidden border border-[#1e3a6e]"
          style={{ background: 'linear-gradient(135deg, #05091a 0%, #0d1442 45%, #05091a 100%)' }}>

          {/* star grid */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          {/* team glow halves */}
          <div className="absolute left-0 inset-y-0 w-1/2 bg-gradient-to-r from-red-900/25 to-transparent" />
          <div className="absolute right-0 inset-y-0 w-1/2 bg-gradient-to-l from-blue-900/25 to-transparent" />

          <div className="relative px-6 py-10 md:py-16 text-center space-y-6">

            {/* UCL label */}
            <div className="flex items-center justify-center gap-3">
              <span className="text-[#c8b87a]">✦</span>
              <span className="text-[#c8b87a] text-xs font-bold uppercase tracking-[0.3em]">UEFA Champions League</span>
              <span className="text-[#c8b87a]">✦</span>
            </div>

            {/* Trophy */}
            <div className="text-7xl md:text-8xl drop-shadow-[0_0_40px_rgba(255,215,0,0.35)]">🏆</div>

            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Champions League
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c8b87a] via-yellow-200 to-[#c8b87a]">
                  Final 2026
                </span>
              </h1>
            </div>

            {/* Teams */}
            <div className="flex items-center justify-center gap-4 md:gap-8">
              <div className="text-center">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-red-600 to-red-900 border-2 border-red-400/50 shadow-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl md:text-3xl">🔴</span>
                </div>
                <p className="text-white font-black text-sm md:text-base uppercase tracking-wider">Arsenal</p>
                <p className="text-red-400 text-[10px] uppercase tracking-widest">England</p>
              </div>
              <div className="text-center">
                <p className="text-[#c8b87a] text-xs uppercase tracking-[0.3em] mb-1">Final</p>
                <p className="text-white/30 font-black text-2xl md:text-4xl tracking-widest">VS</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#003B7C] to-[#001440] border-2 border-blue-400/50 shadow-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl md:text-3xl">🔵</span>
                </div>
                <p className="text-white font-black text-sm md:text-base uppercase tracking-wider">PSG</p>
                <p className="text-blue-400 text-[10px] uppercase tracking-widest">France</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm">30 May 2026 · 21:00 CET · La 1 Free Broadcast</p>

            {/* CTA */}
            <Link href="/arsenal-vs-psg"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-black rounded-full text-base shadow-2xl hover:scale-105 transition-all uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              Watch Live Free
            </Link>

            {/* Sparkle stars */}
            {['top-4 left-[6%]','top-8 right-[9%]','bottom-6 left-[12%]','bottom-4 right-[7%]'].map((pos, i) => (
              <span key={i} className={`absolute ${pos} text-yellow-400/40 text-xl`}>✦</span>
            ))}
          </div>
        </section>

        {/* Stream links */}
        <section>
          <h2 className="text-white font-bold text-xl mb-4">Watch Arsenal vs PSG Live</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STREAMS.map(({ label, href, badge, hot }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all group ${
                  hot
                    ? 'bg-red-600/15 border-red-500/40 hover:bg-red-600/25'
                    : 'bg-gray-800/60 border-white/5 hover:border-purple-500/30 hover:bg-gray-700/60'
                }`}
              >
                <span className={`font-medium text-sm ${hot ? 'text-red-300' : 'text-gray-300 group-hover:text-white'}`}>{label}</span>
                {badge && (
                  <span className={`text-xs px-2 py-0.5 rounded font-bold ${hot ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                    {badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* Multilingual FAQ */}
        <section className="space-y-4">
          <h2 className="text-white font-bold text-xl">How to Watch — FAQ</h2>
          <div className="space-y-3">
            {faqJsonLd.mainEntity.map((q: any, i: number) => (
              <details key={i} className="bg-gray-800/60 border border-white/5 rounded-xl p-4 group" open={i === 0}>
                <summary className="text-white font-medium cursor-pointer list-none flex justify-between items-center">
                  {q.name}
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="text-gray-400 text-sm mt-3">{q.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Blog & News */}
        <MatchBlog data={uclBlogs['arsenal-vs-psg']} />

        {/* Related pages */}
        <section className="flex flex-wrap gap-3">
          <Link href="/arsenal-vs-psg"  className="px-4 py-2 bg-red-600/20 border border-red-500/30 text-red-400 hover:text-white rounded-xl text-sm transition-colors">Arsenal vs PSG Live</Link>
          <Link href="/world-cup-2026"  className="px-4 py-2 bg-gray-800/60 border border-white/10 text-gray-400 hover:text-white rounded-xl text-sm transition-colors">World Cup 2026</Link>
          <Link href="/channel/la-1"    className="px-4 py-2 bg-gray-800/60 border border-white/10 text-gray-400 hover:text-white rounded-xl text-sm transition-colors">La 1 Live</Link>
          <Link href="/live"            className="px-4 py-2 bg-gray-800/60 border border-white/10 text-gray-400 hover:text-white rounded-xl text-sm transition-colors">All Channels</Link>
        </section>
      </div>
    </>
  );
}
