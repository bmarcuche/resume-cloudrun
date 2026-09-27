import { render, screen } from '@testing-library/react'
import SystemsSection from './SystemsSection'

describe('SystemsSection', () => {
  it('renders the four systems with status pills and metrics', () => {
    render(<SystemsSection />)
    expect(screen.getByRole('heading', { level: 2, name: 'Systems I own' })).toBeInTheDocument()
    for (const name of ['Internal AI agent platform', 'GhostWatch', 'Hosted Environment Navigator', 'Hosted Access Manager']) {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument()
    }
    expect(screen.getByText('Self-healing in pilot')).toHaveClass('pill-warn')
    expect(screen.getByText('0.81')).toBeInTheDocument()
  })
  it('renders an icon inside every stack tag and wraps tags', () => {
    const { container } = render(<SystemsSection />)
    const tags = container.querySelectorAll('.stack-tag')
    expect(tags.length).toBeGreaterThan(10)
    tags.forEach((tag) => expect(tag.querySelector('svg')).not.toBeNull())
    expect(container.querySelector('.stack')).not.toBeNull()
  })
  it('alternates figure side', () => {
    const { container } = render(<SystemsSection />)
    const rows = container.querySelectorAll('article.sys')
    expect(rows[0]).not.toHaveClass('sys-flip')
    expect(rows[1]).toHaveClass('sys-flip')
  })
})
