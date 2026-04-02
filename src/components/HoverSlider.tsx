import React, { useCallback, useLayoutEffect, useRef, useState } from "react"
import { type HTMLMotionProps, motion } from "motion/react"
import { cn } from "@/lib/utils"

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

interface TextStaggerHoverProps {
  text: string
  index: number
  onSelect?: () => void
}

interface HoverSliderImageProps {
  index: number
  imageUrl?: string
}

interface HoverSliderContextValue {
  activeSlide: number
  changeSlide: (index: number) => void
}

function splitText(text: string) {
  const words = text.split(" ")
  return { words }
}

const HoverSliderContext = React.createContext<HoverSliderContextValue | undefined>(undefined)

function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext)
  if (!context) throw new Error("useHoverSliderContext must be used within HoverSlider")
  return context
}

export const HoverSlider = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ children, className, ...props }, _ref) => {
    const [activeSlide, setActiveSlide] = React.useState<number>(0)
    const changeSlide = React.useCallback((index: number) => setActiveSlide(index), [])
    return (
      <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
        <div className={className} {...props}>{children}</div>
      </HoverSliderContext.Provider>
    )
  }
)
HoverSlider.displayName = "HoverSlider"

export const TextStaggerHover = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & TextStaggerHoverProps>(
  ({ text, index, onSelect, className, ...props }, _ref) => {
    const { activeSlide, changeSlide } = useHoverSliderContext()
    const isActive = activeSlide === index
    const upper = text.toUpperCase()
    const [chars, setChars] = useState<{ ch: string; resolved: boolean }[]>(
      upper.split('').map(ch => ({ ch, resolved: index === 0 }))
    )
    const rafRef = useRef<number | null>(null)
    const startRef = useRef<number>(0)
    const wasActive = useRef(index === 0)
    const containerRef = useRef<HTMLSpanElement>(null)
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([])

    const scramble = useCallback(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      startRef.current = performance.now()
      const duration = 900
      const animate = (now: number) => {
        const progress = Math.min((now - startRef.current) / duration, 1)
        const resolved = Math.floor(progress * upper.length)
        setChars(upper.split('').map((ch, i) => {
          if (ch === ' ') return { ch: ' ', resolved: true }
          if (i < resolved) return { ch, resolved: true }
          return { ch: CHARS[Math.floor(Math.random() * CHARS.length)], resolved: false }
        }))
        if (progress < 1) rafRef.current = requestAnimationFrame(animate)
        else setChars(upper.split('').map(ch => ({ ch, resolved: true })))
      }
      rafRef.current = requestAnimationFrame(animate)
    }, [upper])

    React.useEffect(() => {
      if (isActive && !wasActive.current) scramble()
      if (!isActive) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        setChars(upper.split('').map(ch => ({ ch, resolved: false })))
      }
      wasActive.current = isActive
    }, [isActive, scramble, upper])

    const { words: originalWords } = splitText(text)

    // Per-word scale-to-fit: shrink only words that overflow the container
    useLayoutEffect(() => {
      const container = containerRef.current
      if (!container) return

      const applyScales = () => {
        // Reset all transforms first so we get unscaled measurements
        wordRefs.current.forEach(el => {
          if (el) el.style.transform = ''
        })
        // Now read the constrained container width (requires flex:1 on the element)
        const maxWidth = container.offsetWidth
        if (maxWidth === 0) return
        wordRefs.current.forEach(el => {
          if (!el) return
          el.style.transformOrigin = 'left center'
          const natural = el.scrollWidth
          if (natural > maxWidth) {
            el.style.transform = `scaleX(${maxWidth / natural})`
          }
        })
      }

      applyScales()
      const ro = new ResizeObserver(applyScales)
      ro.observe(container)
      // Re-check once fonts finish loading (web fonts render wider)
      document.fonts.ready.then(applyScales)
      return () => ro.disconnect()
    }, [text])

    // Rebuild per-word char arrays from flat chars (skipping spaces)
    let charIdx = 0

    // Reset word refs each render so the array stays in sync with word count
    wordRefs.current = []

    return (
      <span
        ref={containerRef}
        className={cn("relative origin-bottom", className)}
        onMouseEnter={() => changeSlide(index)}
        onClick={onSelect}
        style={{ display: 'block', cursor: onSelect ? 'pointer' : 'default', overflow: 'visible' }}
        {...props}
      >
        {originalWords.map((word, wi) => {
          const wordChars = chars.slice(charIdx, charIdx + word.length)
          charIdx += word.length + 1 // +1 for space
          return (
            <React.Fragment key={`word-${wi}`}>
              <span
                ref={el => { wordRefs.current[wi] = el }}
                style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
              >
                {wordChars.map((c, ci) => (
                  <span key={ci} style={{ color: c.resolved ? '#111111' : '#bbbbbb', transition: 'color 0.2s ease' }}>
                    {c.ch}
                  </span>
                ))}
              </span>
              {wi < originalWords.length - 1 && <span style={{ color: '#bbbbbb' }}>&nbsp;</span>}
            </React.Fragment>
          )
        })}
      </span>
    )
  }
)
TextStaggerHover.displayName = "TextStaggerHover"

const clipPathVariants = {
  visible: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
  hidden:  { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)" },
}

export const HoverSliderImageWrap = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full", className)}
      {...props}
    />
  )
)
HoverSliderImageWrap.displayName = "HoverSliderImageWrap"

export const HoverSliderImage = React.forwardRef<HTMLImageElement, HTMLMotionProps<"img"> & HoverSliderImageProps>(
  ({ index, imageUrl, className, ...props }, ref) => {
    const { activeSlide } = useHoverSliderContext()
    return (
      <motion.img
        ref={ref}
        src={imageUrl}
        className={cn("inline-block align-middle object-cover w-full h-full", className)}
        transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
        variants={clipPathVariants}
        animate={activeSlide === index ? "visible" : "hidden"}
        {...props}
      />
    )
  }
)
HoverSliderImage.displayName = "HoverSliderImage"
