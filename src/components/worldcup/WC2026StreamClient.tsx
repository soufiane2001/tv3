'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Play, Tv2 } from 'lucide-react';
import VideoPlayer from '@/components/player/VideoPlayer';
import AdInterstitial from '@/components/ads/AdInterstitial';
import MidrollAd from '@/components/ads/MidrollAd';
import PopunderEvery from '@/components/ads/PopunderEvery';
import type { Channel } from '@/types';

export interface WCServer {
  label: string;
  sublabel: string;
  channel: Channel | null;
}

export interface WCMatch {
  home: string;
  homeFlag: string;   // e.g. "mx"
  away: string;
  awayFlag: string;   // e.g. "za"
  date: string;       // e.g. "Thursday, 11 June 2026"
  time: string;       // e.g. "20:00 UTC"
  thirdFlag?: string;
  thirdName?: string;
}

interface Props {
  servers: WCServer[];
  match: WCMatch;
}

export default function WC2026StreamClient({ servers, match }: Props) {
  const [started, setStarted] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [midroll, setMidroll] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mid-roll ad every 5 minutes of watching.
  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => setMidroll(true), 5 * 60_000);
    return () => clearInterval(id);
  }, [started]);

  const active = servers[activeIdx] ?? servers[0];
  const channel = active?.channel ?? null;

  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  const handlePlayClick = () => { setShowAd(true); };
  const handleAdComplete = useCallback(() => { setShowAd(false); setStarted(true); }, []);

  const handleSwitch = (idx: number) => {
    setActiveIdx(idx);
    setStarted(false);
  };

  const handleStreamError = useCallback(() => {
    for (let offset = 1; offset < servers.length; offset++) {
      const nextIdx = (activeIdx + offset) % servers.length;
      if (servers[nextIdx].channel !== null) {
        showToast(`Switching to ${servers[nextIdx].label}…`);
        setActiveIdx(nextIdx);
        return;
      }
    }
    // All servers exhausted — stay on error screen
  }, [activeIdx, servers, showToast]);

  const StreamTabs = () => (
    <div className="flex gap-2 flex-wrap">
      {servers.map((s, i) => (
        <button
          key={i}
          onClick={() => handleSwitch(i)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            i === activeIdx
              ? 'bg-white text-gray-900 shadow-lg'
              : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
          {s.label}
        </button>
      ))}
    </div>
  );

  /* ── No channel available for active tab ── */
  if (!channel) {
    return (
      <div className="space-y-3">
        <StreamTabs />
        <div className="min-h-[56vw] sm:min-h-0 aspect-[3/2] sm:aspect-video bg-[#080d24] rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-4 border border-white/10">
          <Tv2 className="w-12 h-12 text-gray-600" />
          <p className="text-gray-400 text-sm text-center px-4 font-medium">Canal non disponible</p>
          <p className="text-gray-600 text-xs text-center px-4">
            Essayez un autre serveur ci-dessus ou revenez au moment du match.
          </p>
        </div>
      </div>
    );
  }

  /* ── Ad interstitial ── */
  if (showAd) {
    return (
      <div className="space-y-3">
        <StreamTabs />
        <AdInterstitial onComplete={handleAdComplete} />
      </div>
    );
  }

  /* ── Thumbnail / play screen ── */
  if (!started) {
    return (
      <div className="space-y-3">
        <StreamTabs />
        <div
          onClick={handlePlayClick}
          className="relative min-h-[56vw] sm:min-h-0 aspect-[3/2] sm:aspect-video rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group select-none"
          style={{ background: 'linear-gradient(135deg, #080d24 0%, #0e1a48 50%, #080d24 100%)' }}
        >
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />

          {/* Team colour glow halves */}
          <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-green-900/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-blue-900/20 via-transparent to-transparent pointer-events-none" />

          {/* Header bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center gap-2 py-2 bg-black/40 backdrop-blur-sm border-b border-white/5">
            <i className="fa-solid fa-trophy text-yellow-400 text-xs" />
            <span className="text-yellow-300 text-[10px] font-bold uppercase tracking-[0.25em]">FIFA World Cup 2026</span>
            <i className="fa-solid fa-trophy text-yellow-400 text-xs" />
          </div>

          {/* Live badge */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 bg-red-600 rounded-full shadow-lg shadow-red-900/50 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
            <span className="text-white text-[10px] font-black uppercase tracking-widest">LIVE</span>
          </div>

          {/* Teams display */}
          <div className="absolute inset-0 flex items-center justify-center mt-4">
            {match.thirdFlag ? (
              /* 3-host-nation layout */
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-4 md:gap-10">
                  {[
                    { flag: match.homeFlag, name: match.home },
                    { flag: match.awayFlag, name: match.away },
                    { flag: match.thirdFlag, name: match.thirdName ?? '' },
                  ].map((t, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                      <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/30 shadow-2xl bg-black/20 flex items-center justify-center">
                        <img src={`https://flagcdn.com/w80/${t.flag}.png`} alt={t.name} className="w-full h-full object-cover" loading="eager" />
                      </div>
                      <p className="text-white font-black text-[10px] md:text-xs uppercase tracking-wider text-center max-w-[72px]">{t.name}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-gray-400 text-[9px] md:text-[10px] text-center uppercase tracking-widest">{match.date}</p>
                  <p className="text-yellow-400 text-[9px] md:text-[10px] font-bold text-center">{match.time}</p>
                </div>
              </div>
            ) : (
              /* Standard 2-team layout */
              <div className="flex items-center gap-4 md:gap-12">
                {/* Home team */}
                <div className="flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                  <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/30 shadow-2xl bg-black/20 flex items-center justify-center">
                    <img src={`https://flagcdn.com/w80/${match.homeFlag}.png`} alt={match.home} className="w-full h-full object-cover" loading="eager" />
                  </div>
                  <p className="text-white font-black text-xs md:text-sm uppercase tracking-wider text-center max-w-[80px] md:max-w-[100px]">{match.home}</p>
                </div>
                {/* VS centre */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <p className="text-white/30 font-black text-xl md:text-3xl tracking-[0.4em]">VS</p>
                  <p className="text-gray-400 text-[9px] md:text-[10px] text-center uppercase tracking-widest">{match.date}</p>
                  <p className="text-yellow-400 text-[9px] md:text-[10px] font-bold text-center">{match.time}</p>
                </div>
                {/* Away team */}
                <div className="flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                  <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/30 shadow-2xl bg-black/20 flex items-center justify-center">
                    <img src={`https://flagcdn.com/w80/${match.awayFlag}.png`} alt={match.away} className="w-full h-full object-cover" loading="eager" />
                  </div>
                  <p className="text-white font-black text-xs md:text-sm uppercase tracking-wider text-center max-w-[80px] md:max-w-[100px]">{match.away}</p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom play button */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-2 pb-4 bg-gradient-to-t from-black/80 to-transparent pt-10">
            <button className="flex items-center gap-3 px-6 md:px-10 py-3 md:py-4 bg-white text-gray-900 font-black rounded-full shadow-2xl group-hover:scale-105 transition-all text-sm md:text-base uppercase tracking-wider">
              <Play className="w-5 h-5 fill-gray-900 flex-shrink-0" />
              Watch Free
            </button>
            <p className="text-gray-400 text-[10px] uppercase tracking-widest">{active.sublabel} · HD · No Registration</p>
          </div>

          {/* Hover shimmer */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-300" />
        </div>
      </div>
    );
  }

  /* ── Active player ── */
  return (
    <div className="space-y-3">
      {/* Real popunder ad every ~2 min while watching (fires on the viewer's next click). */}
      <PopunderEvery enabled={started} intervalMs={120_000} />
      <StreamTabs />
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 relative">
        <div className="px-4 py-2 bg-[#080d24] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-tower-broadcast text-red-400 text-xs" />
            <span className="text-yellow-300 text-[10px] font-bold uppercase tracking-[0.2em]">
              World Cup 2026 · {match.home} vs {match.away}
            </span>
          </div>
          <span className="flex items-center gap-1 text-red-400 text-[10px] font-bold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
            Live
          </span>
        </div>
        <VideoPlayer channel={channel} autoPlay paused={midroll} onError={handleStreamError} className="w-full" />
        {midroll && <MidrollAd onClose={() => setMidroll(false)} />}
        {toast && (
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white shadow-xl pointer-events-none"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse flex-shrink-0" />
            {toast}
          </div>
        )}
        <div className="bg-gray-900/80 px-4 py-2 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Streaming via {active.label} — FIFA World Cup 2026
          </span>
          <span className="text-gray-600 text-xs">{active.sublabel}</span>
        </div>
      </div>
    </div>
  );
}
