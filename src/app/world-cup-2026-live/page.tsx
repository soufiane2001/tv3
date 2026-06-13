import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import WC2026StreamClient from '@/components/worldcup/WC2026StreamClient';
import AdBanner from '@/components/ads/AdBanner';
import { wc2026News } from '@/data/wc2026-news';
import { matchesByDay } from '@/data/wc2026-matches';
import { getWcExtraChannels } from '@/lib/wc-channels';

export const revalidate = 3600;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sportalive.live';
const PAGE_URL = `${SITE}/world-cup-2026-live`;

export const metadata: Metadata = {
  title: 'FIFA World Cup 2026 Live Stream Free — All Matches HD | beIN Sport · M6 · RMC',
  description: 'Watch FIFA World Cup 2026 live stream FREE in HD. All 104 matches on beIN Sport 1, M6 and RMC Sport. USA · Canada · Mexico — June 11 to July 19, 2026. No subscription needed. مباريات كأس العالم 2026 بث مباشر مجاناً. Coupe du Monde 2026 streaming gratuit. Copa do Mundo 2026 ao vivo grátis.',
  keywords: [
    'world cup 2026 live stream free','fifa world cup 2026 live','watch world cup 2026 free hd',
    'bein sport 1 world cup 2026','m6 coupe du monde 2026 direct','rmc sport world cup 2026',
    'world cup 2026 free stream no subscription','all world cup 2026 matches live',
    'كأس العالم 2026 بث مباشر مجاناً beIN Sport','coupe du monde 2026 streaming gratuit m6 rmc',
    'copa do mundo 2026 ao vivo grátis','mundial 2026 en vivo gratis',
    'world cup 2026 usa canada mexico free stream','fifa wc 2026 full matches live',
  ].join(', '),
  alternates: {
    canonical: PAGE_URL,
    languages: { 'en': PAGE_URL, 'fr': PAGE_URL, 'ar': PAGE_URL, 'pt': PAGE_URL, 'es': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: '🔴 FIFA World Cup 2026 — All Matches Live Stream FREE | beIN Sport · M6 · RMC',
    description: 'Stream all 104 World Cup 2026 matches free in HD — beIN Sport 1, M6, RMC Sport. No subscription.',
    type: 'website', url: PAGE_URL, siteName: 'SportaLive',
  },
  twitter: { card: 'summary_large_image', title: '🔴 World Cup 2026 Free Live Stream — All Matches HD', description: 'beIN Sport 1 · M6 · RMC — Free, no registration.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

const eventJsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026',
  alternateName: ['WC2026', 'Coupe du Monde 2026', 'كأس العالم 2026', 'Copa do Mundo 2026', 'Copa Mundial 2026'],
  description: '48 teams, 104 matches. Watch all FIFA World Cup 2026 matches live free on beIN Sport 1, M6 and RMC Sport.',
  startDate: '2026-06-11', endDate: '2026-07-19',
  eventStatus: 'https://schema.org/EventInProgress',
  sport: 'https://en.wikipedia.org/wiki/Association_football',
  url: PAGE_URL,
  image: [
    'https://flagcdn.com/w320/us.png',
    'https://flagcdn.com/w320/ca.png',
    'https://flagcdn.com/w320/mx.png',
  ],
  location: { '@type': 'Country', name: 'United States, Canada, Mexico' },
  organizer: { '@type': 'Organization', name: 'FIFA', url: 'https://www.fifa.com' },
  performer: [
    { '@type': 'SportsTeam', 'name': 'United States', 'url': 'https://en.wikipedia.org/wiki/United_States_men%27s_national_soccer_team' },
    { '@type': 'SportsTeam', 'name': 'Canada',        'url': 'https://en.wikipedia.org/wiki/Canada_men%27s_national_soccer_team' },
    { '@type': 'SportsTeam', 'name': 'Mexico',        'url': 'https://en.wikipedia.org/wiki/Mexico_national_football_team' },
  ],
  offers: { '@type': 'Offer', name: 'FIFA World Cup 2026 Free Live Stream', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: PAGE_URL },
};

const faqJsonLd = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where to watch FIFA World Cup 2026 for free?', acceptedAnswer: { '@type': 'Answer', text: 'Watch all 104 FIFA World Cup 2026 matches free in HD on SportaLive. We stream beIN Sport 1, M6, and RMC Sport live — no subscription, no registration needed.' } },
    { '@type': 'Question', name: 'Which channels broadcast FIFA World Cup 2026 for free?', acceptedAnswer: { '@type': 'Answer', text: 'beIN Sport 1 (MENA region), M6 (France — free-to-air), and RMC Sport broadcast the 2026 World Cup. All available free on SportaLive.' } },
    { '@type': 'Question', name: 'When does FIFA World Cup 2026 start?', acceptedAnswer: { '@type': 'Answer', text: 'FIFA World Cup 2026 starts June 11, 2026 with Mexico vs South Africa at Estadio Azteca, Mexico City. The final is July 19, 2026.' } },
    { '@type': 'Question', name: 'كيف أشاهد كأس العالم 2026 مجاناً على beIN Sport؟', acceptedAnswer: { '@type': 'Answer', text: 'شاهد جميع مباريات كأس العالم 2026 مجاناً على SportaLive. نبث قناة beIN Sport 1 وM6 وRMC Sport بدون اشتراك ولا تسجيل.' } },
    { '@type': 'Question', name: 'Comment regarder la Coupe du Monde 2026 sur M6 gratuitement?', acceptedAnswer: { '@type': 'Answer', text: 'M6 diffuse la Coupe du Monde 2026 gratuitement en France. Sur SportaLive, regardez M6 en direct HD sans abonnement depuis n\'importe quel pays.' } },
    { '@type': 'Question', name: 'How many teams are in the 2026 World Cup?', acceptedAnswer: { '@type': 'Answer', text: '48 teams compete in FIFA World Cup 2026 for the first time in history, playing 104 matches across 16 venues in the USA, Canada, and Mexico.' } },
    { '@type': 'Question', name: 'Como assistir a Copa do Mundo 2026 de graça?', acceptedAnswer: { '@type': 'Answer', text: 'No SportaLive você assiste todos os jogos da Copa do Mundo 2026 de graça em HD. Transmitimos beIN Sport 1, M6 e RMC Sport ao vivo — sem assinatura.' } },
    { '@type': 'Question', name: 'What is the best free site to watch World Cup 2026?', acceptedAnswer: { '@type': 'Answer', text: 'SportaLive is the best free streaming site for World Cup 2026. Open on any device, choose a server (beIN Sport 1, M6, RMC), and watch live in HD for free.' } },
  ],
};

