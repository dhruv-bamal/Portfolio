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
