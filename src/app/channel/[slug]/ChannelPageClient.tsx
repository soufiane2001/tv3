'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, Tv2, ChevronLeft, Share2, Radio, Trophy, Globe, MessageCircle } from 'lucide-react';
import VideoPlayer from '@/components/player/VideoPlayer';
import AdBanner from '@/components/ads/AdBanner';
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

        {/* ── Ad banner — below player, all channels ──────── */}
        <div className="px-4 py-3 border-t border-white/5">
          <AdBanner />
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
  type?: 'channel';
  channelIcon?: string;
  channelName?: string;
  tagline?: string;
  broadcastNote?: string;
  blocks: { lang: string; flag: string; title: string; body: string }[];
  faq: { q: string; a: string }[];
  links: { href: string; label: string }[];
}> = {

  // ── Moroccan / Maghreb channels ─────────────────────────────────────────────
  '2m': {
    type: 'channel',
    channelIcon: '🇲🇦',
    channelName: '2M Maroc — القناة الثانية المغربية',
    tagline: 'La Deuxième Chaîne Marocaine · القناة الثانية',
    broadcastNote: 'Disponible gratuitement en direct HD · متاح مجاناً بجودة عالية',
    blocks: [
      {
        lang: 'العربية', flag: '🇲🇦',
        title: 'مشاهدة قناة 2M المغربية بث مباشر مجاناً',
        body: 'شاهد قناة 2M المغربية بث مباشر مجاناً وبجودة عالية HD. أفلام، مسلسلات، أخبار، كرة القدم — بدون اشتراك، بدون تسجيل. متاح من جميع أنحاء العالم.',
      },
      {
        lang: 'Français', flag: '🇫🇷',
        title: 'Regarder 2M Maroc en Direct Gratuit',
        body: 'Regardez 2M Maroc en direct et gratuitement en HD. Films, séries, actualités, football marocain — sans abonnement, sans inscription. Disponible depuis la France, la Belgique et partout dans le monde.',
      },
      {
        lang: 'English', flag: '🇬🇧',
        title: 'Watch 2M Morocco Live Stream Free',
        body: 'Stream 2M Morocco live in HD for free. News, films, series and Moroccan football — no subscription required. Watch from anywhere worldwide.',
      },
      {
        lang: 'Español', flag: '🇪🇸',
        title: '2M Marruecos En Directo Gratis',
        body: 'Ver 2M Marruecos en directo gratis en HD. Noticias, películas y fútbol marroquí — sin suscripción ni registro.',
      },
    ],
    faq: [
      { q: 'كيف أشاهد قناة 2M المغربية مجاناً على الإنترنت؟', a: 'اضغط على زر التشغيل أعلاه لمشاهدة قناة 2M بث مباشر مجاناً وبجودة HD، بدون اشتراك أو تسجيل.' },
      { q: 'Comment regarder 2M Maroc depuis la France ?', a: 'Cliquez sur lecture ci-dessus — 2M Maroc est disponible en direct gratuit HD sur SportaLive depuis n\'importe où dans le monde.' },
      { q: 'How to watch 2M Morocco online free?', a: 'Click play above — 2M Morocco live stream is free in HD on SportaLive. No account needed, works from anywhere.' },
    ],
    links: [
      { href: '/channel/al-aoula',    label: '📺 Al Aoula — القناة الأولى' },
      { href: '/channel/arryadia',    label: '⚽ Arryadia — الرياضية'      },
      { href: '/chaines-marocaines',  label: '🇲🇦 Toutes les chaînes marocaines' },
      { href: '/live',                label: '📡 All Live Channels'        },
    ],
  },
  'al-aoula': {
    type: 'channel',
    channelIcon: '🇲🇦',
    channelName: 'Al Aoula — القناة الأولى المغربية',
    tagline: 'La Première Chaîne Nationale (SNRT) · القناة الأولى',
    broadcastNote: 'SNRT — Première chaîne publique marocaine · القناة العامة الأولى',
    blocks: [
      {
        lang: 'العربية', flag: '🇲🇦',
        title: 'مشاهدة القناة الأولى المغربية بث مباشر مجاناً',
        body: 'شاهد القناة الأولى المغربية (الأولى) بث مباشر مجاناً وبجودة HD. أخبار الوطن، البرامج الاجتماعية، كرة القدم — بدون اشتراك، بدون تسجيل. SNRT الأولى مباشر.',
      },
      {
        lang: 'Français', flag: '🇫🇷',
        title: 'Regarder Al Aoula en Direct Gratuit',
        body: 'Regardez Al Aoula (Première chaîne marocaine SNRT) en direct gratuit en HD. Actualités, culture, sport — sans abonnement. Disponible depuis la France et le monde entier.',
      },
      {
        lang: 'English', flag: '🇬🇧',
        title: 'Watch Al Aoula Morocco Live Stream Free',
        body: 'Stream Al Aoula (SNRT 1) Morocco live in HD for free. News, culture, Moroccan football — no subscription required. Watch from anywhere.',
      },
    ],
    faq: [
      { q: 'كيف أشاهد القناة الأولى المغربية مجاناً؟', a: 'اضغط على زر التشغيل أعلاه لمشاهدة القناة الأولى (الأولى) المغربية بث مباشر مجاناً وبجودة HD بدون اشتراك.' },
      { q: 'Comment regarder Al Aoula en direct depuis l\'étranger ?', a: 'Cliquez sur lecture ci-dessus — Al Aoula est disponible gratuitement en HD sur SportaLive depuis la France, la Belgique et partout dans le monde.' },
      { q: 'Is Al Aoula free to watch online?', a: 'Yes — Al Aoula Morocco live stream is completely free on SportaLive in HD. No account or subscription needed.' },
    ],
    links: [
      { href: '/channel/2m',          label: '📺 2M Maroc En Direct'        },
      { href: '/channel/arryadia',    label: '⚽ Arryadia — الرياضية'       },
      { href: '/channel/medi-1',      label: '📰 Medi 1 TV — ميدي 1'       },
      { href: '/chaines-marocaines',  label: '🇲🇦 Toutes les chaînes marocaines' },
      { href: '/live',                label: '📡 All Live Channels'         },
    ],
  },
  'arryadia': {
    type: 'channel',
    channelIcon: '⚽',
    channelName: 'Arryadia — القناة الرياضية المغربية',
    tagline: 'SNRT Sport · قناة الرياضة المغربية · Botola Pro',
    broadcastNote: 'Football marocain, Botola Pro, matchs de l\'équipe nationale · كرة القدم المغربية',
    blocks: [
      {
        lang: 'العربية', flag: '🇲🇦',
        title: 'مشاهدة القناة الرياضية المغربية بث مباشر مجاناً',
        body: 'شاهد قناة الرياضية المغربية (Arryadia) بث مباشر مجاناً وبجودة HD. الدوري المغربي (البطولة الاحترافية)، منتخب المغرب، كأس العرش — بدون اشتراك.',
      },
      {
        lang: 'Français', flag: '🇫🇷',
        title: 'Regarder Arryadia en Direct Gratuit',
        body: 'Regardez Arryadia (SNRT Sport) en direct gratuit HD. Botola Pro, équipe nationale marocaine, Coupe du Trône — sans abonnement ni inscription.',
      },
      {
        lang: 'English', flag: '🇬🇧',
        title: 'Watch Arryadia Morocco Sport Live Free',
        body: 'Stream Arryadia (SNRT Sport) Morocco live free in HD. Botola Pro, Moroccan national team, Throne Cup football — no subscription needed.',
      },
    ],
    faq: [
      { q: 'كيف أشاهد القناة الرياضية المغربية مجاناً؟', a: 'اضغط على زر التشغيل أعلاه لمشاهدة قناة الرياضية (Arryadia) بث مباشر مجاناً وبجودة HD بدون اشتراك.' },
      { q: 'Comment regarder Arryadia en direct gratuit ?', a: 'Cliquez sur lecture ci-dessus — Arryadia SNRT Sport est disponible gratuitement en HD sur SportaLive depuis n\'importe où.' },
      { q: 'Does Arryadia show Moroccan Premier League (Botola Pro)?', a: 'Yes — Arryadia broadcasts Botola Pro (Moroccan Premier League), Moroccan national team matches and Throne Cup games live.' },
    ],
    links: [
      { href: '/channel/2m',          label: '📺 2M Maroc En Direct'        },
      { href: '/channel/al-aoula',    label: '📺 Al Aoula — الأولى'         },
      { href: '/chaines-marocaines',  label: '🇲🇦 Toutes les chaînes marocaines' },
      { href: '/live',                label: '📡 All Live Channels'         },
    ],
  },
  'arrabia': {
    type: 'channel',
    channelIcon: '🇲🇦',
    channelName: 'Arrabia — الثالثة المغربية',
    tagline: 'SNRT 3 · Troisième chaîne marocaine · الثالثة',
    broadcastNote: 'SNRT 3 — Arrabia en direct gratuit',
    blocks: [
      {
        lang: 'العربية', flag: '🇲🇦',
        title: 'مشاهدة قناة الثالثة المغربية بث مباشر مجاناً',
        body: 'شاهد قناة الثالثة المغربية (Arrabia) بث مباشر مجاناً وبجودة HD. برامج متنوعة، ثقافة، ترفيه — بدون اشتراك، بدون تسجيل.',
      },
      {
        lang: 'Français', flag: '🇫🇷',
        title: 'Regarder Arrabia (SNRT 3) en Direct Gratuit',
        body: 'Regardez Arrabia, la troisième chaîne marocaine (SNRT 3), en direct gratuit HD. Programmes variés, culture, divertissement — sans abonnement.',
      },
    ],
    faq: [
      { q: 'كيف أشاهد قناة الثالثة (Arrabia) مجاناً؟', a: 'اضغط على زر التشغيل أعلاه لمشاهدة الثالثة المغربية بث مباشر مجاناً وبجودة HD.' },
      { q: 'Comment regarder Arrabia SNRT 3 en direct ?', a: 'Cliquez sur lecture ci-dessus — Arrabia (SNRT 3) est disponible gratuitement en HD sur SportaLive.' },
    ],
    links: [
      { href: '/channel/2m',          label: '📺 2M Maroc'                  },
      { href: '/channel/al-aoula',    label: '📺 Al Aoula'                  },
      { href: '/chaines-marocaines',  label: '🇲🇦 Chaînes marocaines'       },
      { href: '/live',                label: '📡 All Live Channels'         },
    ],
  },
  'medi-1': {
    type: 'channel',
    channelIcon: '📰',
    channelName: 'Medi 1 TV — ميدي 1',
    tagline: 'Information · Actualités · Cultura · الأخبار والثقافة',
    broadcastNote: 'Medi 1 TV — Actualités du Maroc et du monde · أخبار المغرب والعالم',
    blocks: [
      {
        lang: 'العربية', flag: '🇲🇦',
        title: 'مشاهدة قناة ميدي 1 بث مباشر مجاناً',
        body: 'شاهد قناة ميدي 1 (Medi 1 TV) بث مباشر مجاناً وبجودة HD. أخبار المغرب والعالم، تحليلات سياسية، برامج ثقافية — بدون اشتراك، بدون تسجيل.',
      },
      {
        lang: 'Français', flag: '🇫🇷',
        title: 'Regarder Medi 1 TV en Direct Gratuit',
        body: 'Regardez Medi 1 TV en direct gratuit HD. Actualités du Maroc et du monde, analyse politique, culture — sans abonnement ni inscription. Disponible depuis la France.',
      },
      {
        lang: 'English', flag: '🇬🇧',
        title: 'Watch Medi 1 Morocco Live Free',
        body: 'Stream Medi 1 TV Morocco live in HD for free. Moroccan and world news, political analysis, culture — no subscription required. Watch from anywhere.',
      },
    ],
    faq: [
      { q: 'كيف أشاهد قناة ميدي 1 مجاناً؟', a: 'اضغط على زر التشغيل أعلاه لمشاهدة قناة ميدي 1 بث مباشر مجاناً وبجودة HD بدون اشتراك.' },
      { q: 'Comment regarder Medi 1 TV en direct depuis la France ?', a: 'Cliquez sur lecture ci-dessus — Medi 1 TV est disponible gratuitement HD sur SportaLive depuis n\'importe quel pays.' },
      { q: 'Is Medi 1 TV available in HD?', a: 'Yes — Medi 1 TV streams in HD quality for free on SportaLive. No subscription or registration required.' },
    ],
    links: [
      { href: '/channel/2m',          label: '📺 2M Maroc'                  },
      { href: '/channel/al-aoula',    label: '📺 Al Aoula'                  },
      { href: '/channel/arryadia',    label: '⚽ Arryadia Sport'            },
      { href: '/chaines-marocaines',  label: '🇲🇦 Toutes les chaînes marocaines' },
      { href: '/live',                label: '📡 All Channels'              },
    ],
  },
  'al-maghribia': {
    type: 'channel',
    channelIcon: '🌍',
    channelName: 'Al Maghribia — المغربية',
    tagline: 'Pour la diaspora marocaine dans le monde · قناة الجالية المغربية',
    broadcastNote: 'SNRT Al Maghribia — Chaîne de la diaspora marocaine',
    blocks: [
      {
        lang: 'العربية', flag: '🌍',
        title: 'مشاهدة قناة المغربية بث مباشر مجاناً',
        body: 'شاهد قناة المغربية (Al Maghribia) بث مباشر مجاناً. القناة المخصصة للجالية المغربية في الخارج — أخبار، ثقافة، ترفيه — بدون اشتراك.',
      },
      {
        lang: 'Français', flag: '🇫🇷',
        title: 'Regarder Al Maghribia en Direct Gratuit',
        body: 'Regardez Al Maghribia (SNRT) en direct gratuit HD. Chaîne dédiée à la diaspora marocaine — actualités, culture, divertissement — sans abonnement.',
      },
    ],
    faq: [
      { q: 'كيف أشاهد قناة المغربية مجاناً؟', a: 'اضغط على زر التشغيل أعلاه لمشاهدة المغربية بث مباشر مجاناً وبجودة HD بدون اشتراك.' },
      { q: 'Comment regarder Al Maghribia depuis l\'étranger ?', a: 'Cliquez sur lecture ci-dessus — Al Maghribia est disponible gratuitement sur SportaLive depuis France, Belgique et partout.' },
    ],
    links: [
      { href: '/channel/2m',          label: '📺 2M Maroc'                  },
      { href: '/channel/al-aoula',    label: '📺 Al Aoula'                  },
      { href: '/chaines-marocaines',  label: '🇲🇦 Chaînes marocaines'       },
      { href: '/live',                label: '📡 All Live Channels'         },
    ],
  },
};

