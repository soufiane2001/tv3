import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Champions League Final 2026 Live Stream — Arsenal vs PSG Free Online',
  description: 'Watch the UEFA Champions League Final 2026 live for free. Arsenal vs PSG streaming HD — La 1 en directo. Finale Ligue des Champions en direct. نهائي دوري أبطال أوروبا 2026 بث مباشر مجاني.',
  keywords: [
    'champions league final 2026','ucl final 2026 live stream','arsenal vs psg',
    'arsenal psg live free','watch ucl final online','champions league final live',
    'finale champions league 2026','ligue des champions finale streaming',
    'نهائي دوري أبطال أوروبا 2026','champions league final en directo 2026',
    'arsenal psg 2026','ucl final watch free','champions league 2026 final stream',
  ].join(', '),
  openGraph: {
    title: '🏆 Champions League Final 2026 — Arsenal vs PSG Live',
    description: 'Free HD live stream — UEFA Champions League Final 2026. Arsenal vs PSG.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: '🏆 UCL Final 2026 LIVE — Arsenal vs PSG' },
  robots: { index: true, follow: true },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/champions-league-final-2026` },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'UEFA Champions League Final 2026',
  startDate: '2026-05-27T20:00:00Z',
  description: 'The UEFA Champions League Final 2026 between Arsenal FC and Paris Saint-Germain.',
  sport: 'Football',
  url: `${process.env.NEXT_PUBLIC_SITE_URL}/champions-league-final-2026`,
  competitor: [
    { '@type': 'SportsTeam', name: 'Arsenal FC' },
    { '@type': 'SportsTeam', name: 'Paris Saint-Germain' },
  ],
  organizer: { '@type': 'Organization', name: 'UEFA' },
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
  ],
};

const STREAMS = [
  { label: '🔴 Arsenal vs PSG — La 1 Live',    href: '/arsenal-vs-psg',       badge: 'LIVE', hot: true },
  { label: '📺 La 1 En Directo',                href: '/channel/la-1',          badge: 'HD'  },
  { label: '⚽ All Sports Channels',            href: '/category/deportivos',   badge: ''    },
  { label: '📡 All Live Channels',              href: '/live',                  badge: ''    },
];

export default function UclFinalPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-4xl mx-auto space-y-10">

        {/* Hero */}
        <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-900/30 via-gray-900 to-purple-900/30 border border-yellow-500/20 p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.08),transparent_70%)]" />
          <div className="relative">
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">
              Champions League Final 2026
            </h1>
            <p className="text-yellow-400 text-xl font-bold mb-2">Arsenal FC vs Paris Saint-Germain</p>
            <p className="text-gray-400 mb-6">27 May 2026 · UEFA Champions League Final · Live Stream Free HD</p>

            <Link
              href="/arsenal-vs-psg"
              className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl text-lg shadow-2xl shadow-red-900/50 transition-all hover:scale-105 animate-pulse"
            >
              <span className="w-3 h-3 rounded-full bg-white inline-block" />
              Watch Live Now — FREE
            </Link>
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
