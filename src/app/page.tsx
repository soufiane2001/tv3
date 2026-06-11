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
  const [beinMax2, beinMax1, beinMax3, beinMax4, bein1, beinGlobal, beinFr1, beinFr2, m6fhd, etv, sigma] = await getWcExtraChannels();

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
            { label: 'beIN MAX 2',   sublabel: 'beIN · MAX 2 · FHD',   channel: beinMax2  as any },
          { label: 'beIN MAX 1',   sublabel: 'beIN · MAX 1 · FHD',   channel: beinMax1  as any },
          { label: 'beIN MAX 3',   sublabel: 'beIN · MAX 3 · FHD',   channel: beinMax3  as any },
          { label: 'beIN MAX 4',   sublabel: 'beIN · MAX 4 · FHD',   channel: beinMax4  as any },
          { label: 'beIN Sport 1', sublabel: 'beIN · Sport 1 · AR',  channel: bein1     as any },
          { label: 'beIN Global',  sublabel: 'beIN · Global · EN',   channel: beinGlobal as any },
          { label: 'beIN FR 1',    sublabel: 'France · beIN 1 · HD', channel: beinFr1   as any },
          { label: 'beIN FR 2',    sublabel: 'France · beIN 2 · HD', channel: beinFr2   as any },
          { label: 'M6 FHD',       sublabel: 'France · M6 · FHD',    channel: m6fhd     as any },
          { label: 'ETV',     sublabel: 'Estonia · ERR · HD',  channel: etv   as any },
          { label: 'SigmaTV', sublabel: 'Cyprus · Sigma · HD', channel: sigma as any },
          ]}
          match={{
            home: 'Mexico', homeFlag: 'mx',
            away: 'South Africa', awayFlag: 'za',
            date: 'Thursday, 11 June 2026',
            time: '21:00 UTC · SoFi Stadium, LA',
          }}
        />
        <div className="flex flex-wrap gap-2 mt-3 items-center justify-between">
          <p className="text-white/20 text-xs">If server doesn't work, switch to next · Free HD · No registration</p>
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

      {/* ══════════════════════════════════════════════════════
          LONG-FORM EDITORIAL — content richness for SEO
      ══════════════════════════════════════════════════════ */}
      <section className="px-4 md:px-0 pt-14 pb-10 border-t border-white/[0.05]">
        <div className="max-w-4xl space-y-10 text-white/60 text-sm leading-relaxed">

          {/* Block 1 — Tournament overview */}
          <div className="space-y-4">
            <h2 className="text-white font-black text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
              FIFA World Cup 2026 — Complete Guide to the Biggest Tournament in History
            </h2>
            <p>
              The 2026 FIFA World Cup is the most ambitious football tournament ever staged. For the first time in history,
              three nations — the <strong className="text-white/80">United States, Canada, and Mexico</strong> — co-host the
              event across <strong className="text-white/80">16 venues</strong> and 11 cities. The expanded format introduces
              48 competing nations (up from 32), resulting in <strong className="text-white/80">104 matches</strong> played
              between <strong className="text-white/80">June 11 and July 19, 2026</strong>. The final takes place at MetLife
              Stadium in East Rutherford, New Jersey — the largest stadium in the United States.
            </p>
            <p>
              The group stage runs through late June with three teams advancing from each of the 12 groups. The round of 32
              begins on June 27, followed by the round of 16, quarter-finals, semi-finals, and the grand final on July 19.
              With matches played from Los Angeles and Dallas to New York, Toronto, Mexico City, and Vancouver, no previous
              World Cup has spread its matches across such a vast geographical footprint.
            </p>
          </div>

          {/* Block 2 — How to watch */}
          <div className="space-y-4">
            <h2 className="text-white font-black text-xl md:text-2xl">
              How to Watch World Cup 2026 for Free Online — Complete Streaming Guide
            </h2>
            <p>
              You do not need a paid subscription to watch every match of FIFA World Cup 2026.
              <strong className="text-white/80"> M6</strong> (France) is free-to-air and broadcasts a large portion of the
              tournament live in HD. <strong className="text-white/80">La 1 RTVE</strong> (Spain) carries every match free
              for Spanish audiences. <strong className="text-white/80">beIN Sport UHD 1</strong> is the primary broadcaster
              for the MENA region, while <strong className="text-white/80">RMC Sport</strong> covers French-market games.
              <strong className="text-white/80"> Arryadia TNT</strong> provides free Moroccan coverage, and public broadcasters
              including <strong className="text-white/80">Das Erste (ARD)</strong>, <strong className="text-white/80">RAI 1</strong>,
              <strong className="text-white/80"> ERT1</strong>, and <strong className="text-white/80">TV2</strong> carry
              national-team matches free across Germany, Italy, Greece, and Scandinavia.
            </p>
            <p>
              On SportaLive, all of these channels stream simultaneously in one place — no account, no registration, and
              no subscription required. Simply click a server and your chosen match loads instantly in HD. If one stream
              buffers, switch to a different server in seconds. We list kickoff times in every major timezone so you always
              know exactly when your match starts, wherever in the world you are watching from.
            </p>
            <h3 className="text-white font-bold text-base">Best Free Channels for World Cup 2026</h3>
            <ul className="space-y-1 list-none pl-0">
              {[
                ['M6', 'France — free-to-air, HD, covers major matches including the final'],
                ['La 1 RTVE', 'Spain — free public broadcaster, all 104 matches for Spanish audiences'],
                ['beIN Sport UHD 1', 'MENA region — ultra-HD, Arabic commentary, all group stage & knockouts'],
                ['RMC Sport', 'France — premium sports channel, World Cup matches alongside M6'],
                ['Arryadia TNT', 'Morocco — free national broadcast in Arabic, all Atlas Lions matches + more'],
                ['Das Erste / ARD', 'Germany — public broadcaster, all German national team matches free'],
                ['RAI 1', 'Italy — free public broadcaster, Azzurri matches and major fixtures'],
              ].map(([ch, desc]) => (
                <li key={ch} className="flex gap-2">
                  <span className="text-red-500 flex-shrink-0 mt-0.5">▸</span>
                  <span><strong className="text-white/80">{ch}</strong> — {desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Block 3 — Teams & favourites */}
          <div className="space-y-4">
            <h2 className="text-white font-black text-xl md:text-2xl">
              World Cup 2026 Favourites — Top Teams, Key Players &amp; Predictions
            </h2>
            <p>
              <strong className="text-white/80">Brazil</strong> enter the 2026 World Cup as many bookmakers' outright
              favourite. Led by <strong className="text-white/80">Vinicius Jr</strong> — arguably the world's best player
              — alongside Rodrygo, Endrick, and Raphinha, the Seleção are chasing their sixth world title. Brazil's
              front four is the most feared attacking unit in the tournament, and if their defence holds, the
              Hexa is within reach.
            </p>
            <p>
              <strong className="text-white/80">France</strong> are equally dangerous. <strong className="text-white/80">Kylian Mbappé</strong>,
              27 and at the peak of his powers after a landmark Real Madrid season, leads a squad that also features
              Dembélé, Camavinga, Tchouaméni and Maignan. France reached the final in 2018, were knocked out by Argentina
              in 2022, and arrive in North America determined to go all the way.
            </p>
            <p>
              <strong className="text-white/80">Spain</strong> are Euro 2024 champions and many analysts' pick to win
              the whole tournament. Lamine Yamal (18), Nico Williams, and Pedri form the most exciting young midfield
              trio at the competition. <strong className="text-white/80">England</strong>, under Lee Carsley, travel with
              Bellingham, Saka, and Foden, finally looking like they can end 60 years of hurt.
              <strong className="text-white/80"> Argentina</strong> defend the title without a peak Messi — now 38 — but
              with Álvarez, Fernández, and Mac Allister still firing.
            </p>
            <p>
              Dark horses worth following: <strong className="text-white/80">Germany</strong> (Wirtz and Musiala are the
              tournament's most exciting midfield partnership), <strong className="text-white/80">Morocco</strong> (Hakimi,
              Ziyech, and Bono building on the Qatar 2022 semi-final miracle), <strong className="text-white/80">Japan</strong>
              (Premier League-packed squad capable of beating anyone on the day), and
              <strong className="text-white/80"> Türkiye</strong> (Arda Güler is 20 and already one of the best attacking
              midfielders in the world).
            </p>
          </div>

          {/* Block 4 — Venues */}
          <div className="space-y-4">
            <h2 className="text-white font-black text-xl md:text-2xl">
              World Cup 2026 Venues — 16 Stadiums Across Three Countries
            </h2>
            <p>
              The United States hosts the majority of matches across 11 venues: MetLife Stadium (New York/New Jersey),
              SoFi Stadium (Los Angeles), AT&T Stadium (Dallas), NRG Stadium (Houston), Levi's Stadium (San Francisco Bay
              Area), Mercedes-Benz Stadium (Atlanta), Arrowhead Stadium (Kansas City), Lumen Field (Seattle), Lincoln
              Financial Field (Philadelphia), Soldier Field (Chicago), and Hard Rock Stadium (Miami).
            </p>
            <p>
              Canada contributes two venues: <strong className="text-white/80">BC Place</strong> in Vancouver and
              <strong className="text-white/80"> BMO Field</strong> in Toronto. Mexico provides the legendary
              <strong className="text-white/80"> Estadio Azteca</strong> in Mexico City — site of both the 1970 and 1986
              World Cup finals — plus <strong className="text-white/80">Estadio BBVA</strong> in Monterrey and
              <strong className="text-white/80"> Estadio Akron</strong> in Guadalajara. The tournament opener,
              Mexico vs South Africa, is played at SoFi Stadium in Los Angeles on June 11, while the final on July 19
              takes place at MetLife Stadium.
            </p>
          </div>

          {/* Block 5 — About SportaLive */}
          <div className="space-y-4">
            <h2 className="text-white font-black text-xl md:text-2xl">
              About SportaLive — Free World Cup 2026 Live Streaming Platform
            </h2>
            <p>
              SportaLive is a free live-streaming platform built specifically for football fans who want to watch major
              tournaments without paying for cable or a premium subscription. We aggregate legal free-to-air broadcast
              streams — M6, La 1, beIN Sport, Arryadia, Das Erste, RAI 1, ERT1, TV2 — and present them in a single,
              fast, mobile-friendly player. Every stream can be switched instantly, so if one server experiences lag or
              geo-restriction, you can move to the next without losing the match.
            </p>
            <p>
              Beyond the live player, SportaLive provides predicted lineups for every World Cup 2026 match, kickoff times
              in every major timezone, head-to-head records, match previews, and in-depth analysis of the tournament's
              key teams and players. The platform is completely free to use — no account creation, no email required,
              no subscription. Coverage spans all <strong className="text-white/80">104 FIFA World Cup 2026 matches</strong>,
              from the Group B opener on June 11 through to the final on July 19.
            </p>
          </div>

        </div>
      </section>

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
