// Persistence for the unlocked "winner" theme. The unlock lives in a cookie with a
// 24-hour max-age so it invalidates on its own; the chosen theme itself is stored in
// localStorage (light | dark | winner) and is only honored while this cookie is valid.

export const UNLOCK_COOKIE = 'winner_unlock'
const MAX_AGE_SECONDS = 60 * 60 * 24 // 24 hours

/** Mark the winner theme as unlocked for the next 24 hours. */
export function setUnlocked(): void {
  if (typeof document === 'undefined') return
  document.cookie = `${UNLOCK_COOKIE}=1; max-age=${MAX_AGE_SECONDS}; path=/; SameSite=Lax`
}

/** Whether a valid (non-expired) unlock cookie is present. */
export function isUnlocked(): boolean {
  if (typeof document === 'undefined') return false
  return document.cookie.split('; ').some((c) => c.startsWith(`${UNLOCK_COOKIE}=`))
}

/** Remove the unlock cookie (used when reverting). */
export function clearUnlocked(): void {
  if (typeof document === 'undefined') return
  document.cookie = `${UNLOCK_COOKIE}=; max-age=0; path=/; SameSite=Lax`
}
