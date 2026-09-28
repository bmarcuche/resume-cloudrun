import { systems, projects } from './systems-data'
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
  it('lists HypeScroll as a live side project with its own diagram and a link', () => {
    expect(projects.map((p) => p.id)).toEqual(['hypescroll'])
    const hs = projects[0]
    expect(hs.diagram).toBe('hypescroll')
    expect(hs.status.map((s) => s.label)).toEqual(['Live', 'Side project'])
    expect(hs.link).toEqual({ href: 'https://hypescroll.io', label: 'hypescroll.io' })
    expect(hs.metrics.length).toBeGreaterThanOrEqual(2)
  })
  it('projects are clean under the disclosure policy and publish no infrastructure details', () => {
    const text = collectStrings(projects.map(({ stack, ...rest }) => ({ ...rest, stack: stack.map((i) => i.name) })))
    expect(findViolations(text)).toEqual([])
    const joined = text.join(' ')
    // No addresses, buckets, ports, credentials or bot-wall tooling
    expect(joined).not.toMatch(/\d+\.\d+\.\d+\.\d+|gs:\/\/|:\d{4}\b|postgres\/postgres|Puppeteer|stealth/i)
    // Source and commit counts drift; describe them, never count them
    expect(joined).not.toMatch(/\d+\s+(sources|feeds|commits)/)
  })
  it('mentions no team headcount', () => {
    expect(collectStrings(systems).join(' ')).not.toMatch(/five-person|team of five/)
  })
})
