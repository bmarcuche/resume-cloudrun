import { projects } from '../../lib/systems-data'
import ImpactStrip from '../outcomes/ImpactStrip'
import SystemRow from '../systems/SystemRow'

export default function ProjectsSection() {
  return (
    <section id="projects" className="pa-section">
      <div className="pa-wrap">
        <h2 className="pa-h2">Built on my own</h2>
        <p className="pa-lede">
          Outside work I build and run a consumer product end to end: product, models,
          infrastructure and CI.
        </p>
        <div className="systems-grid">
          {projects.map((p, i) => (
            <SystemRow
              key={p.id}
              system={p}
              flip={i % 2 === 1}
              after={p.impact ? <ImpactStrip id={`${p.id}-impact`} {...p.impact} /> : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
