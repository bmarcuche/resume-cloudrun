import { resumeData } from './resume-data'
import { collectStrings } from './disclosure'

// The resume carries only figures measured from the systems themselves (Platform
// Impact Brief, 2026-09-28). Unverified claims stay off until confirmed.
describe('resume figures', () => {
  const all = collectStrings(resumeData).join(' ')
  it('drops figures the brief could not verify', () => {
    expect(all).not.toMatch(/10,000\+|~89%|27 days|12 days|\b235\b|\b213\b|\b426\b|99\.99|config-deletion|cut MTTR/)
  })
  it('uses the measured figures for the platforms built at the current employer', () => {
    expect(all).toMatch(/40,000\+ routed requests/)
    expect(all).toMatch(/83%/)
    expect(all).toMatch(/Sentry/)
    expect(all).toMatch(/GhostWatch/)
    expect(all).toMatch(/1,100\+ time-boxed grants/)
  })
  it('does not expose the environment: no fleet, database or customer counts, products or vendor', () => {
    expect(all).not.toMatch(/1,117|\b555\b|\b236\b|customers across|Oracle|\bFA\b|\bM5\b|\bEAM\b|WinRM|Zendesk/)
  })
})
