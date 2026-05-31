import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import JsonLd from '@/components/seo/JsonLd';
import AdBanner from '@/components/ads/AdBanner';
import GermanyFinlandClient from './GermanyFinlandClient';

export const revalidate = 300;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';

const LEQUIPE_STREAM = 'https://raw.githubusercontent.com/Paradise-91/ParaTV/main/streams/lequipe/la-chaine-l-equipe-en-direct-dm.m3u8';

// ─── SEO ──────────────────────────────────────────────────────────────────────

const TITLE = '🔴 Germany vs Finland LIVE — Free Stream | Deutschland gegen Finnland Live | Allemagne Finlande en Direct';
const DESC  = '🔴 LIVE — Watch Germany vs Finland FREE in HD on L\'Équipe TV. Deutschland gegen Finnland live kostenlos. Allemagne vs Finlande en direct gratuit. مشاهدة ألمانيا فنلندا بث مباشر مجاناً. No registration · Kein Abo · Sans abonnement.';

const KEYWORDS = [
  // English
  'germany vs finland live stream free','germany finland live 2026',
  'watch germany vs finland online free','germany finland free stream hd',
  'germany vs finland today live','germany finland match stream',
  'watch germany finland no registration','germany finland live tv free',
  'lequipe tv live stream free','l\'equipe tv germany finland',
  // French
  'allemagne finlande en direct gratuit','regarder allemagne finlande gratuitement',
  'allemagne vs finlande direct gratuit','allemagne finlande streaming gratuit',
  'l\'equipe tv en direct gratuit','lequipe direct gratuit',
  'voir allemagne finlande en direct','allemagne finlande match direct',
  'l équipe tv live stream','l\'équipe direct',
  'regarder match allemagne finlande gratuit','allemagne finlande live streaming',
  // German
  'deutschland gegen finnland live stream','deutschland finnland live kostenlos',
  'deutschland vs finnland heute live','deutschland finnland stream gratis',
  'deutschland finnland live übertragung','deutschland finnland frei empfangen',
  'wo kann ich deutschland finnland sehen','deutschland finnland kostenlos sehen',
  'lequipe tv deutschland finnland','deutschland finnland live im internet',
  'fussball deutschland heute live kostenlos','deutschland finnland stream deutsch',
  // Arabic
  'مشاهدة ألمانيا فنلندا بث مباشر','ألمانيا ضد فنلندا مباشر مجاناً',
  'بث مباشر ألمانيا فنلندا','ألمانيا فنلندا بدون اشتراك',
  'مشاهدة مباراة ألمانيا فنلندا مجاناً','ألمانيا فنلندا بث مباشر HD',
  'قناة lequipe بث مباشر','مباراة ألمانيا اليوم بث مباشر',
  // Long-tail
  'germany vs finland live stream reddit 2026','germany finland international friendly 2026',
  'lequipe tv live gratuit allemagne','l equipe streaming germany match',
].join(', ');

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: KEYWORDS,
  alternates: {
    canonical: `${SITE}/germany-vs-finland-2026`,
    languages: {
      'en': `${SITE}/germany-vs-finland-2026`,
      'fr': `${SITE}/germany-vs-finland-2026`,
      'de': `${SITE}/germany-vs-finland-2026`,
      'ar': `${SITE}/germany-vs-finland-2026`,
    },
  },
  openGraph: {
    title: '🔴 Germany vs Finland LIVE Free Stream — L\'Équipe TV',
    description: 'Watch Germany vs Finland live for free in HD on L\'Équipe TV. Deutschland gegen Finnland kostenlos. Allemagne Finlande gratuit.',
    type: 'website',
    siteName: 'SportaLive',
  },
  twitter: {
    card: 'summary_large_image',
    title: '🔴 Germany vs Finland LIVE — Free HD Stream',
    description: 'Germany Finland live free on L\'Équipe TV — HD, no registration.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const matchJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Germany vs Finland — International Friendly 2026',
  alternateName: ['Deutschland vs Finnland 2026', 'Allemagne vs Finlande 2026', 'ألمانيا فنلندا 2026'],
  description: 'Live stream of Germany vs Finland international friendly match on 31 May 2026. Watch free on L\'Équipe TV via SportaLive.',
  startDate: '2026-05-31T19:45:00Z',
  sport: 'https://en.wikipedia.org/wiki/Association_football',
  competitor: [
    { '@type': 'SportsTeam', name: 'Germany', alternateName: ['Deutschland', 'Allemagne', 'ألمانيا'], url: 'https://www.dfb.de' },
    { '@type': 'SportsTeam', name: 'Finland', alternateName: ['Suomi', 'Finlande', 'فنلندا'],        url: 'https://www.palloliitto.fi' },
  ],
  organizer: { '@type': 'Organization', name: 'UEFA / DFB' },
  offers: {
    '@type': 'Offer',
    name: 'Free Live Stream',
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: `${SITE}/germany-vs-finland-2026`,
  },
};

const broadcastJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BroadcastEvent',
  name: 'Germany vs Finland Live on L\'Équipe TV',
  isLiveBroadcast: true,
  startDate: '2026-05-31T19:45:00Z',
  videoFormat: 'HD',
  broadcastDisplayName: 'L\'Équipe TV',
  potentialAction: { '@type': 'WatchAction', target: `${SITE}/germany-vs-finland-2026` },
  broadcastOfEvent: { '@type': 'SportsEvent', name: 'Germany vs Finland 2026' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',              item: SITE },
    { '@type': 'ListItem', position: 2, name: 'Live Channels',     item: `${SITE}/live` },
    { '@type': 'ListItem', position: 3, name: 'Germany vs Finland', item: `${SITE}/germany-vs-finland-2026` },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where to watch Germany vs Finland live for free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Watch Germany vs Finland live for free on SportaLive via L\'Équipe TV. No subscription, no registration — just click Watch and the stream starts in HD.' },
    },
    {
      '@type': 'Question',
      name: 'Wo kann ich Deutschland gegen Finnland kostenlos sehen?',
      acceptedAnswer: { '@type': 'Answer', text: 'Deutschland gegen Finnland können Sie kostenlos und in HD auf SportaLive über L\'Équipe TV sehen. Kein Abo, keine Anmeldung erforderlich.' },
    },
    {
      '@type': 'Question',
      name: 'Comment regarder Allemagne Finlande gratuitement ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Regardez Allemagne vs Finlande en direct et gratuitement sur SportaLive via L\'Équipe TV. Sans abonnement, sans inscription — streaming HD immédiat.' },
    },
    {
      '@type': 'Question',
      name: 'كيف أشاهد مباراة ألمانيا فنلندا مجاناً؟',
      acceptedAnswer: { '@type': 'Answer', text: 'يمكنك مشاهدة مباراة ألمانيا ضد فنلندا مجاناً وبجودة HD على موقع SportaLive عبر قناة L\'Équipe TV، بدون اشتراك أو تسجيل.' },
    },
    {
      '@type': 'Question',
      name: 'What channel is Germany vs Finland on?',
      acceptedAnswer: { '@type': 'Answer', text: 'Germany vs Finland is broadcast live on L\'Équipe TV in France. Watch the free live stream directly on SportaLive in HD — no cable required.' },
    },
  ],
};

// ─── Channel setup ────────────────────────────────────────────────────────────

