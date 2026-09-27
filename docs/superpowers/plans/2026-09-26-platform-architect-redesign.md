# Platform Architect Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the home page of resume.mindtunnel.org as a Platform Architect portfolio (systems first, resume second) with a designed light theme, a matching dark theme, the existing mobile tile game, brand icons everywhere, and no environment-identifying disclosures.

**Architecture:** Next.js 15 app router, one static home page composed from small server components fed by typed data files in `lib/`. Two client components fetch `/api/workflows` for live deploy info. Diagrams are inline SVG React components with a wide and a tall variant, toggled by CSS at 700px. All colors come from CSS custom properties on `:root` / `[data-theme]`; the old variable names stay as aliases so untouched CSS (workflows page, game, nav) keeps working.

**Tech Stack:** Next.js 15.5, React 18, TypeScript 5.7, Tailwind 3.4 (utilities only), `next/font/google`, `simple-icons` 16, `@heroicons/react` 2, Jest 29 + Testing Library, headless Chromium for the PDF.

**Spec:** `docs/superpowers/specs/2026-09-26-platform-architect-redesign-design.md`

**Mockups:** desktop https://claude.ai/artifact/89372n3Z9My4QSkRdsF4kr, mobile https://claude.ai/artifact/Nz5zAsp9ncwoB4ne8aLo5j

## Global Constraints

- Branch: `platform-architect`. No merge or push to `main` until the user approves a local `npm run dev` review in both themes and at phone width.
- Never run `npm run build` while `next dev` is running (it corrupts `.next`).
- Disclosure policy (spec): never publish server/host counts, client counts, client sector, internal product names, database vendor or instance counts, remote-management protocols, named third-party integrations, host-tied incident counts, a phone number, or "open to roles" statements. Banned substrings: `350`, `150+`, `government`, `FA-EAM`, `FA/EAM`, `Oracle SID`, `WinRM`, `Zendesk`, `DigiCert`, `Bastion`, `CAB or Jira`, `32 servers`, `561-284`, `Open to`.
- Leadership copy is scale-neutral: no team headcount in hero, section intros, or How I work.
- No horizontal scrolling on phones, ever. No `overflow-x: auto` anywhere in the mobile layout. Every diagram has a tall variant at most 360px wide shown below 700px.
- Brand icons stay: every technology name with a simple-icons glyph renders it through `fromBrand`; heroicons outline otherwise; monochrome via `currentColor`.
- Fonts: Archivo (display), IBM Plex Sans (body), IBM Plex Mono (identifiers) via `next/font/google`. Fallback stacks required.
- Both themes fully designed. Light canvas `#E9EEF5` with blueprint grid, never flat white. Dark canvas `#0B111C`. Winner theme keeps sky-blue `#CFE8FF`, gold band `#FFE9A8`, accent `#E11D48`, hero `#1F6FD0`, drifting stars.
- No load animations. The `Reveal` component is removed from the home page. `prefers-reduced-motion` disables transitions.
- Positioning strings: nav caption `platform architect`; `<title>` "Bruno Marcuche, Platform Architect"; PDF filename "Bruno Marcuche Platform Architect Resume.pdf"; `resumeData.tagline` "Platform Architect".
- `npm run validate` (lint, type-check, tests, build) must pass before the review gate.

## Review Focus

1. **`/api/workflows` fails or returns an empty `workflow_runs`** (no GitHub token in dev, rate limit, network down): the status strip cell and Deploys section must render their static fallback text, never "undefined" or a blank cell. Test in Task 9 and Task 13.
2. **Winner theme after the token rename**: unlocking the game must still recolor the whole page (canvas, panels, hero, accent) and the stars must drift. A missing alias leaves a section in light colors. Test in Task 2 (alias presence) and manual check in Task 16.
3. **Phone width with long stack tag names** (`sentence-transformers`, `Azure Data Explorer`): tags must wrap onto new lines, not push the card wider than the viewport. Test in Task 8 (tags render as `inline-flex` inside a `flex-wrap` container) and screenshot in Task 16.
4. **Print output** must still contain Strengths and Key Skills and must not include the new hero, status strip, systems, outcomes, practice, toolbox or deploys sections. Test in Task 15 (print class list) and manual print preview.
5. **`<details>` timeline with JavaScript disabled or before hydration**: the first role must be open and readable at rest. Test in Task 10 (first `details` has the `open` attribute in server output).

---

## File Structure

```
app/layout.tsx                          fonts via next/font, metadata, theme script (modify)
app/page.tsx                            composes the new sections (rewrite)
app/globals.css                         new tokens + aliases, fonts, new section styles (modify; append a "Platform Architect" block, retune :root)
app/workflows/page.tsx                  header copy "Deploys" (modify one string)
lib/site.ts                             NEW: PDF path/name, site URL, nav copy constants
lib/disclosure.ts                       NEW: BANNED list + collectStrings helper
lib/disclosure.test.ts                  NEW
lib/resume-data.ts                      tagline + summary (modify)
lib/systems-data.ts                     NEW (replaces lib/projects-data.ts): System[] with TechItem stacks
lib/systems-data.test.ts                NEW
lib/practice-data.ts                    NEW: four principles
lib/tech-data.ts                        add three items (modify)
components/icons/BrandIcon.tsx          unchanged
components/diagrams/DiagramFrame.tsx    NEW: wide/tall wrapper
components/diagrams/PlatformMap.tsx     NEW
components/diagrams/RouterFlow.tsx      NEW
components/diagrams/GhostWatchFlow.tsx  NEW
components/diagrams/DiscoveryFlow.tsx   NEW
components/diagrams/AccessFlow.tsx      NEW
components/hero/Hero.tsx                NEW
components/hero/StatusStrip.tsx         NEW (server) + LiveDeployCell.tsx (client)
components/systems/SystemsSection.tsx   NEW
components/systems/SystemRow.tsx        NEW
components/systems/SystemsSection.test.tsx NEW
components/outcomes/OutcomesSection.tsx NEW
components/practice/PracticeSection.tsx NEW
components/experience/Timeline.tsx      NEW
components/experience/Timeline.test.tsx NEW
components/toolbox/Toolbox.tsx          NEW (desktop lists + mobile game)
components/tech-game/TechTileGame.tsx   add progress, hint, solved chips (modify)
components/deploys/DeployProof.tsx      NEW (client)
components/deploys/DeployProof.test.tsx NEW
components/SiteNav.tsx                  links, caption, PDF constants, tabs (modify)
components/resume/ResumeDocument.tsx    print header uses tagline (already does); no change
components/projects/*                   DELETE
components/resume/StrengthsHighlight.tsx DELETE
scripts/regenerate-pdf.sh               NEW
scripts/README.md                       document the PDF script (modify)
__tests__/index.test.tsx                update expectations (modify)
public/resume/bruno_marcuche_resume.pdf regenerate (Task 15)
```

Anything not listed is untouched. `lib/tech-game.ts`, `lib/winner-theme.ts`, `components/ThemeToggle.tsx`, `components/DeployPipeline.tsx`, `components/WorkflowStatus.tsx`, and `app/api/*` do not change.

---

### Task 1: Fonts and metadata in the layout

**Files:**
- Modify: `app/layout.tsx`
- Modify: `__tests__/index.test.tsx` (only the import mock for fonts)

**Interfaces:**
- Produces: CSS variables `--font-display`, `--font-body`, `--font-mono` on `<html>`; page `<title>` "Bruno Marcuche, Platform Architect".

- [ ] **Step 1: Write the failing test**

Create `app/layout.test.tsx`:

```tsx
import { metadata } from './layout'

describe('layout metadata', () => {
  it('positions the site as Platform Architect', () => {
    expect(metadata.title).toBe('Bruno Marcuche, Platform Architect')
    expect(String(metadata.description)).toMatch(/Platform Architect/)
    expect(String(metadata.description)).not.toMatch(/SRE and AIOPs/)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest app/layout.test.tsx`
Expected: FAIL, title is "Bruno Marcuche · SRE and AIOPs". If Jest errors on `next/font/google`, add this to `jest.setup.js` first (it is needed anyway for later tasks):

```js
// next/font/google needs network at build time; stub it for tests
jest.mock('next/font/google', () => ({
  Archivo: () => ({ variable: '--font-display', className: 'font-display' }),
  IBM_Plex_Sans: () => ({ variable: '--font-body', className: 'font-body' }),
  IBM_Plex_Mono: () => ({ variable: '--font-mono', className: 'font-mono' }),
}))
```

- [ ] **Step 3: Rewrite `app/layout.tsx`**

```tsx
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const display = Archivo({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  axes: ['wdth'],
  variable: '--font-display',
  display: 'swap',
})
const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const DESCRIPTION =
  'Platform Architect. Designs and runs the control plane for a multi-tenant hosted platform: an AI agent layer that routes ops work, fleet discovery, just-in-time access, and incident pipelines.'

export const metadata: Metadata = {
  title: 'Bruno Marcuche, Platform Architect',
  description: DESCRIPTION,
  keywords:
    'Platform Architect, Platform Engineering, SRE, AI agents, LLM, Model Context Protocol, MCP, DevOps, Cloud, Azure, GCP, Linux, Automation, Observability, Bruno Marcuche',
  authors: [{ name: 'Bruno Marcuche' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Bruno Marcuche, Platform Architect',
    description: DESCRIPTION,
    url: 'https://resume.mindtunnel.org',
    siteName: 'MindTunnel',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        {/* Apply the saved theme before first paint to avoid a light->dark flash */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');var u=document.cookie.indexOf('winner_unlock=')!==-1;var theme=(t==='winner'&&u)?'winner':(t==='dark'?'dark':'light');document.documentElement.setAttribute('data-theme',theme)}catch(e){}})();",
          }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-W71716NXX8" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W71716NXX8');
          `}
        </Script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
```

Note: the `<noscript>` reveal fallback is dropped because `Reveal` is removed in Task 14.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest app/layout.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/layout.test.tsx jest.setup.js
git commit -m "feat: load Archivo and IBM Plex via next/font; Platform Architect metadata"
```

---

### Task 2: Design tokens, aliases, and font stacks in `globals.css`

**Files:**
- Modify: `app/globals.css:10-120` (the `:root`, `[data-theme="dark"]`, `[data-theme="winner"]` blocks)
- Modify: `app/globals.css` (append the new "Platform Architect" style block at the end of the file, before `@media print`)
- Test: `app/globals.test.ts` (string checks on the CSS file)

**Interfaces:**
- Produces: tokens `--canvas --canvas-grid --panel --panel-2 --band --line --line-strong --ink --body --muted --accent --accent-ink --accent-soft --accent-ring --hero --hero-2 --hero-ink --hero-muted --hero-line --ok --ok-soft --warn --warn-soft --shadow-card --shadow-sm` in all three themes, and the old names (`--primary-bg --surface --secondary-bg --card-bg --nav-bg --border-color --text-headline --text-body --text-muted --hero-bg --accent-hover --primary-color --analogous-blue --accent-teal --accent-dark --button-primary --button-secondary`) as aliases.
- Produces: class names used by later tasks: `.pa-section .pa-wrap .pa-lede .pa-h2 .pa-h3 .pill .pill-ok .pill-warn .pill-info .stack .stack-tag .tools .tools-group .tools-tag .fig-metrics .metric-tile .d .d-wide .d-tall .dwrap .hero-pa .status-strip .stat .sys .sys-text .sys-fig .sys-flip .out-grid .out .practice-grid .tl .tl-entry .pipe .pipe-steps .pipe-step .pipe-run .site-footer-pa`.

- [ ] **Step 1: Write the failing test**

Create `app/globals.test.ts`:

```ts
import { readFileSync } from 'fs'
import { join } from 'path'

const css = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8')

function block(selector: string): string {
  const start = css.indexOf(selector + ' {')
  expect(start).toBeGreaterThan(-1)
  const end = css.indexOf('\n}', start)
  return css.slice(start, end)
}

const NEW_TOKENS = ['--canvas', '--panel', '--panel-2', '--band', '--line', '--line-strong', '--ink', '--body', '--muted', '--accent', '--accent-ink', '--accent-soft', '--hero', '--hero-2', '--ok', '--warn']
const ALIASES = ['--primary-bg', '--card-bg', '--border-color', '--text-headline', '--text-body', '--text-muted', '--hero-bg', '--accent-teal', '--accent-dark', '--button-primary']

describe('design tokens', () => {
  it.each([':root', '[data-theme="dark"]', '[data-theme="winner"]'])('%s defines every token and alias', (sel) => {
    const b = block(sel)
    for (const t of [...NEW_TOKENS, ...ALIASES]) expect(b).toContain(t + ':')
  })
  it('light canvas is tinted, not white', () => {
    expect(block(':root')).toContain('--canvas: #E9EEF5')
    expect(block(':root')).not.toMatch(/--canvas: #fff/i)
  })
  it('winner theme keeps its palette', () => {
    const w = block('[data-theme="winner"]')
    expect(w).toContain('--canvas: #CFE8FF')
    expect(w).toContain('--accent: #E11D48')
    expect(w).toContain('--hero: #1F6FD0')
  })
  it('fonts come from next/font variables', () => {
    expect(css).toContain("font-family: var(--font-body)")
    expect(css).toContain("font-family: var(--font-display)")
    expect(css).toContain("font-family: var(--font-mono)")
  })
  it('has no horizontal scroll containers', () => {
    expect(css).not.toMatch(/overflow-x:\s*auto/)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest app/globals.test.ts`
Expected: FAIL, `--canvas` missing.

- [ ] **Step 3: Replace the three token blocks**

Replace lines 10 through the end of the `[data-theme="winner"]` block (currently ends near line 117) with:

