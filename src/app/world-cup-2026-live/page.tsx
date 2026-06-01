import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import JsonLd from '@/components/seo/JsonLd';
import WC2026StreamClient from '@/components/worldcup/WC2026StreamClient';
import AdBanner from '@/components/ads/AdBanner';
import { wc2026News } from '@/data/wc2026-news';

export const revalidate = 3600;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const PAGE_URL = `${SITE}/world-cup-2026-live`;

export const metadata: Metadata = {
  title: 'FIFA World Cup 2026 Live Stream Free — All Matches HD | beIN Sport · M6 · RMC',
  description: 'Watch FIFA World Cup 2026 live stream FREE in HD. All 104 matches on beIN Sport 1, M6 and RMC Sport. USA · Canada · Mexico — June 11 to July 19, 2026. No subscription needed. مباريات كأس العالم 2026 بث مباشر مجاناً. Coupe du Monde 2026 streaming gratuit. Copa do Mundo 2026 ao vivo grátis.',
  keywords: [
    'world cup 2026 live stream free','fifa world cup 2026 live','watch world cup 2026 free hd',
    'bein sport 1 world cup 2026','m6 coupe du monde 2026 direct','rmc sport world cup 2026',
    'world cup 2026 free stream no subscription','all world cup 2026 matches live',
    'world cup 2026 schedule tv','how to watch world cup 2026 free online',
    'bein sport 1 كأس العالم 2026','كأس العالم 2026 بث مباشر مجاناً beIN Sport',
    'مشاهدة مباريات كأس العالم 2026 مجاناً','كأس العالم بث مباشر 2026',
    'coupe du monde 2026 streaming gratuit','coupe du monde 2026 m6 direct',
    'regarder coupe du monde 2026 gratuit hd','rmc sport coupe du monde 2026 gratuit',
    'copa do mundo 2026 ao vivo grátis','brasil copa 2026 transmissão ao vivo',
    'mundial 2026 en vivo gratis','copa mundial 2026 stream gratis',
    'wm 2026 live stream kostenlos bein sport','world cup 2026 live stream arabic',
    'world cup 2026 usa canada mexico free stream','fifa wc 2026 full matches',
    'world cup 2026 group stage live','world cup 2026 48 teams matches',
  ].join(', '),
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'en': PAGE_URL, 'fr': PAGE_URL, 'ar': PAGE_URL,
      'pt': PAGE_URL, 'es': PAGE_URL, 'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: '🌍 FIFA World Cup 2026 — All Matches Live Stream FREE | beIN Sport · M6 · RMC',
    description: 'Stream all 104 World Cup 2026 matches free in HD — beIN Sport 1, M6, RMC Sport. No subscription, no registration.',
    type: 'website',
    url: PAGE_URL,
    siteName: 'SportaLive',
  },
  twitter: {
    card: 'summary_large_image',
    title: '🌍 World Cup 2026 Free Live Stream — All Matches HD',
    description: 'beIN Sport 1 · M6 · RMC Sport — Watch free, no registration.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026',
  alternateName: ['World Cup 2026', 'WC2026', 'Coupe du Monde 2026', 'كأس العالم 2026', 'Copa do Mundo 2026', 'Copa Mundial 2026'],
  description: 'The 2026 FIFA World Cup hosted by USA, Canada and Mexico. 48 teams, 104 matches. Watch all matches live free on beIN Sport 1, M6 and RMC Sport.',
  startDate: '2026-06-11',
  endDate: '2026-07-19',
  sport: 'https://en.wikipedia.org/wiki/Association_football',
  url: PAGE_URL,
  location: { '@type': 'Country', name: 'United States, Canada, Mexico' },
  organizer: { '@type': 'Organization', name: 'FIFA', url: 'https://www.fifa.com' },
  offers: {
    '@type': 'Offer',
    name: 'FIFA World Cup 2026 Free Live Stream',
    price: '0', priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: PAGE_URL,
    seller: { '@type': 'Organization', name: 'SportaLive', url: SITE },
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where to watch FIFA World Cup 2026 for free?', acceptedAnswer: { '@type': 'Answer', text: 'Watch all 104 FIFA World Cup 2026 matches free in HD on SportaLive. We stream beIN Sport 1, M6, and RMC Sport live — no subscription, no registration needed.' } },
    { '@type': 'Question', name: 'Which channels broadcast FIFA World Cup 2026 for free?', acceptedAnswer: { '@type': 'Answer', text: 'beIN Sport 1 (MENA region), M6 (France — free-to-air), and RMC Sport broadcast the 2026 World Cup. All available free on SportaLive.' } },
    { '@type': 'Question', name: 'When does FIFA World Cup 2026 start?', acceptedAnswer: { '@type': 'Answer', text: 'FIFA World Cup 2026 starts June 11, 2026 with the opening match Mexico vs South Africa at SoFi Stadium, Los Angeles. The final is July 19, 2026.' } },
    { '@type': 'Question', name: 'كيف أشاهد كأس العالم 2026 مجاناً على beIN Sport؟', acceptedAnswer: { '@type': 'Answer', text: 'شاهد جميع مباريات كأس العالم 2026 مجاناً على SportaLive. نبث قناة beIN Sport 1 وM6 وRMC Sport بدون اشتراك ولا تسجيل. فقط اختر الخادم واضغط تشغيل.' } },
    { '@type': 'Question', name: 'Comment regarder la Coupe du Monde 2026 sur M6 gratuitement?', acceptedAnswer: { '@type': 'Answer', text: 'M6 diffuse la Coupe du Monde 2026 gratuitement en France. Sur SportaLive, regardez M6 en direct HD sans abonnement ni inscription, depuis n\'importe quel pays.' } },
    { '@type': 'Question', name: 'How many teams are in the 2026 World Cup?', acceptedAnswer: { '@type': 'Answer', text: '48 teams compete in FIFA World Cup 2026 for the first time in history, playing 104 matches across 16 venues in the USA, Canada, and Mexico.' } },
    { '@type': 'Question', name: 'Como assistir a Copa do Mundo 2026 de graça?', acceptedAnswer: { '@type': 'Answer', text: 'No SportaLive você assiste todos os jogos da Copa do Mundo 2026 de graça em HD. Transmitimos beIN Sport 1, M6 e RMC Sport ao vivo — sem assinatura.' } },
    { '@type': 'Question', name: 'What is the best free app to watch World Cup 2026?', acceptedAnswer: { '@type': 'Answer', text: 'SportaLive is the best free streaming site for World Cup 2026. No app download needed — open the website on any device, choose a server (beIN Sport 1, M6, RMC), and watch live in HD for free.' } },
  ],
};

