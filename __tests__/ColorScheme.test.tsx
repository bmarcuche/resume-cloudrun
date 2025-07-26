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

describe('Color Scheme Validation', () => {
  beforeEach(() => {
    render(<Home />)
  })

  describe('Primary Color Usage', () => {
    it('applies primary color to headlines', () => {
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('text-white') // White text on gradient background
      
      // Check for gradient background on header
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('gradient-bg')
    })

    it('uses primary color scheme in navigation', () => {
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('card-white')
      
      // Download button should use primary color
      const downloadButton = screen.getByText('Download PDF').closest('a')
      expect(downloadButton).toHaveClass('button-download')
    })
  })

  describe('Color Consistency', () => {
    it('maintains consistent color classes across sections', () => {
      // Main container
      const main = screen.getByRole('main')
      expect(main).toHaveClass('bg-primary')

      // Resume section
      const resumeSection = screen.getByText(/Welcome.*build and run systems/i).closest('section')
      expect(resumeSection).toHaveClass('bg-primary')

      // Setup section should use secondary background
      const setupSection = screen.getByText('Current Setup').closest('section')
      expect(setupSection).toHaveClass('bg-secondary')
    })

    it('uses proper text color classes', () => {
      // Technology section heading
      const techHeading = screen.getByText('Core Technologies')
      expect(techHeading).toHaveClass('text-headline')

      // Footer should use accent-dark background
      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveClass('bg-accent-dark')
    })
  })

  describe('Interactive Elements', () => {
    it('applies correct styling to buttons and links', () => {
      // Download button
      const downloadButton = screen.getByText('Download PDF').closest('a')
      expect(downloadButton).toHaveClass('button-download', 'flex', 'items-center', 'space-x-2')

      // Navigation items - check specific links
      const introLink = screen.getByText('Introduction')
      expect(introLink).toHaveClass('nav-item')
      
      const archLink = screen.getByText('Site Architecture')
      expect(archLink).toHaveClass('nav-item')
    })

    it('theme toggle has proper styling', () => {
      const themeToggle = screen.getByTestId('theme-toggle')
      expect(themeToggle).toBeInTheDocument()
    })
  })

  describe('Card Components', () => {
    it('applies card styling to technology items', () => {
      const techItems = screen.getAllByText(/GCP|Terraform|Docker|Python/)
      techItems.forEach(item => {
        expect(item.closest('div')).toHaveClass('card-secondary')
      })
    })

    it('applies card styling to setup items', () => {
      const setupItems = screen.getAllByText(/Alacritty|NeoVIM|Amazon Q CLI/)
      setupItems.forEach(item => {
        expect(item.closest('div')).toHaveClass('card-white')
      })
    })
  })

  describe('Responsive Design', () => {
    it('maintains color scheme across responsive breakpoints', () => {
      // Check that responsive classes don't interfere with color classes
      const container = screen.getByText('Bruno Marcuche').closest('.container')
      expect(container).toHaveClass('container', 'mx-auto', 'px-4')

      // Grid should maintain color scheme
      const techGrid = screen.getByText('GCP').closest('.grid')
      expect(techGrid).toHaveClass('grid')
    })
  })

  describe('Accessibility', () => {
    it('maintains proper contrast with new color scheme', () => {
      // Header text should be white on gradient background
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('text-white')

      // Body text should use proper text color
      const introText = screen.getByText(/Welcome.*build and run systems/i)
      expect(introText).toHaveClass('text-body')
    })
  })
})
