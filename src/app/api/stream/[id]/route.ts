import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Proxy stream URL to avoid exposing the direct link in client code
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const channel = await prisma.channel.findFirst({
      where: { OR: [{ id }, { slug: id }], isActive: true },
      select: { streamUrl: true },
    });

    if (!channel) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Return a redirect to the stream URL
    return NextResponse.redirect(channel.streamUrl);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
