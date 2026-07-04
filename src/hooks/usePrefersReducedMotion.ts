import { useReducedMotion } from 'framer-motion'

/**
 * Single import point for the reduced-motion check so every primitive
 * shares one strategy. Returns true when the user asks for less motion.
 */
export function usePrefersReducedMotion(): boolean {
  return useReducedMotion() ?? false
}
