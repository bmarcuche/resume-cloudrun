import DiagramFrame from './DiagramFrame'

// Sentry: databases, web servers and report servers -> remote collectors ->
// Postgres (raw and rollups) -> one console, with an OpenTelemetry branch to Azure.
export default function SentryFlow() {
  return (
    <DiagramFrame>
      <svg className="d d-wide" viewBox="0 0 480 132" aria-hidden="true">
        <rect x="6" y="8" width="96" height="24" rx="5" className="node" />
        <text x="14" y="24" className="tiny">databases</text>
        <rect x="6" y="38" width="96" height="24" rx="5" className="node" />
        <text x="14" y="54" className="tiny">web servers</text>
        <rect x="6" y="68" width="96" height="24" rx="5" className="node" />
        <text x="14" y="84" className="tiny">report servers</text>
        <path d="M102 20 H112 V50 M102 50 H112 M102 80 H112 V50 H120" className="edge" />
        <rect x="122" y="28" width="112" height="44" rx="6" className="node hot" />
        <text x="132" y="47" className="lbl">collectors</text>
        <text x="132" y="62" className="tiny">remote, 2-10 min</text>
        <path d="M234 50 H252" className="edge hot" />
        <rect x="254" y="28" width="100" height="44" rx="6" className="node" />
        <text x="264" y="47" className="lbl">Postgres</text>
        <text x="264" y="62" className="tiny">raw + rollups</text>
        <path d="M354 50 H372" className="edge hot" />
        <rect x="374" y="28" width="100" height="44" rx="6" className="node" />
        <text x="384" y="47" className="lbl">console</text>
        <text x="384" y="62" className="tiny">health, web</text>
        <path d="M178 72 V90" className="edge" />
        <rect x="122" y="92" width="112" height="36" rx="6" className="node" />
        <text x="132" y="108" className="lbl">Azure</text>
        <text x="132" y="121" className="tiny">OpenTelemetry</text>
      </svg>
      <svg className="d d-tall" viewBox="0 0 360 250" aria-hidden="true">
        <rect x="10" y="10" width="105" height="28" rx="5" className="node" />
        <text x="20" y="28" className="tiny">databases</text>
        <rect x="127" y="10" width="105" height="28" rx="5" className="node" />
        <text x="137" y="28" className="tiny">web servers</text>
        <rect x="245" y="10" width="105" height="28" rx="5" className="node" />
        <text x="255" y="28" className="tiny">report servers</text>
        <path d="M62 38 V54 H298 V38 M180 38 V70" className="edge" />
        <rect x="110" y="72" width="140" height="44" rx="6" className="node hot" />
        <text x="122" y="91" className="lbl">collectors</text>
        <text x="122" y="106" className="tiny">remote, 2-10 min</text>
        <path d="M180 116 V132" className="edge hot" />
        <rect x="110" y="134" width="140" height="44" rx="6" className="node" />
        <text x="122" y="153" className="lbl">Postgres</text>
        <text x="122" y="168" className="tiny">raw + rollups</text>
        <path d="M180 178 V194" className="edge hot" />
        <rect x="110" y="196" width="140" height="44" rx="6" className="node" />
        <text x="122" y="215" className="lbl">console</text>
        <text x="122" y="230" className="tiny">health, web</text>
        <path d="M250 94 H270" className="edge" />
        <rect x="272" y="72" width="80" height="44" rx="6" className="node" />
        <text x="282" y="91" className="lbl">Azure</text>
        <text x="282" y="106" className="tiny">OTel</text>
      </svg>
    </DiagramFrame>
  )
}
