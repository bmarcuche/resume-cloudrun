import { render, screen } from '@testing-library/react'
import OutcomesSection from './OutcomesSection'
import PracticeSection from '../practice/PracticeSection'

describe('OutcomesSection', () => {
  it('shows before/after lead times with to-scale bars', () => {
    const { container } = render(<OutcomesSection />)
    expect(screen.getByText(/was ~27 days/)).toBeInTheDocument()
    const bars = container.querySelectorAll('.out-bar')
    expect(bars.length).toBe(2)
    const [before, after] = Array.from(bars[0].querySelectorAll('i')).map((i) => parseFloat((i as HTMLElement).style.width))
    expect(after / before).toBeCloseTo(3 / 27, 1)
  })
})

describe('PracticeSection', () => {
  it('renders four principles without headcount', () => {
    render(<PracticeSection />)
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4)
    expect(screen.queryByText(/five engineers|five-person/i)).toBeNull()
  })
})
