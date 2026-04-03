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
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

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

  /* ── Mobile layout ─────────────────────────────────────────── */
  if (isMobile) {
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
          backgroundColor: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '1.25rem',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: 420,
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.9)',
            display: 'flex',
            flexDirection: 'column',
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'transform 0.42s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Top — image with gradient fade to black at bottom */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', flexShrink: 0 }}>
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Gradient: transparent top → black bottom */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 40%, #000000 100%)',
            }} />
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '0.9rem',
                right: '0.9rem',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: 34,
                height: 34,
                cursor: 'pointer',
                color: '#fff',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(6px)',
              }}
            >✕</button>
          </div>

          {/* Bottom — solid black, text */}
          <div style={{
            backgroundColor: '#000000',
            padding: '1.25rem 1.5rem 1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <h2 style={{
              fontFamily: "'helvetica-lt-pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.6rem, 8vw, 2.2rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              margin: 0,
              textTransform: 'uppercase',
            }}>
              {item.title}
            </h2>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#ffffff',
              margin: 0,
            }}>
              {item.warranty}
            </p>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.75,
              margin: '0.25rem 0 0',
            }}>
              {item.info}
            </p>
          </div>
        </div>
      </div>
    )
  }

  /* ── Desktop layout (unchanged) ────────────────────────────── */
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

        {/* Gradient overlay */}
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

        {/* Two-column text layer */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          display: 'flex',
        }}>
          <div style={{ flex: '0 0 38%' }} />
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(2rem, 5vh, 4rem) clamp(1.5rem, 3vw, 2.5rem)',
          }}>
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
              <div style={{
                height: 2,
                background: '#ffffff',
                borderRadius: 2,
                marginBottom: 'clamp(0.55rem, 1.3vh, 0.9rem)',
                boxShadow: textShadow,
              }} />
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
