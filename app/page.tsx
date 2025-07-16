import { ArrowDownTrayIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import PDFViewer from '../components/PDFViewer'

export default function Home() {
  return (
    <main className="min-h-screen bg-primary">
      {/* Header Section */}
      <header className="gradient-bg text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">Bruno Marcuche</h1>
          <p className="text-xl mb-2 text-white font-medium">Site Reliability Engineer | Linux | Cloud</p>
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-200">
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
      <nav className="bg-white shadow-sm border-b border-secondary-bg">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-8 py-4">
            <a 
              href="#resume" 
              className="nav-link hover:text-accent-teal font-medium transition-colors py-2 px-3"
            >
              Introduction
            </a>
            <a 
              href="/workflows" 
              className="nav-link hover:text-accent-teal font-medium transition-colors py-2 px-3"
            >
              CI/CD Workflows
            </a>
            <a 
              href="/resume/bruno_marcuche_resume.pdf" 
              download
              className="button-teal flex items-center space-x-2 px-4 py-2 rounded-lg hover-teal-light transition-colors"
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
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-headline mb-4">Introduction</h2>
            <p className="text-body max-w-2xl mx-auto">
              I've spent my career making systems more reliable, scalable, and secure. Whether leading SRE teams or building hands-on, I enjoy solving complex problems and improving systems through automation and thoughtful design.
            </p>
          </div>

          {/* PDF Viewer */}
          <div className="flex justify-center">
            <PDFViewer file="/resume/bruno_marcuche_resume.pdf" />
          </div>
        </div>
      </section>

      {/* Skills Highlight */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center text-headline mb-8">Core Technologies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[
              'GCP', 'Terraform', 'Ansible', 'Puppet', 'Docker', 'LaunchDarkly',
              'App Engine', 'IAM', 'Amazon Q', 'ChatGPT', 'Claude', 'MCP',
              'Kubernetes', 'Prometheus', 'OpenTelemetry', 'RHEL', 'Ubuntu', 'Python'
            ].map((tech) => (
              <div 
                key={tech}
                className="bg-secondary rounded-lg px-3 py-2 text-center text-sm font-medium text-accent-dark hover-teal transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Setup */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center text-headline mb-8">Current Setup</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              'Alacritty',
              'tmux (custom keybinds)',
              'WSL2 (Ubuntu)',
              'Neovim + LSP',
              'Amazon Q CLI',
              'Claude via Terminal',
              'Starship Prompt',
              'Powerline fonts',
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
