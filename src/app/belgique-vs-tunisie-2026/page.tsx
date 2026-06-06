import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const PAGE_URL = `${SITE}/belgique-vs-tunisie-2026`;

export const metadata: Metadata = {
  title: 'Belgique vs Tunisie EN DIRECT — Coupe du Monde 2026 Gratuit | L\'Équipe · beIN Sport',
  description: '🔴 Regardez Belgique vs Tunisie en direct gratuit HD. Coupe du Monde FIFA 2026 Groupe B. Streaming sur L\'Équipe TV, beIN Sport 1, Arryadia. Sans abonnement — بث مباشر بلجيكا تونس مجاناً.',
  keywords: [
    'belgique vs tunisie en direct', 'belgique tunisie streaming gratuit', 'regarder belgique tunisie',
    'diables rouges en direct', 'belgique coupe du monde 2026', 'tunisie coupe du monde 2026',
    'l équipe tv streaming', 'l equipe belgique', 'nsour qarthaj en direct', 'نسور قرطاج بث مباشر',
    'بلجيكا تونس مباشر', 'مشاهدة بلجيكا تونس', 'بث مباشر كأس العالم 2026', 'تونس كأس العالم مجانا',
    'belgique tunisie bein sport', 'belgique tunisie gratuit', 'watch belgium tunisia free',
    'sportalive belgique', 'sportalive tunisie', 'world cup 2026 belgique', 'mondial 2026 belgique tunisie',
    'coupe du monde 2026 direct gratuit', 'streaming foot gratuit belgique', 'diables rouges mondial 2026',
  ],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Belgique vs Tunisie EN DIRECT — CM 2026 Gratuit | L\'Équipe TV',
    description: 'Regardez Belgique vs Tunisie en direct gratuit sur SportaLive. L\'Équipe TV, beIN Sport 1, Arryadia. Sans abonnement.',
    url: PAGE_URL,
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Belgique vs Tunisie',
  alternateName: ['Belgium vs Tunisia 2026', 'بلجيكا ضد تونس كأس العالم 2026'],
  startDate: '2026-06-17T20:00:00Z',
  endDate: '2026-06-17T22:00:00Z',
  eventStatus: 'https://schema.org/EventScheduled',
  location: { '@type': 'Place', name: 'AT&T Stadium, Arlington, Dallas' },
  competitor: [
    { '@type': 'SportsTeam', name: 'Belgique', alternateName: 'Belgium' },
    { '@type': 'SportsTeam', name: 'Tunisie', alternateName: 'Tunisia' },
  ],
  organizer: { '@type': 'Organization', name: 'FIFA' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', url: PAGE_URL, availability: 'https://schema.org/InStock' },
  description: 'Regardez Belgique vs Tunisie en direct gratuit HD — Coupe du Monde FIFA 2026 Groupe B.',
  url: PAGE_URL,
  inLanguage: ['fr', 'ar'],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Sur quelle chaîne regarder Belgique vs Tunisie en direct ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Le match Belgique vs Tunisie est diffusé sur L\'Équipe TV (gratuit en France et Belgique), beIN Sport 1 (MENA) et Arryadia TNT (Maroc). Streaming gratuit sur SportaLive sans abonnement.' },
    },
    {
      '@type': 'Question',
      name: 'À quelle heure commence Belgique vs Tunisie ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Le coup d\'envoi de Belgique vs Tunisie est à 20h00 UTC, soit 22h00 heure de Paris/Tunis et 22h00 en Belgique, le mercredi 17 juin 2026.' },
    },
    {
      '@type': 'Question',
      name: 'كيف أشاهد بلجيكا ضد تونس مجاناً بث مباشر؟',
      acceptedAnswer: { '@type': 'Answer', text: 'شاهد مباراة بلجيكا ضد تونس مجاناً على موقع SportaLive عبر قنوات بي إن سبورت 1 والرياضية TNT بدون اشتراك ولا تسجيل.' },
    },
    {
      '@type': 'Question',
      name: 'L\'Équipe TV diffuse-t-elle Belgique vs Tunisie ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Oui, L\'Équipe TV diffuse le match Belgique vs Tunisie en clair et gratuitement. Vous pouvez également le regarder sur SportaLive sans aucun abonnement.' },
    },
  ],
};

