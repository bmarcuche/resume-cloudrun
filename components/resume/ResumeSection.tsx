import type { ComponentType, ReactNode, SVGProps } from 'react'

interface ResumeSectionProps {
  title: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  children: ReactNode
}

// An icon + heading followed by a horizontal rule, matching the resume doc.
export default function ResumeSection({ title, icon: Icon, children }: ResumeSectionProps) {
  return (
    <section className="resume-section mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="h-6 w-6 text-accent-teal shrink-0" aria-hidden="true" />
        <h2 className="text-xl font-bold text-headline whitespace-nowrap">{title}</h2>
        <span className="resume-rule flex-1 border-t border-gray-300" aria-hidden="true" />
      </div>
      {children}
    </section>
  )
}
