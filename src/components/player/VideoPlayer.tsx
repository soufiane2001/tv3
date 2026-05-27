'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RefreshCw,
  X,
  Wifi,
  WifiOff,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Channel, PlayerState } from '@/types';

interface VideoPlayerProps {
  channel: Channel;
  onClose?: () => void;
  autoPlay?: boolean;
  className?: string;
}

export default function VideoPlayer({ channel, onClose, autoPlay = true, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimer = useRef<NodeJS.Timeout | null>(null);

  const [state, setState] = useState<PlayerState>('loading');
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(true);

  const streamUrl = `/api/stream/${channel.id}`;

  const initPlayer = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setState('loading');

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
        maxBufferSize: 30 * 1024 * 1024,
        maxBufferLength: 30,
      });

      hlsRef.current = hls;
      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setState('playing');
        if (autoPlay) video.play().catch(() => setState('paused'));
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setState('error');
        } else if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          hls.startLoad();
        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          hls.recoverMediaError();
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        setState('playing');
        if (autoPlay) video.play().catch(() => setState('paused'));
      });
    }
  }, [streamUrl, autoPlay]);

  useEffect(() => {
    initPlayer();
    return () => {
      hlsRef.current?.destroy();
    };
  }, [initPlayer]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const scheduleHideControls = useCallback(() => {
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    scheduleHideControls();
  }, [scheduleHideControls]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setState('playing');
    } else {
      video.pause();
      setState('paused');
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      await container.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }, []);

  const handleRetry = useCallback(() => {
    setRetryCount((c) => c + 1);
    initPlayer();
  }, [initPlayer]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative bg-black rounded-xl overflow-hidden group select-none',
        isFullscreen ? 'fixed inset-0 z-[9999] rounded-none' : 'aspect-video',
        className
      )}
      onMouseMove={handleMouseMove}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        playsInline
        onWaiting={() => setState('buffering')}
        onPlaying={() => setState('playing')}
        onPause={() => setState('paused')}
        onError={() => setState('error')}
      />

      {/* Loading / Buffering overlay */}
      {(state === 'loading' || state === 'buffering') && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
          <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
          <p className="text-white/70 text-sm mt-3">
            {state === 'buffering' ? 'Buffering...' : 'Loading stream...'}
          </p>
        </div>
      )}

      {/* Error overlay */}
      {state === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-4">
          <WifiOff className="w-16 h-16 text-red-400" />
          <p className="text-white font-semibold text-lg">Stream unavailable</p>
          <p className="text-white/50 text-sm">The stream could not be loaded</p>
          <button
            onClick={(e) => { e.stopPropagation(); handleRetry(); }}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry {retryCount > 0 && `(${retryCount})`}
          </button>
        </div>
      )}

      {/* Paused overlay */}
      {state === 'paused' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </div>
        </div>
      )}

      {/* Controls overlay */}
      <div
        className={cn(
          'absolute inset-0 flex flex-col justify-between p-4 transition-opacity duration-300',
          showControls ? 'opacity-100' : 'opacity-0'
        )}
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.8) 100%)' }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {channel.logo && (
              <img src={channel.logo} alt={channel.name} className="h-8 w-8 object-contain rounded" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            )}
            <div>
              <p className="text-white font-semibold text-sm">{channel.name}</p>
              <p className="text-white/60 text-xs">{channel.groupTitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <div className="flex items-center gap-1 text-green-400 text-xs">
                <Wifi className="w-3 h-3" />
                <span>LIVE</span>
              </div>
            ) : (
              <WifiOff className="w-4 h-4 text-red-400" />
            )}
            {onClose && (
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom controls */}
        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            {state === 'playing' ? (
              <Pause className="w-5 h-5 fill-white" />
            ) : (
              <Play className="w-5 h-5 fill-white ml-0.5" />
            )}
          </button>

          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={() => setIsMuted((m) => !m)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={isMuted ? 0 : volume}
              onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
              className="w-20 h-1 appearance-none bg-white/30 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
