import { render, screen } from '@testing-library/react'
import Home from '../app/page'

// Mock the PDFViewer component
jest.mock('../components/PDFViewer', () => {
  return function MockPDFViewer({ file }: { file: string }) {
    return <div data-testid="pdf-viewer" data-file={file}>PDF Viewer Mock</div>
  }
})

// Mock ThemeToggle component
jest.mock('../components/ThemeToggle', () => {
  return function MockThemeToggle() {
    return <button data-testid="theme-toggle">Theme Toggle</button>
  }
})

describe('Page Layout', () => {
  beforeEach(() => {
    render(<Home />)
  })

  describe('Header Section', () => {
    it('renders main header with correct structure', () => {
      // Header should exist
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('gradient-bg', 'py-11')

      // Main heading
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('Bruno Marcuche')
      expect(heading).toHaveClass('text-5xl', 'font-bold', 'mb-4', 'text-white')

      // Subtitle
      expect(screen.getByText('Site Reliability Engineer | Linux | Cloud')).toBeInTheDocument()
    })

    it('renders contact information with proper icons', () => {
      // Email contact
      expect(screen.getByText('bruno.marcuche@gmail.com')).toBeInTheDocument()
      
      // Location
      expect(screen.getByText('Remote / Global')).toBeInTheDocument()

      // Contact info container should have proper classes
      const contactInfo = screen.getByText('bruno.marcuche@gmail.com').closest('.contact-info')
      expect(contactInfo).toHaveClass('flex', 'justify-center', 'items-center', 'space-x-6', 'text-sm', 'contact-info')
    })

    it('renders theme toggle button', () => {
      const themeToggle = screen.getByTestId('theme-toggle')
      expect(themeToggle).toBeInTheDocument()
    })
  })

  describe('Navigation Section', () => {
    it('renders navigation with correct links', () => {
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
      expect(nav).toHaveClass('card-white', 'shadow-sm', 'border-b')

      // Navigation links
      expect(screen.getByText('Introduction')).toBeInTheDocument()
      expect(screen.getByText('Site Architecture')).toBeInTheDocument()
      expect(screen.getByText('Technologies')).toBeInTheDocument()
      expect(screen.getByText('Download PDF')).toBeInTheDocument()
    })

    it('renders download PDF button with icon', () => {
      const downloadButton = screen.getByText('Download PDF').closest('a')
      expect(downloadButton).toHaveAttribute('href', '/resume/bruno_marcuche_resume.pdf')
      expect(downloadButton).toHaveAttribute('download')
      expect(downloadButton).toHaveClass('button-download', 'flex', 'items-center', 'space-x-2')
    })
  })

  describe('Main Content Section', () => {
    it('renders resume section with introduction text', () => {
      const resumeSection = screen.getByText(/Welcome.*build and run systems/i).closest('section')
      expect(resumeSection).toHaveAttribute('id', 'resume')
      expect(resumeSection).toHaveClass('py-8', 'bg-primary')

      // Introduction paragraphs
      expect(screen.getByText(/Welcome.*build and run systems/i)).toBeInTheDocument()
      expect(screen.getByText(/passionate about Linux.*open source/i)).toBeInTheDocument()
    })

    it('renders PDF viewer component', () => {
      const pdfViewer = screen.getByTestId('pdf-viewer')
      expect(pdfViewer).toBeInTheDocument()
      expect(pdfViewer).toHaveAttribute('data-file', '/resume/bruno_marcuche_resume.pdf')
    })
  })

  describe('Technologies Section', () => {
    it('renders core technologies grid', () => {
      const techSection = screen.getByText('Core Technologies').closest('section')
      expect(techSection).toHaveAttribute('id', 'technologies')
      expect(techSection).toHaveClass('card-white', 'py-6')

      // Technology items
      expect(screen.getByText('GCP')).toBeInTheDocument()
      expect(screen.getByText('Terraform')).toBeInTheDocument()
      expect(screen.getByText('Docker')).toBeInTheDocument()
      expect(screen.getByText('Python')).toBeInTheDocument()

      // Grid container
      const techGrid = screen.getByText('GCP').closest('.grid')
      expect(techGrid).toHaveClass('grid', 'grid-cols-2', 'md:grid-cols-4', 'lg:grid-cols-6', 'gap-4')
    })
  })

  describe('Current Setup Section', () => {
    it('renders current setup grid', () => {
      const setupSection = screen.getByText('Current Setup').closest('section')
      expect(setupSection).toHaveAttribute('id', 'setup')
      expect(setupSection).toHaveClass('bg-secondary', 'py-6')

      // Setup items
      expect(screen.getByText('Alacritty')).toBeInTheDocument()
      expect(screen.getByText('NeoVIM')).toBeInTheDocument()
      expect(screen.getByText('Amazon Q CLI')).toBeInTheDocument()

      // Grid container
      const setupGrid = screen.getByText('Alacritty').closest('.grid')
      expect(setupGrid).toHaveClass('grid', 'grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-4')
    })
  })

  describe('Footer Section', () => {
    it('renders footer with correct content', () => {
      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('bg-accent-dark', 'text-white', 'py-8')

      // Copyright text
      expect(screen.getByText(/© 2025 Bruno Marcuche/)).toBeInTheDocument()

      // Footer links
      expect(screen.getByText('Contact')).toBeInTheDocument()
      expect(screen.getByText('Download Resume')).toBeInTheDocument()
      expect(screen.getByText('View Source Code')).toBeInTheDocument()
    })
  })

  describe('CSS Classes Validation', () => {
    it('validates main container structure', () => {
      const main = screen.getByRole('main')
      expect(main).toHaveClass('min-h-screen', 'bg-primary')
    })

    it('validates responsive design classes', () => {
      // Check for responsive classes
      const container = screen.getByText('Bruno Marcuche').closest('.container')
      expect(container).toHaveClass('container', 'mx-auto', 'px-4')

      // Check grid responsive classes
      const techGrid = screen.getByText('GCP').closest('.grid')
      expect(techGrid).toHaveClass('md:grid-cols-4', 'lg:grid-cols-6')
    })

    it('validates color and spacing classes', () => {
      // Header gradient
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('gradient-bg')

      // Section backgrounds
      const resumeSection = screen.getByText(/Welcome.*build and run systems/i).closest('section')
      expect(resumeSection).toHaveClass('bg-primary')

      const setupSection = screen.getByText('Current Setup').closest('section')
      expect(setupSection).toHaveClass('bg-secondary')
    })
  })

  describe('Icon Sizing Validation', () => {
    it('validates icon classes are properly sized', () => {
      // This test ensures icons have the correct size classes
      // The actual sizing is handled by CSS, but we can verify the classes exist
      const emailIcon = screen.getByText('bruno.marcuche@gmail.com').previousElementSibling
      expect(emailIcon).toHaveClass('h-4', 'w-4')
    })
  })
})
