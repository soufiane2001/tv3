import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import JsonLd from '@/components/seo/JsonLd';
import AdBanner from '@/components/ads/AdBanner';
import GermanyFinlandClient from './GermanyFinlandClient';

export const revalidate = 300;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sportalive.live';
const LEQUIPE_STREAM = 'https://raw.githubusercontent.com/Paradise-91/ParaTV/main/streams/lequipe/la-chaine-l-equipe-en-direct-dm.m3u8';

// ─── SEO ──────────────────────────────────────────────────────────────────────

const TITLE = '🔴 Germany vs Finland LIVE Stream Free 2026 | Deutschland gegen Finnland Kostenlos | Allemagne Finlande En Direct | ألمانيا فنلندا بث مباشر';

const DESC = '🔴 Watch Germany vs Finland LIVE FREE in HD — 31 May 2026. Stream on L\'Équipe TV, no subscription, no registration. ' +
  'Deutschland gegen Finnland live kostenlos sehen — kein Abo. ' +
  'Allemagne vs Finlande en direct gratuit — sans inscription. ' +
  'مشاهدة مباراة ألمانيا وفنلندا بث مباشر مجاناً بجودة HD بدون اشتراك.';

const KEYWORDS = [
  // ── English ────────────────────────────────────────────────────────────────
  'germany vs finland live stream free',
  'germany vs finland live 2026',
  'watch germany vs finland free online',
  'germany finland live stream hd',
  'germany vs finland today live',
  'germany vs finland free stream',
  'germany finland match live',
  'germany vs finland live tv',
  'germany national team live stream free',
  'germany football live today',
  'dfb live stream free',
  'germany vs finland kickoff time',
  'what time is germany vs finland',
  'germany finland prediction 2026',
  'germany vs finland lineup',
  'germany finland starting 11',
  'germany vs finland score',
  'germany vs finland result',
  'germany vs finland where to watch',
  'what channel is germany vs finland on',
  'germany vs finland tv channel uk',
  'germany vs finland tv channel usa',
  'germany vs finland stream no sign up',
  'watch germany football free 2026',
  'germany vs finland international friendly',
  'germany finland pre world cup 2026',
  'lequipe tv live stream free',
  "l'equipe tv germany finland stream",
  'sportalive germany finland',
  'germany vs finland free hd no registration',
  // ── Français ──────────────────────────────────────────────────────────────
  'allemagne finlande en direct gratuit',
  'regarder allemagne finlande gratuitement',
  'match allemagne finlande ce soir',
  'match allemagne finlande direct gratuit',
  'streaming allemagne finlande gratuit hd',
  'quelle chaine diffuse allemagne finlande',
  'allemagne finlande l equipe tv',
  "l'equipe tv en direct gratuit",
  'lequipe direct gratuit',
  'voir match allemagne finlande gratuit',
  'allemagne finlande live streaming',
  'heure match allemagne finlande',
  'quelle heure allemagne finlande',
  'pronostic allemagne finlande 2026',
  'composition allemagne finlande',
  'compo probable allemagne finlande',
  'allemagne finlande chaîne tv france',
  "match de foot d'aujourd'hui allemagne finlande",
  'football direct gratuit allemagne finlande',
  'streaming foot gratuit ce soir',
  'match de préparation coupe du monde 2026',
  'allemagne finlande match amical 2026',
  // ── Deutsch ───────────────────────────────────────────────────────────────
  'deutschland gegen finnland live stream',
  'deutschland finnland live kostenlos',
  'deutschland vs finnland heute live',
  'wo läuft deutschland gegen finnland',
  'wo wird deutschland finnland übertragen',
  'deutschland finnland kostenlos schauen',
  'nationalmannschaft heute live stream',
  'dfb spiel heute live kostenlos',
  'deutschland spiel heute live stream',
  'deutschland finnland live übertragung',
  'fußball heute live kostenlos',
  'deutschland gegen finnland uhrzeit',
  'anpfiff deutschland finnland',
  'deutschland finnland aufstellung',
  'deutschland finnland prognose',
  'deutschland finnland live im internet',
  'deutschland gegen finnland kostenlos im internet',
  'lequipe tv deutschland kostenlos',
  'nationalmannschaft finnland live kostenlos sehen',
  'deutschland finnland freundschaftsspiel 2026',
  'dfb elf heute finnland live',
  'deutschland finnland vorschau',
  'wo kann ich deutschland finnland gratis sehen',
  // ── العربية ───────────────────────────────────────────────────────────────
  'مباراة ألمانيا وفنلندا بث مباشر',
  'المانيا وفنلندا بث مباشر',
  'ألمانيا فنلندا بث مباشر مجاناً',
  'مشاهدة مباراة ألمانيا اليوم',
  'بث مباشر ألمانيا فنلندا',
  'ألمانيا ضد فنلندا مباشر مجاناً',
  'مباراة ألمانيا فنلندا اليوم مجاناً',
  'مشاهدة ألمانيا وفنلندا بدون اشتراك',
  'بث مباشر مجاني مباراة ألمانيا',
  'موعد مباراة ألمانيا فنلندا',
  'توقيت مباراة ألمانيا فنلندا',
  'القناة الناقلة لمباراة ألمانيا فنلندا',
  'تشكيلة ألمانيا ضد فنلندا',
  'نتيجة مباراة ألمانيا فنلندا',
  'ألمانيا فنلندا بث مباشر HD',
  "قناة lequipe بث مباشر مجاناً",
  'مشاهدة قناة ليكيب مباشر',
  'مباراة ودية ألمانيا 2026',
  'ألمانيا فنلندا كأس العالم 2026',
  'بث مجاني مباريات اليوم',
  // ── Long-tail / intent ────────────────────────────────────────────────────
  'germany vs finland live stream free reddit',
  'germany finland 2026 stream without account',
  'germany vs finland vip stream',
  'germany finland live score 2026',
  'germany vs finland head to head',
].join(', ');

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: KEYWORDS,
  alternates: {
    canonical: `${SITE}/germany-vs-finland-2026`,
    languages: {
      'en':    `${SITE}/germany-vs-finland-2026`,
      'fr':    `${SITE}/germany-vs-finland-2026`,
      'de':    `${SITE}/germany-vs-finland-2026`,
      'ar':    `${SITE}/germany-vs-finland-2026`,
      'x-default': `${SITE}/germany-vs-finland-2026`,
    },
  },
  openGraph: {
    title: '🔴 Germany vs Finland LIVE Free — L\'Équipe TV | Deutschland Finnland | Allemagne Finlande | ألمانيا فنلندا',
    description: 'Watch Germany vs Finland live free in HD on L\'Équipe TV — 31 May 2026. No registration. Deutschland Finnland kostenlos. Allemagne Finlande gratuit. ألمانيا فنلندا بث مجاني.',
    type: 'website',
    siteName: 'SportaLive',
    locale: 'en_US',
    alternateLocale: ['fr_FR', 'de_DE', 'ar_SA'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🔴 Germany vs Finland LIVE FREE — 31 May 2026',
    description: 'Stream Germany vs Finland free in HD on SportaLive via L\'Équipe TV. No sign-up. Deutschland Finnland kostenlos.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const matchJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Germany vs Finland — International Friendly 2026',
  alternateName: [
    'Deutschland gegen Finnland 2026',
    'Allemagne vs Finlande 2026',
    'مباراة ألمانيا وفنلندا 2026',
    'Germany Finland Friendly May 2026',
  ],
  description: 'International friendly match between Germany (Deutschland) and Finland (Suomi) on 31 May 2026. Watch the free live stream on L\'Équipe TV via SportaLive in HD — no subscription required.',
  startDate: '2026-05-31T19:45:00Z',
  endDate:   '2026-05-31T21:45:00Z',
  sport: 'https://en.wikipedia.org/wiki/Association_football',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  competitor: [
    {
      '@type': 'SportsTeam',
      name: 'Germany',
      alternateName: ['Deutschland', 'Allemagne', 'ألمانيا', 'Die Mannschaft', 'DFB-Elf'],
      url: 'https://www.dfb.de',
      logo: 'https://flagcdn.com/w160/de.png',
      memberOf: { '@type': 'SportsOrganization', name: 'DFB — Deutscher Fußball-Bund' },
    },
    {
      '@type': 'SportsTeam',
      name: 'Finland',
      alternateName: ['Suomi', 'Finlande', 'فنلندا', 'Huuhkajat'],
      url: 'https://www.palloliitto.fi',
      logo: 'https://flagcdn.com/w160/fi.png',
      memberOf: { '@type': 'SportsOrganization', name: 'SPL — Suomen Palloliitto' },
    },
  ],
  organizer: [
    { '@type': 'Organization', name: 'DFB — Deutscher Fußball-Bund', url: 'https://www.dfb.de' },
    { '@type': 'Organization', name: 'UEFA', url: 'https://www.uefa.com' },
  ],
  offers: {
    '@type': 'Offer',
    name: 'Free Live Stream — Germany vs Finland 2026',
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-05-31T00:00:00Z',
    url: `${SITE}/germany-vs-finland-2026`,
  },
};

const broadcastJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BroadcastEvent',
  name: "Germany vs Finland Live on L'Équipe TV — Free Stream",
  isLiveBroadcast: true,
  startDate: '2026-05-31T19:45:00Z',
  endDate:   '2026-05-31T21:45:00Z',
  videoFormat: 'HD',
  broadcastDisplayName: "L'Équipe TV",
  inLanguage: ['fr', 'en', 'de'],
  potentialAction: {
    '@type': 'WatchAction',
    target: [
      { '@type': 'EntryPoint', urlTemplate: `${SITE}/germany-vs-finland-2026`, inLanguage: 'en' },
      { '@type': 'EntryPoint', urlTemplate: `${SITE}/germany-vs-finland-2026`, inLanguage: 'fr' },
      { '@type': 'EntryPoint', urlTemplate: `${SITE}/germany-vs-finland-2026`, inLanguage: 'de' },
      { '@type': 'EntryPoint', urlTemplate: `${SITE}/germany-vs-finland-2026`, inLanguage: 'ar' },
    ],
  },
  broadcastOfEvent: {
    '@type': 'SportsEvent',
    name: 'Germany vs Finland — International Friendly 2026',
    startDate: '2026-05-31T19:45:00Z',
  },
  publisher: {
    '@type': 'Organization',
    name: "L'Équipe — SportaLive",
    url: SITE,
  },
};

const videoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: "Germany vs Finland LIVE Free Stream — L'Équipe TV 2026",
  description: "Free live HD stream of Germany vs Finland international friendly on 31 May 2026. Watch on L'Équipe TV via SportaLive — no subscription needed. Deutschland gegen Finnland live kostenlos. Allemagne Finlande gratuit. ألمانيا فنلندا بث مجاني.",
  thumbnailUrl: `${SITE}/og-germany-finland.jpg`,
  uploadDate: '2026-05-31',
  contentUrl: `${SITE}/germany-vs-finland-2026`,
  embedUrl: `${SITE}/germany-vs-finland-2026`,
  publication: {
    '@type': 'BroadcastEvent',
    isLiveBroadcast: true,
    startDate: '2026-05-31T19:45:00Z',
  },
  author: { '@type': 'Organization', name: 'SportaLive', url: SITE },
  inLanguage: ['en', 'fr', 'de', 'ar'],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',                item: SITE },
    { '@type': 'ListItem', position: 2, name: 'Live TV',             item: `${SITE}/live` },
    { '@type': 'ListItem', position: 3, name: 'WC 2026',             item: `${SITE}/wc2026` },
    { '@type': 'ListItem', position: 4, name: 'Germany vs Finland',  item: `${SITE}/germany-vs-finland-2026` },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where can I watch Germany vs Finland live for free?',
      acceptedAnswer: { '@type': 'Answer', text: "Watch Germany vs Finland live for free in HD on SportaLive via L'Équipe TV. No subscription, no registration — just click Watch and the stream starts instantly on any device." },
    },
    {
      '@type': 'Question',
      name: 'What time does Germany vs Finland kick off?',
      acceptedAnswer: { '@type': 'Answer', text: 'Germany vs Finland kicks off at 21:45 CET (19:45 UTC) on 31 May 2026. That is 8:45 PM in Paris and Berlin, 7:45 PM in London, 3:45 PM in New York, 10:45 PM in Cairo.' },
    },
    {
      '@type': 'Question',
      name: 'What channel is Germany vs Finland on?',
      acceptedAnswer: { '@type': 'Answer', text: "Germany vs Finland is broadcast live on L'Équipe TV in France. Watch the free HD live stream right here on SportaLive — no cable subscription required." },
    },
    {
      '@type': 'Question',
      name: 'Wo kann ich Deutschland gegen Finnland kostenlos sehen?',
      acceptedAnswer: { '@type': 'Answer', text: "Deutschland gegen Finnland können Sie kostenlos und in HD auf SportaLive über L'Équipe TV ansehen. Kein Abo, keine Anmeldung erforderlich — einfach auf Play klicken." },
    },
    {
      '@type': 'Question',
      name: 'Wo wird Deutschland gegen Finnland übertragen?',
      acceptedAnswer: { '@type': 'Answer', text: "Das Spiel Deutschland gegen Finnland wird auf L'Équipe TV übertragen. Auf SportaLive können Sie den kostenlosen Live-Stream in HD direkt im Browser sehen — kein Download, kein Abo." },
    },
    {
      '@type': 'Question',
      name: 'Um wie viel Uhr ist Anpfiff Deutschland Finnland?',
      acceptedAnswer: { '@type': 'Answer', text: 'Anpfiff des Spiels Deutschland gegen Finnland ist am 31. Mai 2026 um 21:45 Uhr MEZ (19:45 Uhr UTC).' },
    },
    {
      '@type': 'Question',
      name: 'Comment regarder Allemagne Finlande gratuitement ?',
      acceptedAnswer: { '@type': 'Answer', text: "Regardez Allemagne vs Finlande en direct et gratuitement en HD sur SportaLive via L'Équipe TV. Sans abonnement, sans inscription — streaming immédiat disponible depuis n'importe où dans le monde." },
    },
    {
      '@type': 'Question',
      name: "Sur quelle chaîne passe Allemagne Finlande ?",
      acceptedAnswer: { '@type': 'Answer', text: "Allemagne contre Finlande est diffusé sur L'Équipe TV en France. Regardez le stream gratuit en HD directement sur SportaLive — aucun abonnement câble nécessaire." },
    },
    {
      '@type': 'Question',
      name: "À quelle heure est le match Allemagne Finlande ?",
      acceptedAnswer: { '@type': 'Answer', text: "Le coup d'envoi Allemagne Finlande est à 21h45 CET (19h45 UTC) le 31 mai 2026 — soit 21h45 à Paris et Berlin, 20h45 à Londres." },
    },
    {
      '@type': 'Question',
      name: 'كيف أشاهد مباراة ألمانيا وفنلندا مجاناً؟',
      acceptedAnswer: { '@type': 'Answer', text: "يمكنك مشاهدة مباراة ألمانيا وفنلندا مجاناً وبجودة HD على موقع SportaLive عبر قناة L'Équipe TV، بدون اشتراك أو تسجيل. فقط اضغط على زر التشغيل وستبدأ البث فوراً." },
    },
    {
      '@type': 'Question',
      name: 'ما هو موعد مباراة ألمانيا فنلندا؟',
      acceptedAnswer: { '@type': 'Answer', text: 'تنطلق مباراة ألمانيا ضد فنلندا في 31 مايو 2026 الساعة 21:45 بتوقيت وسط أوروبا (19:45 UTC)، أي الساعة 22:45 بتوقيت القاهرة والرياض.' },
    },
    {
      '@type': 'Question',
      name: 'Is the Germany vs Finland stream available on mobile?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — the Germany vs Finland live stream on SportaLive works on all devices: mobile (iOS and Android), tablet, laptop and desktop. No app needed, just open the page in your browser.' },
    },
  ],
};

