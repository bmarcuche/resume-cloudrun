import type { Project } from '../../lib/projects-data'
import ProjectIcon from './ProjectIcon'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { icon, title, subtitle, role, period, summary, metrics, highlights, stack } = project

  return (
    <article className="project-card">
      <span className="project-index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="project-head">
        <div className="project-icon">
          <ProjectIcon icon={icon} />
        </div>
        <div className="min-w-0">
          <p className="project-eyebrow">{period ? `${role} · ${period}` : role}</p>
          <h3 className="project-title">{title}</h3>
          <p className="project-subtitle">{subtitle}</p>
        </div>
      </div>

      <p className="project-summary">{summary}</p>

      {metrics && metrics.length > 0 && (
        <div className="project-metrics">
          {metrics.map((metric) => (
            <div key={metric.label} className="metric">
              <span className="metric-value">{metric.value}</span>
              <span className="metric-label">{metric.label}</span>
            </div>
          ))}
        </div>
      )}

      <ul className="project-highlights">
        {highlights.map((highlight, i) => (
          <li key={i}>{highlight}</li>
        ))}
      </ul>

      <div className="project-stack">
        {stack.map((item) => (
          <span key={item} className="tag">
            {item}
          </span>
        ))}
      </div>
    </article>
  )
}
