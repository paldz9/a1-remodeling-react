import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SiteFooter from '../components/SiteFooter'
import ProductModal, { type ProductItem } from '../components/ProductModal'
import BookNowPanel from '../components/BookNowPanel'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { HoverSlider, TextStaggerHover, HoverSliderImageWrap, HoverSliderImage, MobileScrambleTitle } from '../components/HoverSlider'

const SLIDES: { label: string; number: string; img: string; product: ProductItem }[] = [
  {
    label: 'Weather Defense Exterior Coating',
    number: '01',
    img: '/products/WEATHER DEFENSE EXTERIOR COATING/WEATHER DEFENSE EXTERIOR COATING.png',
    product: {
      title: 'Weather Defense Exterior Coating',
      warranty: 'Lifetime Warrantied',
      info: 'A protective layer that shields your home from sun, rain, and time. Built to resist moisture and harsh elements, it keeps your home looking strong, clean, and beautiful year after year.',
      image: '/products/WEATHER DEFENSE EXTERIOR COATING/WEATHER DEFENSE EXTERIOR COATING.png',
    },
  },
  {
    label: 'High Performance Windows',
    number: '02',
    img: '/products/HIGH PERFORMANCE WINDOWS/HIGH PERFORMANCE WINDOWS.png',
    product: {
      title: 'High Performance Windows',
      warranty: 'Lifetime Warrantied',
      info: 'Designed for comfort and efficiency, these windows keep the heat out, the cool air in, and the noise at bay. A smarter way to brighten your home while lowering energy costs.',
      image: '/products/HIGH PERFORMANCE WINDOWS/HIGH PERFORMANCE WINDOWS.png',
    },
  },
  {
    label: 'Heat Reflecting Roofing',
    number: '03',
    img: '/products/HEAT REFLECTING ROOFING/HEAT REFLECTING ROOFING.png',
    product: {
      title: 'Heat Reflecting Roofing',
      warranty: '30 Years Warrantied',
      info: 'Engineered to reflect the sun and endure extreme conditions, this roofing system keeps your home cooler and protected. Strength, efficiency, and peace of mind, all from the top down.',
      image: '/products/HEAT REFLECTING ROOFING/HEAT REFLECTING ROOFING.png',
    },
  },
]

