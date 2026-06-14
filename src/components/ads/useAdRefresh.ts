'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Returns a key that changes on route change AND every `intervalMs` while the
// tab is visible. Re-keying an ad <iframe> remounts it, which re-runs the
// Adsterra script → a fresh, counted impression. Gated on tab visibility so a
// backgrounded tab doesn't rack up refreshes (cleaner for the ad network).
export function useAdRefresh(intervalMs = 50_000) {
  const pathname = usePathname();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (typeof document === 'undefined' || document.visibilityState === 'visible') {
        setTick(t => t + 1);
      }
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return `${pathname}:${tick}`;
}
