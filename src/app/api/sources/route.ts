import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function checkAuth(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const sources = await prisma.source.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json({ success: true, data: sources });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { name, url } = await req.json();
    if (!name || !url) return NextResponse.json({ error: 'name and url required' }, { status: 400 });
    const source = await prisma.source.create({ data: { name, url } });
    return NextResponse.json({ success: true, data: source });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
