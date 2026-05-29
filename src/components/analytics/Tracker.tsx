'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/** Returns true if the current browser looks like a bot / headless tool. */
function isBotClient(): boolean {
  try {
    const nav = navigator as any;
    const win = window as any;

    // Selenium / WebDriver automation
    if (nav.webdriver === true) return true;
    if (document.documentElement.getAttribute('webdriver')) return true;

    // PhantomJS
    if (win.callPhantom || win._phantom || win.phantom) return true;

    // Nightmare.js / electron-based headless
    if (win.__nightmare) return true;

    // Headless Chrome: chrome runtime missing
    if (/HeadlessChrome/i.test(navigator.userAgent)) return true;

    // Empty languages array (many headless browsers)
    if (Array.isArray(nav.languages) && nav.languages.length === 0) return true;

    // UA contains obvious bot keywords (client-side double-check)
    if (/bot|crawl|spider|headless|phantom|selenium|puppeteer|playwright/i.test(navigator.userAgent)) return true;

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

function getReferrer(): string {
  try {
    const ref = document.referrer;
    if (!ref) return '';
    const url = new URL(ref);
    // Only store external referrers
    if (url.hostname === window.location.hostname) return '';
    return url.hostname;
  } catch { return ''; }
}

export default function Tracker() {
  const pathname    = usePathname();
  const startRef    = useRef<number>(Date.now());
  const sessionId   = useRef<string>('');
  const pingRef     = useRef<NodeJS.Timeout | null>(null);
  const isBot       = useRef<boolean>(false);

  useEffect(() => {
    isBot.current = isBotClient();
    if (!isBot.current) sessionId.current = getOrCreateSessionId();
  }, []);

  useEffect(() => {
    if (isBot.current || !sessionId.current) return;

    startRef.current = Date.now();
    const sid = sessionId.current;

    // Send pageview
    fetch('/api/a', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname, sessionId: sid, referrer: getReferrer() }),
      keepalive: true,
    }).catch(() => {});

    // Keep-alive ping every 20s so the visitor stays within the 3-min live window
    if (pingRef.current) clearInterval(pingRef.current);
    pingRef.current = setInterval(() => {
      fetch('/api/a', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: pathname, sessionId: sid, ping: true }),
        keepalive: true,
      }).catch(() => {});
    }, 20_000);

    // Send duration when leaving — use Blob so sendBeacon sends application/json
    const sendDuration = () => {
      const duration = Math.round((Date.now() - startRef.current) / 1000);
      if (duration < 2) return;
      const blob = new Blob(
        [JSON.stringify({ path: pathname, sessionId: sid, duration })],
        { type: 'application/json' },
      );
      navigator.sendBeacon('/api/a', blob);
    };

    window.addEventListener('beforeunload', sendDuration);
    return () => {
      sendDuration();
      window.removeEventListener('beforeunload', sendDuration);
      if (pingRef.current) clearInterval(pingRef.current);
    };
  }, [pathname]);

  return null;
}
