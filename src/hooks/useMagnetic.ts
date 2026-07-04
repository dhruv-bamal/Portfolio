import { useRef, type MouseEvent } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const MAX_PULL = 24

/**
 * Magnetic hover: translates an element toward the pointer while hovered,
 * springing back on leave. Pointer-only enhancement — activation is never
 * gated on it, and it no-ops under reduced motion (touch devices never
 * fire mousemove sequences that matter).
 */
export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLElement | null>(null)
  const reduced = usePrefersReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.5 })

  const onMouseMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength
    rawX.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dx)))
    rawY.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dy)))
  }

  const onMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return { ref, x, y, handlers: { onMouseMove, onMouseLeave } }
}
