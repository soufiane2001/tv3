import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import AdBanner from '@/components/ads/AdBanner';
import SpanishStreamClient from './SpanishStreamClient';

export const revalidate = 300;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';

export const metadata: Metadata = {
  title: 'Ver Final Champions League 2026 GRATIS — Arsenal vs PSG En Directo | La 1',
  description: '🔴 EN DIRECTO — Ver Arsenal vs PSG Final Champions League 2026 gratis en HD. La 1 RTVE, M6 y Canal+ Sport. Sin registro, sin suscripción. ¡Empieza a las 21:00!',
  keywords: [
    'donde ver la final de la champions league 2026',
    'ver arsenal psg gratis online','final champions 2026 en directo gratis',
    'arsenal psg la 1 en directo','ver final champions la 1 gratis',
    'arsenal contra psg en vivo','final champions league 2026 streaming',
    'como ver arsenal psg gratis','ver final ucl 2026 gratis',
    'la 1 rtve arsenal psg directo','arsenal psg rtve gratis',
    'final champions league 2026 gratis online','ver champions final gratis',
    'donde ver arsenal psg final','arsenal psg directo gratis hoy',
  ].join(', '),
  alternates: { canonical: `${SITE}/ver-final-champions-2026` },
  openGraph: {
    title: '🔴 Ver Arsenal vs PSG GRATIS — Final Champions 2026',
    description: 'Final Champions League 2026 en directo gratis — La 1, M6 y Canal+ Sport. Sin registro.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Arsenal vs PSG — Final UEFA Champions League 2026',
  description: 'Ver la Final de la Champions League 2026 entre Arsenal y PSG gratis en directo en SportaLive.',
  startDate: '2026-05-30T20:00:00Z',
  endDate: '2026-05-30T22:30:00Z',
  sport: 'https://en.wikipedia.org/wiki/Association_football',
  inLanguage: 'es',
  url: `${SITE}/ver-final-champions-2026`,
  location: {
    '@type': 'Place',
    name: 'Allianz Arena',
    address: { '@type': 'PostalAddress', addressLocality: 'Munich', addressCountry: 'DE' },
  },
  offers: {
    '@type': 'Offer',
    name: 'Retransmisión Gratis — Final Champions 2026',
    price: '0', priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: `${SITE}/ver-final-champions-2026`,
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
      name: '¿Dónde ver la Final de la Champions League 2026 gratis?',
      acceptedAnswer: { '@type': 'Answer', text: 'Puedes ver la Final Arsenal vs PSG gratis en SportaLive. Retransmitimos La 1 de RTVE, M6 y Canal+ Sport en directo y en HD. Sin suscripción, sin registro. Solo entra y dale al play.' },
    },
    {
      '@type': 'Question',
      name: '¿A qué hora es la Final de la Champions League 2026?',
      acceptedAnswer: { '@type': 'Answer', text: 'La Final de la Champions League 2026 entre Arsenal y PSG empieza a las 21:00 hora española (20:00 UTC). En México son las 14:00, en Argentina las 17:00, en Colombia las 15:00.' },
    },
    {
      '@type': 'Question',
      name: '¿En qué canal dan la Final de la Champions 2026?',
      acceptedAnswer: { '@type': 'Answer', text: 'La Final Arsenal vs PSG se emite en La 1 de RTVE (gratis en España), M6 (gratis en Francia) y Canal+ Sport. En SportaLive puedes ver los tres canales gratis desde cualquier país.' },
    },
    {
      '@type': 'Question',
      name: '¿Cómo ver Arsenal vs PSG sin pagar?',
      acceptedAnswer: { '@type': 'Answer', text: 'Entra en sportalive.live/ver-final-champions-2026 y elige el servidor La 1, M6 o Canal+ Sport. El streaming es completamente gratis, en HD y sin necesidad de crear cuenta.' },
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

export default async function VerFinalChampionsPage() {
  const { la1, m6, canal, bein } = await getServers();
  const servers = [
    { label: 'La 1 — RTVE', sublabel: 'Gratis · España',  channel: la1 as any   },
    { label: 'M6',           sublabel: 'Gratis · Francia', channel: m6 as any    },
    { label: 'Canal+ Sport', sublabel: 'HD · Francia',     channel: canal as any },
    { label: 'beIN Sports',  sublabel: 'UHD · عربي',      channel: bein as any  },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Hero */}
        <section className="relative rounded-3xl overflow-hidden border border-[#1e3a6e]"
          style={{ background: 'linear-gradient(135deg,#05091a 0%,#0d1442 50%,#05091a 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.7) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute left-0 inset-y-0 w-1/2 bg-gradient-to-r from-red-900/25 to-transparent" />
          <div className="absolute right-0 inset-y-0 w-1/2 bg-gradient-to-l from-blue-900/25 to-transparent" />

          <div className="relative px-6 py-10 md:py-14 text-center space-y-5">
            <div className="flex items-center justify-center gap-3">
              <span className="text-yellow-400">✦</span>
              <span className="text-yellow-300 text-xs font-bold uppercase tracking-widest">Final UEFA Champions League 2026</span>
              <span className="text-yellow-400">✦</span>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 mx-auto max-w-xl">
              <img src="https://assets-fr.imgfoot.com/media/cache/642x382/psg-ars.jpg" alt="Arsenal vs PSG Final Champions League 2026" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 bg-red-600 rounded-full">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-white text-xs font-black">EN DIRECTO</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
              Ver Arsenal vs PSG{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Gratis en Directo</span>
            </h1>
            <p className="text-gray-400 text-sm">30 Mayo 2026 · 21:00 España · La 1 RTVE Gratis</p>

            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {[
                { icon: '📅', text: '30 Mayo 2026' },
                { icon: '⏰', text: '21:00 España' },
                { icon: '📺', text: '3 servidores HD' },
                { icon: '🔓', text: 'Sin registro' },
              ].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300">{icon} {text}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Player */}
        <section>
          <h2 className="text-white font-bold text-lg mb-3">📺 Ver en Directo — Elige el Servidor</h2>
          <SpanishStreamClient servers={servers} />
        </section>

        {/* Horarios */}
        <section className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-4">
          <h2 className="text-white font-bold text-lg">⏰ Horarios por País</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {[
              ['🇪🇸 España',      '21:00'], ['🇫🇷 Francia',     '21:00'],
              ['🇬🇧 Londres',     '20:00'], ['🇲🇦 Marruecos',   '21:00'],
              ['🇲🇽 México',      '14:00'], ['🇦🇷 Argentina',   '17:00'],
              ['🇨🇴 Colombia',    '15:00'], ['🇨🇱 Chile',       '16:00'],
              ['🇺🇸 Nueva York',  '15:00'], ['🇧🇷 Brasil',      '17:00'],
              ['🇩🇿 Argelia',     '22:00'], ['🇸🇦 Arabia S.',   '23:00'],
            ].map(([city, time]) => (
              <div key={city} className="flex justify-between px-3 py-2 bg-white/[0.04] rounded-lg">
                <span className="text-gray-400">{city}</span>
                <span className="text-white font-black">{time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">Preguntas Frecuentes</h2>
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
            { href: '/arsenal-psg-arabe',           label: '🔴 بث مباشر عربي'            },
            { href: '/champions-league-final-2026', label: '🏆 UCL Final 2026'           },
            { href: '/channel/la-1',                label: '📺 La 1 En Directo'          },
            { href: '/live',                        label: '📡 Todos los Canales'        },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="px-4 py-2 bg-gray-800/60 hover:bg-yellow-600/20 border border-white/10 hover:border-yellow-500/30 text-gray-400 hover:text-white text-sm rounded-xl transition-all">{label}</Link>
          ))}
        </section>

        <p className="text-gray-700 text-xs leading-relaxed">
          donde ver la final de la champions league 2026 · ver arsenal psg gratis · final champions la 1 en directo ·
          arsenal psg rtve gratis · como ver la final champions sin pagar · arsenal psg streaming gratis hoy
        </p>
      </div>
    </>
  );
}
