import { ImageResponse } from 'next/og';
import { getMatch } from '@/data/wc2026-matches';

// Dynamic 1200x630 Open Graph image per match — referenced by buildMatchMetadata.
// Lives at /og (NOT /api/, which robots.txt disallows) so social + image crawlers
// can fetch it.
export const runtime = 'edge';

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const m = getMatch(searchParams.get('slug') ?? '');

  const home = m?.home ?? 'FIFA World Cup';
  const away = m?.away ?? '2026';
  const sub = m
    ? `Group ${m.group}  ·  ${m.day}  ·  ${m.venueShort}`
    : 'Free Live Stream — HD, No Subscription';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', padding: '64px 72px', color: '#fff',
          background: 'linear-gradient(150deg,#b91c1c 0%,#7f1d1d 45%,#0d0000 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 26, fontWeight: 800, letterSpacing: 4, color: 'rgba(255,255,255,0.7)' }}>
            FIFA WORLD CUP 2026
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', color: '#b91c1c', padding: '8px 18px', borderRadius: 999, fontSize: 24, fontWeight: 900 }}>
            ● WATCH FREE
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 36 }}>
          {m && <img width={150} height={100} src={`https://flagcdn.com/w320/${m.hf}.png`} style={{ borderRadius: 8 }} />}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', fontSize: 72, fontWeight: 900, lineHeight: 1.05, textAlign: 'center' }}>
              {home} vs {away}
            </div>
            <div style={{ display: 'flex', fontSize: 30, fontWeight: 800, color: '#ffd9d9', marginTop: 18 }}>VS</div>
          </div>
          {m && <img width={150} height={100} src={`https://flagcdn.com/w320/${m.af}.png`} style={{ borderRadius: 8 }} />}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 28, color: 'rgba(255,255,255,0.85)' }}>{sub}</div>
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 900 }}>sportalive.live</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
