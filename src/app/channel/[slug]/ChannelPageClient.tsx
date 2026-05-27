'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, Tv2, ChevronLeft, Share2, Radio, Trophy, Globe, MessageCircle } from 'lucide-react';
import VideoPlayer from '@/components/player/VideoPlayer';
import { useFavoritesStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import type { Channel } from '@/types';

interface EventOverride {
  title: string;
  description: string;
  keywords: string[];
}

interface Props {
  channel: Channel;
  related: Channel[];
  eventOverride?: EventOverride | null;
}

export default function ChannelPageClient({ channel, related, eventOverride }: Props) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const [imgError, setImgError] = useState(false);
  const fav = isFavorite(channel.id);

  const handleShare = async () => {
    try {
      await navigator.share({ title: channel.name, url: window.location.href });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col lg:flex-row">

      {/* ── Player column ─────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Back bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-gray-900/60 backdrop-blur">
          <Link href="/" className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </Link>
          <span className="text-gray-700">/</span>
          {channel.category && (
            <>
              <Link href={`/category/${channel.category.slug}`} className="text-gray-400 hover:text-purple-300 text-sm transition-colors truncate max-w-[120px]">
                {channel.category.name}
              </Link>
              <span className="text-gray-700">/</span>
            </>
          )}
          <span className="text-gray-300 text-sm truncate">{channel.name}</span>
        </div>

        {/* Event banner (shown when there's an active match) */}
        {eventOverride && (
          <div className="px-4 py-2 bg-gradient-to-r from-red-900/40 to-purple-900/40 border-b border-red-500/20 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <p className="text-yellow-300 text-xs font-semibold truncate">{eventOverride.title}</p>
            <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded animate-pulse flex-shrink-0">LIVE</span>
          </div>
        )}

        {/* Player */}
        <div className="w-full bg-black">
          <VideoPlayer channel={channel} className="w-full" />
        </div>

        {/* Channel info bar */}
        <div className="px-4 py-4 bg-gray-900/80 border-b border-white/5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {channel.logo && !imgError ? (
              <img src={channel.logo} alt={channel.name} className="w-full h-full object-contain p-1" onError={() => setImgError(true)} />
            ) : (
              <Tv2 className="w-5 h-5 text-gray-600" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-white font-bold text-lg leading-tight truncate">{channel.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded font-semibold uppercase tracking-wide">
                <Radio className="w-2.5 h-2.5" /> Live
              </span>
              {channel.category && (
                <Link href={`/category/${channel.category.slug}`} className="text-purple-400 hover:text-purple-300 text-xs transition-colors">
                  {channel.category.name}
                </Link>
              )}
              {eventOverride && (
                <span className="text-yellow-500 text-xs truncate hidden sm:inline">— {eventOverride.title.replace(/^[^\w]*/,'').split('—')[1]?.trim()}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => { toggleFavorite(channel.id); toast.success(fav ? 'Removed from favorites' : 'Added to favorites'); }}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all',
                fav ? 'bg-red-500/15 text-red-400 border-red-500/30' : 'bg-white/5 text-gray-400 hover:text-white border-white/10 hover:border-white/20'
              )}
            >
              <Heart className={cn('w-4 h-4', fav && 'fill-current')} />
              <span className="hidden sm:inline">{fav ? 'Saved' : 'Save'}</span>
            </button>
            <button onClick={handleShare} className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/20 transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Event content block (SEO + UX) ─────────────── */}
        {eventOverride && <EventContent override={eventOverride} channel={channel} />}

        {/* Mobile related */}
        {related.length > 0 && (
          <div className="lg:hidden px-4 py-6">
            <RelatedList channels={related} />
          </div>
        )}
      </div>

      {/* ── Related sidebar ───────────────────────────────── */}
      {related.length > 0 && (
        <aside className="hidden lg:flex flex-col w-80 xl:w-96 border-l border-white/5 bg-gray-900/40 overflow-y-auto max-h-screen sticky top-0">
          <div className="p-4 border-b border-white/5">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Related Channels</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {related.map(ch => (
              <RelatedChannelItem key={ch.id} channel={ch} isActive={ch.id === channel.id} />
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}

// ── Event content section ─────────────────────────────────────────────────────
// Shown below the player when the channel is airing a known live event.
// Provides rich context for users + crawlable text for SEO.

const EVENT_CONTENT: Record<string, {
  teams: [string, string];
  competition: string;
  date: string;
  kickoff: string;
  venue?: string;
  broadcastNote: string;
  blocks: { lang: string; flag: string; title: string; body: string }[];
  faq: { q: string; a: string }[];
  links: { href: string; label: string }[];
}> = {
  'la-1': {
    teams: ['Arsenal FC', 'Paris Saint-Germain'],
    competition: 'UEFA Champions League Final 2026',
    date: '27 May 2026',
    kickoff: '21:00 CET · 20:00 UTC',
    broadcastNote: 'Broadcasting free on La 1 (RTVE)',
    blocks: [
      {
        lang: 'English', flag: '🇬🇧',
        title: 'Champions League Final 2026 — Free Live Stream',
        body: 'Watch the UEFA Champions League Final 2026 live between Arsenal FC and Paris Saint-Germain. Free HD stream on La 1 — no subscription, no registration.',
      },
      {
        lang: 'Español', flag: '🇪🇸',
        title: 'Final Champions League 2026 en Directo',
        body: 'Ver la Final de la Champions League 2026 en directo y gratis. Arsenal contra PSG en La 1 de RTVE — streaming HD sin suscripción.',
      },
      {
        lang: 'Français', flag: '🇫🇷',
        title: 'Finale Ligue des Champions 2026 — En Direct',
        body: 'Regardez la Finale de la Ligue des Champions 2026 en direct et gratuitement. Arsenal contre PSG sur La 1 — streaming HD sans abonnement.',
      },
      {
        lang: 'العربية', flag: '🌍',
        title: 'نهائي دوري أبطال أوروبا 2026 — بث مباشر',
        body: 'شاهد نهائي دوري أبطال أوروبا 2026 مجاناً — ارسنال ضد باريس سان جيرمان بجودة عالية HD على قناة لا 1، بدون اشتراك.',
      },
    ],
    faq: [
      { q: 'How to watch Arsenal vs PSG free?', a: 'Stream is live above — La 1 (RTVE) broadcasts the Champions League Final 2026 free. No account needed.' },
      { q: '¿Cómo ver Arsenal vs PSG gratis?', a: 'El streaming está arriba — La 1 de RTVE emite la Final de la Champions 2026 gratis sin suscripción.' },
      { q: 'What time is kick-off?', a: '21:00 CET (20:00 UTC) on 27 May 2026. That\'s 8 PM London, 9 PM Madrid & Paris, 3 PM New York.' },
    ],
    links: [
      { href: '/arsenal-vs-psg',              label: '🏆 Arsenal vs PSG Match Page'        },
      { href: '/champions-league-final-2026', label: '⚽ UCL Final 2026 Hub'              },
      { href: '/crystal-palace-vs-rayo-vallecano', label: '🔵 Conference League Final'     },
      { href: '/live',                        label: '📡 All Live Channels'               },
    ],
  },
  'trt': {
    teams: ['Crystal Palace', 'Rayo Vallecano'],
    competition: 'UEFA Conference League Final 2026',
    date: '27 May 2026',
    kickoff: '21:00 CET',
    venue: 'Estadio de La Cartuja, Seville',
    broadcastNote: 'Broadcasting free on TRT',
    blocks: [
      {
        lang: 'English', flag: '🇬🇧',
        title: 'Conference League Final 2026 — Free Live Stream',
        body: 'Watch Crystal Palace vs Rayo Vallecano live — UEFA Conference League Final 2026. Free HD stream on TRT — no subscription required.',
      },
      {
        lang: 'Türkçe', flag: '🇹🇷',
        title: 'Konferans Ligi Finali 2026 — Canlı İzle',
        body: 'Crystal Palace - Rayo Vallecano maçını TRT\'de canlı ve ücretsiz izleyin. UEFA Konferans Ligi Finali 2026 HD yayın.',
      },
      {
        lang: 'العربية', flag: '🌍',
        title: 'نهائي الدوري الأوروبي الثالث 2026 — بث مباشر',
        body: 'شاهد كريستال بالاس ضد رايو فاليكانو مجاناً — نهائي دوري المؤتمر الأوروبي 2026 على TRT بجودة HD.',
      },
      {
        lang: 'Español', flag: '🇪🇸',
        title: 'Final Conference League 2026 — En Directo',
        body: 'Crystal Palace vs Rayo Vallecano en directo gratis. Final de la UEFA Conference League 2026 en TRT — streaming HD sin suscripción.',
      },
    ],
    faq: [
      { q: 'Where to watch Crystal Palace vs Rayo Vallecano free?', a: 'Stream is live above on TRT — broadcasting the Conference League Final 2026 for free in HD.' },
      { q: 'Crystal Palace Rayo Vallecano hangi kanalda?', a: 'TRT\'de canlı yayın üstte — Konferans Ligi Finali 2026 ücretsiz HD yayın.' },
      { q: '¿Dónde ver Crystal Palace vs Rayo Vallecano gratis?', a: 'Streaming arriba en TRT — Final Conference League 2026 gratis en HD sin registro.' },
    ],
    links: [
      { href: '/crystal-palace-vs-rayo-vallecano', label: '🏆 Match Page'        },
      { href: '/arsenal-vs-psg',                   label: '⚽ UCL Final — Arsenal vs PSG' },
      { href: '/live',                             label: '📡 All Live Channels'  },
    ],
  },
};

// Alias slugs map to the same content
const SLUG_MAP: Record<string, string> = {
  'la-1-1': 'la-1', 'la-1-2': 'la-1',
  'trt-1': 'trt', 'trt1': 'trt',
};

function EventContent({ override, channel }: { override: EventOverride; channel: Channel }) {
  const key = SLUG_MAP[channel.slug] ?? channel.slug;
  const data = EVENT_CONTENT[key];

  if (!data) {
    // Minimal fallback for channels without detailed event data
    return (
      <div className="px-4 py-6 border-t border-white/5 space-y-3">
        <p className="text-gray-400 text-sm leading-relaxed">{override.description}</p>
      </div>
    );
  }

  return (
    <div className="border-t border-white/5 space-y-6 px-4 py-6">

      {/* Match card — UCL styled */}
      <div className="relative rounded-2xl overflow-hidden border border-[#1e3a6e]"
        style={{ background: 'linear-gradient(135deg, #05091a 0%, #0d1442 60%, #05091a 100%)' }}>
        {/* dot grid */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute left-0 inset-y-0 w-1/2 bg-gradient-to-r from-red-900/25 to-transparent" />
        <div className="absolute right-0 inset-y-0 w-1/2 bg-gradient-to-l from-blue-900/25 to-transparent" />

        <div className="relative p-5 space-y-4">
          {/* UCL label */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#c8b87a] text-sm">✦</span>
              <span className="text-[#c8b87a] text-[10px] font-bold uppercase tracking-[0.25em]">{data.competition}</span>
            </div>
            <span className="flex items-center gap-1 px-2 py-0.5 bg-red-600 rounded-full text-white text-[10px] font-black uppercase tracking-wider">
              <span className="w-1 h-1 rounded-full bg-white animate-pulse" />LIVE
            </span>
          </div>

          {/* Teams */}
          <div className="flex items-center gap-3">
            <div className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-900 border border-red-400/50 shadow-lg flex items-center justify-center">
                <span className="text-xl">🔴</span>
              </div>
              <p className="text-white font-black text-sm uppercase tracking-wide text-center">{data.teams[0]}</p>
            </div>
            <div className="text-center flex-shrink-0 space-y-1">
              <div className="text-2xl">🏆</div>
              <p className="text-white/20 font-black text-sm tracking-widest">VS</p>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#003B7C] to-[#001440] border border-blue-400/50 shadow-lg flex items-center justify-center">
                <span className="text-xl">🔵</span>
              </div>
              <p className="text-white font-black text-sm uppercase tracking-wide text-center">{data.teams[1]}</p>
            </div>
          </div>

          {/* Info pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            {[
              { l: 'Date',     v: data.date      },
              { l: 'Kick-off', v: data.kickoff   },
              { l: 'Venue',    v: data.venue ?? 'Europe' },
              { l: 'Free on',  v: data.broadcastNote.split(' on ')[1] ?? 'Free' },
            ].map(({ l, v }) => (
              <div key={l} className="bg-white/5 border border-white/5 rounded-xl p-2">
                <p className="text-gray-500 uppercase tracking-wider mb-0.5 text-[9px]">{l}</p>
                <p className="text-white font-semibold text-[11px]">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Multilingual description blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.blocks.map(({ flag, lang, title, body }) => (
          <div key={lang} className="bg-gray-800/40 border border-white/5 rounded-xl p-4 space-y-1"
            dir={lang === 'العربية' ? 'rtl' : 'ltr'}>
            <div className="flex items-center gap-2 mb-2">
              <span>{flag}</span>
              <span className="text-gray-500 text-xs uppercase tracking-wider">{lang}</span>
            </div>
            <h3 className="text-white font-semibold text-sm">{title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle className="w-4 h-4 text-purple-400" />
          <h2 className="text-white font-semibold text-sm uppercase tracking-wider">FAQ</h2>
        </div>
        {data.faq.map(({ q, a }, i) => (
          <details key={i} className="bg-gray-800/40 border border-white/5 rounded-xl p-3 group cursor-pointer">
            <summary className="text-white text-sm font-medium list-none flex justify-between items-center gap-2">
              {q}
              <span className="text-purple-400 text-lg flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-gray-400 text-xs mt-2 leading-relaxed">{a}</p>
          </details>
        ))}
      </div>

      {/* Internal links */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1 mr-1">
          <Globe className="w-3 h-3 text-gray-500" />
          <span className="text-gray-500 text-xs">More:</span>
        </div>
        {data.links.map(({ href, label }) => (
          <Link key={href} href={href}
            className="px-3 py-1.5 bg-gray-800/60 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/30 text-gray-400 hover:text-white text-xs rounded-lg transition-all">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function RelatedList({ channels }: { channels: Channel[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Related Channels</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {channels.map(ch => <RelatedChannelItem key={ch.id} channel={ch} isActive={false} />)}
      </div>
    </div>
  );
}

function RelatedChannelItem({ channel, isActive }: { channel: Channel; isActive: boolean }) {
  const [imgError, setImgError] = useState(false);
  return (
    <Link
      href={`/channel/${channel.slug}`}
      className={cn(
        'flex items-center gap-3 p-3 rounded-xl border transition-all group',
        isActive ? 'bg-purple-600/20 border-purple-500/40' : 'bg-gray-800/40 hover:bg-gray-700/60 border-white/5 hover:border-purple-500/30'
      )}
    >
      <div className="w-14 h-10 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0 overflow-hidden">
        {channel.logo && !imgError ? (
          <img src={channel.logo} alt={channel.name} className="w-full h-full object-contain p-1" onError={() => setImgError(true)} />
        ) : (
          <Tv2 className="w-5 h-5 text-gray-600" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm font-medium truncate transition-colors', isActive ? 'text-purple-300' : 'text-gray-300 group-hover:text-white')}>
          {channel.name}
        </p>
        <p className="text-xs text-gray-600 truncate">{channel.groupTitle}</p>
      </div>
      <span className="text-[10px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded flex-shrink-0 font-semibold">LIVE</span>
    </Link>
  );
}
