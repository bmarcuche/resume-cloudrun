import { render, screen, fireEvent } from '@testing-library/react'
import TechTileGame from './TechTileGame'
import { TECH_CATEGORIES } from '../../lib/tech-data'

// Click every tile in a category (order within a category does not matter).
function solveCategory(items: { name: string }[]) {
  for (const item of items) {
    fireEvent.click(screen.getByRole('button', { name: item.name }))
  }
}

describe('TechTileGame integration', () => {
  afterEach(() => {
    document.cookie = 'winner_unlock=; max-age=0; path=/'
    document.documentElement.removeAttribute('data-theme')
    localStorage.clear()
  })

  it('unlocks the winner theme after every category is solved', () => {
    render(<TechTileGame />)
    TECH_CATEGORIES.forEach((category) => solveCategory(category.items))

    expect(document.documentElement.getAttribute('data-theme')).toBe('winner')
    expect(document.cookie).toContain('winner_unlock=')
    expect(localStorage.getItem('theme')).toBe('winner')
  })

  it('resets only the current streak on a wrong tap, keeping solved categories', () => {
    render(<TechTileGame />)
    const [first, second, third] = TECH_CATEGORIES

    solveCategory(first.items) // fully solve the first category
    fireEvent.click(screen.getByRole('button', { name: second.items[0].name })) // start the second
    fireEvent.click(screen.getByRole('button', { name: third.items[0].name })) // wrong category -> reset

    // First category stays solved; the in-progress second-category tile is cleared.
    expect(
      screen.getByRole('button', { name: first.items[0].name }).getAttribute('aria-pressed'),
    ).toBe('true')
    expect(
      screen.getByRole('button', { name: second.items[0].name }).getAttribute('aria-pressed'),
    ).toBe('false')
    expect(document.documentElement.getAttribute('data-theme')).not.toBe('winner')
  })
})
