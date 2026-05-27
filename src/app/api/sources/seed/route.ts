import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Add TRT 1 and any direct-stream channels as manual sources
export async function POST(req: NextRequest) {
  if (req.headers.get('x-admin-password') !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const manualChannels = [
    {
      name: 'TRT 1',
      slug: 'trt-1',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/TRT_1_logo.svg/200px-TRT_1_logo.svg.png',
      streamUrl: 'https://trt.daioncdn.net/trt-1/master.m3u8?app=web',
      groupTitle: 'Turkish TV',
      tvgId: 'trt1',
      tvgName: 'TRT 1',
    },
  ];

  const results = [];

  for (const ch of manualChannels) {
    // Ensure category exists
    const catSlug = ch.groupTitle.toLowerCase().replace(/\s+/g, '-');
    const category = await prisma.category.upsert({
      where: { slug: catSlug },
      update: {},
      create: { name: ch.groupTitle, slug: catSlug },
    });

    const channel = await prisma.channel.upsert({
      where: { slug: ch.slug },
      update: {
        name: ch.name, logo: ch.logo, streamUrl: ch.streamUrl,
        groupTitle: ch.groupTitle, categoryId: category.id, isActive: true,
      },
      create: {
        name: ch.name, slug: ch.slug, logo: ch.logo, streamUrl: ch.streamUrl,
        groupTitle: ch.groupTitle, categoryId: category.id,
        tvgId: ch.tvgId, tvgName: ch.tvgName, order: 9999,
      },
    });

    // Update category count
    const count = await prisma.channel.count({ where: { categoryId: category.id, isActive: true } });
    await prisma.category.update({ where: { id: category.id }, data: { channelCount: count } });

    results.push(channel);
  }

  return NextResponse.json({ success: true, data: results });
}
