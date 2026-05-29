import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminGuard } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const err = adminGuard(req);
  if (err) return err;

  const { id } = await params;
  const body = await req.json();
  const source = await prisma.source.update({ where: { id }, data: body });
  return NextResponse.json({ success: true, data: source });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const err = adminGuard(req);
  if (err) return err;

  const { id } = await params;
  await prisma.source.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
