'use client';
import { useEffect } from 'react';

// Loads popunder + push scripts once per session globally.
// Placed in layout so they fire on every page regardless of AdBanner placement.
export default function GlobalAdScripts() {
  useEffect(() => {
    if ((window as any).__adsLoaded) return;
    (window as any).__adsLoaded = true;

    const load = (src: string, attrs?: Record<string, string>) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      if (attrs) Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
      document.head.appendChild(s);
    };

    // Popunder — fires on first click (highest CPM on streaming sites)
    load('https://pl29569993.effectivecpmnetwork.com/42/91/52/429152052b97974b4fd8908b60f3b3c4.js');
    // Push notification ads
    load('https://pl29569990.effectivecpmnetwork.com/ad/e2/98/ade298c922eaedb5fba3b5ce0d8565aa.js');
  }, []);

  return null;
}
