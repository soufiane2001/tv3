import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';
import { getWcExtraChannels } from '@/lib/wc-channels';

export const revalidate = 300;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const PAGE_URL = `${SITE}/belgique-vs-tunisie-2026`;

export const metadata: Metadata = {
  title: 'Belgique vs Tunisie EN DIRECT — Match Amical 6 juin 2026 Gratuit | L\'Équipe TV',
  description: '🔴 Regardez Belgique vs Tunisie en direct gratuit HD. Match amical international du 6 juin 2026. Streaming sur L\'Équipe TV, beIN Sport 1, Arryadia TNT. Sans abonnement — بث مباشر بلجيكا ضد تونس مجاناً اليوم.',
  keywords: [
    'belgique vs tunisie en direct', 'belgique tunisie streaming gratuit', 'regarder belgique tunisie aujourd hui',
    'match amical belgique tunisie', 'belgique tunisie 6 juin 2026', 'diables rouges en direct aujourd hui',
    'tunisie belgique direct gratuit', 'l equipe tv streaming', 'l equipe belgique tunisie',
    'نسور قرطاج بث مباشر', 'بلجيكا تونس مباشر اليوم', 'مشاهدة بلجيكا تونس', 'مباراة ودية بلجيكا تونس',
    'بث مباشر مباراة اليوم', 'تونس بلجيكا بث مباشر مجاني', 'belgique tunisie bein sport',
    'match amical international direct', 'sportalive belgique tunisie', 'streaming foot gratuit belgique',
    'belgique match amical juin 2026', 'tunisie match amical juin 2026', 'diables rouges match amical',
    'aigles carthage belgique direct', 'regarder match amical gratuit france',
  ],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Belgique vs Tunisie EN DIRECT — Match Amical Gratuit | L\'Équipe TV',
    description: 'Regardez Belgique vs Tunisie en direct gratuit sur SportaLive. Match amical 6 juin 2026 — L\'Équipe TV, beIN Sport 1, Arryadia TNT. Sans abonnement.',
    url: PAGE_URL,
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Match Amical — Belgique vs Tunisie',
  alternateName: ['Belgium vs Tunisia Friendly 2026', 'مباراة ودية بلجيكا ضد تونس'],
  startDate: '2026-06-06T20:00:00Z',
  endDate: '2026-06-06T22:00:00Z',
  eventStatus: 'https://schema.org/EventScheduled',
  location: { '@type': 'Place', name: 'Belgique' },
  competitor: [
    { '@type': 'SportsTeam', name: 'Belgique', alternateName: 'Belgium' },
    { '@type': 'SportsTeam', name: 'Tunisie', alternateName: 'Tunisia' },
  ],
  organizer: { '@type': 'Organization', name: 'Union Royale Belge des Sociétés de Football Association (URBSFA)' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', url: PAGE_URL, availability: 'https://schema.org/InStock' },
  description: 'Regardez Belgique vs Tunisie en direct gratuit HD — Match amical international du 6 juin 2026 sur L\'Équipe TV, beIN Sport 1, Arryadia TNT.',
  url: PAGE_URL,
  inLanguage: ['fr', 'ar'],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Sur quelle chaîne regarder Belgique vs Tunisie en direct aujourd\'hui ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Le match amical Belgique vs Tunisie du 6 juin 2026 est diffusé sur L\'Équipe TV (gratuit en France et Belgique), beIN Sport 1 (MENA) et Arryadia TNT (Maroc). Streaming gratuit HD sur SportaLive sans abonnement ni inscription.' },
    },
    {
      '@type': 'Question',
      name: 'À quelle heure est le match amical Belgique vs Tunisie aujourd\'hui ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Le coup d\'envoi du match Belgique vs Tunisie est à 20h00 UTC le samedi 6 juin 2026, soit 22h00 en France, Belgique et Tunisie.' },
    },
    {
      '@type': 'Question',
      name: 'كيف أشاهد مباراة بلجيكا ضد تونس مجاناً اليوم؟',
      acceptedAnswer: { '@type': 'Answer', text: 'شاهد المباراة الودية بلجيكا ضد تونس اليوم 6 يونيو 2026 مجاناً على موقع SportaLive عبر قنوات بي إن سبورت 1 والرياضية TNT بجودة HD بدون اشتراك ولا تسجيل.' },
    },
    {
      '@type': 'Question',
      name: 'L\'Équipe TV diffuse-t-elle le match Belgique vs Tunisie ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Oui, L\'Équipe TV diffuse le match amical Belgique vs Tunisie gratuitement en clair. Vous pouvez aussi le regarder en streaming HD sur SportaLive sans aucun abonnement.' },
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
  const [[lequipe], [rai1, ert1, sigma, tv2, etv]] = await Promise.all([
    Promise.all([
      find(['lequipe-tv', 'l-equipe', 'lequipe'], ['L\'Équipe', 'Equipe TV', 'L Equipe']),
    ]),
    getWcExtraChannels(),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />
      <WC2026MatchLayout
        home={{ name: 'Belgium', flag: 'be', nickname: 'Diables Rouges', formation: '4-3-3' }}
        away={{ name: 'Tunisia', flag: 'tn', nickname: 'Aigles de Carthage', formation: '4-1-4-1' }}
        meta={{
          date: 'Samedi, 6 juin 2026',
          time: '20:00 UTC',
          venue: 'Belgique',
          group: 'Amical',
          prediction: 'Belgium 2-1 Tunisia',
        }}
        servers={[
          { label: 'Rai 1',        sublabel: 'Italy · RAI · HD',   channel: rai1    as any },
          { label: 'L\'Équipe TV', sublabel: 'France · Gratuit',    channel: lequipe as any },
          { label: 'ERT1',         sublabel: 'Greece · ERT · HD',   channel: ert1    as any },
          { label: 'SigmaTV',      sublabel: 'Cyprus · Sigma · HD', channel: sigma   as any },
          { label: 'DR1',          sublabel: 'Denmark · DR · Free', channel: tv2     as any },
          { label: 'ETV',          sublabel: 'Estonia · ERR · HD',  channel: etv     as any },
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
          { q: 'Sur quelle chaîne voir Belgique vs Tunisie en direct aujourd\'hui ?', a: 'Le match amical du 6 juin 2026 est diffusé gratuitement sur L\'Équipe TV. Disponible en streaming HD sur SportaLive avec beIN Sport 1, Arryadia TNT et RMC Sport — sans abonnement.' },
          { q: 'À quelle heure est le match amical Belgique vs Tunisie ?', a: 'Coup d\'envoi le samedi 6 juin 2026 à 20h00 UTC (22h00 heure de Paris, Bruxelles et Tunis). Streaming gratuit HD sur SportaLive.' },
          { q: 'كيف أشاهد مباراة بلجيكا ضد تونس مجاناً اليوم؟', a: 'شاهد المباراة الودية مجاناً على SportaLive عبر قنوات بي إن سبورت 1 والرياضية TNT بجودة HD بدون اشتراك أو تسجيل. المباراة اليوم 6 يونيو 2026.' },
          { q: 'C\'est un match amical ou un match de Coupe du Monde ?', a: 'C\'est un match amical international (friendly) entre la Belgique et la Tunisie, le 6 juin 2026, sans enjeu de compétition officielle.' },
        ]}
        relatedLinks={[
          { href: '/world-cup-2026-live', label: '🔴 CM 2026 Live' },
          { href: '/wc2026', label: '📅 Programme WC2026' },
          { href: '/sweden-vs-tunisia-2026', label: '🇹🇳 Tunisie vs Suède' },
          { href: '/germany-vs-finland-2026', label: '🇩🇪 Allemagne vs Finlande' },
          { href: '/channel/lequipe-tv', label: '📺 L\'Équipe TV' },
          { href: '/chaines-marocaines', label: '🇲🇦 Chaînes Marocaines' },
        ]}
      />
    </>
  );
}
