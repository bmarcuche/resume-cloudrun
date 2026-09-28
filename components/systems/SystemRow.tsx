import type { System } from '../../lib/systems-data'
import { DIAGRAMS } from '../diagrams'

// One system: text on one side, diagram and metric tiles on the other. `flip`
// puts the figure on the left so consecutive rows alternate.
export default function SystemRow({ system, flip }: { system: System; flip: boolean }) {
  const Diagram = DIAGRAMS[system.diagram]
  return (
    <article className={`sys ${flip ? 'sys-flip' : ''}`} id={`system-${system.id}`}>
      <div className="sys-text">
        <div className="sys-pills">
          {system.status.map((s) => (
            <span key={s.label} className={`pill pill-${s.tone}`}>
              {s.label}
            </span>
          ))}
        </div>
        <h3 className="pa-h3 sys-title">{system.title}</h3>
        <p className="sys-sub">{system.subtitle}</p>
        {system.link && (
          <a className="pa-link sys-link pa-mono" href={system.link.href} target="_blank" rel="noopener noreferrer">
            {system.link.label} ↗
          </a>
        )}
        <p className="sys-desc">{system.description}</p>
        <ul className="sys-outcomes">
          {system.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <div className="stack">
          {system.stack.map((item) => (
            <span key={item.name} className="stack-tag">
              <item.Icon aria-hidden="true" />
              {item.name}
            </span>
          ))}
        </div>
      </div>
      <div className="sys-fig">
        <Diagram />
        <div className="fig-metrics">
          {system.metrics.map((m) => (
            <div key={m.label} className="metric-tile">
              <span className="metric-value">{m.value}</span>
              <span className="metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
