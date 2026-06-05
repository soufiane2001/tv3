/**
 * One-shot script to add a channel directly to the DB.
 * Usage:  npx tsx scripts/add-channel.ts
 * Requires DATABASE_URL in .env / .env.local
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CHANNELS = [
  {
    name: 'Das Erste',
    slug: 'das-erste',
    streamUrl: 'https://daserste-live.ard-mcdn.de/daserste/live/hls/de/master.m3u8',
    groupTitle: 'German',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Das_Erste.svg/250px-Das_Erste.svg.png',
  },
];

async function main() {
  for (const ch of CHANNELS) {
    const catSlug = ch.groupTitle.toLowerCase().replace(/\s+/g, '-');
    const category = await prisma.category.upsert({
      where: { slug: catSlug },
      update: {},
      create: { name: ch.groupTitle, slug: catSlug },
    });

    const existing = await prisma.channel.findUnique({ where: { slug: ch.slug } });
    if (existing) {
      await prisma.channel.update({
        where: { slug: ch.slug },
        data: { streamUrl: ch.streamUrl, isActive: true, categoryId: category.id },
      });
      console.log(`Updated: ${ch.name}`);
    } else {
      await prisma.channel.create({
        data: {
          name: ch.name,
          slug: ch.slug,
          streamUrl: ch.streamUrl,
          groupTitle: ch.groupTitle,
          logo: ch.logo,
          categoryId: category.id,
          isActive: true,
          order: 0,
        },
      });
      console.log(`Created: ${ch.name} → ${ch.slug}`);
    }

    await prisma.category.update({
      where: { slug: catSlug },
      data: { channelCount: { increment: existing ? 0 : 1 } },
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
