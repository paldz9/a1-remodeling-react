import { useState, useEffect, useRef } from 'react'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import Navbar from '../components/Navbar'
import IntroVideo from '../components/IntroVideo'
import HeroSlider from '../components/HeroSlider'
import ContactBar from '../components/ContactBar'
import BookNowPanel from '../components/BookNowPanel'
import SideForm from '../components/SideForm'

function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }

export default function Home() {
  const [introDone, setIntroDone] = useState(false)
  const [bookNowOpen, setBookNowOpen] = useState(false)
  const { jumpTo, scrollTo } = useSmoothScroll()

  const section1Ref = useRef<HTMLDivElement>(null)
  const mapPlaceholderRef = useRef<HTMLDivElement>(null)
  const autoPulledRef = useRef(false)

  const [parallaxY, setParallaxY] = useState(0)
  const [scale, setScale] = useState(1)
  const [navInverted, setNavInverted] = useState(false)
  const [section3Progress, setSection3Progress] = useState(0)
  const [mapRect, setMapRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null)

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

      // Re-measure placeholder after section 2 sticks
      if (mapPlaceholderRef.current) {
        const r = mapPlaceholderRef.current.getBoundingClientRect()
        setMapRect({ top: r.top, left: r.left, width: r.width, height: r.height })
      }

      // Auto-pull: when map is fully expanded, smooth-scroll to lock section 3
      if (newS3 >= 0.98 && !autoPulledRef.current) {
        autoPulledRef.current = true
        scrollTo(s3Start + s3Range)
      } else if (newS3 < 0.9) {
        autoPulledRef.current = false
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollTo])

  const vw = window.innerWidth
  const vh = window.innerHeight
  const sideFormWidth = navInverted ? 420 : 0
  const targetW = vw - sideFormWidth
  const targetH = (vh - 64) * 0.60
  const src = mapRect ?? { top: vh * 0.7, left: 64, width: vw * 0.35, height: vh * 0.2 }

  // Eased progress for smooth map & section2 animation
  const ep = easeInOut(section3Progress)

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
      <Navbar visible={introDone} onBookNow={() => setBookNowOpen(true)} inverted={navInverted} />

      {/* Scroll space for section 1 */}
      <div style={{ height: '100vh' }} />

      {/* Section 1 — fixed, parallax */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '100vh',
        zIndex: 10, overflow: 'hidden',
        transform: `translateY(${parallaxY}px) scale(${scale})`,
        transformOrigin: 'center top', willChange: 'transform',
        backgroundColor: '#ffffff',
      }}>
        <ContactBar />
        <div ref={section1Ref} style={{ paddingBottom: '4rem' }}>
          <HeroSlider />
        </div>
      </div>

      {/* Section 2 — pulls back as section 3 slides over, with easing */}
      <div style={{
        position: 'sticky', top: '64px', zIndex: 20,
        backgroundColor: '#000000', height: 'calc(100vh - 64px)',
        overflow: 'hidden', display: 'flex', alignItems: 'flex-start',
        padding: '3rem 0 0 0',
        transform: `translateY(${-ep * (vh - 64) * 0.08}px) scale(${1 - ep * 0.04})`,
        transformOrigin: 'center top', willChange: 'transform',
        transition: 'transform 40ms linear',
      }}>
        {/* Left: text + map placeholder */}
        <div style={{
          flex: '0 0 45%', height: 'calc(100vh - 64px - 3rem)',
          display: 'flex', flexDirection: 'column',
          padding: '0 3rem 0 4rem',
        }}>
          <h2 style={{
            fontFamily: "'HelveticaLTPro-Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
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

        {/* Right: image */}
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
      </div>

      {/* Scroll space for section 3 */}
      <div style={{ height: '100vh' }} />

      {/* Section 3 */}
      <div style={{
        position: 'sticky', top: '64px', zIndex: 30,
        backgroundColor: '#000000', height: 'calc(100vh - 64px)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        {/* Top zone — floating map lands here */}
        <div style={{ height: '60%', flexShrink: 0 }} />

        {/* Text — flush under map, avoids side form */}
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
      </div>

      {/* Gap filler — black div that bridges eased map bottom → linear section 3 top */}
      {section3Progress > 0 && gapHeight > 0 && navInverted && (
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
      {navInverted && mapRect && (
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
            src="https://maps.google.com/maps?q=400+Corporate+Pointe,+Culver+City,+CA+90230&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block', pointerEvents: 'none' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </a>
      )}

      <SideForm visible={navInverted} />

      <BookNowPanel open={bookNowOpen} onClose={() => setBookNowOpen(false)} />

      {!introDone && <IntroVideo onEnd={() => { jumpTo(0); setIntroDone(true) }} />}
    </div>
  )
}
