import { render, screen } from '@testing-library/react'
import ProjectsSection from './ProjectsSection'

describe('ProjectsSection', () => {
  it('renders HypeScroll with its status pills, live link and diagram', () => {
    const { container } = render(<ProjectsSection />)
    expect(container.querySelector('section#projects')).not.toBeNull()
    expect(screen.getByRole('heading', { level: 3, name: 'HypeScroll' })).toBeInTheDocument()
    expect(screen.getByText('Side project')).toHaveClass('pill-info')
    const link = screen.getByRole('link', { name: /hypescroll\.io/ })
    expect(link).toHaveAttribute('href', 'https://hypescroll.io')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(container.querySelector('#system-hypescroll svg.d-wide')).not.toBeNull()
    expect(container.querySelector('#system-hypescroll svg.d-tall')).not.toBeNull()
  })
})
