'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, Play, Tv2 } from 'lucide-react';
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.4), duration: 0.25 }}
      className="group"
    >
      <div className="card hover:border-red-600/50 hover:-translate-y-0.5 transition-all duration-200">

        {/* Thumbnail */}
        <Link href={`/channel/${channel.slug}`}
          className="block relative aspect-video overflow-hidden"
          style={{ background: '#0a0a0a' }}>
          {channel.logo && !imgError ? (
            <img
              src={channel.logo}
              alt={channel.name}
              className="object-contain w-full h-full p-3 transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <Tv2 className="w-8 h-8 text-white/10" />
              <span className="text-[10px] text-center px-2 text-white/20 line-clamp-2">{channel.name}</span>
            </div>
          )}

          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center shadow-xl shadow-red-900/60 scale-75 group-hover:scale-100 transition-transform duration-200">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
          </div>

          {/* LIVE badge */}
          <span className="live-badge absolute top-2 left-2 text-[9px]" style={{ paddingTop: '3px', paddingBottom: '3px' }}>
            Live
          </span>
        </Link>

        {/* Info */}
        <div className="px-3 py-2.5 flex items-center gap-2">
          <Link href={`/channel/${channel.slug}`} className="flex-1 min-w-0">
            <p className="text-white text-xs font-bold truncate group-hover:text-red-400 transition-colors">
              {channel.name}
            </p>
            <p className="text-white/30 text-[10px] truncate mt-0.5">{channel.groupTitle}</p>
          </Link>
          <button
            onClick={() => toggleFavorite(channel.id)}
            className={cn('p-1.5 rounded-lg transition-all flex-shrink-0',
              fav ? 'text-red-500 bg-red-500/10' : 'text-white/20 hover:text-red-500 hover:bg-red-500/10'
            )}>
            <Heart className={cn('w-3.5 h-3.5', fav && 'fill-current')} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