async function find(slugs: string[], patterns: string[]) {
  const r = await prisma.channel.findFirst({ where: { slug: { in: slugs }, isActive: true }, orderBy: { order: 'asc' } }).catch(() => null);
  if (r) return r;
  for (const p of patterns) {
    const c = await prisma.channel.findFirst({ where: { name: { contains: p, mode: 'insensitive' }, isActive: true }, orderBy: { order: 'asc' } }).catch(() => null);
    if (c) return c;
  }
  return null;
}

export default async function Page() {
  const [lequipe, bein, arryadia, rmc, m6] = await Promise.all([
    find(['lequipe-tv', 'l-equipe', 'lequipe'], ['L\'Équipe', 'Equipe TV', 'L Equipe']),
    find(['ar-bein-sport-uhd-1', 'bein-sport-1'], ['beIN Sports 1', 'beIN Sport 1']),
    find(['arryadia-tnt', 'arryadia-sport-tnt'], ['Arryadia TNT', 'الرياضية TNT']),
    find(['rmc-sport-1', 'rmc-sport'], ['RMC Sport', 'RMC']),
    find(['m6', 'm6-hd'], ['M6']),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />
      <WC2026MatchLayout
        home={{ name: 'Belgium', flag: 'be', nickname: 'Diables Rouges', formation: '4-3-3' }}
        away={{ name: 'Tunisia', flag: 'tn', nickname: 'Eagles of Carthage', formation: '4-1-4-1' }}
        meta={{
          date: 'Wednesday, 17 June 2026',
          time: '20:00 UTC',
          venue: 'AT&T Stadium, Arlington',
          group: 'B',
          matchday: 1,
          prediction: 'Belgium 2-0 Tunisia',
        }}
        servers={[
          { label: 'L\'Équipe TV', sublabel: 'France · Gratuit', channel: lequipe as any },
          { label: 'beIN Sport 1', sublabel: 'UHD · عربي', channel: bein as any },
          { label: 'Arryadia TNT', sublabel: 'Maroc · مجاني', channel: arryadia as any },
          { label: 'RMC Sport', sublabel: 'HD · France', channel: rmc as any },
          { label: 'M6', sublabel: 'France · Gratuit', channel: m6 as any },
        ]}
        blog={blogs['belgium-vs-tunisia']}
        kickoffTimes={[
          { flag: '🇧🇪', country: 'Bruxelles', time: '22:00' },
          { flag: '🇫🇷', country: 'Paris', time: '22:00' },
          { flag: '🇹🇳', country: 'Tunis', time: '22:00' },
          { flag: '🇩🇿', country: 'Alger', time: '21:00' },
          { flag: '🇲🇦', country: 'Casablanca', time: '20:00' },
          { flag: '🌍', country: 'UTC', time: '20:00' },
        ]}
        faqs={[
          { q: 'Sur quelle chaîne voir Belgique vs Tunisie en direct ?', a: 'Le match est diffusé gratuitement sur L\'Équipe TV et disponible en streaming HD sur SportaLive. Vous trouverez aussi beIN Sport 1, Arryadia TNT et RMC Sport sans abonnement.' },
          { q: 'À quelle heure est le match Belgique vs Tunisie ?', a: 'Coup d\'envoi le mercredi 17 juin 2026 à 20h00 UTC (22h00 en France, Belgique et Tunisie). Streaming gratuit HD sur SportaLive.' },
          { q: 'كيف أشاهد بلجيكا ضد تونس مجاناً بث مباشر؟', a: 'شاهد المباراة مجاناً على SportaLive عبر قنوات بي إن سبورت 1 والرياضية TNT بجودة HD بدون اشتراك أو تسجيل.' },
          { q: 'Wo kann ich Belgien vs Tunesien live sehen?', a: 'Schaue Belgien vs Tunesien kostenlos in HD auf SportaLive — kein Abo, keine Anmeldung erforderlich.' },
        ]}
        relatedLinks={[
          { href: '/world-cup-2026-live', label: '🔴 CM 2026 Live' },
          { href: '/wc2026', label: '📅 Programme' },
          { href: '/sweden-vs-tunisia-2026', label: '🇹🇳 Tunisie vs Suède' },
          { href: '/netherlands-vs-japan-2026', label: '🇳🇱 Pays-Bas vs Japon' },
          { href: '/channel/lequipe-tv', label: '📺 L\'Équipe TV' },
          { href: '/chaines-marocaines', label: '🇲🇦 Chaînes Marocaines' },
        ]}
      />
    </>
  );
}
