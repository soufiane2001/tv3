import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 300;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sportalive.live';

export const metadata: Metadata = {
  title: 'Arsenal vs PSG Prediction & Preview — UCL Final 2026 | SportaLive',
  description: 'Arsenal vs PSG prediction, match preview and analysis — UEFA Champions League Final 2026, 30 May 2026. Who will win? Pronostic Arsenal PSG finale. توقعات ارسنال باريس نهائي. Arsenal PSG Prognose. Pronostico finale Champions 2026.',
  keywords: [
    'arsenal vs psg prediction','arsenal psg match preview 2026',
    'arsenal psg who will win','arsenal vs psg champions league final analysis',
    'arsenal psg odds final 2026','ucl final 2026 prediction',
    'arsenal psg bet prediction','champions league final 2026 preview',
    // French
    'pronostic arsenal psg finale 2026','pronostic finale champions league 2026',
    'arsenal psg prono ligue des champions','qui va gagner arsenal psg finale',
    'analyse arsenal psg finale 2026','prediction arsenal psg 30 mai',
    // Arabic
    'توقعات مباراة ارسنال باريس نهائي 2026','من سيفوز نهائي دوري الأبطال 2026',
    'تحليل مباراة ارسنال باريس','توقعات نتيجة نهائي أبطال أوروبا 2026',
    'من الافضل ارسنال ام باريس','نهائي 2026 من سيفوز',
    // Spanish
    'pronostico arsenal psg final champions 2026','quien ganara final champions 2026',
    'arsenal psg prediccion final','analisis arsenal psg champions league final',
    // German
    'arsenal psg prognose finale 2026','arsenal psg tipps champions league finale',
    'wer gewinnt champions league finale 2026',
    // Italian
    'pronostico arsenal psg finale champions 2026','chi vincera finale champions 2026',
    // Portuguese / Turkish
    'previsao arsenal psg final champions','arsenal psg tahmin şampiyonlar ligi finali',
  ].join(', '),
  alternates: { canonical: `${SITE}/arsenal-psg-prediction` },
  openGraph: {
    title: '🔮 Arsenal vs PSG Prediction — UCL Final 2026 | Who Will Win?',
    description: 'Expert prediction, match preview and analysis for the Champions League Final 2026 — Arsenal vs PSG, 30 May.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Arsenal vs PSG Prediction — UEFA Champions League Final 2026',
  description: 'Match preview, analysis and prediction for Arsenal FC vs Paris Saint-Germain in the UEFA Champions League Final 2026 on 30 May 2026.',
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

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who will win Arsenal vs PSG Champions League Final 2026?',
      acceptedAnswer: { '@type': 'Answer', text: 'Arsenal enter the 2026 UCL Final as slight favourites with their solid defensive structure and the electric Bukayo Saka. PSG have the individual quality to cause problems. Our prediction: Arsenal 1-0 PSG — a hard-fought final settled by a single goal.' },
    },
    {
      '@type': 'Question',
      name: 'Qui va gagner la finale Arsenal PSG 2026 ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Arsenal sont légèrement favoris avec leur solidité défensive et Saka. Notre pronostic : Arsenal 1-0 PSG. Un match serré qui se décide sur un seul but.' },
    },
    {
      '@type': 'Question',
      name: 'من سيفوز في نهائي ارسنال باريس سان جيرمان 2026؟',
      acceptedAnswer: { '@type': 'Answer', text: 'ارسنال أقل حظاً في الهجوم لكن أكثر تنظيماً دفاعياً. توقعنا: ارسنال 1-0 باريس سان جيرمان في مباراة متكافئة يحسمها هدف وحيد.' },
    },
    {
      '@type': 'Question',
      name: '¿Quién ganará la final Arsenal vs PSG Champions 2026?',
      acceptedAnswer: { '@type': 'Answer', text: 'Arsenal entra como ligero favorito gracias a su solidez defensiva y la amenaza de Saka. Nuestro pronóstico: Arsenal 1-0 PSG — una final reñida decidida por un solo gol.' },
    },
  ],
};

export default function ArsenalPsgPredictionPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Hero */}
        <section className="text-center space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-xs font-bold uppercase tracking-wider">
            🔮 Match Preview & Prediction
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Arsenal vs PSG{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400">
              Prediction
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg">
            Champions League Final 2026 · 30 May · 21:00 CET
          </p>
          <Link
            href="/arsenal-vs-psg"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-black rounded-full uppercase tracking-wider text-sm transition-all shadow-lg shadow-red-900/40"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Watch Live Free
          </Link>
        </section>

        {/* Our Prediction Highlight */}
        <section className="relative rounded-2xl overflow-hidden border border-purple-500/20 p-6 text-center space-y-3"
          style={{ background: 'linear-gradient(135deg, #1a0533 0%, #0d1442 50%, #1a0533 100%)' }}>
          <p className="text-purple-400 text-xs font-bold uppercase tracking-widest">Our Prediction</p>
          <div className="flex items-center justify-center gap-6 md:gap-16">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-3xl mx-auto mb-2">🔴</div>
              <p className="text-white font-black uppercase">Arsenal</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-black text-white">1 — 0</p>
              <p className="text-gray-500 text-xs mt-1">After 90 min</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#003B7C] to-[#001440] flex items-center justify-center text-3xl mx-auto mb-2">🔵</div>
              <p className="text-white font-black uppercase">PSG</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Arsenal's defensive organisation and Saka's match-winning quality edge a tight final. PSG will threaten but struggle to break a well-drilled Arteta defence.
          </p>
        </section>

        {/* Team Form & Analysis */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔴</span>
              <h2 className="text-white font-bold text-lg">Arsenal — Strengths</h2>
            </div>
            <ul className="space-y-2">
              {[
                '🛡️ Best defensive record in the UCL this season',
                '⚡ Bukayo Saka — impossible to contain, direct threat every game',
                '🧱 Declan Rice — elite defensive midfielder, protects back four',
                '🎯 William Saliba — composed, dominant in the air',
                '🔁 Collective pressing — exhausts opponents in high areas',
                '🧠 Mikel Arteta — tactically the best English manager in years',
              ].map(s => <li key={s} className="text-gray-400 text-sm">{s}</li>)}
            </ul>
          </div>

          <div className="bg-blue-950/20 border border-blue-500/20 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔵</span>
              <h2 className="text-white font-bold text-lg">PSG — Strengths</h2>
            </div>
            <ul className="space-y-2">
              {[
                '🥇 Ousmane Dembélé — UCL final pedigree, unpredictable wing play',
                '🧤 Donnarumma — world-class goalkeeper, saves points in finals',
                '🦅 Hakimi — best attacking right-back in world football',
                '🇧🇷 Marquinhos — elite reading of the game, immense in the air',
                '🔀 Bradley Barcola — explosive pace on the left, direct threat',
                '🌍 Squad depth — world-class options from the bench',
              ].map(s => <li key={s} className="text-gray-400 text-sm">{s}</li>)}
            </ul>
          </div>
        </section>

        {/* Stats & Match Facts */}
        <section className="bg-gray-800/40 border border-white/5 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-bold text-xl">📊 Match Facts & Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Date', value: '30 May 2026' },
              { label: 'Kick-off', value: '21:00 CET' },
              { label: 'Competition', value: 'UCL Final' },
              { label: 'Stage', value: 'Final' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-gray-500 text-xs uppercase tracking-wider">{label}</p>
                <p className="text-white font-bold text-sm mt-1">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
            {[
              { title: 'Arsenal UCL Route', items: ['Qualified top of group','Knockouts: dominant defensive displays','Saka in form — 8 UCL G+A this season'] },
              { title: 'PSG UCL Route',     items: ['Qualified with 100% home record','Knockouts: clinical finishing','Dembélé — 6 UCL goals this season'] },
              { title: 'Key to the Final',  items: ['Midfield battle: Rice vs Vitinha','Saka vs Nuno Mendes on right wing','Set pieces — both teams dangerous'] },
            ].map(({ title, items }) => (
              <div key={title} className="bg-white/5 rounded-xl p-4 space-y-2">
                <p className="text-white font-semibold text-sm">{title}</p>
                <ul className="space-y-1">
                  {items.map(i => <li key={i} className="text-gray-400 text-xs">• {i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Multilingual preview content */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-bold">🔮 Arsenal vs PSG Prediction — Champions League Final 2026</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Our prediction for the UCL Final 2026 is <strong className="text-white">Arsenal 1-0 PSG</strong>.
              Arsenal have the best defensive record in this season's competition and Bukayo Saka is in the form of his career.
              PSG will create chances through Dembélé and Barcola, but Donnarumma may well be their man of the match even in defeat.
              A tight, tactical final — decided by a set piece or a moment of Saka magic.
            </p>
            <p className="text-gray-600 text-xs">arsenal vs psg prediction 2026 · ucl final who wins · champions league final preview</p>
          </div>

          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-bold">🔮 Pronostic Arsenal vs PSG — Finale Champions 2026</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Notre pronostic pour la finale de la Ligue des Champions 2026 : <strong className="text-white">Arsenal 1-0 PSG</strong>.
              Arsenal dispose de la meilleure défense de la compétition et Saka est intenable.
              Le PSG peut créer des occasions grâce à Dembélé et Barcola, mais aura du mal à percer le bloc d'Arteta.
              Un final tactique et serré — décidé sur un corner ou un éclair de génie de Saka.
            </p>
            <p className="text-gray-600 text-xs">pronostic arsenal psg finale · arsenal psg 30 mai prono · qui gagne champions league 2026</p>
          </div>

          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2" dir="rtl">
            <h2 className="text-white font-bold">🔮 توقعات مباراة ارسنال ضد باريس سان جيرمان — نهائي 2026</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              توقعنا لنهائي دوري أبطال أوروبا 2026: <strong className="text-white">ارسنال 1-0 باريس سان جيرمان</strong>.
              يمتلك ارسنال أقوى دفاع في البطولة هذا الموسم، وبوكايو ساكا في أفضل حالاته.
              سيسعى باريس للهجوم عبر دمبيلي وباركولا، لكنه سيجد صعوبة في اختراق منظومة أرتيتا الدفاعية المحكمة.
              مباراة تكتيكية متوازنة — قد تحسمها ضربة ثابتة أو لحظة إبداع من ساكا.
            </p>
            <p className="text-gray-600 text-xs">توقعات نهائي أبطال أوروبا 2026 · من سيفوز ارسنال باريس · تحليل نهائي UCL</p>
          </div>

          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-bold">🔮 Pronóstico Arsenal vs PSG — Final Champions 2026</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Nuestro pronóstico para la Final de la Champions 2026: <strong className="text-white">Arsenal 1-0 PSG</strong>.
              Arsenal tiene la mejor defensa de la competición este año y Bukayo Saka está en el mejor momento de su carrera.
              PSG intentará crear peligro con Dembélé y Barcola, pero les costará romper el bloque de Arteta.
              Una final táctica y apretada — decidida por un balón parado o un momento de magia de Saka.
            </p>
            <p className="text-gray-600 text-xs">pronostico arsenal psg final 2026 · quien gana la champions 2026 · analisis arsenal psg</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">FAQ — Arsenal vs PSG Prediction 2026</h2>
          {faqJsonLd.mainEntity.map((q: any, i: number) => (
            <details key={i} className="bg-gray-800/40 border border-white/5 rounded-xl p-4 cursor-pointer group" open={i === 0}>
              <summary className="text-white font-semibold text-sm list-none flex justify-between items-center gap-3">
                {q.name}
                <span className="text-purple-400 text-lg group-open:rotate-45 transition-transform flex-shrink-0">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{q.acceptedAnswer.text}</p>
            </details>
          ))}
        </section>

        {/* Watch CTA */}
        <section className="bg-gradient-to-r from-red-900/20 via-gray-900/60 to-blue-900/20 border border-white/5 rounded-2xl p-6 text-center space-y-4">
          <h2 className="text-white font-extrabold text-2xl">Watch Arsenal vs PSG Live — Free HD Stream</h2>
          <p className="text-gray-400 text-sm">30 May 2026 · 21:00 CET · La 1 · M6 · Canal+ Sport — No subscription needed</p>
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
            { href: '/arsenal-psg-lineup',          label: '📋 Arsenal PSG Lineup'          },
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
