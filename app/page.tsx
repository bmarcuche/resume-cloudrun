import Image from 'next/image'
import { EnvelopeIcon, MapPinIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import ResumeDocument from '../components/resume/ResumeDocument'
import ProjectsSection from '../components/projects/ProjectsSection'
import ThemeToggle from '../components/ThemeToggle'
import { resumeData } from '../lib/resume-data'

const RESUME_PDF = '/resume/bruno_marcuche_resume.pdf'
const RESUME_PDF_NAME = 'Bruno Marcuche SRE Resume.pdf'

export default function Home() {
  const { name, tagline, contact } = resumeData

  return (
    <main className="min-h-screen page-grid">
      <ThemeToggle />

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

      {/* Navigation */}
      <nav className="site-nav sticky top-0 z-40 card-white shadow-sm border-b" style={{ backgroundColor: 'var(--nav-bg)' }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center flex-wrap gap-4 py-4 text-sm sm:text-base">
            <a href="#resume" className="nav-item">
              Resume
            </a>
            <a href="#projects" className="nav-item">
              Projects
            </a>
            <a href="/workflows" className="nav-item">
              Site Architecture
            </a>
            <a href="#technologies" className="nav-item hidden md:inline-block">
              Technologies
            </a>
            <a
              href={RESUME_PDF}
              download={RESUME_PDF_NAME}
              className="button-download flex items-center space-x-2"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Resume */}
      <section id="resume" className="py-12">
        <div className="container mx-auto px-4">
          {/* On-page resume (single source of truth for the PDF) */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <ResumeDocument />
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <ProjectsSection />

      {/* Skills Highlight */}
      <section id="technologies" className="site-extra py-6">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-bold text-center text-headline mb-6">Core Technologies</h3>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {[
              'GCP', 'Terraform', 'Ansible', 'Puppet', 'Docker', 'LaunchDarkly',
              'App Engine', 'IAM', 'Amazon Q', 'ChatGPT', 'Claude', 'MCP',
              'GitHub Actions', 'Prometheus', 'OpenTelemetry', 'RHEL', 'Ubuntu', 'Python'
            ].map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Current Setup */}
      <section id="setup" className="site-extra py-6">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-bold text-center text-headline mb-6">Current Setup</h3>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {[
              'Alacritty',
              'tmux (custom keybinds)',
              'Pop! OS',
              'NeoVIM',
              'Amazon Kiro CLI',
              'Claude Code',
              'ADO',
              'Azure CLI'
            ].map((tool) => (
              <span key={tool} className="tag tag-light">
                {tool}
              </span>
            ))}
          </div>
          <p className="text-center text-body mt-5 text-sm">
            My daily development environment and tools
          </p>
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
