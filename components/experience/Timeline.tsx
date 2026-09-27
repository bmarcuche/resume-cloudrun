import type { ReactNode } from 'react'
import { resumeData } from '../../lib/resume-data'
import { SITE } from '../../lib/site'

// One-line summaries shown in the collapsed row. Keyed by company so the
// resume bullets stay the single source of truth for detail.
const ONE_LINERS: Record<string, string> = {
  AssetWorks: 'Architected the AI agent platform, HEN, HAM and GhostWatch.',
  EdventureTrek:
    'Educational exploration game. Python/FastAPI backend, custom taxonomy GPTs, CI/CD on GCP.',
  AnswerRocket: 'Led a remote SRE team on AWS. Supported SOC 2 with automated environment validation.',
  'OfficeSpace Software':
    'Owned production on GCP. Rackspace to GCP migration, CI pipeline, Slackbot deploys under 10 minutes.',
  'Hewlett Packard':
    'Tier 3 for HP Server Automation. Python automation on the HPSA API. Ranked first for customer satisfaction.',
}

// The current role reads as Platform Architect on the timeline; the PDF keeps
// the employer's title from resume-data.
const TITLE_OVERRIDES: Record<string, string> = {
  AssetWorks: 'Operations Team Lead, Platform Architect',
}

function Entry({
  when,
  who,
  role,
  one,
  open,
  children,
}: {
  when: string
  who: string
  role: string
  one: string
  open?: boolean
  children: ReactNode
}) {
  return (
    <details className="tl-entry" open={open}>
      <summary>
        <span className="tl-when">{when}</span>
        <span className="tl-who">
          <b>{who}</b>
          <span>{role}</span>
        </span>
        <span className="tl-chev" aria-hidden="true">
          ▼
        </span>
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
          <a className="pa-link" href={SITE.pdfPath} download={SITE.pdfName}>
            full resume as PDF
          </a>
          .
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
