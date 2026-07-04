import { motion } from 'framer-motion'
import Section from '../ui/Section'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { content } from '../../data/content'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatMonth(iso: string): string {
  const [year, month] = iso.split('-').map(Number)
  return `${MONTHS[month - 1]} ${year}`
}

function formatRange(start: string, end: string | null): string {
  if (end === start) return formatMonth(start) // single-month entry (award, event)
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'Present'}`
}

export default function Experience() {
  const reduced = usePrefersReducedMotion()

  return (
    <Section id="experience" index={4} title="Experience">
      <ol className="border-t border-line">
        {content.experience.map((item, i) => (
          <motion.li
            key={item.id}
            className="grid gap-4 border-b border-line py-10 lg:grid-cols-12 lg:gap-8"
            initial={reduced ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label-mono pt-2 lg:col-span-3">{formatRange(item.start, item.end)}</p>
            <div className="lg:col-span-9 lg:col-start-4">
              <h3 className="font-display text-2xl font-bold uppercase md:text-3xl">
                {item.role}
                <span className="text-muted"> · {item.company}</span>
              </h3>
              <p className="mt-3 max-w-2xl text-base text-muted md:text-lg">{item.summary}</p>
              <ul className="mt-5 space-y-2">
                {item.highlights.map((highlight, hi) => (
                  <li key={hi} className="flex max-w-2xl gap-3 text-base text-fg/80">
                    <span aria-hidden="true" className="label-mono pt-1 !text-accent">
                      –
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}