```css
:root {
  /* Platform Architect tokens */
  --canvas: #E9EEF5;
  --canvas-grid: rgba(27, 70, 166, 0.07);
  --panel: #F7F9FC;
  --panel-2: #DFE6F0;
  --band: #DCE4F0;
  --line: #C9D4E3;
  --line-strong: #A9B8CE;
  --ink: #0F1B2D;
  --body: #354561;
  --muted: #5E6C86;
  --accent: #2B63D9;
  --accent-ink: #1B46A6;
  --accent-soft: rgba(43, 99, 217, 0.12);
  --accent-ring: rgba(43, 99, 217, 0.30);
  --hero: #12264F;
  --hero-2: #0E1E3F;
  --hero-ink: #F4F7FB;
  --hero-muted: #AFC0DC;
  --hero-line: rgba(175, 192, 220, 0.28);
  --ok: #1E9A6B;
  --ok-soft: rgba(30, 154, 107, 0.14);
  --warn: #B8761A;
  --warn-soft: rgba(184, 118, 26, 0.14);
  --shadow-sm: 0 1px 2px rgba(15, 27, 45, 0.05);
  --shadow-card: 0 1px 2px rgba(15, 27, 45, 0.05), 0 14px 30px -18px rgba(15, 27, 45, 0.25);

  /* Aliases for styles written against the previous token names */
  --primary-bg: var(--canvas);
  --surface: var(--panel);
  --secondary-bg: var(--panel-2);
  --card-bg: var(--panel);
  --nav-bg: rgba(233, 238, 245, 0.86);
  --border-color: var(--line);
  --text-headline: var(--ink);
  --text-body: var(--body);
  --text-muted: var(--muted);
  --hero-bg: var(--hero);
  --accent-hover: var(--accent-ink);
  --primary-color: var(--accent);
  --analogous-blue: var(--accent);
  --analogous-purple: var(--accent-ink);
  --triadic-purple: var(--accent-ink);
  --triadic-red: var(--accent);
  --complementary-color: var(--accent);
  --accent-teal: var(--accent);
  --accent-dark: var(--ink);
  --button-primary: var(--accent);
  --button-secondary: var(--accent);
}

[data-theme="dark"] {
  color-scheme: dark;
  --canvas: #0B111C;
  --canvas-grid: rgba(109, 155, 255, 0.06);
  --panel: #121A29;
  --panel-2: #1A2436;
  --band: #0F1626;
  --line: #243044;
  --line-strong: #33425A;
  --ink: #E9EEF6;
  --body: #A9B5C8;
  --muted: #7E8BA3;
  --accent: #6D9BFF;
  --accent-ink: #9DBBFF;
  --accent-soft: rgba(109, 155, 255, 0.14);
  --accent-ring: rgba(109, 155, 255, 0.40);
  --hero: #0E1830;
  --hero-2: #0A1122;
  --hero-ink: #EEF3FA;
  --hero-muted: #93A6C6;
  --hero-line: rgba(147, 166, 198, 0.24);
  --ok: #3FC48E;
  --ok-soft: rgba(63, 196, 142, 0.16);
  --warn: #E0A03A;
  --warn-soft: rgba(224, 160, 58, 0.16);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-card: 0 1px 2px rgba(0, 0, 0, 0.4), 0 14px 30px -18px rgba(0, 0, 0, 0.7);

  --primary-bg: var(--canvas);
  --surface: var(--panel);
  --secondary-bg: var(--panel-2);
  --card-bg: var(--panel);
  --nav-bg: rgba(11, 17, 28, 0.88);
  --border-color: var(--line);
  --text-headline: var(--ink);
  --text-body: var(--body);
  --text-muted: var(--muted);
  --hero-bg: var(--hero);
  --accent-hover: var(--accent-ink);
  --primary-color: var(--accent);
  --analogous-blue: var(--accent);
  --analogous-purple: var(--accent-ink);
  --triadic-purple: var(--accent-ink);
  --triadic-red: var(--accent);
  --complementary-color: var(--accent);
  --accent-teal: var(--accent);
  --accent-dark: var(--ink);
  --button-primary: var(--accent);
  --button-secondary: var(--accent);
}

[data-theme="winner"] {
  --canvas: #CFE8FF;
  --canvas-grid: transparent;
  --panel: #FFFFFF;
  --panel-2: #E6F3FF;
  --band: #FFE9A8;
  --line: #A9CDF0;
  --line-strong: #7FB2E3;
  --ink: #14304D;
  --body: #2B4A68;
  --muted: #50708F;
  --accent: #E11D48;
  --accent-ink: #BE123C;
  --accent-soft: rgba(225, 29, 72, 0.10);
  --accent-ring: rgba(225, 29, 72, 0.35);
  --hero: #1F6FD0;
  --hero-2: #1558AE;
  --hero-ink: #FFFFFF;
  --hero-muted: #D6E8FF;
  --hero-line: rgba(255, 255, 255, 0.35);
  --ok: #1E9A6B;
  --ok-soft: rgba(30, 154, 107, 0.14);
  --warn: #B8761A;
  --warn-soft: rgba(184, 118, 26, 0.14);
  --shadow-sm: 0 1px 2px rgba(20, 48, 77, 0.06);
  --shadow-card: 0 1px 2px rgba(20, 48, 77, 0.06), 0 12px 30px -16px rgba(20, 48, 77, 0.28);

  --primary-bg: var(--canvas);
  --surface: var(--panel-2);
  --secondary-bg: var(--band);
  --card-bg: var(--panel);
  --nav-bg: rgba(207, 232, 255, 0.85);
  --border-color: var(--line);
  --text-headline: var(--ink);
  --text-body: var(--body);
  --text-muted: var(--muted);
  --hero-bg: var(--hero);
  --accent-hover: var(--accent-ink);
  --primary-color: var(--accent);
  --analogous-blue: var(--hero);
  --analogous-purple: var(--accent-ink);
  --triadic-purple: var(--accent-ink);
  --triadic-red: var(--accent);
  --complementary-color: var(--accent);
  --accent-teal: var(--accent);
  --accent-dark: var(--ink);
  --button-primary: var(--accent);
  --button-secondary: var(--hero);
}
```

Keep everything that followed the winner block (the `.page-grid` rules and onward) as it is, but change the `.page-grid` light rule so the grid uses the token: find `.page-grid {` and set its two `linear-gradient(...)` colors to `var(--canvas-grid)`. Do the same in the `[data-theme="dark"] .page-grid` rule. Leave the winner star rule alone.

- [ ] **Step 4: Set the base font on `body` and headings**

Find the `body {` rule near the top of the file (inside `@layer base` or plain, whichever exists) and set:

```css
body {
  font-family: var(--font-body), 'IBM Plex Sans', system-ui, sans-serif;
  color: var(--body);
  background-color: var(--canvas);
}
```

- [ ] **Step 5: Append the redesign style block**

Append before `@media print {`:

```css
/* ==========================================================================
   Platform Architect redesign
   ========================================================================== */

.pa-wrap { max-width: 1160px; margin: 0 auto; padding-inline: 20px; }
.pa-section { padding-block: 72px; }
.pa-h2 {
  font-family: var(--font-display), 'Archivo', system-ui, sans-serif;
  font-size: clamp(1.6rem, 1.2rem + 1.6vw, 2.4rem);
  font-weight: 700; font-stretch: 112%; letter-spacing: -0.01em; line-height: 1.1;
  color: var(--ink); margin: 0; text-wrap: balance;
}
.pa-h3 {
  font-family: var(--font-display), 'Archivo', system-ui, sans-serif;
  font-size: 1.25rem; font-weight: 600; font-stretch: 112%; line-height: 1.15; color: var(--ink); margin: 0;
}
.pa-lede { max-width: 62ch; font-size: 1.05rem; color: var(--body); margin-top: 14px; }
.pa-mono { font-family: var(--font-mono), 'IBM Plex Mono', ui-monospace, Menlo, monospace; font-variant-numeric: tabular-nums; }
.pa-link { color: var(--accent-ink); }
.pa-link:hover { text-decoration: underline; }

/* Buttons */
.pa-btn {
  display: inline-flex; align-items: center; gap: 8px; padding: 9px 15px; border-radius: 8px;
  font-weight: 600; font-size: 0.92rem; border: 1px solid var(--line-strong);
  color: var(--ink); background: var(--panel); white-space: nowrap; text-decoration: none;
}
.pa-btn:hover { border-color: var(--accent); text-decoration: none; }
.pa-btn svg { width: 15px; height: 15px; }
.pa-btn-primary { background: var(--accent); border-color: var(--accent); color: #fff; }
.pa-btn-primary:hover { background: var(--accent-ink); border-color: var(--accent-ink); }

/* Pills and tags */
.pill { display: inline-flex; align-items: center; gap: 6px; font-size: 0.74rem; font-weight: 600; padding: 3px 9px; border-radius: 999px; }
.pill-ok { color: var(--ok); background: var(--ok-soft); }
.pill-warn { color: var(--warn); background: var(--warn-soft); }
.pill-info { color: var(--accent-ink); background: var(--accent-soft); }
.stack { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 20px; }
.stack-tag, .tools-tag {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-mono), 'IBM Plex Mono', ui-monospace, monospace; font-weight: 500; font-size: 0.76rem; line-height: 1;
  padding: 6px 8px; border-radius: 5px; background: var(--panel-2); color: var(--body); border: 1px solid var(--line);
}
.stack-tag svg, .tools-tag svg { width: 13px; height: 13px; flex: none; color: var(--muted); }

/* Hero */
.hero-pa { background: linear-gradient(160deg, var(--hero), var(--hero-2)); color: var(--hero-ink); padding-block: 64px 56px; border-bottom: 1px solid var(--line); }
.hero-pa .pa-wrap { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: 48px; align-items: center; }
.hero-pa .pa-wrap > div { min-width: 0; }
.hero-name {
  font-family: var(--font-display), 'Archivo', system-ui, sans-serif; color: var(--hero-ink);
  font-size: clamp(2.4rem, 1.6rem + 3.2vw, 4.2rem); font-weight: 700; font-stretch: 125%; letter-spacing: -0.02em; line-height: 1; margin: 0;
}
.hero-role { font-family: var(--font-display), 'Archivo', system-ui, sans-serif; font-stretch: 112%; font-weight: 600; font-size: clamp(1.15rem, 1rem + 0.8vw, 1.5rem); color: var(--hero-muted); margin-top: 10px; }
.hero-thesis { margin-top: 22px; font-size: 1.08rem; line-height: 1.6; max-width: 52ch; color: var(--hero-ink); }
.hero-thesis span { color: var(--hero-muted); }
.hero-cta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
.hero-pa .pa-btn { background: transparent; border-color: var(--hero-line); color: var(--hero-ink); }
.hero-pa .pa-btn:hover { border-color: var(--hero-muted); }
.hero-pa .pa-btn-primary { background: #fff; color: var(--hero); border-color: #fff; }
.hero-pa .pa-btn-primary:hover { background: #E4ECFA; border-color: #E4ECFA; }
.hero-contact { display: flex; flex-wrap: wrap; gap: 6px 18px; margin-top: 22px; font-size: 0.86rem; color: var(--hero-muted); }
.hero-map-cap { font-size: 0.8rem; color: var(--hero-muted); margin-top: 10px; text-align: right; }
@media (max-width: 900px) { .hero-pa .pa-wrap { grid-template-columns: 1fr; gap: 36px; } .hero-map-cap { text-align: left; } }
@media (max-width: 700px) { .hero-pa { padding-block: 34px 30px; } .hero-name { font-size: 2.55rem; } .hero-thesis { font-size: 1rem; } }

/* Status strip */
.status-strip { border-bottom: 1px solid var(--line); background: var(--panel); }
.status-strip .pa-wrap { display: flex; flex-wrap: wrap; align-items: stretch; }
.stat { flex: 1 1 150px; padding: 18px 18px 16px 0; margin-right: 18px; border-right: 1px solid var(--line); }
.stat:last-child { border-right: 0; margin-right: 0; }
.stat-value { display: block; font-family: var(--font-display), 'Archivo', system-ui, sans-serif; font-stretch: 112%; font-weight: 700; font-size: 1.55rem; color: var(--ink); line-height: 1; font-variant-numeric: tabular-nums; }
.stat-label { display: block; font-size: 0.82rem; color: var(--muted); margin-top: 6px; }
.stat-live { display: inline-flex; align-items: center; gap: 6px; font-size: 0.72rem; color: var(--ok); font-weight: 600; margin-top: 6px; }
.stat-live i { width: 7px; height: 7px; border-radius: 50%; background: var(--ok); display: inline-block; }
@media (max-width: 700px) {
  .status-strip .pa-wrap { display: grid; grid-template-columns: 1fr 1fr; padding-inline: 0; }
  .stat { margin: 0; padding: 14px 16px 12px; border-right: 0; border-bottom: 1px solid var(--line); }
  .stat:nth-child(odd) { border-right: 1px solid var(--line); }
}

/* Diagrams */
.dwrap { min-width: 0; max-width: 100%; }
.dwrap svg { width: 100%; height: auto; display: block; }
.d-tall { max-width: 360px; margin: 0 auto; }
@media (max-width: 700px) { svg.d-wide { display: none !important; } }
@media (min-width: 701px) { svg.d-tall { display: none !important; } }
.d text { font-family: var(--font-mono), 'IBM Plex Mono', ui-monospace, monospace; font-size: 11.5px; fill: var(--body); }
.d .node { fill: var(--panel); stroke: var(--line-strong); stroke-width: 1.2; }
.d .node.hot { stroke: var(--accent); fill: var(--accent-soft); }
.d .node.ok { stroke: var(--ok); fill: var(--ok-soft); }
.d .edge { stroke: var(--line-strong); stroke-width: 1.4; fill: none; }
.d .edge.hot { stroke: var(--accent); }
.d .edge.ok { stroke: var(--ok); }
.d .lbl { fill: var(--ink); font-weight: 500; }
.d .tiny { font-size: 10px; fill: var(--muted); }
/* The hero map always sits on the hero gradient, so it has fixed light-on-dark colors */
.map text { fill: #AFC0DC; }
.map .lbl { fill: #F4F7FB; font-weight: 500; }
.map .tiny { fill: #8DA1C4; }
.map .node { fill: rgba(255, 255, 255, 0.04); stroke: rgba(175, 192, 220, 0.45); }
.map .node.hot { fill: rgba(109, 155, 255, 0.16); stroke: #7FA6FF; }
.map .node.ok { fill: rgba(63, 196, 142, 0.14); stroke: #3FC48E; }
.map .edge { stroke: rgba(175, 192, 220, 0.45); }
.map .edge.hot { stroke: #7FA6FF; }
.map .edge.ok { stroke: #3FC48E; }
.map .band { fill: none; stroke: rgba(175, 192, 220, 0.22); stroke-dasharray: 3 4; }

/* Systems */
.systems-grid { display: grid; gap: 22px; margin-top: 40px; }
.sys { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); background: var(--panel); border: 1px solid var(--line); border-radius: 14px; overflow: hidden; box-shadow: var(--shadow-card); }
.sys-text { padding: 30px 32px; min-width: 0; }
.sys-fig { padding: 26px 28px; background: var(--panel-2); border-left: 1px solid var(--line); display: grid; grid-template-columns: minmax(0, 1fr); align-content: center; gap: 16px; min-width: 0; }
.sys-flip .sys-text { order: 2; }
.sys-flip .sys-fig { border-left: 0; border-right: 1px solid var(--line); }
.sys-pills { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.sys-title { font-size: 1.45rem; margin-top: 10px; }
.sys-sub { color: var(--muted); font-size: 0.95rem; margin-top: 4px; }
.sys-desc { margin-top: 16px; max-width: 58ch; }
.sys-outcomes { margin: 16px 0 0; padding: 0; list-style: none; display: grid; gap: 9px; }
.sys-outcomes li { padding-left: 18px; position: relative; font-size: 0.95rem; }
.sys-outcomes li::before { content: ""; position: absolute; left: 0; top: 0.62em; width: 8px; height: 2px; background: var(--accent); }
.fig-metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(88px, 1fr)); gap: 10px; }
.metric-tile { padding: 10px 12px; background: var(--panel); border: 1px solid var(--line); border-radius: 8px; min-width: 0; }
.metric-value { display: block; font-family: var(--font-display), 'Archivo', system-ui, sans-serif; font-stretch: 112%; font-weight: 700; font-size: 1.25rem; color: var(--ink); line-height: 1; font-variant-numeric: tabular-nums; }
.metric-label { font-size: 0.76rem; color: var(--muted); display: block; margin-top: 4px; }
@media (max-width: 860px) {
  .sys { grid-template-columns: 1fr; }
  .sys-flip .sys-text { order: 0; }
  .sys-fig, .sys-flip .sys-fig { border-left: 0; border-right: 0; border-top: 1px solid var(--line); }
  .sys-text { padding: 20px 18px; }
  .sys-fig { padding: 16px 16px 18px; }
}

/* Outcomes */
.outcomes-pa { background: var(--band); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.out-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 28px; margin-top: 36px; }
.out { border-top: 2px solid var(--accent); padding-top: 16px; min-width: 0; }
.out-from { font-family: var(--font-mono), 'IBM Plex Mono', ui-monospace, monospace; font-size: 0.82rem; color: var(--muted); }
.out-to { font-family: var(--font-display), 'Archivo', system-ui, sans-serif; font-stretch: 112%; font-weight: 700; font-size: 2rem; color: var(--ink); line-height: 1; margin-top: 6px; font-variant-numeric: tabular-nums; }
.out-to small { font-size: 1rem; font-weight: 500; color: var(--muted); margin-left: 6px; font-family: var(--font-body), system-ui, sans-serif; }
.out p { margin-top: 10px; font-size: 0.92rem; }
.out-bar { display: grid; gap: 5px; margin-top: 14px; }
.out-bar i { display: block; height: 6px; border-radius: 3px; background: var(--line-strong); }
.out-bar i.now { background: var(--accent); }
@media (max-width: 700px) { .out-grid { grid-template-columns: 1fr 1fr; gap: 20px 18px; } .out-to { font-size: 1.7rem; } }

/* Practice */
.practice-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px 40px; margin-top: 36px; }
.practice-grid .pa-h3 { font-size: 1.05rem; }
.practice-grid p { margin-top: 8px; font-size: 0.95rem; }

/* Timeline */
.tl { margin-top: 36px; border-left: 2px solid var(--line-strong); display: grid; gap: 8px; }
.tl-entry { padding: 10px 0 10px 26px; position: relative; }
.tl-entry::before { content: ""; position: absolute; left: -7px; top: 22px; width: 12px; height: 12px; border-radius: 50%; background: var(--canvas); border: 2px solid var(--accent); }
.tl-entry[open]::before { background: var(--accent); }
.tl-entry summary { list-style: none; cursor: pointer; display: grid; grid-template-columns: 150px 1fr auto; gap: 14px; align-items: baseline; }
.tl-entry summary::-webkit-details-marker { display: none; }
.tl-when { font-family: var(--font-mono), 'IBM Plex Mono', ui-monospace, monospace; font-size: 0.8rem; color: var(--muted); font-variant-numeric: tabular-nums; }
.tl-who b { color: var(--ink); font-weight: 600; font-family: var(--font-display), 'Archivo', system-ui, sans-serif; font-stretch: 112%; font-size: 1.05rem; }
.tl-who span { color: var(--muted); font-size: 0.92rem; margin-left: 8px; }
.tl-one { grid-column: 2; font-size: 0.92rem; color: var(--body); margin-top: 2px; }
.tl-chev { color: var(--muted); font-size: 0.8rem; transition: transform 0.2s; }
.tl-entry[open] .tl-chev { transform: rotate(180deg); }
.tl-entry ul { margin: 12px 0 4px; padding-left: 18px; display: grid; gap: 6px; font-size: 0.93rem; max-width: 70ch; }
@media (max-width: 700px) {
  .tl-entry summary { grid-template-columns: 1fr auto; gap: 2px 10px; }
  .tl-when, .tl-one { grid-column: 1 / -1; }
  .tl-who span { display: block; margin-left: 0; }
}

/* Toolbox (desktop lists) */
.tools { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 18px 28px; margin-top: 32px; }
.tools-group h4 { font-size: 0.86rem; font-weight: 600; color: var(--muted); padding-bottom: 8px; border-bottom: 1px solid var(--line); margin: 0 0 10px; }
.tools-group ul { margin: 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 6px; }
.tools-tag { background: var(--panel); font-size: 0.8rem; }

/* Game additions (mobile) */
.game-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 6px; }
.game-prog { font-family: var(--font-mono), 'IBM Plex Mono', ui-monospace, monospace; font-size: 0.76rem; color: var(--muted); white-space: nowrap; flex: none; }
.game-hint { font-size: 0.86rem; color: var(--muted); margin-top: 6px; }
.game-solved { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; min-height: 26px; }
.game-solved span { font-size: 0.72rem; font-weight: 600; padding: 4px 9px; border-radius: 999px; background: var(--accent-soft); color: var(--accent-ink); }

/* Deploys */
.deploys-pa { background: var(--panel); border-top: 1px solid var(--line); }
.pipe { margin-top: 30px; border: 1px solid var(--line); border-radius: 12px; background: var(--canvas); padding: 22px 24px; display: grid; gap: 18px; }
.pipe-steps { display: flex; align-items: center; flex-wrap: wrap; }
.pipe-step { display: flex; align-items: center; gap: 8px; font-size: 0.86rem; color: var(--ink); font-weight: 500; }
.pipe-step i { width: 10px; height: 10px; border-radius: 50%; background: var(--ok); display: inline-block; box-shadow: 0 0 0 4px var(--ok-soft); }
.pipe-step + .pipe-step::before { content: ""; width: 34px; height: 2px; background: var(--line-strong); margin-inline: 10px; }
.pipe-run { display: flex; flex-wrap: wrap; gap: 8px 20px; font-size: 0.84rem; color: var(--muted); align-items: center; }
.pipe-run b { color: var(--ink); font-weight: 500; }
@media (max-width: 700px) {
  .pipe-steps { display: grid; gap: 8px; }
  .pipe-step + .pipe-step::before { display: none; }
  .pipe-run { display: grid; gap: 4px; }
}

/* Footer */
.site-footer-pa { padding-block: 34px 44px; font-size: 0.86rem; color: var(--muted); }
.site-footer-pa .pa-wrap { display: flex; flex-wrap: wrap; gap: 8px 24px; align-items: center; }
.site-footer-pa a { color: var(--body); }

@media (prefers-reduced-motion: reduce) {
  .tl-chev, .pa-btn, .tech-tile { transition: none !important; }
}
```

