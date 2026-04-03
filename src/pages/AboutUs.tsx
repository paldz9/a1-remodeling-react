import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SiteFooter from '../components/SiteFooter'
import BookNowPanel from '../components/BookNowPanel'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

export default function AboutUs() {
  const navigate = useNavigate()
  const { scrollTo } = useSmoothScroll()
  const [footerProgress, setFooterProgress] = useState(0)
  const scrollStopTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const [bookNowOpen, setBookNowOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [footerInView, setFooterInView] = useState(false)

  useEffect(() => {
    if (!footerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    setFooterProgress(0)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const vh = window.innerHeight
      const start = vh * 0.7
      const range = vh * 0.5
      setFooterProgress(Math.min(Math.max((scrolled - start) / range, 0), 1))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Snap on wheel stop — desktop only
  useEffect(() => {
    const onWheel = () => {
      if (window.innerWidth < 768) return
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current)
      scrollStopTimer.current = setTimeout(() => {
        const vh = window.innerHeight
        if (footerProgress > 0.1 && footerProgress < 0.9) {
          scrollTo(footerProgress < 0.5 ? 0 : vh * 1.2)
        }
      }, 90)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current)
    }
  }, [footerProgress, scrollTo])

  const footerEntered = isMobile || footerProgress > 0.5
  const footerVisible = isMobile || footerProgress > 0.01

  return (
    <div style={{ width: '100vw', backgroundColor: '#ffffff', position: 'relative' }}>
      <Navbar
        visible
        bare={!isMobile && footerVisible}
        inverted={false}
        onBookNow={() => setBookNowOpen(true)}
        onHome={() => navigate('/')}
        onAbout={() => window.scrollTo(0, 0)}
        onProducts={() => navigate('/products')}
        onOurWork={() => navigate('/our-work')}
        onContact={() => navigate('/contact')}
      />
      <BookNowPanel open={bookNowOpen} onClose={() => setBookNowOpen(false)} onOpen={() => setBookNowOpen(true)} hideButton={isMobile && footerInView} />

      {/* Main layout */}
      <div style={{
        position: isMobile ? 'relative' : 'sticky',
        top: 0,
        width: '100%',
        height: isMobile ? 'auto' : '100vh',
        minHeight: isMobile ? '100vh' : undefined,
        display: 'flex',
        flexDirection: isMobile ? 'column' : undefined,
        paddingTop: isMobile ? 0 : '64px',
        zIndex: isMobile ? undefined : 10,
        backgroundColor: '#ffffff',
      }}>

        {isMobile ? (
          <>
            {/* Mobile: video on top, full-width */}
            <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', flexShrink: 0 }}>
              <video
                src="/A1-video.mp4"
                autoPlay muted loop playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
              />
            </div>

            {/* Mobile: title + paragraphs below, left-aligned */}
            <div style={{ padding: '2rem 1.75rem 2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.25rem' }}>
              <h1 style={{
                fontFamily: "'helvetica-lt-pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 900,
                fontSize: '4.5rem',
                color: '#111111',
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                margin: 0,
                textAlign: 'left',
              }}>
                About<br />Us.
              </h1>
              <p style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                fontSize: '0.95rem',
                color: '#444444', lineHeight: 1.8, margin: 0,
                textAlign: 'left',
              }}>
                We see a brighter future in every home by creating clean, sustainable energy that reduces our carbon footprint and leaves a healthier world for generations to come.
              </p>
              <p style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                fontSize: '0.95rem',
                color: '#444444', lineHeight: 1.8, margin: 0,
                textAlign: 'left',
              }}>
                For every service we offer, our experienced professionals handle each project with care, precision, and attention to detail. Share your vision with us, and we will do everything we can to bring it to life.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Desktop LEFT: "About Us." + paragraphs */}
            <div style={{
              flex: '0 0 43%',
              display: 'flex', flexDirection: 'column',
              padding: '0 3vw 0 7vw',
              overflow: 'hidden',
            }}>
              <h1 style={{
                fontFamily: "'helvetica-lt-pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(3.5rem, 7.5vw, 9rem)',
                color: '#111111',
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                marginTop: 'min(4vh, 2.5rem)',
                marginBottom: 0,
                flexShrink: 0,
              }}>
                About Us.
              </h1>

              <div style={{ flex: 1 }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'min(3.5vh, 2.2rem)', marginBottom: 'min(7vh, 4.5rem)' }}>
                <p style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                  fontSize: 'clamp(0.8rem, 0.85vw + 0.3vh, 1rem)',
                  color: '#444444', lineHeight: 1.8, margin: 0,
                  maxWidth: '420px',
                }}>
                  We see a brighter future in every home by creating clean, sustainable energy that reduces our carbon footprint and leaves a healthier world for generations to come.
                </p>
                <p style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                  fontSize: 'clamp(0.8rem, 0.85vw + 0.3vh, 1rem)',
                  color: '#444444', lineHeight: 1.8, margin: 0,
                  maxWidth: '420px',
                }}>
                  For every service we offer, our experienced professionals handle each project with care, precision, and attention to detail. Share your vision with us, and we will do everything we can to bring it to life.
                </p>
              </div>
            </div>

            {/* Desktop RIGHT: Video + "23 YEARS OF EXPERIENCE" */}
            <div style={{ flex: '0 0 57%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ flex: '0 0 55%', position: 'relative', overflow: 'hidden' }}>
                <video
                  src="/A1-video.mp4"
                  autoPlay muted loop playsInline
                  style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center center',
                  }}
                />
              </div>
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                justifyContent: 'center', padding: '0 4vw 0 2vw', overflow: 'hidden',
              }}>
                <div style={{
                  fontFamily: "'helvetica-lt-pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 900, color: '#111111',
                  letterSpacing: '-0.02em', lineHeight: 0.88,
                }}>
                  <div style={{ fontSize: 'min(10vw, 18vh)', whiteSpace: 'nowrap' }}>23 YEARS</div>
                  <div style={{ fontSize: 'min(5.8vw, 10.5vh)', whiteSpace: 'nowrap' }}>OF EXPERIENCE</div>
                </div>
              </div>
            </div>
          </>
        )}

      </div>

      {/* Scroll space — desktop only */}
      <div style={{ height: isMobile ? 0 : '100vh' }} />

      {/* Footer */}
      <div ref={footerRef} style={{
        position: isMobile ? 'relative' : 'fixed',
        top: isMobile ? undefined : 0,
        left: isMobile ? undefined : 0,
        right: isMobile ? undefined : 0,
        height: isMobile ? 'auto' : '100vh',
        minHeight: isMobile ? '100vh' : undefined,
        backgroundColor: isMobile ? '#000000' : undefined,
        zIndex: isMobile ? undefined : 20,
        opacity: footerVisible ? 1 : 0,
        pointerEvents: footerVisible ? 'all' : 'none',
        transform: isMobile ? undefined : `translateY(${(1 - Math.min(footerProgress * 2, 1)) * 100}%)`,
        transition: isMobile ? undefined : 'opacity 0.3s ease',
      }}>
        <SiteFooter
          entered={footerEntered}
          onHome={() => navigate('/')}
          onAbout={() => window.scrollTo(0, 0)}
          onProducts={() => navigate('/products')}
          onOurWork={() => navigate('/our-work')}
          onContact={() => navigate('/contact')}
          onBookNow={() => navigate('/')}
        />
      </div>
    </div>
  )
}
