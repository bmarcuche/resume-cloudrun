import { SITE } from './site'
import { resumeData } from './resume-data'

describe('site constants', () => {
  it('names the PDF for the Platform Architect role', () => {
    expect(SITE.pdfName).toBe('Bruno Marcuche Platform Architect Resume.pdf')
    expect(SITE.pdfPath).toBe('/resume/bruno_marcuche_resume.pdf')
    expect(SITE.navCaption).toBe('platform architect')
  })
  it('resume tagline is Platform Architect', () => {
    expect(resumeData.tagline).toBe('Platform Architect')
    expect(resumeData.summary).toMatch(/^Platform Architect/)
    expect(resumeData.summary).not.toMatch(/Open to/)
  })
  it('thesis has no headcount and no availability line', () => {
    expect(SITE.thesis).not.toMatch(/five|team of/i)
    expect(SITE.thesis).not.toMatch(/Open to/)
  })
})
