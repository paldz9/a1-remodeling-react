import { useState, useEffect } from 'react'

export interface ProductItem {
  title: string
  warranty: string   // from warranty.txt
  info: string       // from info.txt
  image: string      // background image path
}

interface Props {
  item: ProductItem | null
  onClose: () => void
}

export default function ProductModal({ item, onClose }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => setVisible(true))
    } else {
      setVisible(false)
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [item])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!item) return null

  const textShadow = '0 2px 20px rgba(0,0,0,1), 0 1px 6px rgba(0,0,0,0.9)'

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: 'clamp(1rem, 3vw, 2.5rem)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.35s ease',
      }}
    >
      {/* Modal card */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'min(900px, 92vw)',
          height: 'min(680px, 85vh)',
          borderRadius: '22px',
          overflow: 'hidden',
          boxShadow: '0 40px 120px rgba(0,0,0,0.85)',
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(20px)',
          transition: 'transform 0.42s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Full-bleed background image */}
        <img
          src={item.image}
          alt={item.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Gradient overlay: light at top-center, heavy at bottom */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.20) 35%, rgba(0,0,0,0.65) 65%, rgba(0,0,0,0.93) 100%)',
        }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            zIndex: 10,
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: '50%',
            width: 38,
            height: 38,
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.75)',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(6px)',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.6)'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.35)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
          }}
        >✕</button>

        {/* ── Two-column text layer (image/gradient untouched behind) ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          display: 'flex',
        }}>
          {/* Left column — intentionally blank */}
          <div style={{ flex: '0 0 38%' }} />

          {/* Right column — all text */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(2rem, 5vh, 4rem) clamp(1.5rem, 3vw, 2.5rem)',
          }}>
            {/* Title block — top */}
            <div>
              <h2 style={{
                fontFamily: "'helvetica-lt-pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 3.8vw, 3.6rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                margin: '0 0 clamp(0.75rem, 1.8vh, 1.3rem) 0',
                textShadow,
              }}>
                {item.title}
              </h2>

              {/* Underline */}
              <div style={{
                height: 2,
                background: '#ffffff',
                borderRadius: 2,
                marginBottom: 'clamp(0.55rem, 1.3vh, 0.9rem)',
                boxShadow: textShadow,
              }} />

              {/* Warranty subtitle */}
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(0.65rem, 0.95vw, 0.85rem)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#ffffff',
                margin: 0,
                textShadow,
              }}>
                {item.warranty}
              </p>
            </div>

            {/* Info — bottom */}
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(0.78rem, 1vw, 0.92rem)',
              color: 'rgba(255,255,255,0.88)',
              lineHeight: 1.85,
              margin: 0,
              textShadow: '0 1px 10px rgba(0,0,0,1)',
            }}>
              {item.info}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
