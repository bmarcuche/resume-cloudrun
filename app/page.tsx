import { ArrowDownTrayIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import PDFViewer from '../components/PDFViewer'
import ThemeToggle from '../components/ThemeToggle'
import DeploymentFlow from '../components/DeploymentFlow'

export default function Home() {
  return (
    <main className="min-h-screen bg-primary">
      <ThemeToggle />
      
      {/* Header Section */}
      <header className="gradient-bg py-11">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">Bruno Marcuche</h1>
          <p className="text-xl mb-2 text-white font-medium">Site Reliability Engineer | Linux | Cloud</p>
          <div className="flex justify-center items-center space-x-6 text-sm contact-info">
            <div className="flex items-center space-x-1">
              <EnvelopeIcon className="h-4 w-4" />
              <span>bruno.marcuche@gmail.com</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPinIcon className="h-4 w-4" />
              <span>Remote / Global</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="card-white shadow-sm border-b" style={{ backgroundColor: 'var(--nav-bg)' }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-8 py-4">
            <a
              href="#resume"
              className="nav-item"
            >
              Introduction
            </a>
            <a
              href="/workflows"
              className="nav-item"
            >
              CI/CD Workflows
            </a>
            <a
              href="/resume/bruno_marcuche_resume.pdf"
              download
              className="button-teal rounded-lg px-4 py-2 font-medium shadow-sm flex items-center space-x-2"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Introduction Section */}
      <section id="resume" className="py-12 bg-primary">
        <div className="container mx-auto px-4">

          {/* Introduction Text in Paper Container */}
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-4xl mx-auto" style={{ maxWidth: Math.min(800, typeof window !== 'undefined' ? window.innerWidth - 40 : 800) }}>
              <div className="paper-container p-8 mb-6">
                <div className="text-left relative z-10">
                  <p className="text-body text-base leading-relaxed mb-6">
                    Welcome! I build and run systems people rely on - leading SRE teams, scaling infrastructure, and keeping environments secure and resilient.
                  </p>
                  <p className="text-body text-base leading-relaxed">
                    I'm passionate about Linux, open source, and using automation and AI to streamline operations and solve real-world problems. I enjoy mentoring engineers, improving infrastructure through thoughtful design, and always learning to stay sharp for the next technical challenge.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Deployment Flow */}
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-4xl mx-auto">
              <DeploymentFlow />
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex justify-center">
            <PDFViewer file="/resume/bruno_marcuche_resume.pdf" />
          </div>
        </div>
      </section>

      {/* Skills Highlight */}
      <section className="card-white py-6">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center text-headline mb-8">Core Technologies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[
              'GCP', 'Terraform', 'Ansible', 'Puppet', 'Docker', 'LaunchDarkly',
              'App Engine', 'IAM', 'Amazon Q', 'ChatGPT', 'Claude', 'MCP',
              'GitHub Actions', 'Prometheus', 'OpenTelemetry', 'RHEL', 'Ubuntu', 'Python'
            ].map((tech) => (
              <div 
                key={tech}
                className="card-secondary rounded-lg px-3 py-2 text-center text-sm font-medium text-accent-dark hover-teal transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Setup */}
      <section className="bg-secondary py-6">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center text-headline mb-8">Current Setup</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              'Alacritty',
              'tmux (custom keybinds)',
              'Pop! OS',
              'NeoVIM',
              'Amazon Q CLI',
              'Claude via Terminal',
              'Starship Prompt',
              'Azure CLI'
            ].map((tool) => (
              <div 
                key={tool}
                className="card-white rounded-lg px-3 py-2 text-center text-sm font-medium text-accent-dark hover-teal transition-colors"
              >
                {tool}
              </div>
            ))}
          </div>
          <p className="text-center text-body mt-6 text-sm">
            My daily development environment and tools
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent-dark text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2025 Bruno Marcuche. Built with Next.js and deployed on Google Cloud Platform.
          </p>
          <div className="mt-4 space-x-4">
            <a 
              href="mailto:bruno.marcuche@gmail.com"
              className="text-gray-300 hover:text-accent-teal transition-colors"
            >
              Contact
            </a>
            <a 
              href="/resume/bruno_marcuche_resume.pdf"
              download
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
