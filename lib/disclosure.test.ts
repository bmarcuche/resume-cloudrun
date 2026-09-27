import { BANNED, collectStrings, findViolations } from './disclosure'
import { resumeData } from './resume-data'
import { metadata } from '../app/layout'

describe('disclosure policy', () => {
  it('collects nested strings', () => {
    expect(collectStrings({ a: 'x', b: ['y', { c: 'z' }], d: 3 })).toEqual(['x', 'y', 'z'])
  })
  it('finds a banned term', () => {
    expect(findViolations(['fleet of 350+ servers'])).toEqual([{ text: 'fleet of 350+ servers', term: '350' }])
  })
  it('resume data is clean', () => {
    expect(findViolations(collectStrings(resumeData))).toEqual([])
  })
  it('page metadata is clean', () => {
    expect(findViolations(collectStrings(metadata))).toEqual([])
  })
  it('banned list is the one from the spec', () => {
    expect(BANNED).toEqual(['350', '150+', 'government', 'FA-EAM', 'FA/EAM', 'Oracle SID', 'WinRM', 'Zendesk', 'DigiCert', 'Bastion', 'CAB or Jira', '32 servers', '561-284', 'Open to'])
  })
})
