import type { Metadata } from 'next';
import { getMatch } from '@/data/wc2026-matches';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sportalive.live';

// Per-match <head> metadata: title, description, self-referencing canonical,
// Open Graph + Twitter cards (with a dynamically-generated OG image), and the
// rich googleBot directive. All derived from the single source of truth.
export function buildMatchMetadata(slug: string): Metadata {
  const m = getMatch(slug);
  if (!m) return {};
  const url = `${SITE}/${slug}`;
  const ogImage = `${SITE}/og?slug=${slug}`;
  const title = `${m.home} vs ${m.away} LIVE — World Cup 2026 Free Stream | beIN · M6`;
  const description = `🔴 Watch ${m.home} vs ${m.away} FIFA World Cup 2026 free in HD. Group ${m.group} · ${m.day} · ${m.venue}. Live on beIN Sports, M6. No subscription, no registration.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, type: 'website', siteName: 'SportaLive', locale: 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${m.home} vs ${m.away} — World Cup 2026` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    },
  };
}

// Enriched SportsEvent structured data (eventStatus, home/away teams, venue,
// offer, superEvent) so Google can present the match as a real event.
export function buildMatchJsonLd(slug: string) {
  const m = getMatch(slug);
  if (!m) return {};
  const url = `${SITE}/${slug}`;
  const endDate = new Date(new Date(m.startUtc).getTime() + 2 * 60 * 60 * 1000).toISOString();
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${m.home} vs ${m.away} — FIFA World Cup 2026 Group ${m.group}`,
    description: `${m.home} face ${m.away} in Group ${m.group} of the FIFA World Cup 2026 at ${m.venue}. Watch free live in HD on SportaLive.`,
    sport: 'Soccer',
    startDate: m.startUtc,
    endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: [`${SITE}/og?slug=${slug}`],
    url,
    location: { '@type': 'Place', name: m.venue },
    homeTeam: { '@type': 'SportsTeam', name: m.home },
    awayTeam: { '@type': 'SportsTeam', name: m.away },
    competitor: [
      { '@type': 'SportsTeam', name: m.home },
      { '@type': 'SportsTeam', name: m.away },
    ],
    organizer: { '@type': 'Organization', name: 'FIFA', url: 'https://www.fifa.com' },
    offers: {
      '@type': 'Offer', name: 'Free live stream', price: '0', priceCurrency: 'USD',
      availability: 'https://schema.org/InStock', url,
    },
    superEvent: { '@type': 'SportsEvent', name: 'FIFA World Cup 2026', startDate: '2026-06-11', endDate: '2026-07-19' },
  };
}

// Breadcrumb trail: Home › World Cup 2026 › <match>. Powers breadcrumb rich
// results in Google.
export function buildBreadcrumbJsonLd(slug: string) {
  const m = getMatch(slug);
  if (!m) return {};
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'World Cup 2026', item: `${SITE}/wc2026` },
      { '@type': 'ListItem', position: 3, name: `${m.home} vs ${m.away}`, item: `${SITE}/${slug}` },
    ],
  };
}
