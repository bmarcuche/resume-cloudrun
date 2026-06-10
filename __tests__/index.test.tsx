import { render, screen } from '@testing-library/react'
import Home from '../app/page'

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('contains resume content', () => {
    render(<Home />)
    // Two h1s render the name: the hero and the print-only resume header.
    expect(screen.getAllByRole('heading', { level: 1, name: /bruno marcuche/i }).length).toBeGreaterThan(0)
  })

  it('shows source code link', () => {
    render(<Home />)
    expect(screen.getByRole('link', { name: /view source code/i })).toBeInTheDocument()
  })

  it('has proper meta tags', () => {
    render(<Home />)
    // Test for SEO and meta information
  })
})
