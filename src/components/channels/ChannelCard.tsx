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
      transition={{ delay: Math.min(index * 0.04, 0.5), duration: 0.3 }}
      className="group relative"
    >
      <div className="relative bg-gray-800/60 backdrop-blur rounded-xl overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20">
        {/* Thumbnail — full link to watch page */}
        <Link href={`/channel/${channel.slug}`} className="block relative aspect-video bg-gray-900 overflow-hidden">
          {channel.logo && !imgError ? (
            <img
              src={channel.logo}
              alt={channel.name}
              className="object-contain w-full h-full p-4 transition-transform duration-300 group-hover:scale-110"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-600">
              <Tv2 className="w-10 h-10" />
              <span className="text-xs text-center px-2 text-gray-500 line-clamp-2">{channel.name}</span>
            </div>
          )}

          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-12 h-12 rounded-full bg-purple-600/90 flex items-center justify-center shadow-lg shadow-purple-900/50 scale-75 group-hover:scale-100 transition-transform duration-200">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>

          {/* LIVE badge */}
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded uppercase tracking-wider">
            Live
          </span>
        </Link>

        {/* Info row */}
        <div className="p-3 flex items-center gap-2">
          <Link href={`/channel/${channel.slug}`} className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate hover:text-purple-300 transition-colors">
              {channel.name}
            </p>
            <p className="text-gray-500 text-xs truncate mt-0.5">{channel.groupTitle}</p>
          </Link>

          <button
            onClick={() => toggleFavorite(channel.id)}
            className={cn(
              'p-1.5 rounded-lg transition-all duration-200 flex-shrink-0',
              fav
                ? 'text-red-400 bg-red-400/10'
                : 'text-gray-500 hover:text-red-400 hover:bg-red-400/10'
            )}
          >
            <Heart className={cn('w-4 h-4', fav && 'fill-current')} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
