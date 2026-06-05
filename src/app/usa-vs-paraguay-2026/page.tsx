import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const PAGE_URL = `${SITE}/usa-vs-paraguay-2026`;

export const metadata: Metadata = {
  title: 'USA vs Paraguay LIVE — World Cup 2026 Free Stream | beIN Sport · M6',
  description: '🔴 Watch USA vs Paraguay FIFA World Cup 2026 FREE in HD. Group A at MetLife Stadium, New York. Stream on beIN Sport 1, M6. No subscription.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — USA vs Paraguay',
  location: { '@type': 'Place', name: 'MetLife Stadium, New York' },
  competitor: [{ '@type': 'SportsTeam', name: 'USA' }, { '@type': 'SportsTeam', name: 'Paraguay' }],
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
  const [bein, m6, rmc, arryadia, dasErste] = await Promise.all([
    find(['ar-bein-sport-uhd-1', 'bein-sport-1'], ['beIN Sports 1', 'beIN Sport 1']),
    find(['m6', 'm6-hd'], ['M6']),
    find(['rmc-sport-1', 'rmc-sport'], ['RMC Sport', 'RMC']),
    find(['arryadia-tnt', 'arryadia-sport-tnt'], ['Arryadia TNT', 'الرياضية TNT']),
    find(['das-erste', 'ard-das-erste'], ['Das Erste', 'ARD']),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <WC2026MatchLayout
        home={{ name: 'USA', flag: 'us', nickname: 'USMNT', formation: '4-3-3' }}
        away={{ name: 'Paraguay', flag: 'py', nickname: 'La Albirroja', formation: '4-4-2' }}
        meta={{ date: 'Saturday, 13 June 2026', time: '19:00 UTC', venue: 'MetLife Stadium, New York', group: 'A', matchday: 1, prediction: 'USA 3-1 Paraguay' }}
        servers={[{ label: 'beIN Sport 1', sublabel: 'UHD · عربي', channel: bein as any }, { label: 'M6', sublabel: 'France · Gratuit', channel: m6 as any }, { label: 'RMC Sport', sublabel: 'HD', channel: rmc as any }, { label: 'Arryadia TNT', sublabel: 'Maroc · مجاني', channel: arryadia as any }, { label: 'Das Erste', sublabel: 'Germany · ARD', channel: dasErste as any }]}
        blog={blogs['usa-vs-paraguay']}
        kickoffTimes={[{"flag":"🇺🇸","country":"New York","time":"15:00"},{"flag":"🇫🇷","country":"Paris","time":"21:00"},{"flag":"🇸🇦","country":"Riyadh","time":"22:00"},{"flag":"🇬🇧","country":"London","time":"20:00"},{"flag":"🇵🇾","country":"Asunción","time":"15:00"},{"flag":"🌍","country":"UTC","time":"19:00"}]}
        faqs={[
          { q: 'Where to watch USA vs Paraguay World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is USA vs Paraguay kick-off?', a: 'Saturday, 13 June 2026 at 19:00 UTC. Watch free on SportaLive.' },
          { q: 'كيف أشاهد USA ضد Paraguay مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/canada-vs-bosnia-2026', label: '🇨🇦 Canada vs Bosnia' }, { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' }]}
      />
    </>
  );
}
