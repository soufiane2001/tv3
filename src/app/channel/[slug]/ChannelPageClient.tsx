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
  type?: 'channel';              // if set: TV channel info banner; default = match scoreboard
  channelIcon?: string;
  channelName?: string;
  tagline?: string;
  teams?: [string, string];
  logos?: [string, string];
  competitionLogo?: string;
  competition?: string;
  date?: string;
  kickoff?: string;
  venue?: string;
  broadcastNote?: string;
  broadcastLogo?: string;
  blocks: { lang: string; flag: string; title: string; body: string }[];
  faq: { q: string; a: string }[];
  links: { href: string; label: string }[];
}> = {
  'la-1': {
    teams: ['Arsenal FC', 'Paris Saint-Germain'],
    logos: [
      'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
      'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
    ],
    competitionLogo: 'https://upload.wikimedia.org/wikipedia/en/f/f5/UEFA_Champions_League.svg',
    competition: 'UEFA Champions League Final 2026',
    date: '27 May 2026',
    kickoff: '21:00 CET · 20:00 UTC',
    broadcastNote: 'Broadcasting free on La 1 (RTVE)',
    broadcastLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/La_1_logo_2021.svg/200px-La_1_logo_2021.svg.png',
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
      { q: 'What time is kick-off?', a: "21:00 CET (20:00 UTC) on 27 May 2026. That's 8 PM London, 9 PM Madrid & Paris, 3 PM New York." },
    ],
    links: [
      { href: '/arsenal-vs-psg',              label: '🏆 Arsenal vs PSG Match Page'   },
      { href: '/champions-league-final-2026', label: '⚽ UCL Final 2026 Hub'         },
      { href: '/live',                        label: '📡 All Live Channels'           },
    ],
  },
  'm6': {
    teams: ['Arsenal FC', 'Paris Saint-Germain'],
    logos: [
      'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
      'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
    ],
    competitionLogo: 'https://upload.wikimedia.org/wikipedia/en/f/f5/UEFA_Champions_League.svg',
    competition: 'UEFA Champions League Final 2026',
    date: '30 Mai 2026',
    kickoff: '21:00 CET · 20:00 UTC',
    broadcastNote: 'Diffusé gratuitement sur M6',
    broadcastLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/M6_logo_2023.svg/200px-M6_logo_2023.svg.png',
    blocks: [
      {
        lang: 'Français', flag: '🇫🇷',
        title: 'Finale Ligue des Champions 2026 — M6 En Direct',
        body: 'Regardez la Finale de la Ligue des Champions 2026 en direct et gratuitement sur M6. Arsenal contre Paris Saint-Germain — streaming HD sans abonnement, sans inscription.',
      },
      {
        lang: 'English', flag: '🇬🇧',
        title: 'Champions League Final 2026 — Live on M6',
        body: 'Watch the UEFA Champions League Final 2026 live on M6 — Arsenal FC vs Paris Saint-Germain. Free HD stream, no subscription, no registration needed.',
      },
      {
        lang: 'العربية', flag: '🌍',
        title: 'نهائي دوري أبطال أوروبا 2026 — بث مباشر على M6',
        body: 'شاهد نهائي دوري أبطال أوروبا 2026 مجاناً على قناة M6 — ارسنال ضد باريس سان جيرمان بجودة HD بدون اشتراك.',
      },
      {
        lang: 'Español', flag: '🇪🇸',
        title: 'Final Champions League 2026 — M6 En Directo',
        body: 'Ver la Final de la UEFA Champions League 2026 gratis en M6 — Arsenal contra PSG en HD sin registro ni suscripción.',
      },
    ],
    faq: [
      { q: 'Comment regarder la finale Champions League sur M6 gratuitement ?', a: 'Le stream est en direct ci-dessus — M6 diffuse la Finale de la Champions League 2026 gratuitement en HD. Aucun compte nécessaire.' },
      { q: 'À quelle heure est le coup d\'envoi Arsenal vs PSG ?', a: '21h00 CET (20h00 UTC) le 30 mai 2026 — 21h Paris, 20h Londres, 15h New York.' },
      { q: 'How to watch Arsenal vs PSG free on M6?', a: 'Stream is live above — M6 broadcasts the Champions League Final 2026 free. Click play and it starts instantly.' },
    ],
    links: [
      { href: '/arsenal-vs-psg',              label: '🏆 Arsenal vs PSG Match Page'   },
      { href: '/champions-league-final-2026', label: '⚽ UCL Final 2026 Hub'         },
      { href: '/channel/la-1',                label: '📺 La 1 En Directo'            },
      { href: '/live',                        label: '📡 All Live Channels'           },
    ],
  },
  'canal-sport': {
    teams: ['Arsenal FC', 'Paris Saint-Germain'],
    logos: [
      'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
      'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
    ],
    competitionLogo: 'https://upload.wikimedia.org/wikipedia/en/f/f5/UEFA_Champions_League.svg',
    competition: 'UEFA Champions League Final 2026',
    date: '30 Mai 2026',
    kickoff: '21:00 CET · 20:00 UTC',
    broadcastNote: 'Diffusé sur Canal+ Sport HD',
    blocks: [
      {
        lang: 'Français', flag: '🇫🇷',
        title: 'Finale Ligue des Champions 2026 — Canal+ Sport En Direct',
        body: 'Regardez la Finale de la Ligue des Champions 2026 en direct sur Canal+ Sport HD. Arsenal contre Paris Saint-Germain — streaming HD sans inscription, diffusion gratuite en live.',
      },
      {
        lang: 'English', flag: '🇬🇧',
        title: 'Champions League Final 2026 — Live on Canal+ Sport',
        body: 'Watch the UEFA Champions League Final 2026 live on Canal+ Sport HD — Arsenal FC vs Paris Saint-Germain. Free HD stream, no subscription, no registration needed.',
      },
      {
        lang: 'العربية', flag: '🌍',
        title: 'نهائي دوري أبطال أوروبا 2026 — بث مباشر على Canal+ Sport',
        body: 'شاهد نهائي دوري أبطال أوروبا 2026 مجاناً على قناة Canal+ Sport HD — ارسنال ضد باريس سان جيرمان بجودة HD بدون اشتراك.',
      },
      {
        lang: 'Español', flag: '🇪🇸',
        title: 'Final Champions League 2026 — Canal+ Sport En Directo',
        body: 'Ver la Final de la UEFA Champions League 2026 gratis en Canal+ Sport HD — Arsenal contra PSG en HD sin registro ni suscripción.',
      },
    ],
    faq: [
      { q: 'Comment regarder la finale Champions League sur Canal+ Sport gratuitement ?', a: 'Le stream est en direct ci-dessus — Canal+ Sport HD diffuse la Finale de la Champions League 2026. Aucun compte nécessaire, cliquez sur lecture.' },
      { q: 'À quelle heure est le coup d\'envoi Arsenal vs PSG ?', a: '21h00 CET (20h00 UTC) le 30 mai 2026 — 21h Paris, 20h Londres, 15h New York.' },
      { q: 'How to watch Arsenal vs PSG free on Canal+ Sport?', a: 'Stream is live above — Canal+ Sport HD broadcasts the Champions League Final 2026 free. Click play and it starts instantly.' },
    ],
    links: [
      { href: '/arsenal-vs-psg',              label: '🏆 Arsenal vs PSG Match Page'   },
      { href: '/champions-league-final-2026', label: '⚽ UCL Final 2026 Hub'         },
      { href: '/channel/m6',                  label: '📺 M6 En Direct'               },
      { href: '/channel/la-1',                label: '📺 La 1 En Directo'            },
      { href: '/live',                        label: '📡 All Live Channels'           },
    ],
  },
  'trt': {
    teams: ['Crystal Palace', 'Rayo Vallecano'],
    logos: [
      'https://upload.wikimedia.org/wikipedia/en/a/a2/Crystal_Palace_FC_logo_%282022%29.svg',
      'https://upload.wikimedia.org/wikipedia/en/4/47/Rayo_Vallecano_logo.svg',
    ],
    competitionLogo: 'https://upload.wikimedia.org/wikipedia/en/0/0e/UEFA_Europa_Conference_League_logo.svg',
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

  // ── West Africa ─────────────────────────────────────────────────────────────
  'rti-1': {
    teams: ['Arsenal FC', 'Paris Saint-Germain'],
    logos: [
      'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
      'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
    ],
    competitionLogo: 'https://upload.wikimedia.org/wikipedia/en/f/f5/UEFA_Champions_League.svg',
    competition: 'UEFA Champions League Final 2026',
    date: '30 Mai 2026',
    kickoff: '21:00 CET · 20:00 UTC',
    broadcastNote: "Diffusé gratuitement sur RTI 1 — Côte d'Ivoire",
    blocks: [
      {
        lang: 'Français', flag: '🇨🇮',
        title: "Finale Ligue des Champions 2026 — RTI 1 En Direct",
        body: "Regardez la Finale de la Ligue des Champions 2026 en direct et gratuitement sur RTI 1 (Côte d'Ivoire). Arsenal contre Paris Saint-Germain — streaming HD sans abonnement, sans inscription.",
      },
      {
        lang: 'English', flag: '🇬🇧',
        title: 'Champions League Final 2026 — Live on RTI 1',
        body: "Watch the UEFA Champions League Final 2026 live on RTI 1 (Côte d'Ivoire) — Arsenal FC vs Paris Saint-Germain. Free HD stream, no subscription needed.",
      },
      {
        lang: 'العربية', flag: '🌍',
        title: 'نهائي دوري أبطال أوروبا 2026 — بث مباشر على RTI 1',
        body: 'شاهد نهائي دوري أبطال أوروبا 2026 مجاناً على قناة RTI 1 — ارسنال ضد باريس سان جيرمان بجودة HD بدون اشتراك.',
      },
      {
        lang: 'Español', flag: '🇪🇸',
        title: 'Final Champions League 2026 — RTI 1 En Directo',
        body: "Ver la Final de la UEFA Champions League 2026 gratis en RTI 1 (Costa de Marfil) — Arsenal contra PSG en HD sin registro.",
      },
    ],
    faq: [
      { q: "Comment regarder la finale Champions League sur RTI 1 gratuitement ?", a: "Le stream est en direct ci-dessus — RTI 1 diffuse la Finale de la Champions League 2026 gratuitement en HD. Aucun compte nécessaire." },
      { q: "À quelle heure est le coup d'envoi Arsenal vs PSG ?", a: "21h00 CET (20h00 UTC) le 30 mai 2026 — 21h Abidjan (GMT+1), 20h Londres, 15h New York." },
      { q: "How to watch Arsenal vs PSG free on RTI 1?", a: "Stream is live above — RTI 1 broadcasts the Champions League Final 2026 free. Click play and it starts instantly." },
    ],
    links: [
      { href: '/arsenal-vs-psg',              label: '🏆 Arsenal vs PSG Match Page'   },
      { href: '/champions-league-final-2026', label: '⚽ UCL Final 2026 Hub'         },
      { href: '/channel/m6',                  label: '📺 M6 En Direct'               },
      { href: '/channel/canal-sport',         label: '📺 Canal+ Sport'               },
      { href: '/live',                        label: '📡 All Live Channels'           },
    ],
  },

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
  'la-1-1': 'la-1', 'la-1-2': 'la-1',
  'trt-1': 'trt', 'trt1': 'trt',
  'canal-sport-hd': 'canal-sport', 'canal-plus-sport': 'canal-sport',
  'canalplus-sport': 'canal-sport', 'canal-sport-1': 'canal-sport',
  // Moroccan channels
  'al-aoula-1': 'al-aoula', 'alaoula': 'al-aoula', 'snrt-1': 'al-aoula',
  'al-arryadia': 'arryadia', 'arryadia-hd': 'arryadia', 'snrt-sport': 'arryadia',
  'medi1': 'medi-1', 'medi1tv': 'medi-1',
  '2m-maroc': '2m', '2m-hd': '2m',
  'almaghribia': 'al-maghribia',
};

