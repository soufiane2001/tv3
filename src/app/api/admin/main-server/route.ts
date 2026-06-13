import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { adminGuard } from '@/lib/security';
import { MAIN_SERVER_KEY, WC_SERVER_LINEUP } from '@/lib/wc-channels';

export const dynamic = 'force-dynamic';

// GET → list of servers + the currently selected main slug.
export async function GET(req: NextRequest) {
  const err = adminGuard(req);
  if (err) return err;
  const cur = await prisma.setting.findUnique({ where: { key: MAIN_SERVER_KEY } }).catch(() => null);
  return NextResponse.json({
    servers: WC_SERVER_LINEUP,
    current: cur?.value || WC_SERVER_LINEUP[0]?.slug || null,
  });
}

// POST { slug } → set the main server, then revalidate the whole site so the
// new order shows up right away.
export async function POST(req: NextRequest) {
  const err = adminGuard(req);
  if (err) return err;

  const { slug } = await req.json().catch(() => ({}));
  if (!slug || !WC_SERVER_LINEUP.some(s => s.slug === slug)) {
    return NextResponse.json({ ok: false, error: 'Invalid server slug' }, { status: 400 });
  }

  await prisma.setting.upsert({
    where:  { key: MAIN_SERVER_KEY },
    update: { value: slug },
    create: { key: MAIN_SERVER_KEY, value: slug },
  });

  // Bust the ISR cache site-wide so the new main server applies immediately.
  try { revalidatePath('/', 'layout'); } catch { /* best effort */ }

  return NextResponse.json({ ok: true, current: slug });
}
