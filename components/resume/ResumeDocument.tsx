import {
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { resumeData } from '../../lib/resume-data'
import ResumeSection from './ResumeSection'
import TimelineEntry from './TimelineEntry'
import SkillsGrid from './SkillsGrid'

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1 text-sm text-body leading-relaxed marker:text-accent-teal">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

// The printable resume. Renders entirely from lib/resume-data.ts so the
// on-screen version and the print/PDF output can never drift.
export default function ResumeDocument() {
  const { contact, summary, experience, education, strengths, skills, hobbies, volunteering } =
    resumeData

  return (
    <article className="resume-document paper-container p-6 sm:p-10">
      <div className="relative z-10">
        {/*
          Plain-text header shown only when printing. The on-screen header
          (photo, name, contact) lives in the page hero, which is hidden in
          print, so this gives the PDF a clean, ATS-friendly text header.
        */}
        <header className="resume-print-header mb-6">
          <h1 className="text-2xl font-bold text-headline">{resumeData.name}</h1>
          <p className="text-sm font-semibold">{resumeData.tagline}</p>
          <p className="text-xs mt-1">
            {contact.location} · {contact.phone} · {contact.email} · {contact.linkedin.label} ·{' '}
            {contact.website.label} · {contact.github.label}
          </p>
        </header>

        <ResumeSection title="Summary" icon={UserIcon}>
          <p className="text-sm text-body leading-relaxed">{summary}</p>
        </ResumeSection>

        <ResumeSection title="Professional Experience" icon={BriefcaseIcon}>
          {experience.map((job) => (
            <TimelineEntry
              key={`${job.company}-${job.start}`}
              start={job.start}
              end={job.end}
              location={job.location}
              title={job.title}
              subtitle={job.company}
            >
              <Bullets items={job.bullets} />
            </TimelineEntry>
          ))}
        </ResumeSection>

        <ResumeSection title="Education" icon={AcademicCapIcon}>
          {education.map((edu) => (
            <TimelineEntry
              key={edu.school}
              start={edu.start}
              end={edu.end}
              location={edu.location}
              title={edu.degree}
              subtitle={edu.school}
            >
              {edu.note && <p className="text-sm text-body">({edu.note})</p>}
            </TimelineEntry>
          ))}
        </ResumeSection>

        <ResumeSection title="Strengths" icon={BoltIcon}>
          <div className="skills-tag-grid">
            {strengths.map((strength) => (
              <span
                key={strength}
                className="tag text-sm"
              >
                {strength}
              </span>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Key Skills" icon={WrenchScrewdriverIcon}>
          <SkillsGrid categories={skills} />
        </ResumeSection>

        <ResumeSection title="Hobbies" icon={SparklesIcon}>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-body">
            {hobbies.map((hobby) => (
              <li key={hobby}>{hobby}</li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection title="Volunteering" icon={HeartIcon}>
          {volunteering.map((vol) => (
            <TimelineEntry
              key={vol.org}
              start={vol.start}
              end={vol.end}
              location={vol.location}
              title={vol.role}
              subtitle={vol.org}
            >
              <p className="text-sm text-body leading-relaxed">{vol.description}</p>
              {vol.link && (
                <a
                  href={vol.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent-teal hover:underline"
                >
                  {vol.link.replace(/^https?:\/\//, '')}
                </a>
              )}
            </TimelineEntry>
          ))}
        </ResumeSection>
      </div>
    </article>
  )
}
