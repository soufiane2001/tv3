import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminGuard } from '@/lib/security';

export const dynamic = 'force-dynamic';

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
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const err = adminGuard(req);
  if (err) return err;

  try {
    const { id } = await params;
    const body = await req.json();
    const channel = await prisma.channel.update({ where: { id }, data: body });
    return NextResponse.json({ success: true, data: channel });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const err = adminGuard(req);
  if (err) return err;

  try {
    const { id } = await params;
    await prisma.channel.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}
