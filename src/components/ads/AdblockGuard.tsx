'use client';
import { useCallback, useEffect, useState } from 'react';

// Bait requests that ad blockers reliably block. Google's adsbygoogle is on a
// CDN that is essentially never down, so if ALL of these fail (while online),
// it is almost certainly an ad blocker rather than a network glitch.
const BAIT_URLS = [
  'https://www.highperformanceformat.com/df26d38cb80e4c6a441d5b2c6061053d/invoke.js',
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
  'https://static.adsterratech.com/data.json',
];

async function networkBlocked(): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return false;
  const results = await Promise.all(
    BAIT_URLS.map(u =>
      fetch(u, { method: 'HEAD', mode: 'no-cors', cache: 'no-store' })
        .then(() => false)   // loaded → not blocked
        .catch(() => true),  // blocked / failed
    ),
  );
  return results.every(Boolean); // every bait blocked
}

// Cosmetic-filter check: ad blockers hide elements with these class names.
function baitElementBlocked(): boolean {
  const el = document.createElement('div');
  el.className = 'adsbox ad-banner ads adsbygoogle ad-placement pub_300x250 text-ad';
  el.style.cssText =
    'position:absolute!important;left:-9999px!important;top:-9999px!important;height:10px!important;width:10px!important;';
  el.innerHTML = '&nbsp;';
  document.body.appendChild(el);
  const blocked =
    el.offsetHeight === 0 ||
    el.clientHeight === 0 ||
    getComputedStyle(el).display === 'none' ||
    getComputedStyle(el).visibility === 'hidden';
  el.remove();
  return blocked;
}

async function detect(): Promise<boolean> {
  const net = await networkBlocked();
  return net || baitElementBlocked();
}

export default function AdblockGuard() {
  const [blocked, setBlocked] = useState(false);
  const [checking, setChecking] = useState(false);

  const run = useCallback(async () => {
    setChecking(true);
    // Give the ad scripts (and the blocker) a moment to act before deciding.
    await new Promise(r => setTimeout(r, 600));
    const isBlocked = await detect();
    setBlocked(isBlocked);
    setChecking(false);
  }, []);

  useEffect(() => { run(); }, [run]);

  // Lock background scroll while the wall is up.
  useEffect(() => {
    if (blocked) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [blocked]);

  if (!blocked) return null;

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 2147483647 }}
      className="flex items-center justify-center bg-black/95 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="max-w-md w-full rounded-2xl border border-red-600/30 bg-[#0d0d0d] p-7 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-600/15 text-3xl">
          🛑
        </div>
        <h2 className="text-white text-xl font-black">Bloqueur de publicité détecté</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          SportaLive est <strong className="text-white">100% gratuit</strong> grâce à la publicité.
          Désactive ton bloqueur (AdBlock, uBlock, Brave Shields…) sur ce site, puis recharge la page pour regarder.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-white/40">
          🇬🇧 Please disable your ad blocker to keep SportaLive free, then reload.<br />
          🇸🇦 الرجاء تعطيل مانع الإعلانات لمواصلة المشاهدة مجاناً، ثم أعد تحميل الصفحة.
        </p>
        <button
          onClick={() => window.location.reload()}
          disabled={checking}
          className="mt-6 w-full rounded-xl bg-red-600 px-5 py-3 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-red-500 disabled:opacity-60"
        >
          {checking ? 'Vérification…' : "J'ai désactivé — Recharger"}
        </button>
        <p className="mt-3 text-[11px] text-white/30">
          Comment faire : clique sur l'icône de ton bloqueur → « Désactiver sur ce site » / « Pause ».
        </p>
      </div>
    </div>
  );
}
