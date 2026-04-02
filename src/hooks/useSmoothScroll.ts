import { useEffect, useRef, useCallback } from 'react'

export function useSmoothScroll() {
  const stateRef = useRef({ current: window.scrollY, target: window.scrollY })
  const maxTargetRef = useRef<number | null>(null)  // when set, wheel can't push target past this

  const jumpTo = useCallback((y: number) => {
    stateRef.current.current = y
    stateRef.current.target = y
    window.scrollTo(0, y)
  }, [])

  // Lock the scroll target at exactly y — wheel events cannot push past it
  const lockAt = useCallback((y: number) => {
    maxTargetRef.current = y
    stateRef.current.target = y
  }, [])

  // Release the lock — wheel events flow freely again
  const unlock = useCallback(() => {
    maxTargetRef.current = null
  }, [])

  useEffect(() => {
    const state = stateRef.current
    let rafId: number | null = null
    const ease = 0.07

    const onWheel = (e: WheelEvent) => {
      if (document.body.style.overflow === 'hidden') return
      if ((e.target as HTMLElement)?.closest('[data-scroll-independent]')) return

      e.preventDefault()
      const delta = e.deltaMode === 1 ? e.deltaY * 40 : e.deltaMode === 2 ? e.deltaY * 400 : e.deltaY
      state.target += delta
      state.target = Math.max(0, Math.min(state.target, document.body.scrollHeight - window.innerHeight))

      // If locked, clamp target so wheel cannot push past the lock position
      if (maxTargetRef.current !== null) {
        state.target = Math.min(state.target, maxTargetRef.current)
      }
    }

    const loop = () => {
      const diff = state.target - state.current
      if (Math.abs(diff) < 0.3) {
        state.current = state.target
      } else {
        state.current += diff * ease
      }
      window.scrollTo(0, state.current)
      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('wheel', onWheel)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const scrollTo = useCallback((y: number) => {
    stateRef.current.target = Math.max(0, Math.min(y, document.body.scrollHeight - window.innerHeight))
  }, [])

  return { jumpTo, scrollTo, lockAt, unlock }
}
