# Platform Architect Redesign, Design Spec

**Date:** 2026-09-26
**Branch:** `platform-architect`
**Status:** Approved direction (mockup), spec pending user review
**Mockup:** https://claude.ai/artifact/89372n3Z9My4QSkRdsF4kr

## Problem

The site positions Bruno as "Site Reliability Engineer, AIOPs". LinkedIn positions
him as Platform Architect. The site leads with a 1,500px resume document and buries
the systems he built below it. His most recent work (GhostWatch) is absent. The
visual language is template chrome: tracked-out mono eyebrows, 01/02/03 markers on
non-sequential content, identical rounded cards, a centered generic hero.

Separately, the resume and project copy disclosed details about the environment he
operates (fleet size, client sector, product names, database vendor, discovery
mechanism, integrations). That disclosure was removed from `main` on 2026-09-26 in
commit `77e2961` and must not return in the redesign.

## Goals

1. Position the site as a **Platform Architect** portfolio. Systems first, resume second.
2. Show how the systems fit together with one **platform map** in the hero.
3. Add **GhostWatch** and give every system a status, a flow diagram, and outcomes.
4. Give outcomes (DORA before/after) their own section.
5. Collapse the resume into an expandable timeline; keep the PDF one click away.
6. Bring deploy proof onto the home page; keep `/workflows` as the full dashboard.
7. Ship a **light theme with depth** (tinted canvas, layered surfaces, blueprint grid)
   and a dark theme of equal quality. Both must be readable and intentional.
8. Preserve the **disclosure policy** below on every surface, including the PDF.

## Non-goals

- The mobile tech-tile game and winner theme (keep as-is, restyled with tokens only).
- Changing the CI/CD pipeline or Cloud Run deployment.
- Generating the PDF with a new tool. Print stylesheet remains the source.
- Adding a CMS, blog, or any server-side state.

## Decisions (locked with user)

| Decision | Choice |
| --- | --- |
| Headline role | "Platform Architect" |
| AssetWorks title on the timeline | "Operations Team Lead, Platform Architect" (user to confirm) |
| Hero photo | Removed from hero. Stays in the nav brand, 30px. |
| Systems shown | AI agent platform, GhostWatch, Hosted Environment Navigator, Hosted Access Manager |
| Themes | Light and dark, both fully designed. Light must not be flat white. |
| Disclosure | No fleet size, client count, client sector, product names, DB vendor, discovery mechanism, or named third-party integrations |
| Fonts | Archivo (display), IBM Plex Sans (body), IBM Plex Mono (identifiers). Self-host via `next/font/google`. |
| Review gate | Local `npm run dev` review by user before merge. No push to `main` until approved. |

## Disclosure policy

Applies to `lib/resume-data.ts`, `lib/projects-data.ts`, all page copy, metadata,
and the PDF. A unit test enforces it (see Testing).

**Never publish:** server or host counts; client counts; client sector or names;
internal product or application names; database vendor or instance counts;
remote-management protocols used for discovery; the list of third-party services
integrated; specific incident counts tied to hosts.

**Fine to publish:** outcome metrics (lead time, pipelines built, hours removed,
uptime as a percentage, routing accuracy, request volume), generic technology
names in a skills list (Python, PostgreSQL, Ansible, Azure), and architecture
patterns.

Banned substrings for the test: `350`, `150+`, `government`, `FA-EAM`, `FA/EAM`,
`Oracle SID`, `WinRM`, `Zendesk`, `DigiCert`, `Bastion`, `CAB or Jira`, `32 servers`,
`561-284`, `Open to`.

**Also never publish:** a phone number (email and LinkedIn are the contact
channels) and "open to roles" availability statements. Both were removed from
`main` on 2026-09-26.

## Information architecture

Single page at `/`, in this order. Anchor ids in parentheses.

