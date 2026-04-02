import { useEffect } from 'react'

interface Props {
  onEnd: () => void
}

// These values must exactly match the h1 in HeroSlider
const TITLE_STYLE: React.CSSProperties = {
  fontFamily: "'HelveticaNeue-CondensedBlack', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontWeight: 900,
  fontSize: 'clamp(2.5rem, 8vw, 6rem)',
  letterSpacing: '0.05em',
  lineHeight: 1,
  color: '#111',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  margin: 0,
}

export default function TitleReveal({ onEnd }: Props) {
  useEffect(() => {
    const t = setTimeout(onEnd, 2200)
    return () => clearTimeout(t)
  }, [onEnd])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        background: '#fff',
        pointerEvents: 'none',
      }}
    >
      {/* Title placed at exact position it occupies on the main page */}
      <h1
        style={{
          ...TITLE_STYLE,
          position: 'absolute',
          top: '104px',   // 64px navbar + 40px section padding
          left: '32px',
          transformOrigin: 'left center',
          animation: 'title-zoom 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        A1 Home Remodeling Inc
      </h1>

      <style>{`
        @keyframes title-zoom {
          0%   { transform: scale(0.12); filter: blur(28px); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: scale(1);    filter: blur(0px);  opacity: 1; }
        }
      `}</style>
    </div>
  )
}
