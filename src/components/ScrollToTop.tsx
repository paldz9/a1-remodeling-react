import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

export default function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
