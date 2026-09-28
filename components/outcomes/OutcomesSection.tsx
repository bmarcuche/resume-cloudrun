interface Outcome {
  from: string
  value: string
  unit: string
  note: string
  // Before/after bars share one scale (max) so the two lead-time cards compare visually.
  bar?: { before: number; after: number; max: number }
}

const OUTCOMES: Outcome[] = [
  {
    from: 'customer upgrade, was ~27 days',
    value: '<3',
    unit: 'days',
    note: '213 upgrade deployments automated. Lead time keeps falling month over month.',
    bar: { before: 27, after: 3, max: 27 },
  },
  {
    from: 'new environment, was ~12 days',
    value: '1.5',
    unit: 'days',
    note: 'Provisioning runs as agent-built Ansible pipelines instead of tickets.',
    bar: { before: 12, after: 1.5, max: 27 },
  },
  {
    from: 'manual deploy work removed',
    value: '426',
    unit: 'hours',
    note: '235 pipelines written by agents, reviewed by engineers, across the whole estate.',
  },
  {
    from: 'incidents caught by agents',
    value: '1',
    unit: 'session',
    note: 'A single multi-agent session found a fleet-wide config-deletion bug and root-caused an OS update and API regression.',
  },
]

export default function OutcomesSection() {
  return (
    <section id="outcomes" className="pa-section outcomes-pa">
      <div className="pa-wrap">
        <h2 className="pa-h2">What changed after the agent platform went live</h2>
        <p className="pa-lede">
          Results from the{' '}
          <a className="pa-link" href="#system-agent-platform">
            internal AI agent platform
          </a>{' '}
          on the hosted platform. The two lead-time cards are DORA lead time for changes, before and
          after launch, with bars drawn to scale.
        </p>
        <div className="out-grid">
          {OUTCOMES.map((o) => (
            <div key={o.from} className="out">
              <div className="out-from">{o.from}</div>
              <div className="out-to">
                {o.value}
                <small>{o.unit}</small>
              </div>
              {o.bar && (
                <div className="out-bar" aria-hidden="true">
                  <i style={{ width: `${(o.bar.before / o.bar.max) * 100}%` }} />
                  <i className="now" style={{ width: `${(o.bar.after / o.bar.max) * 100}%` }} />
                </div>
              )}
              <p>{o.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
