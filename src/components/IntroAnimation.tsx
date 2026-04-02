import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const FONT: React.CSSProperties = {
  fontFamily: "'HelveticaNeue-CondensedBlack', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontWeight: 900,
  fontSize: 'clamp(2.5rem, 8vw, 6rem)',
  letterSpacing: '0.05em',
  lineHeight: 1,
  color: '#111',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  margin: 0,
  position: 'absolute',
}

function startScramble(
  target: string,
  onUpdate: (s: string) => void,
  durationMs: number,
): () => void {
  const steps = 18
  const intervalMs = durationMs / steps
  let step = 0
  const id = setInterval(() => {
    step++
    let nonSpaceCount = 0
    const lockedNonSpace = Math.floor(
      (step / steps) * target.replace(/ /g, '').length,
    )
    onUpdate(
      target
        .split('')
        .map(ch => {
          if (ch === ' ') return ' '
          if (nonSpaceCount++ < lockedNonSpace) return ch
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join(''),
    )
    if (step >= steps) {
      clearInterval(id)
      onUpdate(target)
    }
  }, intervalMs)
  return () => clearInterval(id)
}

interface Props {
  onEnd: () => void
}

export default function IntroAnimation({ onEnd }: Props) {
  const [text, setText] = useState<string | null>(null)
  const [enableTransition, setEnableTransition] = useState(false)
  const [scale, setScale] = useState(7)
  const [blurPx, setBlurPx] = useState(30)
  const [atHero, setAtHero] = useState(false)
  const [overlayOpacity, setOverlayOpacity] = useState(1)
  const stopScramble = useRef<(() => void) | null>(null)
  const mounted = useRef(true)

  useEffect(() => {
    return () => {
      mounted.current = false
    }
  }, [])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    const T = (ms: number, fn: () => void) => {
      timers.push(setTimeout(fn, ms))
    }

    function enter(target: string, scrambleDuration: number) {
      stopScramble.current?.()
      // Jump immediately: huge scale, blurred, scrambled chars
      setEnableTransition(false)
      setScale(7)
      setBlurPx(30)
      setText(
        target
          .split('')
          .map(ch =>
            ch === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(''),
      )
      // One tick later: enable transition and animate to normal scale
      setTimeout(() => {
        if (!mounted.current) return
        setEnableTransition(true)
        setScale(1)
        setBlurPx(0)
        stopScramble.current = startScramble(target, setText, scrambleDuration)
      }, 30)
    }

    // Phase 1 — "A1" enters huge, scrambles, lands
    T(100, () => enter('A1', 500))

    // Phase 2 — "A1 HOME" enters
    T(1050, () => enter('A1 HOME', 520))

    // Phase 3 — Full title enters
    T(2000, () => enter('A1 HOME REMODELING INC', 650))

    // Phase 4 — Slide to hero position
    T(3300, () => {
      setEnableTransition(true)
      setAtHero(true)
    })

    // Phase 5 — Fade white overlay out
    T(3900, () => setOverlayOpacity(0))

    // Done
    T(4500, () => onEnd())

    return () => {
      timers.forEach(clearTimeout)
      stopScramble.current?.()
    }
  }, [onEnd])

  const centered = !atHero
  const transform = centered
    ? `translate(-50%, -50%) scale(${scale})`
    : 'none'
  const transition = enableTransition
    ? [
        'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        'filter 0.7s cubic-bezier(0.16,1,0.3,1)',
        'top 0.65s cubic-bezier(0.16,1,0.3,1)',
        'left 0.65s cubic-bezier(0.16,1,0.3,1)',
      ].join(', ')
    : 'none'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#fff',
        opacity: overlayOpacity,
        transition: 'opacity 0.6s ease',
        pointerEvents: 'none',
      }}
    >
      {text !== null && (
        <h1
          style={{
            ...FONT,
            top: centered ? '50%' : '104px',
            left: centered ? '50%' : '32px',
            transform,
            filter: `blur(${blurPx}px)`,
            transition,
          }}
        >
          {text}
        </h1>
      )}
    </div>
  )
}
