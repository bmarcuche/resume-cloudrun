import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { metadata } from './layout'

describe('layout metadata', () => {
  it('positions the site as Platform Architect', () => {
    expect(metadata.title).toBe('Bruno Marcuche, Platform Architect')
    expect(String(metadata.description)).toMatch(/Platform Architect/)
    expect(String(metadata.description)).not.toMatch(/SRE and AIOPs/)
  })
})

describe('fonts', () => {
  const src = readFileSync(join(process.cwd(), 'app/layout.tsx'), 'utf8')
  it('loads fonts from vendored files, never from Google at build time', () => {
    expect(src).not.toContain('next/font/google')
    expect(src).toContain('next/font/local')
    for (const f of ['Archivo-Variable.woff2', 'IBMPlexSans-400.woff2', 'IBMPlexSans-500.woff2', 'IBMPlexSans-600.woff2', 'IBMPlexMono-400.woff2', 'IBMPlexMono-500.woff2']) {
      expect(existsSync(join(process.cwd(), 'app/fonts', f))).toBe(true)
    }
  })
})
