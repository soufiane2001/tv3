import { prisma } from './prisma';
import { fetchM3U } from './m3u-parser';
import { slugify } from './utils';
import type { M3UEntry } from '@/types';

async function ensureDefaultSources() {
  const count = await prisma.source.count();
  if (count > 0) return;

  const defaults = [
    { name: 'Main IPTV', url: process.env.M3U_URL || '' },
    { name: 'TDT Channels', url: 'https://www.tdtchannels.com/lists/tv.m3u8' },
  ].filter((s) => s.url);

  for (const s of defaults) {
    await prisma.source.upsert({
      where: { url: s.url },
      update: {},
      create: s,
    });
  }
}

export async function syncM3U(): Promise<{
  added: number;
  updated: number;
  removed: number;
  total: number;
}> {
  await ensureDefaultSources();

  const sources = await prisma.source.findMany({ where: { isActive: true } });
  if (sources.length === 0) throw new Error('No active M3U sources configured');

  const log = await prisma.syncLog.create({ data: { status: 'running' } });

  try {
    // Fetch all sources in parallel
    const results = await Promise.allSettled(sources.map((s) => fetchM3U(s.url)));

    const allEntries: M3UEntry[] = [];
    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      if (r.status === 'fulfilled') {
        allEntries.push(...r.value);
        await prisma.source.update({
          where: { id: sources[i].id },
          data: { lastSync: new Date() },
        });
      } else {
        console.error(`Failed to fetch source "${sources[i].name}":`, r.reason);
      }
    }

    if (allEntries.length === 0) throw new Error('All sources failed to load');

    // Build category map
    const categoryMap = new Map<string, string>();
    const groupNames = [...new Set(allEntries.map((e) => e.groupTitle))];

    for (const name of groupNames) {
      const slug = slugify(name) || 'general';
      const cat = await prisma.category.upsert({
        where: { slug },
        update: { name },
        create: { name, slug },
      });
      categoryMap.set(name, cat.id);
    }

    // Upsert channels
    let added = 0;
    let updated = 0;
    const seenSlugs = new Set<string>();

    for (let i = 0; i < allEntries.length; i++) {
      const entry = allEntries[i];
      let baseSlug = slugify(entry.name) || `channel-${i}`;
      let slug = baseSlug;
      let counter = 1;
      while (seenSlugs.has(slug)) {
        slug = `${baseSlug}-${counter++}`;
      }
      seenSlugs.add(slug);

      const categoryId = categoryMap.get(entry.groupTitle);
      const existing = await prisma.channel.findUnique({ where: { slug } });

      if (existing) {
        await prisma.channel.update({
          where: { slug },
          data: {
            name: entry.name,
            logo: entry.logo || null,
            streamUrl: entry.streamUrl,
            groupTitle: entry.groupTitle,
            categoryId: categoryId || null,
            tvgId: entry.tvgId || null,
            tvgName: entry.tvgName || null,
            order: i,
            isActive: true,
          },
        });
        updated++;
      } else {
        await prisma.channel.create({
          data: {
            name: entry.name,
            slug,
            logo: entry.logo || null,
            streamUrl: entry.streamUrl,
            groupTitle: entry.groupTitle,
            categoryId: categoryId || null,
            tvgId: entry.tvgId || null,
            tvgName: entry.tvgName || null,
            order: i,
          },
        });
        added++;
      }
    }

    // Deactivate channels no longer in any source
    const removed = await prisma.channel.updateMany({
      where: { slug: { notIn: [...seenSlugs] }, isActive: true },
      data: { isActive: false },
    });

    // Update category counts
    for (const [, catId] of categoryMap) {
      const count = await prisma.channel.count({
        where: { categoryId: catId, isActive: true },
      });
      await prisma.category.update({
        where: { id: catId },
        data: { channelCount: count },
      });
    }

    await prisma.syncLog.update({
      where: { id: log.id },
      data: {
        status: 'success',
        channelsAdded: added,
        channelsUpdated: updated,
        channelsRemoved: removed.count,
        totalChannels: allEntries.length,
      },
    });

    return { added, updated, removed: removed.count, total: allEntries.length };
  } catch (err) {
    await prisma.syncLog.update({
      where: { id: log.id },
      data: { status: 'error', error: String(err) },
    });
    throw err;
  }
}
