import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export const revalidate = 3600; // regenerate at most once per hour

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
    { url: `${base}/search`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
  ];

  // ── High-priority event pages ─────────────────────────────
  const events: MetadataRoute.Sitemap = [
    // UCL Final — primary stream
    { url: `${base}/arsenal-vs-psg`,              lastModified: now, changeFrequency: 'hourly', priority: 1.0 },
    // UCL Final — pre-match informational (lineup + prediction capture day-before traffic)
    { url: `${base}/arsenal-psg-lineup`,          lastModified: now, changeFrequency: 'hourly', priority: 1.0 },
    { url: `${base}/arsenal-psg-prediction`,      lastModified: now, changeFrequency: 'hourly', priority: 1.0 },
    { url: `${base}/champions-league-final-2026`, lastModified: now, changeFrequency: 'hourly', priority: 1.0 },
    { url: `${base}/crystal-palace-vs-rayo-vallecano`, lastModified: now, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${base}/world-cup-2026`,              lastModified: now, changeFrequency: 'daily',  priority: 0.9 },
    // Free broadcast channels for the UCL Final
    { url: `${base}/channel/la-1`,        lastModified: now, changeFrequency: 'hourly', priority: 0.95 },
    { url: `${base}/channel/m6`,          lastModified: now, changeFrequency: 'hourly', priority: 0.95 },
    { url: `${base}/channel/canal-sport`, lastModified: now, changeFrequency: 'hourly', priority: 0.95 },
    { url: `${base}/channel/trt`,         lastModified: now, changeFrequency: 'hourly', priority: 0.9  },
  ];

  const catRoutes: MetadataRoute.Sitemap = categories.map(c => ({
    url: `${base}/category/${c.slug}`,
    lastModified: c.updatedAt, changeFrequency: 'daily', priority: 0.75,
  }));

  const chRoutes: MetadataRoute.Sitemap = channels.map(c => ({
    url: `${base}/channel/${c.slug}`,
    lastModified: c.updatedAt, changeFrequency: 'daily',
    priority: ['la-1','la-1-1','la-1-2','trt-1','m6','canal-sport','canal-sport-hd'].includes(c.slug) ? 0.95 : 0.65,
  }));

  return [...static_, ...events, ...catRoutes, ...chRoutes];
}
