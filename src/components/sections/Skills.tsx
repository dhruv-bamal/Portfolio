import { motion } from 'framer-motion'
import Section from '../ui/Section'
import Marquee from '../ui/Marquee'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { content } from '../../data/content'

export default function Skills() {
  const { skillGroups } = content
  const reduced = usePrefersReducedMotion()
  const allSkills = skillGroups.flatMap((group) => group.skills)

  return (
    <Section id="skills" index={3} title="Skills" className="overflow-hidden">
      {/* full-bleed double ticker, rows run in opposite directions */}
      <div className="relative -mx-6 mb-16 space-y-3 md:-mx-10 md:mb-24 lg:-mx-16">
        <Marquee
          items={allSkills}
          className="px-6 font-display text-4xl font-bold uppercase text-fg md:text-6xl"
          duration={40}
        />
        <Marquee
          items={[...allSkills].reverse()}
          className="px-6 font-display text-4xl font-bold uppercase text-fg/25 md:text-6xl"
          duration={40}
          reverse
        />
      </div>

      <div className="grid gap-12 md:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={reduced ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 * gi, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="label-mono mb-5 border-b border-line pb-3 !text-accent">
              {group.category}
            </h3>
            <ul className="space-y-2">
              {group.skills.map((skill) => (
                <li key={skill} className="text-lg text-fg/80 md:text-xl">
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
