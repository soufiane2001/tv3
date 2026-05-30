import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import AdBanner from '@/components/ads/AdBanner';
import ItalianStreamClient from './ItalianStreamClient';

export const revalidate = 300;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';

export const metadata: Metadata = {
  title: 'Dove Vedere Finale Champions League 2026 Gratis — Arsenal vs PSG in Diretta',
  description: '🔴 IN DIRETTA — Dove vedere Arsenal vs PSG Finale Champions League 2026 gratis in HD. La 1, M6 e Canal+ Sport. Senza abbonamento, senza registrazione. Ore 21:00!',
  keywords: [
    'dove vedere la finale di champions league 2026',
    'dove vedere arsenal psg gratis','finale champions league 2026 streaming gratis',
    'arsenal psg diretta gratis','dove vedere finale champions gratis',
    'arsenal psg finale champions dove vedere','finale ucl 2026 streaming',
    'arsenal psg in diretta gratis','come vedere arsenal psg finale',
    'finale champions 2026 canale 5','arsenal psg canale 5 diretta',
    'dove vedere champions league finale senza abbonamento',
  ].join(', '),
  alternates: { canonical: `${SITE}/guardare-finale-champions-2026` },
  openGraph: {
    title: '🔴 Dove Vedere Arsenal vs PSG GRATIS — Finale Champions 2026',
    description: 'Finale Champions League 2026 in diretta gratis — La 1, M6, Canal+ Sport. Senza registrazione.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Arsenal vs PSG — Finale UEFA Champions League 2026',
  description: 'Guarda la Finale della Champions League 2026 tra Arsenal e PSG gratis in diretta su SportaLive.',
  startDate: '2026-05-30T20:00:00Z',
  endDate: '2026-05-30T22:30:00Z',
  sport: 'https://en.wikipedia.org/wiki/Association_football',
  inLanguage: 'it',
  url: `${SITE}/guardare-finale-champions-2026`,
  location: {
    '@type': 'Place',
    name: 'Allianz Arena',
    address: { '@type': 'PostalAddress', addressLocality: 'Munich', addressCountry: 'DE' },
  },
  offers: {
    '@type': 'Offer',
    name: 'Streaming Gratuito — Finale Champions 2026',
    price: '0', priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: `${SITE}/guardare-finale-champions-2026`,
  },
  competitor: [
    { '@type': 'SportsTeam', name: 'Arsenal FC', sameAs: 'https://en.wikipedia.org/wiki/Arsenal_F.C.' },
    { '@type': 'SportsTeam', name: 'Paris Saint-Germain', sameAs: 'https://en.wikipedia.org/wiki/Paris_Saint-Germain_F.C.' },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Dove vedere la Finale di Champions League 2026 gratis?',
      acceptedAnswer: { '@type': 'Answer', text: 'Puoi vedere la Finale Arsenal vs PSG gratis su SportaLive. Trasmettiamo La 1 (RTVE Spagna), M6 (Francia) e Canal+ Sport in diretta HD. Nessun abbonamento, nessuna registrazione richiesta.' },
    },
    {
      '@type': 'Question',
      name: 'A che ora è la Finale di Champions League 2026?',
      acceptedAnswer: { '@type': 'Answer', text: 'La Finale di Champions League 2026 tra Arsenal e PSG inizia alle 21:00 ora italiana (20:00 UTC) del 30 maggio 2026.' },
    },
    {
      '@type': 'Question',
      name: 'Su che canale si vede la Finale Arsenal PSG?',
      acceptedAnswer: { '@type': 'Answer', text: 'La Finale si vede su La 1 (Spagna, gratis), M6 (Francia, gratis) e Canal+ Sport. Su SportaLive puoi guardare tutti e tre i canali gratis da qualsiasi paese, senza abbonamento.' },
    },
    {
      '@type': 'Question',
      name: 'Come vedere Arsenal vs PSG Finale Champions senza Sky?',
      acceptedAnswer: { '@type': 'Answer', text: 'Vai su sportalive.live/guardare-finale-champions-2026, scegli il server La 1 o M6, e lo streaming parte subito in HD. Completamente gratis, senza Sky, senza DAZN, senza registrazione.' },
    },
  ],
};

async function findChannel(slugs: string[], patterns: string[]) {
  const bySlug = await prisma.channel.findFirst({ where: { slug: { in: slugs }, isActive: true }, orderBy: { order: 'asc' } }).catch(() => null);
  if (bySlug) return bySlug;
  for (const p of patterns) {
    const ch = await prisma.channel.findFirst({ where: { name: { contains: p, mode: 'insensitive' }, isActive: true }, orderBy: { order: 'asc' } }).catch(() => null);
    if (ch) return ch;
  }
  return null;
}

