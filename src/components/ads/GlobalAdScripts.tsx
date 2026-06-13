'use client';
import { useEffect } from 'react';

// Site-wide Adsterra scripts (popunder + push). Loaded ONCE per session and
// deferred to browser idle time, so they never block the main thread or compete
// with the initial render / LCP. The popunder is session-based (fires on click),
// so it must NOT be reloaded on route changes — only the banner refreshes per
// route (see AdBanner).
export default function GlobalAdScripts() {
  useEffect(() => {
    if ((window as any).__adsLoaded) return;
    if (location.pathname.startsWith('/soufianski')) return; // never on admin
    (window as any).__adsLoaded = true;

    const load = (src: string) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.defer = true;
      document.body.appendChild(s);
    };

    const boot = () => {
      load('https://pl29569993.effectivecpmnetwork.com/42/91/52/429152052b97974b4fd8908b60f3b3c4.js'); // popunder
      load('https://pl29569990.effectivecpmnetwork.com/ad/e2/98/ade298c922eaedb5fba3b5ce0d8565aa.js'); // push notifications
    };

    // Run after the page is idle so ad scripts never delay first paint / LCP.
    const ric = (window as any).requestIdleCallback as
      | ((cb: () => void, opts?: { timeout: number }) => number) | undefined;
    if (ric) ric(boot, { timeout: 3000 });
    else setTimeout(boot, 2000);
  }, []);

  return null;
}
