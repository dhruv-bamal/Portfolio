import { CursorProvider } from './context/CursorContext'
import { useLenis } from './hooks/useLenis'
import CustomCursor from './components/ui/CustomCursor'
import GrainOverlay from './components/ui/GrainOverlay'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
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
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer lenis={lenis} />
      <GrainOverlay />
      <CustomCursor />
    </CursorProvider>
  )
}
