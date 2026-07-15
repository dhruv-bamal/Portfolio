import { useMemo, useRef, type ComponentType } from 'react'
import { motion, useMotionValue, useScroll, useSpring, type MotionValue } from 'framer-motion'
import clsx from 'clsx'
import Section from '../ui/Section'
import MagneticLink from '../ui/MagneticLink'
import MoneyTrackerBanner from '../banners/MoneyTrackerBanner'
import HeliosBanner from '../banners/HeliosBanner'
import { useCursorState } from '../../hooks/useCursorState'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { content } from '../../data/content'
import type { Project } from '../../data/types'

// project id -> motion-graphics banner; unknown ids fall back to <img>,
// so the data file stays swappable for a CMS later
const BANNERS: Record<string, ComponentType<{ progress: MotionValue<number> }>> = {
  'money-tracker': MoneyTrackerBanner,
  'helios-protocol': HeliosBanner,
}

interface WorkCardProps {
  project: Project
  /** position in the grid — drives span, offset, and tilt direction */
  index: number
}

function WorkCard({ project, index }: WorkCardProps) {
  const cursor = useCursorState('view')
  const reduced = usePrefersReducedMotion()
  const cardRef = useRef<HTMLElement>(null)
  const primaryUrl = project.liveUrl ?? project.repoUrl
  const odd = index % 2 === 1
  const Banner = BANNERS[project.id]

  // scroll beats: 0 when the card enters the viewport, 1 well before it leaves
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 95%', 'start 30%'],
  })
  const smoothed = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.6 })
  const completed = useMotionValue(1)

  // debug hook: ?beat=0.5 freezes banner beats at a fixed progress so the
  // choreography can be inspected (e.g. in headless screenshots)
  const beatOverride = useMemo(() => {
    const v = new URLSearchParams(window.location.search).get('beat')
    if (v === null) return null
    const n = Number(v)
    return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : null
  }, [])
  const overridden = useMotionValue(beatOverride ?? 1)

  const progress = beatOverride !== null ? overridden : reduced ? completed : smoothed

  return (
    /* tilt lives here as pure CSS; the entrance animation lives on the inner
       motion.div — framer's inline transform must not override the rotate */
    <article
      ref={cardRef}
      className={clsx(
        'group',
        // bento: alternating wide/narrow cards, odd ones pushed down
        odd ? 'lg:col-span-5 lg:mt-28' : 'lg:col-span-7',
        // playful resting tilt that straightens on hover (desktop only)
        !reduced && [
          'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
          odd ? 'lg:-rotate-[0.9deg]' : 'lg:rotate-[1.2deg]',
          'lg:hover:rotate-0',
        ],
      )}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: reduced ? 0 : 0.12 * index, ease: [0.22, 1, 0.36, 1] }}
      >
        <a
          href={primaryUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} — open ${project.liveUrl ? 'live demo' : 'source code'}`}
          className="block overflow-hidden rounded-lg border border-line bg-surface"
          {...cursor}
        >
          <div
            className={clsx(
              'aspect-[4/3] w-full',
              !reduced &&
                'scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100',
            )}
          >
            {Banner ? (
              <Banner progress={progress} />
            ) : (
              <img
                src={project.image}
                alt={project.imageAlt}
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            )}
          </div>
        </a>

        <div className="mt-5">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl transition-colors duration-300 group-hover:text-accent md:text-3xl">
              {project.title}
            </h3>
            <span className="label-mono shrink-0">{project.year}</span>
          </div>
          <ul aria-label="Technologies" className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            {project.tags.map((tag) => (
              <li key={tag} className="label-mono !text-[0.65rem] !text-fg/55">
                {tag}
              </li>
            ))}
          </ul>
          <p className="mt-3 line-clamp-3 max-w-prose text-sm font-light leading-relaxed text-muted md:text-base">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
            {project.liveUrl && (
              <MagneticLink
                href={project.liveUrl}
                external
                className="label-mono !text-fg transition-colors hover:!text-accent"
              >
                Live demo ↗
              </MagneticLink>
            )}
            {project.repoUrl && (
              <MagneticLink
                href={project.repoUrl}
                external
                className="label-mono !text-fg transition-colors hover:!text-accent"
              >
                {project.apiRepoUrl ? 'Frontend ↗' : 'Source ↗'}
              </MagneticLink>
            )}
            {project.apiRepoUrl && (
              <MagneticLink
                href={project.apiRepoUrl}
                external
                className="label-mono !text-fg transition-colors hover:!text-accent"
              >
                API ↗
              </MagneticLink>
            )}
          </div>
        </div>
      </motion.div>
    </article>
  )
}

export default function Work() {
  return (
    <Section id="work" index={2} title="Selected Work">
      <div className="grid gap-x-10 gap-y-16 lg:grid-cols-12">
        {content.projects.map((project, i) => (
          <WorkCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </Section>
  )
}
