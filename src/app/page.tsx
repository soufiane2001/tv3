import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Tv, Radio, ChevronRight, Zap } from 'lucide-react';
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
      prisma.category.findMany({
        where: { channelCount: { gt: 0 } },
        orderBy: { channelCount: 'desc' },
        take: 10,
      }),
      prisma.channel.count({ where: { isActive: true } }),
      prisma.channel.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
        take: 12,
        include: { category: { select: { name: true, slug: true } } },
      }),
    ]);

    const categoryChannels = await Promise.all(
      categories.slice(0, 5).map(async (cat) => ({
        category: cat,
        channels: await prisma.channel.findMany({
          where: { categoryId: cat.id, isActive: true },
          orderBy: { order: 'asc' },
          take: 10,
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
      {/* Hero */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/40 via-gray-900 to-blue-900/40 border border-white/5 p-8 md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.15),transparent_60%)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-purple-400 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>Live Streaming Platform</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            Watch Live TV<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Anywhere, Anytime
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-xl">
            Stream {totalChannels > 0 ? `${totalChannels}+` : 'thousands of'} live channels including sports, news, movies and entertainment.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/live"
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-purple-900/40"
            >
              <Radio className="w-5 h-5" />
              Watch Now
            </Link>
            <Link
              href="/live"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl font-semibold transition-colors"
            >
              Browse Channels
            </Link>
          </div>

          {totalChannels > 0 && (
            <div className="flex gap-6 mt-8 pt-8 border-t border-white/10">
              <div>
                <p className="text-2xl font-bold text-white">{totalChannels}+</p>
                <p className="text-gray-500 text-sm">Live Channels</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{categories.length}+</p>
                <p className="text-gray-500 text-sm">Categories</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-gray-500 text-sm">Always Live</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FIFA World Cup 2026 banner */}
      <section className="relative rounded-2xl overflow-hidden border border-green-500/20 p-5 md:p-7"
        style={{ background: 'linear-gradient(135deg,#0a2010 0%,#111827 60%,#0a1020 100%)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,197,94,0.08),transparent_60%)]" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-1">🌍 Coming June 11, 2026</p>
            <h2 className="text-white font-extrabold text-lg leading-tight">
              FIFA World Cup 2026 — Watch Every Match Free
            </h2>
            <p className="text-gray-400 text-sm mt-1">USA · Canada · Mexico · 48 teams · 104 matches · HD streams on M6, beIN Sports — no subscription</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/world-cup-2026-live"
              className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-xl transition-colors whitespace-nowrap">
              🔴 Watch Live Free
            </Link>
            <Link href="/wc2026"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap">
              📅 Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* No data prompt */}
      {noData && (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center">
            <Tv className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">No channels yet</h2>
          <p className="text-gray-500 max-w-sm">
            Go to the Admin panel to sync your M3U playlist and start watching.
          </p>
          <Link
            href="/soufianski"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-colors"
          >
            Go to Admin
          </Link>
        </div>
      )}

      {/* Featured Channels */}
      {featured.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Featured Channels</h2>
            <Link href="/live" className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-colors">
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

      {/* Category rows */}
      {categoryChannels.map(({ category, channels }) =>
        channels.length > 0 ? (
          <section key={category.id}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">{category.name}</h2>
              <Link
                href={`/category/${category.slug}`}
                className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-colors"
              >
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

      {/* Categories grid */}
      {categories.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="flex items-center justify-between p-4 bg-gray-800/60 hover:bg-gray-700/60 border border-white/5 hover:border-purple-500/30 rounded-xl transition-all duration-200 group"
              >
                <span className="text-sm font-medium text-gray-300 group-hover:text-white truncate transition-colors">
                  {cat.name}
                </span>
                <span className="text-xs text-gray-600 ml-2 flex-shrink-0">{cat.channelCount}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