export default function Products() {
  const navigate = useNavigate()
  const { scrollTo } = useSmoothScroll()
  const listRef = useRef<HTMLDivElement>(null)
  const [listOverflow, setListOverflow] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const scrollStopTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const [productItem, setProductItem] = useState<ProductItem | null>(null)
  const [bookNowOpen, setBookNowOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [footerInView, setFooterInView] = useState(false)
  const [activeMobileIdx, setActiveMobileIdx] = useState(0)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) setActiveMobileIdx(i => Math.min(i + 1, SLIDES.length - 1))
      else setActiveMobileIdx(i => Math.max(i - 1, 0))
    }
  }

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
    setScrollY(0)
  }, [])

  useEffect(() => {
    if (!listRef.current) return
    const measure = () => {
      if (!listRef.current) return
      const listH = listRef.current.scrollHeight
      setListOverflow(Math.max(listH - (window.innerHeight - 64), 0))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(listRef.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Wheel-stop snap — desktop only
  useEffect(() => {
    const onWheel = () => {
      if (window.innerWidth < 768) return
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current)
      scrollStopTimer.current = setTimeout(() => {
        const footerStart = listOverflow
        const footerEnd = listOverflow + window.innerHeight
        const s = window.scrollY
        if (s > footerStart && s < footerEnd) {
          scrollTo(s < (footerStart + footerEnd) / 2 ? footerStart : footerEnd)
        }
      }, 90)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current)
    }
  }, [listOverflow, scrollTo])

  const listTranslate = isMobile ? 0 : Math.min(scrollY, listOverflow)
  const footerProgress = isMobile ? 1 : Math.min(Math.max((scrollY - listOverflow) / window.innerHeight, 0), 1)
  const footerVisible = isMobile || footerProgress > 0.01
  const footerEntered = isMobile || footerProgress > 0.5

  return (
    <div style={{ width: '100vw', backgroundColor: '#ffffff', position: 'relative' }}>
      <Navbar
        visible
        bare={!isMobile && footerVisible}
        inverted={false}
        onBookNow={() => setBookNowOpen(true)}
        onHome={() => navigate('/')}
        onAbout={() => navigate('/about')}
        onProducts={() => window.scrollTo(0, 0)}
        onOurWork={() => navigate('/our-work')}
        onContact={() => navigate('/contact')}
      />
      <BookNowPanel open={bookNowOpen} onClose={() => setBookNowOpen(false)} onOpen={() => setBookNowOpen(true)} hideButton={isMobile && footerInView} />

      {/* Scroll space — desktop only */}
      <div style={{ height: isMobile ? 0 : `calc(100vh + ${listOverflow}px + 100vh)` }} />

      {/* Main frame */}
      <div style={{
        position: isMobile ? 'relative' : 'fixed',
        top: isMobile ? undefined : 0,
        left: isMobile ? undefined : 0,
        right: isMobile ? undefined : 0,
        height: isMobile ? 'auto' : '100vh',
        minHeight: isMobile ? '100vh' : undefined,
        zIndex: isMobile ? undefined : 10,
        overflow: isMobile ? 'visible' : 'hidden',
        backgroundColor: '#ffffff',
        pointerEvents: (!isMobile && footerVisible) ? 'none' : 'all',
      }}>

        {isMobile ? (
          <div
            style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '64px', backgroundColor: '#ffffff' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Label + counter */}
            <div style={{ padding: '1.5rem 6% 0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '0.7rem', color: '#999', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>Products</p>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: '0.7rem', color: '#aaa', margin: 0 }}>
                {String(activeMobileIdx + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
              </p>
            </div>

            {/* Sliding row */}
            <div style={{ width: '100%', overflow: 'hidden', flexShrink: 0 }}>
              <div style={{
                display: 'flex',
                transform: `translateX(${-activeMobileIdx * 100}%)`,
                transition: 'transform 0.42s cubic-bezier(0.33, 1, 0.68, 1)',
                willChange: 'transform',
              }}>
                {SLIDES.map((slide, i) => (
                  <div key={i} style={{ minWidth: '100%', flexShrink: 0 }}>
                    {/* Image */}
                    <div
                      style={{ width: '100%', aspectRatio: '4/3', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                      onClick={() => setProductItem(slide.product)}
                    >
                      <img
                        src={slide.img}
                        alt={slide.label}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <div style={{ position: 'absolute', bottom: '1rem', left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
                        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '0.78rem', color: '#fff', textDecoration: 'underline', letterSpacing: '0.05em', textShadow: '0 1px 6px rgba(0,0,0,0.55)' }}>
                          Tap to show details
                        </span>
                      </div>
                    </div>

                    {/* Title with scramble */}
                    <div style={{ padding: '1.25rem 6% 2rem', cursor: 'pointer' }} onClick={() => setProductItem(slide.product)}>
                      <MobileScrambleTitle
                        text={slide.label}
                        isActive={i === activeMobileIdx}
                        style={{
                          fontFamily: "'helvetica-lt-pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                          fontWeight: 900,
                          fontSize: 'clamp(2.8rem, 13vw, 5rem)',
                          letterSpacing: '-0.02em',
                          lineHeight: 1.05,
                          overflowWrap: 'break-word',
                          textTransform: 'uppercase',
                          margin: 0,
                        } as React.CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Swipe dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', paddingBottom: '2rem', flexShrink: 0 }}>
              {SLIDES.map((_, i) => (
                <div key={i} style={{ width: i === activeMobileIdx ? '1.5rem' : '0.4rem', height: '0.4rem', borderRadius: '9999px', backgroundColor: i === activeMobileIdx ? '#111' : '#ccc', transition: 'width 0.3s ease, background-color 0.3s ease' }} />
              ))}
            </div>
          </div>
        ) : (
          <HoverSlider style={{ display: 'flex', height: '100%' } as React.CSSProperties}>

            {/* Left — list */}
            <div style={{ flex: '0 0 50%', height: '100%', overflow: 'hidden', paddingTop: '64px' }}>
              <div
                ref={listRef}
                style={{
                  display: 'flex', flexDirection: 'column',
                  padding: '2vh 4vw 4vh 7vw',
                  transform: `translateY(${-listTranslate}px)`,
                  willChange: 'transform',
                }}
              >
                <p style={{
                  fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                  fontSize: 'clamp(0.7rem, 0.8vw, 0.9rem)',
                  color: '#999', letterSpacing: '0.15em', textTransform: 'uppercase',
                  marginBottom: 'min(3vh, 2rem)', flexShrink: 0,
                }}>Products</p>

                {SLIDES.map((slide, i) => (
                  <div key={slide.label} style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', flexShrink: 0 }}>
                    <span style={{
                      fontFamily: "'Poppins', sans-serif", fontWeight: 300,
                      fontSize: 'clamp(0.7rem, 0.8vw, 0.85rem)',
                      color: '#aaa', width: '2rem', flexShrink: 0,
                    }}>{slide.number}</span>
                    <TextStaggerHover
                      text={slide.label}
                      index={i}
                      onSelect={() => setProductItem(slide.product)}
                      style={{
                        fontFamily: "'helvetica-lt-pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                        fontWeight: 900,
                        fontSize: 'clamp(2rem, 4vw, 5.5rem)',
                        color: '#111',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.15,
                        cursor: 'pointer',
                        flex: '1 1 0%',
                        minWidth: 0,
                      } as React.CSSProperties}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image */}
            <div style={{ flex: '0 0 50%', paddingTop: '64px', overflow: 'hidden' }}>
              <HoverSliderImageWrap style={{ width: '100%', height: '100%' }}>
                {SLIDES.map((slide, i) => (
                  <HoverSliderImage key={slide.label} index={i} imageUrl={slide.img} />
                ))}
              </HoverSliderImageWrap>
            </div>

          </HoverSlider>
        )}

      </div>

      <ProductModal item={productItem} onClose={() => setProductItem(null)} />

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
          onAbout={() => navigate('/about')}
          onProducts={() => window.scrollTo(0, 0)}
          onOurWork={() => navigate('/our-work')}
          onContact={() => navigate('/contact')}
          onBookNow={() => navigate('/')}
        />
      </div>
    </div>
  )
}
