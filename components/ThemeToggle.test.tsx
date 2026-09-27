import { fireEvent, render, screen, act } from '@testing-library/react'
import ThemeToggle from './ThemeToggle'

describe('ThemeToggle', () => {
  afterEach(() => {
    document.cookie = 'winner_unlock=; max-age=0; path=/'
    document.documentElement.removeAttribute('data-theme')
    localStorage.clear()
  })

  it('flips between light and dark when the winner theme is locked', () => {
    render(<ThemeToggle />)
    const btn = screen.getByRole('button', { name: 'Switch to dark mode' })
    fireEvent.click(btn)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    fireEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }))
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('offers Light, Dark and Winner once unlocked', () => {
    document.cookie = 'winner_unlock=1; path=/'
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button', { name: 'Choose theme' }))
    expect(screen.getAllByRole('menuitemradio')).toHaveLength(3)
    fireEvent.click(screen.getByRole('menuitemradio', { name: 'Winner' }))
    expect(document.documentElement.getAttribute('data-theme')).toBe('winner')
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('drops a stale winner choice when the cookie has expired', () => {
    localStorage.setItem('theme', 'winner')
    render(<ThemeToggle />)
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('switches to winner when the game fires winner-unlocked', () => {
    render(<ThemeToggle />)
    act(() => {
      window.dispatchEvent(new Event('winner-unlocked'))
    })
    expect(screen.getByRole('button', { name: 'Choose theme' })).toBeInTheDocument()
  })
})
