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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.35), duration: 0.3, ease: 'easeOut' }}
      className="group"
    >
      <div className="card-float hover:border-red-600/30 transition-all duration-250">

        {/* Thumbnail */}
        <Link href={`/channel/${channel.slug}`}
          className="block relative aspect-video"
          style={{ background: '#080808' }}>
          {channel.logo && !imgError ? (
            <img
              src={channel.logo}
              alt={channel.name}
              className="object-contain w-full h-full p-3
                         transition-transform duration-300 group-hover:scale-[1.07]"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-1.5">
              <Tv2 className="w-7 h-7 text-white/8" />
              <span className="text-[9px] text-white/15 text-center px-2 line-clamp-2 leading-tight">
                {channel.name}
              </span>
            </div>
          )}

          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/65 flex items-center justify-center
                          opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center
                            shadow-xl shadow-red-900/60
                            scale-75 group-hover:scale-100 transition-transform duration-250">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
          </div>

          {/* LIVE badge */}
          <span className="live-badge absolute top-2 left-2 text-[9px]"
                style={{ padding: '3px 8px' }}>
            Live
          </span>
        </Link>

        {/* Info */}
        <div className="px-3 py-2.5 flex items-center gap-2"
             style={{ background: '#111' }}>
          <Link href={`/channel/${channel.slug}`} className="flex-1 min-w-0">
            <p className="text-white text-xs font-bold truncate
                          group-hover:text-red-400 transition-colors duration-150 leading-tight">
              {channel.name}
            </p>
            <p className="text-white/25 text-[10px] truncate mt-0.5 leading-tight">
              {channel.groupTitle}
            </p>
          </Link>
          <button
            onClick={() => toggleFavorite(channel.id)}
            className={cn(
              'p-1.5 rounded-lg transition-all flex-shrink-0',
              fav
                ? 'text-red-500 bg-red-500/10'
                : 'text-white/15 hover:text-red-500 hover:bg-red-500/10'
            )}>
            <Heart className={cn('w-3.5 h-3.5', fav && 'fill-current')} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
