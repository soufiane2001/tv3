import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import WatchEventClient from './WatchEventClient';
import AdBanner from '@/components/ads/AdBanner';

export const revalidate = 300;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';

const TITLE = 'Arsenal vs PSG LIVE — Champions League Final 2026 Free HD Stream | La 1 En Directo';
const DESC  = 'Watch Arsenal vs Paris Saint-Germain LIVE FREE — UEFA Champions League Final 2026 on La 1. HD stream, no subscription, no registration. Arsenal PSG en vivo gratis · Arsenal contre PSG en direct gratuit · ارسنال ضد باريس سان جيرمان بث مباشر مجاناً نهائي دوري أبطال أوروبا 2026.';

const KEYWORDS = [
  // English — intent: watch, live, free
  'arsenal vs psg live stream free','arsenal psg champions league final 2026',
  'watch arsenal vs psg online free','champions league final 2026 live stream',
  'ucl final 2026 live free','arsenal vs paris saint germain final',
  'arsenal psg final stream no registration','how to watch champions league final 2026',
  'champions league final 2026 free online','arsenal psg live hd',
  'ucl final live stream hd','arsenal psg final 2026 stream',
  'watch ucl final 2026 free','champions league final watch online free',
  'arsenal vs psg stream free reddit','arsenal psg live tv free',
  // Spanish — highest traffic volume
  'arsenal vs psg en vivo gratis','final champions league 2026 en directo',
  'ver arsenal psg gratis online','final champions la 1 en directo',
  'arsenal psg la 1 en directo','champions league final 2026 la 1',
  'ver final champions 2026 online gratis','arsenal contra psg en vivo',
  'final champions 2026 en vivo gratis','como ver arsenal psg gratis',
  'la 1 en directo arsenal psg','arsenal psg directo gratis',
  'final ucl 2026 en directo','arsenal psg rtve',
  // French
  'arsenal psg finale ligue des champions 2026 en direct',
  'voir arsenal psg gratuit en ligne','finale champions league 2026 streaming',
  'arsenal psg direct gratuit','finale ligue champions 2026 direct',
  'arsenal contre psg en direct gratuit','finale ucl 2026 streaming gratuit',
  // Arabic
  'ارسنال ضد باريس سان جيرمان بث مباشر','نهائي دوري أبطال أوروبا 2026 بث مباشر',
  'مشاهدة نهائي دوري الأبطال مجاناً','ارسنال باريس نهائي 2026',
  'بث مباشر مجاني نهائي أبطال أوروبا','ارسنال باريس سان جيرمان مباشر',
  'نهائي يوفا 2026 بث مباشر','مشاهدة ارسنال باريس بدون اشتراك',
  // German / Italian / Portuguese
  'arsenal psg champions league finale 2026 live stream',
  'arsenal psg finale live kostenlos','arsenal psg finale live stream gratis',
  'arsenal vs psg final ao vivo gratis','arsenal psg finale champions 2026',
  // Long-tail informational (E-E-A-T)
  'arsenal vs psg champions league final 2026 where to watch',
  'la 1 arsenal psg live stream free','arsenal psg final 2026 broadcast',
  'champions league 2026 final tv channel free',
].join(', ');

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: KEYWORDS,
  alternates: {
    canonical: `${SITE}/arsenal-vs-psg`,
    languages: {
      'en': `${SITE}/arsenal-vs-psg`,
      'fr': `${SITE}/arsenal-vs-psg`,
      'ar': `${SITE}/arsenal-vs-psg`,
      'es': `${SITE}/arsenal-vs-psg`,
      'de': `${SITE}/arsenal-vs-psg`,
    },
  },
  openGraph: {
    title: '🔴 LIVE: Arsenal vs PSG — Champions League Final 2026 FREE',
    description: 'Watch Arsenal vs PSG Champions League Final 2026 FREE in HD — La 1 live stream, no registration.',
    type: 'website',
    siteName: 'SportaLive',
    images: [{ url: `${SITE}/og-arsenal-psg.jpg`, width: 1200, height: 630, alt: 'Arsenal vs PSG Champions League Final 2026 Live Stream' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🔴 Arsenal vs PSG LIVE — UCL Final 2026 Free Stream',
    description: 'Watch free HD — Champions League Final 2026 live on La 1.',
    images: [`${SITE}/og-arsenal-psg.jpg`],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

// ─── Schema.org JSON-LD ────────────────────────────────────────────────────────

const matchJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'UEFA Champions League Final 2026 — Arsenal FC vs Paris Saint-Germain',
  alternateName: ['Arsenal vs PSG UCL Final 2026', 'UCL Final 2026', 'Champions League Final 2026'],
  description: 'The UEFA Champions League Final 2026 between Arsenal FC and Paris Saint-Germain. Watch live for free on La 1 (RTVE).',
  startDate: '2026-05-27T20:00:00Z',
  endDate:   '2026-05-27T22:30:00Z',
  sport: 'https://en.wikipedia.org/wiki/Association_football',
  url: `${SITE}/arsenal-vs-psg`,
  image: `${SITE}/og-arsenal-psg.jpg`,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  competitor: [
    {
      '@type': 'SportsTeam',
      name: 'Arsenal FC',
      alternateName: ['Arsenal', 'The Gunners'],
      sport: 'Football',
      url: 'https://www.arsenal.com',
      sameAs: 'https://en.wikipedia.org/wiki/Arsenal_F.C.',
      memberOf: { '@type': 'SportsOrganization', name: 'Premier League', url: 'https://www.premierleague.com' },
    },
    {
      '@type': 'SportsTeam',
      name: 'Paris Saint-Germain',
      alternateName: ['PSG', 'Paris SG', 'Paris Saint-Germain FC'],
      sport: 'Football',
      url: 'https://www.psg.fr',
      sameAs: 'https://en.wikipedia.org/wiki/Paris_Saint-Germain_F.C.',
      memberOf: { '@type': 'SportsOrganization', name: 'Ligue 1', url: 'https://www.ligue1.com' },
    },
  ],
  organizer: {
    '@type': 'Organization',
    name: 'UEFA',
    url: 'https://www.uefa.com',
    sameAs: 'https://en.wikipedia.org/wiki/UEFA',
  },
  superEvent: {
    '@type': 'SportsEvent',
    name: 'UEFA Champions League 2025-26',
    url: 'https://www.uefa.com/uefachampionsleague/',
  },
};

const broadcastJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BroadcastEvent',
  name: 'Arsenal vs PSG — UCL Final 2026 on La 1 LIVE',
  description: 'Free live broadcast of UEFA Champions League Final 2026 — Arsenal vs PSG on La 1 (RTVE).',
  startDate: '2026-05-27T20:00:00Z',
  endDate:   '2026-05-27T22:30:00Z',
  isLiveBroadcast: true,
  inLanguage: 'es',
  videoFormat: 'HD',
  broadcastDisplayName: 'La 1 — RTVE',
  potentialAction: {
    '@type': 'WatchAction',
    target: `${SITE}/arsenal-vs-psg`,
  },
  broadcastOfEvent: {
    '@type': 'SportsEvent',
    name: 'Arsenal FC vs Paris Saint-Germain — UEFA Champions League Final 2026',
    startDate: '2026-05-27T20:00:00Z',
  },
  publisher: {
    '@type': 'Organization',
    name: 'RTVE — La 1',
    url: 'https://www.rtve.es',
  },
};

const videoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Arsenal vs PSG — Champions League Final 2026 LIVE Free Stream',
  description: 'Live HD broadcast of the UEFA Champions League Final 2026 between Arsenal FC and Paris Saint-Germain.',
  thumbnailUrl: `${SITE}/og-arsenal-psg.jpg`,
  uploadDate: '2026-05-27',
  contentUrl: `${SITE}/arsenal-vs-psg`,
  embedUrl: `${SITE}/arsenal-vs-psg`,
  publication: {
    '@type': 'BroadcastEvent',
    isLiveBroadcast: true,
    startDate: '2026-05-27T20:00:00Z',
  },
  author: { '@type': 'Organization', name: 'SportaLive', url: SITE },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',                   item: SITE },
    { '@type': 'ListItem', position: 2, name: 'Champions League Final', item: `${SITE}/champions-league-final-2026` },
    { '@type': 'ListItem', position: 3, name: 'Arsenal vs PSG Live',    item: `${SITE}/arsenal-vs-psg` },
  ],
};

