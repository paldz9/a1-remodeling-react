import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

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

const linkClass = 'px-1 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-50 whitespace-nowrap'
const triggerClass = 'px-1 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 bg-transparent hover:bg-gray-50 data-[state=open]:bg-gray-50 data-[state=open]:text-gray-900 whitespace-nowrap'

export default function Navbar({ visible = true }: { visible?: boolean }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white px-4 md:px-6"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease' }}
    >
      <div className="flex h-16 items-center justify-center">

        {/* ── All items centered together ── */}
        <div className="max-md:hidden flex items-center gap-6">

          {/* Company name */}
          <a href="/" className="select-none text-sm font-bold tracking-widest uppercase text-gray-900 whitespace-nowrap leading-none flex items-center">
            A1 Home Remodeling Inc
          </a>

          <NavigationMenu>
            <NavigationMenuList className="gap-6">

              {/* Home */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="#home" className={linkClass}>Home</a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* About us */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="#about" className={linkClass}>About us</a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Products — Features style (title + description) */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(triggerClass)}>
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul style={{ width: '440px', padding: '12px' }}>
                    {PRODUCTS.map(item => (
                      <li key={item.label}>
                        <NavigationMenuLink asChild>
                          <a
                            href={item.href}
                            className="block select-none rounded-lg hover:bg-gray-50 transition-colors"
                            style={{ padding: '14px 16px', marginBottom: '2px' }}
                          >
                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#111', marginBottom: '5px' }}>{item.label}</div>
                            <div style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.6' }}>{item.description}</div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Our Work — Pricing style (2-column grid) */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(triggerClass)}>
                  Our Work
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[380px] grid grid-cols-2 gap-1 p-3">
                    {OUR_WORK.map(item => (
                      <li key={item.label}>
                        <NavigationMenuLink asChild>
                          <a
                            href={item.href}
                            className="block select-none rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors whitespace-nowrap"
                          >
                            {item.label}
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Contact */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="#contact" className={linkClass}>Contact</a>
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenu>

          {/* Book Online */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-gray-950 text-[13px] font-semibold tracking-wide text-white shadow-sm transition-all duration-150 hover:bg-gray-800 hover:shadow-md active:scale-[0.98]"
            style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
          >
            Book Online
          </a>
        </div>

        {/* ── Mobile: company name left, hamburger right ── */}
        <div className="md:hidden flex items-center justify-between w-full">
          <a href="/" className="text-sm font-bold tracking-widest uppercase text-gray-900">
            A1 Home Remodeling
          </a>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8" variant="ghost" size="icon">
                <svg className="pointer-events-none" width={16} height={16} viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12L20 12" className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]" />
                  <path d="M4 12H20" className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45" />
                  <path d="M4 12H20" className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-2">
              <nav className="flex flex-col gap-1">
                <a href="#home"    className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">Home</a>
                <a href="#about"   className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">About us</a>
                <div className="px-3 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Products</div>
                {PRODUCTS.map(item => (
                  <a key={item.label} href={item.href} className="px-5 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">{item.label}</a>
                ))}
                <div className="px-3 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Our Work</div>
                {OUR_WORK.map(item => (
                  <a key={item.label} href={item.href} className="px-5 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">{item.label}</a>
                ))}
                <a href="#contact" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">Contact</a>
                <div className="border-t border-gray-100 my-1" />
                <a href="#contact" className="px-3 py-2 text-sm font-semibold text-center bg-gray-900 text-white rounded-md">Book Online</a>
              </nav>
            </PopoverContent>
          </Popover>
        </div>

      </div>
    </header>
  )
}
