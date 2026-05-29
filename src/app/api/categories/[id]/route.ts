import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminGuard } from '@/lib/security';

export const dynamic = 'force-dynamic';

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const err = adminGuard(req);
  if (err) return err;

  const { id } = await params;
  const { name } = await req.json();

  if (!name?.trim()) {
    return NextResponse.json({ success: false, error: 'Name required' }, { status: 400 });
  }

  try {
    const category = await prisma.category.update({
      where: { id },
      data: { name: name.trim(), slug: slugify(name.trim()) },
    });
    return NextResponse.json({ success: true, data: category });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}
