import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import WatchEventClient from '../arsenal-vs-psg/WatchEventClient';

export const revalidate = 300;

const TITLE = 'Crystal Palace vs Rayo Vallecano LIVE — Conference League Final 2026 | TRT 1';
const DESC  = 'Watch Crystal Palace vs Rayo Vallecano live — UEFA Conference League Final 2026 on TRT 1. Free HD stream. Crystal Palace Rayo Vallecano en direct. كريستال بالاس رايو فاليكانو بث مباشر نهائي الدوري الأوروبي الثالث 2026.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    'crystal palace vs rayo vallecano','conference league final 2026','crystal palace rayo live',
    'uefa conference league final','watch conference league final free','trt 1 live stream',
    'crystal palace rayo vallecano stream','conference league 2026 final stream',
    'crystal palace rayo en directo','finale conference league 2026',
    'كريستال بالاس رايو فاليكانو بث مباشر','نهائي الدوري الأوروبي الثالث 2026',
    'trt 1 canlı izle','crystal palace rayo canlı','conference league final live free',
    'crystal palace europa conference league','rayo vallecano conference league',
  ].join(', '),
  openGraph: {
    title: '🔴 LIVE: Crystal Palace vs Rayo Vallecano — Conference League Final 2026',
    description: 'Watch the UEFA Conference League Final 2026 FREE on TRT 1. Crystal Palace vs Rayo Vallecano live HD.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '🔴 Crystal Palace vs Rayo Vallecano LIVE — UCL Conference Final 2026',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/crystal-palace-vs-rayo-vallecano` },
};

const matchJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'UEFA Conference League Final 2026 — Crystal Palace vs Rayo Vallecano',
  startDate: '2026-05-27T20:00:00Z',
  endDate:   '2026-05-27T22:00:00Z',
  description: 'UEFA Conference League Final 2026. Crystal Palace vs Rayo Vallecano. Watch live on TRT 1.',
  sport: 'Football',
  url: `${process.env.NEXT_PUBLIC_SITE_URL}/crystal-palace-vs-rayo-vallecano`,
  competitor: [
    { '@type': 'SportsTeam', name: 'Crystal Palace', sport: 'Football' },
    { '@type': 'SportsTeam', name: 'Rayo Vallecano', sport: 'Football' },
  ],
  organizer: { '@type': 'Organization', name: 'UEFA', url: 'https://www.uefa.com' },
  superEvent: { '@type': 'SportsEvent', name: 'UEFA Europa Conference League 2025-26' },
};

const videoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Crystal Palace vs Rayo Vallecano — Conference League Final 2026 Live',
  description: 'Live broadcast of the UEFA Conference League Final 2026 on TRT 1.',
  uploadDate: '2026-05-27',
  publication: { '@type': 'BroadcastEvent', isLiveBroadcast: true, startDate: '2026-05-27T20:00:00Z' },
};

async function getTrt1() {
  try {
    return await prisma.channel.findFirst({
      where: { slug: { in: ['trt', 'trt-1', 'trt1'] }, isActive: true },
    });
  } catch { return null; }
}

async function getRelated() {
  try {
    return await prisma.channel.findMany({
      where: { isActive: true, OR: [{ groupTitle: { contains: 'Sport' } }, { groupTitle: { contains: 'Turkish' } }] },
      take: 8, orderBy: { order: 'asc' },
    });
  } catch { return []; }
}