async function getLequipeChannel() {
  try {
    // Upsert so the channel is always available and up-to-date
    const cat = await prisma.category.upsert({
      where: { slug: 'sports' },
      update: {},
      create: { name: 'Sports', slug: 'sports' },
    });

    const channel = await prisma.channel.upsert({
      where: { slug: 'lequipe-tv' },
      update: { streamUrl: LEQUIPE_STREAM, isActive: true },
      create: {
        name: "L'Équipe TV",
        slug: 'lequipe-tv',
        streamUrl: LEQUIPE_STREAM,
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/L%27%C3%89quipe_logo.svg/200px-L%27%C3%89quipe_logo.svg.png',
        groupTitle: 'Sports',
        categoryId: cat.id,
        isActive: true,
      },
      include: { category: { select: { name: true, slug: true } } },
    });

    await prisma.category.update({
      where: { id: cat.id },
      data: { channelCount: { increment: 1 } },
    }).catch(() => null);

    return channel;
  } catch { return null; }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function GermanyFinlandPage() {
  const channel = await getLequipeChannel();

  return (
    <>
      <JsonLd data={matchJsonLd} />
      <JsonLd data={broadcastJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-5xl mx-auto space-y-8 px-4 py-6">

        {/* ── Player ── */}
        <section>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div>
              <h1 className="text-white font-black text-xl md:text-2xl">
                🔴 Germany vs Finland — <span className="text-yellow-400">Live Stream Free</span>
              </h1>
              <p className="text-gray-400 text-sm mt-0.5">
                Deutschland gegen Finnland · Allemagne Finlande · ألمانيا فنلندا · 31 May 2026
              </p>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-red-600 rounded-full text-white text-xs font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />Live
            </span>
          </div>
          <GermanyFinlandClient channel={channel as any} />
        </section>

        <AdBanner />

        {/* ── Match Info ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900/60 border border-white/5 rounded-2xl p-5 space-y-3">
            <h2 className="text-white font-bold text-base">⚽ Match Info</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Match</span><span className="text-white font-semibold">Germany vs Finland</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Date</span><span className="text-white">31 May 2026</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Kickoff</span><span className="text-white">21:45 CET · 19:45 UTC</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Competition</span><span className="text-white">International Friendly</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Broadcast</span><span className="text-yellow-400 font-semibold">L&apos;Équipe TV 🔴 FREE</span></div>
            </div>
          </div>

          <div className="bg-gray-900/60 border border-white/5 rounded-2xl p-5 space-y-3">
            <h2 className="text-white font-bold text-base">🌍 How to Watch</h2>
            <div className="space-y-1.5 text-sm text-gray-400">
              <p>🇬🇧 <span className="text-white">Watch Germany vs Finland free on SportaLive — L&apos;Équipe TV HD stream, no subscription.</span></p>
              <p>🇫🇷 <span className="text-white">Regarder Allemagne Finlande gratuit — L&apos;Équipe TV en direct HD, sans inscription.</span></p>
              <p>🇩🇪 <span className="text-white">Deutschland Finnland kostenlos sehen — L&apos;Équipe TV Live-Stream, kein Abo.</span></p>
              <p>🇸🇦 <span className="text-white">مشاهدة ألمانيا فنلندا مجاناً — بث مباشر HD بدون اشتراك.</span></p>
            </div>
          </div>
        </section>

        {/* ── Multilingual SEO blocks ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              flag: '🇬🇧', lang: 'English',
              title: 'Germany vs Finland Live Stream Free HD',
              body: 'Watch Germany vs Finland live online free in HD on SportaLive. Broadcast on L\'Équipe TV — click play and the stream starts instantly. No registration or subscription required. Available worldwide.',
            },
            {
              flag: '🇫🇷', lang: 'Français',
              title: 'Allemagne vs Finlande en Direct Gratuit',
              body: 'Regardez Allemagne contre Finlande en direct et gratuitement en HD sur SportaLive via L\'Équipe TV. Sans abonnement, sans inscription — streaming immédiat disponible partout dans le monde.',
            },
            {
              flag: '🇩🇪', lang: 'Deutsch',
              title: 'Deutschland gegen Finnland Live Stream kostenlos',
              body: 'Deutschland vs Finnland jetzt kostenlos und in HD auf SportaLive über L\'Équipe TV ansehen. Kein Abo, keine Anmeldung — sofortiger Live-Stream, weltweit verfügbar.',
            },
            {
              flag: '🇸🇦', lang: 'العربية', rtl: true,
              title: 'ألمانيا ضد فنلندا بث مباشر مجاناً',
              body: 'شاهد مباراة ألمانيا ضد فنلندا بث مباشر مجاناً وبجودة عالية HD على موقع SportaLive عبر قناة L\'Équipe TV. بدون اشتراك، بدون تسجيل. متاح من جميع أنحاء العالم.',
            },
          ].map(({ flag, lang, title, body, rtl }) => (
            <div key={lang} className="bg-gray-800/40 border border-white/5 rounded-xl p-4 space-y-1" dir={rtl ? 'rtl' : 'ltr'}>
              <div className="flex items-center gap-2 mb-2">
                <span>{flag}</span>
                <span className="text-gray-500 text-xs uppercase tracking-wider">{lang}</span>
              </div>
              <h3 className="text-white font-semibold text-sm">{title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{body}</p>
            </div>
          ))}
        </section>

        {/* ── FAQ ── */}
        <section className="space-y-2">
          <h2 className="text-white font-bold text-base mb-3">❓ FAQ</h2>
          {[
            { q: 'Where to watch Germany vs Finland live free?', a: 'Watch on SportaLive — we stream L\'Équipe TV live in HD for free. No account needed, works on any device.' },
            { q: 'Wo kann ich Deutschland gegen Finnland kostenlos live sehen?', a: 'Auf SportaLive können Sie Deutschland gegen Finnland kostenlos und in HD schauen — über L\'Équipe TV. Kein Abo erforderlich.' },
            { q: 'Comment voir Allemagne Finlande gratuit ?', a: 'Sur SportaLive via L\'Équipe TV en direct HD. Aucune inscription, aucun abonnement — disponible immédiatement.' },
            { q: 'كيف أشاهد ألمانيا فنلندا مجاناً؟', a: 'على SportaLive عبر قناة L\'Équipe TV بث مباشر HD مجاناً — بدون اشتراك أو تسجيل.' },
            { q: 'What time is Germany vs Finland kick-off?', a: 'Germany vs Finland kicks off at 21:45 CET (19:45 UTC) on 31 May 2026. That\'s 8:45 PM Paris, 8:45 PM Berlin, 7:45 PM London.' },
          ].map(({ q, a }, i) => (
            <details key={i} className="bg-gray-800/40 border border-white/5 rounded-xl p-3 group cursor-pointer">
              <summary className="text-white text-sm font-medium list-none flex justify-between items-center gap-2">
                {q}
                <span className="text-yellow-400 text-lg flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-gray-400 text-xs mt-2 leading-relaxed">{a}</p>
            </details>
          ))}
        </section>

        <AdBanner />

        {/* ── Blog content (EN + FR + DE + AR) ── */}
        <section className="bg-gray-900/40 border border-white/5 rounded-2xl p-6 space-y-6">
          <h2 className="text-white font-black text-lg">Germany vs Finland — Match Preview & Live Stream Guide</h2>

          <div className="prose prose-invert prose-sm max-w-none space-y-4 text-gray-300 leading-relaxed">
            <p>
              <strong className="text-white">Germany vs Finland</strong> kicks off on <strong className="text-yellow-400">31 May 2026</strong> as part of the pre-World Cup international calendar.
              Die Mannschaft faces the Finns in what promises to be a competitive warm-up ahead of FIFA World Cup 2026.
              Watch the <strong className="text-white">free live stream on L&apos;Équipe TV</strong> right here on SportaLive — HD quality, no subscription needed.
            </p>

            <div dir="rtl" className="border-r-2 border-yellow-500/40 pr-4">
              <p className="text-gray-300">
                <strong className="text-white">ألمانيا ضد فنلندا</strong> — مباراة دولية استعداداً لكأس العالم 2026. شاهد البث المباشر المجاني على قناة L&apos;Équipe TV عبر SportaLive بجودة HD وبدون اشتراك.
                منتخب ألمانيا يواجه فنلندا في مباراة ودية قوية قبيل انطلاق مونديال 2026. لا تفوت اللقاء — البث متاح مباشرة أعلاه.
              </p>
            </div>

            <p>
              <strong className="text-white">Allemagne contre Finlande</strong> — match de préparation international du 31 mai 2026.
              Regardez le match en direct gratuitement sur L&apos;Équipe TV via SportaLive. Streaming HD sans abonnement ni inscription.
              La Mannschaft affronte la Finlande dans le cadre de la préparation à la Coupe du Monde 2026.
            </p>

            <p lang="de">
              <strong className="text-white">Deutschland gegen Finnland</strong> — Internationales Freundschaftsspiel am 31. Mai 2026.
              Sehen Sie das Spiel kostenlos und in HD auf SportaLive über L&apos;Équipe TV. Kein Abo, keine Anmeldung notwendig.
              Die Nationalmannschaft testet sich vor der FIFA WM 2026 gegen Finnland — ein wichtiger Test auf dem Weg zum Weltmeisterschafts-Turnier.
            </p>
          </div>
        </section>

        {/* ── Internal links ── */}
        <section className="flex flex-wrap gap-2">
          <span className="text-gray-500 text-xs self-center mr-1">Related:</span>
          {[
            { href: '/live',        label: '📡 All Live Channels' },
            { href: '/wc2026',      label: '🏆 WC 2026 Hub'       },
            { href: '/channel/lequipe-tv', label: '📺 L\'Équipe TV'  },
            { href: '/live',        label: '⚽ More Football'      },
          ].map(({ href, label }) => (
            <Link key={href + label} href={href}
              className="px-3 py-1.5 bg-gray-800/60 hover:bg-yellow-600/20 border border-white/10 hover:border-yellow-500/30 text-gray-400 hover:text-white text-xs rounded-lg transition-all">
              {label}
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}
