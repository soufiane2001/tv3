import { NextRequest, NextResponse } from 'next/server';
import { syncM3U } from '@/lib/sync';
import { adminGuard } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const err = adminGuard(req);
  if (err) return err;

  try {
    const result = await syncM3U();
    return NextResponse.json({ success: true, data: result });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const err = adminGuard(req);
  if (err) return err;

  try {
    const { prisma } = await import('@/lib/prisma');
    const logs = await prisma.syncLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return NextResponse.json({ success: true, data: logs });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}
