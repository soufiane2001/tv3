import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import WatchEventClient from './WatchEventClient';
import AdBanner from '@/components/ads/AdBanner';

export const revalidate = 300;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';

const TITLE = 'Arsenal vs PSG LIVE — UCL Final 2026 Free Stream | La 1 · M6 · Canal+ Sport';
const DESC  = 'Watch Arsenal vs PSG LIVE FREE — UEFA Champions League Final 2026. Stream HD on La 1, M6 or Canal+ Sport. No subscription. Arsenal PSG en vivo gratis · Arsenal contre PSG en direct M6 gratuit · ارسنال ضد باريس بث مباشر مجاناً · Arsenal PSG lineup prediction 30 May 2026.';

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
  // German / Italian / Portuguese / Turkish
  'arsenal psg champions league finale 2026 live stream',
  'arsenal psg finale live kostenlos','arsenal psg live stream kostenlos',
  'arsenal vs psg final ao vivo gratis','arsenal psg final ao vivo grátis',
  'arsenal psg finale champions 2026','arsenal psg diretta gratis',
  'finale champions league 2026 streaming gratis','arsenal psg canlı izle',
  'şampiyonlar ligi finali 2026 izle','arsenal psg finale champions 2026 in diretta',
  // Lineup / formation (huge day-before traffic)
  'arsenal vs psg lineup','arsenal psg predicted lineup 2026',
  'arsenal vs psg starting 11','arsenal psg formation champions league final',
  'alignement arsenal psg finale','composition arsenal psg finale 2026',
  'تشكيلة ارسنال باريس نهائي 2026','تشكيلة نهائي دوري أبطال أوروبا 2026',
  'arsenal psg aufstellung','arsenal psg formazioni finale 2026',
  'arsenal psg escalação final','arsenal psg muhtemel 11',
  // Predictions / odds (informational traffic)
  'arsenal vs psg prediction','arsenal psg match preview 2026',
  'arsenal psg who will win','arsenal vs psg odds champions league final',
  'pronostic arsenal psg finale 2026','arsenal psg prono ligue des champions',
  'توقعات مباراة ارسنال باريس نهائي','من سيفوز نهائي دوري الأبطال 2026',
  'arsenal psg prognose finale','arsenal psg pronostico finale champions',
  'arsenal psg prognóstico final champions',
  // Where to watch by country
  'where to watch champions league final 2026 usa',
  'champions league final 2026 on tv usa','ucl final 2026 us channel',
  'où voir finale champions league 2026 france','finale champions m6 gratuit',
  'arsenal psg m6 en direct gratuit','final champions league 2026 gratis',
  'كيف اشاهد نهائي أبطال أوروبا 2026','قنوات نهائي دوري الأبطال 2026',
  'champions league finale 2026 deutschland fernsehen',
  'arsenal psg bein sports arabic','arsenal psg beinsports mena',
  // Long-tail informational (E-E-A-T)
  'arsenal vs psg champions league final 2026 where to watch',
  'la 1 arsenal psg live stream free','arsenal psg final 2026 broadcast',
  'champions league 2026 final tv channel free',
  'arsenal psg h2h record','arsenal psg head to head history',
  'arsenal vs psg key players to watch','arsenal psg saka dembele final',
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
  startDate: '2026-05-30T20:00:00Z',
  endDate:   '2026-05-30T22:30:00Z',
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
  startDate: '2026-05-30T20:00:00Z',
  endDate:   '2026-05-30T22:30:00Z',
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
    startDate: '2026-05-30T20:00:00Z',
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
    startDate: '2026-05-30T20:00:00Z',
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
        text: 'The UEFA Champions League Final 2026 between Arsenal and PSG kicks off on 30 May 2026 at 21:00 CET (20:00 UTC / 9 PM Paris & Madrid / 8 PM London / 3 PM New York / 10 PM Cairo).',
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

