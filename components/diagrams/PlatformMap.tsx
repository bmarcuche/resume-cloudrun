import DiagramFrame from './DiagramFrame'

// The hero platform map. Always sits on the hero gradient, so its colors are the
// fixed light-on-dark set in globals.css (.map ...), not the theme tokens.
const TITLE =
  'Platform map: signals flow into a semantic router, out to specialist agents, and onto the hosted platform. GhostWatch watches it and feeds incidents back in.'

function Markers({ prefix }: { prefix: string }) {
  return (
    <defs>
      <marker id={`${prefix}-hot`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0.5 8 4 0 7.5z" fill="#7FA6FF" />
      </marker>
      <marker id={`${prefix}-ok`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0.5 8 4 0 7.5z" fill="#3FC48E" />
      </marker>
      <marker id={`${prefix}-dim`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0.5 8 4 0 7.5z" fill="rgba(175,192,220,.7)" />
      </marker>
    </defs>
  )
}

export default function PlatformMap() {
  return (
    <DiagramFrame>
      <svg className="map d d-wide" viewBox="0 0 560 330" role="img" aria-labelledby="map-wide-title">
        <title id="map-wide-title">{TITLE}</title>
        <Markers prefix="mw" />
        <text x="12" y="22" className="tiny">requests</text>
        <rect x="12" y="34" width="118" height="30" rx="6" className="node" />
        <text x="22" y="53" className="lbl">engineers</text>
        <rect x="12" y="76" width="118" height="30" rx="6" className="node" />
        <text x="22" y="95" className="lbl">CI / pipelines</text>
        <rect x="12" y="118" width="118" height="30" rx="6" className="node" />
        <text x="22" y="137" className="lbl">incidents</text>
        <path d="M130 49 H172 V91 M130 91 H172 M130 133 H172 V91" className="edge" />
        <path d="M172 91 H206" className="edge hot" markerEnd="url(#mw-hot)" />
        <rect x="208" y="52" width="176" height="78" rx="8" className="node hot" />
        <text x="222" y="76" className="lbl">semantic router</text>
        <text x="222" y="93" className="tiny">bi-encoder + cross-encoder</text>
        <text x="222" y="107" className="tiny">pgvector retrieval, &lt;100ms</text>
        <text x="222" y="121" className="tiny">MCP tool gateway</text>
        <path d="M384 91 H394" className="edge hot" markerEnd="url(#mw-hot)" />
        <rect x="396" y="40" width="152" height="100" rx="8" className="node hot" />
        <text x="408" y="62" className="lbl">specialist agents</text>
        <text x="408" y="80" className="tiny">deploy  cloud  CI/CD</text>
        <text x="408" y="94" className="tiny">access  data  monitor</text>
        <text x="408" y="108" className="tiny">incident  os  network</text>
        <rect x="12" y="186" width="536" height="126" rx="10" className="band" />
        <text x="24" y="206" className="tiny">hosted platform, multi-tenant</text>
        <path d="M472 140 V182" className="edge hot" markerEnd="url(#mw-hot)" />
        <text x="480" y="166" className="tiny">act</text>
        <rect x="24" y="220" width="150" height="72" rx="8" className="node" />
        <text x="36" y="242" className="lbl">HEN</text>
        <text x="36" y="258" className="tiny">fleet system of record</text>
        <text x="36" y="272" className="tiny">continuous discovery</text>
        <rect x="196" y="220" width="150" height="72" rx="8" className="node" />
        <text x="208" y="242" className="lbl">HAM</text>
        <text x="208" y="258" className="tiny">just-in-time access</text>
        <text x="208" y="272" className="tiny">0 standing credentials</text>
        <rect x="368" y="220" width="168" height="72" rx="8" className="node ok" />
        <text x="380" y="240" className="lbl">GhostWatch</text>
        <text x="380" y="256" className="tiny">detect, plan, build,</text>
        <text x="380" y="270" className="tiny">investigate</text>
        <text x="380" y="284" className="tiny">Foundry + Azure SRE Agent</text>
        <path d="M452 220 V172 H100 V150" className="edge ok" markerEnd="url(#mw-ok)" />
        <text x="250" y="168" className="tiny">incidents feed back in</text>
        <path d="M174 256 H190 V120 H206" className="edge" markerEnd="url(#mw-dim)" />
        <text x="140" y="304" className="tiny">HEN supplies fleet context to the router</text>
      </svg>
      <svg className="map d d-tall" viewBox="0 0 360 566" role="img" aria-labelledby="map-tall-title">
        <title id="map-tall-title">{TITLE}</title>
        <Markers prefix="mt" />
        <text x="12" y="16" className="tiny">requests</text>
        <rect x="12" y="22" width="108" height="30" rx="6" className="node" />
        <text x="22" y="41" className="lbl">engineers</text>
        <rect x="126" y="22" width="108" height="30" rx="6" className="node" />
        <text x="136" y="41" className="lbl">CI pipelines</text>
        <rect x="240" y="22" width="108" height="30" rx="6" className="node" />
        <text x="250" y="41" className="lbl">incidents</text>
        <path d="M66 52 V64 H294 V52 M180 52 V64" className="edge" />
        <path d="M180 64 V78" className="edge hot" markerEnd="url(#mt-hot)" />
        <rect x="30" y="80" width="300" height="70" rx="8" className="node hot" />
        <text x="44" y="102" className="lbl">semantic router</text>
        <text x="44" y="120" className="tiny">bi-encoder + cross-encoder, pgvector retrieval</text>
        <text x="44" y="136" className="tiny">&lt;100 ms, MCP tool gateway</text>
        <path d="M180 150 V166" className="edge hot" markerEnd="url(#mt-hot)" />
        <rect x="30" y="168" width="300" height="76" rx="8" className="node hot" />
        <text x="44" y="190" className="lbl">specialist agents</text>
        <text x="44" y="208" className="tiny">deploy  cloud  pipelines  access  database</text>
        <text x="44" y="222" className="tiny">monitoring  incident  windows  linux</text>
        <path d="M180 244 V270" className="edge hot" markerEnd="url(#mt-hot)" />
        <text x="188" y="262" className="tiny">act</text>
        <rect x="12" y="272" width="336" height="284" rx="10" className="band" />
        <text x="24" y="292" className="tiny">hosted platform, multi-tenant</text>
        <rect x="30" y="302" width="300" height="52" rx="8" className="node" />
        <text x="44" y="322" className="lbl">HEN</text>
        <text x="44" y="340" className="tiny">fleet system of record, continuous discovery</text>
        <rect x="30" y="366" width="300" height="52" rx="8" className="node" />
        <text x="44" y="386" className="lbl">HAM</text>
        <text x="44" y="404" className="tiny">just-in-time access, 0 standing credentials</text>
        <rect x="30" y="430" width="300" height="64" rx="8" className="node ok" />
        <text x="44" y="450" className="lbl">GhostWatch</text>
        <text x="44" y="468" className="tiny">detect, plan, build, investigate</text>
        <text x="44" y="482" className="tiny">Foundry + Azure SRE Agent</text>
        <path d="M30 462 H18 V115 H28" className="edge ok" markerEnd="url(#mt-ok)" />
        <path d="M330 328 H342 V125 H332" className="edge" markerEnd="url(#mt-dim)" />
        <text x="44" y="522" className="tiny">GhostWatch incidents feed back into the router</text>
        <text x="44" y="540" className="tiny">HEN supplies fleet context to the router</text>
      </svg>
    </DiagramFrame>
  )
}
