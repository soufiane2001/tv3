'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Tv2 } from 'lucide-react';
import VideoPlayer from '@/components/player/VideoPlayer';
import AdInterstitial from '@/components/ads/AdInterstitial';
import AdBanner from '@/components/ads/AdBanner';
import type { Channel } from '@/types';

const DE_FLAG = 'https://flagcdn.com/w160/de.png';
const FI_FLAG = 'https://flagcdn.com/w160/fi.png';

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
        style={{ background: 'linear-gradient(135deg, #0a0e18 0%, #111827 100%)' }}
      >
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Color washes per side */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#DD0000]/15 via-transparent to-[#003580]/15" />

        {/* Top header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center gap-2 py-2.5 bg-black/50 backdrop-blur-sm border-b border-white/5">
          <span className="text-[#c8b87a] text-[11px] font-bold uppercase tracking-[0.22em]">
            ⚽ International Friendly · 31 May 2026
          </span>
        </div>

        {/* Live badge */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 bg-red-600 rounded-full shadow-lg shadow-red-900/50">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-white text-[10px] font-black uppercase tracking-widest">Live Now</span>
        </div>

        {/* Teams */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-6 md:gap-16 mt-4">

            {/* Germany */}
            <div className="text-center space-y-2.5 group-hover:scale-105 transition-transform duration-300">
              <div className="relative mx-auto w-20 h-20 md:w-28 md:h-28">
                <div className="absolute inset-0 rounded-full bg-yellow-400/10 animate-pulse" />
                <div className="relative w-full h-full rounded-full border-[3px] border-white/20 shadow-2xl overflow-hidden">
                  <img
                    src={DE_FLAG}
                    alt="Germany"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
              <div>
                <p className="text-white font-black text-sm md:text-xl uppercase tracking-wider drop-shadow">Germany</p>
                <p className="text-yellow-400/80 text-[10px] uppercase tracking-widest">Deutschland</p>
              </div>
            </div>

            {/* VS */}
            <div className="text-center flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-xl">
                <span className="text-white/40 font-black text-lg md:text-2xl tracking-widest">VS</span>
              </div>
            </div>

            {/* Finland */}
            <div className="text-center space-y-2.5 group-hover:scale-105 transition-transform duration-300">
              <div className="relative mx-auto w-20 h-20 md:w-28 md:h-28">
                <div className="absolute inset-0 rounded-full bg-blue-400/10 animate-pulse" />
                <div className="relative w-full h-full rounded-full border-[3px] border-white/20 shadow-2xl overflow-hidden">
                  <img
                    src={FI_FLAG}
                    alt="Finland"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
              <div>
                <p className="text-white font-black text-sm md:text-xl uppercase tracking-wider drop-shadow">Finland</p>
                <p className="text-blue-300/80 text-[10px] uppercase tracking-widest">Suomi</p>
              </div>
            </div>

          </div>
        </div>

        {/* Play button */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-2 pb-5 bg-gradient-to-t from-black/90 to-transparent pt-12">
          <button className="flex items-center gap-2.5 px-8 py-3 bg-white text-gray-900 font-black rounded-full shadow-2xl shadow-black/60 group-hover:scale-105 group-hover:bg-yellow-300 transition-all text-sm uppercase tracking-wider">
            ▶ Watch Free — L&apos;Équipe TV
          </button>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest">HD · Free · No Registration</p>
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
