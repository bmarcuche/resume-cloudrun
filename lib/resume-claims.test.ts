import { resumeData } from './resume-data'
import { collectStrings } from './disclosure'

// The resume carries only figures measured from the systems themselves, written
// as cause and effect. Unverified claims stay off until confirmed.
describe('resume figures', () => {
  const all = collectStrings(resumeData).join(' ')
  const current = resumeData.experience.slice(0, 2).flatMap((e) => e.bullets)

  it('drops figures that were never verified', () => {
    expect(all).not.toMatch(/10,000\+|~89%|27 days|12 days|\b235\b|\b213\b|\b426\b|99\.99|config-deletion|cut MTTR/)
  })
  it('uses the measured figures for the platforms built at the current employer', () => {
    for (const re of [/85%/, /98\.6%/, /from 40 to 11 days/, /89%/, /92% of hangs/, /107 minutes/, /2\.7x/, /99\.6%/, /about a minute/, /354 outages/]) {
      expect(all).toMatch(re)
    }
  })
  it('replaces superseded figures', () => {
    expect(all).not.toMatch(/83%|17 of 21|75 minutes|18 live signal feeds|1,200\+ tests/)
  })
  it('writes every current-role result as cause and effect', () => {
    // Each bullet that carries a number says what was done and what it changed
    for (const b of current.filter((b) => /\d/.test(b) && !/team of five/.test(b))) {
      expect(b).toMatch(/\bso\b|, cutting|: /)
    }
  })
  it('does not expose the environment: no fleet size, downtime, products or vendor', () => {
    // Size patterns, not the sizes themselves: this file is public too. Outcome
    // counts (a two-digit number of affected databases) are allowed; a fleet size
    // written as ~N, N+, or a three-digit-plus number of hosts is not.
    expect(all).not.toMatch(/(~\d[\d,]*|\d[\d,]*\+|\d{3,}[\d,]*)\s+(hosts|servers|databases|customers|tenants|accounts)\b/)
    expect(all).not.toMatch(/\bTB\b|hours of reports down|customer ticket|found by users/)
    expect(all).not.toMatch(/Oracle|WinRM|Zendesk/)
  })
})
