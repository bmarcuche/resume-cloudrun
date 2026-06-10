import { initGame, tapTile, type GameTile } from './tech-game'

// Fixture: 3 categories of differing sizes.
const TILES: GameTile[] = [
  { name: 'A1', category: 'A' },
  { name: 'A2', category: 'A' },
  { name: 'B1', category: 'B' },
  { name: 'B2', category: 'B' },
  { name: 'B3', category: 'B' },
  { name: 'C1', category: 'C' },
  { name: 'C2', category: 'C' },
]
const SIZES: Record<string, number> = { A: 2, B: 3, C: 2 }
const total = 3
const size = (c: string) => SIZES[c]
const tile = (name: string) => TILES.find((t) => t.name === name)!

// Convenience: tap a sequence of tile names, returning the final result.
function play(names: string[]) {
  let state = initGame()
  let last = tapTile(state, tile(names[0]), total, size)
  state = last.state
  for (const n of names.slice(1)) {
    last = tapTile(state, tile(n), total, size)
    state = last.state
  }
  return last
}

describe('tech-game reducer', () => {
  it('starts empty', () => {
    const s = initGame()
    expect(s.solved).toEqual([])
    expect(s.streak).toEqual([])
    expect(s.targetCategory).toBeNull()
  })

  it('starts a streak on the first tap and sets the target category', () => {
    const { state, event } = play(['A1'])
    expect(event.kind).toBe('select')
    expect(state.streak).toEqual(['A1'])
    expect(state.targetCategory).toBe('A')
  })

  it('solves a category when all its tiles are tapped', () => {
    const { state, event } = play(['A1', 'A2'])
    expect(event).toEqual({ kind: 'solved', category: 'A' })
    expect(state.solved).toEqual(['A'])
    expect(state.streak).toEqual([])
    expect(state.targetCategory).toBeNull()
  })

  it('resets only the current streak on a wrong-category tap', () => {
    const { state, event } = play(['B1', 'A1'])
    expect(event.kind).toBe('reset')
    expect(state.streak).toEqual([])
    expect(state.targetCategory).toBeNull()
    expect(state.solved).toEqual([])
  })

  it('keeps solved categories when a later streak resets', () => {
    // Solve A, start B, then tap C1 (wrong for B) -> reset, A stays solved.
    const { state, event } = play(['A1', 'A2', 'B1', 'C1'])
    expect(event.kind).toBe('reset')
    expect(state.solved).toEqual(['A'])
    expect(state.streak).toEqual([])
  })

  it('deselects a tile already in the streak', () => {
    const { state, event } = play(['B1', 'B2', 'B1'])
    expect(event.kind).toBe('deselect')
    expect(state.streak).toEqual(['B2'])
    expect(state.targetCategory).toBe('B')
  })

  it('clears the target when the last streak tile is deselected', () => {
    const { state, event } = play(['B1', 'B1'])
    expect(event.kind).toBe('deselect')
    expect(state.streak).toEqual([])
    expect(state.targetCategory).toBeNull()
  })

  it('ignores taps on tiles in already-solved categories', () => {
    const { state, event } = play(['A1', 'A2', 'A1'])
    expect(event.kind).toBe('none')
    expect(state.solved).toEqual(['A'])
    expect(state.streak).toEqual([])
  })

  it('emits won when the final category is solved', () => {
    const { state, event } = play(['A1', 'A2', 'B1', 'B2', 'B3', 'C1', 'C2'])
    expect(event.kind).toBe('won')
    expect(state.solved).toEqual(['A', 'B', 'C'])
  })

  it('solves a single-tile category immediately', () => {
    const oneTile: GameTile[] = [{ name: 'Z1', category: 'Z' }]
    const r = tapTile(initGame(), oneTile[0], 1, () => 1)
    expect(r.event.kind).toBe('won')
    expect(r.state.solved).toEqual(['Z'])
  })
})