// FAQ schema — key E-E-A-T signal, captures "how to watch" queries
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How to watch Arsenal vs PSG Champions League Final 2026 for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Watch Arsenal vs PSG Champions League Final 2026 free on SportaLive. We stream La 1 (RTVE) live in HD — no subscription, no registration required. Just click Watch and the stream starts instantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which TV channel broadcasts Arsenal vs PSG UCL Final 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The UEFA Champions League Final 2026 (Arsenal vs PSG) is broadcast on La 1 (RTVE) in Spain, BT Sport / TNT Sports in the UK, beIN Sports in the Middle East and North Africa, and DAZN in several other countries. Watch it free on SportaLive via the La 1 live stream.',
      },
    },
    {
      '@type': 'Question',
      name: 'What time is the Arsenal vs PSG Champions League Final 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The UEFA Champions League Final 2026 between Arsenal and PSG kicks off on 27 May 2026 at 21:00 CET (20:00 UTC / 9 PM Paris & Madrid / 8 PM London / 3 PM New York / 10 PM Cairo).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Dónde ver Arsenal vs PSG final Champions League 2026 gratis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Puedes ver Arsenal vs PSG en directo gratis en SportaLive a través de La 1 de RTVE. Sin suscripción, sin registro. Solo entra, haz clic en el canal La 1 y disfruta del partido en HD.',
      },
    },
    {
      '@type': 'Question',
      name: 'أين أشاهد نهائي دوري أبطال أوروبا 2026 ارسنال ضد باريس مجاناً؟',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'يمكنك مشاهدة مباراة ارسنال ضد باريس سان جيرمان في نهائي دوري أبطال أوروبا 2026 مجاناً وبجودة عالية HD على موقع SportaLive، بدون اشتراك أو تسجيل. فقط ادخل على الموقع وانقر على قناة La 1.',
      },
    },
  ],
};

