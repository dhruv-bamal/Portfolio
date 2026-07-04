import { motion, type Variants } from 'framer-motion'
import { Fragment, type ElementType } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface RevealTextProps {
  children: string
  /** semantic element to render: h1, h2, p, span... */
  as?: ElementType
  id?: string
  className?: string
  /** seconds before the stagger starts */
  delay?: number
  /** animate only the first time it enters the viewport */
  once?: boolean
}

const container: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.045, delayChildren: delay },
  }),
}

const word: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

/**
 * Staggered per-word text reveal. Words rise out of overflow-clipped
 * wrappers. Screen readers get one coherent string via aria-label;
 * the split spans are hidden from them. Renders plain text under
 * reduced motion.
 */
export default function RevealText({
  children,
  as: Comp = 'span',
  id,
  className,
  delay = 0,
  once = true,
}: RevealTextProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return (
      <Comp id={id} className={className}>
        {children}
      </Comp>
    )
  }

  const words = children.split(' ')

  return (
    <Comp id={id} className={className} aria-label={children}>
      <motion.span
        aria-hidden="true"
        className="inline"
        custom={delay}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.4 }}
        variants={container}
      >
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="inline-block overflow-hidden align-top pb-[0.12em] -mb-[0.12em]">
              <motion.span className="inline-block" variants={word}>
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </motion.span>
    </Comp>
  )
}
