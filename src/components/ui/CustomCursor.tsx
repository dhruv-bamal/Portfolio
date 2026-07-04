import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useCursor } from '../../hooks/useCursorState'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const ringVariants = {
  default: { width: 36, height: 36, opacity: 0.5 },
  hover: { width: 64, height: 64, opacity: 0.9 },
  text: { width: 4, height: 48, opacity: 0.9 },
  view: { width: 88, height: 88, opacity: 1 },
}

/**
 * Custom cursor: an accent dot plus a spring-trailing ring that morphs
 * per hover target ('view' becomes a filled "VIEW" badge over project
 * cards). Mounted only on fine-pointer devices without reduced motion;
 * the native cursor is hidden via a body class only while this is active.
 */
export default function CustomCursor() {
  const { variant } = useCursor()
  const reduced = usePrefersReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const ringX = useSpring(mx, { stiffness: 400, damping: 40, mass: 0.8 })
  const ringY = useSpring(my, { stiffness: 400, damping: 40, mass: 0.8 })

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const update = () => setEnabled(finePointer.matches && !reduced)
    update()
    finePointer.addEventListener('change', update)
    return () => finePointer.removeEventListener('change', update)
  }, [reduced])

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, mx, my])

  // Only hide the native cursor once the custom one is actually on screen.
  useEffect(() => {
    document.body.classList.toggle('custom-cursor-active', enabled && visible)
    return () => document.body.classList.remove('custom-cursor-active')
  }, [enabled, visible])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50">
      {/* dot — tracks the pointer exactly */}
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x: mx, y: my, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && variant !== 'view' ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
      {/* ring — trails on a spring and morphs per variant */}
      <motion.div
        className="absolute flex items-center justify-center rounded-full border border-fg/60"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          ...ringVariants[variant],
          opacity: visible ? ringVariants[variant].opacity : 0,
          backgroundColor: variant === 'view' ? '#C9F24E' : 'rgba(201, 242, 78, 0)',
          borderRadius: variant === 'text' ? 2 : 999,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      >
        <motion.span
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-bg"
          animate={{ opacity: variant === 'view' ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        >
          View
        </motion.span>
      </motion.div>
    </div>
  )
}
