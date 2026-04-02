import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SiteFooter from '../components/SiteFooter'
import GalleryModal, { type GalleryItem } from '../components/GalleryModal'
import { useState, useEffect, useRef } from 'react'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { HoverSlider, TextStaggerHover, HoverSliderImageWrap, HoverSliderImage } from '../components/HoverSlider'

const SLIDES: { label: string; number: string; img: string; gallery: GalleryItem }[] = [
  { label: 'Weather Defense Exterior Coating', number: '01', img: '/Spray Painting.png', gallery: {
    title: 'Weather Defense Exterior Coating',
    description: 'Moisture-resistant coating that shields your home from UV rays, rain, and harsh weather. Our advanced formula creates a breathable barrier that keeps moisture out while allowing the walls to breathe naturally.',
    images: ['/Spray Painting.png', '/Roof Shingles.png'],
  }},
  { label: 'High Performance Windows', number: '02', img: '/Roof Shingles.png', gallery: {
    title: 'High Performance Windows',
    description: 'Energy Star certified windows that reduce heat gain, cut noise, and slash utility bills. Available in a variety of styles and finishes to complement any architectural design.',
    images: ['/Roof Shingles.png', '/Spray Painting.png'],
  }},
  { label: 'Heat Reflecting Roofing', number: '03', img: '/Spray Painting.png', gallery: {
    title: 'Heat Reflecting Roofing',
    description: "Cool-roof technology that reflects solar heat and holds up against LA's toughest weather. Reduce your cooling costs by up to 30% while extending the life of your roof.",
    images: ['/Spray Painting.png', '/Roof Shingles.png'],
  }},
]

export default function Products() {
  const navigate = useNavigate()
  const { scrollTo } = useSmoothScroll()
  const listRef = useRef<HTMLDivElement>(null)
  const [listOverflow, setListOverflow] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const scrollStopTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [galleryItem, setGalleryItem] = useState<GalleryItem | null>(null)

  useEffect(() => {
    if (!listRef.current) return
    const measure = () => {
      if (!listRef.current) return
      const vh = window.innerHeight
      const listH = listRef.current.scrollHeight
      setListOverflow(Math.max(listH - (vh - 64), 0))
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

  useEffect(() => {
    const onWheel = () => {
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

  const listTranslate = Math.min(scrollY, listOverflow)
  const footerProgress = Math.min(Math.max((scrollY - listOverflow) / window.innerHeight, 0), 1)
  const footerVisible = footerProgress > 0.01
  const footerEntered = footerProgress > 0.5

  return (
    <div style={{ width: '100vw', backgroundColor: '#ffffff', position: 'relative' }}>
      <Navbar
        visible
        inverted={false}
        onHome={() => navigate('/')}
        onAbout={() => navigate('/about')}
        onProducts={() => {}}
        onOurWork={() => navigate('/our-work')}
        onContact={() => navigate('/')}
      />

      {/* Scroll space: list overflow + footer */}
      <div style={{ height: `calc(100vh + ${listOverflow}px + 100vh)` }} />

      {/* Sticky frame */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '100vh',
        zIndex: 10, overflow: 'hidden', backgroundColor: '#ffffff',
        pointerEvents: footerVisible ? 'none' : 'all',
      }}>
        <HoverSlider style={{ display: 'flex', height: '100%' } as React.CSSProperties}>

          {/* Left — scrollable list */}
          <div style={{
            flex: '0 0 50%',
            height: '100%',
            overflow: 'hidden',
            paddingTop: '64px',
          }}>
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
                    onSelect={() => setGalleryItem(slide.gallery)}
                    style={{
                      fontFamily: "'HelveticaLTPro-Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                      fontWeight: 900,
                      fontSize: 'clamp(2rem, 4vw, 5.5rem)',
                      color: '#111',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.15,
                      cursor: 'default',
                    } as React.CSSProperties}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right — sticky image */}
          <div style={{ flex: '0 0 50%', paddingTop: '64px', overflow: 'hidden' }}>
            <HoverSliderImageWrap style={{ width: '100%', height: '100%' }}>
              {SLIDES.map((slide, i) => (
                <HoverSliderImage key={slide.label} index={i} imageUrl={slide.img} />
              ))}
            </HoverSliderImageWrap>
          </div>

        </HoverSlider>
      </div>

      <GalleryModal item={galleryItem} onClose={() => setGalleryItem(null)} />

      {/* Footer */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '100vh', zIndex: 20,
        opacity: footerVisible ? 1 : 0,
        pointerEvents: footerVisible ? 'all' : 'none',
        transform: `translateY(${(1 - Math.min(footerProgress * 2, 1)) * 100}%)`,
        transition: 'opacity 0.3s ease',
      }}>
        <SiteFooter
          entered={footerEntered}
          onHome={() => navigate('/')}
          onAbout={() => navigate('/about')}
          onProducts={() => {}}
          onOurWork={() => navigate('/our-work')}
          onContact={() => scrollTo(listOverflow + window.innerHeight)}
          onBookNow={() => navigate('/')}
        />
      </div>
    </div>
  )
}