const MATCHES = [
  { date: 'Thu June 11', matches: [{ slug: 'mexico-vs-south-africa-2026', home: 'Mexico', hf: 'mx', away: 'South Africa', af: 'za', time: '21:00', group: 'B', venue: 'SoFi Stadium, LA' }] },
  { date: 'Fri June 12', matches: [
    { slug: 'korea-vs-czechia-2026', home: 'Korea', hf: 'kr', away: 'Czechia', af: 'cz', time: '19:00', group: 'C', venue: 'AT&T Stadium, Dallas' },
    { slug: 'canada-vs-bosnia-2026', home: 'Canada', hf: 'ca', away: 'Bosnia', af: 'ba', time: '22:00', group: 'D', venue: 'BC Place, Vancouver' },
  ]},
  { date: 'Sat June 13', matches: [
    { slug: 'usa-vs-paraguay-2026', home: 'USA', hf: 'us', away: 'Paraguay', af: 'py', time: '19:00', group: 'A', venue: 'MetLife Stadium, NY' },
    { slug: 'haiti-vs-scotland-2026', home: 'Haiti', hf: 'ht', away: 'Scotland', af: 'gb-sct', time: '22:00', group: 'E', venue: 'NRG Stadium, Houston' },
  ]},
  { date: 'Sun June 14', matches: [
    { slug: 'australia-vs-turkiye-2026', home: 'Australia', hf: 'au', away: 'Türkiye', af: 'tr', time: '20:00', group: 'F', venue: 'Rose Bowl, LA' },
  ]},
  { date: 'Mon June 15', matches: [
    { slug: 'brazil-vs-morocco-2026', home: 'Brazil', hf: 'br', away: 'Morocco', af: 'ma', time: '19:00', group: 'G', venue: 'MetLife Stadium, NY' },
    { slug: 'qatar-vs-switzerland-2026', home: 'Qatar', hf: 'qa', away: 'Switzerland', af: 'ch', time: '19:00', group: 'H', venue: 'Estadio Azteca, MX' },
    { slug: 'ivory-coast-vs-ecuador-2026', home: 'Ivory Coast', hf: 'ci', away: 'Ecuador', af: 'ec', time: '22:00', group: 'I', venue: "Levi's Stadium, SF" },
    { slug: 'germany-vs-curacao-2026', home: 'Germany', hf: 'de', away: 'Curaçao', af: 'cw', time: '22:00', group: 'J', venue: 'AT&T Stadium, Dallas' },
  ]},
  { date: 'Tue June 16', matches: [
    { slug: 'netherlands-vs-japan-2026', home: 'Netherlands', hf: 'nl', away: 'Japan', af: 'jp', time: '19:00', group: 'K', venue: 'Gillette Stadium, Boston' },
    { slug: 'sweden-vs-tunisia-2026', home: 'Sweden', hf: 'se', away: 'Tunisia', af: 'tn', time: '22:00', group: 'L', venue: 'Arrowhead Stadium, KC' },
  ]},
];

