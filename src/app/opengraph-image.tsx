import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Stackcess - The operating system for supplement brands, distributors, and retailers'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f5f7fb',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: '80px',
            width: '52px',
            height: '52px',
            borderRadius: '12px',
            background: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1,
            }}
          >
            S
          </span>
        </div>

        <div
          style={{
            position: 'absolute',
            top: '88px',
            left: '148px',
            fontSize: '22px',
            fontWeight: 600,
            color: '#0f172a',
            letterSpacing: '-0.02em',
          }}
        >
          Stackcess
        </div>

        <div
          style={{
            fontSize: '64px',
            fontWeight: 600,
            color: '#0f172a',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: '900px',
            marginBottom: '24px',
          }}
        >
          The operating system for supplement brands.
        </div>

        <div
          style={{
            fontSize: '26px',
            color: '#475569',
            lineHeight: 1.4,
            maxWidth: '720px',
          }}
        >
          PIM - DAM - Partner sharing - Regulatory docs - Localization
        </div>
      </div>
    ),
    { ...size }
  )
}
