import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ChannelCard from '@/components/channels/ChannelCard';
import WC2026StreamClient from '@/components/worldcup/WC2026StreamClient';
import JsonLd from '@/components/seo/JsonLd';
import AdBanner from '@/components/ads/AdBanner';
import AdBanner300 from '@/components/ads/AdBanner300';
import { wc2026News } from '@/data/wc2026-news';
import { getWcExtraChannels } from '@/lib/wc-channels';
import type { Metadata } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';

export const metadata: Metadata = {
  title: 'SportaLive — Watch World Cup 2026 Live Free | M6 · beIN Sport · RMC',
  description: 'Watch all 104 FIFA World Cup 2026 matches live free in HD. Stream M6, beIN Sport 1 and RMC Sport — no subscription, no registration. USA · Canada · Mexico · June 11–July 19, 2026. كأس العالم 2026 بث مباشر مجاناً.',
  keywords: [
    // French — most searched
    'diffusion direct coupe du monde 2026','coupe du monde 2026 en direct gratuit','coupe du monde 2026 streaming',
    'regarder coupe du monde 2026 gratuit','match coupe du monde 2026 direct','m6 coupe du monde 2026 direct',
    'bein sport coupe du monde 2026','la 1 coupe du monde 2026','rmc sport coupe du monde 2026',
    'match direct coupe du monde 2026','pronostic coupe du monde 2026','prediction mondial 2026',
    'actualité coupe du monde 2026','news coupe du monde 2026','open match coupe du monde',
    // English
    'world cup 2026 live stream free','world cup 2026 free broadcast','watch world cup 2026 online free',
    'world cup 2026 match today live','world cup 2026 prediction','world cup 2026 news',
    'bein sport 1 world cup 2026 live','m6 world cup 2026 live','la 1 world cup 2026',
    'world cup 2026 opening match live','world cup 2026 schedule today',
    // Arabic
    'كأس العالم 2026 بث مباشر مجاناً','مشاهدة كأس العالم 2026 مباشر','beIN Sport كأس العالم 2026',
    'أخبار كأس العالم 2026','توقعات كأس العالم 2026','كأس العالم 2026 اليوم',
    // Portuguese / Brazil
    'copa do mundo 2026 ao vivo grátis','copa 2026 transmissão ao vivo','brasil copa mundo 2026',
    // Spanish
    'mundial 2026 en vivo gratis','ver mundial 2026 gratis','predicciones mundial 2026',
  ].join(', '),
  alternates: {
    canonical: SITE,
    languages: { 'en': SITE, 'fr': SITE, 'ar': SITE, 'pt': SITE, 'es': SITE, 'x-default': SITE },
  },
  openGraph: {
    title: '🔴 Diffusion Direct Coupe du Monde 2026 — Gratuit HD | SportaLive',
    description: 'Regardez tous les matchs de la Coupe du Monde 2026 en direct gratuit sur beIN Sport 1, M6, La 1. World Cup 2026 free live stream — no subscription.',
    type: 'website', url: SITE, siteName: 'SportaLive',
  },
  twitter: {
    card: 'summary_large_image',
    title: '🔴 World Cup 2026 Live Stream Free — beIN Sport · M6 · La 1',
    description: 'Watch all 104 WC2026 matches free HD. No subscription, no registration.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

const eventJsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026',
  alternateName: ['Coupe du Monde 2026', 'كأس العالم 2026', 'Copa do Mundo 2026', 'Copa Mundial 2026', 'WM 2026'],
  description: 'Watch FIFA World Cup 2026 live free in HD on SportaLive. beIN Sport 1, M6 and La 1 direct stream — no subscription.',
  startDate: '2026-06-11', endDate: '2026-07-19',
  sport: 'https://en.wikipedia.org/wiki/Association_football',
  url: SITE,
  location: { '@type': 'Country', name: 'United States, Canada, Mexico' },
  organizer: { '@type': 'Organization', name: 'FIFA', url: 'https://www.fifa.com' },
  offers: { '@type': 'Offer', name: 'Free World Cup 2026 Live Stream', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: SITE },
};

const faqJsonLd = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Comment regarder la Coupe du Monde 2026 en direct gratuit?', acceptedAnswer: { '@type': 'Answer', text: 'Sur SportaLive, regardez la Coupe du Monde 2026 gratuitement en HD via beIN Sport 1, M6 et La 1. Aucun abonnement ni inscription requis. Cliquez sur le lecteur et regardez en direct.' } },
    { '@type': 'Question', name: 'Where can I watch World Cup 2026 for free?', acceptedAnswer: { '@type': 'Answer', text: 'Watch all FIFA World Cup 2026 matches free in HD on SportaLive. We stream beIN Sport 1, M6 (France), and La 1 (Spain) live — no subscription, no account needed.' } },
    { '@type': 'Question', name: 'كيف أشاهد كأس العالم 2026 مجاناً بث مباشر؟', acceptedAnswer: { '@type': 'Answer', text: 'شاهد جميع مباريات كأس العالم 2026 مجاناً وبجودة HD على SportaLive. نبث beIN Sport 1 وM6 وLa 1 مباشرة بدون اشتراك ولا تسجيل. فقط اضغط تشغيل.' } },
    { '@type': 'Question', name: 'Quand commence la Coupe du Monde 2026?', acceptedAnswer: { '@type': 'Answer', text: 'La Coupe du Monde 2026 débute le 11 juin 2026 avec le match d\'ouverture Mexique vs Afrique du Sud au SoFi Stadium de Los Angeles. La finale aura lieu le 19 juillet 2026.' } },
    { '@type': 'Question', name: 'Which channels broadcast World Cup 2026 free?', acceptedAnswer: { '@type': 'Answer', text: 'beIN Sport 1 (MENA), M6 (France — free-to-air), La 1 RTVE (Spain — free), and RMC Sport all broadcast the 2026 World Cup. Watch all of them free on SportaLive.' } },
    { '@type': 'Question', name: 'Como assistir Copa do Mundo 2026 de graça?', acceptedAnswer: { '@type': 'Answer', text: 'No SportaLive assista a Copa do Mundo 2026 de graça em HD. Transmitimos beIN Sport 1, M6 e La 1 ao vivo — sem assinatura, sem cadastro.' } },
    { '@type': 'Question', name: 'What are the predictions for World Cup 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Brazil, France, England and Spain are the main favourites for FIFA World Cup 2026. Brazil lead with Vinicius Jr, while France have Mbappé. Morocco are Africa\'s top hope after their 2022 semi-final run. Read our full match predictions on SportaLive.' } },
  ],
};

