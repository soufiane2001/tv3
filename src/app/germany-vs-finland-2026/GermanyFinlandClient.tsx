'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Tv2 } from 'lucide-react';
import VideoPlayer from '@/components/player/VideoPlayer';
import AdInterstitial from '@/components/ads/AdInterstitial';
import AdBanner from '@/components/ads/AdBanner';
import type { Channel } from '@/types';

export default function GermanyFinlandClient({ channel }: { channel: Channel | null }) {
  const [started, setStarted] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const handleAdComplete = useCallback(() => { setShowAd(false); setStarted(true); }, []);

  if (!channel) {
    return (
      <div className="min-h-[56vw] sm:min-h-0 aspect-[3/2] sm:aspect-video bg-[#0a0f1a] rounded-2xl flex flex-col items-center justify-center gap-4 border border-white/10">
        <Tv2 className="w-12 h-12 text-gray-600" />
        <p className="text-gray-400 text-sm text-center px-4">
          Stream starting soon.{' '}
          <Link href="/live" className="text-yellow-400 hover:underline">Browse all channels →</Link>
        </p>
      </div>
    );
  }

  if (showAd) return <AdInterstitial onComplete={handleAdComplete} />;

  if (!started) {
    return (
      <div
        onClick={() => setShowAd(true)}
        className="relative min-h-[56vw] sm:min-h-0 aspect-[3/2] sm:aspect-video rounded-2xl overflow-hidden cursor-pointer group select-none"
        style={{ background: 'linear-gradient(135deg, #0d1a0d 0%, #1a1a0d 50%, #0d0d1a 100%)' }}
      >
        {/* Grid */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

        {/* Country halves */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-blue-900/20 via-transparent to-transparent" />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center gap-2 py-2.5 bg-black/40 backdrop-blur-sm border-b border-white/5">
          <span className="text-[#c8b87a] text-xs font-bold uppercase tracking-[0.2em]">⚽ International Friendly · 31 May 2026</span>
        </div>

        {/* Live badge */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 bg-red-600 rounded-full shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-white text-[10px] font-black uppercase tracking-widest">Live Now</span>
        </div>

        {/* Teams */}
        <div className="absolute inset-0 flex items-center justify-center mt-6">
          <div className="flex items-center gap-4 md:gap-12">
            {/* Germany */}
            <div className="text-center space-y-2 group-hover:scale-105 transition-transform duration-300">
              <div className="relative mx-auto w-16 h-16 md:w-24 md:h-24">
                <div className="absolute inset-0 rounded-full bg-yellow-500/20 animate-pulse" />
                <div className="relative w-full h-full rounded-full bg-gradient-to-b from-black via-[#DD0000] to-[#FFCE00] border-2 border-yellow-400/50 shadow-2xl flex items-center justify-center">
                  <span className="text-3xl md:text-5xl">🦅</span>
                </div>
              </div>
              <div>
                <p className="text-white font-black text-sm md:text-lg uppercase tracking-wider">Germany</p>
                <p className="text-yellow-400 text-[10px] uppercase tracking-widest">Deutschland</p>
              </div>
            </div>

            {/* VS */}
            <div className="text-center space-y-1">
              <div className="text-4xl md:text-6xl">⚽</div>
              <div className="text-white/30 font-black text-lg tracking-[0.3em]">VS</div>
            </div>

            {/* Finland */}
            <div className="text-center space-y-2 group-hover:scale-105 transition-transform duration-300">
              <div className="relative mx-auto w-16 h-16 md:w-24 md:h-24">
                <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-pulse" />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-white to-gray-200 border-2 border-blue-400/50 shadow-2xl flex items-center justify-center">
                  <span className="text-3xl md:text-5xl">🇫🇮</span>
                </div>
              </div>
              <div>
                <p className="text-white font-black text-sm md:text-lg uppercase tracking-wider">Finland</p>
                <p className="text-blue-300 text-[10px] uppercase tracking-widest">Suomi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Play button */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-2 pb-5 bg-gradient-to-t from-black/80 to-transparent pt-10">
          <button className="flex items-center gap-3 px-8 py-3 bg-white text-gray-900 font-black rounded-full shadow-2xl group-hover:scale-105 transition-all text-sm uppercase tracking-wider">
            ▶ Watch Free — L'Équipe TV
          </button>
          <p className="text-gray-400 text-[10px] uppercase tracking-widest">HD · Free · No Registration</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-white text-xs font-bold uppercase tracking-wider">🔴 Live — L&apos;Équipe TV</span>
      </div>
      <VideoPlayer channel={channel} className="w-full rounded-xl" onError={() => setStarted(false)} />
      <AdBanner />
    </div>
  );
}
