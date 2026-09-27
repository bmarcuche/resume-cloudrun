import { readFileSync } from 'fs'
import { join } from 'path'

const css = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8')
const print = css.slice(css.indexOf('@media print {'))

it('print hides every screen section and shows the resume', () => {
  for (const sel of ['.hero-pa', '.status-strip', '#systems', '#outcomes', '#practice', '#experience', '#toolbox', '#deploys', '.site-nav', '.bottom-nav', '.site-footer']) {
    expect(print).toContain(sel)
  }
  expect(print).toContain('.resume-screen-hidden { display: block !important; }')
  expect(print).toContain('.resume-print-only')
})

it('print renders the resume in a font whose text layer extracts cleanly', () => {
  // IBM Plex Sans + Chromium print splits words at f/g in pdftotext; print uses a system sans without kerning.
  const doc = print.slice(print.indexOf('.resume-document,'))
  expect(print).toMatch(/\.resume-document[^{]*\{[^}]*font-family:[^;]*(system-ui|Roboto|Arial|Helvetica)/)
  expect(print).toMatch(/\.resume-document[^{]*\{[^}]*font-kerning: none/)
  expect(doc.length).toBeGreaterThan(0)
})
