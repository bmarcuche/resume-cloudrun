# Modernize Resume Site — Design Spec

**Date:** 2026-06-08
**Branch:** `modernize-resume`
**Status:** Approved (design), pending implementation

## Problem

The resume summary and AssetWorks experience need updating to an AI-forward
positioning, and the site needs modernizing. Today the actual resume content
(summary, all roles, education, skills) lives **only inside a sourceless PDF**
(`public/resume/bruno_marcuche_resume.pdf`, printed from Chromium — no editable
source in the repo). The page (`app/page.tsx`) renders that PDF via `react-pdf`
plus a generic 2-line intro. Consequences:

- Resume content cannot be edited in-repo; it requires regenerating the PDF in an
  external tool.
- `react-pdf` loads the PDF.js worker from a remote CDN (`unpkg.com`) — a bundle
  and supply-chain concern.
- None of the resume text is real, indexable HTML (poor SEO/recruiter search,
  poor mobile experience).

## Goals

1. Make on-page HTML the **single source of truth** for resume content.
2. Update the **summary** and **AssetWorks** experience to the AI-forward copy.
3. Update site **positioning** (tagline, intro, metadata) to be AI-forward.
4. Provide an **ATS-parseable downloadable PDF** that cannot drift from the page.
5. Stay **visually close to the existing resume doc**.
6. Remove `react-pdf` and the remote PDF.js worker.

## Non-goals

- Full visual redesign of the page chrome (keep the existing blue-gradient theme;
  light polish only).
- Changes to the `/workflows` page, `DeploymentFlow`, `WorkflowStatus`, or the
  Core Technologies / Current Setup sections beyond light consistency.
- Changes to the deployment pipeline (`.github/workflows/deploy.yml`).

## Decisions (locked with user)

| Decision | Choice |
| --- | --- |
| Content source | On-page HTML is the single source of truth |
| Downloadable PDF | Yes — produced via browser print (`window.print()` + print stylesheet) |
| PDF audience | Must be ATS-parseable; stay close to existing doc |
| Positioning | Go AI-forward (tagline + intro + metadata) |
| Photo | Show on web (extracted from old PDF); **omit from the print/PDF** |
| Old static PDF | Removed (would be stale) |
| Review gate | Local `npm run dev` review before any merge/push to `main` |

## Architecture

**Approach A — structured data + presentational components.**

```
lib/resume-data.ts        # all resume content, typed (single source of truth)
components/resume/
  ResumeDocument.tsx       # composes the full resume from data
  ResumeHeader.tsx         # photo + name + tagline + contact (photo hidden in print)
  ResumeSection.tsx        # icon heading + horizontal rule wrapper
  ExperienceEntry.tsx      # two-column: dates/location left, role/company/bullets right
  EducationEntry.tsx       # same two-column pattern
  SkillsGrid.tsx           # categorized key-skills grid
  StrengthsPills.tsx       # strengths as pills
  HobbiesRow.tsx           # hobbies (icons optional; text required for ATS)
  VolunteeringEntry.tsx    # two-column pattern
```

- Screen and print render from the **same** `resume-data.ts`, guaranteeing no drift.
- `app/page.tsx` replaces the `PDFViewer` usage with `<ResumeDocument />`, keeps
  the (AI-forward) header/nav, and keeps Core Technologies / Current Setup / footer.
- `components/PDFViewer.tsx` is removed; `react-pdf` is removed from
  `package.json`.

## Content

### Summary (new — replaces current)

> Site Reliability Engineer and technical leader who builds the systems other
> teams run on. I've scaled infrastructure across on-prem, hybrid, and cloud and
> automated deployment and operations for thousands of Linux and Windows
> instances. Most recently I architected an internal AI agent platform — a custom
> semantic router orchestrating 16 specialized LLM agents — that has handled
> 10,000+ ops and engineering tasks and cut change lead time ~89%. I lead ops/SRE
> teams, drive observability with OpenTelemetry and PagerDuty, and turn slow,
> manual operations into fast, repeatable automation. Open to both leadership and
> senior IC roles.

### AssetWorks — Operations Team Lead — 03/2025–present · Berwyn, PA (new bullets)

- Architected and built an internal AI agent platform (Model Context Protocol) —
  16 specialized LLM agents coordinated by a custom semantic router (fine-tuned
  sentence-transformer embeddings + pgvector knowledge retrieval) — that handled
  10,000+ routed ops and engineering tasks in its first 12 weeks across
  deployment, cloud, CI/CD, and incident response.
- Cut FA-EAM change lead time ~89% after launch — customer upgrades from ~27 days
  to under 3 days, new-environment provisioning from ~12 days to ~1.5 days —
  declining every month post-go-live (DORA lead-time-for-changes).
