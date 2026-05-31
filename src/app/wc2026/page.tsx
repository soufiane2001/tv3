import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 3600;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sportalive.live';

export const metadata: Metadata = {
  title: 'FIFA World Cup 2026 Live Stream Free — All Matches Schedule | SportaLive',
  description: 'Watch every FIFA World Cup 2026 match LIVE FREE in HD. Full group stage schedule, free streams on M6, beIN Sports and more. USA, Canada & Mexico — June 11 to July 19, 2026. No subscription needed. مباريات كأس العالم 2026 بث مباشر مجاناً.',
  keywords: [
    'world cup 2026 live stream free','fifa world cup 2026','watch world cup 2026 free',
    'world cup 2026 schedule','world cup 2026 group stage','wc2026 live stream',
    'world cup 2026 matches today','world cup 2026 tv channel free',
    'how to watch world cup 2026 free','world cup 2026 free online hd',
    'mundial 2026 en vivo gratis','mundial 2026 partidos',
    'coupe du monde 2026 streaming gratuit','coupe du monde 2026 matchs en direct',
    'كأس العالم 2026 بث مباشر مجاناً','مباريات كأس العالم 2026','كأس العالم 2026 جدول',
    'wm 2026 live stream kostenlos','world cup 2026 free stream no registration',
  ].join(', '),
  alternates: {
    canonical: `${SITE}/wc2026`,
    languages: {
      'en': `${SITE}/wc2026`,
      'fr': `${SITE}/wc2026`,
      'ar': `${SITE}/wc2026`,
      'x-default': `${SITE}/wc2026`,
    },
  },
  openGraph: {
    title: '🌍 FIFA World Cup 2026 — All Matches Live Stream Free',
    description: 'Watch every World Cup 2026 match free in HD. Full group stage schedule — M6, beIN Sports, no subscription.',
    type: 'website',
    url: `${SITE}/wc2026`,
    siteName: 'SportaLive',
  },
  twitter: {
    card: 'summary_large_image',
    title: '🌍 FIFA World Cup 2026 — All Matches Free Live Stream',
    description: 'Full WC2026 schedule + free HD streams — M6, beIN Sports. No registration.',
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'FIFA World Cup 2026 — All Match Live Stream Pages',
  description: 'Full list of FIFA World Cup 2026 group stage matches with free live stream links.',
  url: `${SITE}/wc2026`,
  numberOfItems: 12,
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
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where can I watch FIFA World Cup 2026 matches live for free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Watch all FIFA World Cup 2026 matches free in HD on SportaLive. We stream M6 (France), beIN Sports, and other broadcast channels live — no subscription, no registration needed. Just click the match and watch.' },
    },
    {
      '@type': 'Question',
      name: 'When does FIFA World Cup 2026 start?',
      acceptedAnswer: { '@type': 'Answer', text: 'FIFA World Cup 2026 starts on June 11, 2026 with the opening match Mexico vs South Africa at SoFi Stadium in Los Angeles. The final is on July 19, 2026.' },
    },
    {
      '@type': 'Question',
      name: 'Which countries host the 2026 World Cup?',
      acceptedAnswer: { '@type': 'Answer', text: 'The FIFA World Cup 2026 is co-hosted by three countries: the United States (USA), Canada, and Mexico. It is the first World Cup with 48 teams and 104 matches.' },
    },
    {
      '@type': 'Question',
      name: 'What TV channels broadcast World Cup 2026 for free?',
      acceptedAnswer: { '@type': 'Answer', text: 'World Cup 2026 is broadcast free on M6 (France), beIN Sports (MENA), and various national channels. SportaLive streams all these channels live in HD for free — no cable subscription required.' },
    },
    {
      '@type': 'Question',
      name: 'كيف أشاهد مباريات كأس العالم 2026 مجاناً؟',
      acceptedAnswer: { '@type': 'Answer', text: 'يمكنك مشاهدة جميع مباريات كأس العالم 2026 مجاناً وبجودة HD على موقع SportaLive. نقوم ببث قنوات beIN Sports وM6 وغيرها مباشرة — بدون اشتراك، بدون تسجيل. فقط اختر المباراة واضغط مشاهدة.' },
    },
    {
      '@type': 'Question',
      name: 'Comment regarder la Coupe du Monde 2026 gratuitement?',
      acceptedAnswer: { '@type': 'Answer', text: 'Regardez tous les matchs de la Coupe du Monde 2026 gratuitement en HD sur SportaLive. Nous retransmettons M6, beIN Sports et d\'autres chaînes en direct — sans abonnement, sans inscription.' },
    },
    {
      '@type': 'Question',
      name: 'How many teams are in the 2026 World Cup?',
      acceptedAnswer: { '@type': 'Answer', text: 'FIFA World Cup 2026 features 48 teams for the first time in history (expanded from 32). There are 12 groups of 4 teams, with 104 total matches played across the USA, Canada, and Mexico.' },
    },
  ],
};

