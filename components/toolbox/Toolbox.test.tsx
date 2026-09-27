import { render, screen } from '@testing-library/react'
import Toolbox from './Toolbox'
import { TECH_CATEGORIES } from '../../lib/tech-data'

describe('Toolbox', () => {
  it('renders every category as a group with iconed tags', () => {
    const { container } = render(<Toolbox />)
    expect(screen.getByRole('heading', { level: 2, name: 'Toolbox' })).toBeInTheDocument()
    expect(container.querySelectorAll('.tools-group').length).toBe(TECH_CATEGORIES.length)
    const tags = container.querySelectorAll('.tools-tag')
    expect(tags.length).toBe(TECH_CATEGORIES.reduce((n, c) => n + c.items.length, 0))
    tags.forEach((t) => expect(t.querySelector('svg')).not.toBeNull())
  })
  it('includes the mobile game', () => {
    render(<Toolbox />)
    expect(screen.getByText(/Tap tiles that belong together/)).toBeInTheDocument()
  })
})
