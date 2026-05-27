import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { COUNTRY_FLAGS } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

// Server-Sent Events stream for real-time active visitor count
export async function GET(req: NextRequest) {
  if (req.headers.get('x-admin-password') !== process.env.ADMIN_PASSWORD) {
    return new Response('Unauthorized', { status: 401 });
  }

  const encoder = new TextEncoder();
  let closed = false;

  const stream = new ReadableStream({
    async start(controller) {
      const send = async () => {
        if (closed) return;
        try {
          const cutoff = new Date(Date.now() - 3 * 60_000);
          const visitors = await prisma.liveVisitor.findMany({
            where: { lastSeen: { gte: cutoff } },
          });
          const payload = JSON.stringify({
            count: visitors.length,
            visitors: visitors.map(v => ({
              path: v.path,
              country: v.country,
              countryCode: v.countryCode,
              flag: COUNTRY_FLAGS[v.countryCode] || '🌐',
              device: v.device,
              lastSeen: v.lastSeen,
            })),
            ts: Date.now(),
          });
          controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
        } catch {
          // ignore
        }
      };

      await send();
      const interval = setInterval(send, 5000);

      req.signal.addEventListener('abort', () => {
        closed = true;
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
