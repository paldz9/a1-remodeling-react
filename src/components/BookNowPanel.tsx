import { useEffect, useState, useRef, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const LABEL = 'Book Now'

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function useRadiusAnimation(ref: React.RefObject<HTMLButtonElement | HTMLAnchorElement | null>) {
  const radiusRef = useRef(8)
  const animRef = useRef<number | null>(null)

  const animateTo = useCallback((target: number, duration: number, easing: (t: number) => number) => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    const start = radiusRef.current
    const startTime = performance.now()
    const run = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      radiusRef.current = start + (target - start) * easing(progress)
      const el = ref.current as HTMLElement | null
      if (el) el.style.borderRadius = `${radiusRef.current}px`
      if (progress < 1) animRef.current = requestAnimationFrame(run)
    }
    animRef.current = requestAnimationFrame(run)
  }, [ref])

  return { animateTo, easeInOut, easeOut }
}

function BookNowButton() {
  const [text, setText] = useState(LABEL)
  const btnRef = useRef<HTMLButtonElement>(null)
  const scrambleRef = useRef<number | null>(null)
  const startRef = useRef<number>(0)
  const { animateTo, easeInOut, easeOut } = useRadiusAnimation(btnRef)

  const scramble = useCallback(() => {
    const duration = 600
    const animate = (now: number) => {
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const resolved = Math.floor(progress * LABEL.length)
      const scrambled = LABEL.split('').map((ch, i) => {
        if (ch === ' ') return ' '
        if (i < resolved) return ch
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join('')
      setText(scrambled)
      if (progress < 1) scrambleRef.current = requestAnimationFrame(animate)
      else setText(LABEL)
    }
    if (scrambleRef.current) cancelAnimationFrame(scrambleRef.current)
    startRef.current = performance.now()
    scrambleRef.current = requestAnimationFrame(animate)
  }, [])

  return (
    <button
      ref={btnRef}
      type="submit"
      onMouseEnter={() => {
        scramble()
        const maxR = btnRef.current ? Math.ceil(btnRef.current.offsetHeight / 2) : 26
        animateTo(maxR, 900, easeInOut)
        const el = btnRef.current
        if (el) { el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)'; el.style.transform = 'translateY(-1px)' }
      }}
      onMouseLeave={() => {
        setText(LABEL)
        if (scrambleRef.current) cancelAnimationFrame(scrambleRef.current)
        animateTo(8, 1800, easeOut)
        const el = btnRef.current
        if (el) { el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }
      }}
      style={{
        width: '100%', padding: '1rem',
        backgroundColor: '#ffffff', color: '#111111',
        fontFamily: "'Poppins', monospace", fontWeight: 600, fontSize: '1rem',
        border: 'none', cursor: 'pointer',
        letterSpacing: '0.02em',
        borderRadius: '8px',
        transition: 'box-shadow 0.2s ease, transform 0.15s ease',
      }}
    >
      {text}
    </button>
  )
}

interface Props {
  open: boolean
  onClose: () => void
}

const BUDGET_OPTIONS = [
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $30,000',
  '$30,000 – $60,000',
  '$60,000+',
  'Not sure yet',
]

const FONT = "'Poppins', sans-serif"

export default function BookNowPanel({ open, onClose }: Props) {
  const [visible, setVisible] = useState(false)
  const [contentIn, setContentIn] = useState(false)

  useEffect(() => {
    if (open) {
      setVisible(true)
      const t = setTimeout(() => setContentIn(true), 60)
      return () => clearTimeout(t)
    } else {
      setContentIn(false)
      const t = setTimeout(() => setVisible(false), 700)
      return () => clearTimeout(t)
    }
  }, [open])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100, overflow: 'hidden',
        transform: contentIn ? 'translateY(0)' : 'translateY(100%)',
        transition: contentIn
          ? 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)'
          : 'transform 0.6s cubic-bezier(0.55, 0, 1, 0.45)',
      }}
    >
      {/* Background video */}
      <video
        autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        src="/welcome background.mp4"
      />

      {/* Dim */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', zIndex: 1 }} />

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '260px', zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.97))',
      }} />

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '1.5rem', right: '2rem', zIndex: 10,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.5)', fontSize: '1.4rem', lineHeight: 1, padding: '0.25rem',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
        aria-label="Close"
      >✕</button>

      {/* Page content */}
      <div
        style={{
          position: 'relative', zIndex: 3, height: '100%',
          display: 'flex', flexDirection: 'column',
          padding: '3.5rem 5% 2rem 5%',
          opacity: contentIn ? 1 : 0,
          transform: contentIn ? 'translateY(0)' : 'translateY(36px)',
          transition: 'opacity 0.55s ease 0.2s, transform 0.55s ease 0.2s',
          overflowY: 'auto',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.75rem' }}>
          <h2 style={{
            fontFamily: FONT, fontWeight: 700,
            fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)',
            color: '#ffffff', margin: 0, lineHeight: 1.2,
          }}>
            Let's bring your home to life.
          </h2>
          <p style={{
            fontFamily: FONT, fontWeight: 300,
            fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)',
            maxWidth: '360px', textAlign: 'right', lineHeight: 1.75, margin: 0,
          }}>
            Your home transformation begins with a conversation. Start by filling out the form and telling us about your ideas, your needs, and your vision.
          </p>
        </div>

        {/* Main: form + video side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'stretch', flex: 1 }}>

          {/* Form */}
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

            <Row>
              <Field label="First Name*" type="text" />
              <Field label="Last Name*" type="text" />
            </Row>

            <Row>
              <Field label="Email*" type="email" />
              <Field label="Phone*" type="tel" />
            </Row>

            {/* Address — full width */}
            <div style={{ marginBottom: '2.25rem' }}>
              <Field label="Address*" type="text" />
            </div>

            <Row>
              <Field label="Zip/Postal Code*" type="text" />
              <SelectField label="Budget Range" options={BUDGET_OPTIONS} />
            </Row>

            <div style={{ marginBottom: '2.75rem' }}>
              <TextareaField label="Messages /Notes*" />
            </div>

            <div style={{ marginTop: 'auto' }}>
              <BookNowButton />
            </div>
          </form>

          {/* Video — fixed height, only vertical crop */}
          <div style={{
            borderRadius: '14px', overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            height: '480px',
          }}>
            <video
              autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'center center' }}
              src="/form-welcome.mp4"
            />
          </div>
        </div>

        <p style={{
          fontFamily: FONT, fontWeight: 300,
          fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)',
          textAlign: 'right', marginTop: '0.75rem', marginBottom: 0,
        }}>
          Please expect a call after filling out this form.
        </p>
      </div>
    </div>
  )
}

