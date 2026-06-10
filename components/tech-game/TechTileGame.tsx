'use client'

import { useEffect, useMemo, useRef, useState, type ComponentType, type SVGProps } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { TECH_CATEGORIES } from '../../lib/tech-data'
import { initGame, tapTile, type GameState, type GameTile } from '../../lib/tech-game'
import { setUnlocked } from '../../lib/winner-theme'
import CelebrationToast from './CelebrationToast'

type Icon = ComponentType<SVGProps<SVGSVGElement>>
interface Tile extends GameTile {
  Icon: Icon
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Strands-style game over the mobile Core Technologies tiles. Tap tiles to assemble
// each hidden category; solving all of them unlocks the winner theme. Mobile only:
// the wrapper is `md:hidden`, and the desktop categorized cards reveal the groupings.
//
// The category data is imported here rather than passed as a prop: this is a client
// component, and the items carry `Icon` component functions which cannot cross the
// server -> client props boundary.
export default function TechTileGame() {
  const baseTiles = useMemo<Tile[]>(
    () =>
      TECH_CATEGORIES.flatMap((c) =>
        c.items.map((it) => ({ name: it.name, category: c.label, Icon: it.Icon })),
      ),
    [],
  )
  const sizes = useMemo(() => {
    const m: Record<string, number> = {}
    TECH_CATEGORIES.forEach((c) => {
      m[c.label] = c.items.length
    })
    return m
  }, [])
  const total = TECH_CATEGORIES.length

  // Stable order for SSR / first client render, then shuffle after mount to avoid a
  // hydration mismatch.
  const [tiles, setTiles] = useState<Tile[]>(baseTiles)
  useEffect(() => {
    setTiles(shuffle(baseTiles))
  }, [baseTiles])

  const [state, setState] = useState<GameState>(initGame)

  // Toast queue: each solved category shows briefly, then fades, then the next plays.
  const [toast, setToast] = useState({ text: '', finale: false, visible: false })
  const queue = useRef<{ text: string; finale: boolean }[]>([])
  const running = useRef(false)

  const pump = () => {
    if (running.current) return
    const next = queue.current.shift()
    if (!next) return
    running.current = true
    setToast({ ...next, visible: true })
    window.setTimeout(
      () => {
        setToast((t) => ({ ...t, visible: false }))
        window.setTimeout(() => {
          running.current = false
          pump()
        }, 360)
      },
      next.finale ? 3200 : 2400,
    )
  }
  const enqueue = (text: string, finale = false) => {
    queue.current.push({ text, finale })
    pump()
  }

  const onTap = (tile: Tile) => {
    const result = tapTile(state, { name: tile.name, category: tile.category }, total, (c) => sizes[c])
    setState(result.state)
    if (result.event.kind === 'solved') {
      enqueue(result.event.category)
    } else if (result.event.kind === 'won') {
      enqueue('New theme unlocked!', true)
      setUnlocked()
      try {
        localStorage.setItem('theme', 'winner')
      } catch {
        /* storage unavailable: winner applies for this session only */
      }
      document.documentElement.setAttribute('data-theme', 'winner')
      window.dispatchEvent(new Event('winner-unlocked'))
    }
  }

  return (
    <div className="md:hidden">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {tiles.map((tile) => {
          const selected = state.streak.includes(tile.name)
          const solved = state.solved.includes(tile.category)
          return (
            <button
              type="button"
              key={tile.name}
              onClick={() => onTap(tile)}
              className={`tech-tile ${selected ? 'is-selected' : ''} ${solved ? 'is-solved' : ''}`}
              aria-pressed={selected || solved}
            >
              <span className="tech-tile-icon">
                <tile.Icon aria-hidden="true" />
              </span>
              <span className="tech-tile-name">{tile.name}</span>
              {solved && <StarIcon className="tech-tile-star" aria-hidden="true" />}
            </button>
          )
        })}
      </div>
      <CelebrationToast text={toast.text} visible={toast.visible} finale={toast.finale} />
    </div>
  )
}
