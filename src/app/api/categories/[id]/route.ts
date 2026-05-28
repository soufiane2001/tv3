import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '';

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (req.headers.get('x-admin-password') !== ADMIN_PASSWORD) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

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
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
