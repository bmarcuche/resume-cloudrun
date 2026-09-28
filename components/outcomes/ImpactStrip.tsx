import type { ImpactItem } from '../../lib/systems-data'

// "What changed" strip at the foot of a system card. Each item reads as effect
// (value, unit) with its cause in the note. Bars, where present, are to scale.
export default function ImpactStrip({ id, lede, items }: { id: string; lede: string; items: ImpactItem[] }) {
  return (
    <div id={id} className="impact">
      <h4 className="impact-h">What changed</h4>
      <p className="impact-lede">{lede}</p>
      <div className="out-grid">
        {items.map((o) => (
          <div key={o.from} className="out">
            <div className="out-from">{o.from}</div>
            <div className="out-to">
              {o.value}
              {o.unit && <small>{o.unit}</small>}
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
  )
}