// Schedule derived from the single source of truth (wc2026-matches).
const MATCHES = matchesByDay();

const CAT_COLORS: Record<string, string> = {
  News:     'bg-blue-500 text-white',
  Preview:  'bg-emerald-600 text-white',
  Guide:    'bg-purple-600 text-white',
  Analysis: 'bg-amber-600 text-white',
  Team:     'bg-red-600 text-white',
};

export default async function WorldCup2026LivePage() {
  const wcServers = await getWcExtraChannels();

  return (
    <>
      <JsonLd data={eventJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* ═══════════════════════════════════════════════════════
          HERO — full-bleed red inspired by Arda Guler design
      ═══════════════════════════════════════════════════════ */}
      <div className="relative -mx-4 -mt-6 overflow-hidden" style={{ minHeight: '92vh', background: 'linear-gradient(135deg, #b91c1c 0%, #7f1d1d 40%, #991b1b 70%, #6b0f0f 100%)' }}>

        {/* Radial glow top-right */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vh] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(255,60,60,0.35) 0%, transparent 65%)' }} />
        {/* Subtle diagonal lines texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }} />
        {/* Bottom dark fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))' }} />

        {/* TOP NAV BAR */}
        <div className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-6">
          <Link href="/" className="text-white font-black text-xl tracking-widest uppercase">SportaLive</Link>
          <nav className="hidden md:flex items-center gap-8 text-white/80 text-sm font-medium">
            <Link href="/wc2026" className="hover:text-white transition-colors">Schedule</Link>
            <Link href="/world-cup-2026" className="hover:text-white transition-colors">Teams</Link>
            <Link href="/live" className="hover:text-white transition-colors">Channels</Link>
          </nav>
          <a href="#stream"
            className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-black rounded-full transition-opacity hover:opacity-80">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Live Stream
          </a>
        </div>

        {/* HERO CONTENT GRID */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 md:px-12 pt-10 pb-32">

          {/* LEFT — Stats */}
          <div className="flex flex-col justify-center gap-7 pt-6">
            <div>
              <p className="text-white font-black" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1 }}>48</p>
              <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mt-1">Teams</p>
            </div>
            <div>
              <p className="text-white font-black" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1 }}>104</p>
              <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mt-1">Matches</p>
            </div>
            <div>
              <p className="text-white font-black" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1 }}>3</p>
              <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mt-1">Host Nations</p>
            </div>
            {/* Broadcast tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['📡 beIN Sport 1', '🇫🇷 M6', '📺 RMC Sport'].map(t => (
                <span key={t} className="px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/20 text-white text-xs font-bold rounded-full">{t}</span>
              ))}
            </div>
          </div>

          {/* RIGHT — Match cards */}
          <div className="flex flex-col gap-3">
            {/* Next Match card */}
            <div className="rounded-2xl overflow-hidden" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest">Next Match</p>
                  <p className="text-white font-black text-sm mt-0.5">Opening Game — Group A</p>
                </div>
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-sm">→</span>
              </div>
              <Link href="/mexico-vs-south-africa-2026" className="flex items-center justify-between px-4 pb-4 pt-2 hover:bg-white/5 transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <img src="https://flagcdn.com/w80/mx.png" alt="Mexico" width={48} height={32} className="rounded shadow-lg" />
                  <span className="text-white text-xs font-bold">Mexico</span>
                </div>
                <div className="text-center">
                  <span className="text-white/30 font-black text-2xl tracking-widest">VS</span>
                  <p className="text-red-400 text-[10px] font-black uppercase tracking-widest mt-1">Jun 11 · 21:00</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img src="https://flagcdn.com/w80/za.png" alt="South Africa" width={48} height={32} className="rounded shadow-lg" />
                  <span className="text-white text-xs font-bold">South Africa</span>
                </div>
              </Link>
            </div>

            {/* Upcoming matches */}
            {MATCHES.slice(1, 4).map(day => (
              <div key={day.date}>
                <p className="text-white/40 text-[10px] uppercase tracking-widest px-1 mb-2">{day.date}</p>
                <div className="space-y-2">
                  {day.matches.slice(0, 1).map(m => (
                    <Link key={m.slug} href={`/${m.slug}`}
                      className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
                      style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="flex items-center gap-2">
                        <img src={`https://flagcdn.com/w40/${m.hf}.png`} alt={m.home} width={32} height={21} className="rounded" />
                        <span className="text-white text-xs font-bold">{m.home}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white/30 text-xs font-black">VS</span>
                        <span className="text-red-400 text-[10px] font-bold">{m.time}</span>
                        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-[10px]">→</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white text-xs font-bold">{m.away}</span>
                        <img src={`https://flagcdn.com/w40/${m.af}.png`} alt={m.away} width={32} height={21} className="rounded" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MASSIVE BOTTOM TEXT */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-3 pointer-events-none select-none overflow-hidden">
          <p className="text-white font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)', opacity: 0.12, letterSpacing: '-0.02em' }}>
            WORLD CUP 2026
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          STREAM PLAYER
      ═══════════════════════════════════════════════════════ */}
      <div id="stream" className="max-w-5xl mx-auto px-4 md:px-0 pt-10 space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-red-600 rounded-full text-white text-[10px] font-black uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />LIVE
          </span>
          <h2 className="text-white font-extrabold text-xl">FIFA World Cup 2026 — Live Stream</h2>
        </div>
        <WC2026StreamClient
          servers={wcServers}
          match={{ home: 'USA', homeFlag: 'us', away: 'Canada', awayFlag: 'ca', thirdFlag: 'mx', thirdName: 'Mexico', date: 'June 11 – July 19, 2026', time: 'All Matches' }}
        />
        <p className="text-gray-600 text-xs text-center">If server doesn't work, switch to next · Free HD · No registration</p>
        <AdBanner />
      </div>

      {/* ═══════════════════════════════════════════════════════
          FULL SCHEDULE
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 md:px-0 pt-14 space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-1 h-7 rounded-full bg-red-600" />
          <h2 className="text-white font-black text-2xl">Group Stage Schedule</h2>
        </div>

        {MATCHES.map(({ date, matches }) => (
          <div key={date} className="space-y-2">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400">{date}</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            {matches.map(m => (
              <Link key={m.slug} href={`/${m.slug}`}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-white/[0.06] hover:border-red-500/40 transition-all"
                style={{ background: '#0d0d0d' }}>
                <span className="hidden sm:flex w-9 h-9 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-black items-center justify-center flex-shrink-0">
                  {m.group}
                </span>
                <div className="flex-1 flex items-center gap-4 min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <img src={`https://flagcdn.com/w40/${m.hf}.png`} alt={m.home} width={30} height={20} className="rounded flex-shrink-0 shadow" />
                    <span className="text-white font-bold text-sm truncate">{m.home}</span>
                  </div>
                  <span className="text-white/20 text-xs font-black flex-shrink-0">VS</span>
                  <div className="flex items-center gap-2 min-w-0">
                    <img src={`https://flagcdn.com/w40/${m.af}.png`} alt={m.away} width={30} height={20} className="rounded flex-shrink-0 shadow" />
                    <span className="text-white font-bold text-sm truncate">{m.away}</span>
                  </div>
                </div>
                <span className="text-white font-bold text-sm flex-shrink-0 hidden sm:block">{m.time}</span>
                <span className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-red-600/20 border border-red-500/30 text-red-400 group-hover:bg-red-600 group-hover:text-white text-xs font-black rounded-full transition-all whitespace-nowrap">
                  ▶ Watch
                </span>
              </Link>
            ))}
          </div>
        ))}
      </section>

      {/* ═══════════════════════════════════════════════════════
          BROADCAST CHANNELS
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 md:px-0 pt-14">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1 h-7 rounded-full bg-red-600" />
          <h2 className="text-white font-black text-2xl">Official Broadcast Channels</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: 'beIN Sport 1', regions: 'MENA · Arabic · UHD', desc: 'Official broadcaster for the Middle East & North Africa. All 104 matches live in UHD with Arabic commentary.', icon: '📡', color: '#3b82f6' },
            { name: 'M6', regions: 'France · Free-to-air', desc: 'Free French broadcaster. Live matches including France national team in HD — no subscription needed.', icon: '🇫🇷', color: '#22c55e' },
            { name: 'RMC Sport', regions: 'France · HD Premium', desc: 'Premium French sports channel with full World Cup 2026 coverage, analysis and exclusive live streams.', icon: '📺', color: '#ef4444' },
          ].map(ch => (
            <div key={ch.name} className="rounded-2xl p-5 space-y-3 border border-white/[0.06]" style={{ background: '#0d0d0d' }}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{ch.icon}</span>
                <div>
                  <p className="text-white font-black">{ch.name}</p>
                  <p className="text-xs font-bold" style={{ color: ch.color }}>{ch.regions}</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">{ch.desc}</p>
              <a href="#stream" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                style={{ background: `${ch.color}22`, border: `1px solid ${ch.color}44`, color: ch.color }}>
                ▶ Watch free
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          20 BLOG ARTICLES
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 md:px-0 pt-14 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-1 h-7 rounded-full bg-red-600" />
          <h2 className="text-white font-black text-2xl">Latest World Cup 2026 News</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wc2026News.map(article => (
            <article key={article.slug}
              className="group flex flex-col rounded-2xl overflow-hidden border border-white/[0.06] hover:border-red-600/50 hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: '#161616' }}>
              {/* Red top bar — thicker */}
              <div className="h-[3px] bg-red-600" />

              <div className="flex-1 p-4 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${CAT_COLORS[article.category]}`}>
                    {article.category}
                  </span>
                  {article.flag && (
                    <img src={`https://flagcdn.com/w20/${article.flag}.png`} alt="" width={16} height={11} className="rounded" />
                  )}
                  <span className="text-white/30 text-[10px] font-bold ml-auto">{article.readTime} min</span>
                </div>
                <h3 className="text-white font-black text-sm leading-snug group-hover:text-red-400 transition-colors line-clamp-3">
                  {article.title}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{article.excerpt}</p>
              </div>

              <div className="px-4 pb-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
                <span className="text-white/25 text-[10px] font-medium">{article.date}</span>
                <span className="text-red-500 text-[10px] font-black tracking-wide hover:text-red-400 transition-colors">Read more →</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MULTILINGUAL SEO BLOCKS
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 md:px-0 pt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { flag: '🇬🇧', title: 'FIFA World Cup 2026 Free Live Stream', body: 'Watch all 104 FIFA World Cup 2026 matches free in HD on SportaLive. Live on beIN Sport 1, M6 France, and RMC Sport — no subscription. USA, Canada & Mexico host 48 teams in the biggest World Cup in history.' },
          { flag: '🇫🇷', title: 'Coupe du Monde 2026 — Streaming Gratuit HD', body: 'Regardez tous les matchs de la Coupe du Monde 2026 gratuitement en HD sur SportaLive. M6 et RMC Sport diffusent en clair. 48 équipes, 104 matchs aux USA, Canada et Mexique. Sans abonnement, sans inscription.' },
          { flag: '🇸🇦', title: 'كأس العالم 2026 — beIN Sport بث مباشر مجاني', body: 'شاهد جميع مباريات كأس العالم 2026 مجاناً وبجودة HD على SportaLive. نبث beIN Sport 1 وM6 وRMC بدون اشتراك. 48 منتخباً، 104 مباراة في الولايات المتحدة وكندا والمكسيك.', rtl: true },
          { flag: '🇧🇷', title: 'Copa do Mundo 2026 — Transmissão Grátis HD', body: 'Assista todos os 104 jogos da Copa do Mundo 2026 de graça em HD no SportaLive. beIN Sport 1, M6 e RMC Sport ao vivo — sem assinatura. Brasil, Vinicius Jr e 48 seleções nos EUA, Canadá e México.' },
          { flag: '🇪🇸', title: 'Copa Mundial 2026 — Ver en Vivo Gratis HD', body: 'Mira todos los partidos del Mundial 2026 gratis en HD en SportaLive. beIN Sport 1, M6 y RMC Sport sin suscripción. 48 selecciones, 104 partidos en EE.UU., Canadá y México.' },
          { flag: '🇲🇦', title: 'كأس العالم 2026 — مشاهدة مجانية بالدارجة المغربية', body: 'شوف جميع مباريات كأس العالم 2026 بالمجان وبجودة HD على SportaLive. كنبثو beIN Sport 1 وM6 وRMC بلا اشتراك. أسود الأطلس فالمونديال — المغرب يحلم بنصف النهائي.', rtl: true },
        ].map(b => (
          <div key={b.flag} dir={(b as any).rtl ? 'rtl' : 'ltr'}
            className="rounded-2xl p-5 space-y-2 border border-white/[0.06]"
            style={{ background: '#0d0d0d' }}>
            <p className="text-white font-black text-sm">{b.flag} {b.title}</p>
            <p className="text-gray-500 text-xs leading-relaxed">{b.body}</p>
          </div>
        ))}
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 md:px-0 pt-14 space-y-3">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1 h-7 rounded-full bg-red-600" />
          <h2 className="text-white font-black text-2xl">Frequently Asked Questions</h2>
        </div>
        {faqJsonLd.mainEntity.map((q: any, i: number) => (
          <details key={i}
            className="rounded-2xl border border-white/[0.06] hover:border-red-500/30 transition-all group cursor-pointer overflow-hidden"
            style={{ background: '#0d0d0d' }}>
            <summary className="flex items-center justify-between gap-3 px-5 py-4 list-none text-white text-sm font-semibold">
              <span>{q.name}</span>
              <span className="text-red-500 text-xl font-light flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-5 pb-5 pt-0">
              <div className="h-px bg-white/5 mb-4" />
              <p className="text-gray-400 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
            </div>
          </details>
        ))}
      </section>

      {/* ═══════════════════════════════════════════════════════
          INTERNAL LINKS
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 md:px-0 pt-10 pb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-7 rounded-full bg-red-600" />
          <h2 className="text-white font-black text-xl">More World Cup 2026</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            { href: '/wc2026', label: '📅 Full Schedule' },
            { href: '/world-cup-2026', label: '🌍 WC2026 Hub' },
            { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' },
            { href: '/mexico-vs-south-africa-2026', label: '🇲🇽 Mexico vs South Africa' },
            { href: '/germany-vs-curacao-2026', label: '🇩🇪 Germany vs Curaçao' },
            { href: '/channel/ar-bein-sport-uhd-1', label: '📡 beIN Sport 1' },
            { href: '/channel/m6', label: '🇫🇷 M6 Live' },
            { href: '/live', label: '📺 All Channels' },
            { href: '/chaines-marocaines', label: '🇲🇦 Chaînes Marocaines' },
          ].map(({ href, label }) => (
            <Link key={href} href={href}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-500/40 text-gray-400 hover:text-white transition-all">
              {label}
            </Link>
          ))}
        </div>
      </section>

    </>
  );
}
