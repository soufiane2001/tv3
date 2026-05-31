'use client';
import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

export default function AdInterstitial({ onComplete }: Props) {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    // Load ad script
    const s = document.createElement('script');
    s.src = 'https://pl29569991.effectivecpmnetwork.com/8c2948cd379e7f712c043acbbd7ad4dd/invoke.js';
    s.async = true;
    s.setAttribute('data-cfasync', 'false');
    document.getElementById('interstitial-ad-slot')?.appendChild(s);

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) { clearInterval(interval); onComplete(); return 0; }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="relative min-h-[56vw] sm:min-h-0 sm:aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-gray-950 flex flex-col items-center justify-center border border-white/10">
      <div id="interstitial-ad-slot" className="w-full flex justify-center" />
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        <span className="text-gray-400 text-xs">Stream in</span>
        <button
          onClick={seconds <= 3 ? onComplete : undefined}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${seconds <= 3 ? 'bg-yellow-500 text-black cursor-pointer hover:bg-yellow-400' : 'bg-white/10 text-gray-400 cursor-default'}`}
        >
          {seconds > 3 ? `${seconds}s` : 'Watch ▶'}
        </button>
      </div>
      <p className="absolute top-3 left-3 text-[10px] text-gray-600 uppercase tracking-wider">Ad</p>
    </div>
  );
}
