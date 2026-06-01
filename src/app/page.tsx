import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Radio, ChevronRight } from 'lucide-react';
import ChannelCard from '@/components/channels/ChannelCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SportaLive — Watch Live TV Free 🔴 Football, Sports, beIN Sports',
  description: '🔴 LIVE NOW — 600+ free HD sports & news channels. beIN Sports, MBC, Al Jazeera, RTVE. No subscription, no registration. بث مباشر مجاني الآن.',
};

export const revalidate = 3600;

async function getHomeData() {
  try {
    const [categories, totalChannels, featured] = await Promise.all([
      prisma.category.findMany({ where: { channelCount: { gt: 0 } }, orderBy: { channelCount: 'desc' }, take: 10 }),
      prisma.channel.count({ where: { isActive: true } }),
      prisma.channel.findMany({
        where: { isActive: true }, orderBy: { order: 'asc' }, take: 12,
        include: { category: { select: { name: true, slug: true } } },
      }),
    ]);
    const categoryChannels = await Promise.all(
      categories.slice(0, 5).map(async (cat) => ({
        category: cat,
        channels: await prisma.channel.findMany({
          where: { categoryId: cat.id, isActive: true }, orderBy: { order: 'asc' }, take: 10,
          include: { category: { select: { name: true, slug: true } } },
        }),
      }))
    );
    return { categories, totalChannels, featured, categoryChannels };
  } catch {
    return { categories: [], totalChannels: 0, featured: [], categoryChannels: [] };
  }
}

