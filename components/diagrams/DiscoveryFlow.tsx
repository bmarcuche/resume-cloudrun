import DiagramFrame from './DiagramFrame'

// Hosted Environment Navigator: servers -> scheduled discovery -> system of record.
export default function DiscoveryFlow() {
  return (
    <DiagramFrame>
      <svg className="d d-wide" viewBox="0 0 480 110" aria-hidden="true">
        <rect x="6" y="14" width="100" height="26" rx="5" className="node" />
        <text x="16" y="31" className="tiny">server 001</text>
        <rect x="6" y="46" width="100" height="26" rx="5" className="node" />
        <text x="16" y="63" className="tiny">server 002</text>
        <rect x="6" y="78" width="100" height="26" rx="5" className="node" />
        <text x="16" y="95" className="tiny">server n</text>
        <path d="M106 27 H134 V59 M106 59 H134 M106 91 H134 V59 H154" className="edge" />
        <rect x="156" y="36" width="110" height="46" rx="6" className="node hot" />
        <text x="166" y="55" className="lbl">discovery</text>
        <text x="166" y="70" className="tiny">scheduled</text>
        <path d="M266 59 H290" className="edge hot" />
        <rect x="292" y="36" width="180" height="46" rx="6" className="node" />
        <text x="302" y="55" className="lbl">system of record</text>
        <text x="302" y="70" className="tiny">JSONB, 224 routes</text>
      </svg>
      <svg className="d d-tall" viewBox="0 0 360 190" aria-hidden="true">
        <rect x="10" y="10" width="105" height="28" rx="5" className="node" />
        <text x="20" y="28" className="tiny">server 001</text>
        <rect x="127" y="10" width="105" height="28" rx="5" className="node" />
        <text x="137" y="28" className="tiny">server 002</text>
        <rect x="245" y="10" width="105" height="28" rx="5" className="node" />
        <text x="255" y="28" className="tiny">server n</text>
        <path d="M62 38 V54 H298 V38 M180 38 V70" className="edge" />
        <rect x="110" y="72" width="140" height="44" rx="6" className="node hot" />
        <text x="122" y="91" className="lbl">discovery</text>
        <text x="122" y="106" className="tiny">scheduled</text>
        <path d="M180 116 V132" className="edge hot" />
        <rect x="60" y="134" width="240" height="44" rx="6" className="node" />
        <text x="72" y="153" className="lbl">system of record</text>
        <text x="72" y="168" className="tiny">JSONB, 224 routes</text>
      </svg>
    </DiagramFrame>
  )
}
