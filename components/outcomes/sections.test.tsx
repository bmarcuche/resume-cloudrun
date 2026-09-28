import { render, screen } from '@testing-library/react'
import ImpactStrip from './ImpactStrip'
import SystemsSection from '../systems/SystemsSection'
import PracticeSection from '../practice/PracticeSection'

describe('ImpactStrip', () => {
  it('shows before/after lead times with to-scale bars', () => {
    const { container } = render(<ImpactStrip />)
    expect(screen.getByText(/was ~27 days/)).toBeInTheDocument()
    const bars = container.querySelectorAll('.out-bar')
    expect(bars.length).toBe(2)
    const [before, after] = Array.from(bars[0].querySelectorAll('i')).map((i) => parseFloat((i as HTMLElement).style.width))
    expect(after / before).toBeCloseTo(3 / 27, 1)
  })
  it('scopes DORA lead time to the two bar cards only', () => {
    render(<ImpactStrip />)
    expect(screen.getByRole('heading', { name: 'What changed after launch' })).toBeInTheDocument()
    expect(screen.getByText(/two lead-time cards/)).toBeInTheDocument()
  })
  it('lives inside the agent platform card and nowhere else', () => {
    const { container } = render(<SystemsSection />)
    const strips = container.querySelectorAll('#outcomes')
    expect(strips.length).toBe(1)
    expect(strips[0].closest('article')!.id).toBe('system-agent-platform')
    // Spans the full card width below the text and the figure
    expect(strips[0].closest('.sys-after')).not.toBeNull()
  })
  it('the agent card does not repeat the pipelines and hours stat from the strip', () => {
    const { container } = render(<SystemsSection />)
    const bullets = container.querySelector('#system-agent-platform .sys-outcomes')!.textContent!
    expect(bullets).not.toMatch(/426 hours/)
  })
})

describe('PracticeSection', () => {
  it('renders four principles without headcount', () => {
    render(<PracticeSection />)
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4)
    expect(screen.queryByText(/five engineers|five-person/i)).toBeNull()
  })
})
