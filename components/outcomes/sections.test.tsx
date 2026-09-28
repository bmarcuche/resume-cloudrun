import { render, screen } from '@testing-library/react'
import ImpactStrip from './ImpactStrip'
import SystemsSection from '../systems/SystemsSection'
import PracticeSection from '../practice/PracticeSection'

describe('ImpactStrip', () => {
  const items = [
    { from: 'requested access hours', value: '67%', unit: 'actually used', note: 'Grants expire on a timer.', bar: { before: 100, after: 67, max: 100 } },
    { from: 'config files copied', value: 'None', unit: '', note: 'Read live.' },
  ]
  it('renders effect, cause and a to-scale bar', () => {
    const { container } = render(<ImpactStrip id="x-impact" lede="Why." items={items} />)
    expect(screen.getByRole('heading', { name: 'What changed' })).toBeInTheDocument()
    expect(screen.getByText('Grants expire on a timer.')).toBeInTheDocument()
    const bars = container.querySelectorAll('.out-bar')
    expect(bars.length).toBe(1)
    const [before, after] = Array.from(bars[0].querySelectorAll('i')).map((i) => parseFloat((i as HTMLElement).style.width))
    expect(after / before).toBeCloseTo(0.67, 2)
    // An empty unit renders no stray <small>
    expect(container.querySelectorAll('.out-to small').length).toBe(1)
  })
  it('a strip sits full width inside its own card, and only on cards with a measured change', () => {
    const { container } = render(<SystemsSection />)
    const withStrip = Array.from(container.querySelectorAll('article.sys'))
      .filter((card) => card.querySelector('.sys-after .impact'))
      .map((card) => card.id)
    expect(withStrip).toEqual(['system-agent-platform', 'system-ghostwatch', 'system-ham'])
  })
})

describe('PracticeSection', () => {
  it('renders four principles without headcount', () => {
    render(<PracticeSection />)
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4)
    expect(screen.queryByText(/five engineers|five-person/i)).toBeNull()
  })
})