1. **Nav** (sticky). Brand (photo + name + "platform architect" in mono), links
   Systems / Outcomes / How I work / Experience / Toolbox / Deploys, theme toggle,
   "Resume PDF" button. Mobile keeps the existing bottom tab bar with tabs Systems,
   Outcomes, Experience, Deploys.
2. **Hero** (`#top`). Two columns on desktop, stacked on mobile. Left: name (Archivo
   wide, 700), "Platform Architect", thesis paragraph, three buttons (See the
   systems, LinkedIn, GitHub), contact line in mono. Right: the platform map SVG
   with caption "platform map, <month year>".
3. **Status strip.** Six cells: 99.99% platform uptime, 10,000+ ops tasks routed,
   89% less change lead time, 235 pipelines built by agents, 426 manual deploy hours
   removed, and the live deploy cell (latest run number, green dot, "this site,
   deployed by CI"). The deploy cell reads from `/api/workflows` client-side and
   falls back to a static label if the fetch fails.
4. **Systems I own** (`#systems`). Four rows, alternating text/figure sides. Each row:
   status pills, title, one-line subtitle, description, 2 to 3 outcome bullets, stack
   tags, a flow diagram, and 2 to 3 metric tiles inside the figure panel.
5. **Outcomes** (`#outcomes`). Four columns: upgrade lead time, environment lead
   time, manual hours removed, incidents caught. The first two carry to-scale bars.
6. **How I work** (`#practice`). Four short principles.
7. **Experience** (`#experience`). Timeline with one `<details>` per role; the current
   role open by default. One-line summary in the `<summary>`, bullets inside.
   Education and volunteering are the last entry.
8. **Toolbox** (`#toolbox`). Six grouped tag lists. Replaces "Core Technologies" on
   desktop. On mobile the existing tile game renders here (unchanged behavior).
9. **Deploys** (`#deploys`). Six-step pipeline with green dots, latest run line,
   link to `/workflows`.
10. **Footer.** Name and year, source link, LinkedIn, email in mono.

"Current Setup" is removed from the home page. Its data (`SETUP_CATEGORIES`) stays
in `lib/tech-data.ts` for the game; it is no longer rendered.

The printable resume (`ResumeDocument`) stays in the DOM, hidden on screen, shown
in print. It is the PDF source and keeps its ATS-friendly structure.

## Content

### Positioning

- Nav title: `platform architect`
- `<title>`: "Bruno Marcuche, Platform Architect"
- Description: "Platform Architect. Designs and runs the control plane for a
  multi-tenant hosted platform: an AI agent layer that routes ops work, fleet
  discovery, just-in-time access, and incident pipelines."
- PDF filename: "Bruno Marcuche Platform Architect Resume.pdf"
- `resumeData.tagline`: "Platform Architect"

### Hero thesis (final copy)

> I design and run the control plane for a multi-tenant hosted platform: an AI agent
> layer that routes ops work, fleet discovery, just-in-time access, and incident
> pipelines that find root cause before a customer calls. Boulder, CO.

### Systems

Content lives in `lib/systems-data.ts` (renamed from `projects-data.ts`). Each entry:

```ts
interface System {
  id: string
  title: string
  subtitle: string
  status: { label: string; tone: 'ok' | 'warn' | 'info' }[]
  description: string
  outcomes: string[]
  stack: string[]
  metrics: { value: string; label: string }[]
  diagram: 'router' | 'ghostwatch' | 'discovery' | 'access'
}
```

Copy for all four systems is the mockup's copy, verbatim. GhostWatch statuses:
"Detection live" (ok), "Self-healing in pilot" (warn). GhostWatch description
credits the Microsoft Global Hackathon 2026 and a cross-company team, without
naming individuals.

### Outcomes, How I work, Experience

Copy from the mockup, verbatim. Experience bullets come from `resumeData` so the
timeline and the PDF cannot drift.

**Leadership copy is scale-neutral.** No team headcount appears in the hero, the
Systems intro, or How I work. The "Lead by building alongside" principle reads:
"I run teams the way I run platforms: clear ownership, measured outcomes, and
engineers who grow into owners. 1:1s, architecture reviews and pairing on the
platform itself are the operating model at any team size." The Systems intro says
"operate them with the team I lead." The one remaining headcount is the AssetWorks
resume bullet ("Lead a team of five"), which is factual resume content; the user
decides whether to keep it.

## Design system

All tokens live in `app/globals.css` on `:root` and `[data-theme="dark"]`. The
existing `[data-theme="winner"]` block is kept and mapped to the new token names.
Tailwind config gains the new font families only; colors come from CSS variables.

### Light theme (must have depth)

| Token | Value | Use |
| --- | --- | --- |
| `--canvas` | `#E9EEF5` | page ground, cool tint, never white |
| `--canvas-grid` | `rgba(27,70,166,.07)` | blueprint grid lines over the canvas |
| `--panel` | `#F7F9FC` | cards and the status strip, off-white |
| `--panel-2` | `#DFE6F0` | figure panels inside system rows |
| `--band` | `#DCE4F0` | outcomes section background |
| `--line` | `#C9D4E3` | hairlines |
| `--line-strong` | `#A9B8CE` | diagram strokes, buttons |
| `--ink` | `#0F1B2D` | headings |
| `--body` | `#354561` | body text |
| `--muted` | `#5E6C86` | captions |
| `--accent` | `#2B63D9` | links, hot diagram nodes |
| `--accent-ink` | `#1B46A6` | link hover, text on accent-soft |
| `--accent-soft` | `rgba(43,99,217,.12)` | washes |
| `--hero` / `--hero-2` | `#12264F` / `#0E1E3F` | hero gradient |
| `--ok` / `--ok-soft` | `#1E9A6B` / `rgba(30,154,107,.14)` | live status |
| `--warn` / `--warn-soft` | `#B8761A` / `rgba(184,118,26,.14)` | pilot status |

Depth rules for light: the canvas carries the existing blueprint grid (reuse
`.page-grid`, retuned to `--canvas-grid`); system rows sit on `--panel` with the
figure side on `--panel-2`; the outcomes section sits on `--band`; the status strip
and deploy section sit on `--panel`. Shadows are tinted with the ink color, never
neutral grey.

### Dark theme

| Token | Value |
| --- | --- |
| `--canvas` | `#0B111C` |
| `--canvas-grid` | `rgba(109,155,255,.06)` |
| `--panel` | `#121A29` |
| `--panel-2` | `#1A2436` |
| `--band` | `#0F1626` |
| `--line` | `#243044` |
| `--line-strong` | `#33425A` |
| `--ink` | `#E9EEF6` |
| `--body` | `#A9B5C8` |
| `--muted` | `#7E8BA3` |
| `--accent` | `#6D9BFF` |
| `--accent-ink` | `#9DBBFF` |
| `--accent-soft` | `rgba(109,155,255,.14)` |
| `--hero` / `--hero-2` | `#0E1830` / `#0A1122` |
| `--ok` / `--warn` | `#3FC48E` / `#E0A03A` |

Theme switching keeps the existing `ThemeToggle`, `data-theme` attribute, and the
first-paint script in `app/layout.tsx`.

### Type

- Display: Archivo, weights 600/700, `font-stretch` 112% for headings and 125% for
  the hero name.
- Body: IBM Plex Sans 400/500/600, 16px, line-height 1.6, max 62ch for running text.
- Mono: IBM Plex Mono 400/500 for contact line, stack tags, diagram labels, run ids.
- Loaded with `next/font/google` so no external stylesheet request at runtime.
- Scale: hero name `clamp(2.4rem, 1.6rem + 3.2vw, 4.2rem)`, h2
  `clamp(1.6rem, 1.2rem + 1.6vw, 2.4rem)`, system title 1.45rem, h3 1.05 to 1.25rem.

### Diagrams

All diagrams are inline SVG React components in `components/diagrams/`, styled by
the tokens through CSS classes (`.node`, `.node.hot`, `.node.ok`, `.edge`, `.tiny`,
`.lbl`). Five components: `PlatformMap` (hero), `RouterFlow`, `GhostWatchFlow`,
`DiscoveryFlow`, `AccessFlow`. Each has a `<title>` for screen readers. The hero
map uses its own light-on-dark colors since it always sits on the hero gradient.

### Motion

None on load. The only motion is `<details>` opening, hover states on links and
buttons, and the existing pipeline stepper on `/workflows`. `prefers-reduced-motion`
disables transitions. The `Reveal` component is removed from the home page.

## Components

```
app/page.tsx                         composes the sections below
components/SiteNav.tsx               updated links, brand caption, PDF button
components/hero/Hero.tsx             name, role, thesis, CTAs, contact, PlatformMap
components/hero/StatusStrip.tsx      six cells; client component for the live deploy cell
components/systems/SystemsSection.tsx
components/systems/SystemRow.tsx     one row; picks the diagram by key
components/diagrams/*.tsx            five SVG components
components/outcomes/OutcomesSection.tsx
components/practice/PracticeSection.tsx
components/experience/Timeline.tsx   details/summary per role, from resumeData
components/toolbox/Toolbox.tsx       grouped tags on desktop; TechTileGame on mobile
components/deploys/DeployProof.tsx   pipeline steps + latest run; client fetch
components/resume/ResumeDocument.tsx unchanged, print only
lib/resume-data.ts                   tagline and summary updated; bullets unchanged
lib/systems-data.ts                  renamed from projects-data.ts, new shape
lib/practice-data.ts                 four principles
lib/disclosure.ts                    banned substrings list, used by the test
```

Removed: `components/projects/*` (replaced by `components/systems/*`),
`components/resume/StrengthsHighlight.tsx`, `components/projects/Reveal.tsx`, the
"Current Setup" section in `page.tsx`.

## `/workflows` page

Unchanged in function. Restyled with the new tokens and fonts. The header copy
becomes "Deploys" to match the nav.

## PDF

- `ResumeDocument` stays the single source. Print header shows "Platform Architect".
- Print CSS keeps the 2026-09-26 fix that lets long entries break across pages.
- Regenerate `public/resume/bruno_marcuche_resume.pdf` from the built site with
  headless Chromium as part of the implementation, and verify with `pdftotext` that
  no banned substring appears. Document the command in `scripts/README.md`.

## Testing

- `lib/disclosure.test.ts`: walks every string in `resumeData`, `systems`, practice
  data, and `app/layout.tsx` metadata; fails on any banned substring.
- `components/experience/Timeline.test.tsx`: renders from `resumeData`; the first
  entry is open; all companies appear.
- `components/systems/SystemsSection.test.tsx`: four systems render with their
  status pills and metric values.
- `__tests__/index.test.tsx`: updated for the new hero copy ("Platform Architect")
  and section headings.
- Existing `TechTileGame` and `tech-game` tests unchanged.
- `npm run validate` (lint, type-check, tests, build) must pass.
- Manual: light and dark screenshots at 1440px and 400px; print preview produces 4
  pages or fewer with no orphaned headings.

## Review gate

All work on branch `platform-architect`. The user reviews on `npm run dev` in both
themes and on a phone-width viewport. No merge to `main` until approved.

## Risks

- **Font loading.** `next/font/google` downloads at build time; the CI runner must
  have network access during `next build`. If not, vendor the woff2 files under
  `public/fonts` and switch to `next/font/local`.
- **Live deploy cell.** `/api/workflows` depends on a GitHub token at runtime. The
  cell must degrade to a static label when the call fails.
- **Winner theme.** Token renames must be applied to the `winner` block too, or the
  game's unlock theme will render with missing colors.
- **Copy accuracy.** GhostWatch details come from a public LinkedIn post. The user
  confirms what may be published before merge.