- [ ] **Step 6: Run the test and the whole suite**

Run: `npx jest app/globals.test.ts && npx jest`
Expected: PASS. The site still renders with the old classes because of the aliases.

- [ ] **Step 7: Commit**

```bash
git add app/globals.css app/globals.test.ts
git commit -m "feat: Platform Architect design tokens with legacy aliases and redesign styles"
```

---

### Task 3: Disclosure policy test

**Files:**
- Create: `lib/disclosure.ts`
- Create: `lib/disclosure.test.ts`

**Interfaces:**
- Produces: `BANNED: readonly string[]`, `collectStrings(value: unknown): string[]`, `findViolations(strings: string[]): { text: string; term: string }[]`.

- [ ] **Step 1: Write the failing test**

`lib/disclosure.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest lib/disclosure.test.ts`
Expected: FAIL, module not found.

- [ ] **Step 3: Implement `lib/disclosure.ts`**

```ts
// Strings that must never appear in published copy. See the design spec,
// "Disclosure policy". Matching is case-sensitive on purpose: the terms are
// specific enough that a lower-case "government" or "bastion" in ordinary prose
// would also be a violation.
export const BANNED = [
  '350', '150+', 'government', 'FA-EAM', 'FA/EAM', 'Oracle SID', 'WinRM',
  'Zendesk', 'DigiCert', 'Bastion', 'CAB or Jira', '32 servers', '561-284', 'Open to',
] as const

/** Every string value reachable inside an object or array, depth first. */
export function collectStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(collectStrings)
  if (value && typeof value === 'object') return Object.values(value as Record<string, unknown>).flatMap(collectStrings)
  return []
}

export function findViolations(strings: string[]): { text: string; term: string }[] {
  const out: { text: string; term: string }[] = []
  for (const text of strings) {
    for (const term of BANNED) {
      if (text.includes(term)) out.push({ text, term })
    }
  }
  return out
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest lib/disclosure.test.ts`
Expected: PASS (resume data was scrubbed on main in commits `77e2961` and the PR #22 squash).

If "resume data is clean" fails on `Open to` because PR #22 has not been merged into this branch yet, run `git merge main` first; the phone and "Open to" removal live there.

- [ ] **Step 5: Commit**

```bash
git add lib/disclosure.ts lib/disclosure.test.ts
git commit -m "test: enforce the disclosure policy on resume data and metadata"
```

---

### Task 4: Site constants and resume positioning

**Files:**
- Create: `lib/site.ts`
- Modify: `lib/resume-data.ts:57-79` (tagline, summary)
- Modify: `components/SiteNav.tsx:30-32` and `app/page.tsx:14-15` (import constants; page.tsx is rewritten in Task 14, so only SiteNav now)

**Interfaces:**
- Produces: `SITE = { url, pdfPath, pdfName, navCaption, thesis, location }`.

- [ ] **Step 1: Write the failing test**

`lib/site.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest lib/site.test.ts`
Expected: FAIL, module not found.

- [ ] **Step 3: Create `lib/site.ts`**

```ts
// Site-wide constants shared by the nav, hero, footer and print header.
export const SITE = {
  url: 'https://resume.mindtunnel.org',
  pdfPath: '/resume/bruno_marcuche_resume.pdf',
  pdfName: 'Bruno Marcuche Platform Architect Resume.pdf',
  navCaption: 'platform architect',
  role: 'Platform Architect',
  location: 'Boulder, CO',
  thesis:
    'I design and run the control plane for a multi-tenant hosted platform: an AI agent layer that routes ops work, fleet discovery, just-in-time access, and incident pipelines that find root cause before a customer calls.',
  repo: 'https://github.com/bmarcuche/resume-cloudrun',
} as const
```

- [ ] **Step 4: Update `lib/resume-data.ts`**

Change `tagline` to `'Platform Architect'` and replace the `summary` value with:

```ts
  summary:
    'Platform Architect and technical leader who builds the systems other teams run on. ' +
    "I've scaled infrastructure across on-prem, hybrid, and cloud, and automated deployment and operations " +
    'for thousands of Linux and Windows instances. Most recently I architected an internal AI agent platform, ' +
    'a custom semantic router orchestrating 16 specialized LLM agents, that has handled 10,000+ ops and ' +
    'engineering tasks and cut change lead time by ~89%. I lead ops and SRE teams, drive observability with ' +
    'OpenTelemetry and PagerDuty, and turn slow, manual operations into fast, repeatable automation.',
```

- [ ] **Step 5: Point SiteNav at the constants**

In `components/SiteNav.tsx` replace

```ts
const RESUME_PDF = '/resume/bruno_marcuche_resume.pdf'
const RESUME_PDF_NAME = 'Bruno Marcuche SRE Resume.pdf'
const NAV_TITLE = 'SRE · AIOPs'
```

with

```ts
import { SITE } from '../lib/site'
const RESUME_PDF = SITE.pdfPath
const RESUME_PDF_NAME = SITE.pdfName
const NAV_TITLE = SITE.navCaption
```

(put the import with the other imports at the top of the file).

- [ ] **Step 6: Run tests**

Run: `npx jest lib/site.test.ts lib/disclosure.test.ts __tests__`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add lib/site.ts lib/site.test.ts lib/resume-data.ts components/SiteNav.tsx
git commit -m "feat: Platform Architect positioning constants and resume summary"
```

---

### Task 5: Systems data (replaces projects data)

**Files:**
- Create: `lib/systems-data.ts`
- Create: `lib/systems-data.test.ts`
- Modify: `lib/tech-data.ts` (export `TechItem`, add three items)
- Delete: `lib/projects-data.ts` (in Task 14, after `components/projects` goes)

**Interfaces:**
- Consumes: `fromBrand` from `components/icons/BrandIcon.tsx`; `TechItem` from `lib/tech-data.ts`.
- Produces:

```ts
export type DiagramKey = 'router' | 'ghostwatch' | 'discovery' | 'access'
export interface SystemStatus { label: string; tone: 'ok' | 'warn' | 'info' }
export interface SystemMetric { value: string; label: string }
export interface System {
  id: string; title: string; subtitle: string; status: SystemStatus[]
  description: string; outcomes: string[]; stack: TechItem[]; metrics: SystemMetric[]; diagram: DiagramKey
}
export const systems: System[]
```

- [ ] **Step 1: Export `TechItem` and add items in `lib/tech-data.ts`**

At the top of `lib/tech-data.ts`, the file already declares an item type inside `TechCategory`. Make it a named export:

```ts
export interface TechItem {
  name: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}
export interface TechCategory {
  label: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  items: TechItem[]
}
```

(Keep the existing `Icon` type alias if present; just ensure `TechItem` is exported and `TechCategory.items` is `TechItem[]`.)

Add `EyeIcon` to the heroicons import and add these items:
- In the `AI & Agents` category after `Amazon Kiro`: `{ name: 'Microsoft Foundry', Icon: SparklesIcon }, { name: 'Azure SRE Agent', Icon: EyeIcon }`.
- In the `Observability` category after `PagerDuty`: `{ name: 'Observe', Icon: EyeIcon }`.

Run `npx jest lib/tech-game.test.ts components/tech-game` and confirm the game tests still pass (they read sizes from the data, so more tiles are fine).

- [ ] **Step 2: Write the failing test**

`lib/systems-data.test.ts`:

```ts
import { systems } from './systems-data'
import { collectStrings, findViolations } from './disclosure'

describe('systems data', () => {
  it('lists the four systems in order', () => {
    expect(systems.map((s) => s.id)).toEqual(['agent-platform', 'ghostwatch', 'hen', 'ham'])
  })
  it('every system has a diagram, metrics, and an icon on every stack item', () => {
    for (const s of systems) {
      expect(['router', 'ghostwatch', 'discovery', 'access']).toContain(s.diagram)
      expect(s.metrics.length).toBeGreaterThanOrEqual(2)
      for (const item of s.stack) expect(typeof item.Icon).toBe('function')
    }
  })
  it('GhostWatch carries live and pilot statuses', () => {
    const gw = systems.find((s) => s.id === 'ghostwatch')!
    expect(gw.status).toEqual([{ label: 'Detection live', tone: 'ok' }, { label: 'Self-healing in pilot', tone: 'warn' }])
  })
  it('is clean under the disclosure policy', () => {
    const strings = collectStrings(systems.map(({ stack, ...rest }) => ({ ...rest, stack: stack.map((i) => i.name) })))
    expect(findViolations(strings)).toEqual([])
  })
  it('mentions no team headcount', () => {
    expect(collectStrings(systems).join(' ')).not.toMatch(/five-person|team of five/)
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx jest lib/systems-data.test.ts`
Expected: FAIL, module not found.

- [ ] **Step 4: Create `lib/systems-data.ts`**

```ts
// Content for the Systems section. HTML only, not part of the PDF.
import {
  BoltIcon, CircleStackIcon, ClockIcon, CloudIcon, EyeIcon, LockClosedIcon,
  SparklesIcon, ArrowPathRoundedSquareIcon, ServerStackIcon,
} from '@heroicons/react/24/outline'
import {
  siAnsible, siCelery, siFastapi, siFlask, siHuggingface, siModelcontextprotocol,
  siNginx, siPostgresql, siPython, siRedis, siRust,
} from 'simple-icons'
import { fromBrand } from '../components/icons/BrandIcon'
import type { TechItem } from './tech-data'

export type DiagramKey = 'router' | 'ghostwatch' | 'discovery' | 'access'
export interface SystemStatus { label: string; tone: 'ok' | 'warn' | 'info' }
export interface SystemMetric { value: string; label: string }
export interface System {
  id: string
  title: string
  subtitle: string
  status: SystemStatus[]
  description: string
  outcomes: string[]
  stack: TechItem[]
  metrics: SystemMetric[]
  diagram: DiagramKey
}

const t = (name: string, Icon: TechItem['Icon']): TechItem => ({ name, Icon })
const Python = fromBrand(siPython)
const Rust = fromBrand(siRust)
const Postgres = fromBrand(siPostgresql)
const HF = fromBrand(siHuggingface)
const MCP = fromBrand(siModelcontextprotocol)
const Ansible = fromBrand(siAnsible)
const Flask = fromBrand(siFlask)
const Celery = fromBrand(siCelery)
const Redis = fromBrand(siRedis)
const FastAPI = fromBrand(siFastapi)
const Nginx = fromBrand(siNginx)

export const systems: System[] = [
  {
    id: 'agent-platform',
    title: 'Internal AI agent platform',
    subtitle: 'Semantic router and MCP gateway in front of 19 specialist agents',
    status: [{ label: 'In production', tone: 'ok' }, { label: 'Since 12/2024', tone: 'info' }],
    description:
      'Every prompt hits a two-stage classifier before any LLM sees it. Deterministic patterns take a keyword fast path. Ambiguous ones go through a fine-tuned bi-encoder and cross-encoder over a pgvector store, then land on the right agent with retrieved knowledge and environment context already attached.',
    outcomes: [
      '95%+ of requests route with no LLM reasoning; classification in under 100 ms on CPU.',
      'Closed-loop retraining from routing outcomes and human corrections cut LLM fallback from 22% to under 5% in five iterations.',
      'Agents built 235 Ansible and CI/CD pipelines and ran 213 upgrades, removing about 426 hours of manual deploy work.',
    ],
    stack: [
      t('Python', Python), t('Rust (candle)', Rust), t('pgvector', CircleStackIcon), t('sentence-transformers', HF),
      t('MCP', MCP), t('Kiro CLI', SparklesIcon), t('Ansible', Ansible), t('Azure DevOps', ArrowPathRoundedSquareIcon),
    ],
    metrics: [
      { value: '0.81', label: 'top-1 routing accuracy' },
      { value: '<5%', label: 'LLM fallback, from 22%' },
      { value: '268', label: 'scoped tools' },
    ],
    diagram: 'router',
  },
  {
    id: 'ghostwatch',
    title: 'GhostWatch',
    subtitle: 'AI-assisted incident investigation pipeline',
    status: [{ label: 'Detection live', tone: 'ok' }, { label: 'Self-healing in pilot', tone: 'warn' }],
    description:
      'Nine in ten service interruptions we studied warned us first, usually as a backlog signal before the outage. GhostWatch turns that warning into an investigation instead of a page. Started at the Microsoft Global Hackathon 2026 with a cross-company team.',
    outcomes: [
      'A classifier spots the signal and opens one investigation, not a flood of alerts.',
      'An LLM on Microsoft Foundry classifies the case and orders the telemetry it needs. Exporters and detectors are generated on demand into App Insights and Azure Data Explorer.',
      'The Azure SRE Agent takes the case and goes after root cause. Investigation handoff is in progress.',
    ],
    stack: [
      t('Microsoft Foundry', SparklesIcon), t('Azure SRE Agent', EyeIcon), t('App Insights', EyeIcon),
      t('Azure Data Explorer', CircleStackIcon), t('Python', Python),
    ],
    metrics: [
      { value: '9 of 10', label: 'outages warned first' },
      { value: '1', label: 'investigation per signal' },
    ],
    diagram: 'ghostwatch',
  },
  {
    id: 'hen',
    title: 'Hosted Environment Navigator',
    subtitle: 'System of record for the hosted environment',
    status: [{ label: 'In production', tone: 'ok' }],
    description:
      'Continuous discovery inventories every install: version, config, services, databases and certificates, into a JSONB Postgres store behind a searchable dashboard. It is the context the agent platform reads before it acts.',
    outcomes: [
      'Integrates ticketing, source control, certificate and bastion services, with Celery workers refreshing state on a rolling schedule.',
      'bcrypt RBAC, API tokens, CSRF and rate limiting, audit logging.',
    ],
    stack: [
      t('Flask', Flask), t('PostgreSQL JSONB', Postgres), t('Celery', Celery), t('Redis', Redis),
      t('Ansible', Ansible), t('Azure', CloudIcon),
    ],
    metrics: [
      { value: '20', label: 'blueprints' },
      { value: '224', label: 'routes' },
      { value: '245', label: 'tests' },
    ],
    diagram: 'discovery',
  },
  {
    id: 'ham',
    title: 'Hosted Access Manager',
    subtitle: 'Just-in-time, time-boxed privileged database access',
    status: [{ label: 'In production', tone: 'ok' }],
    description:
      'An approved change request unlocks an account for a window and locks it again on expiry. Credentials live in a managed vault. A scheduler reconciles state continuously, locking expired sessions and orphaned accounts.',
    outcomes: [
      'Replaced standing credentials and manual DBA grants across the whole database estate.',
      'Self-service onboarding registers servers after identity and host verification.',
    ],
    stack: [
      t('FastAPI', FastAPI), t('PostgreSQL', Postgres), t('APScheduler', ClockIcon),
      t('Azure Key Vault', LockClosedIcon), t('nginx', Nginx), t('systemd', ServerStackIcon),
    ],
    metrics: [
      { value: '0', label: 'permanent credentials' },
      { value: '250+', label: 'sessions' },
      { value: '100%', label: 'of the database estate' },
    ],
    diagram: 'access',
  },
]
```

Note: the word "bastion" (lower case) in the HEN outcomes is intentional generic prose and is not the banned `Bastion` product reference; the test is case-sensitive. `BoltIcon` is imported for parity with tech-data and may be removed if lint flags it unused.

- [ ] **Step 5: Run test to verify it passes**

Run: `npx jest lib/systems-data.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add lib/systems-data.ts lib/systems-data.test.ts lib/tech-data.ts
git commit -m "feat: systems data with brand-iconed stacks; export TechItem"
```

---

### Task 6: Practice data

**Files:**
- Create: `lib/practice-data.ts`
- Test: covered by `components/practice/PracticeSection.test.tsx` in Task 11; add a tiny data test now.

**Interfaces:**
- Produces: `export const practice: { title: string; body: string }[]` (four entries).

- [ ] **Step 1: Write the failing test**

`lib/practice-data.test.ts`:

```ts
import { practice } from './practice-data'

it('has four scale-neutral principles', () => {
  expect(practice).toHaveLength(4)
  for (const p of practice) {
    expect(p.body).not.toMatch(/five|team of \d/i)
  }
  expect(practice[3].body).toMatch(/at any team size/)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest lib/practice-data.test.ts`
Expected: FAIL.

- [ ] **Step 3: Create `lib/practice-data.ts`**

```ts
export interface Principle { title: string; body: string }

export const practice: Principle[] = [
  {
    title: 'Ship the control plane, not the ticket',
    body: 'If a task comes through more than twice, it becomes a pipeline, a scoped tool or an agent skill. The queue gets shorter every month or the platform is not doing its job.',
  },
  {
    title: 'Deterministic first, models second',
    body: 'Keyword fast paths and typed tools handle what they can. LLM reasoning is the fallback, measured, and retrained from corrections rather than trusted.',
  },
  {
    title: 'Observability before automation',
    body: 'OpenTelemetry and Observe went in before the agents did. You cannot hand production to software you cannot watch.',
  },
  {
    title: 'Lead by building alongside',
    body: 'I run teams the way I run platforms: clear ownership, measured outcomes, and engineers who grow into owners. 1:1s, architecture reviews and pairing on the platform itself are the operating model at any team size.',
  },
]
```

- [ ] **Step 4: Run test, commit**

Run: `npx jest lib/practice-data.test.ts` → PASS.

```bash
git add lib/practice-data.ts lib/practice-data.test.ts
git commit -m "feat: How I work principles"
```

---

### Task 7: Diagram components (wide and tall variants)

**Files:**
- Create: `components/diagrams/DiagramFrame.tsx`, `PlatformMap.tsx`, `RouterFlow.tsx`, `GhostWatchFlow.tsx`, `DiscoveryFlow.tsx`, `AccessFlow.tsx`
- Create: `components/diagrams/diagrams.test.tsx`

**Interfaces:**
- Produces: default-export components with no props; each renders `<div class="dwrap">` containing two `<svg>` elements, one `class="d d-wide"` and one `class="d d-tall"`. `PlatformMap` renders `class="map d d-wide"` and `class="map d d-tall"` and includes a `<title>`.
- Produces: `DIAGRAMS: Record<DiagramKey, ComponentType>` exported from `components/diagrams/index.ts`.

- [ ] **Step 1: Write the failing test**

`components/diagrams/diagrams.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import { DIAGRAMS } from './index'
import PlatformMap from './PlatformMap'

describe('diagrams', () => {
  it.each(Object.keys(DIAGRAMS))('%s renders a wide and a tall SVG', (key) => {
    const C = DIAGRAMS[key as keyof typeof DIAGRAMS]
    const { container } = render(<C />)
    expect(container.querySelector('svg.d-wide')).not.toBeNull()
    expect(container.querySelector('svg.d-tall')).not.toBeNull()
    const tall = container.querySelector('svg.d-tall')!
    expect(Number(tall.getAttribute('viewBox')!.split(' ')[2])).toBeLessThanOrEqual(360)
  })
  it('platform map has an accessible title in both variants', () => {
    const { container } = render(<PlatformMap />)
    expect(container.querySelectorAll('svg.map title').length).toBe(2)
    expect(container.querySelector('svg.map title')!.textContent).toMatch(/Platform map/)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest components/diagrams`
Expected: FAIL, module not found.

- [ ] **Step 3: Create `components/diagrams/DiagramFrame.tsx`**

```tsx
import type { ReactNode } from 'react'

// Holds a wide and a tall SVG variant of the same diagram. CSS shows one per
// breakpoint (700px). Never scrolls sideways.
export default function DiagramFrame({ children }: { children: ReactNode }) {
  return <div className="dwrap">{children}</div>
}
```

- [ ] **Step 4: Create `components/diagrams/RouterFlow.tsx`**

```tsx
import DiagramFrame from './DiagramFrame'

export default function RouterFlow() {
  return (
    <DiagramFrame>
      <svg className="d d-wide" viewBox="0 0 480 150" aria-hidden="true">
        <rect x="6" y="56" width="76" height="36" rx="6" className="node" /><text x="18" y="78" className="lbl">prompt</text>
        <path d="M82 74 H104" className="edge hot" />
        <path d="M104 74 V36 H106 M104 74 V112 H106" className="edge hot" />
        <rect x="106" y="18" width="110" height="36" rx="6" className="node" /><text x="118" y="40" className="lbl">keyword path</text>
        <text x="112" y="78" className="tiny">deterministic?</text>
        <rect x="106" y="94" width="110" height="36" rx="6" className="node hot" /><text x="118" y="116" className="lbl">neural path</text>
        <path d="M216 36 H238 V74 M216 112 H238 V74 H258" className="edge hot" />
        <rect x="260" y="56" width="76" height="36" rx="6" className="node hot" /><text x="272" y="78" className="lbl">route</text>
        <path d="M336 74 H358" className="edge hot" />
        <path d="M358 74 V43 H370 M358 74 V107 H370" className="edge hot" />
        <rect x="372" y="30" width="100" height="26" rx="5" className="node" /><text x="382" y="47" className="tiny">agent 1</text>
        <rect x="372" y="62" width="100" height="26" rx="5" className="node" /><text x="382" y="79" className="tiny">agent 19</text>
        <rect x="372" y="94" width="100" height="26" rx="5" className="node" /><text x="382" y="111" className="tiny">LLM fallback</text>
        <path d="M422 120 V142 H161 V131" className="edge" strokeDasharray="3 3" />
        <text x="176" y="146" className="tiny">corrections retrain the router</text>
      </svg>
      <svg className="d d-tall" viewBox="0 0 360 300" aria-hidden="true">
        <rect x="130" y="8" width="100" height="32" rx="6" className="node" /><text x="150" y="29" className="lbl">prompt</text>
        <path d="M180 40 V56 H90 V70 M180 56 H270 V70" className="edge hot" /><text x="188" y="53" className="tiny">deterministic?</text>
        <rect x="20" y="72" width="140" height="36" rx="6" className="node" /><text x="32" y="95" className="lbl">keyword path</text>
        <rect x="200" y="72" width="140" height="36" rx="6" className="node hot" /><text x="212" y="95" className="lbl">neural path</text>
        <path d="M90 108 V124 H270 V108 M180 124 V138" className="edge hot" />
        <rect x="130" y="140" width="100" height="32" rx="6" className="node hot" /><text x="150" y="161" className="lbl">route</text>
        <path d="M180 172 V188 H60 V202 M180 188 H300 V202 M180 188 V202" className="edge hot" />
        <rect x="10" y="204" width="100" height="30" rx="5" className="node" /><text x="22" y="223" className="tiny">agent 1</text>
        <rect x="130" y="204" width="100" height="30" rx="5" className="node" /><text x="142" y="223" className="tiny">agent 19</text>
        <rect x="250" y="204" width="100" height="30" rx="5" className="node" /><text x="262" y="223" className="tiny">LLM fallback</text>
        <path d="M300 234 V268 H352 V90 H340" className="edge" strokeDasharray="3 3" />
        <text x="14" y="290" className="tiny">corrections retrain the router</text>
      </svg>
    </DiagramFrame>
  )
}
```

- [ ] **Step 5: Create `components/diagrams/GhostWatchFlow.tsx`**

```tsx
import DiagramFrame from './DiagramFrame'

export default function GhostWatchFlow() {
  return (
    <DiagramFrame>
      <svg className="d d-wide" viewBox="0 0 480 120" aria-hidden="true">
        <text x="6" y="16" className="tiny">live</text><text x="126" y="16" className="tiny">live</text><text x="246" y="16" className="tiny">live</text><text x="366" y="16" className="tiny">in progress</text>
        <rect x="6" y="30" width="108" height="44" rx="6" className="node ok" /><text x="16" y="49" className="lbl">detect</text><text x="16" y="64" className="tiny">classifier</text>
        <path d="M114 52 H124" className="edge" />
        <rect x="126" y="30" width="108" height="44" rx="6" className="node ok" /><text x="136" y="49" className="lbl">plan</text><text x="136" y="64" className="tiny">LLM on Foundry</text>
        <path d="M234 52 H244" className="edge" />
        <rect x="246" y="30" width="108" height="44" rx="6" className="node ok" /><text x="256" y="49" className="lbl">build</text><text x="256" y="64" className="tiny">exporters, ADX</text>
        <path d="M354 52 H364" className="edge" />
        <rect x="366" y="30" width="108" height="44" rx="6" className="node" /><text x="376" y="49" className="lbl">investigate</text><text x="376" y="64" className="tiny">Azure SRE Agent</text>
        <path d="M420 74 V98 H60 V74" className="edge" strokeDasharray="3 3" />
        <text x="150" y="112" className="tiny">self-healing loop, in pilot</text>
      </svg>
      <svg className="d d-tall" viewBox="0 0 360 272" aria-hidden="true">
        <rect x="20" y="14" width="240" height="44" rx="6" className="node ok" /><text x="32" y="33" className="lbl">detect</text><text x="32" y="48" className="tiny">classifier</text><text x="272" y="41" className="tiny">live</text>
        <path d="M140 58 V76" className="edge" />
        <rect x="20" y="76" width="240" height="44" rx="6" className="node ok" /><text x="32" y="95" className="lbl">plan</text><text x="32" y="110" className="tiny">LLM on Foundry</text><text x="272" y="103" className="tiny">live</text>
        <path d="M140 120 V138" className="edge" />
        <rect x="20" y="138" width="240" height="44" rx="6" className="node ok" /><text x="32" y="157" className="lbl">build</text><text x="32" y="172" className="tiny">exporters, ADX</text><text x="272" y="165" className="tiny">live</text>
        <path d="M140 182 V200" className="edge" />
        <rect x="20" y="200" width="240" height="44" rx="6" className="node" /><text x="32" y="219" className="lbl">investigate</text><text x="32" y="234" className="tiny">Azure SRE Agent</text><text x="272" y="227" className="tiny">in progress</text>
        <path d="M20 222 H8 V36 H20" className="edge" strokeDasharray="3 3" />
        <text x="20" y="264" className="tiny">self-healing loop, in pilot</text>
      </svg>
    </DiagramFrame>
  )
}
```

- [ ] **Step 6: Create `components/diagrams/DiscoveryFlow.tsx`**

```tsx
import DiagramFrame from './DiagramFrame'

export default function DiscoveryFlow() {
  return (
    <DiagramFrame>
      <svg className="d d-wide" viewBox="0 0 480 110" aria-hidden="true">
        <rect x="6" y="14" width="100" height="26" rx="5" className="node" /><text x="16" y="31" className="tiny">server 001</text>
        <rect x="6" y="46" width="100" height="26" rx="5" className="node" /><text x="16" y="63" className="tiny">server 002</text>
        <rect x="6" y="78" width="100" height="26" rx="5" className="node" /><text x="16" y="95" className="tiny">server n</text>
        <path d="M106 27 H134 V59 M106 59 H134 M106 91 H134 V59 H154" className="edge" />
        <rect x="156" y="36" width="110" height="46" rx="6" className="node hot" /><text x="166" y="55" className="lbl">discovery</text><text x="166" y="70" className="tiny">scheduled</text>
        <path d="M266 59 H290" className="edge hot" />
        <rect x="292" y="36" width="180" height="46" rx="6" className="node" /><text x="302" y="55" className="lbl">system of record</text><text x="302" y="70" className="tiny">JSONB, 224 routes</text>
      </svg>
      <svg className="d d-tall" viewBox="0 0 360 190" aria-hidden="true">
        <rect x="10" y="10" width="105" height="28" rx="5" className="node" /><text x="20" y="28" className="tiny">server 001</text>
        <rect x="127" y="10" width="105" height="28" rx="5" className="node" /><text x="137" y="28" className="tiny">server 002</text>
        <rect x="245" y="10" width="105" height="28" rx="5" className="node" /><text x="255" y="28" className="tiny">server n</text>
        <path d="M62 38 V54 H298 V38 M180 38 V70" className="edge" />
        <rect x="110" y="72" width="140" height="44" rx="6" className="node hot" /><text x="122" y="91" className="lbl">discovery</text><text x="122" y="106" className="tiny">scheduled</text>
        <path d="M180 116 V132" className="edge hot" />
        <rect x="60" y="134" width="240" height="44" rx="6" className="node" /><text x="72" y="153" className="lbl">system of record</text><text x="72" y="168" className="tiny">JSONB, 224 routes</text>
      </svg>
    </DiagramFrame>
  )
}
```

- [ ] **Step 7: Create `components/diagrams/AccessFlow.tsx`**

```tsx
import DiagramFrame from './DiagramFrame'

export default function AccessFlow() {
  return (
    <DiagramFrame>
      <svg className="d d-wide" viewBox="0 0 480 100" aria-hidden="true">
        <rect x="6" y="30" width="108" height="40" rx="6" className="node" /><text x="16" y="48" className="lbl">request</text><text x="16" y="62" className="tiny">approved change</text>
        <path d="M114 50 H124" className="edge hot" />
        <rect x="126" y="30" width="108" height="40" rx="6" className="node hot" /><text x="136" y="48" className="lbl">unlock</text><text x="136" y="62" className="tiny">Key Vault</text>
        <path d="M234 50 H244" className="edge hot" />
        <rect x="246" y="30" width="108" height="40" rx="6" className="node ok" /><text x="256" y="48" className="lbl">session</text><text x="256" y="62" className="tiny">time-boxed</text>
        <path d="M354 50 H364" className="edge" />
        <rect x="366" y="30" width="108" height="40" rx="6" className="node" /><text x="376" y="48" className="lbl">lock</text><text x="376" y="62" className="tiny">on expiry</text>
        <path d="M420 70 V90 H180 V70" className="edge" strokeDasharray="3 3" />
        <text x="196" y="86" className="tiny">reconciler re-locks orphans</text>
      </svg>
      <svg className="d d-tall" viewBox="0 0 360 276" aria-hidden="true">
        <rect x="20" y="14" width="240" height="44" rx="6" className="node" /><text x="32" y="33" className="lbl">request</text><text x="32" y="48" className="tiny">approved change</text>
        <path d="M140 58 V76" className="edge hot" />
        <rect x="20" y="76" width="240" height="44" rx="6" className="node hot" /><text x="32" y="95" className="lbl">unlock</text><text x="32" y="110" className="tiny">Key Vault</text>
        <path d="M140 120 V138" className="edge hot" />
        <rect x="20" y="138" width="240" height="44" rx="6" className="node ok" /><text x="32" y="157" className="lbl">session</text><text x="32" y="172" className="tiny">time-boxed</text>
        <path d="M140 182 V200" className="edge" />
        <rect x="20" y="200" width="240" height="44" rx="6" className="node" /><text x="32" y="219" className="lbl">lock</text><text x="32" y="234" className="tiny">on expiry</text>
        <path d="M260 222 H300 V160 H262" className="edge" strokeDasharray="3 3" />
        <text x="20" y="268" className="tiny">reconciler re-locks orphans</text>
      </svg>
    </DiagramFrame>
  )
}
```

- [ ] **Step 8: Create `components/diagrams/PlatformMap.tsx`**

```tsx
import DiagramFrame from './DiagramFrame'

const TITLE =
  'Platform map: signals flow into a semantic router, out to specialist agents, and onto the hosted platform. GhostWatch watches it and feeds incidents back in.'

function Markers({ prefix }: { prefix: string }) {
  return (
    <defs>
      <marker id={`${prefix}-hot`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0.5 8 4 0 7.5z" fill="#7FA6FF" /></marker>
      <marker id={`${prefix}-ok`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0.5 8 4 0 7.5z" fill="#3FC48E" /></marker>
      <marker id={`${prefix}-dim`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0.5 8 4 0 7.5z" fill="rgba(175,192,220,.7)" /></marker>
    </defs>
  )
}

export default function PlatformMap() {
  return (
    <DiagramFrame>
      <svg className="map d d-wide" viewBox="0 0 560 330" role="img" aria-labelledby="map-wide-title">
        <title id="map-wide-title">{TITLE}</title>
        <Markers prefix="mw" />
        <text x="12" y="22" className="tiny">requests</text>
        <rect x="12" y="34" width="118" height="30" rx="6" className="node" /><text x="22" y="53" className="lbl">engineers</text>
        <rect x="12" y="76" width="118" height="30" rx="6" className="node" /><text x="22" y="95" className="lbl">CI / pipelines</text>
        <rect x="12" y="118" width="118" height="30" rx="6" className="node" /><text x="22" y="137" className="lbl">incident signals</text>
        <path d="M130 49 H172 V91 M130 91 H172 M130 133 H172 V91" className="edge" />
        <path d="M172 91 H206" className="edge hot" markerEnd="url(#mw-hot)" />
        <rect x="208" y="52" width="140" height="78" rx="8" className="node hot" />
        <text x="222" y="76" className="lbl">semantic router</text>
        <text x="222" y="93" className="tiny">bi-encoder + cross-encoder</text>
        <text x="222" y="107" className="tiny">pgvector retrieval, &lt;100 ms</text>
        <text x="222" y="121" className="tiny">MCP tool gateway</text>
        <path d="M348 91 H386" className="edge hot" markerEnd="url(#mw-hot)" />
        <rect x="388" y="40" width="160" height="100" rx="8" className="node hot" />
        <text x="402" y="62" className="lbl">19 specialist agents</text>
        <text x="402" y="80" className="tiny">deploy   cloud   pipelines</text>
        <text x="402" y="94" className="tiny">access   database   monitoring</text>
        <text x="402" y="108" className="tiny">incident   windows   linux</text>
        <text x="402" y="126" className="tiny">268 scoped tools</text>
        <rect x="12" y="186" width="536" height="126" rx="10" className="band" />
        <text x="24" y="206" className="tiny">hosted platform, multi-tenant, 99.99% uptime</text>
        <path d="M468 140 V182" className="edge hot" markerEnd="url(#mw-hot)" /><text x="476" y="166" className="tiny">act</text>
        <rect x="24" y="220" width="150" height="72" rx="8" className="node" /><text x="36" y="242" className="lbl">HEN</text><text x="36" y="258" className="tiny">fleet system of record</text><text x="36" y="272" className="tiny">continuous discovery</text>
        <rect x="196" y="220" width="150" height="72" rx="8" className="node" /><text x="208" y="242" className="lbl">HAM</text><text x="208" y="258" className="tiny">just-in-time access</text><text x="208" y="272" className="tiny">0 standing credentials</text>
        <rect x="368" y="220" width="168" height="72" rx="8" className="node ok" /><text x="380" y="242" className="lbl">GhostWatch</text><text x="380" y="258" className="tiny">detect, plan, build, investigate</text><text x="380" y="272" className="tiny">Foundry + Azure SRE Agent</text>
        <path d="M452 220 V172 H100 V150" className="edge ok" markerEnd="url(#mw-ok)" /><text x="250" y="168" className="tiny">incidents feed back in</text>
        <path d="M174 256 H190 V120 H206" className="edge" markerEnd="url(#mw-dim)" /><text x="140" y="304" className="tiny">HEN supplies fleet context to the router</text>
      </svg>
      <svg className="map d d-tall" viewBox="0 0 360 566" role="img" aria-labelledby="map-tall-title">
        <title id="map-tall-title">{TITLE}</title>
        <Markers prefix="mt" />
        <text x="12" y="16" className="tiny">requests</text>
        <rect x="12" y="22" width="108" height="30" rx="6" className="node" /><text x="22" y="41" className="lbl">engineers</text>
        <rect x="126" y="22" width="108" height="30" rx="6" className="node" /><text x="136" y="41" className="lbl">CI / pipelines</text>
        <rect x="240" y="22" width="108" height="30" rx="6" className="node" /><text x="248" y="41" className="lbl">incident signals</text>
        <path d="M66 52 V64 H294 V52 M180 52 V64" className="edge" /><path d="M180 64 V78" className="edge hot" markerEnd="url(#mt-hot)" />
        <rect x="30" y="80" width="300" height="70" rx="8" className="node hot" />
        <text x="44" y="102" className="lbl">semantic router</text><text x="44" y="120" className="tiny">bi-encoder + cross-encoder, pgvector retrieval</text><text x="44" y="136" className="tiny">&lt;100 ms, MCP tool gateway</text>
        <path d="M180 150 V166" className="edge hot" markerEnd="url(#mt-hot)" />
        <rect x="30" y="168" width="300" height="76" rx="8" className="node hot" />
        <text x="44" y="190" className="lbl">19 specialist agents</text><text x="44" y="208" className="tiny">deploy  cloud  pipelines  access  database</text><text x="44" y="222" className="tiny">monitoring  incident  windows  linux</text><text x="44" y="238" className="tiny">268 scoped tools</text>
        <path d="M180 244 V270" className="edge hot" markerEnd="url(#mt-hot)" /><text x="188" y="262" className="tiny">act</text>
        <rect x="12" y="272" width="336" height="284" rx="10" className="band" />
        <text x="24" y="292" className="tiny">hosted platform, multi-tenant, 99.99% uptime</text>
        <rect x="30" y="302" width="300" height="52" rx="8" className="node" /><text x="44" y="322" className="lbl">HEN</text><text x="44" y="340" className="tiny">fleet system of record, continuous discovery</text>
        <rect x="30" y="366" width="300" height="52" rx="8" className="node" /><text x="44" y="386" className="lbl">HAM</text><text x="44" y="404" className="tiny">just-in-time access, 0 standing credentials</text>
        <rect x="30" y="430" width="300" height="64" rx="8" className="node ok" /><text x="44" y="450" className="lbl">GhostWatch</text><text x="44" y="468" className="tiny">detect, plan, build, investigate</text><text x="44" y="482" className="tiny">Foundry + Azure SRE Agent</text>
        <path d="M30 462 H18 V115 H28" className="edge ok" markerEnd="url(#mt-ok)" />
        <path d="M330 328 H342 V125 H332" className="edge" markerEnd="url(#mt-dim)" />
        <text x="44" y="522" className="tiny">GhostWatch incidents feed back into the router</text>
        <text x="44" y="540" className="tiny">HEN supplies fleet context to the router</text>
      </svg>
    </DiagramFrame>
  )
}
```

- [ ] **Step 9: Create `components/diagrams/index.ts`**

```ts
import type { ComponentType } from 'react'
import type { DiagramKey } from '../../lib/systems-data'
import RouterFlow from './RouterFlow'
import GhostWatchFlow from './GhostWatchFlow'
import DiscoveryFlow from './DiscoveryFlow'
import AccessFlow from './AccessFlow'

export const DIAGRAMS: Record<DiagramKey, ComponentType> = {
  router: RouterFlow,
  ghostwatch: GhostWatchFlow,
  discovery: DiscoveryFlow,
  access: AccessFlow,
}
```

- [ ] **Step 10: Run test, commit**

Run: `npx jest components/diagrams` → PASS.

```bash
git add components/diagrams
git commit -m "feat: platform map and system flow diagrams with wide and tall variants"
```

---

### Task 8: Systems section

**Files:**
- Create: `components/systems/SystemRow.tsx`, `components/systems/SystemsSection.tsx`, `components/systems/SystemsSection.test.tsx`

**Interfaces:**
- Consumes: `systems`, `System` from `lib/systems-data`; `DIAGRAMS` from `components/diagrams`.
- Produces: `<SystemsSection />` rendering `<section id="systems">`.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react'
import SystemsSection from './SystemsSection'

describe('SystemsSection', () => {
  it('renders the four systems with status pills and metrics', () => {
    render(<SystemsSection />)
    expect(screen.getByRole('heading', { level: 2, name: 'Systems I own' })).toBeInTheDocument()
    for (const name of ['Internal AI agent platform', 'GhostWatch', 'Hosted Environment Navigator', 'Hosted Access Manager']) {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument()
    }
    expect(screen.getByText('Self-healing in pilot')).toHaveClass('pill-warn')
    expect(screen.getByText('0.81')).toBeInTheDocument()
  })
  it('renders an icon inside every stack tag and wraps tags', () => {
    const { container } = render(<SystemsSection />)
    const tags = container.querySelectorAll('.stack-tag')
    expect(tags.length).toBeGreaterThan(10)
    tags.forEach((tag) => expect(tag.querySelector('svg')).not.toBeNull())
    expect(container.querySelector('.stack')).not.toBeNull()
  })
  it('alternates figure side', () => {
    const { container } = render(<SystemsSection />)
    const rows = container.querySelectorAll('article.sys')
    expect(rows[0]).not.toHaveClass('sys-flip')
    expect(rows[1]).toHaveClass('sys-flip')
  })
})
```

- [ ] **Step 2: Run test to verify it fails** → `npx jest components/systems` FAIL.

- [ ] **Step 3: Create `components/systems/SystemRow.tsx`**

```tsx
import type { System } from '../../lib/systems-data'
import { DIAGRAMS } from '../diagrams'

export default function SystemRow({ system, flip }: { system: System; flip: boolean }) {
  const Diagram = DIAGRAMS[system.diagram]
  return (
    <article className={`sys ${flip ? 'sys-flip' : ''}`} id={`system-${system.id}`}>
      <div className="sys-text">
        <div className="sys-pills">
          {system.status.map((s) => (
            <span key={s.label} className={`pill pill-${s.tone}`}>{s.label}</span>
          ))}
        </div>
        <h3 className="pa-h3 sys-title">{system.title}</h3>
        <p className="sys-sub">{system.subtitle}</p>
        <p className="sys-desc">{system.description}</p>
        <ul className="sys-outcomes">
          {system.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <div className="stack">
          {system.stack.map((item) => (
            <span key={item.name} className="stack-tag">
              <item.Icon aria-hidden="true" />
              {item.name}
            </span>
          ))}
        </div>
      </div>
      <div className="sys-fig">
        <Diagram />
        <div className="fig-metrics">
          {system.metrics.map((m) => (
            <div key={m.label} className="metric-tile">
              <span className="metric-value">{m.value}</span>
              <span className="metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
```

- [ ] **Step 4: Create `components/systems/SystemsSection.tsx`**

```tsx
import { systems } from '../../lib/systems-data'
import SystemRow from './SystemRow'

export default function SystemsSection() {
  return (
    <section id="systems" className="pa-section">
      <div className="pa-wrap">
        <h2 className="pa-h2">Systems I own</h2>
        <p className="pa-lede">
          Each of these runs in production today. I architected them, wrote most of the code, and
          operate them with the team I lead.
        </p>
        <div className="systems-grid">
          {systems.map((s, i) => (
            <SystemRow key={s.id} system={s} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run test, commit**

`npx jest components/systems` → PASS.

```bash
git add components/systems
git commit -m "feat: Systems section with alternating rows, diagrams, and iconed stacks"
```

---

### Task 9: Hero and status strip (with live deploy cell)

**Files:**
- Create: `components/hero/Hero.tsx`, `components/hero/StatusStrip.tsx`, `components/hero/LiveDeployCell.tsx`, `components/hero/hero.test.tsx`

**Interfaces:**
- Consumes: `SITE`, `resumeData`, `PlatformMap`, `LinkedInIcon`, `fromBrand(siGithub)`.
- Produces: `<Hero />` (`<header id="top" class="hero-pa">`), `<StatusStrip />`, `<LiveDeployCell />` (client, fetches `/api/workflows`, renders `v{run_number}` or the fallback `live`).

- [ ] **Step 1: Write the failing test**

`components/hero/hero.test.tsx`:

```tsx
import { render, screen, waitFor } from '@testing-library/react'
import Hero from './Hero'
import StatusStrip from './StatusStrip'
import LiveDeployCell from './LiveDeployCell'

describe('Hero', () => {
  it('leads with the role and thesis, no phone, no availability line', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1, name: 'Bruno Marcuche' })).toBeInTheDocument()
    expect(screen.getByText('Platform Architect')).toBeInTheDocument()
    expect(screen.getByText(/control plane for a multi-tenant hosted platform/)).toBeInTheDocument()
    expect(screen.queryByText(/561-284/)).toBeNull()
    expect(screen.queryByText(/Open to/)).toBeNull()
    expect(screen.getByRole('link', { name: 'See the systems' })).toHaveAttribute('href', '#systems')
  })
})

describe('StatusStrip', () => {
  it('shows outcome figures and no fleet or client counts', () => {
    render(<StatusStrip />)
    expect(screen.getByText('99.99%')).toBeInTheDocument()
    expect(screen.getByText('10,000+')).toBeInTheDocument()
    expect(screen.queryByText(/350|150\+/)).toBeNull()
  })
})

describe('LiveDeployCell', () => {
  afterEach(() => jest.restoreAllMocks())
  it('shows the latest run number', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: async () => ({ workflow_runs: [{ run_number: 101 }] }) } as Response)
    render(<LiveDeployCell />)
    await waitFor(() => expect(screen.getByText('v101')).toBeInTheDocument())
  })
  it('falls back when the fetch fails', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'))
    render(<LiveDeployCell />)
    expect(screen.getByText('live')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('this site, deployed by CI')).toBeInTheDocument())
    expect(screen.queryByText(/undefined/)).toBeNull()
  })
  it('falls back on an empty run list', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: async () => ({ workflow_runs: [] }) } as Response)
    render(<LiveDeployCell />)
    await waitFor(() => expect(screen.getByText('live')).toBeInTheDocument())
  })
})
```

- [ ] **Step 2: Run test to verify it fails** → `npx jest components/hero` FAIL.

- [ ] **Step 3: Create `components/hero/LiveDeployCell.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'

// Reads the latest GitHub Actions run number through the site's own API.
// Degrades to a static label when the API is unavailable (no token, rate limit).
export default function LiveDeployCell() {
  const [run, setRun] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/workflows')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { workflow_runs?: { run_number?: number }[] }) => {
        const n = data.workflow_runs?.[0]?.run_number
        if (!cancelled && typeof n === 'number') setRun(n)
      })
      .catch(() => {
        /* keep the fallback */
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="stat">
      <span className="stat-value pa-mono" style={{ fontSize: '1.1rem', paddingTop: 6 }}>
        {run === null ? 'live' : `v${run}`}
      </span>
      <span className="stat-live">
        <i aria-hidden="true" />
        this site, deployed by CI
      </span>
    </div>
  )
}
```

- [ ] **Step 4: Create `components/hero/StatusStrip.tsx`**

```tsx
import LiveDeployCell from './LiveDeployCell'

const STATS = [
  { value: '99.99%', label: 'platform uptime' },
  { value: '10,000+', label: 'ops tasks routed by agents' },
  { value: '89%', label: 'less change lead time' },
  { value: '235', label: 'pipelines built by agents' },
  { value: '426', label: 'manual deploy hours removed' },
]

export default function StatusStrip() {
  return (
    <div className="status-strip" aria-label="Platform outcomes">
      <div className="pa-wrap">
        {STATS.map((s) => (
          <div key={s.label} className="stat">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
        <LiveDeployCell />
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Create `components/hero/Hero.tsx`**

```tsx
import { siGithub } from 'simple-icons'
import { resumeData } from '../../lib/resume-data'
import { SITE } from '../../lib/site'
import { fromBrand, LinkedInIcon } from '../icons/BrandIcon'
import PlatformMap from '../diagrams/PlatformMap'

const GitHubIcon = fromBrand(siGithub)

export default function Hero() {
  const { name, contact } = resumeData
  const stamp = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  return (
    <header className="hero-pa site-hero" id="top">
      <div className="pa-wrap">
        <div>
          <h1 className="hero-name">{name}</h1>
          <p className="hero-role">{SITE.role}</p>
          <p className="hero-thesis">
            {SITE.thesis} <span>{SITE.location}.</span>
          </p>
          <div className="hero-cta">
            <a className="pa-btn pa-btn-primary" href="#systems">See the systems</a>
            <a className="pa-btn" href={contact.linkedin.url} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon /> LinkedIn
            </a>
            <a className="pa-btn" href={contact.github.url} target="_blank" rel="noopener noreferrer">
              <GitHubIcon /> GitHub
            </a>
          </div>
          <div className="hero-contact pa-mono">
            <span>{contact.email}</span>
            <span>{contact.website.label}</span>
          </div>
        </div>
        <div>
          <PlatformMap />
          <p className="hero-map-cap pa-mono">platform map, {stamp}</p>
        </div>
      </div>
    </header>
  )
}
```

The `site-hero` class is kept on the header because `SiteNav` measures `.site-hero` to decide when to show the brand card.

- [ ] **Step 6: Run test, commit**

`npx jest components/hero` → PASS.

```bash
git add components/hero
git commit -m "feat: Platform Architect hero with platform map and live status strip"
```

---

### Task 10: Experience timeline

**Files:**
- Create: `components/experience/Timeline.tsx`, `components/experience/Timeline.test.tsx`

**Interfaces:**
- Consumes: `resumeData.experience`, `resumeData.education`, `resumeData.volunteering`, `SITE.pdfPath`.
- Produces: `<Timeline />` rendering `<section id="experience">`.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react'
import Timeline from './Timeline'

describe('Timeline', () => {
  it('renders every employer and opens the current role by default', () => {
    const { container } = render(<Timeline />)
    for (const c of ['AssetWorks', 'EdventureTrek', 'AnswerRocket', 'OfficeSpace Software', 'Hewlett Packard', 'ITT Technical Institute']) {
      expect(screen.getByText(c)).toBeInTheDocument()
    }
    const entries = container.querySelectorAll('details.tl-entry')
    expect(entries[0]).toHaveAttribute('open')
    expect(entries[1]).not.toHaveAttribute('open')
  })
  it('labels the current role Platform Architect', () => {
    render(<Timeline />)
    expect(screen.getByText('Operations Team Lead, Platform Architect')).toBeInTheDocument()
  })
  it('links to the PDF', () => {
    render(<Timeline />)
    expect(screen.getByRole('link', { name: /full resume as PDF/ })).toHaveAttribute('href', '/resume/bruno_marcuche_resume.pdf')
  })
})
```

- [ ] **Step 2: Run test to verify it fails** → FAIL.

- [ ] **Step 3: Create `components/experience/Timeline.tsx`**

```tsx
import { resumeData } from '../../lib/resume-data'
import { SITE } from '../../lib/site'

// One-line summaries shown in the collapsed row. Keyed by company so the
// resume bullets stay the single source of truth for detail.
const ONE_LINERS: Record<string, string> = {
  AssetWorks: 'Architected the AI agent platform, HEN, HAM and GhostWatch.',
  EdventureTrek: 'Educational exploration game. Python/FastAPI backend, custom taxonomy GPTs, CI/CD on GCP.',
  AnswerRocket: 'Led a remote SRE team on AWS. Supported SOC 2 with automated environment validation.',
  'OfficeSpace Software': 'Owned production on GCP. Rackspace to GCP migration, CI pipeline, Slackbot deploys under 10 minutes.',
  'Hewlett Packard': 'Tier 3 for HP Server Automation. Python automation on the HPSA API. Ranked first for customer satisfaction.',
}

// The current role reads as Platform Architect on the timeline; the PDF keeps
// the employer's title from resume-data.
const TITLE_OVERRIDES: Record<string, string> = {
  AssetWorks: 'Operations Team Lead, Platform Architect',
}

function Entry({ when, who, role, one, open, children }: { when: string; who: string; role: string; one: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details className="tl-entry" open={open}>
      <summary>
        <span className="tl-when">{when}</span>
        <span className="tl-who"><b>{who}</b><span>{role}</span></span>
        <span className="tl-chev" aria-hidden="true">▼</span>
        <span className="tl-one">{one}</span>
      </summary>
      {children}
    </details>
  )
}

export default function Timeline() {
  const { experience, education, volunteering } = resumeData
  const edu = education[0]
  const vol = volunteering[0]
  return (
    <section id="experience" className="pa-section">
      <div className="pa-wrap">
        <h2 className="pa-h2">Experience</h2>
        <p className="pa-lede">
          Twenty years across on-prem, hybrid and cloud, from HP Server Automation in Brazil to a
          multi-tenant hosted platform on Azure. Expand a role for detail, or take the{' '}
          <a className="pa-link" href={SITE.pdfPath} download={SITE.pdfName}>full resume as PDF</a>.
        </p>
        <div className="tl">
          {experience.map((job, i) => (
            <Entry
              key={`${job.company}-${job.start}`}
              when={`${job.start} to ${job.end}`}
              who={job.company}
              role={TITLE_OVERRIDES[job.company] ?? job.title}
              one={`${ONE_LINERS[job.company] ?? ''} ${job.location}.`.trim()}
              open={i === 0}
            >
              <ul>
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Entry>
          ))}
          <Entry
            when={`${edu.start} to ${edu.end}`}
            who={edu.school}
            role={edu.degree}
            one={`${edu.location}. Volunteer: ${vol.org}, ${vol.role.toLowerCase()}, ${vol.start} to ${vol.end}.`}
          >
            <ul>{edu.note && <li>{edu.note}.</li>}</ul>
          </Entry>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test, commit**

`npx jest components/experience` → PASS.

```bash
git add components/experience
git commit -m "feat: collapsible experience timeline from resume data"
```

---

### Task 11: Outcomes and How I work sections

**Files:**
- Create: `components/outcomes/OutcomesSection.tsx`, `components/practice/PracticeSection.tsx`, `components/outcomes/sections.test.tsx`

- [ ] **Step 1: Write the failing test**

`components/outcomes/sections.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import OutcomesSection from './OutcomesSection'
import PracticeSection from '../practice/PracticeSection'

describe('OutcomesSection', () => {
  it('shows before/after lead times with to-scale bars', () => {
    const { container } = render(<OutcomesSection />)
    expect(screen.getByText(/was ~27 days/)).toBeInTheDocument()
    const bars = container.querySelectorAll('.out-bar')
    expect(bars.length).toBe(2)
    const [before, after] = Array.from(bars[0].querySelectorAll('i')).map((i) => parseFloat((i as HTMLElement).style.width))
    expect(after / before).toBeCloseTo(3 / 27, 1)
  })
})

describe('PracticeSection', () => {
  it('renders four principles without headcount', () => {
    render(<PracticeSection />)
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4)
    expect(screen.queryByText(/five engineers|five-person/i)).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to verify it fails** → FAIL.

- [ ] **Step 3: Create `components/outcomes/OutcomesSection.tsx`**

```tsx
interface Outcome { from: string; value: string; unit: string; note: string; bar?: { before: number; after: number; max: number } }

const OUTCOMES: Outcome[] = [
  { from: 'customer upgrade, was ~27 days', value: '<3', unit: 'days', note: '213 upgrade deployments automated. Lead time keeps falling month over month.', bar: { before: 27, after: 3, max: 27 } },
  { from: 'new environment, was ~12 days', value: '1.5', unit: 'days', note: 'Provisioning runs as agent-built Ansible pipelines instead of tickets.', bar: { before: 12, after: 1.5, max: 27 } },
  { from: 'manual deploy work removed', value: '426', unit: 'hours', note: '235 pipelines written by agents, reviewed by engineers, across the whole estate.' },
  { from: 'incidents caught by agents', value: '1', unit: 'session', note: 'A single multi-agent session found a fleet-wide config-deletion bug and root-caused an OS update and API regression.' },
]

export default function OutcomesSection() {
  return (
    <section id="outcomes" className="pa-section outcomes-pa">
      <div className="pa-wrap">
        <h2 className="pa-h2">What changed after the platform went live</h2>
        <p className="pa-lede">
          DORA lead time for changes on the hosted platform, before and after the agent platform
          launched in early 2025. Bars are drawn to scale.
        </p>
        <div className="out-grid">
          {OUTCOMES.map((o) => (
            <div key={o.from} className="out">
              <div className="out-from">{o.from}</div>
              <div className="out-to">
                {o.value}
                <small>{o.unit}</small>
              </div>
              {o.bar && (
                <div className="out-bar" aria-hidden="true">
                  <i style={{ width: `${(o.bar.before / o.bar.max) * 100}%` }} />
                  <i className="now" style={{ width: `${(o.bar.after / o.bar.max) * 100}%` }} />
                </div>
              )}
              <p>{o.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `components/practice/PracticeSection.tsx`**

```tsx
import { practice } from '../../lib/practice-data'

export default function PracticeSection() {
  return (
    <section id="practice" className="pa-section">
      <div className="pa-wrap">
        <h2 className="pa-h2">How I work</h2>
        <div className="practice-grid">
          {practice.map((p) => (
            <div key={p.title}>
              <h3 className="pa-h3">{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run test, commit**

`npx jest components/outcomes` → PASS.

```bash
git add components/outcomes components/practice
git commit -m "feat: Outcomes and How I work sections"
```

---

### Task 12: Toolbox with the tile game (game gains progress, hint, solved chips)

**Files:**
- Modify: `components/tech-game/TechTileGame.tsx`
- Modify: `components/tech-game/TechTileGame.test.tsx` (add assertions)
- Create: `components/toolbox/Toolbox.tsx`, `components/toolbox/Toolbox.test.tsx`

**Interfaces:**
- Consumes: `TECH_CATEGORIES` from `lib/tech-data`.
- Produces: `<Toolbox />` rendering `<section id="toolbox">` with `.tools` (hidden below `md`) and `<TechTileGame />` (hidden at `md` and up, as today).

- [ ] **Step 1: Add game assertions**

In `components/tech-game/TechTileGame.test.tsx`, add:

```tsx
it('shows progress, a hint, and solved chips', () => {
  render(<TechTileGame />)
  expect(screen.getByText(`0 / ${TECH_CATEGORIES.length}`)).toBeInTheDocument()
  expect(screen.getByText(/A wrong tap clears/)).toBeInTheDocument()
  expect(screen.getByLabelText('Solved groups')).toBeEmptyDOMElement()
})
```

(import `TECH_CATEGORIES` from `../../lib/tech-data` at the top if not already imported.)

- [ ] **Step 2: Run it to verify it fails** → `npx jest components/tech-game` FAIL on "0 / 7".

- [ ] **Step 3: Update `TechTileGame.tsx`**

Inside the component, after `const [state, setState] = useState<GameState>(initGame)`, add:

```tsx
  const [hint, setHint] = useState(
    'A wrong tap clears your current picks. Solved groups stay locked. Solve them all for a surprise.',
  )
```

In `onTap`, after `setState(result.state)`, add:

```tsx
    if (result.event.kind === 'reset') setHint('Not the same group. Picks cleared; solved groups stay.')
```

and inside the `won` branch add `setHint('All groups solved. Winner theme unlocked for 24 hours and added to the theme toggle.')`.

Replace the returned JSX with:

```tsx
  return (
    <div className="md:hidden">
      <div className="game-head">
        <p className="pa-lede" style={{ marginTop: 0 }}>
          {total} hidden groups. Tap tiles that belong together.
        </p>
        <span className="game-prog">{`${state.solved.length} / ${total}`}</span>
      </div>
      <p className="game-hint">{hint}</p>
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto mt-4">
        {tiles.map((tile) => {
          const selected = state.streak.includes(tile.name)
          const solved = state.solved.includes(tile.category)
          return (
            <button
              type="button"
              key={tile.name}
              onClick={() => onTap(tile)}
              className={`tech-tile ${selected ? 'is-selected' : ''} ${solved ? 'is-solved' : ''}`}
              aria-pressed={selected || solved}
            >
              <span className="tech-tile-icon">
                <tile.Icon aria-hidden="true" />
              </span>
              <span className="tech-tile-name">{tile.name}</span>
              {solved && <StarIcon className="tech-tile-star" aria-hidden="true" />}
            </button>
          )
        })}
      </div>
      <div className="game-solved" aria-label="Solved groups" aria-live="polite">
        {state.solved.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
      <CelebrationToast text={toast.text} visible={toast.visible} finale={toast.finale} />
    </div>
  )
```

- [ ] **Step 4: Run the game tests** → `npx jest components/tech-game lib/tech-game.test.ts` PASS (existing tests must still pass unchanged).

- [ ] **Step 5: Write the failing Toolbox test**

`components/toolbox/Toolbox.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Toolbox from './Toolbox'
import { TECH_CATEGORIES } from '../../lib/tech-data'

describe('Toolbox', () => {
  it('renders every category as a group with iconed tags', () => {
    const { container } = render(<Toolbox />)
    expect(screen.getByRole('heading', { level: 2, name: 'Toolbox' })).toBeInTheDocument()
    expect(container.querySelectorAll('.tools-group').length).toBe(TECH_CATEGORIES.length)
    const tags = container.querySelectorAll('.tools-tag')
    expect(tags.length).toBe(TECH_CATEGORIES.reduce((n, c) => n + c.items.length, 0))
    tags.forEach((t) => expect(t.querySelector('svg')).not.toBeNull())
  })
  it('includes the mobile game', () => {
    render(<Toolbox />)
    expect(screen.getByText(/Tap tiles that belong together/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Create `components/toolbox/Toolbox.tsx`**

```tsx
import { TECH_CATEGORIES } from '../../lib/tech-data'
import TechTileGame from '../tech-game/TechTileGame'

export default function Toolbox() {
  return (
    <section id="toolbox" className="pa-section" style={{ paddingTop: 0 }}>
      <div className="pa-wrap">
        <h2 className="pa-h2">Toolbox</h2>
        {/* Desktop: grouped lists with brand icons */}
        <div className="tools hidden md:grid">
          {TECH_CATEGORIES.map((cat) => (
            <div key={cat.label} className="tools-group">
              <h4>{cat.label}</h4>
              <ul>
                {cat.items.map((item) => (
                  <li key={item.name} className="tools-tag">
                    <item.Icon aria-hidden="true" />
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Mobile: the grouping game over the same items (wrapper is md:hidden) */}
        <TechTileGame />
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Run tests, commit**

`npx jest components/toolbox components/tech-game` → PASS.

```bash
git add components/toolbox components/tech-game
git commit -m "feat: Toolbox section; game shows progress, hint, and solved groups"
```

---

### Task 13: Deploy proof section

**Files:**
- Create: `components/deploys/DeployProof.tsx`, `components/deploys/DeployProof.test.tsx`

**Interfaces:**
- Consumes: `/api/workflows` response `{ workflow_runs: { run_number, head_sha, name, conclusion, created_at, updated_at }[] }`.
- Produces: `<DeployProof />` rendering `<section id="deploys" class="pa-section deploys-pa">`.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen, waitFor } from '@testing-library/react'
import DeployProof from './DeployProof'

describe('DeployProof', () => {
  afterEach(() => jest.restoreAllMocks())
  it('renders the six pipeline steps and a dashboard link', () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'))
    render(<DeployProof />)
    for (const s of ['git push', 'GitHub Actions', 'build and test', 'push image', 'Cloud Run', 'live']) {
      expect(screen.getByText(s)).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: 'deployment dashboard' })).toHaveAttribute('href', '/workflows')
    expect(screen.getByText(/Every push to main/)).toBeInTheDocument()
  })
  it('shows the latest run when the API answers', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ workflow_runs: [{ run_number: 101, head_sha: 'abcdef1234567', name: 'feat: something', conclusion: 'success', created_at: '2026-09-26T00:00:00Z', updated_at: '2026-09-26T00:03:52Z' }] }),
    } as Response)
    render(<DeployProof />)
    await waitFor(() => expect(screen.getByText('#101')).toBeInTheDocument())
    expect(screen.getByText('abcdef1')).toBeInTheDocument()
    expect(screen.getByText(/3m 52s/)).toBeInTheDocument()
  })
  it('never prints undefined on failure', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'))
    const { container } = render(<DeployProof />)
    await waitFor(() => expect(screen.getByText(/Next.js 15 on Cloud Run/)).toBeInTheDocument())
    expect(container.textContent).not.toMatch(/undefined|NaN/)
  })
})
```

- [ ] **Step 2: Run test to verify it fails** → FAIL.

- [ ] **Step 3: Create `components/deploys/DeployProof.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'

const STEPS = ['git push', 'GitHub Actions', 'build and test', 'push image', 'Cloud Run', 'live']

interface Run { run_number: number; head_sha: string; name: string; conclusion: string | null; created_at: string; updated_at: string }

function duration(run: Run): string {
  const s = Math.max(0, Math.round((Date.parse(run.updated_at) - Date.parse(run.created_at)) / 1000))
  return `${Math.floor(s / 60)}m ${s % 60}s`
}

export default function DeployProof() {
  const [run, setRun] = useState<Run | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/workflows')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { workflow_runs?: Run[] }) => {
        const first = data.workflow_runs?.[0]
        if (!cancelled && first && typeof first.run_number === 'number') setRun(first)
      })
      .catch(() => {
        /* fallback copy stays */
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="deploys" className="pa-section deploys-pa">
      <div className="pa-wrap">
        <h2 className="pa-h2">This site is a platform too</h2>
        <p className="pa-lede">
          Every push to main builds a container, ships it to Cloud Run and serves it at
          resume.mindtunnel.org. The full run history is on the{' '}
          <a className="pa-link" href="/workflows">deployment dashboard</a>.
        </p>
        <div className="pipe">
          <div className="pipe-steps">
            {STEPS.map((s) => (
              <span key={s} className="pipe-step">
                <i aria-hidden="true" />
                {s}
              </span>
            ))}
          </div>
          <div className="pipe-run pa-mono">
            {run ? (
              <>
                <span>last run <b>#{run.run_number}</b></span>
                <span><b>{run.head_sha.slice(0, 7)}</b> {run.name}</span>
                <span>{run.conclusion ?? 'in progress'} in <b>{duration(run)}</b></span>
              </>
            ) : (
              <span>latest run on the dashboard</span>
            )}
            <span>Next.js 15 on Cloud Run, GCP</span>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test, commit**

`npx jest components/deploys` → PASS.

```bash
git add components/deploys
git commit -m "feat: Deploys section with live last-run line and static fallback"
```

---

### Task 14: Compose the page, update the nav, remove old sections

**Files:**
- Rewrite: `app/page.tsx`
- Modify: `components/SiteNav.tsx` (NAV_LINKS, TABS)
- Delete: `components/projects/ProjectCard.tsx`, `ProjectIcon.tsx`, `ProjectsSection.tsx`, `Reveal.tsx`, `components/resume/StrengthsHighlight.tsx`, `lib/projects-data.ts`
- Modify: `__tests__/index.test.tsx`
- Modify: `app/workflows/page.tsx` (one heading string)

**Interfaces:**
- Consumes: every component from Tasks 8 to 13 plus `ResumeDocument`, `SiteNav`.

- [ ] **Step 1: Update `__tests__/index.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react'
import Home from '../app/page'

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('no network in tests'))
})
afterEach(() => jest.restoreAllMocks())

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders the sections in order', () => {
    const { container } = render(<Home />)
    const ids = Array.from(container.querySelectorAll('section[id], header[id]')).map((el) => el.id)
    expect(ids).toEqual(['top', 'systems', 'outcomes', 'practice', 'experience', 'toolbox', 'deploys'])
  })

  it('has no Current Setup or Projects sections', () => {
    render(<Home />)
    expect(screen.queryByText('Current Setup')).toBeNull()
    expect(screen.queryByText(/Things I.ve Built/)).toBeNull()
  })

  it('keeps the printable resume in the DOM', () => {
    const { container } = render(<Home />)
    expect(container.querySelector('.resume-document')).not.toBeNull()
  })

  it('shows source link in the footer', () => {
    render(<Home />)
    expect(screen.getByRole('link', { name: /source on github/i })).toHaveAttribute('href', 'https://github.com/bmarcuche/resume-cloudrun')
  })
})
```

- [ ] **Step 2: Run it to verify it fails** → `npx jest __tests__` FAIL.

- [ ] **Step 3: Rewrite `app/page.tsx`**

```tsx
import ResumeDocument from '../components/resume/ResumeDocument'
import SiteNav from '../components/SiteNav'
import Hero from '../components/hero/Hero'
import StatusStrip from '../components/hero/StatusStrip'
import SystemsSection from '../components/systems/SystemsSection'
import OutcomesSection from '../components/outcomes/OutcomesSection'
import PracticeSection from '../components/practice/PracticeSection'
import Timeline from '../components/experience/Timeline'
import Toolbox from '../components/toolbox/Toolbox'
import DeployProof from '../components/deploys/DeployProof'
import { resumeData } from '../lib/resume-data'
import { SITE } from '../lib/site'

export default function Home() {
  const { contact } = resumeData
  return (
    <main className="min-h-screen page-grid pb-24 md:pb-0">
      <SiteNav />
      <Hero />
      <StatusStrip />
      <SystemsSection />
      <OutcomesSection />
      <PracticeSection />
      <Timeline />
      <Toolbox />
      <DeployProof />

      {/* Printable resume: hidden on screen, the single source for the PDF */}
      <section id="resume" className="resume-screen-hidden" aria-hidden="true">
        <div className="pa-wrap">
          <ResumeDocument />
        </div>
      </section>

      <footer className="site-footer site-footer-pa">
        <div className="pa-wrap">
          <span>Bruno Marcuche, {new Date().getFullYear()}</span>
          <a href={SITE.repo} target="_blank" rel="noopener noreferrer">Source on GitHub</a>
          <a href={contact.linkedin.url} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={SITE.pdfPath} download={SITE.pdfName}>Resume PDF</a>
          <span className="pa-mono">{contact.email}</span>
        </div>
      </footer>
    </main>
  )
}
```

Add to `app/globals.css` (in the redesign block):

```css
.resume-screen-hidden { display: none; }
@media print { .resume-screen-hidden { display: block !important; } }
```

- [ ] **Step 4: Update `components/SiteNav.tsx`**

Replace `NAV_LINKS` and `TABS`:

```ts
const NAV_LINKS = [
  { href: '/#systems', label: 'Systems' },
  { href: '/#outcomes', label: 'Outcomes' },
  { href: '/#practice', label: 'How I work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#toolbox', label: 'Toolbox' },
  { href: '/#deploys', label: 'Deploys' },
]

const TABS = [
  { href: '/#systems', label: 'Systems', id: 'systems', Icon: RectangleStackIcon },
  { href: '/#outcomes', label: 'Outcomes', id: 'outcomes', Icon: ChartBarIcon },
  { href: '/#experience', label: 'Experience', id: 'experience', Icon: BriefcaseIcon },
  { href: '/#deploys', label: 'Deploys', id: 'deploys', Icon: ServerStackIcon },
]
```

Update the heroicons import to `ArrowDownTrayIcon, RectangleStackIcon, ChartBarIcon, BriefcaseIcon, ServerStackIcon` (drop `DocumentTextIcon`, `CpuChipIcon`). In the scroll-spy effect change `const ids = ['resume', 'projects', 'technologies']` to `const ids = ['systems', 'outcomes', 'experience', 'deploys']`. In the tab `isActive` logic, `/workflows` is no longer a tab, so simplify to `const isActive = tab.id !== '' && active === tab.id`. Change the PDF button label from `Download PDF` to `Resume PDF`.

- [ ] **Step 5: Delete the replaced files**

```bash
git rm -r components/projects components/resume/StrengthsHighlight.tsx lib/projects-data.ts
```

Search for stale imports: `grep -rn "projects-data\|StrengthsHighlight\|components/projects\|Reveal" app components lib __tests__` must return nothing.

- [ ] **Step 6: Workflows header copy**

In `app/workflows/page.tsx`, change the `// CONTINUOUS DEPLOYMENT` eyebrow and `Deployment Pipeline` heading to eyebrow `Deploys` and heading `Deploy history`. Nothing else.

- [ ] **Step 7: Run everything**

Run: `npm run lint && npm run type-check && npx jest`
Expected: all PASS. Fix any unused-import lint errors from Task 5 (`BoltIcon`) here.

- [ ] **Step 8: Commit**

```bash
git add -A app components lib __tests__
git commit -m "feat: compose the Platform Architect home page; retire Projects, Strengths, Current Setup"
```

---

### Task 15: Print output and PDF regeneration

**Files:**
- Modify: `app/globals.css` (`@media print` block)
- Create: `scripts/regenerate-pdf.sh`
- Modify: `scripts/README.md`
- Regenerate: `public/resume/bruno_marcuche_resume.pdf`
- Create: `app/print.test.ts`

- [ ] **Step 1: Write the failing test**

`app/print.test.ts`:

```ts
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
```

- [ ] **Step 2: Run it to verify it fails** → FAIL on `.hero-pa`.

- [ ] **Step 3: Update the print block's hide list**

In `@media print`, replace the "Hide everything that isn't the resume" selector list with:

```css
  .bottom-nav,
  .site-hero,
  .hero-pa,
  .status-strip,
  .site-nav,
  #systems,
  #outcomes,
  #practice,
  #experience,
  #toolbox,
  #deploys,
  .section-intro,
  .projects-section,
  .site-extra,
  .site-footer {
    display: none !important;
  }
```

Keep the rest of the print block, including the Task-from-main entry break rules.

- [ ] **Step 4: Create `scripts/regenerate-pdf.sh`**

```bash
#!/usr/bin/env bash
# Regenerates public/resume/bruno_marcuche_resume.pdf from the built site's print
# stylesheet. Run after `npm run build` with no dev server running.
set -euo pipefail
cd "$(dirname "$0")/.."
PORT="${PORT:-3999}"
CHROME="${CHROME:-$(ls -d ~/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell 2>/dev/null | tail -1)}"
[ -x "$CHROME" ] || { echo "Set CHROME to a headless Chromium binary"; exit 1; }
if fuser "$PORT/tcp" >/dev/null 2>&1; then echo "Port $PORT busy"; exit 1; fi
PORT=$PORT npx next start -p "$PORT" >/tmp/regen-pdf.log 2>&1 &
SERVER=$!
trap 'pkill -P $SERVER 2>/dev/null; kill $SERVER 2>/dev/null' EXIT
for _ in $(seq 1 40); do curl -sf "http://localhost:$PORT/api/health" >/dev/null && break; sleep 1; done
"$CHROME" --headless --no-sandbox --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=public/resume/bruno_marcuche_resume.pdf --virtual-time-budget=10000 \
  "http://localhost:$PORT/" 2>/dev/null
pdfinfo public/resume/bruno_marcuche_resume.pdf | grep Pages
if pdftotext public/resume/bruno_marcuche_resume.pdf - | grep -E "350|150\+|government|FA-EAM|Oracle SID|WinRM|561-284|Open to"; then
  echo "Disclosure violation in PDF"; exit 1
fi
echo "PDF regenerated"
```

`chmod +x scripts/regenerate-pdf.sh`. Add a section to `scripts/README.md`:

```markdown
## regenerate-pdf.sh

Rebuilds `public/resume/bruno_marcuche_resume.pdf` from the site's print stylesheet.
Requires a production build (`npm run build`), no dev server, headless Chromium
(Playwright's `chromium_headless_shell` is auto-detected, or set `CHROME`), and
poppler (`pdfinfo`, `pdftotext`). The script fails if a banned disclosure string
appears in the output.
```

- [ ] **Step 5: Regenerate and check**

```bash
npm run build && scripts/regenerate-pdf.sh
pdftotext public/resume/bruno_marcuche_resume.pdf - | head -3
```

Expected: first lines "Bruno Marcuche", "Platform Architect", then the contact line without a phone number. Pages: 4 or fewer. Open the PDF and confirm Strengths and Key Skills appear and no screen section leaked.

- [ ] **Step 6: Run tests, commit**

`npx jest app/print.test.ts` → PASS.

```bash
git add app/globals.css app/print.test.ts scripts/regenerate-pdf.sh scripts/README.md public/resume/bruno_marcuche_resume.pdf
git commit -m "feat: print rules for the new sections; PDF regeneration script; regenerated PDF"
```

---

### Task 16: Validate, screenshots, and the review gate

**Files:**
- None new. Produces screenshots in the scratchpad for the user's review.

- [ ] **Step 1: Full validation**

Run: `npm run validate`
Expected: lint clean, types clean, all tests pass, build succeeds. Coverage threshold (70%) holds; if it dips, add a render test for `SiteNav` (render, expect the "Resume PDF" link) rather than lowering the threshold.

- [ ] **Step 2: Screenshots in both themes and both widths**

With the production build served on port 3999 (same pattern as the PDF script), capture:

```bash
CHROME=$(ls -d ~/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell | tail -1)
for w in 1440 400; do
  "$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --screenshot=/tmp/pa-light-$w.png --window-size=$w,9000 --virtual-time-budget=8000 http://localhost:3999/
done
```

For dark, temporarily run the same with `--force-dark-mode` is not enough (the site reads localStorage), so instead open the dev server in a browser, toggle dark, and screenshot manually. Check:
- No horizontal scrollbar at 400px anywhere. `document.documentElement.scrollWidth === 400` in the console.
- Every diagram label sits inside its box at both widths.
- Light canvas is tinted with the grid visible; dark is fully dark; winner theme (win the game on the phone view) recolors hero, panels, band and shows stars.
- Brand icons render on stack tags, Toolbox tags, and game tiles.
- Print preview: resume only, 4 pages or fewer.

- [ ] **Step 3: Review gate**

Start `npm run dev` and hand the URL to the user. Ask them to review light, dark, phone width, the game, and the PDF download. Do not merge or push to `main` until they approve. When approved, open a PR from `platform-architect` to `main` (branch rules require a PR) and let the user merge it.

- [ ] **Step 4: Commit anything the review changed**

```bash
git add -A && git commit -m "fix: review feedback from local walkthrough"
```

---

## Self-review notes

- **Spec coverage:** positioning (T1, T4), tokens and both themes (T2), disclosure test (T3), systems data and section (T5, T8), GhostWatch (T5), diagrams wide and tall (T7), hero and status strip with live cell fallback (T9), outcomes and practice (T11), timeline (T10), toolbox with icons and the game (T12), deploy proof (T13), nav and tabs and page composition and removals (T14), `/workflows` copy (T14), print and PDF script (T15), validation and review gate (T16). Winner theme mapping (T2). Fonts (T1). No horizontal scroll (T2 test + T16 check).
- **Deviation from spec, stated:** the Toolbox uses the seven `TECH_CATEGORIES` groups from `lib/tech-data.ts` instead of six hand-written groups, so the desktop lists and the mobile game share one data source and the game's rules are untouched. Three items were added to those categories (Microsoft Foundry, Azure SRE Agent, Observe).
- **Type consistency:** `TechItem { name, Icon }` is used by `tech-data`, `systems-data`, `SystemRow`, `Toolbox`. `DiagramKey` is defined in `systems-data` and consumed by `components/diagrams/index.ts`. `SITE` fields used: `pdfPath, pdfName, navCaption, role, location, thesis, repo`.
- **Review Focus mapping:** 1 → T9 and T13 fallback tests. 2 → T2 alias test + T16 manual. 3 → T8 tag test + T16 scrollWidth check. 4 → T15 test + manual print preview. 5 → T10 `open` attribute test.
