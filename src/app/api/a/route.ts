import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { detectDevice, detectBrowser, isBot, getCountryFromHeaders } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const ua = req.headers.get('user-agent') || '';
    if (isBot(ua)) return NextResponse.json({ ok: true });

    const body = await req.json().catch(() => ({}));
    const { path = '/', sessionId, referrer, duration, ping, leave } = body;
    if (!sessionId || !path) return NextResponse.json({ ok: false });

    // Ignore internal paths
    if (path.startsWith('/api') || path.startsWith('/_next')) {
      return NextResponse.json({ ok: true });
    }

    // Tab close — remove from live visitors immediately
    if (leave) {
      await prisma.liveVisitor.deleteMany({ where: { sessionId } });
      if (duration && duration >= 2) {
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
      return NextResponse.json({ ok: true });
    }

    const { country, countryCode, city } = getCountryFromHeaders(req.headers);

    // Exclude owner traffic from Lithuania
    if (countryCode === 'LT') return NextResponse.json({ ok: true });

    const device  = detectDevice(ua);
    const browser = detectBrowser(ua);

    // Always upsert the live visitor (both initial visit and keep-alive pings)
    await prisma.liveVisitor.upsert({
      where:  { sessionId },
      update: { path, lastSeen: new Date() },
      create: { sessionId, path, country, countryCode, device },
    });

    if (ping) {
      // Keep-alive ping — only updates live visitor, no new pageview
    } else if (!duration) {
      // Initial pageview
      await prisma.pageView.create({
        data: { path, sessionId, country, countryCode, city: city || null, referrer: referrer || null, device, browser },
      });
    } else {
      // Duration update on leaving the page
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

    // Prune stale live visitors (fire-and-forget)
    prisma.liveVisitor.deleteMany({
      where: { lastSeen: { lt: new Date(Date.now() - 3 * 60_000) } },
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) });
  }
}
