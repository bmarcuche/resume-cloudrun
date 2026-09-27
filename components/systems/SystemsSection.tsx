import { systems } from '../../lib/systems-data'
import SystemRow from './SystemRow'

export default function SystemsSection() {
  return (
    <section id="systems" className="pa-section">
      <div className="pa-wrap">
        <h2 className="pa-h2">Systems I own</h2>
        <p className="pa-lede">
          Each of these runs in production today. I architected them, wrote most of the code, and
          operate them with the team I lead.
        </p>
        <div className="systems-grid">
          {systems.map((s, i) => (
            <SystemRow key={s.id} system={s} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
