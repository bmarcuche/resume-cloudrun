import DiagramFrame from './DiagramFrame'

// HypeScroll: sources -> feed service (local models score) -> Postgres -> API ->
// reader, with a dashed loop from human review back into the models.
export default function HypeScrollFlow() {
  return (
    <DiagramFrame>
      <svg className="d d-wide" viewBox="0 0 480 146" aria-hidden="true">
        <rect x="6" y="20" width="96" height="44" rx="6" className="node" />
        <text x="16" y="39" className="lbl">sources</text>
        <text x="16" y="55" className="tiny">RSS, scrapers</text>
        <path d="M102 42 H120" className="edge hot" />
        <rect x="122" y="20" width="128" height="44" rx="6" className="node hot" />
        <text x="132" y="39" className="lbl">feed service</text>
        <text x="132" y="55" className="tiny">local models</text>
        <path d="M250 42 H268" className="edge hot" />
        <rect x="270" y="20" width="92" height="44" rx="6" className="node" />
        <text x="280" y="39" className="lbl">Postgres</text>
        <text x="280" y="55" className="tiny">scored</text>
        <path d="M362 42 H380" className="edge hot" />
        <rect x="382" y="20" width="92" height="44" rx="6" className="node" />
        <text x="392" y="39" className="lbl">API</text>
        <text x="392" y="55" className="tiny">rank, mix</text>
        <path d="M428 64 V96" className="edge hot" />
        <rect x="362" y="98" width="112" height="40" rx="6" className="node" />
        <text x="372" y="116" className="lbl">reader</text>
        <text x="372" y="130" className="tiny">mobile web</text>
        <rect x="122" y="98" width="128" height="40" rx="6" className="node" />
        <text x="132" y="116" className="lbl">human review</text>
        <text x="132" y="130" className="tiny">MCP + Claude Code</text>
        <path d="M186 98 V64" className="edge" strokeDasharray="3 3" />
        <text x="194" y="84" className="tiny">labels retrain</text>
      </svg>
      <svg className="d d-tall" viewBox="0 0 360 282" aria-hidden="true">
        <rect x="10" y="8" width="150" height="40" rx="6" className="node" />
        <text x="22" y="26" className="lbl">sources</text>
        <text x="22" y="40" className="tiny">RSS, scrapers</text>
        <path d="M85 48 V62" className="edge hot" />
        <rect x="10" y="64" width="150" height="40" rx="6" className="node hot" />
        <text x="22" y="82" className="lbl">feed service</text>
        <text x="22" y="96" className="tiny">local models</text>
        <path d="M85 104 V118" className="edge hot" />
        <rect x="10" y="120" width="150" height="40" rx="6" className="node" />
        <text x="22" y="138" className="lbl">Postgres</text>
        <text x="22" y="152" className="tiny">scored</text>
        <path d="M85 160 V174" className="edge hot" />
        <rect x="10" y="176" width="150" height="40" rx="6" className="node" />
        <text x="22" y="194" className="lbl">API</text>
        <text x="22" y="208" className="tiny">rank, mix</text>
        <path d="M85 216 V230" className="edge hot" />
        <rect x="10" y="232" width="150" height="40" rx="6" className="node" />
        <text x="22" y="250" className="lbl">reader</text>
        <text x="22" y="264" className="tiny">mobile web</text>
        <rect x="200" y="64" width="150" height="40" rx="6" className="node" />
        <text x="212" y="82" className="lbl">human review</text>
        <text x="212" y="96" className="tiny">MCP + Claude Code</text>
        <path d="M200 84 H160" className="edge" strokeDasharray="3 3" />
        <text x="212" y="122" className="tiny">labels retrain</text>
      </svg>
    </DiagramFrame>
  )
}
