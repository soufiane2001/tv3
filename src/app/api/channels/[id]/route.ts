import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const channel = await prisma.channel.findFirst({
      where: { OR: [{ id }, { slug: id }], isActive: true },
      include: { category: true },
    });

    if (!channel) {
      return NextResponse.json({ success: false, error: 'Channel not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: channel });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const password = req.headers.get('x-admin-password');
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const channel = await prisma.channel.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ success: true, data: channel });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const password = req.headers.get('x-admin-password');
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await prisma.channel.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
