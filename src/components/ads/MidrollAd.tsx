'use client';
import { useEffect, useState } from 'react';

// Mid-roll ad shown over the player every few minutes of watching. Uses the
// Adsterra banner (in-page = never blocked by popup blockers, unlike a real
// window.open popup which browsers block without a user gesture).
const KEY = 'df26d38cb80e4c6a441d5b2c6061053d';
const SRC = `https://www.highperformanceformat.com/${KEY}/invoke.js`;
const ad = (w: number, h: number) => `<!DOCTYPE html><html><head>
<style>*{margin:0;padding:0;overflow:hidden;background:transparent}body{display:flex;align-items:center;justify-content:center;height:100vh}</style>
</head><body>
<script>atOptions={'key':'${KEY}','format':'iframe','height':${h},'width':${w},'params':{}}</script>
<script src="${SRC}"></script>
</body></html>`;

export default function MidrollAd({ onClose, countdown = 8 }: { onClose: () => void; countdown?: number }) {
  const [s, setS] = useState(countdown);

  useEffect(() => {
    const t = setInterval(() => setS(p => (p <= 1 ? (clearInterval(t), 0) : p - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const canClose = s <= 0;

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-black/95 backdrop-blur-sm">
      <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Advertisement</span>

      <iframe srcDoc={ad(728, 90)} width={728} height={90} scrolling="no" frameBorder={0}
        className="hidden sm:block max-w-full" style={{ border: 'none' }} title="Advertisement"
        sandbox="allow-scripts allow-same-origin" />
      <iframe srcDoc={ad(320, 50)} width={320} height={50} scrolling="no" frameBorder={0}
        className="block sm:hidden" style={{ border: 'none' }} title="Advertisement"
        sandbox="allow-scripts allow-same-origin" />

      <button
        onClick={canClose ? onClose : undefined}
        disabled={!canClose}
        className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
          canClose ? 'bg-red-600 text-white hover:bg-red-500 cursor-pointer shadow-lg shadow-red-900/50'
                   : 'bg-white/10 text-white/30 cursor-default'
        }`}>
        {canClose ? '▶ Continue watching' : `Continue in ${s}s`}
      </button>
    </div>
  );
}
