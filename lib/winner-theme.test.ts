import { setUnlocked, isUnlocked, clearUnlocked, UNLOCK_COOKIE } from './winner-theme'

describe('winner-theme cookie', () => {
  afterEach(() => {
    clearUnlocked()
  })

  it('reports locked by default', () => {
    expect(isUnlocked()).toBe(false)
  })

  it('reports unlocked after setUnlocked', () => {
    setUnlocked()
    expect(isUnlocked()).toBe(true)
    expect(document.cookie).toContain(`${UNLOCK_COOKIE}=`)
  })

  it('reports locked again after clearUnlocked', () => {
    setUnlocked()
    clearUnlocked()
    expect(isUnlocked()).toBe(false)
  })
})
