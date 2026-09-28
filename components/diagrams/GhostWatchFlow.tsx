import DiagramFrame from './DiagramFrame'

// GhostWatch: receive -> correlate -> build -> investigate. The first two stages
// run live; the telemetry factory and the SRE hand-off are built but gated off.
export default function GhostWatchFlow() {
  return (
    <DiagramFrame>
      <svg className="d d-wide" viewBox="0 0 480 84" aria-hidden="true">
        <text x="6" y="16" className="tiny">live</text>
        <text x="126" y="16" className="tiny">live</text>
        <text x="246" y="16" className="tiny">gated off</text>
        <text x="366" y="16" className="tiny">gated off</text>
        <rect x="6" y="30" width="108" height="44" rx="6" className="node ok" />
        <text x="16" y="49" className="lbl">receive</text>
        <text x="16" y="64" className="tiny">live feeds</text>
        <path d="M114 52 H124" className="edge" />
        <rect x="126" y="30" width="108" height="44" rx="6" className="node ok" />
        <text x="136" y="49" className="lbl">correlate</text>
        <text x="136" y="64" className="tiny">rules, LLM tail</text>
        <path d="M234 52 H244" className="edge" />
        <rect x="246" y="30" width="108" height="44" rx="6" className="node" />
        <text x="256" y="49" className="lbl">build</text>
        <text x="256" y="64" className="tiny">telemetry</text>
        <path d="M354 52 H364" className="edge" />
        <rect x="366" y="30" width="108" height="44" rx="6" className="node" />
        <text x="376" y="49" className="lbl">investigate</text>
        <text x="376" y="64" className="tiny">Azure SRE Agent</text>
      </svg>
      <svg className="d d-tall" viewBox="0 0 360 252" aria-hidden="true">
        <rect x="20" y="14" width="240" height="44" rx="6" className="node ok" />
        <text x="32" y="33" className="lbl">receive</text>
        <text x="32" y="48" className="tiny">live feeds</text>
        <text x="272" y="41" className="tiny">live</text>
        <path d="M140 58 V76" className="edge" />
        <rect x="20" y="76" width="240" height="44" rx="6" className="node ok" />
        <text x="32" y="95" className="lbl">correlate</text>
        <text x="32" y="110" className="tiny">rules first, LLM for the tail</text>
        <text x="272" y="103" className="tiny">live</text>
        <path d="M140 120 V138" className="edge" />
        <rect x="20" y="138" width="240" height="44" rx="6" className="node" />
        <text x="32" y="157" className="lbl">build</text>
        <text x="32" y="172" className="tiny">telemetry factory</text>
        <text x="272" y="165" className="tiny">gated off</text>
        <path d="M140 182 V200" className="edge" />
        <rect x="20" y="200" width="240" height="44" rx="6" className="node" />
        <text x="32" y="219" className="lbl">investigate</text>
        <text x="32" y="234" className="tiny">Azure SRE Agent</text>
        <text x="272" y="227" className="tiny">gated off</text>
      </svg>
    </DiagramFrame>
  )
}