const MATCHES = [
  {
    date: 'Thursday June 11',
    matches: [
      { slug: 'mexico-vs-south-africa-2026', home: 'Mexico', homeCode: 'mx', away: 'South Africa', awayCode: 'za', time: '21:00', group: 'B', venue: 'SoFi Stadium, LA' },
    ],
  },
  {
    date: 'Friday June 12',
    matches: [
      { slug: 'korea-vs-czechia-2026',  home: 'Korea', homeCode: 'kr',  away: 'Czechia', awayCode: 'cz', time: '19:00', group: 'C', venue: 'AT&T Stadium, Dallas' },
      { slug: 'canada-vs-bosnia-2026',  home: 'Canada', homeCode: 'ca', away: 'Bosnia', awayCode: 'ba', time: '22:00', group: 'D', venue: 'BC Place, Vancouver' },
    ],
  },
  {
    date: 'Saturday June 13',
    matches: [
      { slug: 'usa-vs-paraguay-2026',   home: 'USA',   homeCode: 'us', away: 'Paraguay', awayCode: 'py', time: '19:00', group: 'A', venue: 'MetLife Stadium, New York' },
      { slug: 'haiti-vs-scotland-2026', home: 'Haiti', homeCode: 'ht', away: 'Scotland', awayCode: 'gb-sct', time: '22:00', group: 'E', venue: 'NRG Stadium, Houston' },
    ],
  },
  {
    date: 'Sunday June 14',
    matches: [
      { slug: 'australia-vs-turkiye-2026', home: 'Australia', homeCode: 'au', away: 'Türkiye', awayCode: 'tr', time: '20:00', group: 'F', venue: 'Rose Bowl, LA' },
    ],
  },
  {
    date: 'Monday June 15',
    matches: [
      { slug: 'brazil-vs-morocco-2026',       home: 'Brazil',      homeCode: 'br', away: 'Morocco',     awayCode: 'ma', time: '19:00', group: 'G', venue: 'MetLife Stadium, New York' },
      { slug: 'qatar-vs-switzerland-2026',     home: 'Qatar',       homeCode: 'qa', away: 'Switzerland', awayCode: 'ch', time: '19:00', group: 'H', venue: 'Estadio Azteca, Mexico City' },
      { slug: 'ivory-coast-vs-ecuador-2026',   home: 'Ivory Coast', homeCode: 'ci', away: 'Ecuador',     awayCode: 'ec', time: '22:00', group: 'I', vendor: 'Levi\'s Stadium, San Francisco' },
      { slug: 'germany-vs-curacao-2026',        home: 'Germany',     homeCode: 'de', away: 'Curaçao',     awayCode: 'cw', time: '22:00', group: 'J', venue: 'AT&T Stadium, Dallas' },
    ],
  },
  {
    date: 'Tuesday June 16',
    matches: [
      { slug: 'netherlands-vs-japan-2026', home: 'Netherlands', homeCode: 'nl', away: 'Japan',   awayCode: 'jp', time: '19:00', group: 'K', venue: 'Gillette Stadium, Boston' },
      { slug: 'sweden-vs-tunisia-2026',    home: 'Sweden',      homeCode: 'se', away: 'Tunisia', awayCode: 'tn', time: '22:00', group: 'L', venue: 'Arrowhead Stadium, Kansas City' },
    ],
  },
];

