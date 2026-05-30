'use client';
import { useEffect } from 'react';

export default function AdBanner() {
  useEffect(() => {
    // Banner display ad (invoke.js)
    const s = document.createElement('script');
    s.src = 'https://pl29569991.effectivecpmnetwork.com/8c2948cd379e7f712c043acbbd7ad4dd/invoke.js';
    s.async = true;
    s.setAttribute('data-cfasync', 'false');
    document.head.appendChild(s);
  }, []);

  return (
    <div className="flex justify-center w-full overflow-hidden my-1">
      <div id="container-8c2948cd379e7f712c043acbbd7ad4dd" className="w-full flex justify-center" />
    </div>
  );
}
