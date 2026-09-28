import { render, screen } from '@testing-library/react'
import Home from '../app/page'

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('no network in tests'))
})
afterEach(() => jest.restoreAllMocks())

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders the sections in order', () => {
    const { container } = render(<Home />)
    const ids = Array.from(container.querySelectorAll('section[id], header[id]')).map((el) => el.id)
    expect(ids).toEqual(['top', 'systems', 'projects', 'practice', 'experience', 'toolbox', 'deploys', 'resume'])
  })

  it('has no Current Setup or Projects sections', () => {
    render(<Home />)
    expect(screen.queryByText('Current Setup')).toBeNull()
    expect(screen.queryByText(/Things I.ve Built/)).toBeNull()
  })

  it('keeps the printable resume in the DOM', () => {
    const { container } = render(<Home />)
    expect(container.querySelector('.resume-document')).not.toBeNull()
  })

  it('shows source link in the footer', () => {
    render(<Home />)
    expect(screen.getByRole('link', { name: /source on github/i })).toHaveAttribute('href', 'https://github.com/bmarcuche/resume-cloudrun')
  })
})
