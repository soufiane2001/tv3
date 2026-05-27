import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { COUNTRY_FLAGS, COUNTRY_NAMES } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (req.headers.get('x-admin-password') !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now   = new Date();
  const h1ago = new Date(now.getTime() - 60 * 60_000);
  const h24   = new Date(now.getTime() - 24 * 60 * 60_000);
  const d7    = new Date(now.getTime() - 7  * 24 * 60 * 60_000);
  const d30   = new Date(now.getTime() - 30 * 24 * 60 * 60_000);

  const [
    liveVisitors,
    viewsToday,
    viewsHour,
    uniqueToday,
    topPages,
    topCountries,
    avgDuration,
    topReferrers,
    deviceBreakdown,
    browserBreakdown,
    chart24h,
    chart7d,
  ] = await Promise.all([
    // Active right now
    prisma.liveVisitor.findMany({
      where: { lastSeen: { gte: new Date(now.getTime() - 3 * 60_000) } },
      orderBy: { lastSeen: 'desc' },
    }),
    // Pageviews today (since midnight)
    prisma.pageView.count({
      where: { createdAt: { gte: new Date(now.setHours(0, 0, 0, 0)) } },
    }),
    // Pageviews last hour
    prisma.pageView.count({ where: { createdAt: { gte: h1ago } } }),
    // Unique sessions today
    prisma.pageView.groupBy({
      by: ['sessionId'],
      where: { createdAt: { gte: new Date(now.getTime() - 24 * 60 * 60_000) } },
    }).then(r => r.length),
    // Top pages (24h)
    prisma.pageView.groupBy({
      by: ['path'],
      where: { createdAt: { gte: h24 } },
      _count: { path: true },
      orderBy: { _count: { path: 'desc' } },
      take: 10,
    }),
    // Top countries (24h)
    prisma.pageView.groupBy({
      by: ['country', 'countryCode'],
      where: { createdAt: { gte: h24 } },
      _count: { country: true },
      orderBy: { _count: { country: 'desc' } },
      take: 10,
    }),
    // Avg duration (where recorded)
    prisma.pageView.aggregate({
      where: { createdAt: { gte: h24 }, duration: { not: null, gt: 0 } },
      _avg: { duration: true },
    }),
    // Top referrers (24h)
    prisma.pageView.groupBy({
      by: ['referrer'],
      where: { createdAt: { gte: h24 }, referrer: { not: null } },
      _count: { referrer: true },
      orderBy: { _count: { referrer: 'desc' } },
      take: 8,
    }),
    // Device breakdown (24h)
    prisma.pageView.groupBy({
      by: ['device'],
      where: { createdAt: { gte: h24 } },
      _count: { device: true },
      orderBy: { _count: { device: 'desc' } },
    }),
    // Browser breakdown (24h)
    prisma.pageView.groupBy({
      by: ['browser'],
      where: { createdAt: { gte: h24 } },
      _count: { browser: true },
      orderBy: { _count: { browser: 'desc' } },
    }),
    // Hourly chart: last 24h (1 bucket per hour)
    prisma.$queryRaw<{ hour: string; count: bigint }[]>`
      SELECT to_char(date_trunc('hour', "createdAt"), 'YYYY-MM-DD"T"HH24:00:00') as hour, COUNT(*) as count
      FROM "PageView"
      WHERE "createdAt" >= NOW() - INTERVAL '24 hours'
      GROUP BY hour ORDER BY hour ASC`,
    // Daily chart: last 7 days
    prisma.$queryRaw<{ day: string; count: bigint }[]>`
      SELECT to_char(date_trunc('day', "createdAt"), 'YYYY-MM-DD') as day, COUNT(*) as count
      FROM "PageView"
      WHERE "createdAt" >= NOW() - INTERVAL '7 days'
      GROUP BY day ORDER BY day ASC`,
  ]);

  return NextResponse.json({
    live: {
      count: liveVisitors.length,
      visitors: liveVisitors.map(v => ({
        path: v.path,
        country: v.country,
        countryCode: v.countryCode,
        flag: COUNTRY_FLAGS[v.countryCode] || '🌐',
        device: v.device,
        lastSeen: v.lastSeen,
      })),
    },
    totals: {
      viewsToday,
      viewsHour,
      uniqueToday,
      avgDuration: Math.round(avgDuration._avg.duration || 0),
    },
    topPages: topPages.map(p => ({ path: p.path, count: p._count.path })),
    topCountries: topCountries.map(c => ({
      country: c.country,
      countryCode: c.countryCode,
      flag: COUNTRY_FLAGS[c.countryCode] || '🌐',
      count: c._count.country,
    })),
    topReferrers: topReferrers
      .filter(r => r.referrer)
      .map(r => ({ referrer: r.referrer!, count: r._count.referrer })),
    devices: deviceBreakdown.map(d => ({ device: d.device, count: d._count.device })),
    browsers: browserBreakdown.map(b => ({ browser: b.browser, count: b._count.browser })),
    chart24h: chart24h.map(r => ({ hour: r.hour, count: Number(r.count) })),
    chart7d: chart7d.map(r => ({ day: r.day, count: Number(r.count) })),
  });
}