function TeamBadge({ src, name, fallbackColor }: { src: string; name: string; fallbackColor: string }) {
  const [err, setErr] = useState(false);
  return (
    <div
      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-2xl border border-white/10 bg-gray-900 overflow-hidden"
      style={{ boxShadow: `0 0 30px ${fallbackColor}40` }}
    >
      {!err
        ? <img src={src} alt={name} className="w-12 h-12 md:w-16 md:h-16 object-contain p-1" onError={() => setErr(true)} />
        : <span className="text-3xl">{name[0]}</span>
      }
    </div>
  );
}

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

      {/* ── Channel info banner (TV channels without a specific match) ─────── */}
      {data.type === 'channel' ? (
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
                🔴 EN DIRECT · بث مباشر · LIVE
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
      ) : (
        /* ── Broadcast matchday graphic (sports events) ───────────────────── */
        <div className="relative rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #080c1f 0%, #0c1445 40%, #080c1f 100%)' }}>

          <div className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          <div className="relative flex items-center justify-between px-5 py-3 border-b border-white/5">
            <div className="flex items-center gap-3">
              {data.competitionLogo && (
                <img src={data.competitionLogo} alt={data.competition}
                  className="h-7 w-auto object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              )}
              <div>
                <p className="text-[#c8b87a] text-[10px] font-bold uppercase tracking-[0.25em]">{data.competition}</p>
                {data.venue && <p className="text-gray-500 text-[9px]">{data.venue}</p>}
              </div>
            </div>
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600 rounded-full text-white text-[10px] font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />LIVE
            </span>
          </div>

          {data.teams && data.logos && (
            <div className="relative flex items-center justify-center gap-4 md:gap-10 px-6 py-8">
              <div className="flex flex-col items-center gap-3 flex-1">
                <TeamBadge src={data.logos[0]} name={data.teams[0]} fallbackColor="#ef4444" />
                <p className="text-white font-black text-sm md:text-base leading-tight text-center">{data.teams[0]}</p>
              </div>
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-xl px-5 py-3 shadow-2xl">
                  <span className="text-white font-black text-3xl md:text-4xl tabular-nums w-8 text-center">-</span>
                  <span className="text-gray-600 font-black text-3xl px-1">:</span>
                  <span className="text-white font-black text-3xl md:text-4xl tabular-nums w-8 text-center">-</span>
                </div>
                <p className="text-[#c8b87a] text-[10px] uppercase tracking-widest">FINAL</p>
              </div>
              <div className="flex flex-col items-center gap-3 flex-1">
                <TeamBadge src={data.logos[1]} name={data.teams[1]} fallbackColor="#3b82f6" />
                <p className="text-white font-black text-sm md:text-base leading-tight text-center">{data.teams[1]}</p>
              </div>
            </div>
          )}

          <div className="relative flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-white/5 bg-black/20">
            <div className="flex flex-wrap gap-4 text-xs">
              {data.date   && <span className="text-gray-400">📅 {data.date}</span>}
              {data.kickoff && <span className="text-gray-400">⏰ {data.kickoff}</span>}
            </div>
            {data.broadcastLogo ? (
              <img src={data.broadcastLogo} alt="Broadcast channel"
                className="h-5 w-auto object-contain opacity-80"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            ) : data.broadcastNote ? (
              <span className="text-gray-400 text-xs">{data.broadcastNote}</span>
            ) : null}
          </div>
        </div>
      )}

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