- Delivered 235 agent-built Ansible/CI-CD pipelines and automated 213 customer
  upgrade deployments, eliminating ~426 hours of manual deploy work, across a
  350+ server fleet serving 150+ government clients at 99.99% uptime.
- Designed multi-agent incident workflows that investigate and remediate
  fleet-wide in a single session — caught a config-deletion bug affecting 32
  servers and root-caused a Windows Update/API regression that would otherwise
  take hours of manual log correlation.
- Lead a 5-person team; drove an observability rollout (OpenTelemetry + Observe)
  to reduce MTTR and mentor engineers through 1:1s, training, and knowledge
  sharing.

### Carried over verbatim from the current PDF

- **Contact:** Boulder 80301, CO · 561-284-2441 · bmarcuche@gmail.com ·
  linkedin.com/in/bruno-marcuche · resume.mindtunnel.org · github.com/bmarcuche
- **Experience:** EdventureTrek (Backend Developer, Founder, 12/2022–01/2025,
  Boulder, CO); AnswerRocket (SRE Manager, 07/2022–12/2022, Atlanta, GA);
  OfficeSpace Software (Site Reliability Architect, 03/2016–07/2022, Alpharetta,
  GA); Hewlett Packard (Sr. Technical Consultant / Team Lead, 2009–2016, São
  Paulo, Brazil). Bullets exactly as in current PDF.
- **Education:** ITT Technical Institute — Information Systems, Bachelor's Degree
  (Honors Graduate), 10/2001–12/2004, Ft. Lauderdale, FL.
- **Strengths:** Leadership, Incident Management, Cloud Infrastructure, Linux
  Systems Administration, Automation.
- **Key Skills:** Cloud & Infrastructure Automation (GCP, Azure, Terraform,
  Ansible, Puppet, Docker, Docker Swarm, IAM); Monitoring & Observability
  (OpenTelemetry, OpenSearch, Graylog, Nagios, Prometheus, PagerDuty, Observe,
  Netdata); CI/CD Tooling (GitHub Actions, CircleCI, Jenkins, OpenSCAP); Systems &
  Services (Linux (various), Windows Server, SSL/TLS, SQL, Apache, Nginx, Redis,
  Python); Collaboration & Soft Skills (Communication & Collaboration, Mentorship
  & Team Leadership, Incident Response & Problem Solving, Adaptability & Process
  Ownership).
- **Hobbies:** Exploring AI tooling (LLMs, MCP); SRE meetups; Home lab
  experimentation with Docker.
- **Volunteering:** Meals on Wheels Boulder — Delivery Driver / Wellness Check,
  07/2020–11/2024, Boulder, CO. Description as in current PDF; mowboulder.org.

### Site positioning (AI-forward)

- Header tagline: **"Site Reliability Engineer · Builder of AI-Driven DevOps
  Platforms"**.
- Intro blurb: short AI-forward paraphrase of the new summary.
- `app/layout.tsx` metadata `title` / `description` / `openGraph` updated to match.

## ATS-friendly PDF (print)

- "Download PDF" button (nav + footer) calls `window.print()`.
- `@media print` rules:
  - Hide: header gradient, nav, theme toggle, Core Technologies, Current Setup,
    footer, and the profile photo.
  - Show: the resume content only, with a real text layer.
  - Standard fonts, semantic headings (`h1`/`h2`/`h3`), sensible DOM reading order
    (role/company before date metadata so the text layer extracts cleanly), simple
    bullet characters, A4/Letter page margins, avoid forced color backgrounds.
- Result: visually close to the current doc, parseable by ATS, never drifts from
  the page because it renders from the same data.

## Cleanup

- Remove `components/PDFViewer.tsx`.
- Remove `react-pdf` from `package.json` (and the remote `unpkg.com` worker).
- Extract the profile photo from the old PDF to `public/images/profile.jpg`
  (via `pdfimages`), then **delete** `public/resume/bruno_marcuche_resume.pdf`.
- Update any links pointing at the old static PDF path.

## Testing & verification

- Update `__tests__/Layout.test.tsx` and `__tests__/DarkModeHeader.test.tsx` for
  the new header/tagline/intro and removed PDF viewer.
- Add a light test that `ResumeDocument` renders key content (e.g., "AssetWorks",
  the new summary phrase) from `resume-data.ts`.
- Run `npm run build`, `npm test`, and `npm run lint`.
- Run `npm run dev`; user reviews the page and prints to PDF locally.

## Review gate

All work on branch `modernize-resume`. **No merge or push to `main` until the user
approves the local review** (push to `main` auto-deploys to Cloud Run).

## Risks

- ATS two-column vs. visual fidelity: print prioritizes clean reading order; if a
  stricter ATS still mis-parses, fall back to fully linearized print entries.
- Print pagination: verify the document fits cleanly across pages (no orphaned
  headings) during local review.
