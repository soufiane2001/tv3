'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, Tv2, ChevronLeft, Share2, Radio, Trophy } from 'lucide-react';
import VideoPlayer from '@/components/player/VideoPlayer';
import { useFavoritesStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import type { Channel } from '@/types';

interface EventOverride {
  title: string;
  description: string;
  keywords: string[];
}

interface Props {
  channel: Channel;
  related: Channel[];
  eventOverride?: EventOverride | null;
}

export default function ChannelPageClient({ channel, related, eventOverride }: Props) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const [imgError, setImgError] = useState(false);
  const fav = isFavorite(channel.id);

  const handleShare = async () => {
    try {
      await navigator.share({ title: channel.name, url: window.location.href });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col lg:flex-row">

      {/* ── Player column ─────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Back bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-gray-900/60 backdrop-blur">
          <Link href="/" className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </Link>
          <span className="text-gray-700">/</span>
          {channel.category && (
            <>
              <Link href={`/category/${channel.category.slug}`} className="text-gray-400 hover:text-purple-300 text-sm transition-colors truncate max-w-[120px]">
                {channel.category.name}
              </Link>
              <span className="text-gray-700">/</span>
            </>
          )}
          <span className="text-gray-300 text-sm truncate">{channel.name}</span>
        </div>

        {/* Event banner (shown when there's an active match) */}
        {eventOverride && (
          <div className="px-4 py-2 bg-gradient-to-r from-red-900/40 to-purple-900/40 border-b border-red-500/20 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <p className="text-yellow-300 text-xs font-semibold truncate">{eventOverride.title}</p>
            <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded animate-pulse flex-shrink-0">LIVE</span>
          </div>
        )}

        {/* Player */}
        <div className="w-full bg-black">
          <VideoPlayer channel={channel} className="w-full" />
        </div>

        {/* Channel info bar */}
        <div className="px-4 py-4 bg-gray-900/80 border-b border-white/5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {channel.logo && !imgError ? (
              <img src={channel.logo} alt={channel.name} className="w-full h-full object-contain p-1" onError={() => setImgError(true)} />
            ) : (
              <Tv2 className="w-5 h-5 text-gray-600" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-white font-bold text-lg leading-tight truncate">{channel.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded font-semibold uppercase tracking-wide">
                <Radio className="w-2.5 h-2.5" /> Live
              </span>
              {channel.category && (
                <Link href={`/category/${channel.category.slug}`} className="text-purple-400 hover:text-purple-300 text-xs transition-colors">
                  {channel.category.name}
                </Link>
              )}
              {eventOverride && (
                <span className="text-yellow-500 text-xs truncate hidden sm:inline">— {eventOverride.title.replace(/^[^\w]*/,'').split('—')[1]?.trim()}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => { toggleFavorite(channel.id); toast.success(fav ? 'Removed from favorites' : 'Added to favorites'); }}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all',
                fav ? 'bg-red-500/15 text-red-400 border-red-500/30' : 'bg-white/5 text-gray-400 hover:text-white border-white/10 hover:border-white/20'
              )}
            >
              <Heart className={cn('w-4 h-4', fav && 'fill-current')} />
              <span className="hidden sm:inline">{fav ? 'Saved' : 'Save'}</span>
            </button>
            <button onClick={handleShare} className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/20 transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile related */}
        {related.length > 0 && (
          <div className="lg:hidden px-4 py-6">
            <RelatedList channels={related} />
          </div>
        )}
      </div>

      {/* ── Related sidebar ───────────────────────────────── */}
      {related.length > 0 && (
        <aside className="hidden lg:flex flex-col w-80 xl:w-96 border-l border-white/5 bg-gray-900/40 overflow-y-auto max-h-screen sticky top-0">
          <div className="p-4 border-b border-white/5">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Related Channels</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {related.map(ch => (
              <RelatedChannelItem key={ch.id} channel={ch} isActive={ch.id === channel.id} />
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}

function RelatedList({ channels }: { channels: Channel[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Related Channels</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {channels.map(ch => <RelatedChannelItem key={ch.id} channel={ch} isActive={false} />)}
      </div>
    </div>
  );
}

function RelatedChannelItem({ channel, isActive }: { channel: Channel; isActive: boolean }) {
  const [imgError, setImgError] = useState(false);
  return (
    <Link
      href={`/channel/${channel.slug}`}
      className={cn(
        'flex items-center gap-3 p-3 rounded-xl border transition-all group',
        isActive ? 'bg-purple-600/20 border-purple-500/40' : 'bg-gray-800/40 hover:bg-gray-700/60 border-white/5 hover:border-purple-500/30'
      )}
    >
      <div className="w-14 h-10 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0 overflow-hidden">
        {channel.logo && !imgError ? (
          <img src={channel.logo} alt={channel.name} className="w-full h-full object-contain p-1" onError={() => setImgError(true)} />
        ) : (
          <Tv2 className="w-5 h-5 text-gray-600" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm font-medium truncate transition-colors', isActive ? 'text-purple-300' : 'text-gray-300 group-hover:text-white')}>
          {channel.name}
        </p>
        <p className="text-xs text-gray-600 truncate">{channel.groupTitle}</p>
      </div>
      <span className="text-[10px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded flex-shrink-0 font-semibold">LIVE</span>
    </Link>
  );
}
