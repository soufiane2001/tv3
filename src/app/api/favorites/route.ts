import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.headers.get('x-session-id') || 'anonymous';
    const favorites = await prisma.favorite.findMany({
      where: { sessionId },
      include: {
        channel: {
          include: { category: { select: { name: true, slug: true } } },
        },
      },
    });
    return NextResponse.json({ success: true, data: favorites.map((f) => f.channel) });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.headers.get('x-session-id') || 'anonymous';
    const { channelId } = await req.json();

    const existing = await prisma.favorite.findUnique({
      where: { channelId_sessionId: { channelId, sessionId } },
    });

    if (existing) {
      await prisma.favorite.delete({ where: { id: existing.id } });
      return NextResponse.json({ success: true, action: 'removed' });
    }

    await prisma.favorite.create({ data: { channelId, sessionId } });
    return NextResponse.json({ success: true, action: 'added' });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
