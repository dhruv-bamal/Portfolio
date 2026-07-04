import Section from '../ui/Section'
import ProjectCard from './ProjectCard'
import { content } from '../../data/content'

export default function Projects() {
  return (
    <Section id="projects" index={2} title="Selected Work">
      <ul className="grid gap-y-20 md:gap-y-28 lg:grid-cols-12">
        {content.projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} position={i} />
        ))}
      </ul>
    </Section>
  )
}
