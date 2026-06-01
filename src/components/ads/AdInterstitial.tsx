'use client';
import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

const AD_HASH = '8c2948cd379e7f712c043acbbd7ad4dd';
const AD_SRC  = `https://pl29569991.effectivecpmnetwork.com/${AD_HASH}/invoke.js`;

export default function AdInterstitial({ onComplete }: Props) {
  const [seconds, setSeconds] = useState(5);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Load the ad script targeting the correct container ID
    const containerId = `container-${AD_HASH}`;
    if (!document.getElementById(containerId)) return;

    const s = document.createElement('script');
    s.src = AD_SRC;
    s.async = true;
    s.setAttribute('data-cfasync', 'false');
    s.onload = () => setAdLoaded(true);
    document.head.appendChild(s);
  }, []);

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
  // progress 0→100 over 5 seconds
  const progress = Math.round(((5 - seconds) / 5) * 100);

  return (
    <div className="relative min-h-[56vw] sm:min-h-0 sm:aspect-video rounded-xl sm:rounded-2xl overflow-hidden flex flex-col"
      style={{ background: '#000' }}>

      {/* Ad container — correct ID for effectivecpmnetwork */}
      <div id={`container-${AD_HASH}`}
        className="flex-1 w-full flex items-center justify-center overflow-hidden min-h-[200px]" />

      {/* Fallback placeholder if ad takes time to load */}
      {!adLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
          <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-red-600 animate-spin" />
          <p className="text-white/30 text-xs uppercase tracking-widest font-bold">Loading ad...</p>
        </div>
      )}

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2.5 z-10"
        style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.8),transparent)' }}>
        <span className="label-chip bg-white/10 text-white/50 text-[9px]">Advertisement</span>
        <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">SportaLive</span>
      </div>

      {/* Bottom bar — countdown + skip */}
      <div className="absolute bottom-0 left-0 right-0 z-10"
        style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.9),transparent)' }}>

        {/* Progress bar */}
        <div className="h-[2px] bg-white/10">
          <div className="h-full bg-red-600 transition-all duration-1000"
            style={{ width: `${progress}%` }} />
        </div>

        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white/50 text-xs">Stream starts in</span>
            <span className="text-white font-black text-sm tabular-nums">{seconds}s</span>
          </div>

          <button
            onClick={canSkip ? onComplete : undefined}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              canSkip
                ? 'bg-red-600 text-white hover:bg-red-500 cursor-pointer shadow-lg shadow-red-900/50'
                : 'bg-white/10 text-white/30 cursor-default'
            }`}
          >
            {canSkip ? '▶ Watch Now' : `Skip in ${seconds - 2}s`}
          </button>
        </div>
      </div>
    </div>
  );
}
