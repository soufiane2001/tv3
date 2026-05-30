'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Play, Tv2 } from 'lucide-react';
import VideoPlayer from '@/components/player/VideoPlayer';
import type { Channel } from '@/types';

interface Server {
  label: string;
  sublabel: string;
  channel: Channel | null;
}

export default function ArabicMatchClient({ servers }: { servers: Server[] }) {
  const [started, setStarted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const active = servers[activeIdx] ?? servers[0];
  const channel = active?.channel ?? null;

  const handleSwitch = (idx: number) => {
    setActiveIdx(idx);
    setStarted(false);
  };

  const Tabs = () => (
    <div className="flex gap-2 flex-wrap justify-end" dir="rtl">
      {servers.map((s, i) => (
        <button
          key={i}
          onClick={() => handleSwitch(i)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
            i === activeIdx
              ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-900/40'
              : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
          {s.label}
          <span className="text-[10px] opacity-60">{s.sublabel}</span>
        </button>
      ))}
    </div>
  );

  if (!channel) {
    return (
      <div className="space-y-4" dir="rtl">
        <Tabs />
        <div className="aspect-video bg-gray-900 rounded-2xl flex flex-col items-center justify-center gap-4 border border-white/5">
          <Tv2 className="w-12 h-12 text-gray-600" />
          <p className="text-gray-500 text-sm text-center">
            البث غير متاح حالياً.{' '}
            <Link href="/live" className="text-yellow-400 hover:underline">تصفح جميع القنوات ←</Link>
          </p>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="space-y-4" dir="rtl">
        <Tabs />
        <div
          onClick={() => setStarted(true)}
          className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group select-none"
          style={{ background: 'linear-gradient(135deg, #05091a 0%, #0d1442 50%, #05091a 100%)' }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.7) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute left-0 inset-y-0 w-1/2 bg-gradient-to-r from-red-900/25 to-transparent" />
          <div className="absolute right-0 inset-y-0 w-1/2 bg-gradient-to-l from-blue-900/25 to-transparent" />

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center gap-2 py-3 bg-black/40 backdrop-blur-sm border-b border-white/5">
            <span className="text-yellow-400 text-xs">✦</span>
            <span className="text-yellow-300 text-xs font-bold tracking-widest">نهائي دوري أبطال أوروبا 2026</span>
            <span className="text-yellow-400 text-xs">✦</span>
          </div>

          {/* Live badge */}
          <div className="absolute top-14 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-red-600 rounded-full shadow-lg">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white text-xs font-black">مباشر الآن</span>
          </div>

          {/* Teams */}
          <div className="absolute inset-0 flex items-center justify-center mt-6">
            <div className="flex items-center gap-6 md:gap-14">
              <div className="text-center space-y-2 group-hover:scale-105 transition-transform duration-300">
                <div className="relative mx-auto w-16 h-16 md:w-24 md:h-24">
                  <div className="absolute inset-0 rounded-full bg-red-600/30 animate-pulse" />
                  <div className="relative w-full h-full rounded-full bg-white/5 border-2 border-red-400/60 shadow-xl flex items-center justify-center overflow-hidden">
                    <img src="/logos/arsenal.svg" alt="ارسنال" className="w-12 h-12 md:w-18 md:h-18 object-contain" />
                  </div>
                </div>
                <p className="text-white font-black text-sm md:text-base">ارسنال</p>
              </div>

              <div className="text-center">
                <div className="text-3xl md:text-5xl drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">🏆</div>
                <div className="text-white/20 font-black text-lg md:text-2xl tracking-[0.3em] mt-1">ضد</div>
              </div>

              <div className="text-center space-y-2 group-hover:scale-105 transition-transform duration-300">
                <div className="relative mx-auto w-16 h-16 md:w-24 md:h-24">
                  <div className="absolute inset-0 rounded-full bg-blue-600/30 animate-pulse" />
                  <div className="relative w-full h-full rounded-full bg-white/5 border-2 border-blue-400/60 shadow-xl flex items-center justify-center overflow-hidden">
                    <img src="/logos/psg.svg" alt="باريس سان جيرمان" className="w-12 h-12 md:w-18 md:h-18 object-contain" />
                  </div>
                </div>
                <p className="text-white font-black text-sm md:text-base">باريس</p>
              </div>
            </div>
          </div>

          {/* Play */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-2 pb-5 bg-gradient-to-t from-black/70 to-transparent pt-8">
            <button className="flex items-center gap-3 px-8 py-3 bg-white text-gray-900 font-black rounded-full shadow-2xl group-hover:scale-105 transition-all text-sm uppercase tracking-wider">
              <Play className="w-5 h-5 fill-gray-900 flex-shrink-0" />
              شاهد مجاناً — {active.label}
            </button>
            <p className="text-gray-500 text-xs">جودة HD · بدون اشتراك · بدون تسجيل</p>
          </div>

          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4" dir="rtl">
      <Tabs />
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="px-4 py-2 bg-[#0a0f2e] border-b border-white/5 flex items-center justify-between" dir="rtl">
          <span className="flex items-center gap-1.5 text-red-400 text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            مباشر
          </span>
          <span className="text-yellow-300 text-xs font-bold">ارسنال ضد باريس — نهائي أبطال أوروبا 2026 · {active.label}</span>
        </div>
        <VideoPlayer channel={channel} autoPlay className="w-full" />
        <div className="bg-gray-900/80 px-4 py-2 flex items-center justify-between" dir="rtl">
          <Link href={`/channel/${channel.slug}`} className="text-yellow-400 hover:text-yellow-300 text-xs transition-colors">
            صفحة القناة الكاملة →
          </Link>
          <span className="text-xs text-gray-500">البث عبر {active.label}</span>
        </div>
      </div>
    </div>
  );
}
