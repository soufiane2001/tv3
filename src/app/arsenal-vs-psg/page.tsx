import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import WatchEventClient from './WatchEventClient';

export const revalidate = 300; // ISR every 5 min

const TITLE    = 'Arsenal vs PSG Live Stream — Champions League Final 2026';
const DESC     = 'Watch Arsenal vs PSG LIVE — UEFA Champions League Final 2026. Free HD stream. Arsenal contre PSG en direct. ارسنال ضد باريس سان جيرمان بث مباشر نهائي دوري أبطال أوروبا 2026.';
const KEYWORDS = [
  'arsenal vs psg live','arsenal psg live stream','champions league final 2026',
  'ucl final 2026 live','arsenal psg stream free','watch champions league final',
  'arsenal psg en direct','finale champions league 2026','arsenal psg streaming gratuit',
  'arsenal psg en vivo','final champions league 2026 en directo',
  'ارسنال باريس سان جيرمان بث مباشر','نهائي دوري أبطال أوروبا 2026',
  'arsenal psg canlı izle','la 1 en directo','champions league final stream',
  'ucl final live free','arsenal psg watch online','champions league 2026 final',
].join(', ');

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: KEYWORDS,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/arsenal-vs-psg`,
    languages: {
      'en': `${process.env.NEXT_PUBLIC_SITE_URL}/arsenal-vs-psg`,
      'fr': `${process.env.NEXT_PUBLIC_SITE_URL}/arsenal-vs-psg`,
      'ar': `${process.env.NEXT_PUBLIC_SITE_URL}/arsenal-vs-psg`,
      'es': `${process.env.NEXT_PUBLIC_SITE_URL}/arsenal-vs-psg`,
    },
  },
  openGraph: {
    title: '🔴 LIVE: Arsenal vs PSG — Champions League Final 2026',
    description: 'Watch the Champions League Final FREE. Arsenal vs PSG live stream HD.',
    type: 'website',
    siteName: 'SportaLive',
    images: [{ url: '/og-arsenal-psg.jpg', width: 1200, height: 630, alt: 'Arsenal vs PSG Champions League Final 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🔴 Arsenal vs PSG LIVE — UCL Final 2026',
    description: 'Free HD stream — Champions League Final 2026 live now',
    images: ['/og-arsenal-psg.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const matchJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'UEFA Champions League Final 2026 — Arsenal vs Paris Saint-Germain',
  startDate: '2026-05-27T20:00:00Z',
  endDate:   '2026-05-27T22:00:00Z',
  description: 'UEFA Champions League Final 2026 between Arsenal FC and Paris Saint-Germain. Watch live online.',
  sport: 'Football',
  url: `${process.env.NEXT_PUBLIC_SITE_URL}/arsenal-vs-psg`,
  image: `${process.env.NEXT_PUBLIC_SITE_URL}/og-arsenal-psg.jpg`,
  competitor: [
    { '@type': 'SportsTeam', name: 'Arsenal FC',           url: 'https://www.arsenal.com', sport: 'Football' },
    { '@type': 'SportsTeam', name: 'Paris Saint-Germain',  url: 'https://www.psg.fr',     sport: 'Football' },
  ],
  organizer: { '@type': 'Organization', name: 'UEFA', url: 'https://www.uefa.com' },
  superEvent: {
    '@type': 'SportsEvent',
    name: 'UEFA Champions League 2025-26',
    url: 'https://www.uefa.com/uefachampionsleague/',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',                    item: process.env.NEXT_PUBLIC_SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Champions League Final',  item: `${process.env.NEXT_PUBLIC_SITE_URL}/champions-league-final-2026` },
    { '@type': 'ListItem', position: 3, name: 'Arsenal vs PSG Live',     item: `${process.env.NEXT_PUBLIC_SITE_URL}/arsenal-vs-psg` },
  ],
};

const videoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Arsenal vs PSG — Champions League Final 2026 Live Stream',
  description: 'Live HD broadcast of the UEFA Champions League Final 2026 — Arsenal vs PSG',
  thumbnailUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/og-arsenal-psg.jpg`,
  uploadDate: '2026-05-27',
  publication: { '@type': 'BroadcastEvent', isLiveBroadcast: true, startDate: '2026-05-27T20:00:00Z' },
};

async function getLa1Channel() {
  try {
    return await prisma.channel.findFirst({
      where: { slug: { in: ['la-1', 'la-1-1', 'la-1-2'] }, isActive: true },
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
        ],
      },
      take: 8,
      orderBy: { order: 'asc' },
    });
  } catch { return []; }
}

