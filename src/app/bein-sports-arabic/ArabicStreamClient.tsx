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

export default function ArabicStreamClient({ servers }: { servers: Server[] }) {
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
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
            i === activeIdx
              ? 'bg-green-500 text-white shadow-lg shadow-green-900/40'
              : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
          {s.label}
          <span className="text-[10px] opacity-70">{s.sublabel}</span>
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
            <Link href="/live" className="text-green-400 hover:underline">تصفح جميع القنوات ←</Link>
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
          style={{ background: 'linear-gradient(135deg, #031a0e 0%, #052d18 50%, #031a0e 100%)' }}
        >
          {/* Grid dots */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          {/* Green glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 via-transparent to-transparent" />

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center gap-2 py-3 bg-black/40 backdrop-blur-sm border-b border-white/5">
            <span className="text-green-400 text-xs">✦</span>
            <span className="text-green-300 text-xs font-bold tracking-widest">بي إن سبورت عربي — بث مباشر مجاني</span>
            <span className="text-green-400 text-xs">✦</span>
          </div>

          {/* Live badge */}
          <div className="absolute top-14 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-red-600 rounded-full shadow-lg">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white text-xs font-black">مباشر الآن</span>
          </div>

          {/* Channel name */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 mt-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-green-800/60 to-green-950/80 border border-green-500/30 shadow-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <p className="text-green-300 text-lg md:text-2xl font-black">bein</p>
                <p className="text-white text-sm font-bold">SPORTS</p>
                <p className="text-green-400 text-xs mt-1">{active.sublabel}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm font-bold">{active.label}</p>
          </div>

          {/* Play button */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 pb-5 bg-gradient-to-t from-black/70 to-transparent pt-8">
            <button className="flex items-center gap-3 px-8 py-3 bg-green-500 hover:bg-green-400 text-white font-black rounded-full shadow-2xl group-hover:scale-105 transition-all text-sm uppercase tracking-wider">
              <Play className="w-5 h-5 fill-white flex-shrink-0" />
              شاهد الآن مجاناً
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
        <div className="px-4 py-2 bg-gray-900 border-b border-white/5 flex items-center justify-between" dir="rtl">
          <span className="flex items-center gap-1.5 text-red-400 text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            مباشر
          </span>
          <span className="text-green-300 text-xs font-bold">{active.label} — بي إن سبورت عربي</span>
        </div>
        <VideoPlayer channel={channel} autoPlay className="w-full" />
        <div className="bg-gray-900/80 px-4 py-2 flex items-center justify-between" dir="rtl">
          <Link href={`/channel/${channel.slug}`} className="text-green-400 hover:text-green-300 text-xs transition-colors">
            صفحة القناة الكاملة →
          </Link>
          <span className="text-xs text-gray-500">البث عبر {active.label}</span>
        </div>
      </div>
    </div>
  );
}
