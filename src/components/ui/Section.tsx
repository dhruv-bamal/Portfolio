import { motion } from 'framer-motion'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import RevealText from './RevealText'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface SectionProps {
  id: string
  /** 1-based — rendered as the mono index "01/" */
  index: number
  title: string
  children: ReactNode
  className?: string
}

/**
 * Section shell: anchor target, aria-labelledby heading, mono index
 * number, overhanging display heading, and a scroll-triggered reveal
 * for its children (opacity/transform only — never display:none, so
 * keyboard focus always works).
 */
export default function Section({ id, index, title, children, className }: SectionProps) {
  const reduced = usePrefersReducedMotion()
  const headingId = `${id}-heading`

  return (
    <section id={id} aria-labelledby={headingId} className={clsx('relative py-24 md:py-36', className)}>
      <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16">
        <header className="mb-14 flex items-baseline gap-4 md:mb-20">
          <span aria-hidden="true" className="label-mono translate-y-[-0.4em] text-accent">
            {String(index).padStart(2, '0')}/
          </span>
          <RevealText
            as="h2"
            id={headingId}
            className="font-display text-display-lg font-bold uppercase lg:-ml-1"
          >
            {title}
          </RevealText>
        </header>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}
