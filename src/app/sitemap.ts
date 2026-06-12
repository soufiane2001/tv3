import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { WC2026_MATCHES, WC2026_TEAMS, teamSlug } from '@/data/wc2026-matches';

export const revalidate = 3600; // regenerate at most once per hour

// Only submit curated channel pages — prevents crawl-budget exhaustion on low-authority sites.
// All other channels are discoverable via /live and category pages once authority grows.
const CURATED_CHANNEL_SLUGS = new Set([
  'la-1','la-1-1','la-1-2','trt-1','m6','canal-sport','canal-sport-hd','rti-1',
  '2m','al-aoula','arryadia','medi-1','arrabia','al-maghribia','2m-maroc','2m-hd','al-arryadia','arryadia-hd',
  'ar-bein-sport-uhd-1','trt','lequipe-tv','arryadia-tnt','das-erste',
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://sportalive.live';
  const now  = new Date();

  let channels: { slug: string; updatedAt: Date }[] = [];
  let categories: { slug: string; updatedAt: Date }[] = [];
  try {
    [channels, categories] = await Promise.all([
      prisma.channel.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
      prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
    ]);
  } catch { /* DB not available at build time — static pages only */ }

  const static_: MetadataRoute.Sitemap = [
    { url: base,          lastModified: now, changeFrequency: 'daily',  priority: 1.0 },
    { url: `${base}/live`,lastModified: now, changeFrequency: 'hourly', priority: 0.95 },
    // /search is a client-side UI with no indexable content — excluded from sitemap
  ];

  // ── World Cup 2026 — hubs + broadcaster channels ──────────────────────────
  // (the 72 group-match pages and 48 team pages are appended below from the
  //  single source as matchRoutes / teamRoutes). Past UCL-final event pages and
  //  non-real "today" fixtures were removed: they wasted crawl budget on stale
  //  content and diluted the World Cup focus.
  const events: MetadataRoute.Sitemap = [
    { url: `${base}/world-cup-2026-live`, lastModified: now, changeFrequency: 'hourly', priority: 1.0  },
    { url: `${base}/wc2026`,              lastModified: now, changeFrequency: 'daily',  priority: 0.95 },
    { url: `${base}/world-cup-2026`,      lastModified: now, changeFrequency: 'daily',  priority: 0.9  },
    // Free-to-air World Cup 2026 broadcasters
    { url: `${base}/channel/m6`,                  lastModified: now, changeFrequency: 'daily', priority: 0.9  },
    { url: `${base}/channel/ar-bein-sport-uhd-1`, lastModified: now, changeFrequency: 'daily', priority: 0.9  },
    { url: `${base}/channel/la-1`,                lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${base}/channel/trt`,                 lastModified: now, changeFrequency: 'daily', priority: 0.8  },
    { url: `${base}/channel/rti-1`,               lastModified: now, changeFrequency: 'daily', priority: 0.8  },
    { url: `${base}/channel/lequipe-tv`,          lastModified: now, changeFrequency: 'daily', priority: 0.8  },
    // Moroccan channels hub + individual pages (strong WC audience)
    { url: `${base}/chaines-marocaines`,   lastModified: now, changeFrequency: 'daily', priority: 0.9  },
    { url: `${base}/channel/2m`,           lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${base}/channel/al-aoula`,     lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${base}/channel/arryadia`,     lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${base}/channel/medi-1`,       lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${base}/channel/arrabia`,      lastModified: now, changeFrequency: 'daily', priority: 0.80 },
    { url: `${base}/channel/al-maghribia`, lastModified: now, changeFrequency: 'daily', priority: 0.80 },
  ];

  const catRoutes: MetadataRoute.Sitemap = categories.map(c => ({
    url: `${base}/category/${c.slug}`,
    lastModified: c.updatedAt, changeFrequency: 'daily', priority: 0.75,
  }));

  const chRoutes: MetadataRoute.Sitemap = channels
    .filter(c => CURATED_CHANNEL_SLUGS.has(c.slug))
    .map(c => ({
      url: `${base}/channel/${c.slug}`,
      lastModified: c.updatedAt, changeFrequency: 'daily' as const,
      priority: ['la-1','la-1-1','la-1-2','trt-1','m6','canal-sport','canal-sport-hd','rti-1'].includes(c.slug) ? 0.95
        : ['2m','al-aoula','arryadia','medi-1','arrabia','al-maghribia','2m-maroc','2m-hd','al-arryadia','arryadia-hd'].includes(c.slug) ? 0.85
        : 0.8,
    }));

  const matchRoutes: MetadataRoute.Sitemap = WC2026_MATCHES.map(m => ({
    url: `${base}/${m.slug}`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.9,
  }));

  const teamRoutes: MetadataRoute.Sitemap = Object.keys(WC2026_TEAMS).map(name => ({
    url: `${base}/team/${teamSlug(name)}`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.7,
  }));

  // Deduplicate — events section already hard-codes some channel/* URLs
  const seen = new Set<string>();
  return [...static_, ...events, ...matchRoutes, ...teamRoutes, ...catRoutes, ...chRoutes].filter(entry => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
