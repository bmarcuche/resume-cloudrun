import { systems } from './systems-data'
import { collectStrings, findViolations } from './disclosure'

describe('systems data', () => {
  it('lists the four systems in order', () => {
    expect(systems.map((s) => s.id)).toEqual(['agent-platform', 'ghostwatch', 'hen', 'ham'])
  })
  it('every system has a diagram, metrics, and an icon on every stack item', () => {
    for (const s of systems) {
      expect(['router', 'ghostwatch', 'discovery', 'access']).toContain(s.diagram)
      expect(s.metrics.length).toBeGreaterThanOrEqual(2)
      // fromBrand returns a function; heroicons are forwardRef exotic objects
      for (const item of s.stack) expect(['function', 'object']).toContain(typeof item.Icon)
    }
  })
  it('GhostWatch carries live and pilot statuses', () => {
    const gw = systems.find((s) => s.id === 'ghostwatch')!
    expect(gw.status).toEqual([{ label: 'Detection live', tone: 'ok' }, { label: 'Self-healing in pilot', tone: 'warn' }])
  })
  it('is clean under the disclosure policy', () => {
    const strings = collectStrings(systems.map(({ stack, ...rest }) => ({ ...rest, stack: stack.map((i) => i.name) })))
    expect(findViolations(strings)).toEqual([])
  })
  it('mentions no team headcount', () => {
    expect(collectStrings(systems).join(' ')).not.toMatch(/five-person|team of five/)
  })
})
