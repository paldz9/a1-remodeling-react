import { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react'

const FONT = "'Poppins', sans-serif"
const EASE = 'cubic-bezier(0.65, 0.01, 0.05, 0.99)'
const BUDGET_OPTIONS = [
  'Under $5,000', '$5,000 – $15,000', '$15,000 – $30,000',
  '$30,000 – $60,000', '$60,000+', 'Not sure yet',
]

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'transparent', border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.3)',
  color: '#ffffff', fontFamily: FONT, fontWeight: 300, fontSize: '0.8rem',
  padding: '0.4rem 0', outline: 'none', transition: 'border-color 0.2s',
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <input type={type} placeholder={label} style={inputStyle}
      onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.9)')}
      onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.3)')}
    />
  )
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <select defaultValue="" style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none', color: 'rgba(255,255,255,0.5)' }}
      onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.9)')}
      onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.3)')}
      onChange={e => (e.currentTarget.style.color = '#ffffff')}
    >
      <option value="" disabled style={{ background: '#1a1a1a', color: 'rgba(255,255,255,0.5)' }}>{label}</option>
      {options.map(o => <option key={o} value={o} style={{ background: '#1a1a1a', color: '#fff' }}>{o}</option>)}
    </select>
  )
}

function TextareaField({ label }: { label: string }) {
  return (
    <textarea placeholder={label} rows={2} style={{ ...inputStyle, resize: 'none', width: '100%' }}
      onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.9)')}
      onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.3)')}
    />
  )
}

