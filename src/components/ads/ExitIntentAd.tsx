'use client';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

export default function ExitIntentAd() {
  const [visible, setVisible] = useState(false);
  const shown = useRef(false);
  const pathname = usePathname();

  const isAdmin = pathname.startsWith('/soufianski');

  const show = () => {
    if (shown.current || isAdmin) return;
    shown.current = true;
    setVisible(true);
    setTimeout(() => {
      const slot = document.getElementById('exit-intent-slot');
      if (!slot || slot.childElementCount > 0) return;
      (window as any).atOptions = {
        key: 'df26d38cb80e4c6a441d5b2c6061053d',
        format: 'iframe',
        height: 90,
        width: 728,
        params: {},
      };
      const s = document.createElement('script');
      s.src = 'https://www.highperformanceformat.com/df26d38cb80e4c6a441d5b2c6061053d/invoke.js';
      s.async = true;
      slot.appendChild(s);
    }, 100);
  };

  useEffect(() => {
    if (isAdmin) return;

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) show();
    };

    window.history.pushState(null, '', window.location.href);
    const onPopState = () => { show(); window.history.pushState(null, '', window.location.href); };

    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('popstate', onPopState);

    return () => {
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('popstate', onPopState);
    };
  }, [isAdmin]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) setVisible(false); }}>
      <div className="relative w-full max-w-3xl bg-gray-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-gray-950">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white text-sm font-bold">🔴 Match Live — Keep Watching!</span>
          </div>
          <button onClick={() => setVisible(false)}
            className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Ad slot */}
        <div id="exit-intent-slot" className="min-h-[90px] flex items-center justify-center bg-gray-950 overflow-x-auto" />

        {/* CTA */}
        <div className="px-4 py-3 bg-gray-900 border-t border-white/5 flex items-center justify-between gap-3">
          <p className="text-gray-400 text-xs">Stream continues for free</p>
          <button onClick={() => setVisible(false)}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-black rounded-full transition-colors whitespace-nowrap">
            Keep Watching ▶
          </button>
        </div>
      </div>
    </div>
  );
}
