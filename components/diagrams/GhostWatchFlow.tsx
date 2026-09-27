import DiagramFrame from './DiagramFrame'

// GhostWatch: detect -> plan -> build -> investigate, with a dashed self-healing loop.
export default function GhostWatchFlow() {
  return (
    <DiagramFrame>
      <svg className="d d-wide" viewBox="0 0 480 120" aria-hidden="true">
        <text x="6" y="16" className="tiny">live</text>
        <text x="126" y="16" className="tiny">live</text>
        <text x="246" y="16" className="tiny">live</text>
        <text x="366" y="16" className="tiny">in progress</text>
        <rect x="6" y="30" width="108" height="44" rx="6" className="node ok" />
        <text x="16" y="49" className="lbl">detect</text>
        <text x="16" y="64" className="tiny">classifier</text>
        <path d="M114 52 H124" className="edge" />
        <rect x="126" y="30" width="108" height="44" rx="6" className="node ok" />
        <text x="136" y="49" className="lbl">plan</text>
        <text x="136" y="64" className="tiny">LLM on Foundry</text>
        <path d="M234 52 H244" className="edge" />
        <rect x="246" y="30" width="108" height="44" rx="6" className="node ok" />
        <text x="256" y="49" className="lbl">build</text>
        <text x="256" y="64" className="tiny">exporters, ADX</text>
        <path d="M354 52 H364" className="edge" />
        <rect x="366" y="30" width="108" height="44" rx="6" className="node" />
        <text x="376" y="49" className="lbl">investigate</text>
        <text x="376" y="64" className="tiny">Azure SRE Agent</text>
        <path d="M420 74 V98 H60 V74" className="edge" strokeDasharray="3 3" />
        <text x="150" y="112" className="tiny">self-healing loop, in pilot</text>
      </svg>
      <svg className="d d-tall" viewBox="0 0 360 272" aria-hidden="true">
        <rect x="20" y="14" width="240" height="44" rx="6" className="node ok" />
        <text x="32" y="33" className="lbl">detect</text>
        <text x="32" y="48" className="tiny">classifier</text>
        <text x="272" y="41" className="tiny">live</text>
        <path d="M140 58 V76" className="edge" />
        <rect x="20" y="76" width="240" height="44" rx="6" className="node ok" />
        <text x="32" y="95" className="lbl">plan</text>
        <text x="32" y="110" className="tiny">LLM on Foundry</text>
        <text x="272" y="103" className="tiny">live</text>
        <path d="M140 120 V138" className="edge" />
        <rect x="20" y="138" width="240" height="44" rx="6" className="node ok" />
        <text x="32" y="157" className="lbl">build</text>
        <text x="32" y="172" className="tiny">exporters, ADX</text>
        <text x="272" y="165" className="tiny">live</text>
        <path d="M140 182 V200" className="edge" />
        <rect x="20" y="200" width="240" height="44" rx="6" className="node" />
        <text x="32" y="219" className="lbl">investigate</text>
        <text x="32" y="234" className="tiny">Azure SRE Agent</text>
        <text x="272" y="227" className="tiny">in progress</text>
        <path d="M20 222 H8 V36 H20" className="edge" strokeDasharray="3 3" />
        <text x="20" y="264" className="tiny">self-healing loop, in pilot</text>
      </svg>
    </DiagramFrame>
  )
}
