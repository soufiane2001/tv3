'use client';
import { useState } from 'react';
import { Play, Tv2 } from 'lucide-react';
import Link from 'next/link';
import VideoPlayer from '@/components/player/VideoPlayer';
import type { Channel } from '@/types';

interface Server { label: string; sublabel: string; channel: Channel | null; }

export default function ItalianStreamClient({ servers }: { servers: Server[] }) {
  const [started, setStarted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const active = servers[activeIdx] ?? servers[0];
  const channel = active?.channel ?? null;

  const Tabs = () => (
    <div className="flex gap-2 flex-wrap">
      {servers.map((s, i) => (
        <button key={i} onClick={() => { setActiveIdx(i); setStarted(false); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${i === activeIdx ? 'bg-yellow-500 text-black shadow-lg' : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'}`}>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          {s.label} <span className="text-[10px] opacity-60">{s.sublabel}</span>
        </button>
      ))}
    </div>
  );

  if (!channel) return (
    <div className="space-y-4"><Tabs />
      <div className="aspect-video bg-gray-900 rounded-2xl flex flex-col items-center justify-center gap-4 border border-white/5">
        <Tv2 className="w-12 h-12 text-gray-600" />
        <p className="text-gray-500 text-sm">Stream non disponibile. <Link href="/live" className="text-yellow-400 hover:underline">Vedi tutti i canali →</Link></p>
      </div>
    </div>
  );

  if (!started) return (
    <div className="space-y-4"><Tabs />
      <div onClick={() => setStarted(true)} className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group select-none bg-black">
        <img src="https://assets-fr.imgfoot.com/media/cache/642x382/psg-ars.jpg" alt="Arsenal vs PSG Finale Champions League 2026" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center gap-2 py-3 bg-black/50 backdrop-blur-sm border-b border-white/5">
          <span className="text-yellow-400 text-xs">✦</span>
          <span className="text-yellow-300 text-xs font-bold">Finale UEFA Champions League 2026</span>
          <span className="text-yellow-400 text-xs">✦</span>
        </div>
        <div className="absolute top-14 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-red-600 rounded-full">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white text-xs font-black">IN DIRETTA</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-2 pb-5 bg-gradient-to-t from-black/70 to-transparent pt-8">
          <button className="flex items-center gap-3 px-8 py-3 bg-white text-gray-900 font-black rounded-full shadow-2xl group-hover:scale-105 transition-all text-sm uppercase">
            <Play className="w-5 h-5 fill-gray-900" /> Guarda Gratis — {active.label}
          </button>
          <p className="text-gray-500 text-xs">Qualità HD · Senza abbonamento · Senza registrazione</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4"><Tabs />
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="px-4 py-2 bg-[#0a0f2e] border-b border-white/5 flex items-center justify-between">
          <span className="text-yellow-300 text-xs font-bold">Arsenal vs PSG — Finale Champions 2026 · {active.label}</span>
          <span className="flex items-center gap-1.5 text-red-400 text-xs font-bold"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />In Diretta</span>
        </div>
        <VideoPlayer channel={channel} autoPlay className="w-full" />
        <div className="bg-gray-900/80 px-4 py-2 flex items-center justify-between">
          <span className="text-xs text-gray-500">Streaming via {active.label}</span>
          <Link href={`/channel/${channel.slug}`} className="text-yellow-400 hover:text-yellow-300 text-xs">Pagina completa →</Link>
        </div>
      </div>
    </div>
  );
}
