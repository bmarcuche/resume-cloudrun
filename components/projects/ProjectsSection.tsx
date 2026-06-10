import { projects } from '../../lib/projects-data'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'

export default function ProjectsSection() {
  return (
    <section id="projects" className="projects-section py-12">
      <div className="container mx-auto px-4">
        <Reveal className="section-intro">
          <p className="section-eyebrow">{'// SELECTED WORK'}</p>
          <h2 className="section-heading">Things I&apos;ve Built</h2>
          <p className="section-lede">
            A few systems I designed and shipped end to end, from semantic routing for AI agents to
            fleet discovery and just-in-time access.
          </p>
        </Reveal>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 120}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
