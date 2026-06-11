import type { ComponentType, SVGProps } from 'react'
import {
  UserGroupIcon,
  CpuChipIcon,
  CloudIcon,
  Cog6ToothIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline'
import { resumeData } from '../../lib/resume-data'
import Reveal from '../projects/Reveal'

type Icon = ComponentType<SVGProps<SVGSVGElement>>

// Maps each strength to a glyph. Anything not listed falls back to a badge.
const STRENGTH_ICONS: Record<string, Icon> = {
  Leadership: UserGroupIcon,
  'AI-Led Ops': CpuChipIcon,
  'Cloud Infrastructure': CloudIcon,
  Automation: Cog6ToothIcon,
}

// On-screen highlight band for the resume's strengths. The resume document keeps a
// print-only copy so the PDF stays complete; this section is hidden in print.
export default function StrengthsHighlight() {
  const { strengths } = resumeData

  return (
    <section id="strengths" className="site-extra py-12">
      <div className="container mx-auto px-4">
        <Reveal className="section-intro">
          <p className="section-eyebrow">{'// STRENGTHS'}</p>
          <h2 className="section-heading">Core Strengths</h2>
          <p className="section-lede">
            The areas I lead with, from incident command to building the automation other
            teams run on.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="strengths-grid">
            {strengths.map((strength) => {
              const Icon = STRENGTH_ICONS[strength] ?? CheckBadgeIcon
              return (
                <div key={strength} className="strength-card">
                  <span className="strength-card-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="strength-card-label">{strength}</span>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
