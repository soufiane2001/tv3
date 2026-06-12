import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { COUNTRY_FLAGS, COUNTRY_NAMES } from '@/lib/analytics';
import { adminGuard } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const err = adminGuard(req);
  if (err) return err;

  const now          = new Date();
  const h1ago        = new Date(now.getTime() - 60 * 60_000);
  const h24          = new Date(now.getTime() - 24 * 60 * 60_000);
  const d7           = new Date(now.getTime() - 7  * 24 * 60 * 60_000);
  const d30          = new Date(now.getTime() - 30 * 24 * 60 * 60_000);
  const todayMidnight = new Date(now); todayMidnight.setHours(0, 0, 0, 0);

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
    pageGeoRaw,
    topStreams,
    recentSessionsRaw,
    totalVisitors,
    newVisitorsToday,
    returningToday,
    recentVisitorsRaw,
  ] = await Promise.all([
    // Active right now
    prisma.liveVisitor.findMany({
      where: { lastSeen: { gte: new Date(now.getTime() - 3 * 60_000) } },
      orderBy: { lastSeen: 'desc' },
    }),
    // Pageviews today (since midnight)
    prisma.pageView.count({
      where: { createdAt: { gte: todayMidnight } },
    }),
    // Pageviews last hour
    prisma.pageView.count({ where: { createdAt: { gte: h1ago } } }),
    // Unique sessions today (last 24h)
    prisma.pageView.groupBy({
      by: ['sessionId'],
      where: { createdAt: { gte: h24 } },
    }).then(r => r.length),
    // Top pages (24h)
    prisma.pageView.groupBy({
      by: ['path'],
      where: { createdAt: { gte: h24 } },
      _count: { path: true },
      orderBy: { _count: { path: 'desc' } },
      take: 10,
    }),
    // Top countries (24h) — no limit, show all
    prisma.pageView.groupBy({
      by: ['country', 'countryCode'],
      where: { createdAt: { gte: h24 } },
      _count: { country: true },
      orderBy: { _count: { country: 'desc' } },
      take: 50,
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
    // Per-page country+city breakdown (24h)
    prisma.$queryRaw<{ path: string; country: string; countryCode: string; city: string | null; count: bigint }[]>`
      SELECT path, country, "countryCode", city, COUNT(*) as count
      FROM "PageView"
      WHERE "createdAt" >= NOW() - INTERVAL '24 hours'
      GROUP BY path, country, "countryCode", city
      ORDER BY path, count DESC`,
    // Top streams played (24h)
    prisma.streamPlay.groupBy({
      by: ['channelId', 'channelName'],
      where: { createdAt: { gte: h24 } },
      _count: { channelId: true },
      orderBy: { _count: { channelId: 'desc' } },
      take: 10,
    }),
    // Recent sessions (24h): duration, pages, stream played
    prisma.$queryRaw<{
      sessionId: string; country: string; countryCode: string; device: string; browser: string;
      totalDuration: number | null; pageCount: bigint; firstSeen: Date; lastSeen: Date;
    }[]>`
      SELECT "sessionId", country, "countryCode", device, browser,
             SUM(duration) as "totalDuration", COUNT(*) as "pageCount",
             MIN("createdAt") as "firstSeen", MAX("createdAt") as "lastSeen"
      FROM "PageView"
      WHERE "createdAt" >= NOW() - INTERVAL '24 hours'
      GROUP BY "sessionId", country, "countryCode", device, browser
      ORDER BY "firstSeen" DESC
      LIMIT 50`,
    // Persistent visitors — total, new today, returning today, recent list
    prisma.visitor.count(),
    prisma.visitor.count({ where: { firstSeen: { gte: todayMidnight } } }),
    prisma.visitor.count({ where: { lastSeen: { gte: todayMidnight }, firstSeen: { lt: todayMidnight } } }),
    prisma.visitor.findMany({
      orderBy: { lastSeen: 'desc' },
      take: 60,
      select: {
        visitorId: true, firstSeen: true, lastSeen: true, visits: true,
        country: true, countryCode: true, device: true, browser: true, referrer: true,
      },
    }),
  ]);

  // Fetch which sessions played a stream (24h)
  const sessionIds = recentSessionsRaw.map(s => s.sessionId);
  const streamPlaysBySession = sessionIds.length > 0
    ? await prisma.streamPlay.findMany({
        where: { sessionId: { in: sessionIds }, createdAt: { gte: h24 } },
        select: { sessionId: true, channelName: true },
      })
    : [];
  const streamPlayMap = new Map<string, string[]>();
  for (const sp of streamPlaysBySession) {
    if (!streamPlayMap.has(sp.sessionId)) streamPlayMap.set(sp.sessionId, []);
    const arr = streamPlayMap.get(sp.sessionId)!;
    if (!arr.includes(sp.channelName)) arr.push(sp.channelName);
  }

  // Build page → country → cities tree
  const pageGeoMap = new Map<string, Map<string, { country: string; countryCode: string; count: number; cities: Map<string, number> }>>();
  for (const row of pageGeoRaw) {
    if (!pageGeoMap.has(row.path)) pageGeoMap.set(row.path, new Map());
    const countryMap = pageGeoMap.get(row.path)!;
    const ck = row.countryCode || '??';
    if (!countryMap.has(ck)) {
      countryMap.set(ck, { country: row.country || 'Unknown', countryCode: ck, count: 0, cities: new Map() });
    }
    const entry = countryMap.get(ck)!;
    const n = Number(row.count);
    entry.count += n;
    const cityName = row.city || '';
    if (cityName) entry.cities.set(cityName, (entry.cities.get(cityName) || 0) + n);
  }

  const pageGeo = Array.from(pageGeoMap.entries())
    .map(([path, countryMap]) => {
      const countries = Array.from(countryMap.values())
        .sort((a, b) => b.count - a.count)
        .map(c => ({
          country: c.country,
          countryCode: c.countryCode,
          flag: COUNTRY_FLAGS[c.countryCode] || '🌐',
          count: c.count,
          cities: Array.from(c.cities.entries())
            .map(([city, count]) => ({ city, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8),
        }));
      return { path, total: countries.reduce((s, c) => s + c.count, 0), countries };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 30);

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
    pageGeo,
    topStreams: topStreams.map(s => ({ channelId: s.channelId, channelName: s.channelName, count: s._count.channelId })),
    recentSessions: recentSessionsRaw.map(s => ({
      sessionId: s.sessionId,
      country: s.country,
      countryCode: s.countryCode,
      flag: COUNTRY_FLAGS[s.countryCode] || '🌐',
      device: s.device,
      browser: s.browser,
      totalDuration: s.totalDuration ? Math.min(Number(s.totalDuration), 7200) : null,
      pageCount: Number(s.pageCount),
      firstSeen: s.firstSeen,
      streamPlayed: streamPlayMap.get(s.sessionId) || [],
    })),
    visitors: {
      total: totalVisitors,
      newToday: newVisitorsToday,
      returningToday,
      list: recentVisitorsRaw.map(v => ({
        visitorId: v.visitorId,
        short: v.visitorId.slice(0, 8),
        firstSeen: v.firstSeen,
        lastSeen: v.lastSeen,
        visits: v.visits,
        isNew: v.firstSeen >= todayMidnight,
        country: v.country,
        countryCode: v.countryCode,
        flag: COUNTRY_FLAGS[v.countryCode] || '🌐',
        device: v.device,
        browser: v.browser,
        referrer: v.referrer || null,
      })),
    },
  });
}
