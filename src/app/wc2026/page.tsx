import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';

export const metadata: Metadata = {
  title: 'FIFA World Cup 2026 — Full Match Schedule & Free Live Stream | SportaLive',
  description: 'Watch every FIFA World Cup 2026 match LIVE FREE in HD. Full group stage schedule with all 104 matches. Free streams on M6, beIN Sports, La 1. USA · Canada · Mexico — June 11 to July 19, 2026. مباريات كأس العالم 2026 بث مباشر.',
  keywords: [
    'world cup 2026 live stream free','fifa world cup 2026 schedule','watch world cup 2026 free',
    'world cup 2026 group stage','wc2026 live stream','world cup 2026 matches today',
    'coupe du monde 2026 streaming gratuit','coupe du monde 2026 programme matchs',
    'كأس العالم 2026 بث مباشر مجاناً','جدول مباريات كأس العالم 2026',
    'mundial 2026 en vivo gratis','copa do mundo 2026 ao vivo',
  ].join(', '),
  alternates: {
    canonical: `${SITE}/wc2026`,
    languages: { 'en': `${SITE}/wc2026`, 'fr': `${SITE}/wc2026`, 'ar': `${SITE}/wc2026`, 'x-default': `${SITE}/wc2026` },
  },
  openGraph: {
    title: '🌍 FIFA World Cup 2026 — All Matches Free Live Stream',
    description: 'Full group stage schedule + free HD streams — M6, beIN Sports, La 1. No subscription.',
    type: 'website', url: `${SITE}/wc2026`, siteName: 'SportaLive',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'ItemList',
  name: 'FIFA World Cup 2026 — All Match Live Stream Pages',
  url: `${SITE}/wc2026`, numberOfItems: 12,
  itemListElement: [
    { '@type': 'ListItem', position: 1,  name: 'Mexico vs South Africa — WC2026',  url: `${SITE}/mexico-vs-south-africa-2026` },
    { '@type': 'ListItem', position: 2,  name: 'Korea vs Czechia — WC2026',        url: `${SITE}/korea-vs-czechia-2026` },
    { '@type': 'ListItem', position: 3,  name: 'Canada vs Bosnia — WC2026',        url: `${SITE}/canada-vs-bosnia-2026` },
    { '@type': 'ListItem', position: 4,  name: 'USA vs Paraguay — WC2026',         url: `${SITE}/usa-vs-paraguay-2026` },
    { '@type': 'ListItem', position: 5,  name: 'Haiti vs Scotland — WC2026',       url: `${SITE}/haiti-vs-scotland-2026` },
    { '@type': 'ListItem', position: 6,  name: 'Australia vs Türkiye — WC2026',    url: `${SITE}/australia-vs-turkiye-2026` },
    { '@type': 'ListItem', position: 7,  name: 'Brazil vs Morocco — WC2026',       url: `${SITE}/brazil-vs-morocco-2026` },
    { '@type': 'ListItem', position: 8,  name: 'Qatar vs Switzerland — WC2026',    url: `${SITE}/qatar-vs-switzerland-2026` },
    { '@type': 'ListItem', position: 9,  name: 'Ivory Coast vs Ecuador — WC2026',  url: `${SITE}/ivory-coast-vs-ecuador-2026` },
    { '@type': 'ListItem', position: 10, name: 'Germany vs Curaçao — WC2026',      url: `${SITE}/germany-vs-curacao-2026` },
    { '@type': 'ListItem', position: 11, name: 'Netherlands vs Japan — WC2026',    url: `${SITE}/netherlands-vs-japan-2026` },
    { '@type': 'ListItem', position: 12, name: 'Sweden vs Tunisia — WC2026',       url: `${SITE}/sweden-vs-tunisia-2026` },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where can I watch FIFA World Cup 2026 matches live for free?', acceptedAnswer: { '@type': 'Answer', text: 'Watch all 104 FIFA World Cup 2026 matches free in HD on SportaLive. We stream M6, beIN Sports, La 1 and more — no subscription, no registration. Click any match below.' } },
    { '@type': 'Question', name: 'When does FIFA World Cup 2026 start?', acceptedAnswer: { '@type': 'Answer', text: 'FIFA World Cup 2026 starts June 11, 2026 with Mexico vs South Africa at Estadio Azteca, Mexico City. The final is July 19, 2026.' } },
    { '@type': 'Question', name: 'Which countries host the 2026 World Cup?', acceptedAnswer: { '@type': 'Answer', text: 'USA, Canada and Mexico co-host FIFA World Cup 2026 — the first World Cup with 48 teams and 104 matches.' } },
    { '@type': 'Question', name: 'What channels broadcast World Cup 2026 for free?', acceptedAnswer: { '@type': 'Answer', text: 'M6 (France), beIN Sports (MENA), La 1 RTVE (Spain). All streamed free on SportaLive — no cable needed.' } },
    { '@type': 'Question', name: 'كيف أشاهد مباريات كأس العالم 2026 مجاناً؟', acceptedAnswer: { '@type': 'Answer', text: 'شاهد جميع مباريات كأس العالم 2026 مجاناً وبجودة HD على SportaLive عبر beIN Sports وM6 — بدون اشتراك ولا تسجيل.' } },
    { '@type': 'Question', name: 'Comment regarder la Coupe du Monde 2026 gratuitement?', acceptedAnswer: { '@type': 'Answer', text: 'Regardez tous les matchs de la Coupe du Monde 2026 gratuitement sur SportaLive — M6, beIN Sports, sans abonnement.' } },
    { '@type': 'Question', name: 'How many teams are in the 2026 World Cup?', acceptedAnswer: { '@type': 'Answer', text: '48 teams compete in FIFA World Cup 2026 for the first time, playing 104 matches across the USA, Canada and Mexico.' } },
  ],
};

// Real WC2026 schedule (FIFA final draw 05/12/2025). Times in Paris time
// (CEST, UTC+2); "+1" = early-morning kick-off the next day.
const MATCHES = [
  { date: 'Thursday June 11', matches: [
    { slug: 'mexico-vs-south-africa-2026', home: 'Mexico', hc: 'mx', away: 'South Africa', ac: 'za', time: '21:00', group: 'A', venue: 'Estadio Azteca, MX' },
    { slug: 'korea-vs-czechia-2026', home: 'Korea', hc: 'kr', away: 'Czechia', ac: 'cz', time: '04:00+1', group: 'A', venue: 'Estadio Akron, GDL' },
  ]},
  { date: 'Friday June 12', matches: [
    { slug: 'canada-vs-bosnia-2026', home: 'Canada', hc: 'ca', away: 'Bosnia', ac: 'ba', time: '21:00', group: 'B', venue: 'BMO Field, Toronto' },
    { slug: 'usa-vs-paraguay-2026', home: 'USA', hc: 'us', away: 'Paraguay', ac: 'py', time: '03:00+1', group: 'D', venue: 'SoFi Stadium, LA' },
  ]},
  { date: 'Saturday June 13', matches: [
    { slug: 'qatar-vs-switzerland-2026', home: 'Qatar', hc: 'qa', away: 'Switzerland', ac: 'ch', time: '21:00', group: 'B', venue: "Levi's Stadium, SF" },
    { slug: 'brazil-vs-morocco-2026', home: 'Brazil', hc: 'br', away: 'Morocco', ac: 'ma', time: '00:00+1', group: 'C', venue: 'MetLife Stadium, NY' },
    { slug: 'haiti-vs-scotland-2026', home: 'Haiti', hc: 'ht', away: 'Scotland', ac: 'gb-sct', time: '03:00+1', group: 'C', venue: 'Gillette Stadium, Boston' },
    { slug: 'australia-vs-turkiye-2026', home: 'Australia', hc: 'au', away: 'Türkiye', ac: 'tr', time: '06:00+1', group: 'D', venue: 'BC Place, Vancouver' },
  ]},
  { date: 'Sunday June 14', matches: [
    { slug: 'germany-vs-curacao-2026', home: 'Germany', hc: 'de', away: 'Curaçao', ac: 'cw', time: '19:00', group: 'E', venue: 'NRG Stadium, Houston' },
    { slug: 'netherlands-vs-japan-2026', home: 'Netherlands', hc: 'nl', away: 'Japan', ac: 'jp', time: '22:00', group: 'F', venue: 'AT&T Stadium, Dallas' },
    { slug: 'ivory-coast-vs-ecuador-2026', home: 'Ivory Coast', hc: 'ci', away: 'Ecuador', ac: 'ec', time: '01:00+1', group: 'E', venue: 'Lincoln Financial Field, Philadelphia' },
    { slug: 'sweden-vs-tunisia-2026', home: 'Sweden', hc: 'se', away: 'Tunisia', ac: 'tn', time: '04:00+1', group: 'F', venue: 'Estadio BBVA, Monterrey' },
  ]},
];

export default function WC2026Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-4xl mx-auto">

        {/* ── HERO — full-bleed red ── */}
        <section className="relative -mx-4 -mt-6 overflow-hidden mb-10"
          style={{ background: 'linear-gradient(160deg,#b91c1c 0%,#7f1d1d 45%,#1a0000 100%)', minHeight: '320px' }}>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '14px 14px' }} />
          <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 80% 20%,rgba(255,80,80,0.25) 0%,transparent 60%)' }} />

          <div className="relative z-10 px-6 md:px-10 pt-16 pb-14">
            <div className="flex items-center gap-2 mb-4">
              <span className="label-chip bg-black/40 text-white/70 border border-white/20">🌍 FIFA World Cup 2026</span>
            </div>
            <h1 className="text-white font-black uppercase leading-none mb-3"
              style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', letterSpacing: '-0.03em' }}>
              Full Match Schedule<br />
              <span className="text-red-400">Group Stage 2026</span>
            </h1>
            <p className="text-white/50 text-sm mb-6">USA · Canada · Mexico · June 11 – July 19 · 48 teams · 104 matches</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/world-cup-2026-live"
                className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full hover:bg-gray-100 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />Watch Live Free
              </Link>
              <Link href="/"
                className="px-6 py-2.5 border border-white/30 text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-white/10 transition-all">
                Home
              </Link>
            </div>
          </div>

          {/* Ghost text */}
          <div className="absolute bottom-0 left-0 right-0 px-6 overflow-hidden pointer-events-none select-none">
            <p className="ghost-text text-white">WC2026</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom,transparent,#000)' }} />
        </section>

        {/* ── STATS ROW ── */}
        <div className="grid grid-cols-3 gap-3 mb-10 px-4 md:px-0">
          {[['48', 'Teams'], ['104', 'Matches'], ['16', 'Venues']].map(([n, l]) => (
            <div key={l} className="card p-4 text-center">
              <p className="text-white font-black text-3xl md:text-4xl">{n}</p>
              <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mt-1">{l}</p>
            </div>
          ))}
        </div>

        {/* ── SCHEDULE ── */}
        <section className="px-4 md:px-0 space-y-6 mb-10">
          <div className="flex items-center gap-3">
            <div className="accent-bar h-7" />
            <h2 className="section-title text-white text-xl md:text-2xl">Group Stage Schedule</h2>
          </div>

          {MATCHES.map(({ date, matches }) => (
            <div key={date}>
              {/* Date header */}
              <div className="flex items-center gap-3 mb-3">
                <span className="label-chip bg-red-600 text-white text-[10px]">{date}</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>

              <div className="space-y-2">
                {matches.map(m => (
                  <Link key={m.slug} href={`/${m.slug}`}
                    className="group card flex items-center gap-3 p-4 hover:border-red-600/50 hover:-translate-y-px transition-all duration-150">

                    {/* Group badge */}
                    <span className="hidden sm:flex w-8 h-8 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-xs font-black items-center justify-center flex-shrink-0">
                      {m.group}
                    </span>

                    {/* Teams */}
                    <div className="flex-1 flex items-center gap-3 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={`https://flagcdn.com/w40/${m.hc}.png`} alt={m.home} width={30} height={20} className="rounded flex-shrink-0 shadow" />
                        <span className="text-white font-bold text-sm truncate">{m.home}</span>
                      </div>
                      <span className="text-white/20 text-xs font-black flex-shrink-0">VS</span>
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={`https://flagcdn.com/w40/${m.ac}.png`} alt={m.away} width={30} height={20} className="rounded flex-shrink-0 shadow" />
                        <span className="text-white font-bold text-sm truncate">{m.away}</span>
                      </div>
                    </div>

                    {/* Time + venue */}
                    <div className="hidden sm:block text-right flex-shrink-0">
                      <p className="text-white font-black text-sm">{m.time}</p>
                      <p className="text-white/30 text-[10px]">{m.venue}</p>
                    </div>

                    {/* Watch CTA */}
                    <span className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-red-600/15 border border-red-600/30 text-red-400 group-hover:bg-red-600 group-hover:text-white text-xs font-black rounded-full transition-all whitespace-nowrap">
                      ▶ Watch
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ── MULTILINGUAL SEO ── */}
        <section className="px-4 md:px-0 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {[
            { flag: '🇬🇧', title: 'World Cup 2026 Free Stream', body: 'Watch all FIFA World Cup 2026 matches live free in HD — M6, beIN Sports, La 1. No subscription.' },
            { flag: '🇸🇦', title: 'كأس العالم 2026 بث مباشر', body: 'شاهد جميع مباريات كأس العالم 2026 مجاناً HD — beIN Sports وM6 بدون اشتراك.', rtl: true },
            { flag: '🇫🇷', title: 'Coupe du Monde 2026 Gratuit', body: 'Regardez tous les matchs de la Coupe du Monde 2026 en direct gratuit sur M6, beIN Sports — sans abonnement.' },
            { flag: '🇧🇷', title: 'Copa do Mundo 2026 Grátis', body: 'Assista todos os jogos da Copa do Mundo 2026 ao vivo grátis em HD — M6, beIN Sports, sem assinatura.' },
          ].map(b => (
            <div key={b.flag} dir={(b as any).rtl ? 'rtl' : 'ltr'} className="card p-4 space-y-1">
              <p className="text-white font-black text-sm">{b.flag} {b.title}</p>
              <p className="text-white/40 text-xs leading-relaxed">{b.body}</p>
            </div>
          ))}
        </section>

        {/* ── ABOUT ── */}
        <section className="px-4 md:px-0 mb-10">
          <div className="card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="accent-bar h-6" />
              <h2 className="text-white font-black text-lg uppercase tracking-tight">FIFA World Cup 2026 — Free Live Stream Guide</h2>
            </div>
            <div className="space-y-3 text-sm text-white/50 leading-relaxed">
              <p>
                <strong className="text-white">FIFA World Cup 2026</strong> is the biggest football tournament in history — <strong className="text-white">48 nations</strong>, <strong className="text-white">104 matches</strong>, hosted in the <strong className="text-red-400">USA, Canada and Mexico</strong> from <strong className="text-white">June 11 to July 19, 2026</strong>. Watch every match live free in HD on SportaLive — no subscription, no account.
              </p>
              <p>All group stage matches are available on <strong className="text-white">M6</strong> (France), <strong className="text-white">beIN Sports</strong> (MENA), <strong className="text-white">La 1</strong> (Spain) and more. Click any match above to watch live.</p>
              <div dir="rtl" className="border-r-2 border-red-600/30 pr-4">
                <p><strong className="text-white">كأس العالم FIFA 2026</strong> — 48 منتخباً، 104 مباراة. شاهد جميع المباريات <strong className="text-white">مجاناً وبجودة HD</strong> عبر beIN Sports وM6 وLa 1 — بدون اشتراك ولا تسجيل.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="px-4 md:px-0 space-y-2 mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="accent-bar h-6" />
            <h2 className="text-white font-black text-lg uppercase tracking-tight">Frequently Asked Questions</h2>
          </div>
          {faqJsonLd.mainEntity.map((item: any, i: number) => (
            <details key={i}
              className="group card border-white/[0.06] hover:border-red-600/30 transition-all cursor-pointer overflow-hidden">
              <summary className="flex items-center justify-between gap-3 px-5 py-4 list-none text-white text-sm font-bold">
                {item.name}
                <span className="text-red-500 text-xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-5 pb-4 pt-0">
                <div className="h-px bg-white/[0.05] mb-3" />
                <p className="text-white/40 text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            </details>
          ))}
        </section>

        {/* ── LINKS ── */}
        <section className="px-4 md:px-0 pb-12 flex flex-wrap gap-3">
          {[
            { href: '/world-cup-2026-live', label: '🔴 WC2026 Live Stream' },
            { href: '/world-cup-2026',      label: '🌍 WC2026 Hub' },
            { href: '/',                    label: '🏠 Home' },
            { href: '/channel/ar-bein-sport-uhd-1', label: '📡 beIN Sports UHD' },
            { href: '/channel/m6',          label: '🇫🇷 M6 Live' },
            { href: '/live',                label: '📺 All Channels' },
          ].map(({ href, label }) => (
            <Link key={href} href={href}
              className="card px-4 py-2 text-white/50 hover:text-white text-sm font-semibold hover:border-red-600/40 transition-all">
              {label}
            </Link>
          ))}
        </section>

      </div>
    </>
  );
}
