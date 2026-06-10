import Image from 'next/image'
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import ResumeDocument from '../components/resume/ResumeDocument'
import ProjectsSection from '../components/projects/ProjectsSection'
import Reveal from '../components/projects/Reveal'
import SiteNav from '../components/SiteNav'
import { resumeData } from '../lib/resume-data'
import { TECH_CATEGORIES, SETUP_CATEGORIES, type TechCategory } from '../lib/tech-data'

const RESUME_PDF = '/resume/bruno_marcuche_resume.pdf'
const RESUME_PDF_NAME = 'Bruno Marcuche SRE Resume.pdf'

// Renders categorized cards on desktop and an icon-tile grid on mobile.
function TechShowcase({ categories }: { categories: TechCategory[] }) {
  return (
    <Reveal delay={120}>
      {/* Desktop: categorized cards */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {categories.map((category) => (
          <div key={category.label} className="tech-card">
            <div className="tech-card-head">
              <span className="tech-card-icon">
                <category.Icon aria-hidden="true" />
              </span>
              <h3 className="tech-card-title">{category.label}</h3>
            </div>
            <div className="tech-card-tags">
              {category.items.map((item) => (
                <span key={item.name} className="tag">
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: icon-tile grid */}
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto md:hidden">
        {categories.map((category) =>
          category.items.map((item) => (
            <div key={item.name} className="tech-tile">
              <span className="tech-tile-icon">
                <item.Icon aria-hidden="true" />
              </span>
              <span className="tech-tile-name">{item.name}</span>
            </div>
          ))
        )}
      </div>
    </Reveal>
  )
}

export default function Home() {
  const { name, tagline, contact } = resumeData

  return (
    <main className="min-h-screen page-grid pb-24 md:pb-0">
      {/* Navigation */}
      <SiteNav />

      {/* Header / Hero */}
      <header className="site-hero gradient-bg py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center gap-4">
            <Image
              src="/images/profile.png"
              alt={name}
              width={112}
              height={112}
              priority
              className="rounded-full border-4 border-white/30 shadow-lg object-cover h-28 w-28"
            />
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white">{name}</h1>
              <p className="text-lg sm:text-xl mt-2 text-white font-medium">{tagline}</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm contact-info">
              <div className="flex items-center space-x-1">
                <EnvelopeIcon className="h-4 w-4" />
                <span>{contact.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPinIcon className="h-4 w-4" />
                <span>{contact.location}</span>
              </div>
              <a href={contact.linkedin.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn
              </a>
              <a href={contact.github.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Resume */}
      <section id="resume" className="py-12">
        <div className="container mx-auto px-4">
          {/* On-page resume (single source of truth for the PDF) */}
          <div className="flex justify-center">
            <div className="w-full max-w-5xl">
              <ResumeDocument />
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <ProjectsSection />

      {/* Skills Highlight */}
      <section id="technologies" className="py-16">
        <div className="container mx-auto px-4">
          <Reveal className="section-intro">
            <p className="section-eyebrow">{'// TOOLBOX'}</p>
            <h2 className="section-heading">Core Technologies</h2>
            <p className="section-lede">
              The platforms, languages, and tools I reach for daily.
            </p>
          </Reveal>

          <TechShowcase categories={TECH_CATEGORIES} />
        </div>
      </section>

      {/* Current Setup */}
      <section id="setup" className="py-16">
        <div className="container mx-auto px-4">
          <Reveal className="section-intro">
            <p className="section-eyebrow">{'// WORKSTATION'}</p>
            <h2 className="section-heading">Current Setup</h2>
            <p className="section-lede">
              My daily development environment and tools.
            </p>
          </Reveal>

          <TechShowcase categories={SETUP_CATEGORIES} />
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer bg-accent-dark text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2026 Bruno Marcuche. Built with Next.js and deployed on Google Cloud Platform.
          </p>
          <div className="mt-4 flex justify-center items-center gap-4">
            <a
              href={`mailto:${contact.email}`}
              className="text-gray-300 hover:text-accent-teal transition-colors"
            >
              Contact
            </a>
            <a
              href={RESUME_PDF}
              download={RESUME_PDF_NAME}
              className="text-gray-300 hover:text-accent-teal transition-colors"
            >
              Download Resume
            </a>
            <a
              href="https://github.com/bmarcuche/resume-cloudrun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-accent-teal transition-colors"
            >
              View Source Code
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
