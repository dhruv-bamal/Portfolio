import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import RevealText from '../ui/RevealText'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { content } from '../../data/content'

export default function Hero() {
  const { profile } = content
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140])
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120])
  const metaOpacity = useTransform(scrollYProgress, [0, 0.5], [1, reduced ? 1 : 0])

  // "Junior Full Stack" + italic lime "Developer"
  const words = profile.role.split(' ')
  const emphasis = words.pop()
  const lead = words.join(' ')

  return (
    <section ref={ref} id="top" aria-label="Intro" className="relative flex min-h-svh flex-col overflow-hidden">
      {/* gradient bloom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/4 top-[-20%] h-[70vh] w-[70vw] animate-bloom rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(212,255,58,0.14), rgba(212,255,58,0.04) 55%, transparent 70%)',
        }}
      />
      {/* parallax ghost word */}
      <motion.span
        aria-hidden="true"
        style={{ y: ghostY, WebkitTextStroke: '1.5px rgba(242, 240, 234, 0.10)' }}
        className="pointer-events-none absolute bottom-[8%] right-[-2%] select-none font-display italic leading-none text-transparent text-[clamp(6rem,18vw,16rem)]"
      >
        folio
      </motion.span>

      <div className="relative mx-auto flex w-full max-w-[90rem] flex-1 flex-col justify-end px-6 pb-16 pt-28 md:px-10 md:pb-24 lg:px-16">
        {/* top-right meta */}
        <motion.div
          style={{ opacity: metaOpacity }}
          className="label-mono absolute right-6 top-24 flex flex-col items-end gap-1 text-right md:right-10 lg:right-16"
        >
          <span>{profile.location}</span>
          {profile.availability && (
            <span className="flex items-center gap-2 text-accent">
              <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              {profile.availability}
            </span>
          )}
        </motion.div>

        <motion.div style={{ y: headlineY }}>
          <h1 className="max-w-[12ch] font-display text-display-xl">
            <RevealText as="span" className="block" delay={0.15}>
              {lead}
            </RevealText>
            <RevealText as="span" className="block italic text-accent" delay={0.4}>
              {emphasis ?? ''}
            </RevealText>
          </h1>
          {profile.subtitle && (
            <RevealText
              as="p"
              delay={0.7}
              className="mt-8 max-w-md text-lg font-light text-muted md:text-xl"
            >
              {profile.subtitle}
            </RevealText>
          )}
        </motion.div>

        <motion.div
          style={{ opacity: metaOpacity }}
          className="label-mono mt-16 flex items-center justify-between"
        >
          <span aria-hidden="true">Scroll ↓</span>
          <span aria-hidden="true">©{new Date().getFullYear()}</span>
        </motion.div>
      </div>
    </section>
  )
}