// ─── Data fetching ─────────────────────────────────────────────────────────────

async function getLa1Channel() {
  try {
    return await prisma.channel.findFirst({
      where: { slug: { in: ['la-1', 'la-1-1', 'la-1-2', 'la1'] }, isActive: true },
    });
  } catch { return null; }
}

async function getRelatedSports() {
  try {
    return await prisma.channel.findMany({
      where: {
        isActive: true,
        OR: [
          { groupTitle: { contains: 'Sport' } },
          { groupTitle: { contains: 'Deport' } },
          { name: { contains: 'Sport' } },
          { name: { contains: 'beIN' } },
          { name: { contains: 'ESPN' } },
        ],
      },
      take: 8,
      orderBy: { order: 'asc' },
    });
  } catch { return []; }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ArsenalVsPsgPage() {
  const [la1, related] = await Promise.all([getLa1Channel(), getRelatedSports()]);

  return (
    <>
      <JsonLd data={matchJsonLd} />
      <JsonLd data={broadcastJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={videoJsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-6xl mx-auto space-y-8">

        {/* ── UCL Hero ─────────────────────────────────────────── */}
        <section className="relative rounded-3xl overflow-hidden border border-[#1e3a6e]"
          style={{ background: 'linear-gradient(135deg, #05091a 0%, #0d1442 50%, #05091a 100%)' }}>

          {/* star dot grid */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          {/* team color glow halves */}
          <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-red-900/30 via-transparent to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#003B7C]/30 via-transparent to-transparent" />

          <div className="relative px-4 md:px-10 py-8 md:py-12 space-y-6">

            {/* UCL title row */}
            <div className="flex items-center justify-center gap-3">
              <span className="text-[#c8b87a] text-lg">✦</span>
              <p className="text-[#c8b87a] text-xs md:text-sm font-bold uppercase tracking-[0.3em]">UEFA Champions League Final 2026</p>
              <span className="text-[#c8b87a] text-lg">✦</span>
            </div>

            {/* Teams clash */}
            <div className="flex items-center justify-center gap-4 md:gap-12">

              {/* Arsenal */}
              <div className="flex-1 flex flex-col items-center md:items-end gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl scale-150" />
                  <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-red-600 to-red-900 border-2 border-red-400/50 shadow-2xl shadow-red-900/50 flex items-center justify-center">
                    <span className="text-4xl md:text-5xl">🔴</span>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-white font-black text-lg md:text-2xl uppercase tracking-wider">Arsenal FC</p>
                  <p className="text-red-400 text-xs uppercase tracking-widest">England · Premier League</p>
                </div>
              </div>

              {/* Center */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="text-4xl md:text-6xl drop-shadow-[0_0_30px_rgba(255,215,0,0.4)]">🏆</div>
                <div className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full shadow-lg shadow-red-900/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Live</span>
                </div>
                <p className="text-white/20 font-black text-xl md:text-3xl tracking-[0.4em]">VS</p>
              </div>

              {/* PSG */}
              <div className="flex-1 flex flex-col items-center md:items-start gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl scale-150" />
                  <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#003B7C] to-[#001440] border-2 border-blue-400/50 shadow-2xl shadow-blue-900/50 flex items-center justify-center">
                    <span className="text-4xl md:text-5xl">🔵</span>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-white font-black text-lg md:text-2xl uppercase tracking-wider">Paris SG</p>
                  <p className="text-blue-400 text-xs uppercase tracking-widest">France · Ligue 1</p>
                </div>
              </div>

            </div>

            {/* H1 */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                Arsenal vs PSG —{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8b87a] via-yellow-200 to-[#c8b87a]">
                  Champions League Final
                </span>
              </h1>
              <p className="text-gray-400 text-sm md:text-base">
                27 May 2026 · 21:00 CET · Free Live Stream on La 1
              </p>
            </div>

            {/* Info pills */}
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {[
                { icon: '📅', text: '27 May 2026' },
                { icon: '⏰', text: '21:00 CET · 20:00 UTC' },
                { icon: '📺', text: 'La 1 — RTVE (Free)' },
                { icon: '🌍', text: 'Watch Online HD' },
              ].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300">
                  <span>{icon}</span>{text}
                </span>
              ))}
            </div>

          </div>
        </section>

        {/* Player */}
        <WatchEventClient channel={la1 as any} />

        {/* Ad banner — below player */}
        <AdBanner />

        {/* Multilingual SEO content blocks */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* English */}
          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-bold">🏆 Champions League Final 2026 Live Stream Free</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Watch the <strong className="text-white">UEFA Champions League Final 2026</strong> live between
              <strong className="text-red-400"> Arsenal FC</strong> and
              <strong className="text-blue-400"> Paris Saint-Germain</strong>.
              Free HD stream — no subscription, no registration. Stream the biggest club match of 2026 right here.
            </p>
            <p className="text-gray-600 text-xs">arsenal vs psg · ucl final 2026 · champions league final stream free</p>
          </div>

          {/* French */}
          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-bold">🔴 Arsenal contre PSG — Finale Ligue des Champions 2026</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Regardez la <strong className="text-white">Finale de la Ligue des Champions 2026</strong> en direct et gratuitement.
              <strong className="text-red-400"> Arsenal</strong> contre
              <strong className="text-blue-400"> PSG</strong> — streaming HD sans abonnement ni inscription.
            </p>
            <p className="text-gray-600 text-xs">finale champions 2026 · arsenal psg en direct · streaming gratuit ucl</p>
          </div>

          {/* Arabic */}
          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2" dir="rtl">
            <h2 className="text-white font-bold">🔴 ارسنال ضد باريس سان جيرمان — بث مباشر مجاناً</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              شاهد <strong className="text-white">نهائي دوري أبطال أوروبا 2026</strong> بث مباشر مجاناً بجودة HD.
              <strong className="text-red-400"> ارسنال</strong> ضد
              <strong className="text-blue-400"> باريس سان جيرمان</strong> — بدون اشتراك، مجاناً على قناة لا 1.
            </p>
            <p className="text-gray-600 text-xs">بث مباشر مجاني · نهائي أبطال أوروبا 2026 · ارسنال باريس</p>
          </div>

          {/* Spanish */}
          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-bold">🔴 Arsenal vs PSG en Directo — Final Champions 2026</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ver la <strong className="text-white">Final de la Champions League 2026</strong> en directo y gratis.
              <strong className="text-red-400"> Arsenal</strong> contra
              <strong className="text-blue-400"> PSG</strong> — streaming HD sin pagar, en La 1 de RTVE.
            </p>
            <p className="text-gray-600 text-xs">arsenal psg en vivo · final champions la 1 · ver gratis online</p>
          </div>
        </section>

        {/* FAQ — E-E-A-T */}
        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">Frequently Asked Questions</h2>
          {[
            {
              q: 'How to watch Arsenal vs PSG Champions League Final 2026 free?',
              a: 'Watch right here on SportaLive — we stream La 1 (RTVE) live in HD for free. No account, no subscription needed. Click Watch above and the stream starts instantly.',
            },
            {
              q: 'What channel shows the UCL Final 2026?',
              a: 'La 1 (RTVE) shows it free-to-air in Spain. BT Sport / TNT Sports in the UK. beIN Sports in MENA. DAZN in several other markets. On SportaLive you can watch La 1 live for free.',
            },
            {
              q: 'What time is Arsenal vs PSG kick-off?',
              a: '21:00 CET / 20:00 UTC on 27 May 2026. That\'s 8 PM London, 9 PM Madrid & Paris, 3 PM New York, 11 PM Cairo.',
            },
            {
              q: '¿Dónde ver Arsenal vs PSG gratis?',
              a: 'Aquí mismo en SportaLive, retransmitiendo La 1 de RTVE en directo y gratis en HD. Sin registro, sin suscripción.',
            },
          ].map(({ q, a }, i) => (
            <details key={i} className="bg-gray-800/40 border border-white/5 rounded-xl p-4 cursor-pointer group">
              <summary className="text-white font-semibold text-sm list-none flex justify-between items-center gap-3">
                {q}
                <span className="text-purple-400 text-lg group-open:rotate-45 transition-transform flex-shrink-0">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{a}</p>
            </details>
          ))}
        </section>

        {/* Ad banner — mid-page */}
        <AdBanner />

        {/* Related */}
        {related.length > 0 && (
          <section>
            <h2 className="text-white font-bold text-xl mb-4">More Sports Channels</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {related.map(ch => (
                <Link key={ch.id} href={`/channel/${ch.slug}`}
                  className="flex items-center gap-2 p-3 bg-gray-800/60 hover:bg-gray-700/60 border border-white/5 hover:border-purple-500/30 rounded-xl transition-all group">
                  {ch.logo && <img src={ch.logo} alt={ch.name} className="w-8 h-8 object-contain rounded flex-shrink-0" />}
                  <span className="text-xs text-gray-400 group-hover:text-white truncate">{ch.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Internal links */}
        <section className="flex flex-wrap gap-3 justify-center pb-4">
          {[
            { href: '/crystal-palace-vs-rayo-vallecano', label: '🏆 Conference League Final'   },
            { href: '/champions-league-final-2026',      label: '⚽ Champions League 2026'     },
            { href: '/channel/la-1',                     label: '📺 La 1 En Directo'           },
            { href: '/live',                             label: '📡 All Live Channels'         },
            { href: '/category/deportivos',              label: '⚽ Sports Channels'           },
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
