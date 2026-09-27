import ResumeDocument from '../components/resume/ResumeDocument'
import SiteNav from '../components/SiteNav'
import Hero from '../components/hero/Hero'
import StatusStrip from '../components/hero/StatusStrip'
import SystemsSection from '../components/systems/SystemsSection'
import OutcomesSection from '../components/outcomes/OutcomesSection'
import PracticeSection from '../components/practice/PracticeSection'
import Timeline from '../components/experience/Timeline'
import Toolbox from '../components/toolbox/Toolbox'
import DeployProof from '../components/deploys/DeployProof'
import { resumeData } from '../lib/resume-data'
import { SITE } from '../lib/site'

export default function Home() {
  const { contact } = resumeData
  return (
    <main className="min-h-screen page-grid pb-24 md:pb-0">
      <SiteNav />
      <Hero />
      <StatusStrip />
      <SystemsSection />
      <OutcomesSection />
      <PracticeSection />
      <Timeline />
      <Toolbox />
      <DeployProof />

      {/* Printable resume: hidden on screen, the single source for the PDF */}
      <section id="resume" className="resume-screen-hidden">
        <div className="pa-wrap">
          <ResumeDocument />
        </div>
      </section>

      <footer className="site-footer site-footer-pa">
        <div className="pa-wrap">
          <span>Bruno Marcuche, {new Date().getFullYear()}</span>
          <a href={SITE.repo} target="_blank" rel="noopener noreferrer">
            Source on GitHub
          </a>
          <a href={contact.linkedin.url} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={SITE.pdfPath} download={SITE.pdfName}>
            Resume PDF
          </a>
          <span className="pa-mono">{contact.email}</span>
        </div>
      </footer>
    </main>
  )
}
