import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useCursor } from '../../hooks/useCursorState'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

// one morphing element: lime dot → soft ring over interactive targets
const variants = {
  default: {
    width: 10,
    height: 10,
    opacity: 1,
    backgroundColor: '#D4FF3A',
    borderColor: 'rgba(212, 255, 58, 0)',
  },
  hover: {
    width: 48,
    height: 48,
    opacity: 0.9,
    backgroundColor: 'rgba(212, 255, 58, 0.08)',
    borderColor: 'rgba(212, 255, 58, 0.9)',
  },
  text: {
    width: 4,
    height: 44,
    opacity: 0.9,
    backgroundColor: '#D4FF3A',
    borderColor: 'rgba(212, 255, 58, 0)',
  },
  view: {
    width: 88,
    height: 88,
    opacity: 1,
    backgroundColor: '#D4FF3A',
    borderColor: 'rgba(212, 255, 58, 0)',
  },
}

/**
 * Custom cursor: a small accent dot trailing on a spring that scales and
 * softens into a ring over links, and becomes a filled "View" badge over
 * project blocks. Mounted only on fine-pointer devices without reduced
 * motion; the native cursor is hidden via a body class only while active.
 */
export default function CustomCursor() {
  const { variant } = useCursor()
  const reduced = usePrefersReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const x = useSpring(mx, { stiffness: 500, damping: 38, mass: 0.6 })
  const y = useSpring(my, { stiffness: 500, damping: 38, mass: 0.6 })

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
      <motion.div
        className="absolute flex items-center justify-center rounded-full border"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{
          ...variants[variant],
          opacity: visible ? variants[variant].opacity : 0,
          borderRadius: variant === 'text' ? 2 : 999,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
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