export default async function ConferenceLeagueFinalPage() {
  const [trt1, related] = await Promise.all([getTrt1(), getRelated()]);

  return (
    <>
      <JsonLd data={matchJsonLd} />
      <JsonLd data={videoJsonLd} />

      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> LIVE NOW
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            Crystal Palace vs Rayo Vallecano<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-yellow-400">
              Conference League Final 2026
            </span>
          </h1>
          <p className="text-gray-400">UEFA Europa Conference League Final · 27 May 2026 · TRT 1 Live</p>
        </div>

        {/* Player */}
        <WatchEventClient channel={trt1 as any} />

        {/* Multilingual keyword blocks */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-bold">🏆 Conference League Final 2026 Live</h2>
            <p className="text-gray-400 text-sm">
              Watch the <strong className="text-white">UEFA Conference League Final 2026</strong> free online.
              <strong className="text-blue-400"> Crystal Palace</strong> vs
              <strong className="text-red-400"> Rayo Vallecano</strong> live on
              <strong className="text-white"> TRT 1</strong>. HD stream, no subscription.
            </p>
            <p className="text-gray-600 text-xs">conference league final 2026 · crystal palace rayo live · trt 1 stream</p>
          </div>
          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-bold">🔵 Crystal Palace vs Rayo — Finale Conference League</h2>
            <p className="text-gray-400 text-sm">
              Regardez la <strong className="text-white">Finale de la Conference League 2026</strong> en direct gratuit.
              <strong className="text-blue-400"> Crystal Palace</strong> contre
              <strong className="text-red-400"> Rayo Vallecano</strong> sur TRT 1. Streaming HD sans abonnement.
            </p>
            <p className="text-gray-600 text-xs">finale conference league 2026 · crystal palace rayo en direct · trt 1 streaming</p>
          </div>
          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2" dir="rtl">
            <h2 className="text-white font-bold">🔴 كريستال بالاس ضد رايو فاليكانو — بث مباشر</h2>
            <p className="text-gray-400 text-sm">
              شاهد <strong className="text-white">نهائي الدوري الأوروبي للمؤتمر 2026</strong> مجاناً.
              <strong className="text-blue-400"> كريستال بالاس</strong> ضد
              <strong className="text-red-400"> رايو فاليكانو</strong> على TRT 1 بث مباشر HD.
            </p>
            <p className="text-gray-600 text-xs">بث مباشر مجاني · نهائي كونفرنس ليج 2026 · TRT 1</p>
          </div>
          <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-bold">🔴 Crystal Palace - Rayo Vallecano Canlı İzle</h2>
            <p className="text-gray-400 text-sm">
              <strong className="text-white">UEFA Konferans Ligi Finali 2026</strong> TRT 1'de canlı izleyin.
              <strong className="text-blue-400"> Crystal Palace</strong> -
              <strong className="text-red-400"> Rayo Vallecano</strong> maçı ücretsiz HD yayın.
            </p>
            <p className="text-gray-600 text-xs">konferans ligi finali 2026 · trt 1 canlı · crystal palace rayo canlı izle</p>
          </div>
        </section>

        {/* Match info */}
        <section className="bg-gradient-to-r from-blue-900/20 to-red-900/20 border border-white/5 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-4 text-center">Match Info</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { l: 'Competition', v: 'Conference League Final' },
              { l: 'Date', v: '27 May 2026' },
              { l: 'Teams', v: 'Crystal Palace vs Rayo' },
              { l: 'Broadcast', v: 'TRT 1 (Free)' },
            ].map(({ l, v }) => (
              <div key={l} className="bg-black/30 rounded-xl p-4">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{l}</p>
                <p className="text-white font-semibold text-sm">{v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related sports */}
        {related.length > 0 && (
          <section>
            <h2 className="text-white font-bold text-xl mb-4">More Live Channels</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {related.map(ch => (
                <Link key={ch.id} href={`/channel/${ch.slug}`}
                  className="flex items-center gap-2 p-3 bg-gray-800/60 hover:bg-gray-700/60 border border-white/5 hover:border-purple-500/30 rounded-xl transition-all group">
                  {ch.logo && <img src={ch.logo} alt={ch.name} className="w-7 h-7 object-contain rounded flex-shrink-0" />}
                  <span className="text-xs text-gray-400 group-hover:text-white truncate">{ch.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Internal links */}
        <section className="flex flex-wrap gap-3 justify-center pb-4">
          {[
            { href: '/arsenal-vs-psg',              label: '🏆 Arsenal vs PSG — UCL Final'        },
            { href: '/champions-league-final-2026', label: '⚽ Champions League Final 2026'       },
            { href: '/world-cup-2026',              label: '🌍 World Cup 2026'                    },
            { href: '/channel/trt',                 label: '📺 TRT Canlı'                        },
            { href: '/live',                        label: '📡 All Live Channels'                 },
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
