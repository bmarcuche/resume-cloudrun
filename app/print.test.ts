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
