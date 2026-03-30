import { useEffect } from 'react'

export function useSmoothScroll() {
  useEffect(() => {
    let current = window.scrollY
    let target = window.scrollY
    let rafId: number | null = null
    const ease = 0.08

    const onWheel = (e: WheelEvent) => {
      if (document.body.style.overflow === 'hidden') return
      e.preventDefault()
      target += e.deltaY
      target = Math.max(0, Math.min(target, document.body.scrollHeight - window.innerHeight))
    }

    const loop = () => {
      const diff = target - current
      if (Math.abs(diff) < 0.5) {
        current = target
      } else {
        current += diff * ease
      }
      window.scrollTo(0, current)
      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('wheel', onWheel)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])
}