async function getServers() {
  const [la1, m6, canal, bein] = await Promise.all([
    findChannel(['la-1','la-1-1','la-1-2','la1','la-1-hd','la-1-rtve'], ['La 1','La1','RTVE La']),
    findChannel(['m6','m6-hd','m6-fr'], ['M6']),
    findChannel(['canal-sport','canal-plus-sport','canal-sport-hd'], ['Canal+ Sport','Canal Sport']),
    findChannel(['ar-bein-sport-uhd-1','bein-sport-uhd-1','bein-sport-1-uhd','bein-sport-uhd'], ['beIN Sports UHD','beIN Sport UHD','bein sport uhd']),
  ]);
  return { la1, m6, canal, bein };
}

export default async function GuardareFinalePage() {
  const { la1, m6, canal, bein } = await getServers();
  const servers = [
    { label: 'La 1 — RTVE', sublabel: 'Gratis · Spagna',  channel: la1 as any   },
    { label: 'M6',           sublabel: 'Gratis · Francia', channel: m6 as any    },
    { label: 'Canal+ Sport', sublabel: 'HD · Francia',     channel: canal as any },
    { label: 'beIN Sports',  sublabel: 'UHD · عربي',      channel: bein as any  },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Player in cima */}
        <section>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h1 className="text-white font-extrabold text-lg md:text-2xl leading-tight">
              🔴 Arsenal vs PSG — <span className="text-yellow-400">Finale Champions 2026 IN DIRETTA</span>
            </h1>
            <span className="flex items-center gap-1.5 text-red-400 text-xs font-bold bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />IN DIRETTA
            </span>
          </div>
          <ItalianStreamClient servers={servers} />
        </section>

        {/* Hero */}
        <section className="relative rounded-3xl overflow-hidden border border-[#1e3a6e]"
          style={{ background: 'linear-gradient(135deg,#05091a 0%,#0d1442 50%,#05091a 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.7) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute left-0 inset-y-0 w-1/2 bg-gradient-to-r from-red-900/25 to-transparent" />
          <div className="absolute right-0 inset-y-0 w-1/2 bg-gradient-to-l from-blue-900/25 to-transparent" />

          <div className="relative px-6 py-10 md:py-14 text-center space-y-5">
            <div className="flex items-center justify-center gap-3">
              <span className="text-yellow-400">✦</span>
              <span className="text-yellow-300 text-xs font-bold uppercase tracking-widest">Finale UEFA Champions League 2026</span>
              <span className="text-yellow-400">✦</span>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 mx-auto max-w-xl">
              <img src="https://assets-fr.imgfoot.com/media/cache/642x382/psg-ars.jpg" alt="Arsenal vs PSG Finale Champions League 2026" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 bg-red-600 rounded-full">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-white text-xs font-black">IN DIRETTA</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
              Dove Vedere Arsenal vs PSG{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Finale Gratis</span>
            </h1>
            <p className="text-gray-400 text-sm">30 Maggio 2026 · Ore 21:00 · La 1 e M6 Gratis</p>

            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {[
                { icon: '📅', text: '30 Maggio 2026' },
                { icon: '⏰', text: 'Ore 21:00' },
                { icon: '📺', text: '3 server HD' },
                { icon: '🔓', text: 'Senza abbonamento' },
              ].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300">{icon} {text}</span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">Domande Frequenti</h2>
          {faqJsonLd.mainEntity.map((q: any, i: number) => (
            <details key={i} className="bg-gray-800/40 border border-white/5 rounded-xl p-4 cursor-pointer group" open={i === 0}>
              <summary className="text-white font-semibold text-sm list-none flex justify-between items-center gap-3">
                {q.name}
                <span className="text-yellow-400 text-lg group-open:rotate-45 transition-transform flex-shrink-0">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{q.acceptedAnswer.text}</p>
            </details>
          ))}
        </section>

        <AdBanner />

        <section className="flex flex-wrap gap-3 justify-center pb-4">
          {[
            { href: '/arsenal-vs-psg',              label: '🔴 Arsenal vs PSG (English)' },
            { href: '/ver-final-champions-2026',    label: '🇪🇸 Ver en Español'          },
            { href: '/arsenal-psg-arabe',           label: '🔴 بث مباشر عربي'            },
            { href: '/champions-league-final-2026', label: '🏆 UCL Final 2026'           },
            { href: '/live',                        label: '📡 Tutti i Canali'           },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="px-4 py-2 bg-gray-800/60 hover:bg-yellow-600/20 border border-white/10 hover:border-yellow-500/30 text-gray-400 hover:text-white text-sm rounded-xl transition-all">{label}</Link>
          ))}
        </section>

        <p className="text-gray-700 text-xs leading-relaxed">
          dove vedere la finale di champions league 2026 · dove vedere arsenal psg gratis · finale champions streaming gratis ·
          arsenal psg diretta gratis · come vedere finale champions senza abbonamento · arsenal psg finale champions dove vedere
        </p>
      </div>
    </>
  );
}
