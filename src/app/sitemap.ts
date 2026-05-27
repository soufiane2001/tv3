import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://sportalive.live';
  const now  = new Date();

  const [channels, categories] = await Promise.all([
    prisma.channel.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
  ]);

  const static_: MetadataRoute.Sitemap = [
    { url: base,          lastModified: now, changeFrequency: 'daily',  priority: 1.0 },
    { url: `${base}/live`,lastModified: now, changeFrequency: 'hourly', priority: 0.95 },
    { url: `${base}/search`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
  ];

  // ── High-priority event pages ─────────────────────────────
  const events: MetadataRoute.Sitemap = [
    {
      url: `${base}/arsenal-vs-psg`,
      lastModified: now, changeFrequency: 'hourly', priority: 1.0,
    },
    {
      url: `${base}/champions-league-final-2026`,
      lastModified: now, changeFrequency: 'hourly', priority: 1.0,
    },
    {
      url: `${base}/crystal-palace-vs-rayo-vallecano`,
      lastModified: now, changeFrequency: 'hourly', priority: 1.0,
    },
    {
      url: `${base}/world-cup-2026`,
      lastModified: now, changeFrequency: 'daily', priority: 0.95,
    },
    // Alternate keyword URLs pointing to same content
    { url: `${base}/channel/la-1`,   lastModified: now, changeFrequency: 'hourly', priority: 0.95 },
    { url: `${base}/channel/trt-1`,  lastModified: now, changeFrequency: 'hourly', priority: 0.95 },
  ];

  const catRoutes: MetadataRoute.Sitemap = categories.map(c => ({
    url: `${base}/category/${c.slug}`,
    lastModified: c.updatedAt, changeFrequency: 'daily', priority: 0.75,
  }));

  const chRoutes: MetadataRoute.Sitemap = channels.map(c => ({
    url: `${base}/channel/${c.slug}`,
    lastModified: c.updatedAt, changeFrequency: 'daily',
    // Boost La 1 and TRT 1 in sitemap
    priority: ['la-1','la-1-1','la-1-2','trt-1'].includes(c.slug) ? 0.95 : 0.65,
  }));

  return [...static_, ...events, ...catRoutes, ...chRoutes];
}
