import { render } from '@testing-library/react'
import { DIAGRAMS } from './index'
import PlatformMap from './PlatformMap'

describe('diagrams', () => {
  it.each(Object.keys(DIAGRAMS))('%s renders a wide and a tall SVG', (key) => {
    const C = DIAGRAMS[key as keyof typeof DIAGRAMS]
    const { container } = render(<C />)
    expect(container.querySelector('svg.d-wide')).not.toBeNull()
    expect(container.querySelector('svg.d-tall')).not.toBeNull()
    const tall = container.querySelector('svg.d-tall')!
    expect(Number(tall.getAttribute('viewBox')!.split(' ')[2])).toBeLessThanOrEqual(360)
  })
  it('platform map has an accessible title in both variants', () => {
    const { container } = render(<PlatformMap />)
    expect(container.querySelectorAll('svg.map title').length).toBe(2)
    expect(container.querySelector('svg.map title')!.textContent).toMatch(/Platform map/)
  })
})
