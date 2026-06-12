'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function isBotClient(): boolean {
  try {
    const nav = navigator as any;
    const win = window as any;

    // Automation flags
    if (nav.webdriver === true) return true;
    if (document.documentElement.getAttribute('webdriver')) return true;
    if (win.callPhantom || win._phantom || win.phantom) return true;
    if (win.__nightmare) return true;
    if (win.domAutomation || win.domAutomationController) return true;
    if (win._selenium || win.__driver_evaluate || win.__webdriver_evaluate) return true;

    // Headless / known bot UA
    if (/HeadlessChrome/i.test(navigator.userAgent)) return true;
    if (/bot|crawl|spider|headless|phantom|selenium|puppeteer|playwright/i.test(navigator.userAgent)) return true;

    // No languages = headless default
    if (Array.isArray(nav.languages) && nav.languages.length === 0) return true;

    // Screen size 0 = no real display
    if (window.screen.width === 0 || window.screen.height === 0) return true;

    // sessionStorage unavailable = restricted environment
    try { sessionStorage.setItem('_t', '1'); sessionStorage.removeItem('_t'); }
    catch { return true; }

    return false;
  } catch { return false; }
}

function getOrCreateSessionId(): string {
  try {
    let sid = sessionStorage.getItem('_asid');
    if (!sid) {
      sid = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem('_asid', sid);
    }
    return sid;
  } catch { return 'anon'; }
}

// Persistent per-browser id (localStorage) — survives across sessions/visits,
// so we can tell new visitors from returning ones.
function getOrCreateVisitorId(): string {
  try {
    let vid = localStorage.getItem('_avid');
    if (!vid) {
      vid = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem('_avid', vid);
    }
    return vid;
  } catch { return 'anon'; }
}

function getReferrer(): string {
  try {
    const ref = document.referrer;
    if (!ref) return '';
    const url = new URL(ref);
    if (url.hostname === window.location.hostname) return '';
    return url.hostname;
  } catch { return ''; }
}

function beacon(payload: object) {
  navigator.sendBeacon('/api/a', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
}

export default function Tracker() {
  const pathname  = usePathname();
  const startRef  = useRef<number>(Date.now());
  const sidRef    = useRef<string>('');
  const vidRef    = useRef<string>('');
  const pingRef   = useRef<NodeJS.Timeout | null>(null);
  const isBotRef  = useRef<boolean>(false);

  useEffect(() => {
    isBotRef.current = isBotClient();
    if (!isBotRef.current) {
      sidRef.current = getOrCreateSessionId();
      vidRef.current = getOrCreateVisitorId();
    }
  }, []);

  useEffect(() => {
    if (isBotRef.current || !sidRef.current) return;

    startRef.current = Date.now();
    const sid  = sidRef.current;
    const vid  = vidRef.current;
    const path = pathname;

    // Initial pageview (carries the persistent visitor id so the server can
    // record the visitor and flag new vs returning).
    fetch('/api/a', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, sessionId: sid, visitorId: vid, referrer: getReferrer() }),
      keepalive: true,
    }).catch(() => {});

    // Keep-alive ping every 20s
    if (pingRef.current) clearInterval(pingRef.current);
    pingRef.current = setInterval(() => {
      fetch('/api/a', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, sessionId: sid, ping: true }),
        keepalive: true,
      }).catch(() => {});
    }, 20_000);

    // Tab/browser close — pagehide is reliable on mobile (iOS Safari ignores beforeunload)
    const onLeave = () => {
      if (pingRef.current) clearInterval(pingRef.current); // stop pings so they can't race the delete
      const duration = Math.round((Date.now() - startRef.current) / 1000);
      beacon({ path, sessionId: sid, leave: true, ...(duration >= 2 && { duration }) });
    };

    // SPA navigation cleanup: record duration only, keep live visitor alive (new page will re-register)
    const onNavigate = () => {
      const duration = Math.round((Date.now() - startRef.current) / 1000);
      if (duration >= 2) beacon({ path, sessionId: sid, duration });
    };

    window.addEventListener('pagehide', onLeave);
    window.addEventListener('beforeunload', onLeave); // desktop fallback
    return () => {
      onNavigate();
      window.removeEventListener('pagehide', onLeave);
      window.removeEventListener('beforeunload', onLeave);
      if (pingRef.current) clearInterval(pingRef.current);
    };
  }, [pathname]);

  return null;
}
