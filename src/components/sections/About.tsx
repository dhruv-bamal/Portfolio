import { motion } from 'framer-motion'
import Section from '../ui/Section'
import RevealText from '../ui/RevealText'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { content } from '../../data/content'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatMonth(iso: string): string {
  const [year, month] = iso.split('-').map(Number)
  return `${MONTHS[month - 1]} ${year}`
}

function formatRange(start: string, end: string | null): string {
  if (end === start) return formatMonth(start)
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'Present'}`
}

export default function About() {
  const { profile, experience } = content
  const reduced = usePrefersReducedMotion()
  const [lead, ...rest] = profile.bio

  return (
    <Section id="about" index={1} title="About">
      <div className="grid gap-14 lg:grid-cols-12">
        {/* bio — reveals line by line */}
        <div className="space-y-8 lg:col-span-7">
          <RevealText as="p" className="font-display text-display-md text-fg">
            {lead}
          </RevealText>
          {rest.map((paragraph, i) => (
            <motion.p
              key={i}
              className="max-w-2xl text-lg font-light leading-relaxed text-muted md:text-xl"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* side column: education + achievements from the experience data */}
        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="space-y-10 border-l border-line pl-6 lg:sticky lg:top-28">
            {experience.map((item, i) => (
              <motion.div
                key={item.id}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="label-mono !text-accent">{formatRange(item.start, item.end)}</p>
                <h3 className="mt-2 font-display text-2xl md:text-3xl">{item.role}</h3>
                <p className="mt-1 text-sm text-muted">{item.company}</p>
                <p className="mt-3 max-w-sm text-base font-light text-fg/75">{item.summary}</p>
              </motion.div>
            ))}
          </div>
        </aside>
      </div>
    </Section>
  )
}
