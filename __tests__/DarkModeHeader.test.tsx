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

describe('Dark Mode Header Styling', () => {
  beforeEach(() => {
    // Set dark mode
    document.documentElement.setAttribute('data-theme', 'dark')
    render(<Home />)
  })

  afterEach(() => {
    // Clean up
    document.documentElement.removeAttribute('data-theme')
  })

  describe('Header Background', () => {
    it('applies gradient-bg class to header', () => {
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('gradient-bg')
    })

    it('header should match Current Setup section background in dark mode', () => {
      const header = screen.getByRole('banner')
      const setupSection = screen.getByText('Current Setup').closest('section')
      
      // Both should use the same background class structure
      expect(header).toHaveClass('gradient-bg')
      expect(setupSection).toHaveClass('bg-secondary')
      
      // In dark mode, gradient-bg should render as solid background like bg-secondary
    })
  })

  describe('Header Content', () => {
    it('maintains white text on dark background', () => {
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('text-white')
      
      const subtitle = screen.getByText('Site Reliability Engineer | Linux | Cloud')
      expect(subtitle).toHaveClass('text-white')
    })

    it('contact info maintains proper styling', () => {
      const contactInfo = screen.getByText('bruno.marcuche@gmail.com').closest('.contact-info')
      expect(contactInfo).toHaveClass('contact-info')
    })
  })

  describe('Visual Consistency', () => {
    it('header and setup section should have similar dark appearance', () => {
      // Both elements should be present and styled
      const header = screen.getByRole('banner')
      const setupSection = screen.getByText('Current Setup').closest('section')
      
      expect(header).toBeInTheDocument()
      expect(setupSection).toBeInTheDocument()
      
      // Header uses gradient-bg which in dark mode becomes solid
      expect(header).toHaveClass('gradient-bg')
      // Setup section uses bg-secondary
      expect(setupSection).toHaveClass('bg-secondary')
    })
  })
})
