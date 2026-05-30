import { NextRequest, NextResponse } from 'next/server';

/** Timing-safe string comparison (pure JS, no crypto import needed). */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/** Check admin password against ADMIN_PASSWORD env var. */
export function checkAdminPassword(provided: string | null): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? '';
  if (!provided || !expected) return false;
  return safeEqual(provided, expected);
}

/** Validate that the request Origin is the site itself or localhost. */
export function validateOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true; // server-to-server / curl / no-CORS same-origin — allow
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  if (siteUrl && origin === siteUrl) return true;
  if (/^https?:\/\/localhost(:\d+)?$/.test(origin)) return true;
  return false;
}

/**
 * Validate admin password + origin in one call.
 * Returns a 401/403 NextResponse if the check fails, or null if it passes.
 */
export function adminGuard(req: NextRequest): NextResponse | null {
  if (!validateOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const pwd = req.headers.get('x-admin-password');
  if (!checkAdminPassword(pwd)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
