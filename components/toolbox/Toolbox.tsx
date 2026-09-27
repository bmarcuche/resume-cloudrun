import { TECH_CATEGORIES } from '../../lib/tech-data'
import TechTileGame from '../tech-game/TechTileGame'

// Desktop: grouped lists with brand icons. Mobile: the grouping game over the
// same items (the game's own wrapper is md:hidden). One data source for both.
export default function Toolbox() {
  return (
    <section id="toolbox" className="pa-section" style={{ paddingTop: 0 }}>
      <div className="pa-wrap">
        <h2 className="pa-h2">Toolbox</h2>
        <div className="tools hidden md:grid">
          {TECH_CATEGORIES.map((cat) => (
            <div key={cat.label} className="tools-group">
              <h4>{cat.label}</h4>
              <ul>
                {cat.items.map((item) => (
                  <li key={item.name} className="tools-tag">
                    <item.Icon aria-hidden="true" />
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <TechTileGame />
      </div>
    </section>
  )
}
