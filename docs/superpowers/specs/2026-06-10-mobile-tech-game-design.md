# Mobile "Tech Strands" Game + Winner Theme

**Date:** 2026-06-10
**Status:** Approved design, pending spec review

## Summary

Turn the **mobile** Core Technologies tile grid into a Strands-style grouping game.
The player taps tiles to assemble each hidden category; solving all six categories
unlocks a celebratory **winner** theme (retro arcade: sky-blue canvas, coin-gold
accents, drifting yellow star SVGs). The unlock is persisted in a 24-hour cookie and
becomes a third option in the theme toggle. Desktop and the Current Setup section are
untouched.

## Goals

- Add a tap-to-group game over the existing mobile Core Technologies tiles, with no
  visual restyle of the tiles themselves (progressive enhancement).
- Celebrate each solved category with a transient footer toast that does not block
  navigation, then fades.
- On full completion, unlock and auto-apply a new "winner" theme.
- Persist the unlock for 24 hours via cookie; expose it as a third theme option;
  revert and re-lock on expiry.

## Non-goals

- No game on desktop (categorized cards already reveal the groupings).
- No game on the Current Setup section.
- No server-side state. Everything is client-side (in-memory progress + one cookie).
- No persistence of partial progress across reloads (only the final unlock persists).

## Scope decisions (confirmed with user)

| Decision | Choice |
| --- | --- |
| Playable sections | Core Technologies only (6 categories). Current Setup stays static. |
| Wrong-tap reset | Clears the current streak only. Already-solved categories persist. |
| Cookie expiry | Revert and re-lock: winner option removed; if active, fall back to light. |
| Winner theme vibe | Retro arcade (sky-blue + coin-gold + drifting yellow stars, readable cards). |
| Auto-apply on win | Yes, apply winner immediately on win (plus the toggle gains the option). |
| Toggle UX when unlocked | Small popover with Light / Dark / Winner. Locked = today's light/dark toggle. |

## Architecture

### Components and modules

- **`lib/tech-game.ts`** (pure, unit-tested)
  - The game reducer and types. No React, no DOM.
  - State shape:
    ```ts
    interface GameState {
      solved: string[]          // solved category labels
      streak: string[]          // tile names selected in the current attempt
      targetCategory: string | null  // category of the first tile in the streak
    }
    type TapEvent =
      | { kind: 'none' }
      | { kind: 'deselect' }
      | { kind: 'reset' }
      | { kind: 'solved'; category: string }
      | { kind: 'won' }
    function initGame(): GameState
    function tapTile(
      state: GameState,
      tile: { name: string; category: string },
      totalCategories: number,
      categorySize: (category: string) => number,
    ): { state: GameState; event: TapEvent }
    ```
  - Rules:
    - Tap with empty streak: start streak, set `targetCategory` to the tile's category.
    - Tap a tile already in the streak: remove it (`deselect`).
    - Tap a tile whose category equals `targetCategory`: add to streak. If the streak
      now covers every tile in that category, move the category into `solved`, clear the
      streak, emit `solved` (or `won` if `solved.length === totalCategories`).
    - Tap a tile whose category differs from `targetCategory`: clear the streak, keep
      `solved`, emit `reset`.
    - Taps on tiles in already-solved categories are ignored (`none`).

- **`lib/winner-theme.ts`** (util, unit-tested)
  - `UNLOCK_COOKIE = 'winner_unlock'`, 24h max-age.
  - `setUnlocked()`: writes the cookie with `max-age=86400; path=/; SameSite=Lax`.
  - `isUnlocked(): boolean`: reads the cookie (browser) for a valid unlock.
  - Used by `ThemeToggle` and referenced by the pre-paint script logic.

- **`components/tech-game/TechTileGame.tsx`** (client)
  - Replaces the mobile tile grid for Core Technologies (the `md:hidden` grid).
  - Receives `categories: TechCategory[]`.
  - On mount: builds a flattened tile list `{ name, category, Icon }`, **shuffles once**
    (stable via `useState(() => shuffle(...))`), holds `GameState` via `useReducer`.
  - Renders tiles using the existing `.tech-tile` markup/classes plus state classes:
    - in current streak: `.is-selected` (accent ring + soft fill)
    - in a solved category: `.is-solved` (locked, soft fill, small star badge)
  - On each tap, dispatches `tapTile`; surfaces the returned event to the toast and, on
    `won`, calls `setUnlocked()` + applies `data-theme="winner"` + `localStorage`.

