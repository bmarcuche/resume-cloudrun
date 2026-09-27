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

// Every label must sit inside the box drawn just before it. Width is estimated
// from IBM Plex Mono's advance (about 0.6em per character).
function labelOverflows(svg: Element): string[] {
  const out: string[] = []
  const vbWidth = Number(svg.getAttribute('viewBox')!.split(' ')[2])
  let box: { x: number; right: number } | null = null
  for (const el of Array.from(svg.children)) {
    if (el.tagName === 'rect') {
      const x = Number(el.getAttribute('x'))
      box = { x, right: x + Number(el.getAttribute('width')) }
    } else if (el.tagName === 'text') {
      const size = el.classList.contains('tiny') ? 10 : el.classList.contains('lbl') ? 11.5 : 11.5
      const x = Number(el.getAttribute('x'))
      const end = x + (el.textContent ?? '').length * 0.6 * size
      if (end > vbWidth - 2) out.push(`${el.textContent} exceeds viewBox (${end.toFixed(0)} > ${vbWidth})`)
      if (box && x >= box.x && x < box.right && end > box.right - 2) out.push(`${el.textContent} exceeds its box (${end.toFixed(0)} > ${box.right})`)
    } else if (el.tagName === 'defs' || el.tagName === 'title') {
      continue
    } else {
      box = null
    }
  }
  return out
}

describe('diagram labels fit their boxes', () => {
  it.each(Object.keys(DIAGRAMS))('%s', (key) => {
    const C = DIAGRAMS[key as keyof typeof DIAGRAMS]
    const { container } = render(<C />)
    for (const svg of Array.from(container.querySelectorAll('svg'))) expect(labelOverflows(svg)).toEqual([])
  })
  it('platform map', () => {
    const { container } = render(<PlatformMap />)
    for (const svg of Array.from(container.querySelectorAll('svg'))) expect(labelOverflows(svg)).toEqual([])
  })
})
