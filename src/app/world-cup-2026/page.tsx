import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'World Cup 2026 Live Stream — Watch FIFA World Cup Free Online',
  description: 'Watch FIFA World Cup 2026 live for free. USA, Canada, Mexico hosting. Stream all World Cup 2026 matches online in HD — no subscription needed. Coupe du Monde 2026 en direct. كأس العالم 2026 بث مباشر.',
  keywords: [
    'world cup 2026 live stream','fifa world cup 2026','watch world cup 2026 free',
    'world cup 2026 stream','world cup 2026 online free','mundial 2026 en vivo',
    'coupe du monde 2026 streaming','كأس العالم 2026 بث مباشر','world cup 2026 schedule',
    'world cup 2026 matches','world cup 2026 usa canada mexico','world cup live stream free 2026',
    'watch world cup 2026 online','world cup 2026 tv channel','fifa 2026 live',
  ].join(', '),
  openGraph: {
    title: '🌍 FIFA World Cup 2026 — Live Stream Free',
    description: 'Watch all World Cup 2026 matches live online. USA · Canada · Mexico hosting.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: '🌍 World Cup 2026 Live Stream — Watch Free' },
  robots: { index: true, follow: true },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/world-cup-2026` },
};

const worldCupJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026',
  startDate: '2026-06-11',
  endDate:   '2026-07-19',
  description: 'The 2026 FIFA World Cup hosted by USA, Canada and Mexico. 48 teams, 104 matches.',
  sport: 'Football',
  url: `${process.env.NEXT_PUBLIC_SITE_URL}/world-cup-2026`,
  location: {
    '@type': 'Country',
    name: 'United States, Canada, Mexico',
  },
  organizer: { '@type': 'Organization', name: 'FIFA', url: 'https://www.fifa.com' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'When is the FIFA World Cup 2026?', acceptedAnswer: { '@type': 'Answer', text: 'The FIFA World Cup 2026 takes place from June 11 to July 19, 2026, hosted by USA, Canada, and Mexico.' } },
    { '@type': 'Question', name: 'Where to watch World Cup 2026 for free?', acceptedAnswer: { '@type': 'Answer', text: 'Watch all World Cup 2026 matches free on SportaLive. Live HD streams available from major broadcasting channels.' } },
    { '@type': 'Question', name: 'Où regarder la Coupe du Monde 2026 gratuitement?', acceptedAnswer: { '@type': 'Answer', text: 'Regardez la Coupe du Monde 2026 gratuitement sur SportaLive en streaming HD direct.' } },
    { '@type': 'Question', name: 'كيف أشاهد كأس العالم 2026 مجاناً؟', acceptedAnswer: { '@type': 'Answer', text: 'شاهد جميع مباريات كأس العالم 2026 مجاناً على منصة SportaLive بث مباشر عالي الجودة.' } },
    { '@type': 'Question', name: '¿Dónde ver el Mundial 2026 gratis?', acceptedAnswer: { '@type': 'Answer', text: 'Mira todos los partidos del Mundial 2026 gratis en SportaLive en HD en directo.' } },
  ],
};

async function getSportsChannels() {
  try {
    return await prisma.channel.findMany({
      where: {
        isActive: true,
        OR: [
          { groupTitle: { contains: 'Sport' } },
          { groupTitle: { contains: 'Deport' } },
          { groupTitle: { contains: 'SPORT' } },
          { name: { contains: 'Sport' } },
          { name: { contains: 'beIN' } },
          { name: { contains: 'ESPN' } },
          { name: { contains: 'FOX' } },
        ],
      },
      take: 12,
      orderBy: { order: 'asc' },
    });
  } catch { return []; }
}

export default async function WorldCup2026Page() {
  const sports = await getSportsChannels();

  return (
    <>
      <JsonLd data={worldCupJsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-5xl mx-auto space-y-10">

        {/* Hero */}
        <section className="relative rounded-2xl overflow-hidden border border-white/5 p-8 md:p-12 text-center"
          style={{ background: 'linear-gradient(135deg, #1a3a1a 0%, #111827 40%, #1a1a3a 100%)' }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.1),transparent_60%)]" />
          <div className="relative">
            <p className="text-green-400 font-semibold text-sm mb-3 uppercase tracking-wider">🌍 FIFA World Cup 2026</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3">
              World Cup 2026<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Live Stream Free
              </span>
            </h1>
            <p className="text-gray-400 text-lg mb-2">USA · Canada · Mexico — June 11 – July 19, 2026</p>
            <p className="text-gray-500 text-sm mb-8">48 teams · 104 matches · Watch all games free online in HD</p>

            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/live" className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-900/40 transition-colors">
                📡 Watch Now — Live TV
              </Link>
              <Link href="/arsenal-vs-psg" className="px-6 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 hover:text-white font-bold rounded-xl transition-all">
                🏆 UCL Final Tonight
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8 pt-8 border-t border-white/10">
              {[['48', 'Teams'], ['104', 'Matches'], ['3', 'Host Nations'], ['16', 'Venues']].map(([n, l]) => (
                <div key={l}>
                  <p className="text-2xl font-black text-white">{n}</p>
                  <p className="text-gray-500 text-xs">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Multilingual content */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <KeywordBlock
            flag="🇬🇧"
            title="FIFA World Cup 2026 Live Stream"
            body="Watch all 2026 FIFA World Cup matches live online for free in HD. The World Cup 2026 is hosted by USA, Canada, and Mexico with 48 teams competing in 104 matches. Free streaming — no subscription required."
            tags="world cup 2026 live · fifa 2026 stream · watch world cup free"
          />
          <KeywordBlock
            flag="🇫🇷"
            title="Coupe du Monde 2026 — Streaming Gratuit"
            body="Regardez tous les matchs de la Coupe du Monde 2026 en direct gratuitement. 48 équipes, 104 matchs, organisée aux USA, Canada et Mexique. Streaming HD sans abonnement."
            tags="coupe du monde 2026 · streaming gratuit · mondial 2026 en direct"
          />
          <KeywordBlock
            flag="🇸🇦"
            title="كأس العالم 2026 — بث مباشر مجاني"
            body="شاهد جميع مباريات كأس العالم 2026 مباشرة ومجاناً بجودة HD. البطولة تستضيفها الولايات المتحدة وكندا والمكسيك. 48 منتخباً و104 مباراة. بدون اشتراك."
            tags="كأس العالم 2026 · بث مباشر · مجاني"
            rtl
          />
          <KeywordBlock
            flag="🇪🇸"
            title="Mundial 2026 en Vivo Gratis"
            body="Mira todos los partidos del Mundial 2026 en directo y gratis en HD. USA, Canadá y México como anfitriones. 48 selecciones, 104 partidos. Sin suscripción."
            tags="mundial 2026 en directo · ver mundial gratis · copa del mundo 2026"
          />
        </section>

        {/* Sports channels */}
        {sports.length > 0 && (
          <section>
            <h2 className="text-white font-bold text-xl mb-4">Sports Channels — World Cup 2026</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {sports.map(ch => (
                <Link
                  key={ch.id}
                  href={`/channel/${ch.slug}`}
                  className="flex items-center gap-2 p-3 bg-gray-800/60 hover:bg-gray-700/60 border border-white/5 hover:border-green-500/30 rounded-xl transition-all group"
                >
                  {ch.logo && (
                    <img src={ch.logo} alt={ch.name} className="w-8 h-8 object-contain rounded flex-shrink-0"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  )}
                  <span className="text-xs text-gray-400 group-hover:text-white truncate transition-colors">{ch.name}</span>
                </Link>
              ))}
            </div>
            <div className="mt-3 text-center">
              <Link href="/live" className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                View all {sports.length}+ sports channels →
              </Link>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">World Cup 2026 — FAQ</h2>
          {faqJsonLd.mainEntity.map((q: any, i: number) => (
            <details key={i} className="bg-gray-800/60 border border-white/5 rounded-xl p-4 group" open={i < 2}>
              <summary className="text-white font-medium cursor-pointer list-none flex justify-between items-center">
                {q.name}
                <span className="text-gray-500 group-open:rotate-180 transition-transform ml-2 flex-shrink-0">▾</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3">{q.acceptedAnswer.text}</p>
            </details>
          ))}
        </section>

        {/* Internal links */}
        <section className="flex flex-wrap gap-3">
          <Link href="/arsenal-vs-psg"            className="px-4 py-2 bg-red-600/20 border border-red-500/30 text-red-400 hover:text-white rounded-xl text-sm transition-colors">🏆 UCL Final Live</Link>
          <Link href="/champions-league-final-2026" className="px-4 py-2 bg-gray-800/60 border border-white/10 text-gray-400 hover:text-white rounded-xl text-sm transition-colors">Champions League 2026</Link>
          <Link href="/channel/la-1"              className="px-4 py-2 bg-gray-800/60 border border-white/10 text-gray-400 hover:text-white rounded-xl text-sm transition-colors">La 1 Live</Link>
          <Link href="/live"                      className="px-4 py-2 bg-gray-800/60 border border-white/10 text-gray-400 hover:text-white rounded-xl text-sm transition-colors">All Live Channels</Link>
          <Link href="/category/deportivos"       className="px-4 py-2 bg-gray-800/60 border border-white/10 text-gray-400 hover:text-white rounded-xl text-sm transition-colors">Sports Channels</Link>
        </section>
      </div>
    </>
  );
}

function KeywordBlock({ flag, title, body, tags, rtl }: { flag: string; title: string; body: string; tags: string; rtl?: boolean }) {
  return (
    <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2" dir={rtl ? 'rtl' : 'ltr'}>
      <h2 className="text-white font-bold">{flag} {title}</h2>
      <p className="text-gray-400 text-sm">{body}</p>
      <p className="text-gray-600 text-xs">{tags}</p>
    </div>
  );
}
