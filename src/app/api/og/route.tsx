import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const home  = searchParams.get('home')  ?? 'Match';
  const away  = searchParams.get('away')  ?? 'Live';
  const hFlag = searchParams.get('hf')    ?? '';
  const aFlag = searchParams.get('af')    ?? '';
  const date  = searchParams.get('date')  ?? 'World Cup 2026';

  const flagUrl = (code: string) =>
    code ? `https://flagcdn.com/w160/${code}.png` : null;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #060d1f 0%, #0d1f12 40%, #1a0a2e 100%)',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
          <span style={{ color: '#4ade80', fontSize: '22px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            FIFA World Cup 2026 • Live Stream Free
          </span>
        </div>

        {/* Teams row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
          {/* Home */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            {flagUrl(hFlag) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={flagUrl(hFlag)!} width={120} height={80} style={{ borderRadius: '8px', objectFit: 'cover' }} alt={home} />
            )}
            <span style={{ color: '#ffffff', fontSize: '42px', fontWeight: 900, textTransform: 'uppercase' }}>{home}</span>
          </div>

          {/* VS */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '56px', fontWeight: 900, letterSpacing: '0.2em' }}>VS</span>
            <span style={{ color: '#fbbf24', fontSize: '16px', fontWeight: 600 }}>{date}</span>
          </div>

          {/* Away */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            {flagUrl(aFlag) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={flagUrl(aFlag)!} width={120} height={80} style={{ borderRadius: '8px', objectFit: 'cover' }} alt={away} />
            )}
            <span style={{ color: '#ffffff', fontSize: '42px', fontWeight: 900, textTransform: 'uppercase' }}>{away}</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 48px',
          background: 'rgba(255,255,255,0.04)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          <span style={{ color: '#6b7280', fontSize: '18px' }}>Watch FREE in HD — no subscription</span>
          <span style={{
            color: '#fff', fontSize: '18px', fontWeight: 800,
            background: '#7c3aed', padding: '8px 20px', borderRadius: '99px',
          }}>
            SportaLive.live
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