export const revalidate = 3600;

async function find(slugs: string[], patterns: string[]) {
  const r = await prisma.channel.findFirst({ where: { slug: { in: slugs }, isActive: true }, orderBy: { order: 'asc' } }).catch(() => null);
  if (r) return r;
  for (const p of patterns) {
    const c = await prisma.channel.findFirst({ where: { name: { contains: p, mode: 'insensitive' }, isActive: true }, orderBy: { order: 'asc' } }).catch(() => null);
    if (c) return c;
  }
  return null;
}

async function getHomeData() {
  try {
    const [categories, totalChannels, featured] = await Promise.all([
      prisma.category.findMany({ where: { channelCount: { gt: 0 } }, orderBy: { channelCount: 'desc' }, take: 10 }),
      prisma.channel.count({ where: { isActive: true } }),
      prisma.channel.findMany({ where: { isActive: true }, orderBy: { order: 'asc' }, take: 12, include: { category: { select: { name: true, slug: true } } } }),
    ]);
    const categoryChannels = await Promise.all(
      categories.slice(0, 5).map(async cat => ({
        category: cat,
        channels: await prisma.channel.findMany({ where: { categoryId: cat.id, isActive: true }, orderBy: { order: 'asc' }, take: 10, include: { category: { select: { name: true, slug: true } } } }),
      }))
    );
    return { categories, totalChannels, featured, categoryChannels };
  } catch {
    return { categories: [], totalChannels: 0, featured: [], categoryChannels: [] };
  }
}

