'use client';

const KEY = 'df26d38cb80e4c6a441d5b2c6061053d';
const SRC = `https://www.highperformanceformat.com/${KEY}/invoke.js`;

const BANNER_HTML = `<!DOCTYPE html><html><head>
<style>*{margin:0;padding:0;overflow:hidden;background:transparent}</style>
</head><body>
<script>atOptions={'key':'${KEY}','format':'iframe','height':90,'width':728,'params':{}}</script>
<script src="${SRC}"></script>
</body></html>`;

const BANNER_MOBILE_HTML = `<!DOCTYPE html><html><head>
<style>*{margin:0;padding:0;overflow:hidden;background:transparent}</style>
</head><body>
<script>atOptions={'key':'${KEY}','format':'iframe','height':50,'width':320,'params':{}}</script>
<script src="${SRC}"></script>
</body></html>`;

export default function AdBanner() {
  return (
    <div className="flex justify-center items-center w-full py-1 overflow-hidden">
      {/* Desktop 728×90 */}
      <iframe
        srcDoc={BANNER_HTML}
        width={728}
        height={90}
        scrolling="no"
        frameBorder={0}
        className="hidden sm:block max-w-full"
        style={{ border: 'none', display: 'block' }}
        title="Advertisement"
        sandbox="allow-scripts allow-same-origin"
      />
      {/* Mobile 320×50 */}
      <iframe
        srcDoc={BANNER_MOBILE_HTML}
        width={320}
        height={50}
        scrolling="no"
        frameBorder={0}
        className="block sm:hidden"
        style={{ border: 'none', display: 'block' }}
        title="Advertisement"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