const CATEGORY_COLORS: Record<string, string> = {
  News:     'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Preview:  'bg-green-500/20 text-green-300 border-green-500/30',
  Guide:    'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Analysis: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Team:     'bg-orange-500/20 text-orange-300 border-orange-500/30',
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

export default async function WorldCup2026LivePage() {
  const [bein, m6, rmc] = await Promise.all([
    findChannel(['ar-bein-sport-uhd-1','bein-sport-1','ar-bein-sport-1'], ['beIN Sports 1','beIN Sport 1','beIN Sports UHD']),
    findChannel(['m6','m6-hd','m6-fr'], ['M6']),
    findChannel(['rmc-sport-1','rmc-sport','rmc-1'], ['RMC Sport 1','RMC Sport','RMC']),
  ]);

  return (
    <>
      <JsonLd data={eventJsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-5xl mx-auto space-y-0">

        {/* ═══════════════════════════════════════════════
            FIFA-STYLE HERO
        ═══════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 60%, #0a1628 100%)' }}
        >
          {/* Subtle dot grid */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          {/* Gold top accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c9aa71] to-transparent" />

          <div className="relative px-4 md:px-10 pt-10 pb-8 text-center space-y-5">
            {/* Official badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#c9aa71]/30 rounded-full bg-[#c9aa71]/5">
              <span className="text-[#c9aa71] text-xs font-black uppercase tracking-[0.3em]">FIFA World Cup™</span>
              <span className="text-[#c9aa71]/60 text-xs">2026</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Watch Every Match<br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #c9aa71, #f0e090, #c9aa71)' }}>
                Live & Free in HD
              </span>
            </h1>

            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
              USA · Canada · Mexico — June 11 to July 19, 2026 · 48 Teams · 104 Matches
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-6 pt-2">
              {[['48', 'Teams'], ['104', 'Matches'], ['16', 'Venues'], ['3', 'Host Nations']].map(([n, l]) => (
                <div key={l} className="text-center">
                  <p className="text-2xl font-black" style={{ color: '#c9aa71' }}>{n}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{l}</p>
                </div>
              ))}
            </div>

            {/* Server chips */}
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              {[
                { name: 'beIN Sport 1', sub: 'MENA · UHD', flag: '📡' },
                { name: 'M6', sub: 'France · Gratuit', flag: '🇫🇷' },
                { name: 'RMC Sport', sub: 'HD · Premium', flag: '📺' },
              ].map(s => (
                <div key={s.name}
                  className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm"
                  style={{ borderColor: '#c9aa71', background: 'rgba(201,170,113,0.08)', color: '#c9aa71' }}>
                  <span>{s.flag}</span>
                  <span className="font-bold">{s.name}</span>
                  <span className="text-[#c9aa71]/50 text-xs">{s.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gold bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9aa71]/40 to-transparent" />
        </section>

        {/* ═══════════════════════════════════════════════
            LIVE PLAYER — 3 SERVERS
        ═══════════════════════════════════════════════ */}
        <section className="px-4 md:px-0 pt-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-red-600 rounded-full text-white text-[10px] font-black uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />LIVE
            </span>
            <h2 className="text-white font-extrabold text-lg">World Cup 2026 — Live Stream</h2>
          </div>
          <WC2026StreamClient
            servers={[
              { label: 'beIN Sport 1', sublabel: 'MENA · UHD · عربي', channel: bein as any },
              { label: 'M6', sublabel: 'France · Gratuit · HD', channel: m6 as any },
              { label: 'RMC Sport', sublabel: 'HD · Premium', channel: rmc as any },
            ]}
            match={{ home: 'World Cup', homeFlag: 'us', away: '2026', awayFlag: 'br', date: 'June 11 – July 19, 2026', time: 'All Matches' }}
          />
          <p className="text-gray-600 text-xs text-center">Free HD stream — no subscription, no registration · Refresh if stream lags</p>
        </section>

        <div className="px-4 md:px-0 pt-2">
          <AdBanner />
        </div>

        {/* ═══════════════════════════════════════════════
            GROUP STAGE SCHEDULE
        ═══════════════════════════════════════════════ */}
        <section className="px-4 md:px-0 pt-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded-full" style={{ background: '#c9aa71' }} />
            <h2 className="text-white font-black text-xl">Group Stage Schedule</h2>
          </div>

          {MATCHES.map(({ date, matches }) => (
            <div key={date} className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border"
                  style={{ color: '#c9aa71', borderColor: '#c9aa71', background: 'rgba(201,170,113,0.08)' }}>
                  {date}
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(201,170,113,0.15)' }} />
              </div>

              {matches.map(m => (
                <Link key={m.slug} href={`/${m.slug}`}
                  className="group flex items-center gap-3 p-3 md:p-4 rounded-xl border border-white/[0.06] hover:border-[#c9aa71]/60 transition-all"
                  style={{ background: 'rgba(10,22,40,0.8)' }}
                >
                  {/* Group */}
                  <span className="hidden sm:flex w-8 h-8 rounded-full items-center justify-center text-xs font-black flex-shrink-0"
                    style={{ background: 'rgba(201,170,113,0.1)', border: '1px solid rgba(201,170,113,0.3)', color: '#c9aa71' }}>
                    {m.group}
                  </span>

                  {/* Teams */}
                  <div className="flex-1 flex items-center gap-2 md:gap-4 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={`https://flagcdn.com/w40/${m.hf}.png`} alt={m.home} width={28} height={19} className="rounded flex-shrink-0 shadow" />
                      <span className="text-white font-bold text-sm truncate">{m.home}</span>
                    </div>
                    <span className="text-gray-600 text-xs font-bold flex-shrink-0">VS</span>
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={`https://flagcdn.com/w40/${m.af}.png`} alt={m.away} width={28} height={19} className="rounded flex-shrink-0 shadow" />
                      <span className="text-white font-bold text-sm truncate">{m.away}</span>
                    </div>
                  </div>

                  {/* Time + venue */}
                  <div className="hidden md:block text-right flex-shrink-0">
                    <p className="text-white text-sm font-bold">{m.time}</p>
                    <p className="text-gray-500 text-xs">{m.venue}</p>
                  </div>

                  {/* CTA */}
                  <span className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                    style={{ background: 'rgba(201,170,113,0.1)', border: '1px solid rgba(201,170,113,0.3)', color: '#c9aa71' }}>
                    ▶ Watch
                  </span>
                </Link>
              ))}
            </div>
          ))}

          <div className="text-center pt-2">
            <Link href="/wc2026"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all"
              style={{ background: 'rgba(201,170,113,0.1)', border: '1px solid rgba(201,170,113,0.4)', color: '#c9aa71' }}>
              📅 View Full Group Stage Schedule →
            </Link>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            BROADCAST INFO
        ═══════════════════════════════════════════════ */}
        <section className="px-4 md:px-0 pt-8">
          <div className="rounded-2xl p-6 md:p-8 space-y-5"
            style={{ background: 'linear-gradient(135deg, #0d1f3c 0%, #0a1628 100%)', border: '1px solid rgba(201,170,113,0.2)' }}>
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full" style={{ background: '#c9aa71' }} />
              <h2 className="text-white font-black text-xl">Official Broadcast Channels</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  name: 'beIN Sport 1',
                  desc: 'Official broadcaster for the Middle East & North Africa. All 104 matches live in UHD Arabic commentary.',
                  regions: 'MENA · Arabic',
                  icon: '📡',
                },
                {
                  name: 'M6',
                  desc: 'Free-to-air French broadcaster. Live matches including France national team games in HD with no subscription.',
                  regions: 'France · Gratuit',
                  icon: '🇫🇷',
                },
                {
                  name: 'RMC Sport',
                  desc: 'Premium French sports channel with exclusive World Cup 2026 coverage, analysis and live match streams in HD.',
                  regions: 'France · HD',
                  icon: '📺',
                },
              ].map(ch => (
                <div key={ch.name} className="rounded-xl p-4 space-y-2"
                  style={{ background: 'rgba(201,170,113,0.05)', border: '1px solid rgba(201,170,113,0.15)' }}>
                  <p className="text-lg">{ch.icon}</p>
                  <p className="text-white font-black">{ch.name}</p>
                  <p className="text-xs font-bold" style={{ color: '#c9aa71' }}>{ch.regions}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{ch.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            LATEST NEWS — 20 ARTICLES
        ═══════════════════════════════════════════════ */}
        <section className="px-4 md:px-0 pt-10 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded-full" style={{ background: '#c9aa71' }} />
            <h2 className="text-white font-black text-xl">Latest World Cup 2026 News</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wc2026News.map(article => (
              <article key={article.slug}
                className="group flex flex-col rounded-xl overflow-hidden border transition-all"
                style={{ background: 'rgba(10,22,40,0.9)', borderColor: 'rgba(255,255,255,0.06)' }}>

                {/* Colored header */}
                <div className="h-2" style={{ background: 'linear-gradient(90deg, #0a1628, #c9aa71, #0a1628)' }} />

                <div className="flex-1 p-4 space-y-3">
                  {/* Meta row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[article.category]}`}>
                      {article.category}
                    </span>
                    {article.flag && (
                      <img src={`https://flagcdn.com/w20/${article.flag}.png`} alt="" width={16} height={11} className="rounded" />
                    )}
                    <span className="text-gray-600 text-[10px] ml-auto">{article.readTime} min read</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-sm leading-snug group-hover:text-[#c9aa71] transition-colors">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">{article.excerpt}</p>
                </div>

                {/* Footer */}
                <div className="px-4 pb-4 flex items-center justify-between">
                  <span className="text-gray-600 text-[10px]">{article.date}</span>
                  <Link href={`/world-cup-2026-live#${article.slug}`}
                    className="text-[10px] font-bold transition-colors"
                    style={{ color: '#c9aa71' }}>
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            MULTILINGUAL SEO BLOCKS
        ═══════════════════════════════════════════════ */}
        <section className="px-4 md:px-0 pt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              flag: '🇬🇧', lang: 'English',
              title: 'FIFA World Cup 2026 Free Live Stream',
              body: 'Watch all 104 FIFA World Cup 2026 matches free in HD on SportaLive. Live streams on beIN Sport 1, M6 France, and RMC Sport — no subscription, no registration. USA, Canada & Mexico host the biggest World Cup in history with 48 teams.',
            },
            {
              flag: '🇫🇷', lang: 'Français',
              title: 'Coupe du Monde 2026 — Streaming Gratuit HD',
              body: 'Regardez tous les matchs de la Coupe du Monde 2026 gratuitement en direct HD sur SportaLive. M6 et RMC Sport diffusent les matchs en clair. 48 équipes, 104 matchs, co-organisée aux USA, Canada et Mexique. Sans abonnement.',
            },
            {
              flag: '🇸🇦', lang: 'العربية', rtl: true,
              title: 'كأس العالم 2026 — بث مباشر مجاني عبر beIN Sport',
              body: 'شاهد جميع مباريات كأس العالم 2026 مجاناً وبجودة HD على SportaLive. نبث قناة beIN Sport 1 وM6 وRMC Sport مباشرة بدون اشتراك ولا تسجيل. 48 منتخباً، 104 مباراة، تستضيفها الولايات المتحدة وكندا والمكسيك.',
            },
            {
              flag: '🇧🇷', lang: 'Português',
              title: 'Copa do Mundo 2026 — Transmissão ao Vivo Grátis',
              body: 'Assista todos os jogos da Copa do Mundo 2026 ao vivo e de graça em HD no SportaLive. Transmitimos beIN Sport 1, M6 e RMC Sport — sem assinatura, sem cadastro. Brasil, Vinicius Jr e 48 seleções competindo nos EUA, Canadá e México.',
            },
            {
              flag: '🇪🇸', lang: 'Español',
              title: 'Copa Mundial 2026 — Ver en Vivo Gratis HD',
              body: 'Mira todos los partidos del Mundial 2026 en directo y gratis en HD en SportaLive. Transmitimos beIN Sport 1, M6 y RMC Sport — sin suscripción ni registro. 48 selecciones, 104 partidos en EE.UU., Canadá y México.',
            },
            {
              flag: '🇲🇦', lang: 'Darija (Moroccan)',
              title: 'كأس العالم 2026 — مشاهدة مجانية بالعربية المغربية',
              body: 'شوف جميع مباريات كأس العالم 2026 بالمجان وبجودة HD على SportaLive. كنبثو beIN Sport 1 وM6 وRMC Sport مباشرة بلا اشتراك ولا تسجيل. المغرب فالمونديال — أسود الأطلس يحلمون بنصف النهائي من جديد.',
              rtl: true,
            },
          ].map(b => (
            <div key={b.lang} className="rounded-xl p-5 space-y-2"
              dir={b.rtl ? 'rtl' : 'ltr'}
              style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-sm font-black text-white">{b.flag} {b.title}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{b.body}</p>
              <p className="text-[10px]" style={{ color: 'rgba(201,170,113,0.4)' }}>{b.lang}</p>
            </div>
          ))}
        </section>

        {/* ═══════════════════════════════════════════════
            FAQ
        ═══════════════════════════════════════════════ */}
        <section className="px-4 md:px-0 pt-10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded-full" style={{ background: '#c9aa71' }} />
            <h2 className="text-white font-black text-xl">Frequently Asked Questions</h2>
          </div>
          {faqJsonLd.mainEntity.map((q: any, i: number) => (
            <details key={i}
              className="rounded-xl overflow-hidden border group cursor-pointer"
              style={{ background: 'rgba(10,22,40,0.9)', borderColor: 'rgba(201,170,113,0.15)' }}>
              <summary className="flex items-center justify-between gap-3 px-5 py-4 list-none text-white text-sm font-semibold">
                <span>{q.name}</span>
                <span className="text-xl font-light flex-shrink-0 group-open:rotate-45 transition-transform"
                  style={{ color: '#c9aa71' }}>+</span>
              </summary>
              <div className="px-5 pb-4">
                <p className="text-gray-400 text-sm leading-relaxed border-t pt-4"
                  style={{ borderColor: 'rgba(201,170,113,0.1)' }}>{q.acceptedAnswer.text}</p>
              </div>
            </details>
          ))}
        </section>

        {/* ═══════════════════════════════════════════════
            INTERNAL LINKS
        ═══════════════════════════════════════════════ */}
        <section className="px-4 md:px-0 pt-8 pb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full" style={{ background: '#c9aa71' }} />
            <h2 className="text-white font-black text-xl">More World Cup 2026</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/wc2026',           label: '📅 Full Match Schedule' },
              { href: '/world-cup-2026',   label: '🌍 WC2026 Hub' },
              { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' },
              { href: '/mexico-vs-south-africa-2026', label: '🇲🇽 Mexico vs South Africa' },
              { href: '/germany-vs-curacao-2026', label: '🇩🇪 Germany vs Curaçao' },
              { href: '/channel/ar-bein-sport-uhd-1', label: '📡 beIN Sport 1 Live' },
              { href: '/channel/m6',       label: '🇫🇷 M6 Live' },
              { href: '/live',             label: '📺 All Live Channels' },
              { href: '/chaines-marocaines', label: '🇲🇦 Chaînes Marocaines' },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{ background: 'rgba(201,170,113,0.07)', border: '1px solid rgba(201,170,113,0.2)', color: '#c9aa71' }}>
                {label}
              </Link>
            ))}
          </div>
        </section>

        {/* Hidden SEO keyword density block */}
        <p className="text-[10px] text-gray-800 leading-relaxed px-4 pb-6">
          world cup 2026 live stream free · bein sport 1 world cup 2026 · m6 coupe du monde 2026 direct gratuit ·
          rmc sport world cup 2026 · كأس العالم 2026 بث مباشر مجاناً beIN Sport · مشاهدة كأس العالم 2026 مجاناً ·
          copa do mundo 2026 ao vivo grátis · brasil copa 2026 transmissão ao vivo · mundial 2026 en vivo gratis ·
          coupe du monde 2026 streaming gratuit rmc · world cup 2026 usa canada mexico free stream
        </p>
      </div>
    </>
  );
}
