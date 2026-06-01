import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ChannelCard from '@/components/channels/ChannelCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SportaLive — Watch Live TV Free 🔴 Football, Sports, beIN Sports',
  description: '🔴 LIVE NOW — 600+ free HD sports & news channels. beIN Sports, MBC, Al Jazeera. No subscription, no registration. بث مباشر مجاني.',
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

export default async function HomePage() {
  const { categories, totalChannels, featured, categoryChannels } = await getHomeData();

  return (
    <div>

      {/* ══════════════════════════════════════════════
          HERO — Design #1: red, stats, match cards
      ══════════════════════════════════════════════ */}
      <section className="relative -mx-4 -mt-6 overflow-hidden"
        style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #b91c1c 0%, #7f1d1d 45%, #1a0000 100%)' }}>

        {/* Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '14px 14px' }} />
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(255,80,80,0.25) 0%, transparent 60%)' }} />

        {/* Nav */}
        <div className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-20 pb-2">
          <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Live Streaming Platform</p>
          <Link href="/world-cup-2026-live"
            className="live-badge">Live Stream</Link>
        </div>

        {/* Content grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 md:px-12 py-10 items-center">

          {/* LEFT — Stats */}
          <div className="space-y-6">
            <div className="space-y-1">
              <p className="stat-number text-white">{totalChannels > 0 ? `${totalChannels}+` : '600+'}</p>
              <p className="text-white/50 text-sm font-bold uppercase tracking-[0.2em]">Live Channels</p>
            </div>
            <div className="space-y-1">
              <p className="stat-number text-white">24/7</p>
              <p className="text-white/50 text-sm font-bold uppercase tracking-[0.2em]">Always Live</p>
            </div>
            <div className="space-y-1">
              <p className="stat-number text-white">HD</p>
              <p className="text-white/50 text-sm font-bold uppercase tracking-[0.2em]">Free Stream</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Link href="/live"
                className="px-8 py-3.5 bg-white text-black font-black text-sm uppercase tracking-widest rounded-full hover:bg-gray-100 transition-colors shadow-2xl">
                Watch Now
              </Link>
              <Link href="/world-cup-2026-live"
                className="px-8 py-3.5 bg-transparent border-2 border-white/30 text-white font-black text-sm uppercase tracking-widest rounded-full hover:border-white hover:bg-white/10 transition-all">
                WC 2026
              </Link>
            </div>

            {/* Channels tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['📡 beIN Sport 1', '🇫🇷 M6', '📺 RMC Sport', '🌍 Al Jazeera', '⚽ beIN Sports'].map(t => (
                <span key={t} className="label-chip bg-black/30 text-white/70 border border-white/10">{t}</span>
              ))}
            </div>
          </div>

          {/* RIGHT — WC2026 match cards */}
          <div className="space-y-3">
            {/* Featured card */}
            <div className="card overflow-hidden" style={{ background: '#000' }}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <div>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">World Cup 2026</p>
                  <p className="text-white font-black text-sm mt-0.5">Opening Match · Group B</p>
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

            {/* Secondary cards */}
            {[
              { slug: 'brazil-vs-morocco-2026', home: 'Brazil', hf: 'br', away: 'Morocco', af: 'ma', date: 'Mon Jun 15' },
              { slug: 'germany-vs-curacao-2026', home: 'Germany', hf: 'de', away: 'Curaçao', af: 'cw', date: 'Mon Jun 15' },
              { slug: 'netherlands-vs-japan-2026', home: 'Netherlands', hf: 'nl', away: 'Japan', af: 'jp', date: 'Tue Jun 16' },
            ].map(m => (
              <Link key={m.slug} href={`/${m.slug}`}
                className="card flex items-center justify-between px-4 py-3 hover:border-red-600/40 transition-all"
                style={{ background: 'rgba(0,0,0,0.7)' }}>
                <div className="flex items-center gap-2">
                  <img src={`https://flagcdn.com/w40/${m.hf}.png`} alt={m.home} width={28} height={19} className="rounded" />
                  <span className="text-white text-xs font-bold">{m.home}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/20 text-xs font-black">VS</span>
                  <span className="text-white/30 text-[10px]">{m.date}</span>
                  <span className="text-white/30 text-xs">→</span>
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

        {/* Ghost text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 overflow-hidden pointer-events-none select-none">
          <p className="ghost-text text-white">SPORTALIVE</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #000)' }} />
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED CHANNELS — Design #3: dark cards
      ══════════════════════════════════════════════ */}
      {featured.length > 0 && (
        <section className="px-4 md:px-0 pt-16 pb-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="accent-bar h-8" />
              <div>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Streaming Now</p>
                <h2 className="section-title text-white">Featured Channels</h2>
              </div>
            </div>
            <Link href="/live"
              className="flex items-center gap-1 text-red-500 hover:text-red-400 text-xs font-black uppercase tracking-widest transition-colors">
              All Channels <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {featured.map((channel, i) => (
              <ChannelCard key={channel.id} channel={channel as any} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          WC2026 HIGHLIGHT — Design #2: light section
      ══════════════════════════════════════════════ */}
      <section className="mx-0 mt-16 rounded-2xl overflow-hidden" style={{ background: '#f5f4f0' }}>
        <div className="relative px-6 md:px-12 py-12 overflow-hidden">
          {/* Ghost number — like the "15" in design #2 */}
          <div className="absolute right-0 top-0 pointer-events-none select-none overflow-hidden h-full flex items-center">
            <p className="text-black font-black leading-none" style={{ fontSize: 'clamp(8rem, 25vw, 22rem)', opacity: 0.06, letterSpacing: '-0.05em' }}>
              48
            </p>
          </div>

          <div className="relative z-10 max-w-2xl">
            <p className="label-chip bg-red-600 text-white mb-4">🌍 FIFA World Cup 2026</p>
            <h2 className="text-black font-black uppercase leading-none mb-4"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', letterSpacing: '-0.03em' }}>
              Watch Every Match<br />
              <span className="text-red-600">Completely Free</span>
            </h2>
            <p className="text-black/50 text-base mb-6 max-w-md">
              USA · Canada · Mexico · 48 teams · 104 matches · June 11 – July 19, 2026.<br />
              beIN Sport 1, M6, RMC Sport — no subscription, no registration.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/world-cup-2026-live"
                className="flex items-center gap-2 px-8 py-3.5 bg-black text-white font-black text-sm uppercase tracking-widest rounded-full hover:bg-red-600 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Watch Live Free
              </Link>
              <Link href="/wc2026"
                className="px-8 py-3.5 border-2 border-black text-black font-black text-sm uppercase tracking-widest rounded-full hover:bg-black hover:text-white transition-all">
                Match Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CATEGORY ROWS — Dark, clean
      ══════════════════════════════════════════════ */}
      {categoryChannels.map(({ category, channels }) =>
        channels.length > 0 ? (
          <section key={category.id} className="px-4 md:px-0 pt-14">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="accent-bar h-7" />
                <h2 className="section-title text-white text-xl md:text-2xl">{category.name}</h2>
              </div>
              <Link href={`/category/${category.slug}`}
                className="flex items-center gap-1 text-red-500 hover:text-red-400 text-xs font-black uppercase tracking-widest transition-colors">
                View all ({category.channelCount}) <ChevronRight className="w-3.5 h-3.5" />
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

      {/* ══════════════════════════════════════════════
          CATEGORIES GRID — Design #3: dark cards
      ══════════════════════════════════════════════ */}
      {categories.length > 0 && (
        <section className="px-4 md:px-0 pt-14 pb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="accent-bar h-7" />
            <h2 className="section-title text-white text-xl md:text-2xl">Browse Categories</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {categories.map(cat => (
              <Link key={cat.id} href={`/category/${cat.slug}`}
                className="group card flex items-center justify-between p-4 hover:border-red-600/40">
                <span className="text-sm font-bold text-white/70 group-hover:text-white truncate transition-colors">
                  {cat.name}
                </span>
                <span className="text-[10px] text-white/20 font-bold ml-2 flex-shrink-0">{cat.channelCount}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
