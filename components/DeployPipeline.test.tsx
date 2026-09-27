import { act, render, screen } from '@testing-library/react'
import DeployPipeline from './DeployPipeline'

describe('DeployPipeline', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('lights every step and the live URL as the animation runs', () => {
    render(<DeployPipeline />)
    expect(screen.getByText('Git Commit')).toBeInTheDocument()
    expect(screen.getByText('resume.mindtunnel.org')).toBeInTheDocument()
    act(() => {
      jest.advanceTimersByTime(560 * 12)
    })
    expect(document.querySelectorAll('.dp-node.is-on').length).toBe(6)
    expect(document.querySelector('.dp-url')).toHaveClass('is-done')
  })

  it('skips the animation when reduced motion is preferred', () => {
    const original = window.matchMedia
    window.matchMedia = (() => ({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() })) as unknown as typeof window.matchMedia
    render(<DeployPipeline />)
    expect(document.querySelectorAll('.dp-node.is-on').length).toBe(6)
    window.matchMedia = original
  })
})
