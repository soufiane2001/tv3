'use client';

const KEY = 'df26d38cb80e4c6a441d5b2c6061053d';
const SRC = `https://www.highperformanceformat.com/${KEY}/invoke.js`;

const AD_HTML = `<!DOCTYPE html><html><head>
<style>*{margin:0;padding:0;overflow:hidden;background:transparent}</style>
</head><body>
<script>atOptions={'key':'${KEY}','format':'iframe','height':250,'width':300,'params':{}}</script>
<script src="${SRC}"></script>
</body></html>`;

interface Props {
  className?: string;
}

export default function AdBanner300({ className = '' }: Props) {
  return (
    <div className={`flex justify-center items-center overflow-hidden ${className}`}>
      <iframe
        srcDoc={AD_HTML}
        width={300}
        height={250}
        scrolling="no"
        frameBorder={0}
        style={{ border: 'none', display: 'block' }}
        title="Advertisement"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
