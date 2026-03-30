import { useState, useEffect, useRef } from 'react'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import Navbar from '../components/Navbar'
import IntroVideo from '../components/IntroVideo'
import HeroSlider from '../components/HeroSlider'
import ContactBar from '../components/ContactBar'
import BookNowPanel from '../components/BookNowPanel'

export default function Home() {
  const [introDone, setIntroDone] = useState(false)
  const [bookNowOpen, setBookNowOpen] = useState(false)
  useSmoothScroll()

  const section1Ref = useRef<HTMLDivElement>(null)
  const [parallaxY, setParallaxY] = useState(0)
  const [scale, setScale] = useState(1)
  const [navInverted, setNavInverted] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const vh = window.innerHeight

      // Parallax: section 1 moves up at 35% of scroll speed — feels "pulled back"
      const py = -scrolled * 0.35
      setParallaxY(py)

      // Scale down as section 2 covers it
      const progress = Math.min(scrolled / vh, 1)
      setScale(1 - progress * 0.06)

      // Invert navbar when section 2 reaches it
      setNavInverted(scrolled >= vh - 64)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div>
      <Navbar visible={introDone} onBookNow={() => setBookNowOpen(true)} inverted={navInverted} />

      {/* Scroll space placeholder for section 1 */}
      <div style={{ height: '100vh' }} />

      {/* Section 1 — fixed, parallax pull effect */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          zIndex: 10,
          overflow: 'hidden',
          transform: `translateY(${parallaxY}px) scale(${scale})`,
          transformOrigin: 'center top',
          willChange: 'transform',
          backgroundColor: '#ffffff',
        }}
      >
        <ContactBar />
        <div ref={section1Ref} style={{ paddingBottom: '4rem' }}>
          <HeroSlider />
        </div>
      </div>

      {/* Section 2 — slides over section 1 */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          backgroundColor: '#000000',
          minHeight: '100vh',
          borderRadius: '16px 16px 0 0',
        }}
      />

      <BookNowPanel open={bookNowOpen} onClose={() => setBookNowOpen(false)} />

      {!introDone && <IntroVideo onEnd={() => setIntroDone(true)} />}
    </div>
  )
}
