import { ArrowDownTrayIcon, EnvelopeIcon, MapPinIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import PDFViewer from '../components/PDFViewer'
import ThemeToggle from '../components/ThemeToggle'

export default function Home() {
  const coreSkills = [
    'GCP', 'Terraform', 'Ansible', 'Puppet', 'Docker', 'LaunchDarkly',
    'App Engine', 'IAM', 'Amazon Q', 'ChatGPT', 'Claude', 'MCP',
    'GitHub Actions', 'Prometheus', 'OpenTelemetry', 'RHEL', 'Ubuntu', 'Python'
  ]

  const currentSetup = [
    'Alacritty', 'tmux (custom keybinds)', 'Pop! OS', 'NeoVIM',
    'Amazon Q CLI', 'Claude CLI Access', 'Starship Prompt', 'Azure CLI'
  ]

  return (
    <main className="min-h-screen bg-background">
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="flex flex-col items-center text-center space-y-6">
            <Avatar className="h-24 w-24 border-4 border-emerald-400/30 shadow-lg">
              <AvatarFallback className="text-2xl font-bold bg-blue-700 text-white">
                BM
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Bruno Marcuche
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 font-medium">
                Site Reliability Engineer | Linux | Cloud
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-4 w-4" />
                <span>bruno.marcuche@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                <span>Remote / Global</span>
              </div>
              <div className="flex items-center gap-2">
                <GlobeAltIcon className="h-4 w-4" />
                <span>resume.mindtunnel.org</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg font-semibold px-8">
                <a href="#about">Learn More</a>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white shadow-lg font-semibold px-8"
              >
                <a href="/resume/bruno_marcuche_resume.pdf" download>
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Download PDF
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-6 py-4">
            <Button variant="ghost" asChild className="hover:text-primary hover:bg-primary/10 font-medium">
              <a href="#about">About</a>
            </Button>
            <Button variant="ghost" asChild className="hover:text-primary hover:bg-primary/10 font-medium">
              <a href="/workflows">Architecture</a>
            </Button>
            <Button variant="ghost" asChild className="hover:text-primary hover:bg-primary/10 font-medium">
              <a href="#skills">Skills</a>
            </Button>
            <Button variant="ghost" asChild className="hover:text-primary hover:bg-primary/10 font-medium">
              <a href="#setup">Setup</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* About Section */}
      <section id="about" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl lg:text-4xl font-bold text-slate-800">
                  Welcome
                </CardTitle>
                <CardDescription className="text-lg text-slate-600">
                  Building reliable systems that people depend on
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-lg leading-relaxed">
                <p className="text-slate-600">
                  I build and run systems people rely on - leading SRE teams, scaling infrastructure, 
                  and keeping environments secure and resilient.
                </p>
                <p className="text-slate-600">
                  I'm passionate about Linux, open source, and using automation and AI to streamline 
                  operations and solve real-world problems. I enjoy mentoring engineers, improving 
                  infrastructure through thoughtful design, and always learning to stay sharp for 
                  the next technical challenge.
                </p>
              </CardContent>
            </Card>

            {/* PDF Viewer */}
            <div className="mt-12 flex justify-center">
              <PDFViewer file="/resume/bruno_marcuche_resume.pdf" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-slate-800">Core Technologies</CardTitle>
                <CardDescription className="text-slate-600">
                  Technologies and tools I work with regularly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 justify-center">
                  {coreSkills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="px-4 py-2 text-sm font-semibold bg-blue-100 text-blue-800 hover:bg-blue-600 hover:text-white transition-all duration-200 cursor-default shadow-sm border border-blue-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Setup Section */}
      <section id="setup" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-slate-800">Current Setup</CardTitle>
                <CardDescription className="text-slate-600">
                  My daily development environment and tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {currentSetup.map((tool) => (
                    <div 
                      key={tool}
                      className="flex items-center justify-center p-4 rounded-lg border-2 border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 cursor-default shadow-sm"
                    >
                      <span className="text-sm font-semibold text-center">{tool}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="bg-slate-200" />

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-800">Get In Touch</h3>
              <p className="text-slate-600">
                © 2025 Bruno Marcuche. Built with Next.js and deployed on Google Cloud Platform.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild className="border-blue-300 text-blue-600 hover:bg-blue-600 hover:text-white shadow-sm font-medium">
                <a href="mailto:bruno.marcuche@gmail.com">
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  Contact
                </a>
              </Button>
              <Button asChild className="bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm font-medium">
                <a href="/resume/bruno_marcuche_resume.pdf" download>
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Download Resume
                </a>
              </Button>
              <Button variant="outline" asChild className="border-slate-300 text-slate-600 hover:bg-slate-600 hover:text-white shadow-sm font-medium">
                <a 
                  href="https://github.com/bmarcuche/resume-cloudrun"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlobeAltIcon className="h-4 w-4 mr-2" />
                  Source Code
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
