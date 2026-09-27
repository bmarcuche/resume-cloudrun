import DiagramFrame from './DiagramFrame'

// Semantic router: prompt -> keyword or neural path -> route -> agents, with a
// dashed retraining loop from the LLM fallback back to the neural path.
export default function RouterFlow() {
  return (
    <DiagramFrame>
      <svg className="d d-wide" viewBox="0 0 480 150" aria-hidden="true">
        <rect x="6" y="56" width="76" height="36" rx="6" className="node" />
        <text x="18" y="78" className="lbl">prompt</text>
        <path d="M82 74 H104" className="edge hot" />
        <path d="M104 74 V36 H106 M104 74 V112 H106" className="edge hot" />
        <rect x="106" y="18" width="110" height="36" rx="6" className="node" />
        <text x="118" y="40" className="lbl">keyword path</text>
        <text x="112" y="78" className="tiny">deterministic?</text>
        <rect x="106" y="94" width="110" height="36" rx="6" className="node hot" />
        <text x="118" y="116" className="lbl">neural path</text>
        <path d="M216 36 H238 V74 M216 112 H238 V74 H258" className="edge hot" />
        <rect x="260" y="56" width="76" height="36" rx="6" className="node hot" />
        <text x="272" y="78" className="lbl">route</text>
        <path d="M336 74 H358" className="edge hot" />
        <path d="M358 74 V43 H370 M358 74 V107 H370" className="edge hot" />
        <rect x="372" y="30" width="100" height="26" rx="5" className="node" />
        <text x="382" y="47" className="tiny">agent 1</text>
        <rect x="372" y="62" width="100" height="26" rx="5" className="node" />
        <text x="382" y="79" className="tiny">agent n</text>
        <rect x="372" y="94" width="100" height="26" rx="5" className="node" />
        <text x="382" y="111" className="tiny">LLM fallback</text>
        <path d="M422 120 V142 H161 V131" className="edge" strokeDasharray="3 3" />
        <text x="176" y="146" className="tiny">corrections retrain the router</text>
      </svg>
      <svg className="d d-tall" viewBox="0 0 360 300" aria-hidden="true">
        <rect x="130" y="8" width="100" height="32" rx="6" className="node" />
        <text x="150" y="29" className="lbl">prompt</text>
        <path d="M180 40 V56 H90 V70 M180 56 H270 V70" className="edge hot" />
        <text x="188" y="53" className="tiny">deterministic?</text>
        <rect x="20" y="72" width="140" height="36" rx="6" className="node" />
        <text x="32" y="95" className="lbl">keyword path</text>
        <rect x="200" y="72" width="140" height="36" rx="6" className="node hot" />
        <text x="212" y="95" className="lbl">neural path</text>
        <path d="M90 108 V124 H270 V108 M180 124 V138" className="edge hot" />
        <rect x="130" y="140" width="100" height="32" rx="6" className="node hot" />
        <text x="150" y="161" className="lbl">route</text>
        <path d="M180 172 V188 H60 V202 M180 188 H300 V202 M180 188 V202" className="edge hot" />
        <rect x="10" y="204" width="100" height="30" rx="5" className="node" />
        <text x="22" y="223" className="tiny">agent 1</text>
        <rect x="130" y="204" width="100" height="30" rx="5" className="node" />
        <text x="142" y="223" className="tiny">agent n</text>
        <rect x="250" y="204" width="100" height="30" rx="5" className="node" />
        <text x="262" y="223" className="tiny">LLM fallback</text>
        <path d="M300 234 V268 H352 V90 H340" className="edge" strokeDasharray="3 3" />
        <text x="14" y="290" className="tiny">corrections retrain the router</text>
      </svg>
    </DiagramFrame>
  )
}
