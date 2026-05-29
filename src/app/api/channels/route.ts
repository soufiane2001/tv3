import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';
import { adminGuard } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '24'));
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    const skip = (page - 1) * limit;

    const where = {
      isActive: true,
      ...(category && { category: { slug: category } }),
      ...(search && {
        name: { contains: search },
      }),
    };

    const [channels, total] = await Promise.all([
      prisma.channel.findMany({
        where,
        include: { category: { select: { name: true, slug: true } } },
        orderBy: { order: 'asc' },
        skip,
        take: limit,
      }),
      prisma.channel.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: channels,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const err = adminGuard(req);
  if (err) return err;

  try {
    await prisma.favorite.deleteMany({});
    const { count } = await prisma.channel.deleteMany({});
    await prisma.category.updateMany({ data: { channelCount: 0 } });
    return NextResponse.json({ success: true, deleted: count });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const err = adminGuard(req);
  if (err) return err;

  try {
    const body = await req.json();
    const { name, streamUrl, logo, groupTitle = 'General', slug: customSlug } = body;

    if (!name?.trim() || !streamUrl?.trim()) {
      return NextResponse.json({ success: false, error: 'name and streamUrl are required' }, { status: 400 });
    }

    const catName = groupTitle.trim() || 'General';
    const catSlug = slugify(catName);
    const category = await prisma.category.upsert({
      where: { slug: catSlug },
      update: {},
      create: { name: catName, slug: catSlug },
    });

    const baseSlug = customSlug?.trim() ? slugify(customSlug) : slugify(name);
    let slug = baseSlug;
    let attempt = 0;
    while (true) {
      const exists = await prisma.channel.findUnique({ where: { slug } });
      if (!exists) break;
      attempt++;
      slug = `${baseSlug}-${attempt}`;
    }

    const channel = await prisma.channel.create({
      data: {
        name: name.trim(),
        slug,
        streamUrl: streamUrl.trim(),
        logo: logo?.trim() || null,
        groupTitle: catName,
        categoryId: category.id,
        isActive: true,
      },
      include: { category: { select: { name: true, slug: true } } },
    });

    await prisma.category.update({
      where: { id: category.id },
      data: { channelCount: { increment: 1 } },
    });

    return NextResponse.json({ success: true, data: channel }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}
