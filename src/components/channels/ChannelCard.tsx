'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useFavoritesStore } from '@/store/useStore';
import type { Channel } from '@/types';

interface ChannelCardProps {
  channel: Channel;
  index?: number;
}

export default function ChannelCard({ channel, index = 0 }: ChannelCardProps) {
  const [imgError, setImgError] = useState(false);
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const fav = isFavorite(channel.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.35, ease: 'easeOut' }}
      className="group"
    >
      <div
        className="relative flex flex-col rounded-3xl overflow-hidden border border-white/[0.08] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:border-white/[0.16]"
        style={{
          background: 'var(--card)',
          boxShadow: '0 8px 32px -8px rgba(0,0,0,0.5)',
        }}
      >

        {/* ── Top bar: category badge + favorite ── */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
            style={{ background: 'rgba(18,19,26,0.75)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <i className="bi bi-broadcast text-red-500" />
            Live
          </span>
          <button
            onClick={() => toggleFavorite(channel.id)}
            className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center transition-all',
              fav
                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                : 'text-white/30 hover:text-red-400 hover:bg-red-500/10 border border-white/[0.08]'
            )}
            style={{ backdropFilter: 'blur(8px)', background: fav ? undefined : 'rgba(18,19,26,0.75)' }}
          >
            <i className={cn('bi text-xs', fav ? 'bi-heart-fill' : 'bi-heart')} />
          </button>
        </div>

        {/* ── Logo zone — floating image style ── */}
        <Link href={`/channel/${channel.slug}`} className="block">
          <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{
              height: '140px',
              background: 'linear-gradient(160deg, var(--bg-2) 0%, var(--bg) 100%)',
            }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(ellipse at 50% 120%, rgba(224,0,27,0.12) 0%, transparent 70%)' }} />

            {/* Channel logo — floats like the shoe */}
            {channel.logo && !imgError ? (
              <img
                src={channel.logo}
                alt={channel.name}
                className="object-contain transition-all duration-400 group-hover:scale-110 group-hover:drop-shadow-2xl"
                style={{
                  maxHeight: '96px',
                  maxWidth: '80%',
                  filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.6))',
                }}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="icon-box icon-box-red !w-14 !h-14 !rounded-2xl">
                  <i className="bi bi-tv text-red-400 text-2xl" />
                </div>
                <span className="text-white/25 text-[10px] text-center px-4 line-clamp-1 leading-tight">
                  {channel.name}
                </span>
              </div>
            )}
          </div>
        </Link>

        {/* ── Divider line ── */}
        <div className="h-px mx-4" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* ── Info section ── */}
        <div className="px-4 pt-3 pb-4 flex flex-col gap-3">

          {/* Channel name + group */}
          <Link href={`/channel/${channel.slug}`} className="block space-y-0.5">
            <p className="text-white font-black text-sm uppercase tracking-wide leading-tight truncate
                          group-hover:text-red-400 transition-colors duration-200">
              {channel.name}
            </p>
            <p className="text-white/30 text-[10px] truncate leading-tight">
              {channel.groupTitle || 'Live TV'}
            </p>
          </Link>

          {/* Quality dots — inspired by colour swatches */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-white/30 text-[10px] font-semibold">HD</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-900/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
            </div>
            <span className="text-white/20 text-[10px] font-semibold uppercase tracking-wider">
              Free
            </span>
          </div>

          {/* CTA button — gradient inspired by Adidas card */}
          <Link href={`/channel/${channel.slug}`}
            className="flex items-center justify-center gap-2 py-2.5 rounded-2xl text-white text-xs font-black uppercase tracking-wider transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.97]"
            style={{
              background: 'linear-gradient(135deg, #E0001B 0%, #7C3AED 100%)',
              boxShadow: '0 4px 16px -4px rgba(224,0,27,0.4)',
            }}
          >
            <i className="bi bi-play-circle-fill text-sm" />
            Watch Live
          </Link>

        </div>
      </div>
    </motion.div>
  );
}
