import { useState, useEffect, useRef, useCallback } from 'react'

export interface GalleryItem {
  title: string
  description: string
  images: string[]
}

interface Props {
  item: GalleryItem | null
  onClose: () => void
}

// Per-slot visual config
const SLOT = {
  '-2': { scale: 0.74, blur: 16, opacity: 0.38 },
  '-1': { scale: 0.87, blur: 7,  opacity: 0.62 },
   '0': { scale: 1.00, blur: 0,  opacity: 1.00 },
   '1': { scale: 0.87, blur: 7,  opacity: 0.62 },
   '2': { scale: 0.74, blur: 16, opacity: 0.38 },
} as const

type SlotKey = keyof typeof SLOT

export default function GalleryModal({ item, onClose }: Props) {
  const [activeImg, setActiveImg] = useState(0)
  const [visible, setVisible] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  // Spacing: vertical distance from center image center to slot ±1 center (px)
  const [spacing, setSpacing] = useState(340)

  // Open / close + body scroll lock
  useEffect(() => {
    if (item) {
      setActiveImg(0)
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => setVisible(true))
    } else {
      setVisible(false)
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [item])

  // Measure spacing so slot ±1 peeks ~22% from the panel edge
  const measure = useCallback(() => {
    const el = panelRef.current
    if (!el) return
    const { height, width } = el.getBoundingClientRect()
    if (height === 0 || width === 0) return
    // Image frame at 80% panel width, 4:3 aspect ratio
    const imgH = width * 0.80 * 0.75
    const displayedH1 = imgH * SLOT['1'].scale
    // S1 positions slot ±1 so (22% of displayedH1) peeks from the panel edge:
    // visible = panelH/2 - S1 + displayedH1/2 = 0.22 * displayedH1
    // → S1 = panelH/2 + displayedH1/2 - 0.22*displayedH1
    const S1 = height / 2 + displayedH1 / 2 - 0.22 * displayedH1
    setSpacing(Math.max(S1, 180))
  }, [])

  useEffect(() => {
    if (!visible) return
    // Delay so the DOM is sized before measuring
    const t = setTimeout(measure, 60)
    const ro = new ResizeObserver(measure)
    if (panelRef.current) ro.observe(panelRef.current)
    return () => { clearTimeout(t); ro.disconnect() }
  }, [visible, measure])

  // Wheel scroll on image panel
  useEffect(() => {
    if (!visible || !item) return
    const el = panelRef.current
    if (!el) return
    const total = item.images.length
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setActiveImg(i => e.deltaY > 0 ? Math.min(total - 1, i + 1) : Math.max(0, i - 1))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [visible, item])

  // Keyboard: Escape + arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowUp') setActiveImg(i => Math.max(0, i - 1))
      if (e.key === 'ArrowDown' && item)
        setActiveImg(i => Math.min(item.images.length - 1, i + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, item])

  if (!item) return null

  const SLOTS = [-2, -1, 0, 1, 2] as const

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(0,0,0,0.52)',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 2.5vw, 2rem)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.35s ease',
      }}
    >
      {/* ── Modal card ─────────────────────────────────────────── */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex',
          width: 'min(1180px, 95vw)',
          height: 'min(760px, 88vh)',
          borderRadius: '24px',
          overflow: 'hidden',
          // Glass card
          background: 'rgba(14,14,14,0.68)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow:
            '0 48px 140px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.07)',
          transform: visible
            ? 'translateY(0) scale(1)'
            : 'translateY(28px) scale(0.97)',
          transition: 'transform 0.42s cubic-bezier(0.16,1,0.3,1)',
        }}
      >

        {/* ── LEFT: vertical image filmstrip ──────────────────── */}
        <div
          ref={panelRef}
          style={{
            flex: '0 0 46%',
            position: 'relative',
            overflow: 'hidden',
            cursor: item.images.length > 1 ? 'ns-resize' : 'default',
            // Subtle inner-left glass highlight
            borderRight: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {SLOTS.map(dist => {
            const imgIdx = activeImg + dist
            if (imgIdx < 0 || imgIdx >= item.images.length) return null

            const meta = SLOT[String(dist) as SlotKey]
            // Slot ±2 gets a slightly larger multiplier so it peeks past slot ±1
            const distanceMult = Math.abs(dist) === 2 ? 1.06 : 1
            const yOffset = dist === 0 ? 0 : dist * spacing * distanceMult

            return (
              <div
                key={imgIdx}
                onClick={dist !== 0 ? () => setActiveImg(imgIdx) : undefined}
                style={{
                  position: 'absolute',
                  left: '10%',
                  right: '10%',
                  top: '50%',
                  aspectRatio: '4 / 3',
                  borderRadius: dist === 0 ? 18 : 14,
                  overflow: 'hidden',
                  /* Combined transform: center element at top:50%, then shift */
                  transform: `translateY(calc(-50% + ${yOffset}px)) scale(${meta.scale})`,
                  filter: `blur(${meta.blur}px)`,
                  opacity: meta.opacity,
                  transition: [
                    'transform 0.52s cubic-bezier(0.16,1,0.3,1)',
                    'opacity 0.45s ease',
                    'filter 0.45s ease',
                  ].join(', '),
                  zIndex: 10 - Math.abs(dist) * 2,
                  cursor: dist !== 0 ? 'pointer' : 'default',
                  boxShadow:
                    dist === 0
                      ? '0 24px 72px rgba(0,0,0,0.75), 0 4px 20px rgba(0,0,0,0.5)'
                      : 'none',
                  willChange: 'transform, filter, opacity',
                }}
              >
                <img
                  src={item.images[imgIdx]}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            )
          })}

          {/* Scroll hint dots (right edge) */}
          {item.images.length > 1 && (
            <div style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              zIndex: 20,
            }}>
              {item.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{
                    width: i === activeImg ? 8 : 5,
                    height: i === activeImg ? 8 : 5,
                    borderRadius: '50%',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    backgroundColor: i === activeImg
                      ? 'rgba(255,255,255,0.9)'
                      : 'rgba(255,255,255,0.28)',
                    transition: 'all 0.25s ease',
                    alignSelf: 'center',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: glass text panel ──────────────────────────── */}
        <div style={{
          flex: 1,
          padding: 'clamp(2rem, 4vw, 3.5rem)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          position: 'relative',
          color: '#fff',
          // Slightly different glass tint from card bg
          background: 'rgba(0,0,0,0.18)',
        }}>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '50%',
              width: 36,
              height: 36,
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.65)',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
            }}
          >✕</button>

          {/* Image counter */}
          {item.images.length > 1 && (
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.28)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              margin: '0 0 1.5rem 0',
            }}>
              {String(activeImg + 1).padStart(2, '0')}&ensp;/&ensp;
              {String(item.images.length).padStart(2, '0')}
            </p>
          )}

          {/* Title */}
          <h2 style={{
            fontFamily:
              "'helvetica-lt-pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
            lineHeight: 1.06,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            margin: '0 0 clamp(1rem, 2.5vh, 1.75rem) 0',
            paddingRight: '2.5rem',
          }}>
            {item.title}
          </h2>

          {/* Accent line */}
          <div style={{
            width: 36,
            height: 2,
            background: 'rgba(255,255,255,0.22)',
            borderRadius: 2,
            marginBottom: 'clamp(1rem, 2.5vh, 1.75rem)',
            flexShrink: 0,
          }} />

          {/* Description */}
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(0.85rem, 1.05vw, 0.98rem)',
            color: 'rgba(255,255,255,0.58)',
            lineHeight: 1.88,
            margin: 0,
          }}>
            {item.description}
          </p>

          {/* Scroll hint */}
          {item.images.length > 1 && (
            <div style={{
              marginTop: 'auto',
              paddingTop: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'rgba(255,255,255,0.2)',
              fontSize: '0.72rem',
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: '0.07em',
              userSelect: 'none',
            }}>
              <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                <path d="M6 1v14M1 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Scroll to browse
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
