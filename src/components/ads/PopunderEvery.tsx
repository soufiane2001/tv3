'use client';
import { useEffect, useRef } from 'react';

// Real popunder ad opened every ~2 min of streaming. Browsers BLOCK window.open
// on a bare timer (no user gesture), so we ARM a flag every `intervalMs` and
// fire the popunder on the viewer's NEXT click (a genuine gesture → not
// blocked). During a live match viewers click the player/page often, so it
// lands roughly every 2 min. Paste your Adsterra Direct Link below.
const DIRECT_LINK = 'https://www.effectivecpmnetwork.com/jq97y8476?key=5ec0e0d291bbb0478b835617c8b2c877';

export default function PopunderEvery({ enabled, intervalMs = 120_000 }: { enabled: boolean; intervalMs?: number }) {
  const armed = useRef(false);
  const lastFire = useRef(0);

  useEffect(() => {
    if (!enabled) { armed.current = false; return; }
    if (!DIRECT_LINK || DIRECT_LINK.startsWith('PASTE_')) return; // not configured yet

    // Arm a popunder once per interval; it fires on the next real click.
    const id = setInterval(() => { armed.current = true; }, intervalMs);

    const onClick = () => {
      if (!armed.current) return;
      const now = Date.now();
      if (now - lastFire.current < intervalMs - 5_000) return; // throttle: ~1 per interval
      armed.current = false;
      lastFire.current = now;
      try {
        const w = window.open(DIRECT_LINK, '_blank', 'noopener');
        // Popunder: send the ad behind, keep the match in front where possible.
        if (w) { try { w.blur(); } catch { /* cross-origin */ } window.focus(); }
      } catch { /* popup blocked — try again next interval */ }
    };

    // Capture phase so we catch the click even if the player stops propagation.
    document.addEventListener('click', onClick, true);
    return () => { clearInterval(id); document.removeEventListener('click', onClick, true); };
  }, [enabled, intervalMs]);

  return null;
}
