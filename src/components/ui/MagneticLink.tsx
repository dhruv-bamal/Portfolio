import { motion } from 'framer-motion'
import clsx from 'clsx'
import type { ReactNode, MouseEventHandler, Ref } from 'react'
import { useMagnetic } from '../../hooks/useMagnetic'
import { useCursorState } from '../../hooks/useCursorState'

interface MagneticLinkProps {
  children: ReactNode
  /** renders an <a> when set, otherwise a <button> */
  href?: string
  external?: boolean
  onClick?: MouseEventHandler
  className?: string
  strength?: number
  'aria-label'?: string
}

/**
 * Magnetic wrapper for links and buttons. The element drifts toward the
 * pointer and springs back on leave; the custom cursor grows over it.
 * Always a real <a>/<button> so keyboard activation is untouched.
 */
export default function MagneticLink({
  children,
  href,
  external,
  onClick,
  className,
  strength = 0.3,
  ...rest
}: MagneticLinkProps) {
  const { ref, x, y, handlers } = useMagnetic(strength)
  const cursor = useCursorState('hover')

  const sharedProps = {
    style: { x, y },
    className: clsx('inline-block', className),
    onClick,
    onMouseMove: handlers.onMouseMove,
    onMouseEnter: cursor.onMouseEnter,
    onMouseLeave: () => {
      handlers.onMouseLeave()
      cursor.onMouseLeave()
    },
    ...rest,
  }

  if (href) {
    return (
      <motion.a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...sharedProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button ref={ref as Ref<HTMLButtonElement>} type="button" {...sharedProps}>
      {children}
    </motion.button>
  )
}
