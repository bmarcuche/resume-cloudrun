import { resumeData } from './resume-data'
import { collectStrings } from './disclosure'

// The resume carries only figures measured from the systems themselves.
// Unverified claims stay off until confirmed.
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
    expect(all).toMatch(/self-service in about a minute/)
    expect(all).toMatch(/from 40 to 11 days/)
  })
  it('does not expose the environment: no fleet, database or customer counts, products or vendor', () => {
    // Count patterns, not the counts themselves: this file is public too
    expect(all).not.toMatch(/\d[\d,]*\+?\s+(hosts|servers|databases|customers|tenants)\b/)
    expect(all).not.toMatch(/Oracle|WinRM|Zendesk/)
  })
})
