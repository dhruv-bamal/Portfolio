import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import RevealText from '../ui/RevealText'
import Marquee from '../ui/Marquee'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { content } from '../../data/content'

export default function Hero() {
  const { profile } = content
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  // name drifts up slower than the page scrolls away
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const nameY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140])
  const metaOpacity = useTransform(scrollYProgress, [0, 0.5], [1, reduced ? 1 : 0])

  const [firstName, ...restName] = profile.name.split(' ')

  return (
    <section ref={ref} id="top" aria-label="Intro" className="relative flex min-h-svh flex-col">
      <div className="mx-auto flex w-full max-w-[90rem] flex-1 flex-col justify-between px-6 pb-10 pt-28 md:px-10 md:pt-32 lg:px-16">
        {/* top meta row */}
        <motion.div
          style={{ opacity: metaOpacity }}
          className="flex flex-wrap items-start justify-between gap-4"
        >
          <RevealText as="p" className="max-w-xs text-base text-muted md:text-lg" delay={0.9}>
            {profile.role}
          </RevealText>
          <div className="label-mono flex flex-col items-end gap-1 text-right">
            <span>{profile.location}</span>
            {profile.availability && (
              <span className="flex items-center gap-2 text-accent">
                <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                {profile.availability}
              </span>
            )}
          </div>
        </motion.div>

        {/* oversized name — asymmetric: second line indented */}
        <motion.h1 style={{ y: nameY }} className="font-display font-bold uppercase">
          <RevealText as="span" className="block text-display-xl" delay={0.15}>
            {firstName}
          </RevealText>
          <RevealText
            as="span"
            className="block text-display-xl text-accent md:pl-[12vw]"
            delay={0.35}
          >
            {restName.join(' ')}
          </RevealText>
        </motion.h1>

        {/* scroll hint */}
        <motion.div style={{ opacity: metaOpacity }} className="label-mono flex justify-between">
          <span aria-hidden="true">Scroll ↓</span>
          <span aria-hidden="true">©{new Date().getFullYear()}</span>
        </motion.div>
      </div>

      {/* full-bleed taglines ticker */}
      <div className="border-y border-line py-4 md:py-6">
        <Marquee
          items={profile.taglines}
          className="px-6 font-display text-2xl font-bold uppercase text-fg/90 md:text-4xl"
          duration={24}
        />
      </div>
    </section>
  )
}
