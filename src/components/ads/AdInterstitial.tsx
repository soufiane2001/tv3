'use client';
import { useEffect, useState } from 'react';

const KEY = 'df26d38cb80e4c6a441d5b2c6061053d';
const SRC = `https://www.highperformanceformat.com/${KEY}/invoke.js`;

const AD_728 = `<!DOCTYPE html><html><head>
<style>*{margin:0;padding:0;overflow:hidden;background:transparent}body{display:flex;align-items:center;justify-content:center;height:100vh}</style>
</head><body>
<script>atOptions={'key':'${KEY}','format':'iframe','height':90,'width':728,'params':{}}</script>
<script src="${SRC}"></script>
</body></html>`;

const AD_320 = `<!DOCTYPE html><html><head>
<style>*{margin:0;padding:0;overflow:hidden;background:transparent}body{display:flex;align-items:center;justify-content:center;height:100vh}</style>
</head><body>
<script>atOptions={'key':'${KEY}','format':'iframe','height':50,'width':320,'params':{}}</script>
<script src="${SRC}"></script>
</body></html>`;

interface Props { onComplete: () => void }

export default function AdInterstitial({ onComplete }: Props) {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) { clearInterval(interval); onComplete(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onComplete]);

  const canSkip = seconds <= 2;
  const progress = Math.round(((5 - seconds) / 5) * 100);

  return (
    <div className="relative min-h-[56vw] sm:min-h-0 sm:aspect-video rounded-xl sm:rounded-2xl overflow-hidden flex flex-col items-center justify-center"
      style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)' }}>

      {/* Adsterra banner — desktop */}
      <iframe
        srcDoc={AD_728}
        width={728}
        height={90}
        scrolling="no"
        frameBorder={0}
        className="hidden sm:block max-w-full"
        style={{ border: 'none' }}
        title="Advertisement"
        sandbox="allow-scripts allow-same-origin"
      />
      {/* Adsterra banner — mobile */}
      <iframe
        srcDoc={AD_320}
        width={320}
        height={50}
        scrolling="no"
        frameBorder={0}
        className="block sm:hidden"
        style={{ border: 'none' }}
        title="Advertisement"
        sandbox="allow-scripts allow-same-origin"
      />

      {/* Top label */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2.5 z-10"
        style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.85),transparent)' }}>
        <span className="text-white/25 text-[9px] font-bold uppercase tracking-widest">Advertisement</span>
        <span className="text-white/30 text-[9px] font-bold uppercase tracking-widest">SportaLive</span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-12 left-0 right-0 h-[2px] bg-white/10">
        <div className="h-full bg-red-600 transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }} />
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 z-10"
        style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.9),transparent)' }}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white/40 text-xs">Stream starts in</span>
          <span className="text-white font-black text-sm tabular-nums w-5 text-center">{seconds}</span>
        </div>
        <button
          onClick={canSkip ? onComplete : undefined}
          className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
            canSkip
              ? 'bg-red-600 text-white hover:bg-red-500 cursor-pointer shadow-lg shadow-red-900/50'
              : 'bg-white/10 text-white/25 cursor-default'
          }`}>
          {canSkip ? '▶ Watch Now' : `Skip in ${seconds - 2}s`}
        </button>
      </div>
    </div>
  );
}
