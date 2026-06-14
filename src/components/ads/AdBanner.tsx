'use client';
import { useAdRefresh } from './useAdRefresh';

const KEY = 'df26d38cb80e4c6a441d5b2c6061053d';
const SRC = `https://www.highperformanceformat.com/${KEY}/invoke.js`;

// Each banner runs in a sandboxed iframe: the Adsterra script executes on the
// iframe's own thread, so it can never block the parent page's main thread.
const banner = (w: number, h: number) => `<!DOCTYPE html><html><head>
<style>*{margin:0;padding:0;overflow:hidden;background:transparent}</style>
</head><body>
<script>atOptions={'key':'${KEY}','format':'iframe','height':${h},'width':${w},'params':{}}</script>
<script src="${SRC}"></script>
</body></html>`;

export default function AdBanner() {
  // Re-keying the iframes remounts them → a fresh, counted Adsterra impression.
  // Happens on every route change AND every ~50s while the tab is visible.
  const adKey = useAdRefresh();

  return (
    <div
      // Reserve the exact slot height BEFORE the ad paints → zero layout shift
      // (CLS). 50px on mobile (320×50), 90px from sm up (728×90).
      className="w-full flex flex-col items-center justify-center gap-1 min-h-[50px] sm:min-h-[90px]"
      aria-label="Advertisement"
    >
      <span className="text-white/20 text-[9px] uppercase tracking-[0.25em] leading-none">Publicité</span>

      {/* Desktop 728×90 */}
      <iframe
        key={`d:${adKey}`}
        srcDoc={banner(728, 90)}
        width={728}
        height={90}
        scrolling="no"
        frameBorder={0}
        loading="lazy"
        className="hidden sm:block max-w-full"
        style={{ border: 'none', display: 'block', height: 90 }}
        title="Advertisement"
        sandbox="allow-scripts allow-same-origin"
      />
      {/* Mobile 320×50 */}
      <iframe
        key={`m:${adKey}`}
        srcDoc={banner(320, 50)}
        width={320}
        height={50}
        scrolling="no"
        frameBorder={0}
        loading="lazy"
        className="block sm:hidden"
        style={{ border: 'none', display: 'block', height: 50 }}
        title="Advertisement"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
