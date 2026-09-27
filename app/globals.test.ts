import { readFileSync } from 'fs'
import { join } from 'path'

const css = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8')

function block(selector: string): string {
  const start = css.indexOf(selector + ' {')
  expect(start).toBeGreaterThan(-1)
  const end = css.indexOf('\n}', start)
  return css.slice(start, end)
}

const NEW_TOKENS = ['--canvas', '--panel', '--panel-2', '--band', '--line', '--line-strong', '--ink', '--body', '--muted', '--accent', '--accent-ink', '--accent-soft', '--hero', '--hero-2', '--ok', '--warn']
const ALIASES = ['--primary-bg', '--card-bg', '--border-color', '--text-headline', '--text-body', '--text-muted', '--hero-bg', '--accent-teal', '--accent-dark', '--button-primary']

describe('design tokens', () => {
  it.each([':root', '[data-theme="dark"]', '[data-theme="winner"]'])('%s defines every token and alias', (sel) => {
    const b = block(sel)
    for (const t of [...NEW_TOKENS, ...ALIASES]) expect(b).toContain(t + ':')
  })
  it('light canvas is tinted, not white', () => {
    expect(block(':root')).toContain('--canvas: #E9EEF5')
    expect(block(':root')).not.toMatch(/--canvas: #fff/i)
  })
  it('winner theme keeps its palette', () => {
    const w = block('[data-theme="winner"]')
    expect(w).toContain('--canvas: #CFE8FF')
    expect(w).toContain('--accent: #E11D48')
    expect(w).toContain('--hero: #1F6FD0')
  })
  it('fonts come from next/font variables', () => {
    expect(css).toContain('font-family: var(--font-body)')
    expect(css).toContain('font-family: var(--font-display)')
    expect(css).toContain('font-family: var(--font-mono)')
  })
  it('has no horizontal scroll containers', () => {
    expect(css).not.toMatch(/overflow-x:\s*auto/)
  })
})