const CAT_COLORS: Record<string, string> = {
  News:     'bg-blue-500/15 text-blue-400 border border-blue-500/25',
  Preview:  'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  Guide:    'bg-purple-500/15 text-purple-400 border border-purple-500/25',
  Analysis: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
  Team:     'bg-red-500/15 text-red-400 border border-red-500/25',
};

const CAT_ICONS: Record<string, string> = {
  News:     'fa-solid fa-newspaper',
  Preview:  'fa-solid fa-futbol',
  Guide:    'fa-solid fa-book-open',
  Analysis: 'fa-solid fa-chart-line',
  Team:     'fa-solid fa-users',
};

const CAT_GRADIENTS: Record<string, string> = {
  News:     'linear-gradient(135deg, #1e3a5f 0%, #12131A 100%)',
  Preview:  'linear-gradient(135deg, #14532d 0%, #12131A 100%)',
  Guide:    'linear-gradient(135deg, #3b0764 0%, #12131A 100%)',
  Analysis: 'linear-gradient(135deg, #451a03 0%, #12131A 100%)',
  Team:     'linear-gradient(135deg, #450a0a 0%, #12131A 100%)',
};

export default async function HomePage() {
  const { categories, totalChannels, featured, categoryChannels } = await getHomeData();
  const [[m6, bein, rmc, arryadia, dasErste], [rai1, ortb, ert1, sigma, tv2]] = await Promise.all([
    Promise.all([
      find(['m6', 'm6-hd', 'm6-fr'], ['M6']),
      find(['ar-bein-sport-uhd-1', 'bein-sport-1', 'ar-bein-sport-1'], ['beIN Sports UHD', 'beIN Sports 1', 'beIN Sport 1']),
      find(['rmc-sport-1', 'rmc-sport', 'rmc-1'], ['RMC Sport 1', 'RMC Sport', 'RMC']),
      find(['arryadia-tnt', 'arryadia-sport-tnt'], ['Arryadia TNT', 'الرياضية TNT']),
      find(['das-erste', 'ard-das-erste'], ['Das Erste', 'ARD']),
    ]),
    getWcExtraChannels(),
  ]);

  const topNews = wc2026News.slice(0, 6);

  return (
    <div>
      <JsonLd data={eventJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* ══════════════════════════════════════════════════════
          HERO — Red gradient, stats, WC2026 match cards
      ══════════════════════════════════════════════════════ */}
      <section className="relative -mx-4 -mt-6 overflow-hidden"
        style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #b91c1c 0%, #7f1d1d 45%, #1a0000 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '14px 14px' }} />
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(255,80,80,0.25) 0%, transparent 60%)' }} />

        <div className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-20 pb-2">
          <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Live Streaming Platform</p>
          <a href="#live-stream" className="live-badge">🔴 Watch Live</a>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 md:px-12 py-10 items-center">
          <div className="space-y-6">
            <div className="space-y-1">
              <p className="stat-number text-white">{totalChannels > 0 ? `${totalChannels}+` : '600+'}</p>
              <p className="text-white/50 text-sm font-bold uppercase tracking-[0.2em]">Live Channels</p>
            </div>
            <div className="space-y-1">
              <p className="stat-number text-white">104</p>
              <p className="text-white/50 text-sm font-bold uppercase tracking-[0.2em]">WC2026 Matches</p>
            </div>
            <div className="space-y-1">
              <p className="stat-number text-white">Free</p>
              <p className="text-white/50 text-sm font-bold uppercase tracking-[0.2em]">HD · No subscription</p>
            </div>
            <div className="flex flex-wrap gap-3 pt-4">
              <a href="#live-stream"
                className="px-8 py-3.5 bg-white text-black font-black text-sm uppercase tracking-widest rounded-full hover:bg-gray-100 transition-colors shadow-2xl">
                Watch Now
              </a>
              <Link href="/wc2026"
                className="px-8 py-3.5 bg-transparent border-2 border-white/30 text-white font-black text-sm uppercase tracking-widest rounded-full hover:border-white hover:bg-white/10 transition-all">
                Schedule
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {['🇫🇷 M6 Gratuit', '📡 beIN Sport UHD 1', '📺 RMC Sport', '🌍 beIN Sports 1', '🇪🇸 La 1 RTVE'].map(t => (
                <span key={t} className="label-chip bg-black/30 text-white/70 border border-white/10">{t}</span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="card-float" style={{ background: '#000' }}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <div>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">World Cup 2026 · Opening</p>
                  <p className="text-white font-black text-sm mt-0.5">Mexico vs South Africa — Group B</p>
                </div>
                <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 text-sm">→</span>
              </div>
              <Link href="/mexico-vs-south-africa-2026"
                className="flex items-center justify-between px-4 py-4 hover:bg-white/[0.03] transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <img src="https://flagcdn.com/w80/mx.png" alt="Mexico" width={48} height={32} className="rounded-md shadow-lg" />
                  <p className="text-white text-xs font-black uppercase">Mexico</p>
                </div>
                <div className="text-center">
                  <p className="text-white/20 font-black text-3xl tracking-[0.3em]">VS</p>
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1">Jun 11 · 21:00</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img src="https://flagcdn.com/w80/za.png" alt="South Africa" width={48} height={32} className="rounded-md shadow-lg" />
                  <p className="text-white text-xs font-black uppercase">S. Africa</p>
                </div>
              </Link>
            </div>

            {[
              { slug: 'brazil-vs-morocco-2026', home: 'Brazil', hf: 'br', away: 'Morocco', af: 'ma', date: 'Mon Jun 15' },
              { slug: 'germany-vs-curacao-2026', home: 'Germany', hf: 'de', away: 'Curaçao', af: 'cw', date: 'Mon Jun 15' },
              { slug: 'netherlands-vs-japan-2026', home: 'Netherlands', hf: 'nl', away: 'Japan', af: 'jp', date: 'Tue Jun 16' },
            ].map(m => (
              <Link key={m.slug} href={`/${m.slug}`}
                className="card-float flex items-center justify-between px-4 py-3 hover:border-red-600/30 transition-all"
                style={{ background: 'rgba(0,0,0,0.85)' }}>
                <div className="flex items-center gap-2">
                  <img src={`https://flagcdn.com/w40/${m.hf}.png`} alt={m.home} width={28} height={19} className="rounded" />
                  <span className="text-white text-xs font-bold">{m.home}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/20 text-xs font-black">VS</span>
                  <span className="text-white/30 text-[10px]">{m.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs font-bold">{m.away}</span>
                  <img src={`https://flagcdn.com/w40/${m.af}.png`} alt={m.away} width={28} height={19} className="rounded" />
                </div>
              </Link>
            ))}

            <Link href="/world-cup-2026-live"
              className="card flex items-center justify-center gap-2 py-3 text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-600/10 transition-colors border-red-600/20">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              View All 104 World Cup Matches
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 overflow-hidden pointer-events-none select-none">
          <p className="ghost-text text-white">SPORTALIVE</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #000)' }} />
      </section>

      {/* Ad slot — below hero */}
      <div className="flex justify-center py-4">
        <AdBanner300 />
      </div>

      {/* ══════════════════════════════════════════════════════
          LIVE STREAM — La 1 · M6 · beIN Sport UHD 1
      ══════════════════════════════════════════════════════ */}
      <section id="live-stream" className="px-4 md:px-0 pt-14">
        <div className="flex items-center gap-3 mb-5">
          <div className="accent-bar h-8" />
          <div>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Diffusion Direct · Live Broadcast</p>
            <h2 className="section-title text-white text-2xl md:text-3xl">
              Coupe du Monde 2026 — <span className="text-red-500">En Direct Gratuit</span>
            </h2>
          </div>
        </div>

        <WC2026StreamClient
          servers={[
            { label: 'Rai 1',        sublabel: 'Italy · RAI · HD',      channel: rai1     as any },
            { label: 'M6',           sublabel: 'France · Gratuit · HD',  channel: m6       as any },
            { label: 'beIN Sport UHD 1', sublabel: 'MENA · UHD · عربي', channel: bein     as any },
            { label: 'RMC Sport',    sublabel: 'France · HD · Premium',  channel: rmc      as any },
            { label: 'Arryadia TNT', sublabel: 'Maroc · مجاني',          channel: arryadia as any },
            { label: 'Das Erste',    sublabel: 'Germany · ARD',          channel: dasErste as any },
            { label: 'ORTB',         sublabel: 'ORTB · HD',              channel: ortb     as any },
            { label: 'ERT1',         sublabel: 'Greece · ERT · HD',      channel: ert1     as any },
            { label: 'SigmaTV',      sublabel: 'Cyprus · Sigma · HD',    channel: sigma    as any },
            { label: 'TV2',          sublabel: 'TV2 · HD',               channel: tv2      as any },
          ]}
          match={{
            home: 'Mexico', homeFlag: 'mx',
            away: 'South Africa', awayFlag: 'za',
            date: 'Thursday, 11 June 2026',
            time: '21:00 UTC · SoFi Stadium, LA',
          }}
        />
        <div className="flex flex-wrap gap-2 mt-3 items-center justify-between">
          <p className="text-white/20 text-xs">Gratuit HD · Sans abonnement · Sans inscription · Switch serveur si lag</p>
          <div className="flex gap-2">
            <Link href="/world-cup-2026-live" className="label-chip bg-red-600 text-white text-[10px]">104 Matches →</Link>
            <Link href="/wc2026" className="label-chip bg-white/5 text-white/60 border border-white/10 text-[10px]">Schedule</Link>
          </div>
        </div>

        {/* SEO text block for the channels */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: 'M6 — Gratuit', flag: '🇫🇷', desc: 'M6 diffuse la Coupe du Monde 2026 gratuitement en France. Regardez M6 en direct HD sur SportaLive depuis n\'importe quel pays — sans abonnement.' },
            { name: 'beIN Sport UHD 1', flag: '📡', desc: 'beIN Sport 1 diffuse tous les matchs du Mondial 2026 en direct pour la région MENA. Regardez beIN Sport UHD gratuitement sur SportaLive.' },
            { name: 'RMC Sport', flag: '📺', desc: 'RMC Sport diffuse la Coupe du Monde 2026 en France. Regardez RMC Sport en streaming HD sur SportaLive — couverture complète de tous les matchs.' },
          ].map(ch => (
            <div key={ch.name} className="card p-4 space-y-2">
              <p className="text-white font-black text-sm">{ch.flag} {ch.name}</p>
              <p className="text-white/40 text-xs leading-relaxed">{ch.desc}</p>
              <a href="#live-stream" className="text-red-500 text-[10px] font-black">▶ Regarder gratuit</a>
            </div>
          ))}
        </div>

        <div className="mt-4"><AdBanner /></div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WC2026 HIGHLIGHT — light section (design #2)
      ══════════════════════════════════════════════════════ */}
      {/* ── editorial light section — design #2 reference ── */}
      <section className="mt-20 rounded-3xl overflow-hidden" style={{ background: '#f5f4f0' }}>
        <div className="relative px-6 md:px-14 py-14 md:py-20 overflow-hidden">
          {/* Giant ghost number — like the "15" in design #2 */}
          <div className="absolute right-[-2%] top-0 bottom-0 flex items-center pointer-events-none select-none">
            <p className="text-black font-black italic leading-none"
               style={{ fontFamily: 'var(--font-display,sans-serif)', fontSize: 'clamp(12rem, 40vw, 38rem)', opacity: 0.055, letterSpacing: '-0.04em' }}>
              48
            </p>
          </div>

          <div className="relative z-10 max-w-xl">
            <p className="label-chip bg-red-600 text-white mb-6">🌍 FIFA World Cup 2026</p>

            {/* Barlow Condensed editorial headline */}
            <h2 className="text-black uppercase leading-none mb-5"
                style={{ fontFamily: 'var(--font-display,sans-serif)', fontSize: 'clamp(3rem, 9vw, 7.5rem)', fontWeight: 900, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
              Watch Every<br />
              Match<br />
              <span className="text-red-600">Completely<br />Free.</span>
            </h2>

            <p className="text-black/45 text-sm md:text-base mb-8 max-w-sm leading-relaxed">
              USA · Canada · Mexico · June 11 – July 19, 2026.<br />
              M6 · beIN Sport UHD · RMC Sport<br />
              No subscription · No registration.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#live-stream"
                 className="flex items-center gap-2 px-8 py-3.5 bg-black text-white
                            font-black text-xs uppercase tracking-[0.15em] rounded-full
                            hover:bg-red-600 transition-colors shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                Watch Live
              </a>
              <Link href="/wc2026"
                    className="px-8 py-3.5 border-2 border-black/30 text-black/70
                               font-black text-xs uppercase tracking-[0.15em] rounded-full
                               hover:border-black hover:text-black transition-all">
                Full Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ad slot — between highlight and news */}
      <div className="flex justify-center py-4">
        <AdBanner300 />
      </div>

      {/* ══════════════════════════════════════════════════════
          NEWS & PREDICTIONS — WC2026
      ══════════════════════════════════════════════════════ */}
      <section className="px-4 md:px-0 pt-14">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="accent-bar h-7" />
            <div>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Actualités · News · أخبار</p>
              <h2 className="section-title text-white text-xl md:text-2xl">WC2026 News & Predictions</h2>
            </div>
          </div>
          <Link href="/world-cup-2026-live" className="text-red-500 hover:text-red-400 text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-1">
            All News <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {topNews.map(article => (
            <article key={article.slug}
              className="group flex flex-col sm:flex-row rounded-2xl overflow-hidden border border-white/[0.08] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-2xl"
              style={{ background: 'var(--card)', boxShadow: '0 4px 24px -8px rgba(0,0,0,0.5)' }}>

              {/* ── Left: text content ── */}
              <div className="flex-1 flex flex-col justify-between p-6 min-w-0">
                <div className="space-y-3">
                  {/* Category badge */}
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${CAT_COLORS[article.category]}`}>
                    <i className={`${CAT_ICONS[article.category]} text-[10px]`} />
                    {article.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-white font-black text-base md:text-lg leading-snug group-hover:text-red-400 transition-colors duration-200 line-clamp-3"
                    style={{ fontFamily: 'var(--font-display)' }}>
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/45 text-sm leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                {/* Bottom: date + read more */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">
                  <span className="text-white/30 text-xs">{article.date}</span>
                  <span className="flex items-center gap-1.5 text-red-500 text-xs font-black group-hover:gap-2.5 transition-all duration-200">
                    Read more <i className="fa-solid fa-arrow-right text-[10px]" />
                  </span>
                </div>
              </div>

              {/* ── Right: visual panel ── */}
              <div className="sm:w-52 md:w-64 flex-shrink-0 relative overflow-hidden min-h-[140px] sm:min-h-0"
                style={{ background: CAT_GRADIENTS[article.category] }}>

                {/* Subtle pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                  style={{ backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '12px 12px' }} />

                {/* Flag — centered, large */}
                {article.flag ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={`https://flagcdn.com/w160/${article.flag}.png`}
                      alt=""
                      className="w-28 md:w-36 rounded-xl shadow-2xl opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-400 object-cover"
                      style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.7))' }}
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <i className={`${CAT_ICONS[article.category]} text-white/50 text-2xl`} />
                    </div>
                    <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">
                      {article.readTime} min read
                    </span>
                  </div>
                )}

                {/* Read time badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full"
                  style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <i className="fa-solid fa-clock text-white/50 text-[9px]" />
                  <span className="text-white/50 text-[9px] font-bold">{article.readTime} min</span>
                </div>
              </div>

            </article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURED CHANNELS
      ══════════════════════════════════════════════════════ */}
      {featured.length > 0 && (
        <section className="px-4 md:px-0 pt-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="accent-bar h-7" />
              <h2 className="section-title text-white text-xl md:text-2xl">Featured Channels</h2>
            </div>
            <Link href="/live" className="text-red-500 hover:text-red-400 text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-1">
              All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {featured.map((channel, i) => <ChannelCard key={channel.id} channel={channel as any} index={i} />)}
          </div>
        </section>
      )}

      {/* Ad slot — between featured channels and category rows */}
      <div className="flex justify-center py-4">
        <AdBanner300 />
      </div>

      {/* ══════════════════════════════════════════════════════
          CATEGORY ROWS
      ══════════════════════════════════════════════════════ */}
      {categoryChannels.map(({ category, channels }) =>
        channels.length > 0 ? (
          <section key={category.id} className="px-4 md:px-0 pt-12">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="accent-bar h-6" />
                <h2 className="section-title text-white text-lg md:text-xl">{category.name}</h2>
              </div>
              <Link href={`/category/${category.slug}`}
                className="text-red-500 hover:text-red-400 text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-1">
                {category.channelCount} <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="scroll-row">
              {channels.map((channel, i) => (
                <div key={channel.id} className="w-40 sm:w-48 flex-shrink-0">
                  <ChannelCard channel={channel as any} index={i} />
                </div>
              ))}
            </div>
          </section>
        ) : null
      )}

      {/* ══════════════════════════════════════════════════════
          FAQ — SEO-targeted questions
      ══════════════════════════════════════════════════════ */}
      <section className="px-4 md:px-0 pt-14 space-y-3">
        <div className="flex items-center gap-3 mb-6">
          <div className="accent-bar h-7" />
          <h2 className="section-title text-white text-xl md:text-2xl">FAQ — Diffusion Coupe du Monde 2026</h2>
        </div>
        {faqJsonLd.mainEntity.map((q: any, i: number) => (
          <details key={i}
            className="group card border-white/[0.06] hover:border-red-600/30 transition-all cursor-pointer overflow-hidden">
            <summary className="flex items-center justify-between gap-3 px-5 py-4 list-none text-white text-sm font-bold">
              {q.name}
              <span className="text-red-500 text-xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-5 pb-5 pt-0">
              <div className="h-px bg-white/5 mb-3" />
              <p className="text-white/40 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
            </div>
          </details>
        ))}
      </section>

      {/* ══════════════════════════════════════════════════════
          CATEGORIES GRID
      ══════════════════════════════════════════════════════ */}
      {categories.length > 0 && (
        <section className="px-4 md:px-0 pt-12 pb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="accent-bar h-6" />
            <h2 className="section-title text-white text-lg md:text-xl">Browse Categories</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {categories.map(cat => (
              <Link key={cat.id} href={`/category/${cat.slug}`}
                className="group card flex items-center justify-between p-4 hover:border-red-600/40">
                <span className="text-sm font-bold text-white/70 group-hover:text-white truncate transition-colors">{cat.name}</span>
                <span className="text-[10px] text-white/20 font-bold ml-2 flex-shrink-0">{cat.channelCount}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Multilingual platform description — visible, crawlable, not hidden */}
      <section className="px-4 md:px-0 pt-10 pb-12 border-t border-white/[0.04]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-white/35 leading-relaxed">
          <div>
            <p className="text-white/50 font-bold mb-1">🇫🇷 Français</p>
            <p>Regardez la Coupe du Monde 2026 en direct gratuit sur SportaLive — M6, beIN Sport 1 et RMC Sport, sans abonnement ni inscription.</p>
          </div>
          <div>
            <p className="text-white/50 font-bold mb-1">🌍 English</p>
            <p>Watch all 104 FIFA World Cup 2026 matches free in HD — beIN Sport UHD 1, M6 France, La 1 RTVE, RMC Sport. No subscription, no sign-up.</p>
          </div>
          <div>
            <p className="text-white/50 font-bold mb-1">🇲🇦 عربي</p>
            <p>شاهد كأس العالم 2026 مجاناً بجودة HD على SportaLive — beIN Sport 1 وM6 وLa 1، بدون اشتراك ولا تسجيل. بث مباشر لجميع 104 مباريات.</p>
          </div>
          <div>
            <p className="text-white/50 font-bold mb-1">🇧🇷 Português · 🇪🇸 Español</p>
            <p>Copa do Mundo 2026 ao vivo grátis — beIN Sport, M6, La 1. Sin suscripción. Mundial 2026 en vivo gratis en SportaLive.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