// Alias slugs map to the same content
const SLUG_MAP: Record<string, string> = {
  // Moroccan channels
  'al-aoula-1': 'al-aoula', 'alaoula': 'al-aoula', 'snrt-1': 'al-aoula',
  'al-arryadia': 'arryadia', 'arryadia-hd': 'arryadia', 'snrt-sport': 'arryadia',
  'medi1': 'medi-1', 'medi1tv': 'medi-1',
  '2m-maroc': '2m', '2m-hd': '2m',
  'almaghribia': 'al-maghribia',
};

function EventContent({ override, channel }: { override: EventOverride; channel: Channel }) {
  const key = SLUG_MAP[channel.slug] ?? channel.slug;
  const data = EVENT_CONTENT[key];

  if (!data) {
    return (
      <div className="px-4 py-6 border-t border-white/5 space-y-3">
        <p className="text-gray-400 text-sm leading-relaxed">{override.description}</p>
      </div>
    );
  }

  return (
    <div className="border-t border-white/5 space-y-6 px-4 py-6">

      {/* ── Channel info banner ─────────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden border border-white/5"
        style={{ background: 'linear-gradient(160deg, #0a150a 0%, #0d200d 40%, #150a0a 100%)' }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative flex items-center gap-4 px-5 py-5">
          {data.channelIcon && (
            <span className="text-4xl flex-shrink-0">{data.channelIcon}</span>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-[#c8b87a] text-[10px] font-bold uppercase tracking-[0.25em] mb-0.5">
              🔴 LIVE · بث مباشر · Live
            </p>
            <h2 className="text-white font-black text-lg leading-tight">{data.channelName}</h2>
            {data.tagline && <p className="text-gray-400 text-xs mt-1">{data.tagline}</p>}
          </div>
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600 rounded-full text-white text-[10px] font-black uppercase tracking-wider flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />LIVE
          </span>
        </div>
        {data.broadcastNote && (
          <div className="relative px-5 py-2 border-t border-white/5 bg-black/20">
            <span className="text-gray-400 text-xs">{data.broadcastNote}</span>
          </div>
        )}
      </div>

      {/* ── Ad banner — mid-content placement ───────────────────────────────── */}
      <AdBanner />

      {/* ── Multilingual description blocks ─────────────────────────────────── */}
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

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
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

      {/* ── Internal links ───────────────────────────────────────────────────── */}
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
