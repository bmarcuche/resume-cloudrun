import { systems, projects } from './systems-data'
import { collectStrings, findViolations } from './disclosure'

const text = (list: typeof systems) =>
  collectStrings(list.map(({ stack, ...rest }) => ({ ...rest, stack: stack.map((i) => i.name) })))

describe('systems data', () => {
  it('lists the five work systems in order', () => {
    expect(systems.map((s) => s.id)).toEqual(['agent-platform', 'ghostwatch', 'sentry', 'hen', 'ham'])
  })
  it('every system has a diagram, metrics, and an icon on every stack item', () => {
    for (const s of [...systems, ...projects]) {
      expect(['router', 'ghostwatch', 'sentry', 'discovery', 'access', 'hypescroll']).toContain(s.diagram)
      expect(s.metrics.length).toBeGreaterThanOrEqual(2)
      // fromBrand returns a function; heroicons are forwardRef exotic objects
      for (const item of s.stack) expect(['function', 'object']).toContain(typeof item.Icon)
    }
  })
  it('every system and project has a what-changed strip of two to four cause and effect items', () => {
    for (const s of [...systems, ...projects]) {
      expect(s.impact).toBeDefined()
      expect(s.impact!.items.length).toBeGreaterThanOrEqual(2)
      expect(s.impact!.items.length).toBeLessThanOrEqual(4)
      for (const i of s.impact!.items) {
        // The note carries the cause; keep it to one short sentence
        expect(i.note.length).toBeLessThanOrEqual(120)
        if (i.bar) expect(i.bar.max).toBeGreaterThanOrEqual(Math.max(i.bar.before, i.bar.after))
      }
    }
  })
  it('a strip never repeats a number already shown in its metric tiles', () => {
    for (const s of [...systems, ...projects]) {
      const tiles = new Set(s.metrics.map((m) => m.value))
      for (const i of s.impact!.items) expect(tiles.has(i.value)).toBe(false)
    }
  })
  it('carries the measured dates and statuses from the impact brief', () => {
    const by = (id: string) => systems.find((s) => s.id === id)!
    expect(by('agent-platform').status.map((s) => s.label)).toContain('Since 03/2026')
    expect(by('ghostwatch').status).toEqual([{ label: 'Receiver live', tone: 'ok' }, { label: 'SRE hand-off built, gated off', tone: 'warn' }])
    expect(by('sentry').status.map((s) => s.label)).toEqual(['In production', 'Since 08/2026'])
    expect(by('hen').status.map((s) => s.label)).toContain('Since 11/2025')
    expect(by('ham').status.map((s) => s.label)).toContain('Since 04/2026')
    // Claims the brief measured as wrong must be gone
    const all = text(systems).join(' ')
    expect(all).not.toMatch(/95%\+|under 5%|<5%|Since 12\/2024|Self-healing in pilot|\b224\b|250\+ sessions/)
  })
  it('states the GhostWatch early-warning result as the replay measured it, not as a general outage rate', () => {
    const gw = systems.find((s) => s.id === 'ghostwatch')!
    const item = gw.impact!.items.find((i) => i.value === '17 of 21')!
    expect(item.from).toMatch(/replayed/)
    expect(item.note).toMatch(/75 minutes/)
  })
  it('publishes no figure the impact brief could not verify', () => {
    const all = text([...systems]).join(' ')
    expect(all).not.toMatch(/9 of 10|Nine in ten|permanent credentials|whole database estate|0\.81|27 days|12 days|\b426\b|\b235\b|\b213\b|99\.99|lead time/)
  })
  it('is clean under the disclosure policy', () => {
    expect(findViolations(text(systems))).toEqual([])
  })
  it('does not expose the company: no fleet or customer counts, products, database vendor or protocols', () => {
    const all = text([...systems, ...projects]).join(' ')
    expect(all).not.toMatch(/Oracle|\bSIDs?\b|\bFA\b|\bM5\b|\bEAM\b|Crystal|MaxQueue|Zendesk|WinRM|sqlplus|NCPA|AssetWorks/)
    expect(all).not.toMatch(/1,117|\b555\b|\b236\b|\b342\b|\b364\b|\b341\b|\b319\b|\b129\b|customers/)
    // Agent counts drift; the platform is described as multi-agent
    expect(all).not.toMatch(/\b19\b|\d+\s+(specialist|specialized)\s+agents/)
  })
  it('lists HypeScroll as a live side project with its own diagram and a link', () => {
    expect(projects.map((p) => p.id)).toEqual(['hypescroll'])
    const hs = projects[0]
    expect(hs.diagram).toBe('hypescroll')
    expect(hs.status.map((s) => s.label)).toEqual(['Live', 'Side project'])
    expect(hs.link).toEqual({ href: 'https://hypescroll.io', label: 'hypescroll.io' })
  })
  it('projects are clean under the disclosure policy and publish no infrastructure details', () => {
    const t = text(projects)
    expect(findViolations(t)).toEqual([])
    const joined = t.join(' ')
    // No addresses, buckets, ports, credentials or bot-wall tooling
    expect(joined).not.toMatch(/\d+\.\d+\.\d+\.\d+|gs:\/\/|:\d{4}\b|postgres\/postgres|Puppeteer|stealth/i)
    // Source and commit counts drift; describe them, never count them
    expect(joined).not.toMatch(/\d+\s+(sources|feeds|commits)/)
  })
  it('mentions no team headcount', () => {
    expect(collectStrings(systems).join(' ')).not.toMatch(/five-person|team of five|engineers? across/)
  })
})