function SlideRow({
  children, delay, visible, style,
}: {
  children: React.ReactNode
  delay: number
  visible: boolean
  style?: React.CSSProperties
}) {
  return (
    <div style={{ overflow: 'hidden', ...style }}>
      <div style={{
        transform: visible ? 'translateY(0) rotate(0deg)' : 'translateY(120%) rotate(8deg)',
        transition: `transform 0.65s ${EASE} ${delay}ms`,
        transformOrigin: 'left bottom',
      }}>
        {children}
      </div>
    </div>
  )
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const LABEL = 'Book Now'
function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
function easeOut(t: number) { return 1 - Math.pow(1 - t, 3) }

function SideBookButton({ visible, formId }: { visible: boolean; formId: string }) {
  const [text, setText] = useState(LABEL)
  const btnRef = useRef<HTMLButtonElement>(null)
  const scrambleRef = useRef<number | null>(null)
  const animRef = useRef<number | null>(null)
  const radiusRef = useRef(8)
  const startRef = useRef(0)

  const animateTo = useCallback((target: number, duration: number, easing: (t: number) => number) => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    const start = radiusRef.current
    const startTime = performance.now()
    const run = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      radiusRef.current = start + (target - start) * easing(progress)
      if (btnRef.current) btnRef.current.style.borderRadius = `${radiusRef.current}px`
      if (progress < 1) animRef.current = requestAnimationFrame(run)
    }
    animRef.current = requestAnimationFrame(run)
  }, [])

  const scramble = useCallback(() => {
    const duration = 600
    const animate = (now: number) => {
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const resolved = Math.floor(progress * LABEL.length)
      setText(LABEL.split('').map((ch, i) => {
        if (ch === ' ') return ' '
        if (i < resolved) return ch
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join(''))
      if (progress < 1) scrambleRef.current = requestAnimationFrame(animate)
      else setText(LABEL)
    }
    if (scrambleRef.current) cancelAnimationFrame(scrambleRef.current)
    startRef.current = performance.now()
    scrambleRef.current = requestAnimationFrame(animate)
  }, [])

  return (
    <SlideRow delay={400} visible={visible}>
      <button ref={btnRef} type="submit" form={formId}
        onMouseEnter={() => {
          scramble()
          const maxR = btnRef.current ? Math.ceil(btnRef.current.offsetHeight / 2) : 20
          animateTo(maxR, 900, easeInOut)
          if (btnRef.current) { btnRef.current.style.backgroundColor = '#ebebeb'; btnRef.current.style.transform = 'translateY(-1px)' }
        }}
        onMouseLeave={() => {
          setText(LABEL)
          if (scrambleRef.current) cancelAnimationFrame(scrambleRef.current)
          animateTo(8, 1800, easeOut)
          if (btnRef.current) { btnRef.current.style.backgroundColor = '#ffffff'; btnRef.current.style.transform = 'translateY(0)' }
        }}
        style={{
          width: '100%', padding: '0.75rem',
          backgroundColor: '#ffffff', color: '#111111',
          fontFamily: 'monospace', fontWeight: 600, fontSize: '0.9rem',
          border: 'none', borderRadius: '8px', cursor: 'pointer',
          letterSpacing: '0.02em',
          transition: 'background-color 0.2s ease, transform 0.15s ease',
        }}
      >{text}</button>
    </SlideRow>
  )
}

interface Props { visible: boolean }

export default function SideForm({ visible }: Props) {
  const [contentIn, setContentIn] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  const grayRef    = useRef<HTMLDivElement>(null)
  const whiteRef   = useRef<HTMLDivElement>(null)
  const blackRef   = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollRef  = useRef<HTMLDivElement>(null)
  const outerRef   = useRef<HTMLDivElement>(null)

  // Capture-phase wheel handler on the outer wrapper — fires before useSmoothScroll's
  // bubble-phase window listener, guaranteed. stopPropagation kills the event there.
  useEffect(() => {
    const outer = outerRef.current
    const scroller = scrollRef.current
    if (!outer || !scroller) return
    const onWheel = (e: WheelEvent) => {
      const delta = e.deltaMode === 1 ? e.deltaY * 40 : e.deltaMode === 2 ? e.deltaY * 400 : e.deltaY

      const atTop    = scroller.scrollTop <= 0
      const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1
      const goingUp  = delta < 0
      const goingDown = delta > 0

      const canScroll = (goingUp && !atTop) || (goingDown && !atBottom)

      if (canScroll) {
        e.stopPropagation()
        e.preventDefault()
        scroller.scrollTop += delta
      }
    }
    outer.addEventListener('wheel', onWheel, { passive: false, capture: true })
    return () => outer.removeEventListener('wheel', onWheel, { capture: true })
  }, [])

  // Set initial off-screen position before first paint so React never overwrites it
  useLayoutEffect(() => {
    ;[grayRef, whiteRef, blackRef, contentRef].forEach(r => {
      if (r.current) r.current.style.transform = 'translateX(101%)'
    })
  }, [])

  useEffect(() => {
    let raf1: number, raf2: number
    let t1: ReturnType<typeof setTimeout>

    if (visible) {
      setContentVisible(true)

      // Force all panels + content to off-screen start position with no transition
      ;[grayRef, whiteRef, blackRef, contentRef].forEach(r => {
        if (!r.current) return
        r.current.style.transition = 'none'
        r.current.style.transform = 'translateX(101%)'
      })

      // Double-RAF: first frame commits the off-screen state,
      // second fires the transition so the browser animates from 101% → 0
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          if (grayRef.current) {
            grayRef.current.style.transition = `transform 0.6s ${EASE} 0s`
            grayRef.current.style.transform = 'translateX(0)'
          }
          if (whiteRef.current) {
            whiteRef.current.style.transition = `transform 0.6s ${EASE} 0.12s`
            whiteRef.current.style.transform = 'translateX(0)'
          }
          if (blackRef.current) {
            blackRef.current.style.transition = `transform 0.6s ${EASE} 0.24s`
            blackRef.current.style.transform = 'translateX(0)'
          }
          if (contentRef.current) {
            contentRef.current.style.transition = `transform 0.6s ${EASE} 0.24s`
            contentRef.current.style.transform = 'translateX(0)'
          }
        })
      })

      // Reveal form content slightly before panels fully land
      t1 = setTimeout(() => setContentIn(true), 650)
    } else {
      // Exit: slide content out together with the black panel
      if (contentRef.current) {
        contentRef.current.style.transition = `transform 0.5s ${EASE} 0s`
        contentRef.current.style.transform = 'translateX(101%)'
      }
      if (blackRef.current) {
        blackRef.current.style.transition = `transform 0.5s ${EASE} 0s`
        blackRef.current.style.transform = 'translateX(101%)'
      }
      if (whiteRef.current) {
        whiteRef.current.style.transition = `transform 0.5s ${EASE} 0.1s`
        whiteRef.current.style.transform = 'translateX(101%)'
      }
      if (grayRef.current) {
        grayRef.current.style.transition = `transform 0.5s ${EASE} 0.2s`
        grayRef.current.style.transform = 'translateX(101%)'
      }

      // After everything is off-screen, reset state
      t1 = setTimeout(() => {
        setContentIn(false)
        setContentVisible(false)
      }, 750)
    }

    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      clearTimeout(t1)
    }
  }, [visible])

  // No transform here — set imperatively via useLayoutEffect/useEffect only
  const panelBase: React.CSSProperties = {
    position: 'absolute', top: 0, right: 0,
    width: '100%', height: '100%',
  }
  // Black panel and content are 2px narrower on the left,
  // leaving the white panel's edge visible as a divider line
  const innerPanelBase: React.CSSProperties = {
    position: 'absolute', top: 0, right: 0, left: '2px', height: '100%',
  }

  return (
    <div ref={outerRef} data-scroll-independent style={{
      position: 'fixed',
      top: '64px', right: 0,
      height: 'calc(100vh - 64px)',
      width: '420px',
      zIndex: 40,
      pointerEvents: visible ? 'all' : 'none',
      overflow: 'hidden',
    }}>
      <div ref={grayRef}  style={{ ...panelBase, backgroundColor: '#888888', zIndex: 1 }} />
      <div ref={whiteRef} style={{ ...panelBase, backgroundColor: '#ffffff',  zIndex: 2 }} />
      <div ref={blackRef} style={{ ...innerPanelBase, backgroundColor: '#1a1a1a', zIndex: 3 }} />

      <div ref={contentRef} style={{
        ...innerPanelBase,
        zIndex: 4,
        display: 'flex', flexDirection: 'column',
        visibility: contentVisible ? 'visible' : 'hidden',
        backgroundColor: '#000000',
      }}>
        {/* Scrollable area: heading + video + form fields */}
        <div
          ref={scrollRef}
          data-inner-scroll
          className="sideform-scroll"
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            scrollbarWidth: 'none',
            padding: '1.5rem 1.5rem 0',
          }}
        >
          {/* Heading */}
          <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
            <h2 style={{
              fontFamily: FONT, fontWeight: 700, fontSize: '1.5rem',
              color: '#ffffff', margin: 0, lineHeight: 1.3,
              transform: contentIn ? 'translateY(0) rotate(0deg)' : 'translateY(120%) rotate(8deg)',
              transition: `transform 0.65s ${EASE} 0ms`,
              transformOrigin: 'left bottom',
            }}>
              Let's bring your<br />home to life.
            </h2>
          </div>

          {/* Video — 1:1 card, no crop */}
          <SlideRow delay={40} visible={contentIn} style={{ marginBottom: '1rem' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '1 / 1', backgroundColor: '#000', width: '100%' }}>
              <video autoPlay muted loop playsInline
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                src="/form-welcome.mp4"
              />
            </div>
          </SlideRow>

          {/* Form fields */}
          <form id="sideform" onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column' }}>

            <SlideRow delay={0} visible={contentIn} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <Field label="First Name*" type="text" />
                <Field label="Last Name*" type="text" />
              </div>
            </SlideRow>

            <SlideRow delay={80} visible={contentIn} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <Field label="Email*" type="email" />
                <Field label="Phone*" type="tel" />
              </div>
            </SlideRow>

            <SlideRow delay={160} visible={contentIn} style={{ marginBottom: '0.85rem' }}>
              <Field label="Address*" type="text" />
            </SlideRow>

            <SlideRow delay={240} visible={contentIn} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <Field label="Zip/Postal Code*" type="text" />
                <SelectField label="Budget Range" options={BUDGET_OPTIONS} />
              </div>
            </SlideRow>

            <SlideRow delay={320} visible={contentIn} style={{ marginBottom: '0.85rem' }}>
              <TextareaField label="Messages /Notes*" />
            </SlideRow>

          </form>
        </div>

        {/* Sticky bottom: button + disclaimer, always visible above scroll */}
        <div style={{ flexShrink: 0, padding: '0.75rem 1.5rem 1.5rem' }}>
          <SideBookButton visible={contentIn} formId="sideform" />
          <SlideRow delay={480} visible={contentIn}>
            <p style={{
              fontFamily: FONT, fontWeight: 300, fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.4)', textAlign: 'right',
              marginTop: '0.5rem', marginBottom: 0,
            }}>
              Please expect a call after filling out this form.
            </p>
          </SlideRow>
        </div>
      </div>
    </div>
  )
}
