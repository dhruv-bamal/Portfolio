import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import RevealText from './RevealText'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface SectionProps {
  id: string
  /** 1-based — rendered as the oversized ghost numeral "01" */
  index: number
  title: string
  children: ReactNode
  className?: string
}

/**
 * Section shell: anchor target, aria-labelledby heading, an oversized
 * outlined background numeral that drifts on scroll (parallax), and a
 * scroll-triggered reveal for children (opacity/transform only — never
 * display:none, so keyboard focus always works).
 */
export default function Section({ id, index, title, children, className }: SectionProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const headingId = `${id}-heading`

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const numeralY = useTransform(scrollYProgress, [0, 1], [80, reduced ? 80 : -80])

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={headingId}
      className={clsx('relative overflow-hidden py-24 md:py-36', className)}
    >
      {/* ghost parallax numeral */}
      <motion.span
        aria-hidden="true"
        style={{ y: numeralY, WebkitTextStroke: '1.5px rgba(242, 240, 234, 0.14)' }}
        className="pointer-events-none absolute -right-4 top-0 select-none font-display text-[clamp(8rem,24vw,22rem)] leading-none text-transparent md:right-8"
      >
        {String(index).padStart(2, '0')}
      </motion.span>

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16">
        <header className="mb-14 flex items-baseline gap-5 md:mb-20">
          <span aria-hidden="true" className="label-mono !text-accent">
            {String(index).padStart(2, '0')}
          </span>
          <RevealText as="h2" id={headingId} className="font-display text-display-lg lg:-ml-1">
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
