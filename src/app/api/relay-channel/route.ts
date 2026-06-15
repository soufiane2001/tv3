import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { adminGuard } from '@/lib/security';
import { RELAY_CHANNEL_KEY, RELAY_OPTIONS, SOURCE_OPTIONS, relayOption, isValidSourceSlug } from '@/lib/wc-channels';

export const dynamic = 'force-dynamic';

// Public GET: the source selected right now. The admin picker reads `options`
// (relay + direct sources) and `current`. The Oracle restream box reads
// `channel` to know which goattv channel to pull — for a direct source (ARD)
// that falls back to the default relay channel so the box keeps a valid stream
// (viewers play the direct .m3u8, not the box output). Never cached so a switch
// propagates fast.
export async function GET() {
  const cur = await prisma.setting.findUnique({ where: { key: RELAY_CHANNEL_KEY } }).catch(() => null);
  const curSlug = isValidSourceSlug(cur?.value) ? (cur!.value as string) : RELAY_OPTIONS[0].slug;
  const sel = SOURCE_OPTIONS.find(o => o.slug === curSlug)!;
  const opt = relayOption(curSlug); // box channel (default for direct sources)
  return NextResponse.json(
    {
      channel: opt.channel,
      slug: curSlug,
      label: sel.label,
      current: curSlug,
      options: SOURCE_OPTIONS,
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

// Admin POST { slug }: switch which source the site shows site-wide (relay
// goattv channel OR a direct multi-viewer source). The Oracle box picks up
// relay changes within ~15s.
export async function POST(req: NextRequest) {
  const err = adminGuard(req);
  if (err) return err;

  const { slug } = await req.json().catch(() => ({}));
  if (!isValidSourceSlug(slug)) {
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
