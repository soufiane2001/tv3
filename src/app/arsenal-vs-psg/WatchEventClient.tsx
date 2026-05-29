'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Play, Tv2, ExternalLink } from 'lucide-react';
import VideoPlayer from '@/components/player/VideoPlayer';
import type { Channel } from '@/types';

interface StreamOption {
  label: string;
  sublabel: string;
  channel: Channel | null;
}

export default function WatchEventClient({ streams }: { streams: StreamOption[] }) {
  const [started, setStarted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const active = streams[activeIdx] ?? streams[0];
  const channel = active?.channel ?? null;

  const handleSwitch = (idx: number) => {
    setActiveIdx(idx);
    setStarted(false);
  };

  const StreamTabs = () => (
    <div className="flex gap-2 flex-wrap">
      {streams.map((s, i) => (
        <button
          key={i}
          onClick={() => handleSwitch(i)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            i === activeIdx
              ? 'bg-white text-gray-900 shadow-lg'
              : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
          {s.label}
        </button>
      ))}
    </div>
  );

  if (!channel) {
    return (
      <div className="space-y-3">
        <StreamTabs />
        <div className="aspect-video bg-[#0a0f2e] rounded-2xl flex flex-col items-center justify-center gap-4 border border-[#1e3a6e]">
          <Tv2 className="w-12 h-12 text-gray-600" />
          <p className="text-gray-500 text-sm text-center px-4">
            Stream not yet available.{' '}
            <Link href="/live" className="text-blue-400 hover:underline">Browse all channels →</Link>
          </p>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="space-y-3">
        <StreamTabs />
        <div
          onClick={() => setStarted(true)}
          className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group select-none"
          style={{ background: 'linear-gradient(135deg, #0a0f2e 0%, #0d1442 50%, #0a0f2e 100%)' }}
        >
          {/* Star grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)`,
              backgroundSize: '36px 36px',
            }}
          />

          {/* UCL sparkle stars */}
          {['top-3 left-[8%]','top-6 right-[12%]','top-[18%] left-[22%]','top-[15%] right-[28%]',
            'bottom-8 left-[15%]','bottom-5 right-[18%]'].map((pos, i) => (
            <span key={i} className={`absolute ${pos} text-yellow-300/60 text-lg select-none`}
              style={{ animationDelay: `${i * 0.4}s` }}>✦</span>
          ))}

          {/* Team gradient halves */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 via-transparent to-transparent" />

          {/* Top header bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center gap-2 py-3 bg-black/30 backdrop-blur-sm border-b border-white/5">
            <span className="text-yellow-400 text-xs">✦</span>
            <span className="text-[#c8b87a] text-xs font-bold uppercase tracking-[0.25em]">UEFA Champions League Final 2026</span>
            <span className="text-yellow-400 text-xs">✦</span>
          </div>

          {/* Live badge */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 bg-red-600 rounded-full shadow-lg shadow-red-900/50">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
            <span className="text-white text-[10px] font-black uppercase tracking-widest">Live Now</span>
          </div>

          {/* Teams + trophy */}
          <div className="absolute inset-0 flex items-center justify-center mt-4">
            <div className="flex items-center gap-4 md:gap-10">
              <div className="text-center space-y-2 group-hover:scale-105 transition-transform duration-300">
                <div className="relative mx-auto w-16 h-16 md:w-24 md:h-24">
                  <div className="absolute inset-0 rounded-full bg-red-600/30 animate-pulse" />
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-red-600 to-red-900 border-2 border-red-400/60 shadow-2xl shadow-red-900/50 flex items-center justify-center">
                    <span className="text-2xl md:text-4xl">🔴</span>
                  </div>
                </div>
                <div>
                  <p className="text-white font-black text-sm md:text-base uppercase tracking-wider">Arsenal</p>
                  <p className="text-red-400 text-[10px] uppercase tracking-widest">England</p>
                </div>
              </div>

              <div className="text-center space-y-1 md:space-y-2">
                <div className="text-3xl md:text-5xl drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">🏆</div>
                <div className="text-white/20 font-black text-lg md:text-2xl tracking-[0.3em]">VS</div>
              </div>

              <div className="text-center space-y-2 group-hover:scale-105 transition-transform duration-300">
                <div className="relative mx-auto w-16 h-16 md:w-24 md:h-24">
                  <div className="absolute inset-0 rounded-full bg-blue-600/30 animate-pulse" />
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#003B7C] to-[#001440] border-2 border-blue-400/60 shadow-2xl shadow-blue-900/50 flex items-center justify-center">
                    <span className="text-2xl md:text-4xl">🔵</span>
                  </div>
                </div>
                <div>
                  <p className="text-white font-black text-sm md:text-base uppercase tracking-wider">PSG</p>
                  <p className="text-blue-400 text-[10px] uppercase tracking-widest">France</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: play button + info */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 pb-5 bg-gradient-to-t from-black/70 to-transparent pt-8">
            <button className="flex items-center gap-3 px-6 md:px-10 py-3 md:py-4 bg-white text-gray-900 font-black rounded-full shadow-2xl group-hover:scale-105 transition-all text-sm md:text-base uppercase tracking-wider">
              <Play className="w-5 h-5 fill-gray-900 flex-shrink-0" />
              Watch Free on {active.label}
            </button>
            <p className="text-gray-400 text-[10px] uppercase tracking-widest">{active.sublabel} · HD Quality · No Subscription</p>
          </div>

          {/* Hover shimmer */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-300" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <StreamTabs />
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
        <div className="px-4 py-2 bg-[#0a0f2e] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-xs">✦</span>
            <span className="text-[#c8b87a] text-[10px] font-bold uppercase tracking-[0.2em]">UCL Final 2026 · Arsenal vs PSG</span>
          </div>
          <span className="flex items-center gap-1 text-red-400 text-[10px] font-bold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />Live
          </span>
        </div>
        <VideoPlayer channel={channel} autoPlay className="w-full" />
        <div className="bg-gray-900/80 px-4 py-2 flex items-center justify-between">
          <span className="text-xs text-gray-500">Streaming via {active.label} — Champions League Final 2026</span>
          <Link href={`/channel/${channel.slug}`} className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-xs transition-colors">
            Full page <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
