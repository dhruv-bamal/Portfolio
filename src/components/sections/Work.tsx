import { motion } from 'framer-motion'
import clsx from 'clsx'
import Section from '../ui/Section'
import MagneticLink from '../ui/MagneticLink'
import { useCursorState } from '../../hooks/useCursorState'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { content } from '../../data/content'
import type { Project } from '../../data/types'

function WorkBlock({ project }: { project: Project }) {
  const cursor = useCursorState('view')
  const reduced = usePrefersReducedMotion()
  const primaryUrl = project.liveUrl ?? project.repoUrl

  return (
    <motion.article
      className="group"
      initial={reduced ? false : { opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* edge-to-edge image block; desaturated until hover */}
      <a
        href={primaryUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`${project.title} — open ${project.liveUrl ? 'live demo' : 'source code'}`}
        className="block overflow-hidden bg-surface"
        {...cursor}
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          width={1200}
          height={800}
          loading="lazy"
          className={clsx(
            'aspect-video w-full object-cover object-top',
            !reduced &&
              'scale-[1.02] grayscale transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:grayscale-0',
          )}
        />
      </a>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="flex items-baseline gap-4">
            <h3 className="font-display text-display-md transition-colors duration-300 group-hover:text-accent">
              {project.title}
            </h3>
            <span className="label-mono">{project.year}</span>
          </div>
          <ul aria-label="Technologies" className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {project.tags.map((tag) => (
              <li key={tag} className="label-mono !text-fg/60">
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="text-base font-light leading-relaxed text-muted md:text-lg">
            {project.description}
          </p>
          <div className="mt-5 flex gap-8">
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
                Source ↗
              </MagneticLink>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Work() {
  return (
    <Section id="work" index={2} title="Selected Work">
      <div className="space-y-24 md:space-y-36">
        {content.projects.map((project) => (
          <WorkBlock key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}