- **`components/tech-game/CelebrationToast.tsx`** (client)
  - Controlled by `TechTileGame`. Shows a queued message with a star icon, auto-dismiss
    after ~3s with a fade. Messages: `⭐ <Category>` per solve; `⭐ New theme unlocked`
    on win.
  - Fixed, bottom-center, positioned above the mobile bottom nav. The `.bottom-nav`
    is a fixed bar roughly 3.5rem tall plus `env(safe-area-inset-bottom)`, so the toast
    sits at `bottom: calc(4.5rem + env(safe-area-inset-bottom))` with a `z-index` below
    the nav (nav is `z-40`; toast `z-30`).
  - Honors `prefers-reduced-motion` (no slide, instant show/hide).

- **`components/ThemeToggle.tsx`** (client, extended)
  - Locked: unchanged light/dark toggle button.
  - Unlocked (`isUnlocked()`): button opens a small popover listing Light / Dark /
    Winner; selecting one sets `data-theme` + `localStorage`.
  - Reads unlock state on mount; re-checks when the game dispatches a win (via a custom
    `window` event `winner-unlocked` that `TechTileGame` fires, so the toggle updates
    without a reload).

### Page wiring

- `app/page.tsx` `TechShowcase`: keep the desktop categorized cards (server-rendered).
  Replace the inline mobile `md:hidden` grid with `<TechTileGame categories={...} />`
  **only for the Core Technologies instance**. The Current Setup instance keeps the
  current static mobile grid.
  - Implementation note: `TechShowcase` currently renders both desktop and mobile for
    any `categories`. Add an optional `game?: boolean` prop; when true, the mobile grid
    is `TechTileGame`, otherwise the existing static grid. Core Technologies passes
    `game`; Current Setup does not.

### Theme + pre-paint

- `app/globals.css`: add `[data-theme="winner"]` variable block (sky-blue surfaces,
  coin-gold/red accents, readable white cards), the star background layer, the drift
  keyframes (reduced-motion guarded), and `.tech-tile.is-selected` / `.is-solved` /
  toast styles.
- `app/layout.tsx`: extend the pre-paint inline script:
  ```js
  (function(){try{
    var t = localStorage.getItem('theme');
    var unlocked = document.cookie.indexOf('winner_unlock=') !== -1;
    var theme = (t === 'winner' && unlocked) ? 'winner' : (t === 'dark' ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  }catch(e){}})();
  ```
  This honors the 24h expiry (cookie gone -> winner downgraded to light) with no flash.

## Winner theme palette (retro arcade)

CSS variables under `[data-theme="winner"]`:

- `--primary-bg`: warm sky blue (e.g. `#bfe3ff` canvas tint) with the star layer over it
- `--card-bg`: white (readability preserved)
- `--accent`: coin gold (`#f2b50a`-ish), `--accent-2`: arcade red
- `--hero-bg`: deeper arcade blue
- text colors kept high-contrast (dark ink on light cards)
- Star background: inline SVG data-URI of a yellow 5-point star, tiled at low density on
  a `position: fixed` decorative layer (`pointer-events: none; z-index: -1`), slow
  vertical drift animation, disabled under reduced motion.

## Game UI states (mobile tiles, no restyle of base tile)

- Default: identical to current `.tech-tile`.
- `.is-selected`: accent ring + soft accent fill (current attempt).
- `.is-solved`: locked, soft fill, small star badge in the corner; not tappable.

## Celebration toast behavior

- Per category solve: `⭐ <Category name>` for ~3s, fade out.
- If solves happen quickly, queue messages so each shows briefly (no overlap).
- Final win: `⭐ New theme unlocked` (slightly more prominent), then the winner theme is
  already applied behind it.

## Error / edge handling

- Cookies disabled: `setUnlocked` no-ops gracefully; winner applies for the session only
  (in-memory), and simply will not persist. No crash.
- Reduced motion: drift + toast animations disabled; instant show/hide.
- Reload mid-game: board restarts (partial progress not persisted) which is acceptable.
- Desktop/winner: if unlocked on mobile then viewed on desktop, the cookie still gates
  the third toggle option and the theme applies site-wide (theme is global). Expected.

## Testing

- `lib/tech-game.test.ts`: start streak, correct add, wrong tap resets streak only,
  deselect, category solve detection, full win detection, ignore taps on solved tiles.
- `lib/winner-theme.test.ts`: cookie set format, isUnlocked true/false, expiry (absent
  cookie -> false).
- Existing `__tests__/index.test.tsx` stays green (game is additive; page still renders).

## Out of scope / future

- Saving partial progress, leaderboards, share links, sound effects.
- A reset/replay button (board resets on reload, which is sufficient for v1).