export default async function HomePage() {
  const { categories, totalChannels, featured, categoryChannels } = await getHomeData();
  const noData = totalChannels === 0;

  return (
    <div className="space-y-10">

      {/* ── HERO — bold red inspired by Arda Guler design ── */}
      <section className="relative rounded-2xl overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #7f1d1d 40%, #991b1b 70%, #450a0a 100%)', minHeight: '380px' }}>
        {/* Radial glow */}
        <div className="absolute top-0 right-0 w-2/3 h-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(255,60,60,0.3) 0%, transparent 60%)' }} />
        {/* Diagonal texture */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))' }} />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
          {/* Left — text */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                Live Now
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight">
              Watch Live TV<br />
              <span className="text-white/30">Free in HD</span>
            </h1>
            <p className="text-white/70 text-base max-w-md">
              {totalChannels > 0 ? `${totalChannels}+` : 'Thousands of'} live channels — sports, news, football, entertainment. No subscription, no registration.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/live"
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-black text-sm hover:bg-gray-100 transition-colors shadow-lg">
                <Radio className="w-4 h-4" />
                Watch Now
              </Link>
              <Link href="/world-cup-2026-live"
                className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-sm border border-white/30 text-white rounded-full font-bold text-sm hover:bg-black/60 transition-colors">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                WC2026 Live
              </Link>
            </div>
            {totalChannels > 0 && (
              <div className="flex gap-8 pt-2 border-t border-white/20">
                {[[`${totalChannels}+`, 'Live Channels'], [`${categories.length}+`, 'Categories'], ['24/7', 'Always Live']].map(([n, l]) => (
                  <div key={l}>
                    <p className="text-2xl font-black text-white">{n}</p>
                    <p className="text-white/50 text-xs uppercase tracking-wider">{l}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — WC2026 match card */}
          <div className="hidden md:flex flex-col gap-3">
            <div className="rounded-2xl overflow-hidden" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest">World Cup 2026</p>
                  <p className="text-white font-black text-sm mt-0.5">Opening Match — June 11</p>
                </div>
                <span className="flex items-center gap-1 px-2 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-[9px] font-black uppercase tracking-widest">
                  <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />Soon
                </span>
              </div>
              <Link href="/mexico-vs-south-africa-2026"
                className="flex items-center justify-between px-4 pb-4 pt-2 hover:bg-white/5 transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <img src="https://flagcdn.com/w80/mx.png" alt="Mexico" width={44} height={30} className="rounded shadow-lg" />
                  <span className="text-white text-xs font-bold">Mexico</span>
                </div>
                <div className="text-center">
                  <span className="text-white/20 font-black text-xl tracking-widest">VS</span>
                  <p className="text-red-400 text-[10px] font-black mt-1">SoFi Stadium · LA</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img src="https://flagcdn.com/w80/za.png" alt="South Africa" width={44} height={30} className="rounded shadow-lg" />
                  <span className="text-white text-xs font-bold">South Africa</span>
                </div>
              </Link>
            </div>
            {[
              { slug: 'brazil-vs-morocco-2026', home: 'Brazil', hf: 'br', away: 'Morocco', af: 'ma', date: 'Mon June 15' },
              { slug: 'germany-vs-curacao-2026', home: 'Germany', hf: 'de', away: 'Curaçao', af: 'cw', date: 'Mon June 15' },
            ].map(m => (
              <Link key={m.slug} href={`/${m.slug}`}
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
                style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-2">
                  <img src={`https://flagcdn.com/w40/${m.hf}.png`} alt={m.home} width={28} height={19} className="rounded" />
                  <span className="text-white text-xs font-bold">{m.home}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/20 text-xs font-black">VS</span>
                  <span className="text-gray-500 text-[10px]">{m.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs font-bold">{m.away}</span>
                  <img src={`https://flagcdn.com/w40/${m.af}.png`} alt={m.away} width={28} height={19} className="rounded" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Ghost text */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-1 pointer-events-none select-none overflow-hidden">
          <p className="text-white font-black uppercase leading-none"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', opacity: 0.07, letterSpacing: '-0.02em' }}>
            SPORTALIVE
          </p>
        </div>
      </section>

      {/* ── WC2026 Banner ── */}
      <section className="relative rounded-2xl overflow-hidden border border-red-500/20 p-5 md:p-6"
        style={{ background: 'linear-gradient(135deg, #1c0a0a 0%, #111 60%, #0a0a0a 100%)' }}>
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-red-400 text-xs font-black uppercase tracking-widest mb-1">🌍 Starting June 11, 2026</p>
            <h2 className="text-white font-black text-lg leading-tight">FIFA World Cup 2026 — Watch Every Match Free</h2>
            <p className="text-gray-500 text-sm mt-1">USA · Canada · Mexico · 48 teams · 104 matches · beIN Sport 1, M6, RMC Sport</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/world-cup-2026-live"
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-black rounded-full transition-colors whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Watch Live Free
            </Link>
            <Link href="/wc2026"
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold rounded-full transition-colors whitespace-nowrap">
              📅 Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* ── No data ── */}
      {noData && (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center border border-red-500/30">
            <Radio className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-black text-white">No channels yet</h2>
          <p className="text-gray-500 max-w-sm text-sm">Go to the Admin panel to sync your M3U playlist and start watching.</p>
          <Link href="/soufianski"
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold transition-colors">
            Go to Admin
          </Link>
        </div>
      )}

      {/* ── Featured Channels ── */}
      {featured.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full bg-red-600" />
              <h2 className="text-xl font-black text-white">Featured Channels</h2>
            </div>
            <Link href="/live" className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm font-semibold transition-colors">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {featured.map((channel, i) => (
              <ChannelCard key={channel.id} channel={channel as any} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ── Category rows ── */}
      {categoryChannels.map(({ category, channels }) =>
        channels.length > 0 ? (
          <section key={category.id}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 rounded-full bg-red-600" />
                <h2 className="text-xl font-black text-white">{category.name}</h2>
              </div>
              <Link href={`/category/${category.slug}`}
                className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm font-semibold transition-colors">
                View all ({category.channelCount}) <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="scroll-row">
              {channels.map((channel, i) => (
                <div key={channel.id} className="w-44 sm:w-52">
                  <ChannelCard channel={channel as any} index={i} />
                </div>
              ))}
            </div>
          </section>
        ) : null
      )}

      {/* ── Browse Categories ── */}
      {categories.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-red-600" />
            <h2 className="text-xl font-black text-white">Browse by Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.slug}`}
                className="group flex items-center justify-between p-4 rounded-xl border border-white/[0.06] hover:border-red-500/40 transition-all"
                style={{ background: '#111' }}>
                <span className="text-sm font-semibold text-gray-400 group-hover:text-white truncate transition-colors">
                  {cat.name}
                </span>
                <span className="text-xs text-gray-700 ml-2 flex-shrink-0">{cat.channelCount}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
