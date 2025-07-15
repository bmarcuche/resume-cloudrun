import { ArrowDownTrayIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import PDFViewer from '../components/PDFViewer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <header className="gradient-bg text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Bruno Marcuche</h1>
          <p className="text-xl mb-2 opacity-90">DevOps Engineer & Cloud Architect</p>
          <div className="flex justify-center items-center space-x-6 text-sm opacity-80">
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
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8 py-4">
            <a 
              href="#resume" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              About Me
            </a>
            <a 
              href="/resume/bruno_marcuche_resume.pdf" 
              download
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </nav>

      {/* About Me Section */}
      <section id="resume" className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Me</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              I've been fortunate to work with companies around the world — from lean startups in Costa Rica to enterprises in Brazil and the U.S. Along the way, I've built reliable systems, led teams, and scaled infrastructure. I enjoy solving real-world problems and working with people who care about doing things right. Always up for the next challenge.
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
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Core Technologies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[
              'GCP', 'Terraform', 'Ansible', 'Puppet', 'Docker', 'LaunchDarkly',
              'App Engine', 'IAM', 'Amazon Q', 'ChatGPT', 'Claude', 'MCP',
              'Kubernetes', 'Prometheus', 'OpenTelemetry', 'RHEL', 'Ubuntu', 'Python'
            ].map((tech) => (
              <div 
                key={tech}
                className="bg-gray-50 rounded-lg px-3 py-2 text-center text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Bruno Marcuche. Built with Next.js and deployed on Google Cloud Platform.
          </p>
          <div className="mt-4 space-x-4">
            <a 
              href="mailto:bruno.marcuche@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </a>
            <a 
              href="/resume/bruno_marcuche_resume.pdf"
              download
              className="text-gray-400 hover:text-white transition-colors"
            >
              Download Resume
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
