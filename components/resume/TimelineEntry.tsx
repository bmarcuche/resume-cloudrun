import type { ReactNode } from 'react'

interface TimelineEntryProps {
  start: string
  end: string
  location: string
  title: string
  subtitle: string
  children: ReactNode
}

// Two-column entry used by Experience, Education and Volunteering:
// dates/location in a left gutter, content on the right. Stacks on mobile.
export default function TimelineEntry({
  start,
  end,
  location,
  title,
  subtitle,
  children,
}: TimelineEntryProps) {
  return (
    <div className="resume-entry grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-1 sm:gap-6 mb-6 break-inside-avoid">
      <div className="resume-meta text-sm text-body leading-snug">
        <div className="font-medium">
          {start} to {end}
        </div>
        <div>{location}</div>
      </div>
      <div>
        <h3 className="text-base font-bold text-headline leading-tight">{title}</h3>
        <p className="text-sm font-semibold text-accent-teal mb-2">{subtitle}</p>
        {children}
      </div>
    </div>
  )
}
