import LiveDeployCell from './LiveDeployCell'

// Outcome figures only, and only ones measured from the systems themselves (see
// lib/systems-data.ts). Never fleet size, client counts, or client sector.
const STATS = [
  { value: '40k+', label: 'ops requests routed by agents' },
  { value: '85%', label: 'routed without LLM reasoning' },
  { value: '40→11', label: 'days, median upgrade lead time' },
  { value: '100M+', label: 'health samples in 34 days' },
]

export default function StatusStrip() {
  return (
    <div className="status-strip" aria-label="Platform outcomes">
      <div className="pa-wrap">
        {STATS.map((s) => (
          <div key={s.label} className="stat">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
        <LiveDeployCell />
      </div>
    </div>
  )
}
