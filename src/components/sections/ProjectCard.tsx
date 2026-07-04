import { motion } from 'framer-motion'
import clsx from 'clsx'
import type { Project } from '../../data/types'
import { useCursorState } from '../../hooks/useCursorState'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface ProjectCardProps {
  project: Project
  /** position in the list — drives the alternating asymmetric offset */
  position: number
}

export default function ProjectCard({ project, position }: ProjectCardProps) {
  const cursor = useCursorState('view')
  const reduced = usePrefersReducedMotion()
  const href = project.liveUrl ?? project.repoUrl
  const alignRight = position % 2 === 1

  return (
    <motion.li
      className={clsx(
        'lg:col-span-7',
        alignRight ? 'lg:col-start-6' : 'lg:col-start-1',
        project.featured && 'lg:col-span-8',
        project.featured && alignRight && 'lg:col-start-5',
      )}
      initial={reduced ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group block"
        aria-label={`${project.title} — ${project.description}`}
        {...cursor}
      >
        {/* image frame: image scales + desaturates back to color on hover */}
        <div className="overflow-hidden border border-line bg-surface">
          <img
            src={project.image}
            alt={project.imageAlt}
            width={1200}
            height={800}
            loading="lazy"
            className={clsx(
              'aspect-[3/2] w-full object-cover',
              !reduced &&
                'grayscale transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:grayscale-0',
            )}
          />
        </div>

        <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-line pb-4">
          <h3 className="font-display text-display-md font-bold uppercase transition-colors duration-300 group-hover:text-accent">
            {project.title}
          </h3>
          <span className="label-mono shrink-0">{project.year}</span>
        </div>

        <p className="mt-3 max-w-xl text-base text-muted md:text-lg">{project.description}</p>

        <ul aria-label="Technologies" className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {project.tags.map((tag) => (
            <li key={tag} className="label-mono !text-fg/60">
              {tag}
            </li>
          ))}
        </ul>
      </a>
    </motion.li>
  )
}
