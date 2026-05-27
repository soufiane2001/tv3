import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { detectDevice, detectBrowser, isBot, getCountryFromHeaders } from '@/lib/analytics';

export async function POST(req: NextRequest) {
  try {
    const ua = req.headers.get('user-agent') || '';
    if (isBot(ua)) return NextResponse.json({ ok: true });

    const body = await req.json().catch(() => ({}));
    const { path = '/', sessionId, referrer, duration } = body;
    if (!sessionId || !path) return NextResponse.json({ ok: false });

    // Ignore internal paths
    if (path.startsWith('/api') || path.startsWith('/_next')) {
      return NextResponse.json({ ok: true });
    }

    const { country, countryCode, city } = getCountryFromHeaders(req.headers);
    const device  = detectDevice(ua);
    const browser = detectBrowser(ua);

    // Upsert live visitor (keep-alive ping or new visit)
    await prisma.liveVisitor.upsert({
      where:  { sessionId },
      update: { path, lastSeen: new Date() },
      create: { sessionId, path, country, countryCode, device },
    });

    // Record pageview (only on first visit to path, not on keep-alive pings)
    if (!duration) {
      await prisma.pageView.create({
        data: { path, sessionId, country, countryCode, city: city || null, referrer: referrer || null, device, browser },
      });
    } else {
      // Update duration on the latest pageview for this session+path
      const latest = await prisma.pageView.findFirst({
        where: { sessionId, path },
        orderBy: { createdAt: 'desc' },
      });
      if (latest) {
        await prisma.pageView.update({
          where: { id: latest.id },
          data: { duration: Math.min(duration, 3600) },
        });
      }
    }

    // Prune live visitors older than 3 min (async, don't await)
    prisma.liveVisitor.deleteMany({
      where: { lastSeen: { lt: new Date(Date.now() - 3 * 60_000) } },
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) });
  }
}