// ── Layout helpers ───────────────────────────────────────────────────────────

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '3rem',
      marginBottom: '2.25rem',
    }}>
      {children}
    </div>
  )
}

// ── Field components ─────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'transparent', border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.35)',
  color: '#ffffff', fontFamily: "'Poppins', sans-serif",
  fontWeight: 300, fontSize: '0.875rem',
  padding: '0.5rem 0', outline: 'none',
  transition: 'border-color 0.2s',
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <input
      type={type}
      placeholder={label}
      style={inputStyle}
      onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.9)')}
      onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.35)')}
    />
  )
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <select
      defaultValue=""
      style={{
        ...inputStyle,
        color: 'rgba(255,255,255,0.5)',
        cursor: 'pointer',
        appearance: 'none', WebkitAppearance: 'none',
      }}
      onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.9)')}
      onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.35)')}
      onChange={e => (e.currentTarget.style.color = '#ffffff')}
    >
      <option value="" disabled style={{ background: '#1a1a1a', color: 'rgba(255,255,255,0.5)' }}>{label}</option>
      {options.map(o => <option key={o} value={o} style={{ background: '#1a1a1a', color: '#ffffff' }}>{o}</option>)}
    </select>
  )
}

function TextareaField({ label }: { label: string }) {
  return (
    <textarea
      placeholder={label}
      rows={3}
      style={{
        ...inputStyle,
        resize: 'none',
        width: '100%',
      }}
      onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.9)')}
      onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.35)')}
    />
  )
}
