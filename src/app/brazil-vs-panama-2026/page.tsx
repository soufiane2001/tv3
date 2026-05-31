import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import JsonLd from '@/components/seo/JsonLd';
import AdBanner from '@/components/ads/AdBanner';
import BrazilPanamaClient from './BrazilPanamaClient';

export const revalidate = 300;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sportalive.live';

// ─── SEO ──────────────────────────────────────────────────────────────────────

const TITLE = '🔴 Brazil vs Panama LIVE Stream Free 2026 — Abu Dhabi Sports 1 | البرازيل بنما بث مباشر | Brésil Panama Direct';
const DESC  = '🔴 Watch Brazil vs Panama LIVE FREE in HD tonight — 31 May 2026 on Abu Dhabi Sports 1. No subscription, no registration. ' +
  'البرازيل ضد بنما بث مباشر مجاناً على أبوظبي الرياضية. ' +
  'Brésil vs Panama en direct gratuit — Abu Dhabi Sports. ' +
  'Brasil vs Panamá ao vivo grátis — sem assinatura.';

const KEYWORDS = [
  // ── English ────────────────────────────────────────────────────────────────
  'brazil vs panama live stream free',
  'brazil panama live 2026',
  'watch brazil vs panama free online',
  'brazil vs panama tonight',
  'brazil vs panama free stream hd',
  'brazil vs panama today live',
  'brazil national team live stream free',
  'brazil football live tonight',
  'brazil vs panama kickoff time',
  'what time is brazil vs panama',
  'brazil vs panama tv channel',
  'abu dhabi sports 1 live stream free',
  'abu dhabi sports live stream',
  'watch abu dhabi sports 1 online free',
  'brazil panama international friendly 2026',
  'brazil vs panama stream no registration',
  'selecao live stream free',
  'brazil vs panama where to watch',
  // ── Português ─────────────────────────────────────────────────────────────
  'brasil vs panamá ao vivo grátis',
  'brasil panamá ao vivo 2026',
  'assistir brasil vs panamá online grátis',
  'brasil panamá jogo hoje ao vivo',
  'canal abu dhabi sports ao vivo',
  'selecao hoje ao vivo grátis',
  'brasil panamá live stream',
  'onde assistir brasil panamá grátis',
  'brasil panamá que horas',
  'jogo do brasil hoje ao vivo grátis',
  'brasil amistoso 2026 ao vivo',
  // ── Français ──────────────────────────────────────────────────────────────
  'brésil panama en direct gratuit',
  'regarder brésil panama gratuitement',
  'brésil vs panama ce soir direct',
  'brésil panama streaming gratuit hd',
  'abu dhabi sports 1 en direct gratuit',
  'voir match brésil panama gratuit',
  'match brésil panama ce soir',
  'heure match brésil panama',
  'brésil panama match amical 2026',
  // ── العربية ───────────────────────────────────────────────────────────────
  'البرازيل ضد بنما بث مباشر',
  'مباراة البرازيل وبنما بث مباشر',
  'البرازيل بنما مباشر مجاناً',
  'مشاهدة مباراة البرازيل اليوم',
  'بث مباشر البرازيل بنما مجاناً',
  'أبوظبي الرياضية 1 بث مباشر مجاناً',
  'قناة أبوظبي الرياضية بث مباشر',
  'مشاهدة أبوظبي الرياضية مجاناً',
  'موعد مباراة البرازيل بنما',
  'توقيت مباراة البرازيل بنما',
  'القناة الناقلة مباراة البرازيل',
  'مباراة البرازيل اليوم بث مجاني',
  'البرازيل بنما كأس العالم 2026',
  'بث مباشر مجاني مباريات اليوم',
  // ── Español ───────────────────────────────────────────────────────────────
  'brasil vs panamá en vivo gratis',
  'ver brasil panamá gratis online',
  'brasil panamá en directo hoy',
  'abu dhabi sports 1 en directo gratis',
  'brasil panamá amistoso 2026',
].join(', ');

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: KEYWORDS,
  alternates: {
    canonical: `${SITE}/brazil-vs-panama-2026`,
    languages: {
      'en':        `${SITE}/brazil-vs-panama-2026`,
      'fr':        `${SITE}/brazil-vs-panama-2026`,
      'ar':        `${SITE}/brazil-vs-panama-2026`,
      'pt':        `${SITE}/brazil-vs-panama-2026`,
      'es':        `${SITE}/brazil-vs-panama-2026`,
      'x-default': `${SITE}/brazil-vs-panama-2026`,
    },
  },
  openGraph: {
    title: '🔴 Brazil vs Panama LIVE FREE — Abu Dhabi Sports 1 | البرازيل بنما | Brésil Panama',
    description: 'Watch Brazil vs Panama live free on Abu Dhabi Sports 1 — tonight 31 May 2026. HD, no subscription. البرازيل بنما بث مجاني.',
    type: 'website',
    url: `${SITE}/brazil-vs-panama-2026`,
    siteName: 'SportaLive',
  },
  twitter: {
    card: 'summary_large_image',
    title: '🔴 Brazil vs Panama LIVE FREE — Tonight 31 May 2026',
    description: 'Stream Brazil vs Panama free in HD on SportaLive via Abu Dhabi Sports 1. No sign-up.',
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const matchJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Brazil vs Panama — International Friendly 2026',
  alternateName: [
    'Brasil vs Panamá 2026',
    'Brésil vs Panama 2026',
    'البرازيل ضد بنما 2026',
    'Brazil Panama Friendly May 2026',
  ],
  description: "International friendly match between Brazil (Seleção Brasileira) and Panama on 31 May 2026. Watch free on Abu Dhabi Sports 1 via SportaLive in HD — no subscription required.",
  startDate: '2026-05-31T19:00:00Z',
  endDate:   '2026-05-31T21:00:00Z',
  sport: 'https://en.wikipedia.org/wiki/Association_football',
  eventStatus: 'https://schema.org/EventScheduled',
  competitor: [
    {
      '@type': 'SportsTeam',
      name: 'Brazil',
      alternateName: ['Brasil', 'Brésil', 'البرازيل', 'Seleção', 'Canarinha'],
      url: 'https://www.cbf.com.br',
      logo: 'https://flagcdn.com/w160/br.png',
      memberOf: { '@type': 'SportsOrganization', name: 'CBF — Confederação Brasileira de Futebol' },
    },
    {
      '@type': 'SportsTeam',
      name: 'Panama',
      alternateName: ['Panamá', 'Panama', 'بنما', 'Los Canaleros'],
      url: 'https://www.fepafut.com',
      logo: 'https://flagcdn.com/w160/pa.png',
      memberOf: { '@type': 'SportsOrganization', name: 'FEPAFUT — Federación Panameña de Fútbol' },
    },
  ],
  offers: {
    '@type': 'Offer',
    name: 'Free Live Stream',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: `${SITE}/brazil-vs-panama-2026`,
  },
};

const broadcastJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BroadcastEvent',
  name: 'Brazil vs Panama Live on Abu Dhabi Sports 1',
  isLiveBroadcast: true,
  startDate: '2026-05-31T19:00:00Z',
  videoFormat: 'HD',
  broadcastDisplayName: 'Abu Dhabi Sports 1',
  potentialAction: { '@type': 'WatchAction', target: `${SITE}/brazil-vs-panama-2026` },
  broadcastOfEvent: { '@type': 'SportsEvent', name: 'Brazil vs Panama 2026' },
};

const videoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Brazil vs Panama LIVE Free Stream — Abu Dhabi Sports 1 2026',
  description: "Free HD live stream of Brazil vs Panama on 31 May 2026 via Abu Dhabi Sports 1. No subscription needed.",
  uploadDate: '2026-05-31',
  contentUrl: `${SITE}/brazil-vs-panama-2026`,
  embedUrl: `${SITE}/brazil-vs-panama-2026`,
  publication: { '@type': 'BroadcastEvent', isLiveBroadcast: true, startDate: '2026-05-31T19:00:00Z' },
  author: { '@type': 'Organization', name: 'SportaLive', url: SITE },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',             item: SITE },
    { '@type': 'ListItem', position: 2, name: 'Live TV',          item: `${SITE}/live` },
    { '@type': 'ListItem', position: 3, name: 'Brazil vs Panama', item: `${SITE}/brazil-vs-panama-2026` },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where to watch Brazil vs Panama live for free?',
      acceptedAnswer: { '@type': 'Answer', text: "Watch Brazil vs Panama live free in HD on SportaLive via Abu Dhabi Sports 1. No subscription, no registration — just click play above and the stream starts instantly." },
    },
    {
      '@type': 'Question',
      name: 'What time is Brazil vs Panama tonight?',
      acceptedAnswer: { '@type': 'Answer', text: 'Brazil vs Panama kicks off tonight on 31 May 2026. Kickoff is around 21:00–22:00 CET (19:00–20:00 UTC). Check the match info below for your local timezone.' },
    },
    {
      '@type': 'Question',
      name: 'What channel is Brazil vs Panama on?',
      acceptedAnswer: { '@type': 'Answer', text: "Brazil vs Panama is broadcast on Abu Dhabi Sports 1. Watch the free live stream directly on SportaLive — no cable or satellite subscription required." },
    },
    {
      '@type': 'Question',
      name: 'Onde assistir Brasil vs Panamá ao vivo grátis?',
      acceptedAnswer: { '@type': 'Answer', text: "Assista Brasil vs Panamá ao vivo e grátis em HD no SportaLive via Abu Dhabi Sports 1. Sem assinatura, sem cadastro — clique em assistir e o stream começa imediatamente." },
    },
    {
      '@type': 'Question',
      name: 'أين أشاهد مباراة البرازيل وبنما مجاناً؟',
      acceptedAnswer: { '@type': 'Answer', text: "شاهد مباراة البرازيل وبنما مجاناً وبجودة HD على SportaLive عبر قناة أبوظبي الرياضية 1. بدون اشتراك، بدون تسجيل — اضغط على زر التشغيل وتبدأ المشاهدة فوراً." },
    },
    {
      '@type': 'Question',
      name: 'Comment regarder Brésil vs Panama gratuitement ?',
      acceptedAnswer: { '@type': 'Answer', text: "Regardez Brésil vs Panama en direct et gratuitement en HD sur SportaLive via Abu Dhabi Sports 1. Sans abonnement, sans inscription — le stream démarre immédiatement." },
    },
  ],
};

