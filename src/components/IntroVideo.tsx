import { useState, useRef, useEffect } from 'react'

interface Props {
  onEnd: () => void
}

const PHASE1_PORTRAIT = 2 + 5  / 30  // 2:05 — portrait hold end
const PHASE1_WIDE     = 2 + 15 / 30  // 2:15 — wide screen hold end
const PHASE2_END      = 3.0          // 3:00 — fully at original by here

export default function IntroVideo({ onEnd }: Props) {
  const [fading, setFading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef  = useRef<number>(0)

  function dismiss() {
    setFading(true)
    setTimeout(onEnd, 700)
  }

  // Lock scroll during intro
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const v = video  // non-null alias for use inside nested functions
    const remPx     = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const topOffset = 4.75 * remPx // 4rem navbar + 0.75rem gap

    function animate() {
      if (!v.duration || v.videoWidth === 0) {
        v.style.transform = 'none'
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      const aspectRatio          = v.videoWidth / v.videoHeight
      const availableHeight      = window.innerHeight - topOffset
      const videoHeightFullWidth = window.innerWidth / aspectRatio
      const isWide               = videoHeightFullWidth > availableHeight
      const t                    = v.currentTime

      if (isWide) {
        const fittedScale = availableHeight / videoHeightFullWidth
        v.style.transformOrigin = 'top center'

        if (t <= PHASE1_WIDE) {
          v.style.transform = `scale(${fittedScale})`
        } else if (t >= PHASE2_END) {
          v.style.transform = 'none'
        } else {
          const progress = (t - PHASE1_WIDE) / (PHASE2_END - PHASE1_WIDE)
          const scale    = fittedScale + (1 - fittedScale) * progress
          v.style.transform = `scale(${scale})`
        }
      } else {
        const centerOffset = (window.innerHeight - videoHeightFullWidth) / 2 - topOffset
        v.style.transformOrigin = 'top center'

        if (t <= PHASE1_PORTRAIT) {
          v.style.transform = `translateY(${centerOffset}px)`
        } else if (t >= PHASE2_END) {
          v.style.transform = 'none'
        } else {
          const progress = (t - PHASE1_PORTRAIT) / (PHASE2_END - PHASE1_PORTRAIT)
          v.style.transform = `translateY(${centerOffset * (1 - progress)}px)`
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#fff',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.7s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      {/* Clips video at the navbar bottom and viewport bottom */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(4rem + 0.75rem)',
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onEnded={dismiss}
          onError={dismiss}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <source src={window.innerWidth < 768 ? '/Intro_Mobile.mp4' : '/Intro_title_2.mp4'} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
