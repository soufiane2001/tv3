import { NextRequest, NextResponse } from 'next/server';
import { syncM3U } from '@/lib/sync';

// Cron endpoint - call this with a cron job or scheduler
// Example: GET /api/cron/sync?secret=your-secret
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await syncM3U();
    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
