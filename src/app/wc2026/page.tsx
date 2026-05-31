import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 3600;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';

export const metadata: Metadata = {
  title: 'FIFA World Cup 2026 — All Matches Live Stream Free | SportaLive',
  description: 'Watch all FIFA World Cup 2026 matches live for free. Group stage schedule, live streams, lineups and predictions. USA, Canada, Mexico hosting — June 11 to July 19, 2026.',
  keywords: [
    'world cup 2026 matches','world cup 2026 live stream','fifa world cup 2026 schedule',
    'watch world cup 2026 free','mundial 2026 partidos','coupe du monde 2026 matchs',
    'كأس العالم 2026 مباريات','world cup 2026 group stage','fifa 2026 en vivo gratis',
    'world cup 2026 free online','coupe du monde 2026 streaming gratuit',
    'كأس العالم 2026 بث مباشر مجاني','mundial 2026 en vivo gratis',
    'wc2026 live','wc 2026 matches free',
  ].join(', '),
  alternates: { canonical: `${SITE}/wc2026` },
  openGraph: {
    title: '🌍 FIFA World Cup 2026 — All Matches Live Stream Free',
    description: 'All World Cup 2026 group stage matches with free live streams. Updated schedule with flags, times, and channels.',
    type: 'website',
  },
  robots: { index: true, follow: true },
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

        <p className="text-gray-700 text-xs leading-relaxed">
          world cup 2026 matches live stream · fifa world cup 2026 schedule · watch world cup free ·
          coupe du monde 2026 streaming gratuit · كأس العالم 2026 بث مباشر · mundial 2026 en vivo gratis ·
          copa do mundo 2026 ao vivo · wm 2026 live stream kostenlos · dünya kupası 2026 canlı izle
        </p>
      </div>
    </>
  );
}
