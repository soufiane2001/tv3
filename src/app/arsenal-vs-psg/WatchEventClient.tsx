'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Play, Tv2, ExternalLink } from 'lucide-react';
import VideoPlayer from '@/components/player/VideoPlayer';
import type { Channel } from '@/types';

export default function WatchEventClient({ channel }: { channel: Channel | null }) {
  const [started, setStarted] = useState(false);

  if (!channel) {
    return (
      <div className="aspect-video bg-gray-900 rounded-2xl flex flex-col items-center justify-center gap-4 border border-white/10">
        <Tv2 className="w-12 h-12 text-gray-600" />
        <p className="text-gray-500">Channel not yet available. <Link href="/live" className="text-purple-400 hover:underline">Browse all channels</Link></p>
      </div>
    );
  }

  if (!started) {
    return (
      <div
        className="relative aspect-video bg-gray-900 rounded-2xl flex flex-col items-center justify-center gap-6 border border-red-500/20 cursor-pointer group overflow-hidden"
        onClick={() => setStarted(true)}
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.1),transparent_70%)]" />

        {/* Teams */}
        <div className="relative flex items-center gap-6 md:gap-12">
          <div className="text-center">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-red-600/20 border-2 border-red-500/40 flex items-center justify-center mx-auto mb-2">
              <span className="text-3xl md:text-4xl">🔴</span>
            </div>
            <p className="text-white font-bold text-sm md:text-lg">Arsenal</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs mb-1">UEFA Champions League Final</p>
            <div className="text-2xl md:text-4xl font-black text-white">VS</div>
            <div className="mt-1 px-2 py-0.5 bg-red-500/20 rounded text-red-400 text-xs font-bold animate-pulse">LIVE</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-blue-600/20 border-2 border-blue-500/40 flex items-center justify-center mx-auto mb-2">
              <span className="text-3xl md:text-4xl">🔵</span>
            </div>
            <p className="text-white font-bold text-sm md:text-lg">PSG</p>
          </div>
        </div>

        {/* Play button */}
        <button className="relative flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl shadow-2xl shadow-red-900/50 transition-all group-hover:scale-105 text-lg">
          <Play className="w-6 h-6 fill-white" />
          Watch Live Free — La 1
        </button>

        <p className="relative text-gray-600 text-xs">Click to start stream · HD quality · No subscription</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
      <VideoPlayer channel={channel} autoPlay className="w-full" />
      <div className="bg-gray-900/80 px-4 py-2 flex items-center justify-between">
        <span className="text-xs text-gray-500">Streaming via La 1 — Champions League Final 2026</span>
        <Link href={`/channel/${channel.slug}`} className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-xs transition-colors">
          Full page <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
