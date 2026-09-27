import { metadata } from './layout'

describe('layout metadata', () => {
  it('positions the site as Platform Architect', () => {
    expect(metadata.title).toBe('Bruno Marcuche, Platform Architect')
    expect(String(metadata.description)).toMatch(/Platform Architect/)
    expect(String(metadata.description)).not.toMatch(/SRE and AIOPs/)
  })
})
