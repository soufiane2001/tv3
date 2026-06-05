import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const PAGE_URL = `${SITE}/brazil-vs-morocco-2026`;

export const metadata: Metadata = {
  title: 'Brazil vs Morocco LIVE — World Cup 2026 Free Stream | beIN Sport · M6',
  description: '🔴 Watch Brazil vs Morocco FIFA World Cup 2026 FREE in HD. Group G at MetLife Stadium, New York. Stream on beIN Sport 1, M6. No subscription.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Brazil vs Morocco',
  location: { '@type': 'Place', name: 'MetLife Stadium, New York' },
  competitor: [{ '@type': 'SportsTeam', name: 'Brazil' }, { '@type': 'SportsTeam', name: 'Morocco' }],
  organizer: { '@type': 'Organization', name: 'FIFA' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: PAGE_URL },
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
  const [bein, m6, rmc, arryadia] = await Promise.all([
    find(['ar-bein-sport-uhd-1', 'bein-sport-1'], ['beIN Sports 1', 'beIN Sport 1']),
    find(['m6', 'm6-hd'], ['M6']),
    find(['rmc-sport-1', 'rmc-sport'], ['RMC Sport', 'RMC']),
    find(['arryadia-tnt', 'arryadia-sport-tnt'], ['Arryadia TNT', 'الرياضية TNT']),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <WC2026MatchLayout
        home={{ name: 'Brazil', flag: 'br', nickname: 'Seleção', formation: '4-3-3' }}
        away={{ name: 'Morocco', flag: 'ma', nickname: 'Atlas Lions', formation: '4-3-3' }}
        meta={{ date: 'Monday, 15 June 2026', time: '19:00 UTC', venue: 'MetLife Stadium, New York', group: 'G', matchday: 1, prediction: 'Brazil 2-1 Morocco' }}
        servers={[{ label: 'beIN Sport 1', sublabel: 'UHD · عربي', channel: bein as any }, { label: 'M6', sublabel: 'France · Gratuit', channel: m6 as any }, { label: 'RMC Sport', sublabel: 'HD', channel: rmc as any }, { label: 'Arryadia TNT', sublabel: 'Maroc · مجاني', channel: arryadia as any }]}
        blog={blogs['brazil-vs-morocco']}
        kickoffTimes={[{"flag":"🇧🇷","country":"São Paulo","time":"16:00"},{"flag":"🇫🇷","country":"Paris","time":"21:00"},{"flag":"🇸🇦","country":"Riyadh","time":"22:00"},{"flag":"🇬🇧","country":"London","time":"20:00"},{"flag":"🇲🇦","country":"Casablanca","time":"20:00"},{"flag":"🌍","country":"UTC","time":"19:00"}]}
        faqs={[
          { q: 'Where to watch Brazil vs Morocco World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is Brazil vs Morocco kick-off?', a: 'Monday, 15 June 2026 at 19:00 UTC. Watch free on SportaLive.' },
          { q: 'كيف أشاهد Brazil ضد Morocco مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/mexico-vs-south-africa-2026', label: '🇲🇽 Mexico vs South Africa' }, { href: '/germany-vs-curacao-2026', label: '🇩🇪 Germany vs Curaçao' }, { href: '/chaines-marocaines', label: '🇲🇦 Chaînes Marocaines' }]}
      />
    </>
  );
}
