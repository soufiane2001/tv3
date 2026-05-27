'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

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

  useEffect(() => {
    sessionId.current = getOrCreateSessionId();
  }, []);

  useEffect(() => {
    if (!sessionId.current) return;

    startRef.current = Date.now();
    const sid = sessionId.current;

    // Send pageview
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname, sessionId: sid, referrer: getReferrer() }),
      keepalive: true,
    }).catch(() => {});

    // Keep-alive ping every 30s (updates lastSeen for live visitor)
    if (pingRef.current) clearInterval(pingRef.current);
    pingRef.current = setInterval(() => {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: pathname, sessionId: sid }),
        keepalive: true,
      }).catch(() => {});
    }, 30_000);

    // Send duration when leaving
    const sendDuration = () => {
      const duration = Math.round((Date.now() - startRef.current) / 1000);
      if (duration < 2) return;
      navigator.sendBeacon('/api/analytics/track', JSON.stringify({ path: pathname, sessionId: sid, duration }));
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
