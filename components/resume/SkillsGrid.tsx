import type { SkillCategory } from '../../lib/resume-data'

interface SkillsGridProps {
  categories: SkillCategory[]
}

// Categorized key-skills list: a small category label followed by a
// responsive grid of skill names. Plain text keeps it ATS-parseable.
export default function SkillsGrid({ categories }: SkillsGridProps) {
  return (
    <div className="space-y-5">
      {categories.map((category) => (
        <div key={category.name} className="break-inside-avoid">
          <p className="text-xs font-bold uppercase tracking-wider text-accent-teal mb-2">
            {category.name}
          </p>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span key={skill} className="tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
