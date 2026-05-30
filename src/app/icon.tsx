import { ImageResponse } from 'next/og';

export const size = { width: 192, height: 192 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#7c3aed',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '40px',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 110,
            fontWeight: 800,
            fontFamily: 'sans-serif',
            letterSpacing: '-4px',
          }}
        >
          S
        </div>
      </div>
    ),
    { ...size },
  );
}
