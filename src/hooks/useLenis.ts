import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Owns the Lenis smooth-scroll instance for the page.
 * Never initializes under reduced motion — native scrolling takes over.
 */
export function useLenis(): Lenis | null {
  const reduced = usePrefersReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduced) return
    const instance = new Lenis({ autoRaf: true, lerp: 0.1 })
    setLenis(instance)
    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  return lenis
}
