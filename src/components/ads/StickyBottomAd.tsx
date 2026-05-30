'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function StickyBottomAd() {
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/soufianski');

  useEffect(() => {
    if (isAdmin) return;
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
    document.getElementById('sticky-ad-slot')?.appendChild(s);
  }, [isAdmin]);

  if (!visible || isAdmin) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center bg-gray-950/95 border-t border-white/10 shadow-2xl"
      style={{ minHeight: '90px' }}>
      <div id="sticky-ad-slot" className="flex justify-center items-center w-full max-w-[728px]" />
      <button
        onClick={() => setVisible(false)}
        className="absolute top-1 right-2 text-gray-600 hover:text-gray-400 text-xs px-2 py-0.5 rounded transition-colors"
        aria-label="Fermer"
      >
        ✕
      </button>
    </div>
  );
}
