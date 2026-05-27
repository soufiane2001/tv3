import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
