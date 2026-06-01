import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';
const PAGE_URL = `${SITE}/canada-vs-bosnia-2026`;

export const metadata: Metadata = {
  title: 'Canada vs Bosnia LIVE — World Cup 2026 Free Stream | beIN Sport · M6',
  description: '🔴 Watch Canada vs Bosnia FIFA World Cup 2026 FREE in HD. Group D at BC Place, Vancouver. Stream on beIN Sport 1, M6. No subscription.',
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Canada vs Bosnia',
  location: { '@type': 'Place', name: 'BC Place, Vancouver' },
  competitor: [{ '@type': 'SportsTeam', name: 'Canada' }, { '@type': 'SportsTeam', name: 'Bosnia' }],
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
  const [bein, m6, rmc] = await Promise.all([
    find(['ar-bein-sport-uhd-1', 'bein-sport-1'], ['beIN Sports 1', 'beIN Sport 1']),
    find(['m6', 'm6-hd'], ['M6']),
    find(['rmc-sport-1', 'rmc-sport'], ['RMC Sport', 'RMC']),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <WC2026MatchLayout
        home={{ name: 'Canada', flag: 'ca', nickname: 'Les Rouges', formation: '4-3-3' }}
        away={{ name: 'Bosnia', flag: 'ba', nickname: 'Zmajevi', formation: '4-2-3-1' }}
        meta={{ date: 'Friday, 12 June 2026', time: '22:00 UTC', venue: 'BC Place, Vancouver', group: 'D', matchday: 1, prediction: 'Canada 3-0 Bosnia' }}
        servers={[{ label: 'beIN Sport 1', sublabel: 'UHD · عربي', channel: bein as any }, { label: 'M6', sublabel: 'France · Gratuit', channel: m6 as any }, { label: 'RMC Sport', sublabel: 'HD', channel: rmc as any }]}
        blog={blogs['canada-vs-bosnia']}
        kickoffTimes={[{"flag":"🇨🇦","country":"Vancouver","time":"15:00"},{"flag":"🇫🇷","country":"Paris","time":"00:00+1"},{"flag":"🇸🇦","country":"Riyadh","time":"01:00+1"},{"flag":"🇬🇧","country":"London","time":"23:00"},{"flag":"🇺🇸","country":"New York","time":"18:00"},{"flag":"🌍","country":"UTC","time":"22:00"}]}
        faqs={[
          { q: 'Where to watch Canada vs Bosnia World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is Canada vs Bosnia kick-off?', a: 'Friday, 12 June 2026 at 22:00 UTC. Watch free on SportaLive.' },
          { q: 'كيف أشاهد Canada ضد Bosnia مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/korea-vs-czechia-2026', label: '🇰🇷 Korea vs Czechia' }, { href: '/usa-vs-paraguay-2026', label: '🇺🇸 USA vs Paraguay' }]}
      />
    </>
  );
}
