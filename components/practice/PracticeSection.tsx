import { practice } from '../../lib/practice-data'

export default function PracticeSection() {
  return (
    <section id="practice" className="pa-section">
      <div className="pa-wrap">
        <h2 className="pa-h2">How I work</h2>
        <div className="practice-grid">
          {practice.map((p) => (
            <div key={p.title}>
              <h3 className="pa-h3">{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
