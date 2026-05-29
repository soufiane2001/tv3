import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { COUNTRY_FLAGS } from '@/lib/analytics';
import { checkAdminPassword } from '@/lib/security';

export const dynamic = 'force-dynamic';

// Simple JSON endpoint for live visitor data.
// Called every 5s by the dashboard (polling replaces SSE which can't run
// on Vercel serverless and can't receive custom auth headers via EventSource).
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pwd = searchParams.get('pwd') ?? req.headers.get('x-admin-password');
  if (!checkAdminPassword(pwd)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const cutoff = new Date(Date.now() - 3 * 60_000);
  const visitors = await prisma.liveVisitor.findMany({
    where: { lastSeen: { gte: cutoff } },
    orderBy: { lastSeen: 'desc' },
  });

  return NextResponse.json({
    count: visitors.length,
    visitors: visitors.map(v => ({
      path: v.path,
      country: v.country,
      countryCode: v.countryCode,
      flag: COUNTRY_FLAGS[v.countryCode] ?? '🌐',
      device: v.device,
      lastSeen: v.lastSeen,
    })),
    ts: Date.now(),
  });
}
