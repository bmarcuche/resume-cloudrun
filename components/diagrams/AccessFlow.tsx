import DiagramFrame from './DiagramFrame'

// Hosted Access Manager: request -> unlock -> time-boxed session -> lock, with a
// dashed reconciler loop that re-locks orphaned sessions.
export default function AccessFlow() {
  return (
    <DiagramFrame>
      <svg className="d d-wide" viewBox="0 0 480 100" aria-hidden="true">
        <rect x="6" y="30" width="108" height="40" rx="6" className="node" />
        <text x="16" y="48" className="lbl">request</text>
        <text x="16" y="62" className="tiny">approved change</text>
        <path d="M114 50 H124" className="edge hot" />
        <rect x="126" y="30" width="108" height="40" rx="6" className="node hot" />
        <text x="136" y="48" className="lbl">unlock</text>
        <text x="136" y="62" className="tiny">Key Vault</text>
        <path d="M234 50 H244" className="edge hot" />
        <rect x="246" y="30" width="108" height="40" rx="6" className="node ok" />
        <text x="256" y="48" className="lbl">session</text>
        <text x="256" y="62" className="tiny">time-boxed</text>
        <path d="M354 50 H364" className="edge" />
        <rect x="366" y="30" width="108" height="40" rx="6" className="node" />
        <text x="376" y="48" className="lbl">lock</text>
        <text x="376" y="62" className="tiny">on expiry</text>
        <path d="M420 70 V90 H180 V70" className="edge" strokeDasharray="3 3" />
        <text x="196" y="86" className="tiny">reconciler re-locks orphans</text>
      </svg>
      <svg className="d d-tall" viewBox="0 0 360 276" aria-hidden="true">
        <rect x="20" y="14" width="240" height="44" rx="6" className="node" />
        <text x="32" y="33" className="lbl">request</text>
        <text x="32" y="48" className="tiny">approved change</text>
        <path d="M140 58 V76" className="edge hot" />
        <rect x="20" y="76" width="240" height="44" rx="6" className="node hot" />
        <text x="32" y="95" className="lbl">unlock</text>
        <text x="32" y="110" className="tiny">Key Vault</text>
        <path d="M140 120 V138" className="edge hot" />
        <rect x="20" y="138" width="240" height="44" rx="6" className="node ok" />
        <text x="32" y="157" className="lbl">session</text>
        <text x="32" y="172" className="tiny">time-boxed</text>
        <path d="M140 182 V200" className="edge" />
        <rect x="20" y="200" width="240" height="44" rx="6" className="node" />
        <text x="32" y="219" className="lbl">lock</text>
        <text x="32" y="234" className="tiny">on expiry</text>
        <path d="M260 222 H300 V160 H262" className="edge" strokeDasharray="3 3" />
        <text x="20" y="268" className="tiny">reconciler re-locks orphans</text>
      </svg>
    </DiagramFrame>
  )
}
