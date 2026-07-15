import { useEffect } from 'react'
import { CursorProvider } from './context/CursorContext'
import { useLenis } from './hooks/useLenis'
import CustomCursor from './components/ui/CustomCursor'
import GrainOverlay from './components/ui/GrainOverlay'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import MarqueeBand from './components/sections/MarqueeBand'
import About from './components/sections/About'
import Work from './components/sections/Work'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'

export default function App() {
  const lenis = useLenis()

  // debug hook (pairs with ?beat=): ?shot=<section-id> translates that section
  // into view for headless screenshots. Combine with a forced
  // prefers-reduced-motion so in-view reveals render instantly.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('shot')
    if (!id) return
    const timer = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        document.body.style.transform = `translateY(${-el.getBoundingClientRect().top + 40}px)`
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <CursorProvider>
      <a
        href="#main"
        className="label-mono sr-only z-50 !text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:bg-accent focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Navbar lenis={lenis} />
      <main id="main">
        <Hero />
        <MarqueeBand />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer lenis={lenis} />
      <GrainOverlay />
      <CustomCursor />
    </CursorProvider>
  )
}
