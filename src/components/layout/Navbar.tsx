import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import clsx from 'clsx'
import type Lenis from 'lenis'
import MagneticLink from '../ui/MagneticLink'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { content } from '../../data/content'

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

interface NavbarProps {
  lenis: Lenis | null
}

export default function Navbar({ lenis }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const reduced = usePrefersReducedMotion()

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  const scrollToAnchor = (e: MouseEvent, href: string) => {
    setMenuOpen(false)
    if (!lenis) return // native anchor behavior (incl. reduced motion)
    e.preventDefault()
    lenis.scrollTo(href, { offset: -64 })
  }

  // mobile menu: focus trap + Escape to close, focus restored to the toggle
  useEffect(() => {
    if (!menuOpen) return
    const menu = document.getElementById('mobile-menu')
    if (!menu) return
    const focusables = menu.querySelectorAll<HTMLElement>('a, button')
    focusables[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab' || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  // The blur lives on an inner row, NOT the header itself: backdrop-filter
  // would make the header the containing block for the fixed overlay menu
  // below and collapse it to zero height.
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div
        className={clsx(
          'transition-colors duration-300',
          scrolled ? 'border-b border-line bg-bg/70 backdrop-blur-md' : 'bg-transparent',
        )}
      >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-6 md:px-10 lg:px-16"
      >
        <MagneticLink
          href="#top"
          className="font-mono text-sm font-bold tracking-tight text-fg"
          aria-label={`${content.profile.name} — back to top`}
          onClick={(e) => scrollToAnchor(e, '#top')}
        >
          DB<span className="text-accent">©</span>
        </MagneticLink>

        {/* desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <MagneticLink
                href={item.href}
                className="label-mono !text-fg/80 transition-colors hover:!text-accent"
                onClick={(e) => scrollToAnchor(e, item.href)}
              >
                {item.label}
              </MagneticLink>
            </li>
          ))}
        </ul>

        {/* mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="label-mono !text-fg md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>
      </div>

      {/* mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 top-16 z-30 bg-bg md:hidden"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex h-full flex-col justify-center gap-2 px-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduced ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.05 * i, duration: 0.4 }}
                >
                  <a
                    href={item.href}
                    className="font-display text-display-md font-bold uppercase"
                    onClick={(e) => scrollToAnchor(e, item.href)}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