async function findChannel(slugs: string[], namePatterns: string[]) {
  // Try slug first (exact), then fall back to name contains (handles slug mismatches from M3U)
  const bySlug = await prisma.channel.findFirst({
    where: { slug: { in: slugs }, isActive: true },
    orderBy: { order: 'asc' },
  }).catch(() => null);
  if (bySlug) return bySlug;

  for (const pattern of namePatterns) {
    const byName = await prisma.channel.findFirst({
      where: { name: { contains: pattern, mode: 'insensitive' }, isActive: true },
      orderBy: { order: 'asc' },
    }).catch(() => null);
    if (byName) return byName;
  }
  return null;
}

async function getStreams() {
  try {
    const [la1, m6, canalSport] = await Promise.all([
      findChannel(
        ['la-1', 'la-1-1', 'la-1-2', 'la1', 'la-1-hd', 'la-1-es', 'spain-la-1', 'la-1-rtve', 'rtve-la1', 'es-la1'],
        ['La 1', 'La1', 'RTVE La', 'La Un'],
      ),
      findChannel(
        ['m6', 'm6-hd', 'm6-1', 'm6-fr', 'france-m6'],
        ['M6'],
      ),
      findChannel(
        ['canal-sport', 'canal-sport-hd', 'canal-plus-sport', 'canalplus-sport', 'canal-sport-1'],
        ['Canal+ Sport', 'Canal Sport', 'CanalSport'],
      ),
    ]);
    return { la1, m6, canalSport };
  } catch { return { la1: null, m6: null, canalSport: null }; }
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
  const [{ la1, m6, canalSport }, related] = await Promise.all([getStreams(), getRelatedSports()]);

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
                30 May 2026 · 21:00 CET · Free Live Stream on La 1
              </p>
            </div>

            {/* Info pills */}
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {[
                { icon: '📅', text: '30 May 2026' },
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
        <WatchEventClient streams={[
          { label: 'La 1', sublabel: 'RTVE · España · Free', channel: la1 as any },
          { label: 'M6',   sublabel: 'France · Gratuit',      channel: m6 as any  },
          { label: 'Canal+ Sport', sublabel: 'France · HD',   channel: canalSport as any },
        ]} />

        {/* Ad banner — below player */}
        <AdBanner />

        {/* ── Where to Watch by Country ──────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-white font-bold text-xl">📺 Where to Watch Arsenal vs PSG — By Country</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="text-left px-4 py-3">Country</th>
                  <th className="text-left px-4 py-3">Channel</th>
                  <th className="text-left px-4 py-3">Free?</th>
                  <th className="text-left px-4 py-3">Stream</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { flag:'🇪🇸', country:'Spain',        ch:'La 1 (RTVE)',          free:'✅ Free',  href:'/channel/la-1' },
                  { flag:'🇫🇷', country:'France',       ch:'M6 / Canal+ Sport',   free:'✅ M6 Free',href:'/channel/m6' },
                  { flag:'🇬🇧', country:'UK',           ch:'TNT Sports / BT Sport',free:'💳 Sub',   href:'/live' },
                  { flag:'🇺🇸', country:'USA',          ch:'Paramount+ / CBS',    free:'💳 Sub',   href:'/live' },
                  { flag:'🇩🇪', country:'Germany',      ch:'DAZN',                free:'💳 Sub',   href:'/live' },
                  { flag:'🇮🇹', country:'Italy',        ch:'Sky Sport / Mediaset', free:'💳 Sub',  href:'/live' },
                  { flag:'🇵🇹', country:'Portugal',     ch:'Sport TV',            free:'💳 Sub',   href:'/live' },
                  { flag:'🇲🇦', country:'Morocco',      ch:'beIN Sports Arabia',  free:'💳 Sub',   href:'/live' },
                  { flag:'🇸🇦', country:'Saudi Arabia', ch:'SSC Sport / beIN',    free:'💳 Sub',   href:'/live' },
                  { flag:'🇩🇿', country:'Algeria',      ch:'beIN Sports',         free:'💳 Sub',   href:'/live' },
                  { flag:'🇪🇬', country:'Egypt',        ch:'beIN Sports',         free:'💳 Sub',   href:'/live' },
                  { flag:'🇹🇳', country:'Tunisia',      ch:'beIN Sports',         free:'💳 Sub',   href:'/live' },
                  { flag:'🇧🇪', country:'Belgium',      ch:'RTBF / La Une',       free:'✅ Free',  href:'/live' },
                  { flag:'🇹🇷', country:'Turkey',       ch:'TRT Spor',            free:'✅ Free',  href:'/live' },
                  { flag:'🌍', country:'Worldwide',     ch:'SportaLive (La 1·M6)', free:'✅ Free', href:'/arsenal-vs-psg' },
                ].map(({ flag, country, ch, free, href }) => (
                  <tr key={country} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-3 text-gray-300">{flag} {country}</td>
                    <td className="px-4 py-3 text-white font-medium">{ch}</td>
                    <td className="px-4 py-3 text-green-400 text-xs font-bold">{free}</td>
                    <td className="px-4 py-3">
                      <Link href={href} className="text-purple-400 hover:text-purple-300 text-xs underline">Watch →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-xs">arsenal vs psg where to watch · champions league final 2026 tv channel · où voir finale champions · ver final champions gratis · قنوات نهائي أبطال أوروبا 2026</p>
        </section>

        {/* ── Predicted Lineups ──────────────────────────────────── */}
        <section className="space-y-4" id="lineups">
          <h2 className="text-white font-bold text-xl">⚽ Predicted Lineups — Arsenal vs PSG</h2>
          <p className="text-gray-500 text-xs">Composition probable · تشكيلة متوقعة · Alineación prevista · Aufstellung · Formazione</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Arsenal */}
            <div className="bg-red-950/30 border border-red-500/20 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-xl">🔴</div>
                <div>
                  <p className="text-white font-black uppercase tracking-wider">Arsenal FC</p>
                  <p className="text-red-400 text-xs">4-3-3 · Predicted XI</p>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                {[
                  { pos: 'GK',  name: 'D. Raya' },
                  { pos: 'RB',  name: 'B. White' },
                  { pos: 'CB',  name: 'W. Saliba' },
                  { pos: 'CB',  name: 'G. Magalhães' },
                  { pos: 'LB',  name: 'J. Timber' },
                  { pos: 'DM',  name: 'D. Rice' },
                  { pos: 'CM',  name: 'M. Ødegaard ©' },
                  { pos: 'CM',  name: 'K. Havertz' },
                  { pos: 'RW',  name: 'B. Saka ⭐' },
                  { pos: 'ST',  name: 'G. Jesus' },
                  { pos: 'LW',  name: 'G. Martinelli' },
                ].map(({ pos, name }) => (
                  <div key={name} className="flex items-center gap-3 py-1 border-b border-white/5">
                    <span className="w-9 text-center text-[10px] font-bold text-red-400 bg-red-500/10 rounded px-1 py-0.5">{pos}</span>
                    <span className="text-gray-200">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PSG */}
            <div className="bg-blue-950/30 border border-blue-500/20 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#003B7C] to-[#001440] flex items-center justify-center text-xl">🔵</div>
                <div>
                  <p className="text-white font-black uppercase tracking-wider">Paris Saint-Germain</p>
                  <p className="text-blue-400 text-xs">4-3-3 · Composition probable</p>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                {[
                  { pos: 'GK',  name: 'G. Donnarumma' },
                  { pos: 'RB',  name: 'A. Hakimi' },
                  { pos: 'CB',  name: 'Marquinhos ©' },
                  { pos: 'CB',  name: 'W. Pacho' },
                  { pos: 'LB',  name: 'N. Mendes' },
                  { pos: 'DM',  name: 'Vitinha' },
                  { pos: 'CM',  name: 'F. Ruiz' },
                  { pos: 'CM',  name: 'J. Neves' },
                  { pos: 'RW',  name: 'O. Dembélé ⭐' },
                  { pos: 'ST',  name: 'G. Ramos' },
                  { pos: 'LW',  name: 'B. Barcola' },
                ].map(({ pos, name }) => (
                  <div key={name} className="flex items-center gap-3 py-1 border-b border-white/5">
                    <span className="w-9 text-center text-[10px] font-bold text-blue-400 bg-blue-500/10 rounded px-1 py-0.5">{pos}</span>
                    <span className="text-gray-200">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-xs">arsenal psg predicted lineup · composition probable arsenal psg · تشكيلة ارسنال باريس نهائي · arsenal psg aufstellung · arsenal psg formazioni</p>
        </section>

        {/* ── Key Players & H2H ─────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Key Players */}
          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-3">
            <h2 className="text-white font-bold">⭐ Key Players to Watch</h2>
            <div className="space-y-2">
              {[
                { name: 'Bukayo Saka',     team: 'Arsenal',  desc: 'England\'s best — electric right wing, direct & clinical.',   color: 'text-red-400' },
                { name: 'Ousmane Dembélé', team: 'PSG',      desc: 'France winger — explosive pace, UCL pedigree.',               color: 'text-blue-400' },
                { name: 'Martin Ødegaard', team: 'Arsenal',  desc: 'Norwegian captain — creative engine, dictates tempo.',        color: 'text-red-400' },
                { name: 'Achraf Hakimi',   team: 'PSG',      desc: 'Morocco\'s star — attacking right-back, dangerous crosses.',  color: 'text-blue-400' },
                { name: 'Declan Rice',     team: 'Arsenal',  desc: 'England\'s midfield wall — sets the defensive platform.',     color: 'text-red-400' },
                { name: 'Marquinhos',      team: 'PSG',      desc: 'Brazilian captain — leads PSG defence in big moments.',       color: 'text-blue-400' },
              ].map(({ name, team, desc, color }) => (
                <div key={name} className="flex gap-3 py-2 border-b border-white/5">
                  <span className={`text-xs font-bold ${color} flex-shrink-0 w-16`}>{team}</span>
                  <div>
                    <p className="text-white text-sm font-semibold">{name}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* H2H + Match Info */}
          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-4">
            <h2 className="text-white font-bold">📊 Match Info & H2H</h2>

            <div className="space-y-2 text-sm">
              {[
                { label: 'Competition', value: 'UEFA Champions League Final 2026' },
                { label: 'Date',        value: '30 May 2026' },
                { label: 'Kick-off',    value: '21:00 CET / 20:00 UTC' },
                { label: 'Stage',       value: 'Final' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between border-b border-white/5 py-1.5">
                  <span className="text-gray-500">{label}</span>
                  <span className="text-white font-medium">{value}</span>
                </div>
              ))}
            </div>

            <h3 className="text-white font-semibold text-sm pt-2">🕒 Kick-off Times Worldwide</h3>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {[
                ['🇬🇧 London',        '20:00'],
                ['🇫🇷 Paris',         '21:00'],
                ['🇪🇸 Madrid',        '21:00'],
                ['🇩🇿 Algiers',       '22:00'],
                ['🇲🇦 Casablanca',    '21:00'],
                ['🇸🇦 Riyadh',        '23:00'],
                ['🇪🇬 Cairo',         '22:00'],
                ['🇺🇸 New York',      '15:00'],
                ['🇺🇸 Los Angeles',   '12:00'],
                ['🇧🇷 São Paulo',     '16:00'],
                ['🇦🇺 Sydney',        '06:00+1'],
                ['🇯🇵 Tokyo',         '04:00+1'],
              ].map(([city, time]) => (
                <div key={city} className="flex justify-between px-2 py-1 bg-white/[0.03] rounded">
                  <span className="text-gray-400">{city}</span>
                  <span className="text-white font-bold">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Multilingual Match Preview ────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-bold">🏆 Champions League Final 2026 — Match Preview</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              The <strong className="text-white">UEFA Champions League Final 2026</strong> pits
              <strong className="text-red-400"> Arsenal FC</strong> against
              <strong className="text-blue-400"> Paris Saint-Germain</strong> in what promises to be the biggest club match of the decade.
              Arsenal, England's dominant force, face a PSG side finally fulfilling their Champions League ambitions.
              Watch live free on SportaLive — La 1, M6, or Canal+ Sport. No registration, no subscription.
            </p>
            <p className="text-gray-600 text-xs">arsenal vs psg preview · ucl final 2026 · champions league final stream free</p>
          </div>

          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-bold">🔴 Avant-match — Arsenal contre PSG, Finale LDC 2026</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              La <strong className="text-white">Finale de la Ligue des Champions 2026</strong> oppose
              <strong className="text-red-400"> Arsenal</strong> au
              <strong className="text-blue-400"> PSG</strong> dans un choc franco-anglais historique.
              Regardez gratuitement sur <strong className="text-white">M6 en direct</strong> ou Canal+ Sport via SportaLive.
              Sans abonnement, sans inscription — disponible partout dans le monde.
            </p>
            <p className="text-gray-600 text-xs">arsenal psg finale · pronostic arsenal psg · m6 finale champions 2026</p>
          </div>

          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2" dir="rtl">
            <h2 className="text-white font-bold">🔴 نهائي دوري أبطال أوروبا 2026 — ارسنال ضد باريس سان جيرمان</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              يجمع <strong className="text-white">نهائي دوري أبطال أوروبا 2026</strong>
              <strong className="text-red-400"> ارسنال</strong> بـ
              <strong className="text-blue-400"> باريس سان جيرمان</strong> في أضخم مواجهة في تاريخ الكرة الأوروبية.
              شاهد المباراة مجاناً وبجودة HD على موقع SportaLive — بدون اشتراك، بدون تسجيل.
              متاح لجميع المشاهدين في المغرب، الجزائر، تونس، مصر، السعودية وكل العالم العربي.
            </p>
            <p className="text-gray-600 text-xs">بث مباشر نهائي 2026 · ارسنال باريس مجاناً · مشاهدة نهائي أبطال أوروبا</p>
          </div>

          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-bold">🔴 Arsenal vs PSG en Directo — Final Champions 2026</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              La <strong className="text-white">Final de la Champions League 2026</strong> entre
              <strong className="text-red-400"> Arsenal</strong> y
              <strong className="text-blue-400"> PSG</strong> se juega el <strong className="text-white">30 de mayo a las 21:00 CET</strong>.
              Ver gratis en La 1 de RTVE. Streaming HD sin pagar, sin registro — disponible desde España, Latinoamérica y todo el mundo.
            </p>
            <p className="text-gray-600 text-xs">arsenal psg en vivo · final champions la 1 · ver gratis online 2026</p>
          </div>

          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-bold">🏆 Arsenal gegen PSG — Champions League Finale 2026</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Das <strong className="text-white">Champions League Finale 2026</strong> zwischen
              <strong className="text-red-400"> Arsenal</strong> und
              <strong className="text-blue-400"> PSG</strong> findet am 30. Mai 2026 um 21:00 Uhr statt.
              Kostenlos live streamen auf SportaLive — kein Abo, keine Anmeldung notwendig.
            </p>
            <p className="text-gray-600 text-xs">arsenal psg finale live stream · champions league finale kostenlos 2026</p>
          </div>

          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-bold">🏆 Arsenal vs PSG — Final Champions ao Vivo Grátis 2026</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              A <strong className="text-white">Final da Champions League 2026</strong> entre
              <strong className="text-red-400"> Arsenal</strong> e
              <strong className="text-blue-400"> PSG</strong> acontece a 30 de maio de 2026 às 21h00 CET.
              Assiste ao vivo e de graça no SportaLive — sem subscrição, sem registo.
            </p>
            <p className="text-gray-600 text-xs">arsenal psg ao vivo grátis · final champions 2026 streaming · onde ver arsenal psg</p>
          </div>
        </section>

        {/* ── FAQ — Expanded Multilingual ───────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">Frequently Asked Questions</h2>
          {[
            {
              q: 'How to watch Arsenal vs PSG Champions League Final 2026 free?',
              a: 'Watch right here on SportaLive — we stream La 1, M6 and Canal+ Sport live in HD for free. No account, no subscription. Click a stream tab above and it starts instantly.',
            },
            {
              q: 'What channel shows the UCL Final 2026?',
              a: 'La 1 (RTVE, Spain — free), M6 (France — free), Canal+ Sport (France), TNT Sports/BT Sport (UK), Paramount+/CBS Sports (USA), DAZN (Germany), beIN Sports (MENA). On SportaLive you can watch La 1 and M6 for free worldwide.',
            },
            {
              q: 'What time is Arsenal vs PSG kick-off?',
              a: '21:00 CET / 20:00 UTC on 30 May 2026. That\'s 20:00 London, 21:00 Madrid & Paris, 22:00 Cairo & Algiers, 23:00 Riyadh, 15:00 New York, 12:00 Los Angeles.',
            },
            {
              q: 'What is the predicted Arsenal lineup for the UCL Final 2026?',
              a: 'Predicted Arsenal XI (4-3-3): Raya; B. White, Saliba, Gabriel, Timber; Rice, Ødegaard, Havertz; Saka, Jesus, Martinelli.',
            },
            {
              q: 'What is the predicted PSG lineup for the Champions League Final 2026?',
              a: 'Predicted PSG XI (4-3-3): Donnarumma; Hakimi, Marquinhos, Pacho, Nuno Mendes; Vitinha, Fabian Ruiz, J. Neves; Dembélé, G. Ramos, Barcola.',
            },
            {
              q: '¿Dónde ver Arsenal vs PSG gratis? ¿A qué hora es la final?',
              a: 'En SportaLive, retransmitiendo La 1 de RTVE en directo y gratis en HD. La final es el 30 de mayo a las 21:00 CET. Sin registro, sin suscripción.',
            },
            {
              q: 'Comment regarder Arsenal vs PSG en direct gratuit sur M6 ?',
              a: 'Sur SportaLive, sélectionne l\'onglet M6 ci-dessus — flux HD gratuit sans inscription ni abonnement. La finale commence le 30 mai à 21h00 heure française.',
            },
            {
              q: 'كيف أشاهد نهائي ارسنال باريس مجاناً؟',
              a: 'ادخل على sportalive.live واضغط على زر مشاهدة — نبث قناة لا 1 مجاناً بجودة HD. المباراة في 30 مايو الساعة 21:00 بتوقيت أوروبا الوسطى (22:00 بتوقيت القاهرة والجزائر، 23:00 بتوقيت الرياض).',
            },
            {
              q: 'Wie kann man Arsenal vs PSG kostenlos schauen?',
              a: 'Auf SportaLive kannst du La 1 und M6 kostenlos und in HD streamen — kein Konto, kein Abo. Das Finale beginnt am 30. Mai 2026 um 21:00 Uhr CET.',
            },
            {
              q: 'Come vedere Arsenal PSG finale Champions 2026 gratis?',
              a: 'Su SportaLive puoi guardare La 1 e M6 in diretta gratis in HD — nessun abbonamento, nessuna registrazione. La finale è il 30 maggio alle 21:00 ora italiana.',
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
            { href: '/arsenal-psg-lineup',               label: '📋 Arsenal PSG Lineups'       },
            { href: '/arsenal-psg-prediction',           label: '🔮 Arsenal PSG Prediction'    },
            { href: '/champions-league-final-2026',      label: '🏆 UCL Final 2026'            },
            { href: '/channel/la-1',                     label: '📺 La 1 En Directo'           },
            { href: '/channel/m6',                       label: '📺 M6 En Direct'              },
            { href: '/channel/canal-sport',              label: '📺 Canal+ Sport'              },
            { href: '/live',                             label: '📡 All Live Channels'         },
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
