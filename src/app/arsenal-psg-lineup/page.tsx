import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 300;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sportalive.live';

export const metadata: Metadata = {
  title: 'Arsenal vs PSG Lineup — Predicted Starting 11 UCL Final 2026 | SportaLive',
  description: 'Arsenal vs PSG predicted lineup for the Champions League Final 2026 — 30 May 2026. Full starting 11, formations, key players. Composition probable Arsenal PSG finale. تشكيلة ارسنال باريس نهائي 2026. Arsenal PSG Aufstellung. Formazioni Arsenal PSG finale.',
  keywords: [
    'arsenal vs psg lineup','arsenal psg predicted lineup 2026','arsenal psg starting 11',
    'arsenal psg formation champions league final','arsenal psg line up tonight',
    'arsenal psg squad list ucl final','arsenal psg team news',
    // French
    'composition arsenal psg finale 2026','alignement arsenal psg finale champions',
    'equipe probable arsenal psg','formation arsenal psg ligue des champions finale',
    'compo arsenal psg finale 2026','arsenal psg 11 de départ',
    // Arabic
    'تشكيلة ارسنال باريس نهائي 2026','تشكيلة نهائي دوري أبطال أوروبا 2026',
    'تشكيلة ارسنال المتوقعة في النهائي','تشكيلة باريس سان جيرمان النهائي 2026',
    'من سيلعب في نهائي دوري الأبطال 2026',
    // Spanish
    'alineacion arsenal psg final champions 2026','once inicial arsenal psg',
    'arsenal psg once probable final','alineacion probable arsenal psg champions',
    // German
    'arsenal psg aufstellung finale 2026','arsenal psg startaufstellung champions league',
    // Italian / Portuguese
    'formazioni arsenal psg finale champions 2026','arsenal psg escalação final champions',
    // Turkish
    'arsenal psg ilk 11 şampiyonlar ligi finali',
  ].join(', '),
  alternates: { canonical: `${SITE}/arsenal-psg-lineup` },
  openGraph: {
    title: '📋 Arsenal vs PSG Predicted Lineup — UCL Final 30 May 2026',
    description: 'Full predicted starting XIs for Arsenal and PSG in the Champions League Final 2026.',
    type: 'website',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Arsenal vs PSG Predicted Lineup — UEFA Champions League Final 2026',
  description: 'Full predicted lineups and formations for Arsenal FC and Paris Saint-Germain in the UEFA Champions League Final 2026 on 30 May 2026.',
  datePublished: '2026-05-29',
  dateModified: '2026-05-30',
  author: { '@type': 'Organization', name: 'SportaLive', url: SITE },
  publisher: { '@type': 'Organization', name: 'SportaLive', url: SITE },
  about: {
    '@type': 'SportsEvent',
    name: 'UEFA Champions League Final 2026 — Arsenal vs PSG',
    startDate: '2026-05-30T20:00:00Z',
  },
};

const ARSENAL = [
  { pos: 'GK', name: 'David Raya',          nat: '🇪🇸' },
  { pos: 'RB', name: 'Ben White',           nat: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { pos: 'CB', name: 'William Saliba',      nat: '🇫🇷' },
  { pos: 'CB', name: 'Gabriel Magalhães',   nat: '🇧🇷' },
  { pos: 'LB', name: 'Jurriën Timber',      nat: '🇳🇱' },
  { pos: 'DM', name: 'Declan Rice',         nat: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { pos: 'CM', name: 'Martin Ødegaard ©',   nat: '🇳🇴' },
  { pos: 'CM', name: 'Kai Havertz',         nat: '🇩🇪' },
  { pos: 'RW', name: 'Bukayo Saka ⭐',       nat: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { pos: 'ST', name: 'Gabriel Jesus',       nat: '🇧🇷' },
  { pos: 'LW', name: 'Gabriel Martinelli',  nat: '🇧🇷' },
];

const PSG = [
  { pos: 'GK', name: 'Gianluigi Donnarumma', nat: '🇮🇹' },
  { pos: 'RB', name: 'Achraf Hakimi',        nat: '🇲🇦' },
  { pos: 'CB', name: 'Marquinhos ©',         nat: '🇧🇷' },
  { pos: 'CB', name: 'Willian Pacho',        nat: '🇪🇨' },
  { pos: 'LB', name: 'Nuno Mendes',          nat: '🇵🇹' },
  { pos: 'DM', name: 'Vitinha',              nat: '🇵🇹' },
  { pos: 'CM', name: 'Fabián Ruiz',          nat: '🇪🇸' },
  { pos: 'CM', name: 'João Neves',           nat: '🇵🇹' },
  { pos: 'RW', name: 'Ousmane Dembélé ⭐',   nat: '🇫🇷' },
  { pos: 'ST', name: 'Gonçalo Ramos',        nat: '🇵🇹' },
  { pos: 'LW', name: 'Bradley Barcola',      nat: '🇫🇷' },
];

function LineupCard({ team, color, players, formation }: {
  team: string; color: string; players: typeof ARSENAL; formation: string;
}) {
  const colorClass = color === 'red'
    ? { bg: 'bg-red-950/30', border: 'border-red-500/20', badge: 'text-red-400 bg-red-500/10', circle: 'from-red-600 to-red-900', emoji: '🔴' }
    : { bg: 'bg-blue-950/30', border: 'border-blue-500/20', badge: 'text-blue-400 bg-blue-500/10', circle: 'from-[#003B7C] to-[#001440]', emoji: '🔵' };

  return (
    <div className={`${colorClass.bg} border ${colorClass.border} rounded-2xl p-5 space-y-4`}>
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colorClass.circle} flex items-center justify-center text-2xl`}>{colorClass.emoji}</div>
        <div>
          <p className="text-white font-black uppercase tracking-wider text-lg">{team}</p>
          <p className={`${color === 'red' ? 'text-red-400' : 'text-blue-400'} text-xs font-bold`}>{formation} · Predicted XI</p>
        </div>
      </div>
      <div className="space-y-1">
        {players.map(({ pos, name, nat }) => (
          <div key={name} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
            <span className={`w-10 text-center text-[10px] font-black ${colorClass.badge} rounded px-1.5 py-0.5 flex-shrink-0`}>{pos}</span>
            <span className="text-gray-200 flex-1">{name}</span>
            <span className="text-base">{nat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ArsenalPsgLineupPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Hero */}
        <section className="text-center space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-xs font-bold uppercase tracking-wider">
            📋 Predicted Lineups
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Arsenal vs PSG{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8b87a] via-yellow-200 to-[#c8b87a]">
              Lineup
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg">
            Champions League Final 2026 · 30 May · 21:00 CET
          </p>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Full predicted starting XIs, formations and key players for the <strong className="text-white">UEFA Champions League Final 2026</strong>.
          </p>
          <Link
            href="/arsenal-vs-psg"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-black rounded-full uppercase tracking-wider text-sm transition-all shadow-lg shadow-red-900/40"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Watch Live Free
          </Link>
        </section>

        {/* Lineups */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <LineupCard team="Arsenal FC" color="red" players={ARSENAL} formation="4-3-3" />
          <LineupCard team="Paris Saint-Germain" color="blue" players={PSG} formation="4-3-3" />
        </section>

        {/* Key battles */}
        <section className="bg-gray-800/40 border border-white/5 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-bold text-xl">⚔️ Key Individual Battles</h2>
          <div className="space-y-3">
            {[
              { a: 'Bukayo Saka 🔴', b: 'Nuno Mendes 🔵', desc: 'England\'s best vs Portugal\'s flying left-back — the right flank showdown that could decide the final.' },
              { a: 'Ousmane Dembélé 🔵', b: 'Jurriën Timber 🔴', desc: 'France\'s explosive winger vs the Dutch pressing machine — who blinks first?' },
              { a: 'Declan Rice 🔴', b: 'Vitinha 🔵', desc: 'Battle for midfield control — Rice\'s power vs Vitinha\'s technical excellence.' },
              { a: 'Gabriel Magalhães 🔴', b: 'Gonçalo Ramos 🔵', desc: 'Brazilian defender vs Portuguese striker — the aerial duel that could swing the match.' },
            ].map(({ a, b, desc }) => (
              <div key={a} className="border-b border-white/5 pb-3 last:border-0">
                <p className="text-white font-semibold text-sm">
                  <span className="text-red-400">{a}</span>
                  <span className="text-gray-500 mx-2">vs</span>
                  <span className="text-blue-400">{b}</span>
                </p>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Multilingual lineup content */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-bold">📋 Arsenal vs PSG Lineup Tonight — UCL Final</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Arsenal manager Mikel Arteta is expected to field his strongest available XI.
              <strong className="text-white"> Bukayo Saka</strong> is the key attacking threat on the right,
              with <strong className="text-white">Declan Rice</strong> providing the defensive platform and
              <strong className="text-white"> Martin Ødegaard</strong> pulling the creative strings from midfield.
            </p>
            <p className="text-gray-600 text-xs">arsenal starting 11 ucl final · arsenal lineup tonight · arsenal formation 4-3-3</p>
          </div>

          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-bold">📋 Composition probable PSG — Finale Champions 2026</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Le PSG devrait aligner son 4-3-3 habituel avec
              <strong className="text-white"> Donnarumma</strong> dans les cages,
              <strong className="text-white"> Hakimi</strong> et <strong className="text-white">Nuno Mendes</strong> dans les couloirs,
              et <strong className="text-white"> Dembélé</strong> comme principale menace offensive.
              Composition probable : Donnarumma ; Hakimi, Marquinhos, Pacho, Nuno Mendes ; Vitinha, Ruiz, Neves ; Dembélé, Ramos, Barcola.
            </p>
            <p className="text-gray-600 text-xs">compo psg finale 2026 · alignement psg champions league · formation psg finale</p>
          </div>

          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2" dir="rtl">
            <h2 className="text-white font-bold">📋 تشكيلة ارسنال وباريس في نهائي دوري أبطال أوروبا 2026</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              من المتوقع أن يخوض <strong className="text-white">ارسنال</strong> المباراة بتشكيلة 4-3-3 تضم:
              رايا في الحراسة، بن وايت وساليبا وغابرييل وتيمبر في الدفاع،
              رايس وأوديغارد وهافرتز في الوسط، وساكا ومارتينيلي وجيسوس في الهجوم.
              كما يتوقع أن يلعب <strong className="text-white">باريس سان جيرمان</strong> بنظام 4-3-3:
              دونارومّا؛ حكيمي، ماركينيوس، باتشو، مينديش؛ فيتينيا، فابيان، نيفيش؛ دمبيلي، راموس، باركولا.
            </p>
            <p className="text-gray-600 text-xs">تشكيلة ارسنال المتوقعة النهائي · تشكيلة باريس سان جيرمان نهائي أبطال أوروبا</p>
          </div>

          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-bold">📋 Arsenal PSG Aufstellung — Champions League Finale 2026</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Voraussichtliche Arsenal Aufstellung (4-3-3): Raya; B. White, Saliba, Gabriel, Timber; Rice, Ødegaard, Havertz; Saka, Jesus, Martinelli.
              Voraussichtliche PSG Aufstellung (4-3-3): Donnarumma; Hakimi, Marquinhos, Pacho, N. Mendes; Vitinha, F. Ruiz, J. Neves; Dembélé, G. Ramos, Barcola.
            </p>
            <p className="text-gray-600 text-xs">arsenal psg aufstellung · champions league finale 2026 startelf</p>
          </div>
        </section>

        {/* Watch CTA */}
        <section className="bg-gradient-to-r from-red-900/20 via-gray-900/60 to-blue-900/20 border border-white/5 rounded-2xl p-6 text-center space-y-4">
          <p className="text-[#c8b87a] text-xs font-bold uppercase tracking-widest">Ready to Watch?</p>
          <h2 className="text-white font-extrabold text-2xl">Stream Arsenal vs PSG Free — 30 May · 21:00 CET</h2>
          <p className="text-gray-400 text-sm">La 1 · M6 · Canal+ Sport — HD · No subscription · No registration</p>
          <Link href="/arsenal-vs-psg"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-black rounded-full uppercase tracking-wider text-sm hover:scale-105 transition-all shadow-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            Watch Live Free Now
          </Link>
        </section>

        {/* Internal links */}
        <section className="flex flex-wrap gap-3 justify-center pb-4">
          {[
            { href: '/arsenal-vs-psg',              label: '🔴 Arsenal vs PSG Live'         },
            { href: '/arsenal-psg-prediction',      label: '🔮 Arsenal PSG Prediction'      },
            { href: '/champions-league-final-2026', label: '🏆 UCL Final 2026'              },
            { href: '/channel/m6',                  label: '📺 M6 En Direct'                },
            { href: '/channel/canal-sport',         label: '📺 Canal+ Sport'                },
            { href: '/channel/la-1',                label: '📺 La 1 En Directo'             },
          ].map(({ href, label }) => (
            <Link key={href} href={href}
              className="px-4 py-2 bg-gray-800/60 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/30 text-gray-400 hover:text-white text-sm rounded-xl transition-all">
              {label}
            </Link>
          ))}
        </section>

      </div>
    </>
  );
}
