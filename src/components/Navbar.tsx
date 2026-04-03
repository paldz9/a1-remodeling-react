import { cn } from '@/lib/utils'
import { useState, useRef, useCallback, useEffect } from 'react'
import { Home, Users, Package, Hammer, Phone } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'

const PRODUCTS = [
  {
    href: '#products',
    label: 'Weather Defense Exterior Coating',
    description: 'Moisture-resistant coating that shields your home from UV rays, rain, and harsh weather.',
  },
  {
    href: '#products',
    label: 'High Performance Windows',
    description: 'Energy Star certified windows that reduce heat gain, cut noise, and slash utility bills.',
  },
  {
    href: '#products',
    label: 'Heat Reflecting Roofing',
    description: "Cool-roof technology that reflects solar heat and holds up against LA's toughest weather.",
  },
]

const OUR_WORK = [
  { href: '#work', label: 'Kitchen Remodeling' },
  { href: '#work', label: 'Bathroom Renovation' },
  { href: '#work', label: 'Room Additions' },
  { href: '#work', label: 'Custom Home Remodeling' },
  { href: '#work', label: 'ADU Construction' },
  { href: '#work', label: 'Commercial Projects' },
]

const linkClass = 'px-1 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap'
const triggerClass = 'px-1 py-2 text-sm font-medium bg-transparent whitespace-nowrap'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const ORIGINAL = 'Book Online'

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function BookOnlineButton({ onClick, inverted = false }: { onClick?: () => void; inverted?: boolean }) {
  const [label, setLabel] = useState(ORIGINAL)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const scrambleRef = useRef<number | null>(null)
  const animRef = useRef<number | null>(null)
  const radiusRef = useRef(8)
  const startRef = useRef<number>(0)

  const animateTo = useCallback((target: number, duration: number, easing: (t: number) => number) => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    const start = radiusRef.current
    const startTime = performance.now()
    const run = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      radiusRef.current = start + (target - start) * easing(progress)
      const el = btnRef.current
      if (el) el.style.borderRadius = `${radiusRef.current}px`
      if (progress < 1) animRef.current = requestAnimationFrame(run)
    }
    animRef.current = requestAnimationFrame(run)
  }, [])

  const scramble = useCallback(() => {
    const duration = 600
    const animate = (now: number) => {
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const resolved = Math.floor(progress * ORIGINAL.length)
      const scrambled = ORIGINAL.split('').map((ch, i) => {
        if (ch === ' ') return ' '
        if (i < resolved) return ch
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join('')
      setLabel(scrambled)
      if (progress < 1) scrambleRef.current = requestAnimationFrame(animate)
      else setLabel(ORIGINAL)
    }
    if (scrambleRef.current) cancelAnimationFrame(scrambleRef.current)
    startRef.current = performance.now()
    scrambleRef.current = requestAnimationFrame(animate)
  }, [])

  return (
    <a
      ref={btnRef}
      href="#"
      onClick={e => { e.preventDefault(); onClick?.() }}
      onMouseEnter={() => {
        scramble()
        const maxR = btnRef.current ? Math.ceil(btnRef.current.offsetHeight / 2) : 18
        animateTo(maxR, 900, easeInOut)
        const el = btnRef.current
        if (el) { el.style.backgroundColor = inverted ? '#444444' : '#333333'; el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)'; el.style.transform = 'translateY(-1px)' }
      }}
      onMouseLeave={() => {
        setLabel(ORIGINAL)
        if (scrambleRef.current) cancelAnimationFrame(scrambleRef.current)
        animateTo(8, 1800, easeOut)
        const el = btnRef.current
        if (el) { el.style.backgroundColor = inverted ? '#ffffff' : '#111111'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        borderRadius: '8px',
        backgroundColor: inverted ? '#ffffff' : '#111111',
        fontSize: '13px',
        fontWeight: 600,
        letterSpacing: '0.05em',
        color: inverted ? '#111111' : '#ffffff',
        transition: 'background-color 0.5s ease, color 0.5s ease, box-shadow 0.2s ease, transform 0.15s ease',
        paddingLeft: '1.75rem',
        paddingRight: '1.75rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        fontFamily: 'monospace',
        minWidth: '120px',
        textDecoration: 'none',
      }}
    >
      {label}
    </a>
  )
}

export default function Navbar({
  visible = true,
  bare = false,
  onBookNow,
  onContact,
  onHome,
  onAbout,
  onProducts,
  onOurWork,
  inverted = false,
}: {
  visible?: boolean
  bare?: boolean
  onBookNow?: () => void
  onContact?: () => void
  onHome?: () => void
  onAbout?: () => void
  onProducts?: () => void
  onOurWork?: () => void
  inverted?: boolean
}) {
  const bg = bare ? '#000000' : inverted ? '#111111' : '#ffffff'
  const border = inverted ? '#333333' : '#e5e7eb'
  const text = inverted ? '#ffffff' : '#111111'
  const muted = inverted ? 'rgba(255,255,255,0.6)' : '#6b7280'

  // Mobile scroll-hide logic
  const [mobileHidden, setMobileHidden] = useState(false)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      if (current > lastScrollYRef.current + 8 && current > 80) {
        setMobileHidden(true)
      } else if (current < lastScrollYRef.current - 8) {
        setMobileHidden(false)
      }
      lastScrollYRef.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const mobileNavItems = [
    { label: 'Home',     Icon: Home,    action: onHome },
    { label: 'About',    Icon: Users,   action: onAbout },
    { label: 'Products', Icon: Package, action: onProducts },
    { label: 'Our Work', Icon: Hammer,  action: onOurWork },
    { label: 'Contact',  Icon: Phone,   action: onContact },
  ]

  const pillBg    = inverted ? '#111111' : '#ffffff'
  const pillBdr   = inverted ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.09)'
  const iconColor = inverted ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.42)'
  const iconActive = inverted ? '#ffffff' : '#111111'
  const iconHover  = inverted ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)'

  return (
    <>
      {/* ── Desktop nav ── */}
      <header
        className="max-md:hidden fixed top-0 left-0 right-0 z-50 px-4 md:px-6"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease, background-color 0.5s ease, border-color 0.5s ease',
          backgroundColor: bg,
          borderBottom: bare ? 'none' : `1px solid ${border}`,
        }}
      >
        <div className="flex h-16 items-center justify-center">
          <div className="flex items-center gap-6" style={{ opacity: bare ? 0 : 1, transition: 'opacity 0.5s ease', pointerEvents: bare ? 'none' : 'auto' }}>

            <a href="/" style={{ color: text, transition: 'color 0.5s ease' }} className="select-none text-sm font-bold tracking-widest uppercase whitespace-nowrap leading-none flex items-center">
              A1 Home Remodeling Inc
            </a>

            <NavigationMenu>
              <NavigationMenuList className="gap-6">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a href="#home" className={linkClass} style={{ color: muted, transition: 'color 0.5s ease' }}
                      onClick={onHome ? (e => { e.preventDefault(); onHome() }) : undefined}
                      onMouseEnter={e => (e.currentTarget.style.color = text)} onMouseLeave={e => (e.currentTarget.style.color = muted)}>Home</a>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a href="#about" className={linkClass} style={{ color: muted, transition: 'color 0.5s ease' }}
                      onClick={onAbout ? (e => { e.preventDefault(); onAbout() }) : undefined}
                      onMouseEnter={e => (e.currentTarget.style.color = text)} onMouseLeave={e => (e.currentTarget.style.color = muted)}>About us</a>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(triggerClass)} style={{ color: muted, transition: 'color 0.5s ease' }}
                    onClick={onProducts ? () => onProducts() : undefined}>
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul style={{ width: '440px', padding: '12px', backgroundColor: inverted ? '#1a1a1a' : '#fff' }}>
                      {PRODUCTS.map(item => (
                        <li key={item.label}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className="block select-none rounded-lg transition-colors"
                              style={{ padding: '14px 16px', marginBottom: '2px' }}
                              onClick={onProducts ? (e => { e.preventDefault(); onProducts() }) : undefined}
                              onMouseEnter={e => (e.currentTarget.style.backgroundColor = inverted ? '#2a2a2a' : '#f9fafb')}
                              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              <div style={{ fontSize: '14px', fontWeight: 600, color: inverted ? '#fff' : '#111', marginBottom: '5px' }}>{item.label}</div>
                              <div style={{ fontSize: '13px', color: inverted ? 'rgba(255,255,255,0.5)' : '#9ca3af', lineHeight: '1.6' }}>{item.description}</div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
              <NavigationMenuViewport className={inverted ? '!bg-[#1a1a1a] !border-[#333]' : ''} />
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(triggerClass)} style={{ color: muted, transition: 'color 0.5s ease' }}
                    onClick={onOurWork ? () => onOurWork() : undefined}>
                    Our Work
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul style={{ width: '220px', padding: '12px 8px', backgroundColor: inverted ? '#1a1a1a' : '#fff' }}>
                      {OUR_WORK.map(item => (
                        <li key={item.label}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className="block select-none rounded-md transition-colors whitespace-nowrap"
                              style={{ padding: '10px 16px', fontSize: '14px', fontWeight: 500, color: inverted ? 'rgba(255,255,255,0.8)' : '#374151', marginBottom: '2px' }}
                              onClick={onOurWork ? (e => { e.preventDefault(); onOurWork() }) : undefined}
                              onMouseEnter={e => (e.currentTarget.style.backgroundColor = inverted ? '#2a2a2a' : '#f9fafb')}
                              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              {item.label}
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
              <NavigationMenuViewport className={inverted ? '!bg-[#1a1a1a] !border-[#333]' : ''} />
            </NavigationMenu>

            <a href="#contact" className={linkClass} style={{ color: muted, transition: 'color 0.5s ease' }}
              onClick={onContact ? (e => { e.preventDefault(); onContact() }) : undefined}
              onMouseEnter={e => (e.currentTarget.style.color = text)} onMouseLeave={e => (e.currentTarget.style.color = muted)}>Contact</a>

            <BookOnlineButton onClick={onBookNow} inverted={inverted} />
          </div>
        </div>
      </header>

      {/* ── Mobile pill nav (top) ── */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{
          padding: '10px 16px',
          transform: (mobileHidden || bare) ? 'translateY(-110%)' : 'translateY(0)',
          opacity: visible && !bare ? 1 : 0,
          transition: 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease',
          pointerEvents: visible && !bare ? 'auto' : 'none',
        }}
      >
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: pillBg,
            borderRadius: '999px',
            boxShadow: inverted
              ? '0 4px 24px rgba(0,0,0,0.5)'
              : '0 4px 24px rgba(0,0,0,0.13)',
            border: `1px solid ${pillBdr}`,
            padding: '4px 4px',
            transition: 'background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
          }}
        >
          {mobileNavItems.map(({ label, Icon, action }) => (
            <button
              key={label}
              onClick={() => action?.()}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                padding: '7px 11px',
                borderRadius: '999px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: iconColor,
                transition: 'color 0.25s ease, background-color 0.2s ease',
                minWidth: '50px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = iconHover
                e.currentTarget.style.color = iconActive
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = iconColor
              }}
              onTouchStart={e => {
                e.currentTarget.style.backgroundColor = iconHover
                e.currentTarget.style.color = iconActive
              }}
              onTouchEnd={e => {
                const el = e.currentTarget
                setTimeout(() => {
                  el.style.backgroundColor = 'transparent'
                  el.style.color = iconColor
                }, 180)
              }}
            >
              <Icon size={18} strokeWidth={1.75} />
              <span style={{
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}>
                {label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}
