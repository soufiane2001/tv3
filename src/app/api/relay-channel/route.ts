import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { adminGuard } from '@/lib/security';
import { RELAY_CHANNEL_KEY, RELAY_OPTIONS, relayOption } from '@/lib/wc-channels';

export const dynamic = 'force-dynamic';

// Public GET: the channel the relay should broadcast right now. The Oracle
// restream box polls this every ~15s to know which goattv channel to pull, and
// the admin picker reads it too. Never cached so a switch propagates fast.
export async function GET() {
  const cur = await prisma.setting.findUnique({ where: { key: RELAY_CHANNEL_KEY } }).catch(() => null);
  const opt = relayOption(cur?.value);
  return NextResponse.json(
    {
      channel: opt.channel,
      source: opt.url || '',
      slug: opt.slug,
      label: opt.label,
      current: opt.slug,
      options: RELAY_OPTIONS.map(({ slug, label, sublabel, channel }) => ({ slug, label, sublabel, channel })),
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

// Admin POST { slug }: switch which goattv channel the relay broadcasts
// site-wide. The Oracle box picks it up within ~15s and restarts ffmpeg.
export async function POST(req: NextRequest) {
  const err = adminGuard(req);
  if (err) return err;

  const { slug } = await req.json().catch(() => ({}));
  if (!RELAY_OPTIONS.some(o => o.slug === slug)) {
    return NextResponse.json({ ok: false, error: 'Invalid channel slug' }, { status: 400 });
  }

  await prisma.setting.upsert({
    where:  { key: RELAY_CHANNEL_KEY },
    update: { value: slug },
    create: { key: RELAY_CHANNEL_KEY, value: slug },
  });

  // Bust ISR so the site label reflects the new channel right away.
  try { revalidatePath('/', 'layout'); } catch { /* best effort */ }

  return NextResponse.json({ ok: true, current: slug });
}
