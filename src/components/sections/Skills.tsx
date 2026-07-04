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
    <Section id="skills" index={3} title="Toolkit" className="overflow-hidden">
      <div className="grid gap-14 md:grid-cols-2">
        {skillGroups.map((group, gi) => (
          <div key={group.category}>
            <h3 className="label-mono mb-6 !text-accent">{group.category}</h3>
            <ul className="flex flex-wrap gap-3">
              {group.skills.map((skill, si) => (
                <motion.li
                  key={skill}
                  className="rounded-full border border-line px-4 py-2 text-base font-light text-fg/85 transition-colors duration-300 hover:border-accent hover:text-accent md:px-5 md:text-lg"
                  initial={reduced ? false : { opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.5,
                    delay: reduced ? 0 : 0.06 * si + 0.1 * gi,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* secondary ticker, reversed */}
      <div className="relative -mx-6 mt-20 md:-mx-10 lg:-mx-16">
        <Marquee
          items={allSkills}
          className="px-6 font-display text-3xl uppercase tracking-wide text-fg/25 md:text-5xl"
          duration={44}
          reverse
        />
      </div>
    </Section>
  )
}
