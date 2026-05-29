import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminGuard } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const err = adminGuard(req);
  if (err) return err;

  const sources = await prisma.source.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json({ success: true, data: sources });
}

export async function POST(req: NextRequest) {
  const err = adminGuard(req);
  if (err) return err;

  try {
    const { name, url } = await req.json();
    if (!name || !url) return NextResponse.json({ error: 'name and url required' }, { status: 400 });
    const source = await prisma.source.create({ data: { name, url } });
    return NextResponse.json({ success: true, data: source });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