function Flag({ code, name }: { code: string; name: string }) {
  return (
    <img
      src={`https://flagcdn.com/w80/${code}.png`}
      alt={name}
      width={40}
      height={27}
      className="w-10 h-auto rounded object-cover shadow"
    />
  );
}

export default function WC2026Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-4xl mx-auto space-y-8">

        {/* Hero */}
        <section
          className="relative rounded-2xl overflow-hidden border border-white/5 p-6 md:p-10 text-center"
          style={{ background: 'linear-gradient(135deg,#0a2010 0%,#111827 45%,#0a1020 100%)' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.08),transparent_60%)]" />
          <div className="relative space-y-3">
            <p className="text-green-400 text-xs font-bold uppercase tracking-widest">🌍 FIFA World Cup 2026</p>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
              All Matches — <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Watch Free Live</span>
            </h1>
            <p className="text-gray-400 text-sm">USA · Canada · Mexico &mdash; June 11 – July 19, 2026 · 48 teams · 104 matches</p>
            <div className="flex flex-wrap justify-center gap-3 pt-2 text-xs">
              {['📺 M6 Free','📡 beIN Sport 1','🔓 No subscription','🌐 HD stream'].map(t => (
                <span key={t} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule by day */}
        <section className="space-y-6">
          <h2 className="text-white font-bold text-xl">Group Stage Schedule</h2>

          {MATCHES.map(({ date, matches }) => (
            <div key={date}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-green-400 font-bold text-sm">{date}</span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              <div className="grid gap-3">
                {matches.map(m => (
                  <Link
                    key={m.slug}
                    href={`/${m.slug}`}
                    className="flex items-center gap-4 p-4 bg-gray-800/50 hover:bg-gray-700/60 border border-white/5 hover:border-green-500/30 rounded-2xl transition-all group"
                  >
                    {/* Group badge */}
                    <span className="hidden sm:flex w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold items-center justify-center flex-shrink-0">
                      {m.group}
                    </span>

                    {/* Teams */}
                    <div className="flex-1 flex items-center gap-3 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <Flag code={m.homeCode} name={m.home} />
                        <span className="text-white font-semibold text-sm truncate">{m.home}</span>
                      </div>
                      <span className="text-gray-500 text-xs font-bold flex-shrink-0">VS</span>
                      <div className="flex items-center gap-2 min-w-0">
                        <Flag code={m.awayCode} name={m.away} />
                        <span className="text-white font-semibold text-sm truncate">{m.away}</span>
                      </div>
                    </div>

                    {/* Time + CTA */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right hidden sm:block">
                        <p className="text-white text-sm font-bold">{m.time}</p>
                        <p className="text-gray-500 text-xs">{'venue' in m ? m.venue : ''}</p>
                      </div>
                      <span className="flex items-center gap-1 px-3 py-1.5 bg-green-600/20 border border-green-500/30 text-green-400 group-hover:bg-green-600 group-hover:text-white text-xs font-bold rounded-full transition-all whitespace-nowrap">
                        ▶ Watch
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Multilingual SEO block */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-800/30 border border-white/5 rounded-xl p-4 space-y-1">
            <p className="text-white font-semibold">🇬🇧 World Cup 2026</p>
            <p className="text-gray-400">Watch all FIFA World Cup 2026 matches live free in HD — M6, beIN Sports, no subscription needed.</p>
          </div>
          <div className="bg-gray-800/30 border border-white/5 rounded-xl p-4 space-y-1" dir="rtl">
            <p className="text-white font-semibold">🇸🇦 كأس العالم 2026</p>
            <p className="text-gray-400">شاهد جميع مباريات كأس العالم 2026 مجاناً بث مباشر HD — beIN Sports وM6 بدون اشتراك.</p>
          </div>
          <div className="bg-gray-800/30 border border-white/5 rounded-xl p-4 space-y-1">
            <p className="text-white font-semibold">🇪🇸 Mundial 2026</p>
            <p className="text-gray-400">Mira todos los partidos del Mundial 2026 gratis en directo HD — M6, beIN Sports, sin suscripción.</p>
          </div>
          <div className="bg-gray-800/30 border border-white/5 rounded-xl p-4 space-y-1">
            <p className="text-white font-semibold">🇵🇹 Copa do Mundo 2026</p>
            <p className="text-gray-400">Assista todos os jogos da Copa do Mundo 2026 ao vivo grátis em HD — M6, beIN Sports, sem assinatura.</p>
          </div>
        </section>

        {/* Navigation links */}
        <section className="flex flex-wrap gap-3">
          {[
            { href: '/arsenal-vs-psg',              label: '🏆 UCL Final Live' },
            { href: '/world-cup-2026',              label: '🌍 WC2026 Hub' },
            { href: '/live',                        label: '📡 All Live Channels' },
            { href: '/channel/ar-bein-sport-uhd-1', label: 'beIN Sports UHD' },
            { href: '/channel/m6',                  label: 'M6 Live' },
          ].map(({ href, label }) => (
            <Link key={href} href={href}
              className="px-4 py-2 bg-gray-800/60 hover:bg-green-600/20 border border-white/10 hover:border-green-500/30 text-gray-400 hover:text-white text-sm rounded-xl transition-all">
              {label}
            </Link>
          ))}
        </section>

        {/* ── About section ── */}
        <section className="bg-gray-900/40 border border-white/5 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-bold text-lg">FIFA World Cup 2026 — Free Live Stream Guide</h2>
          <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
            <p>
              <strong className="text-white">FIFA World Cup 2026</strong> is the biggest football tournament in history, featuring <strong className="text-white">48 nations</strong> for the first time across <strong className="text-white">104 matches</strong> hosted in the <strong className="text-green-400">USA, Canada and Mexico</strong> from <strong className="text-white">June 11 to July 19, 2026</strong>.
              Watch every single match <strong className="text-white">live free in HD on SportaLive</strong> — no subscription, no account needed.
            </p>
            <p>
              All group stage matches are available via free-to-air broadcast channels including <strong className="text-white">M6</strong> (France), <strong className="text-white">beIN Sports</strong> (Middle East & North Africa), national public broadcasters, and more.
              Click any match above to go to its dedicated live stream page.
            </p>
            <div dir="rtl" className="border-r-2 border-green-500/30 pr-4">
              <p>
                <strong className="text-white">كأس العالم FIFA 2026</strong> — أكبر بطولة كروية في التاريخ. 48 منتخباً، 104 مباراة، تستضيفها <strong className="text-white">الولايات المتحدة وكندا والمكسيك</strong> من 11 يونيو حتى 19 يوليو 2026.
                شاهد جميع المباريات <strong className="text-white">مجاناً وبجودة HD على SportaLive</strong> — بث مباشر عبر beIN Sports وM6 وغيرها، بدون اشتراك ولا تسجيل.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="space-y-2">
          <h2 className="text-white font-bold text-lg mb-3">❓ Frequently Asked Questions</h2>
          {faqJsonLd.mainEntity.map((item: any, i: number) => (
            <details key={i} className="bg-gray-800/40 border border-white/5 rounded-xl p-3 group cursor-pointer">
              <summary className="text-white text-sm font-medium list-none flex justify-between items-center gap-2">
                <span>{item.name}</span>
                <span className="text-green-400 text-lg flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-gray-400 text-xs mt-2 leading-relaxed">{item.acceptedAnswer.text}</p>
            </details>
          ))}
        </section>

        <p className="text-gray-700 text-[11px] leading-relaxed">
          world cup 2026 live stream free · fifa world cup 2026 schedule · watch world cup 2026 free online ·
          world cup 2026 group stage matches · كأس العالم 2026 بث مباشر مجاناً · مباريات كأس العالم 2026 ·
          coupe du monde 2026 streaming gratuit · mundial 2026 en vivo gratis ·
          wm 2026 live stream kostenlos · copa do mundo 2026 ao vivo grátis
        </p>
      </div>
    </>
  );
}
