import LiveDeployCell from './LiveDeployCell'

// Outcome figures only. Never fleet size, client counts, or client sector.
const STATS = [
  { value: '99.99%', label: 'platform uptime' },
  { value: '10,000+', label: 'ops tasks routed by agents' },
  { value: '89%', label: 'less change lead time' },
  { value: '235', label: 'pipelines built by agents' },
  { value: '426', label: 'manual deploy hours removed' },
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
