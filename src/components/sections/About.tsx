import { motion } from 'framer-motion'
import Section from '../ui/Section'
import RevealText from '../ui/RevealText'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { content } from '../../data/content'

export default function About() {
  const { profile } = content
  const reduced = usePrefersReducedMotion()
  const [lead, ...rest] = profile.bio

  return (
    <Section id="about" index={1} title="About">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="label-mono lg:sticky lg:top-28">Who I am</p>
        </div>
        {/* asymmetric: text block starts at column 5 */}
        <div className="space-y-8 lg:col-span-8 lg:col-start-5">
          <RevealText
            as="p"
            className="font-display text-display-md font-medium leading-tight text-fg"
          >
            {lead}
          </RevealText>
          {rest.map((paragraph, i) => (
            <motion.p
              key={i}
              className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </Section>
  )
}