// ─── Channel setup ────────────────────────────────────────────────────────────

async function getLequipeChannel() {
  try {
    const cat = await prisma.category.upsert({
      where:  { slug: 'sports' },
      update: {},
      create: { name: 'Sports', slug: 'sports' },
    });
    const channel = await prisma.channel.upsert({
      where:  { slug: 'lequipe-tv' },
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
    await prisma.category.update({ where: { id: cat.id }, data: { channelCount: { increment: 1 } } }).catch(() => null);
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
      <JsonLd data={videoJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-5xl mx-auto space-y-8 px-4 py-6">

        {/* ── H1 + Player ─────────────────────────────────────────────────── */}
        <section>
          <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
            <div>
              <h1 className="text-white font-black text-xl md:text-3xl leading-tight">
                🔴 Germany vs Finland —{' '}
                <span className="text-yellow-400">Live Stream Free</span>
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Deutschland gegen Finnland · Allemagne Finlande · مباراة ألمانيا وفنلندا · 31 May 2026 · 21:45 CET
              </p>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 rounded-full text-white text-xs font-black uppercase tracking-wider flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />Live
            </span>
          </div>
          <GermanyFinlandClient channel={channel as any} />
        </section>

        <AdBanner />

        {/* ── Match info + How to watch ────────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900/60 border border-white/5 rounded-2xl p-5 space-y-3">
            <h2 className="text-white font-bold text-sm uppercase tracking-wider">⚽ Match Details</h2>
            <div className="space-y-2 text-sm">
              {[
                ['Match',       'Germany vs Finland'],
                ['Date',        '31 May 2026 — Sunday'],
                ['Kickoff',     '21:45 CET · 20:45 BST · 19:45 UTC'],
                ['Competition', 'International Friendly 2026'],
                ['Venue',       'Germany (Home)'],
                ['Broadcast',   "L'Équipe TV 🔴 FREE"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2">
                  <span className="text-gray-500">{k}</span>
                  <span className={`text-right font-medium ${k === 'Broadcast' ? 'text-yellow-400' : 'text-white'}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/60 border border-white/5 rounded-2xl p-5 space-y-3">
            <h2 className="text-white font-bold text-sm uppercase tracking-wider">🕐 Kickoff Times</h2>
            <div className="space-y-2 text-sm">
              {[
                ['🇩🇪 Berlin / Paris', '21:45'],
                ['🇬🇧 London',         '20:45'],
                ['🇸🇦 Riyadh / Cairo', '22:45'],
                ['🇺🇸 New York',       '15:45'],
                ['🇺🇸 Los Angeles',    '12:45'],
                ['🇦🇺 Sydney',        '05:45 +1'],
              ].map(([city, time]) => (
                <div key={city} className="flex justify-between">
                  <span className="text-gray-400">{city}</span>
                  <span className="text-white font-semibold tabular-nums">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Multilingual description blocks ─────────────────────────────── */}
        <section>
          <h2 className="text-white font-bold text-sm uppercase tracking-wider mb-3">
            🌍 How to Watch — EN · FR · DE · AR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                flag: '🇬🇧', lang: 'English',
                title: 'Germany vs Finland Live Stream Free HD 2026',
                body: "Watch Germany vs Finland live free in HD on SportaLive. We stream L'Équipe TV directly — no subscription, no registration, no app needed. Works on mobile, tablet and desktop. The free stream starts the moment you click play. Germany national team faces Finland in this international friendly ahead of the 2026 World Cup.",
              },
              {
                flag: '🇫🇷', lang: 'Français',
                title: 'Allemagne vs Finlande en Direct Gratuit HD',
                body: "Regardez Allemagne contre Finlande en direct et gratuitement en HD sur SportaLive via L'Équipe TV. Sans abonnement, sans inscription — streaming immédiat depuis n'importe quel appareil. La Mannschaft affronte la Finlande dans ce match de préparation avant la Coupe du Monde 2026. Coup d'envoi à 21h45 CET le 31 mai 2026.",
              },
              {
                flag: '🇩🇪', lang: 'Deutsch',
                title: 'Deutschland gegen Finnland Live Stream kostenlos HD',
                body: "Deutschland gegen Finnland jetzt kostenlos und in HD auf SportaLive über L'Équipe TV ansehen. Kein Abo, keine Anmeldung — sofortiger Live-Stream auf jedem Gerät. Die Nationalmannschaft trifft auf Finnland in diesem Freundschaftsspiel zur Vorbereitung auf die FIFA WM 2026. Anpfiff: 21:45 Uhr MEZ am 31. Mai 2026.",
              },
              {
                flag: '🇸🇦', lang: 'العربية', rtl: true,
                title: 'مباراة ألمانيا وفنلندا بث مباشر مجاناً HD 2026',
                body: "شاهد مباراة ألمانيا وفنلندا بث مباشر مجاناً وبجودة عالية HD على موقع SportaLive عبر قناة L'Équipe TV. بدون اشتراك، بدون تسجيل — تعمل على جميع الأجهزة. منتخب ألمانيا يواجه فنلندا في مباراة ودية دولية استعداداً لكأس العالم 2026. موعد المباراة: 21:45 بتوقيت وسط أوروبا (22:45 بالتوقيت السعودي والمصري).",
              },
            ].map(({ flag, lang, title, body, rtl }) => (
              <div key={lang} className="bg-gray-800/40 border border-white/5 rounded-xl p-4" dir={rtl ? 'rtl' : 'ltr'}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">{flag}</span>
                  <span className="text-gray-500 text-xs uppercase tracking-wider">{lang}</span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-white font-bold text-sm uppercase tracking-wider mb-3">❓ FAQ</h2>
          <div className="space-y-2">
            {[
              { q: 'Where can I watch Germany vs Finland live for free?',                         a: "Watch on SportaLive — we stream L'Équipe TV live in HD for free. No account needed, works on any device worldwide." },
              { q: 'What time is Germany vs Finland kick-off?',                                   a: 'Kick-off is at 21:45 CET (19:45 UTC) on 31 May 2026. That is 20:45 in London, 15:45 in New York, 22:45 in Cairo.' },
              { q: "What channel is Germany vs Finland on?",                                      a: "Germany vs Finland is live on L'Équipe TV (France). Watch the free HD stream here on SportaLive — no cable needed." },
              { q: 'Is the stream available on mobile?',                                          a: 'Yes — the stream works on all devices: iPhone, Android, tablet, laptop and desktop browser. No download or app required.' },
              { q: 'Wo kann ich Deutschland gegen Finnland kostenlos live sehen?',                a: "Auf SportaLive über L'Équipe TV — kostenlos, kein Abo, keine Anmeldung. Auf jedem Gerät im Browser verfügbar." },
              { q: 'Um wie viel Uhr ist Anpfiff Deutschland gegen Finnland?',                     a: 'Anpfiff ist am 31. Mai 2026 um 21:45 Uhr MEZ — 19:45 Uhr UTC, 20:45 Uhr London.' },
              { q: 'Wo wird Deutschland Finnland übertragen?',                                    a: "Das Spiel wird auf L'Équipe TV übertragen. Den kostenlosen Live-Stream finden Sie hier auf SportaLive — kein Kabelabo nötig." },
              { q: 'Comment regarder Allemagne Finlande gratuitement ?',                          a: "Sur SportaLive via L'Équipe TV — gratuit, sans inscription, sans abonnement. Disponible sur tous les appareils." },
              { q: "À quelle heure est le match Allemagne Finlande ?",                            a: "Coup d'envoi à 21h45 CET (19h45 UTC) le 31 mai 2026 — 21h45 à Paris et Berlin, 20h45 à Londres." },
              { q: "Sur quelle chaîne passe Allemagne Finlande ?",                               a: "Allemagne Finlande est diffusé sur L'Équipe TV. Regardez le stream gratuit HD ici sur SportaLive." },
              { q: 'كيف أشاهد مباراة ألمانيا وفنلندا مجاناً؟',                                   a: "على SportaLive عبر قناة L'Équipe TV — مجاناً، بدون اشتراك، بدون تسجيل. يعمل على جميع الأجهزة." },
              { q: 'ما هو موعد مباراة ألمانيا فنلندا؟',                                           a: '31 مايو 2026 الساعة 21:45 بتوقيت وسط أوروبا — أي 22:45 بتوقيت القاهرة والرياض.' },
              { q: 'ما القناة الناقلة لمباراة ألمانيا وفنلندا؟',                                   a: "تُنقل المباراة على قناة L'Équipe TV الفرنسية. شاهد البث المباشر المجاني HD هنا على SportaLive." },
            ].map(({ q, a }, i) => (
              <details key={i} className="bg-gray-800/40 border border-white/5 rounded-xl p-3 group cursor-pointer">
                <summary className="text-white text-sm font-medium list-none flex justify-between items-center gap-2">
                  <span>{q}</span>
                  <span className="text-yellow-400 text-lg flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-400 text-xs mt-2 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <AdBanner />

        {/* ── Rich blog content ────────────────────────────────────────────── */}
        <section className="bg-gray-900/40 border border-white/5 rounded-2xl p-6 space-y-5">
          <h2 className="text-white font-black text-lg">
            Germany vs Finland — Live Stream Guide & Match Preview
          </h2>
          <div className="space-y-5 text-sm text-gray-300 leading-relaxed">

            {/* English */}
            <div>
              <h3 className="text-white font-bold mb-1">🇬🇧 Germany vs Finland — Free Live Stream</h3>
              <p>
                <strong className="text-white">Germany vs Finland</strong> kicks off on <strong className="text-yellow-400">31 May 2026</strong> at 21:45 CET — a key international friendly as <em>Die Mannschaft</em> prepares for the <strong className="text-white">FIFA World Cup 2026</strong>. Watch the full match <strong className="text-white">free in HD on SportaLive</strong> via <strong className="text-white">L&apos;Équipe TV</strong>. No subscription, no registration — just click play above. Germany, one of the tournament favourites, will be looking to build form and test their squad depth before the summer&apos;s biggest competition. Finland will be eager to cause an upset on the big stage. Stream available worldwide on any device.
              </p>
            </div>

            {/* Arabic */}
            <div dir="rtl" className="border-r-2 border-yellow-500/30 pr-4">
              <h3 className="text-white font-bold mb-1">🇸🇦 مباراة ألمانيا وفنلندا — بث مباشر مجاناً</h3>
              <p>
                تنطلق <strong className="text-white">مباراة ألمانيا وفنلندا</strong> في <strong className="text-yellow-400">31 مايو 2026</strong> الساعة 21:45 بتوقيت وسط أوروبا، في إطار المباريات الدولية الودية التحضيرية قبيل <strong className="text-white">كأس العالم FIFA 2026</strong>. شاهد المباراة كاملة <strong className="text-white">مجاناً وبجودة HD على SportaLive</strong> عبر قناة <strong className="text-white">L&apos;Équipe TV</strong>. بدون اشتراك، بدون تسجيل — فقط اضغط على زر التشغيل أعلاه. منتخب ألمانيا من أبرز المرشحين للبطولة ويسعى لاختبار تشكيلته قبيل الحدث الأكبر. فنلندا من جهتها ستسعى لتحقيق المفاجأة. البث متاح من جميع أنحاء العالم على أي جهاز.
              </p>
            </div>

            {/* French */}
            <div>
              <h3 className="text-white font-bold mb-1">🇫🇷 Allemagne vs Finlande — Direct Gratuit</h3>
              <p>
                <strong className="text-white">Allemagne contre Finlande</strong> — coup d&apos;envoi le <strong className="text-yellow-400">31 mai 2026 à 21h45 CET</strong>. Ce match amical international est crucial pour <em>Die Mannschaft</em> dans sa préparation à la <strong className="text-white">Coupe du Monde FIFA 2026</strong>. Regardez le match en intégralité <strong className="text-white">gratuitement en HD sur SportaLive</strong> via <strong className="text-white">L&apos;Équipe TV</strong>. Sans abonnement, sans inscription — le streaming commence immédiatement. L&apos;Allemagne, grande favorite de la compétition, teste ses forces avant le tournoi estival. La Finlande cherchera à créer la surprise. Disponible dans le monde entier sur tous les appareils.
              </p>
            </div>

            {/* German */}
            <div lang="de">
              <h3 className="text-white font-bold mb-1">🇩🇪 Deutschland gegen Finnland — Kostenlos Live</h3>
              <p>
                <strong className="text-white">Deutschland gegen Finnland</strong> — Anpfiff am <strong className="text-yellow-400">31. Mai 2026 um 21:45 Uhr MEZ</strong>. Dieses internationale Freundschaftsspiel ist ein wichtiger Test für <em>Die Mannschaft</em> im Hinblick auf die <strong className="text-white">FIFA WM 2026</strong>. Sehen Sie das komplette Spiel <strong className="text-white">kostenlos in HD auf SportaLive</strong> über <strong className="text-white">L&apos;Équipe TV</strong>. Kein Abo, keine Anmeldung — Stream startet sofort. Deutschland gehört zu den Topfavoriten des Turniers und möchte Kaderbreite und Taktik unter Wettkampfbedingungen testen. Finnland will die große Chance nutzen und für eine Überraschung sorgen. Weltweit auf allen Geräten verfügbar.
              </p>
            </div>
          </div>
        </section>

        {/* ── Internal links ────────────────────────────────────────────────── */}
        <section>
          <p className="text-gray-500 text-xs mb-2">Related pages:</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/channel/lequipe-tv',  label: "📺 L'Équipe TV Live"   },
              { href: '/wc2026',              label: '🏆 WC 2026 Hub'         },
              { href: '/live',                label: '📡 All Live Channels'   },
              { href: '/category/sports',     label: '⚽ Sports Channels'     },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                className="px-3 py-1.5 bg-gray-800/60 hover:bg-yellow-600/20 border border-white/10 hover:border-yellow-500/40 text-gray-400 hover:text-white text-xs rounded-lg transition-all">
                {label}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