// ─── Channel lookup ───────────────────────────────────────────────────────────

async function getAbuDhabiChannel() {
  try {
    const channel = await prisma.channel.findFirst({
      where: {
        isActive: true,
        OR: [
          { slug: 'abu-dhabi-sports-1' },
          { slug: 'abu-dhabi-sports1' },
          { slug: 'abudhabi-sports-1' },
          { name: { contains: 'Abu Dhabi Sport', mode: 'insensitive' } },
        ],
      },
      include: { category: { select: { name: true, slug: true } } },
      orderBy: { order: 'asc' },
    });
    return channel;
  } catch { return null; }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BrazilVsPanamaPage() {
  const channel = await getAbuDhabiChannel();

  return (
    <>
      <JsonLd data={matchJsonLd} />
      <JsonLd data={broadcastJsonLd} />
      <JsonLd data={videoJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-5xl mx-auto space-y-8 px-4 py-6">

        {/* ── H1 + Player ── */}
        <section>
          <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
            <div>
              <h1 className="text-white font-black text-xl md:text-3xl leading-tight">
                🔴 Brazil vs Panama —{' '}
                <span className="text-yellow-400">Live Stream Free Tonight</span>
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                البرازيل ضد بنما · Brasil vs Panamá · Brésil Panama · 31 May 2026
              </p>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 rounded-full text-white text-xs font-black uppercase tracking-wider flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />Live
            </span>
          </div>
          <BrazilPanamaClient channel={channel as any} />
        </section>

        <AdBanner />

        {/* ── Match Info + Kickoff Times ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900/60 border border-white/5 rounded-2xl p-5 space-y-3">
            <h2 className="text-white font-bold text-sm uppercase tracking-wider">⚽ Match Details</h2>
            <div className="space-y-2 text-sm">
              {[
                ['Match',       'Brazil vs Panama'],
                ['Date',        '31 May 2026 — Tonight'],
                ['Competition', 'International Friendly 2026'],
                ['Broadcast',   'Abu Dhabi Sports 1 🔴 FREE'],
                ['Stream',      'SportaLive — HD, No Registration'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2">
                  <span className="text-gray-500">{k}</span>
                  <span className={`text-right font-medium ${k === 'Broadcast' ? 'text-yellow-400' : 'text-white'}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/60 border border-white/5 rounded-2xl p-5 space-y-3">
            <h2 className="text-white font-bold text-sm uppercase tracking-wider">🌍 How to Watch</h2>
            <div className="space-y-1.5 text-sm text-gray-400">
              <p>🇬🇧 <span className="text-white">Watch Brazil vs Panama free — Abu Dhabi Sports 1, HD, no subscription.</span></p>
              <p>🇸🇦 <span className="text-white" dir="rtl">شاهد البرازيل وبنما مجاناً على أبوظبي الرياضية 1 بجودة HD.</span></p>
              <p>🇧🇷 <span className="text-white">Assista Brasil vs Panamá grátis — Abu Dhabi Sports 1, HD, sem assinatura.</span></p>
              <p>🇫🇷 <span className="text-white">Regarder Brésil Panama gratuit — Abu Dhabi Sports 1, HD, sans abonnement.</span></p>
            </div>
          </div>
        </section>

        {/* ── Multilingual blocks ── */}
        <section>
          <h2 className="text-white font-bold text-sm uppercase tracking-wider mb-3">🌍 EN · AR · PT · FR</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                flag: '🇬🇧', lang: 'English',
                title: 'Brazil vs Panama Live Stream Free HD — Tonight',
                body: "Watch Brazil vs Panama live tonight free in HD on SportaLive via Abu Dhabi Sports 1. The Seleção faces Panama in this international friendly ahead of the 2026 World Cup. No subscription, no registration — click play and watch on any device.",
              },
              {
                flag: '🇸🇦', lang: 'العربية', rtl: true,
                title: 'مباراة البرازيل وبنما بث مباشر مجاناً الليلة',
                body: "شاهد مباراة البرازيل وبنما بث مباشر مجاناً الليلة وبجودة HD على SportaLive عبر قناة أبوظبي الرياضية 1. منتخب البرازيل يواجه بنما في مباراة دولية ودية. بدون اشتراك، بدون تسجيل.",
              },
              {
                flag: '🇧🇷', lang: 'Português',
                title: 'Brasil vs Panamá Ao Vivo Grátis HD — Hoje à Noite',
                body: "Assista Brasil vs Panamá ao vivo e grátis em HD no SportaLive via Abu Dhabi Sports 1. A Seleção Brasileira enfrenta o Panamá neste amistoso internacional. Sem assinatura, sem cadastro — funciona em qualquer dispositivo.",
              },
              {
                flag: '🇫🇷', lang: 'Français',
                title: 'Brésil vs Panama En Direct Gratuit HD — Ce Soir',
                body: "Regardez Brésil vs Panama en direct ce soir gratuitement en HD sur SportaLive via Abu Dhabi Sports 1. La Seleção affronte le Panama dans ce match amical international. Sans abonnement, sans inscription.",
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

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-white font-bold text-sm uppercase tracking-wider mb-3">❓ FAQ</h2>
          <div className="space-y-2">
            {faqJsonLd.mainEntity.map((item: any, i: number) => (
              <details key={i} className="bg-gray-800/40 border border-white/5 rounded-xl p-3 group cursor-pointer">
                <summary className="text-white text-sm font-medium list-none flex justify-between items-center gap-2">
                  <span>{item.name}</span>
                  <span className="text-yellow-400 text-lg flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-400 text-xs mt-2 leading-relaxed">{item.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        <AdBanner />

        {/* ── Rich content ── */}
        <section className="bg-gray-900/40 border border-white/5 rounded-2xl p-6 space-y-5">
          <h2 className="text-white font-black text-lg">Brazil vs Panama — Live Stream Guide</h2>
          <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
            <p>
              <strong className="text-white">Brazil vs Panama</strong> kicks off tonight on <strong className="text-yellow-400">31 May 2026</strong> in what promises to be an exciting international warm-up for the <strong className="text-white">FIFA World Cup 2026</strong>. Watch the full match <strong className="text-white">free in HD on SportaLive</strong> via <strong className="text-white">Abu Dhabi Sports 1</strong>. No subscription, no registration — just click play above.
            </p>
            <div dir="rtl" className="border-r-2 border-yellow-500/30 pr-4">
              <p>
                <strong className="text-white">مباراة البرازيل وبنما</strong> تُقام الليلة <strong className="text-yellow-400">31 مايو 2026</strong> في إطار الاستعدادات لكأس العالم FIFA 2026. شاهد المباراة كاملة <strong className="text-white">مجاناً وبجودة HD على SportaLive</strong> عبر قناة <strong className="text-white">أبوظبي الرياضية 1</strong>. بدون اشتراك، بدون تسجيل — اضغط على زر التشغيل.
              </p>
            </div>
            <p>
              <strong className="text-white">Brasil vs Panamá</strong> acontece esta noite, em <strong className="text-yellow-400">31 de maio de 2026</strong>, como preparação para a <strong className="text-white">Copa do Mundo FIFA 2026</strong>. Assista ao jogo completo <strong className="text-white">de graça em HD no SportaLive</strong> via <strong className="text-white">Abu Dhabi Sports 1</strong>. Sem assinatura, sem cadastro — clique em assistir.
            </p>
          </div>
        </section>

        {/* ── Internal links ── */}
        <section>
          <p className="text-gray-500 text-xs mb-2">Related:</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/channel/abu-dhabi-sports-1', label: '📺 Abu Dhabi Sports 1 Live' },
              { href: '/wc2026',                     label: '🏆 WC 2026 Hub'             },
              { href: '/live',                       label: '📡 All Live Channels'        },
              { href: '/germany-vs-finland-2026',    label: '🔴 Germany vs Finland Live'  },
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
