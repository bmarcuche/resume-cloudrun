'use client'

import { useState, useEffect, useRef } from 'react'
import { SunIcon, MoonIcon, StarIcon } from '@heroicons/react/24/outline'
import { isUnlocked } from '../lib/winner-theme'

type Theme = 'light' | 'dark' | 'winner'

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem('theme', theme)
  } catch {
    /* ignore */
  }
}

const OPTIONS: { value: Theme; label: string; Icon: typeof SunIcon }[] = [
  { value: 'light', label: 'Light', Icon: SunIcon },
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
  { value: 'winner', label: 'Winner', Icon: StarIcon },
]

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')
  const [unlocked, setUnlocked] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const u = isUnlocked()
    setUnlocked(u)
    const resolved: Theme = saved === 'winner' && u ? 'winner' : saved === 'dark' ? 'dark' : 'light'
    setTheme(resolved)
    document.documentElement.setAttribute('data-theme', resolved)
    // A stale 'winner' choice whose cookie has expired falls back to light.
    if (saved === 'winner' && !u) {
      try {
        localStorage.setItem('theme', 'light')
      } catch {
        /* ignore */
      }
    }

    const onWin = () => {
      setUnlocked(true)
      setTheme('winner')
    }
    window.addEventListener('winner-unlocked', onWin)
    return () => window.removeEventListener('winner-unlocked', onWin)
  }, [])

  // Close the popover on an outside click.
  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const choose = (next: Theme) => {
    setTheme(next)
    applyTheme(next)
    setOpen(false)
  }

  // Locked: the original light/dark toggle.
  if (!unlocked) {
    const isDark = theme === 'dark'
    return (
      <button
        onClick={() => choose(isDark ? 'light' : 'dark')}
        className="nav-icon-btn"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
      </button>
    )
  }

  // Unlocked: a small popover offering Light / Dark / Winner.
  const Current = theme === 'winner' ? StarIcon : theme === 'dark' ? MoonIcon : SunIcon
  return (
    <div className="theme-menu" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="nav-icon-btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Choose theme"
        title="Choose theme"
      >
        <Current className="h-5 w-5" />
      </button>
      {open && (
        <div className="theme-menu-pop" role="menu">
          {OPTIONS.map(({ value, label, Icon }) => (
            <button
              key={value}
              role="menuitemradio"
              aria-checked={theme === value}
              className={`theme-menu-item ${theme === value ? 'is-active' : ''}`}
              onClick={() => choose(value)}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
