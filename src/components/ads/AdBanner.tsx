'use client';
import { useEffect } from 'react';

function loadScript(src: string, attrs?: Record<string, string>) {
  const s = document.createElement('script');
  s.src = src;
  s.async = true;
  if (attrs) Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
}

export default function AdBanner() {
  useEffect(() => {
    (window as any).atOptions = {
      key: 'df26d38cb80e4c6a441d5b2c6061053d',
      format: 'iframe',
      height: 90,
      width: 728,
      params: {},
    };
    loadScript('https://www.highperformanceformat.com/df26d38cb80e4c6a441d5b2c6061053d/invoke.js');
    loadScript('https://pl29569993.effectivecpmnetwork.com/42/91/52/429152052b97974b4fd8908b60f3b3c4.js');
    loadScript('https://pl29569991.effectivecpmnetwork.com/8c2948cd379e7f712c043acbbd7ad4dd/invoke.js', { 'data-cfasync': 'false' });
    loadScript('https://pl29569990.effectivecpmnetwork.com/ad/e2/98/ade298c922eaedb5fba3b5ce0d8565aa.js');
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 w-full overflow-hidden">
      {/* 728×90 leaderboard injected by highperformanceformat */}
      <div className="w-full flex justify-center" />
      {/* effectivecpmnetwork container */}
      <div id="container-8c2948cd379e7f712c043acbbd7ad4dd" className="w-full flex justify-center" />
    </div>
  );
}
