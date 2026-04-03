import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import Navbar from '../components/Navbar'
import IntroVideo from '../components/IntroVideo'
import HeroSlider from '../components/HeroSlider'
import ContactBar from '../components/ContactBar'
import BookNowPanel from '../components/BookNowPanel'
import SideForm from '../components/SideForm'
import SiteFooter from '../components/SiteFooter'

const EASE = 'cubic-bezier(0.65, 0.01, 0.05, 0.99)'

function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }

export default function Home() {
  const navigate = useNavigate()
  const [introDone, setIntroDone] = useState(false)
  const [bookNowOpen, setBookNowOpen] = useState(false)
  const { jumpTo, scrollTo } = useSmoothScroll()

  const section1Ref = useRef<HTMLDivElement>(null)
  const section4Ref = useRef<HTMLDivElement>(null)
  const mapPlaceholderRef = useRef<HTMLDivElement>(null)
  const autoPulledRef = useRef(false)
  const autoPulled4Ref = useRef(false)
  const scrollStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [parallaxY, setParallaxY] = useState(0)
  const [scale, setScale] = useState(1)
  const [navInverted, setNavInverted] = useState(false)
  const [section3Progress, setSection3Progress] = useState(0)
  const [section4Progress, setSection4Progress] = useState(0)
  const [section5Progress, setSection5Progress] = useState(0)
  const [mapRect, setMapRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null)


  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const measure = () => {
      if (!mapPlaceholderRef.current) return
      const r = mapPlaceholderRef.current.getBoundingClientRect()
      setMapRect({ top: r.top, left: r.left, width: r.width, height: r.height })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const vh = window.innerHeight

      setParallaxY(-scrolled * 0.35)
      setScale(1 - Math.min(scrolled / vh, 1) * 0.06)
      setNavInverted(scrolled >= vh - 64)

      // Section 3: enters at scrollY = 2vh-64, fully in at 3vh-128
      const s3Start = vh * 2 - 64
      const s3Range = vh - 64
      const newS3 = Math.min(Math.max((scrolled - s3Start) / s3Range, 0), 1)
      setSection3Progress(newS3)

      // Section 4: enters at scrollY = 3vh-128, fully in at 4vh-192
      const s4Start = vh * 3 - 128
      const s4Range = vh - 64
      const newS4 = Math.min(Math.max((scrolled - s4Start) / s4Range, 0), 1)
      setSection4Progress(newS4)

      // Soft magnet at 20%: pull section 4 to exact sticking point (desktop only)
      if (!isMobile && newS4 >= 0.2 && !autoPulled4Ref.current) {
        autoPulled4Ref.current = true
        const target = section4Ref.current
          ? section4Ref.current.offsetTop - 64
          : s4Start + s4Range
        scrollTo(target)
      }
      if (newS4 < 0.05) {
        autoPulled4Ref.current = false
      }

      // Section 5: shifted by one extra vh of dwell so auto-pull on section 4
      // lands at vh*4-192 with a full vh of breathing room before section 5 starts
      const s5Start = vh * 5 - 192
      const s5Range = vh - 64
      const newS5 = Math.min(Math.max((scrolled - s5Start) / s5Range, 0), 1)
      setSection5Progress(newS5)

      // Re-measure placeholder after section 2 sticks
      if (mapPlaceholderRef.current) {
        const r = mapPlaceholderRef.current.getBoundingClientRect()
        setMapRect({ top: r.top, left: r.left, width: r.width, height: r.height })
      }

      // Auto-pull: when map is fully expanded, smooth-scroll to lock section 3 (desktop only)
      if (!isMobile && newS3 >= 0.98 && !autoPulledRef.current) {
        autoPulledRef.current = true
        scrollTo(s3Start + s3Range)
      } else if (newS3 < 0.9) {
        autoPulledRef.current = false
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Wheel-stop snap: uses wheel (real user input) not scroll (also fired by RAF loop)
    const onWheelStop = () => {
      if (!section4Ref.current) return
      const vh = window.innerHeight
      const s4Height = vh - 64
      const stickAt = section4Ref.current.offsetTop - 64
      const absDelta = Math.abs(window.scrollY - stickAt)
      const nearHalf = absDelta > s4Height * (3 / 8) && absDelta < s4Height * (5 / 8)

      // No snap when close to half — let user scroll freely through
      if (nearHalf) return
      if (absDelta < s4Height * (5 / 6)) scrollTo(stickAt)
    }

    const onWheel = () => {
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current)
      if (!section4Ref.current) { scrollStopTimerRef.current = setTimeout(onWheelStop, 90); return }

      const vh = window.innerHeight
      const s4Height = vh - 64
      const stickAt = section4Ref.current.offsetTop - 64
      const absDelta = Math.abs(window.scrollY - stickAt)

      // ≤1/6 visible → snap fast | ~1/2 visible → no snap | ≥1/4 visible → snap slower
      const delay = absDelta > s4Height * (5 / 6) ? 90 : 300
      scrollStopTimerRef.current = setTimeout(onWheelStop, delay)
    }

    if (!isMobile) window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (!isMobile) window.removeEventListener('wheel', onWheel)
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current)
    }
  }, [scrollTo])



  const vw = window.innerWidth
  const vh = window.innerHeight
  const sideFormWidth = navInverted ? 420 : 0
  const targetW = vw - sideFormWidth
  const targetH = (vh - 64) * 0.60
  const src = mapRect ?? { top: vh * 0.7, left: 64, width: vw * 0.35, height: vh * 0.2 }

  // Eased progress for smooth map & section2 animation
  const ep = easeInOut(section3Progress)

  // Section 4 entrance — on mobile always show content (no scroll-driven entrance)
  const section4Entered = section4Progress > 0.05 || isMobile

  // Section 5 uncover — section 4 slides up, section 5 revealed beneath
  const ep5 = easeInOut(section5Progress)
  const section5Active = section5Progress > 0.25    // hide side form/map only when section 4 is 1/4 out of frame
  const section5Entered = section5Progress > 0.5 || isMobile   // trigger section 5 content animations
  const section5Visible = section5Progress > 0.01 || isMobile  // on mobile footer is always in flow

  const animMap = {
    top:    src.top    + ep * (64       - src.top),
    left:   src.left   + ep * (0        - src.left),
    width:  src.width  + ep * (targetW  - src.width),
    height: src.height + ep * (targetH  - src.height),
    radius: 12 * (1 - ep),
  }

  // Section 3's exact viewport top (linear/scroll-driven, no easing)
  const section3ViewportTop = 64 + (1 - section3Progress) * (vh - 64)
  // Gap between map's eased bottom and section 3's linear top
  const mapBottom = animMap.top + animMap.height
  const gapHeight = Math.max(0, section3ViewportTop - mapBottom)

  return (
    <div>
      <Navbar visible={introDone} bare={section5Active} onBookNow={() => setBookNowOpen(true)} onContact={() => navigate('/contact')} onHome={() => scrollTo(0)} onAbout={() => navigate('/about')} onProducts={() => navigate('/products')} onOurWork={() => navigate('/our-work')} inverted={navInverted} />

      {/* Scroll space for section 1 — desktop only */}
      <div style={{ height: isMobile ? 0 : '100vh' }} />

      {/* Section 1 — fixed on desktop, normal flow on mobile */}
      <div style={{
        position: isMobile ? 'relative' : 'fixed',
        top: isMobile ? undefined : 0,
        left: isMobile ? undefined : 0,
        right: isMobile ? undefined : 0,
        height: '100vh',
        zIndex: isMobile ? undefined : 10,
        overflow: 'hidden',
        display: isMobile ? 'flex' : undefined,
        flexDirection: isMobile ? 'column' : undefined,
        transform: isMobile ? undefined : `translateY(${parallaxY}px) scale(${scale})`,
        transformOrigin: isMobile ? undefined : 'center top',
        willChange: isMobile ? undefined : 'transform',
        backgroundColor: '#ffffff',
      }}>
        <ContactBar />
        <div ref={section1Ref} style={{
          paddingBottom: isMobile ? 0 : '4rem',
          flex: isMobile ? 1 : undefined,
          display: isMobile ? 'flex' : undefined,
          flexDirection: isMobile ? 'column' : undefined,
          minHeight: 0,
        }}>
          <HeroSlider />
        </div>
      </div>

      {/* Section 2 — sticky on desktop, normal flow on mobile */}
      <div style={{
        position: isMobile ? 'relative' : 'sticky',
        top: isMobile ? undefined : '64px',
        zIndex: isMobile ? undefined : 20,
        backgroundColor: '#000000',
        height: isMobile ? '100vh' : 'calc(100vh - 64px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: isMobile ? 'column' : undefined,
        alignItems: isMobile ? undefined : 'flex-start',
        padding: isMobile ? '0' : '3rem 0 0 0',
        transform: isMobile ? undefined : `translateY(${-ep * (vh - 64) * 0.08}px) scale(${1 - ep * 0.04})`,
        transformOrigin: isMobile ? undefined : 'center top',
        willChange: isMobile ? undefined : 'transform',
        transition: isMobile ? undefined : 'transform 40ms linear',
      }}>

        {isMobile ? (
          <>
            {/* Mobile: image on top */}
            <div style={{ flex: '0 0 52%', overflow: 'hidden' }}>
              <img
                src="/Spray Painting.png"
                alt="Professional spray painting service"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center', display: 'block' }}
              />
            </div>

            {/* Mobile: title + paragraph below */}
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: '2rem 1.75rem',
            }}>
              <h2 style={{
                fontFamily: "'helvetica-lt-pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 700, fontSize: '2.2rem',
                color: '#ffffff', margin: '0 0 1rem 0',
                lineHeight: 1.05, letterSpacing: '-0.01em',
              }}>
                Professional<br />Services
              </h2>
              <p style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.7)', lineHeight: 1.8,
                margin: 0,
              }}>
                With our ever-growing selection of products, you'll have plenty of options to find the perfect fit for your home. Our success is built on a strong commitment to quality, integrity, and excellence in every project we take on. We strictly follow all codes and regulations, never cutting corners, so you can feel confident in the results.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Desktop: Left column — text + map placeholder */}
            <div style={{
              flex: '0 0 45%', height: 'calc(100vh - 64px - 3rem)',
              display: 'flex', flexDirection: 'column',
              padding: '0 3rem 0 4rem',
            }}>
              <h2 style={{
                fontFamily: "'helvetica-lt-pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 700, fontSize: 'clamp(2.4rem, 3vw + 2vh, 5.5rem)',
                color: '#ffffff', margin: '0 0 clamp(1.5rem, 2vh, 3rem) 0',
                lineHeight: 1.05, letterSpacing: '-0.01em', flexShrink: 0,
              }}>
                Professional<br />Services
              </h2>
              <p style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                fontSize: 'clamp(0.8rem, 0.8vw + 0.5vh, 1.15rem)',
                color: 'rgba(255,255,255,0.7)', lineHeight: 1.8,
                margin: '0 0 2rem 0', maxWidth: '400px', flexShrink: 0,
              }}>
                With our ever-growing selection of products, you'll have plenty of options to find the perfect fit for your home. Our success is built on a strong commitment to quality, integrity, and excellence in every project we take on. We strictly follow all codes and regulations, never cutting corners, so you can feel confident in the results. Explore our range of products and discover what's possible.
              </p>

              {/* Placeholder — floating map sits over this, fades out as it departs */}
              <div
                ref={mapPlaceholderRef}
                style={{
                  flex: 1, minHeight: 0, borderRadius: '12px',
                  backgroundColor: '#111111',
                  opacity: 1 - ep,
                }}
              />
            </div>

            {/* Desktop: Right column — image */}
            <div style={{
              flex: '0 0 55%', position: 'relative',
              height: 'calc(100vh - 64px - 3rem)', overflow: 'hidden',
            }}>
              <img
                src="/Spray Painting.png"
                alt="Professional spray painting service"
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: 'calc(100% + 420px)', height: '100%',
                  objectFit: 'cover', objectPosition: 'right center',
                  transform: navInverted ? 'translateX(-420px)' : 'translateX(0)',
                  transition: 'transform 0.6s cubic-bezier(0.65, 0.01, 0.05, 0.99) 0.24s',
                }}
              />
            </div>
          </>
        )}
      </div>

      {/* Scroll space for section 3 — desktop only */}
      <div style={{ height: isMobile ? 0 : '100vh' }} />

      {/* Section 3 — sticky on desktop, normal flow on mobile */}
      <div style={{
        position: isMobile ? 'relative' : 'sticky',
        top: isMobile ? undefined : '64px',
        zIndex: isMobile ? undefined : 30,
        backgroundColor: '#000000',
        height: isMobile ? '100vh' : 'calc(100vh - 64px)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        {isMobile ? (
          <>
            {/* Mobile: map on top */}
            <div style={{ flex: '0 0 52%', overflow: 'hidden' }}>
              <iframe
                title="A1 Home Remodeling location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.1423680519897!2d-118.38657672382473!3d33.98821012110793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b7571e569193%3A0xd0a1282f2231119c!2s400%20Corporate%20Pointe%20%E2%80%93%20Garage%20%E2%80%93%20ParkChirp!5e1!3m2!1sen!2sph!4v1775188109446!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Mobile: text below */}
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: '2rem 1.75rem', gap: '1rem',
            }}>
              <p style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.75)', lineHeight: 1.8,
                margin: 0, textAlign: 'center',
              }}>
                We see a brighter future in every home by creating clean, sustainable energy that reduces our carbon footprint and leaves a healthier world for generations to come.
              </p>
              <p style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.75)', lineHeight: 1.8,
                margin: 0, textAlign: 'center',
              }}>
                For every service we offer, our experienced professionals handle each project with care, precision, and attention to detail. Share your vision with us, and we will do everything we can to bring it to life.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Desktop: Top zone — floating map lands here */}
            <div style={{ height: '60%', flexShrink: 0 }} />

            {/* Desktop: Text — flush under map, avoids side form */}
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '0 4rem 2rem',
              paddingRight: navInverted ? 'calc(4rem + 420px)' : '4rem',
              gap: '1.25rem',
              transition: 'padding-right 0.6s cubic-bezier(0.65, 0.01, 0.05, 0.99) 0.24s',
            }}>
              <p style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                fontSize: 'clamp(0.85rem, 0.9vw + 0.4vh, 1.1rem)',
                color: 'rgba(255,255,255,0.75)', lineHeight: 1.8,
                margin: 0, textAlign: 'center', maxWidth: '680px',
              }}>
                We see a brighter future in every home by creating clean, sustainable energy that reduces our carbon footprint and leaves a healthier world for generations to come.
              </p>
              <p style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                fontSize: 'clamp(0.85rem, 0.9vw + 0.4vh, 1.1rem)',
                color: 'rgba(255,255,255,0.75)', lineHeight: 1.8,
                margin: 0, textAlign: 'center', maxWidth: '680px',
              }}>
                For every service we offer, our experienced professionals handle each project with care, precision, and attention to detail. Share your vision with us, and we will do everything we can to bring it to life.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Section 4 scroll space — desktop only */}
      <div style={{ height: isMobile ? 0 : '100vh' }} />

      {/* Section 4 — 23 Years of Experience
          Structure (matches reference):
            ┌────────────────────────────────────────────────────┐
            │  text column (40%)  │  Roof Shingles image (60%)  │  ← top row, ~60% of height
            ├─────────────────────┴─────────────────────────────┤
            │              gap (~1.5vh, black)                   │
            ├────────────────────────────────────────────────────┤
            │         Window.jpg full-width banner               │  ← bottom, flex:1
            └────────────────────────────────────────────────────┘
          Window is NOT inside the right column — it spans under both columns. */}
      <div ref={section4Ref} style={{
        position: isMobile ? 'relative' : 'sticky',
        top: isMobile ? undefined : '64px',
        zIndex: isMobile ? undefined : 36,
        backgroundColor: '#252525',
        height: isMobile ? 'auto' : 'calc(100vh - 64px)',
        overflow: isMobile ? 'visible' : 'hidden',
        display: 'flex', flexDirection: 'column',
        transform: isMobile ? undefined : (ep5 > 0 ? `translateY(calc(${-ep5 * 100}% - ${ep5 * 64}px))` : undefined),
        willChange: isMobile ? undefined : 'transform',
      }}>

        {isMobile ? (
          <>
            {/* Mobile: Roof Shingles image with title overlaid */}
            <div style={{ position: 'relative', width: '100%' }}>
              <img
                src="/Roof Shingles.png"
                alt="Roof shingles"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              {/* Dark gradient so text is readable */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.45) 100%)',
              }} />
              {/* Centered title */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '0 1rem',
              }}>
                <div style={{
                  fontFamily: "'helvetica-lt-pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 700, fontSize: '3.5rem',
                  color: '#ffffff', lineHeight: 1.0, letterSpacing: '-0.01em',
                  textAlign: 'center',
                  textShadow: '0 2px 16px rgba(0,0,0,0.5)',
                }}>23 YEARS</div>
                <div style={{
                  fontFamily: "'helvetica-lt-pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 700, fontSize: '2.18rem',
                  color: '#ffffff', lineHeight: 1.05, letterSpacing: '-0.01em',
                  textAlign: 'center',
                  textShadow: '0 2px 16px rgba(0,0,0,0.5)',
                }}>OF EXPERIENCE</div>
              </div>
            </div>

            {/* Mobile: subtitle + paragraph */}
            <div style={{ padding: '2rem 1.75rem' }}>
              <p style={{
                fontFamily: "'helvetica-lt-pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 700, fontSize: '1.1rem',
                color: '#ffffff', lineHeight: 1.3,
                margin: '0 0 1.25rem 0', textAlign: 'center',
              }}>
                Licensed, Bonded, and Insured
              </p>
              <p style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.7)', lineHeight: 1.85,
                margin: 0, textAlign: 'center',
              }}>
                With over two decades of experience, we have built more than just homes, we have built lasting trust with every client we serve. Our commitment to quality, safety, and excellence is reflected in every detail of our work. As a licensed, bonded, and insured company, we provide peace of mind knowing your home is in capable and reliable hands. We take pride in delivering results that stand the test of time.
              </p>
            </div>

            {/* Mobile: Window image at the very bottom, full-width, uncropped */}
            <img
              src="/Window.jpg"
              alt="Window installation"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </>
        ) : (
          /* Desktop: original layout */
          <div style={{
            display: 'flex', flexDirection: 'column',
            width: navInverted ? 'calc(100% - 420px)' : '100%',
            height: '100%',
            overflow: 'hidden',
            transition: `width 0.6s ${EASE} 0.24s`,
          }}>

            {/* ── TOP ROW: text left + Roof Shingles right ── */}
            <div style={{
              flex: '0 0 50%',
              minHeight: 0,
              overflow: 'hidden',
              display: 'flex',
              paddingTop: '3rem',
            }}>

              {/* Left: text column */}
              <div style={{
                flex: 1,
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0 3rem 0 4rem',
              }}>
                <div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{
                      fontFamily: "'helvetica-lt-pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                      fontWeight: 700, fontSize: 'min(5vw, 8.89vh)',
                      color: '#ffffff', lineHeight: 1.05, letterSpacing: '-0.01em',
                      transform: section4Entered ? 'translateY(0) rotate(0deg)' : 'translateY(115%) rotate(4deg)',
                      opacity: section4Entered ? 1 : 0,
                      transition: `transform 1.4s ${EASE} 0ms, opacity 0.9s ease 0ms`,
                      transformOrigin: 'left bottom',
                    }}>23 YEARS</div>
                  </div>
                  <div style={{ overflow: 'hidden', marginBottom: '1.4vh' }}>
                    <div style={{
                      fontFamily: "'helvetica-lt-pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                      fontWeight: 700, fontSize: 'min(3.12vw, 5.54vh)',
                      color: '#ffffff', lineHeight: 1.05, letterSpacing: '-0.01em',
                      transform: section4Entered ? 'translateY(0) rotate(0deg)' : 'translateY(115%) rotate(4deg)',
                      opacity: section4Entered ? 1 : 0,
                      transition: `transform 1.4s ${EASE} 0.1s, opacity 0.9s ease 0.1s`,
                      transformOrigin: 'left bottom',
                    }}>OF EXPERIENCE</div>
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{
                      fontFamily: "'helvetica-lt-pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                      fontWeight: 700, fontSize: 'min(1.53vw, 2.72vh)',
                      color: '#ffffff', lineHeight: 1.3,
                      transform: section4Entered ? 'translateY(0) rotate(0deg)' : 'translateY(115%) rotate(4deg)',
                      opacity: section4Entered ? 1 : 0,
                      transition: `transform 1.4s ${EASE} 0.22s, opacity 0.9s ease 0.22s`,
                      transformOrigin: 'left bottom',
                    }}>Licensed, Bonded, and Insured</div>
                  </div>
                </div>

                <p style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                  fontSize: 'min(0.82vw, 1.46vh)',
                  color: 'rgba(255,255,255,0.7)', lineHeight: 1.85,
                  margin: 0,
                  opacity: section4Entered ? 1 : 0,
                  transform: section4Entered ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.9s ease 0.3s, transform 0.9s ${EASE} 0.3s`,
                }}>
                  With over two decades of experience, we have built more than just homes, we have built lasting trust with every client we serve. Our commitment to quality, safety, and excellence is reflected in every detail of our work. As a licensed, bonded, and insured company, we provide peace of mind knowing your home is in capable and reliable hands. We take pride in delivering results that stand the test of time.
                </p>
              </div>

              {/* Right: Roof Shingles */}
              <div style={{ flex: '0 0 auto', paddingLeft: '2rem', overflow: 'hidden' }}>
                <div style={{ height: '100%', overflow: 'hidden', borderRadius: '6px' }}>
                  <img
                    src="/Roof Shingles.png"
                    alt="Roof shingles"
                    style={{
                      height: '100%', width: 'auto',
                      objectFit: 'contain', display: 'block',
                      transform: section4Entered ? 'translateX(0)' : 'translateX(100px)',
                      opacity: section4Entered ? 1 : 0,
                      transition: `transform 1.0s ${EASE} 0.05s, opacity 0.7s ease 0.05s`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── MIDDLE GAP ── */}
            <div style={{ flexShrink: 0, height: '3rem' }} />

            {/* ── BOTTOM: Window.jpg banner ── */}
            <div style={{ flex: 1, padding: '0 3rem 3rem 0', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <img
                  src="/Window.jpg"
                  alt="Window installation"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center 40%', display: 'block',
                    transform: section4Entered ? 'translateX(0)' : 'translateX(-100px)',
                    opacity: section4Entered ? 1 : 0,
                    transition: `transform 1.0s ${EASE} 0.2s, opacity 0.7s ease 0.2s`,
                  }}
                />
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Section 4 dwell space — desktop only */}
      <div style={{ height: isMobile ? 0 : '100vh' }} />

      {/* Section 5 scroll space — desktop only */}
      <div style={{ height: isMobile ? 0 : '100vh' }} />

      {/* Section 5 — Footer: fixed behind section 4 on desktop, normal flow on mobile */}
      <div style={{
        position: isMobile ? 'relative' : 'fixed',
        top: isMobile ? undefined : 0,
        left: isMobile ? undefined : 0,
        right: isMobile ? undefined : 0,
        zIndex: isMobile ? undefined : 35,
        height: '100vh',
        opacity: section5Visible ? 1 : 0,
        pointerEvents: section5Visible ? 'all' : 'none',
      }}>
        <SiteFooter
          entered={section5Entered}
          onHome={() => scrollTo(0)}
          onAbout={() => navigate('/about')}
          onProducts={() => navigate('/products')}
          onOurWork={() => navigate('/our-work')}
          onContact={() => navigate('/contact')}
          onBookNow={() => setBookNowOpen(true)}
        />
      </div>

      {/* Gap filler — black div that bridges eased map bottom → linear section 3 top */}
      {!isMobile && section3Progress > 0 && gapHeight > 0 && navInverted && !section5Active && (
        <div style={{
          position: 'fixed',
          top: mapBottom,
          left: 0,
          width: targetW,
          height: gapHeight,
          backgroundColor: '#000000',
          zIndex: 25,
          pointerEvents: 'none',
        }} />
      )}

      {/* Single floating map — moves from section 2 corner → section 3 full top */}
      {!isMobile && navInverted && mapRect && !section5Active && (
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=400+Corporate+Pointe,+Culver+City,+CA+90230"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            top: animMap.top, left: animMap.left,
            width: animMap.width, height: animMap.height,
            zIndex: 35, display: 'block',
            borderRadius: animMap.radius,
            overflow: 'hidden', cursor: 'pointer',
          }}
        >
          <iframe
            title="A1 Home Remodeling location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.1423680519897!2d-118.38657672382473!3d33.98821012110793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b7571e569193%3A0xd0a1282f2231119c!2s400%20Corporate%20Pointe%20%E2%80%93%20Garage%20%E2%80%93%20ParkChirp!5e1!3m2!1sen!2sph!4v1775188109446!5m2!1sen!2sph"
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block', pointerEvents: 'none' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </a>
      )}

      <SideForm visible={!isMobile && navInverted && !section5Active} />

      <BookNowPanel open={bookNowOpen} onClose={() => setBookNowOpen(false)} onOpen={() => setBookNowOpen(true)} />

      {!introDone && <IntroVideo onEnd={() => { jumpTo(0); setIntroDone(true) }} />}
    </div>
  )
}