export default async function ArsenalVsPsgPage() {
  const [la1, related] = await Promise.all([getLa1Channel(), getRelatedSports()]);

  return (
    <>
      <JsonLd data={matchJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={videoJsonLd} />

      <div className="max-w-6xl mx-auto space-y-8">

        {/* Live badge + title */}
        <div className="text-center space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
            LIVE NOW
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Arsenal vs PSG<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-blue-400">
              Champions League Final 2026
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            UEFA Champions League Final · 27 May 2026 · Watch Free HD Stream
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
            <span>🏆 UCL Final 2026</span>
            <span>·</span>
            <span>Arsenal FC 🔴 vs 🔵 Paris Saint-Germain</span>
            <span>·</span>
            <span>Free Live Stream</span>
          </div>
        </div>

        {/* Player section */}
        <WatchEventClient channel={la1 as any} />

        {/* Multilingual keyword content (SEO) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-6 space-y-2">
            <h2 className="text-white font-bold text-lg">🏆 Champions League Final 2026 Live</h2>
            <p className="text-gray-400 text-sm">
              Watch the <strong className="text-white">UEFA Champions League Final 2026</strong> live between
              <strong className="text-red-400"> Arsenal FC</strong> and
              <strong className="text-blue-400"> Paris Saint-Germain</strong>.
              Free HD stream — no subscription required. The biggest club football match of 2026.
            </p>
            <p className="text-gray-500 text-xs">
              Arsenal vs PSG stream · UCL Final live · Champions League 2026 watch online
            </p>
          </div>

          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-6 space-y-2">
            <h2 className="text-white font-bold text-lg">🔴 Arsenal contre PSG — En Direct</h2>
            <p className="text-gray-400 text-sm">
              Regardez la <strong className="text-white">Finale de la Ligue des Champions 2026</strong> en direct.
              <strong className="text-red-400"> Arsenal FC</strong> contre
              <strong className="text-blue-400"> PSG</strong> — streaming gratuit en HD.
              Finale Champions League 2026 gratuit, sans abonnement.
            </p>
            <p className="text-gray-500 text-xs">
              Arsenal PSG en direct · finale ligue des champions streaming · UCL 2026 gratuit
            </p>
          </div>

          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-6 space-y-2" dir="rtl">
            <h2 className="text-white font-bold text-lg">🔴 ارسنال ضد باريس سان جيرمان — بث مباشر</h2>
            <p className="text-gray-400 text-sm">
              شاهد <strong className="text-white">نهائي دوري أبطال أوروبا 2026</strong> بث مباشر مجاناً.
              <strong className="text-red-400"> ارسنال</strong> ضد
              <strong className="text-blue-400"> باريس سان جيرمان</strong> — بدون اشتراك، جودة عالية HD.
            </p>
            <p className="text-gray-500 text-xs">
              بث مباشر مجاني · نهائي أبطال أوروبا · ارسنال باريس 2026
            </p>
          </div>

          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-6 space-y-2">
            <h2 className="text-white font-bold text-lg">🔴 Arsenal vs PSG en Vivo — Final Champions</h2>
            <p className="text-gray-400 text-sm">
              Mira la <strong className="text-white">Final de la Champions League 2026</strong> en directo y gratis.
              <strong className="text-red-400"> Arsenal</strong> contra
              <strong className="text-blue-400"> PSG</strong> — streaming HD sin pagar, disponible en La 1.
            </p>
            <p className="text-gray-500 text-xs">
              Arsenal PSG en vivo · final champions 2026 · La 1 en directo gratis
            </p>
          </div>
        </section>

        {/* Match info */}
        <section className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 border border-white/5 rounded-2xl p-6">
          <h2 className="text-white font-bold text-xl mb-4 text-center">Match Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: 'Competition', value: 'UCL Final 2026' },
              { label: 'Date', value: '27 May 2026' },
              { label: 'Teams', value: 'Arsenal vs PSG' },
              { label: 'Broadcast', value: 'La 1 (Free)' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-black/30 rounded-xl p-4">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{label}</p>
                <p className="text-white font-semibold text-sm">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related sports channels */}
        {related.length > 0 && (
          <section>
            <h2 className="text-white font-bold text-xl mb-4">More Sports Channels</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {related.map(ch => (
                <Link
                  key={ch.id}
                  href={`/channel/${ch.slug}`}
                  className="flex items-center gap-2 p-3 bg-gray-800/60 hover:bg-gray-700/60 border border-white/5 hover:border-purple-500/30 rounded-xl transition-all group"
                >
                  {ch.logo && (
                    <img src={ch.logo} alt={ch.name} className="w-8 h-8 object-contain rounded flex-shrink-0" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
                  )}
                  <span className="text-xs text-gray-400 group-hover:text-white truncate transition-colors">{ch.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Internal linking */}
        <section className="flex flex-wrap gap-3 justify-center pb-4">
          {[
            { href: '/champions-league-final-2026', label: '🏆 Champions League Final 2026' },
            { href: '/world-cup-2026',              label: '🌍 World Cup 2026'              },
            { href: '/channel/la-1',                label: '📺 La 1 En Directo'             },
            { href: '/live',                        label: '📡 All Live Channels'           },
            { href: '/category/deportivos',         label: '⚽ Sports Channels'             },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 bg-gray-800/60 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/30 text-gray-400 hover:text-white text-sm rounded-xl transition-all"
            >
              {label}
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}
