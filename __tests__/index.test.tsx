import { render, screen } from '@testing-library/react'
import Home from '../app/page'

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('contains resume content', () => {
    render(<Home />)
    // Add specific tests based on your resume content
    // Example: expect(screen.getByText('Bruno Marcuche')).toBeInTheDocument()
  })

  it('shows site architecture link', () => {
    render(<Home />)
    expect(screen.getByRole('link', { name: /site architecture/i })).toBeInTheDocument()
  })

  it('has proper meta tags', () => {
    render(<Home />)
    // Test for SEO and meta information
  })
})
