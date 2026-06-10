// Pure game logic for the mobile "Tech Strands" board. No React, no DOM, so the
// rules can be unit-tested in isolation. The component layer renders state and
// reacts to the returned event (e.g. firing the celebration toast).

export interface GameTile {
  name: string
  category: string
}

export interface GameState {
  /** Category labels that have been fully solved (locked in). */
  solved: string[]
  /** Tile names selected in the current, in-progress attempt. */
  streak: string[]
  /** Category the current streak is committed to, or null when idle. */
  targetCategory: string | null
}

export type TapEvent =
  | { kind: 'none' } // tap ignored (tile in an already-solved category)
  | { kind: 'select' } // tile added to the streak (start or continue)
  | { kind: 'deselect' } // tile removed from the streak
  | { kind: 'reset' } // wrong-category tap, current streak cleared
  | { kind: 'solved'; category: string } // a category was completed
  | { kind: 'won' } // the final category was completed

export function initGame(): GameState {
  return { solved: [], streak: [], targetCategory: null }
}

/**
 * Apply a tile tap.
 *
 * @param totalCategories how many categories must be solved to win
 * @param categorySize    number of tiles in a given category
 */
export function tapTile(
  state: GameState,
  tile: GameTile,
  totalCategories: number,
  categorySize: (category: string) => number,
): { state: GameState; event: TapEvent } {
  // Tiles in a solved category are inert.
  if (state.solved.includes(tile.category)) {
    return { state, event: { kind: 'none' } }
  }

  // Tapping a tile already in the streak removes it.
  if (state.streak.includes(tile.name)) {
    const streak = state.streak.filter((n) => n !== tile.name)
    return {
      state: { ...state, streak, targetCategory: streak.length ? state.targetCategory : null },
      event: { kind: 'deselect' },
    }
  }

  const idle = state.streak.length === 0
  const matchesTarget = tile.category === state.targetCategory

  // Valid add: either starting a fresh streak or continuing the right category.
  if (idle || matchesTarget) {
    const target = idle ? tile.category : (state.targetCategory as string)
    const streak = [...state.streak, tile.name]

    if (streak.length === categorySize(target)) {
      const solved = [...state.solved, target]
      const won = solved.length === totalCategories
      return {
        state: { solved, streak: [], targetCategory: null },
        event: won ? { kind: 'won' } : { kind: 'solved', category: target },
      }
    }

    return { state: { ...state, streak, targetCategory: target }, event: { kind: 'select' } }
  }

  // Wrong category: clear the current streak only, keep solved categories.
  return { state: { ...state, streak: [], targetCategory: null }, event: { kind: 'reset' } }
}
