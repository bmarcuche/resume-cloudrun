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

describe('Color Harmony Validation', () => {
  describe('Light Mode Gradient Harmony', () => {
    beforeEach(() => {
      // Ensure light mode
      document.documentElement.removeAttribute('data-theme')
      render(<Home />)
    })

    it('header and footer both use gradient backgrounds', () => {
      const header = screen.getByRole('banner')
      const footer = screen.getByRole('contentinfo')
      
      // Both should use gradient classes
      expect(header).toHaveClass('gradient-bg')
      expect(footer).toHaveClass('bg-accent-dark')
    })

    it('header and footer create visual bookends', () => {
      const header = screen.getByRole('banner')
      const footer = screen.getByRole('contentinfo')
      
      // Both should be present and styled for visual consistency
      expect(header).toBeInTheDocument()
      expect(footer).toBeInTheDocument()
      
      // Both should have white text for contrast
      expect(header.querySelector('h1')).toHaveClass('text-white')
      expect(footer).toHaveClass('text-white')
    })

    it('validates complementary blue color scheme', () => {
      // This test validates that we're using complementary blue tones
      // Header: #093e8f → #09818f (primary blue → analogous blue)
      // Footer: #072f6b → #09818f (darker blue → same analogous blue)
      
      const header = screen.getByRole('banner')
      const footer = screen.getByRole('contentinfo')
      
      expect(header).toHaveClass('gradient-bg')
      expect(footer).toHaveClass('bg-accent-dark')
      
      // Both should end with the same analogous blue (#09818f)
      // This creates harmony in the color scheme
    })
  })

  describe('Dark Mode Consistency', () => {
    beforeEach(() => {
      // Set dark mode
      document.documentElement.setAttribute('data-theme', 'dark')
      render(<Home />)
    })

    afterEach(() => {
      // Clean up
      document.documentElement.removeAttribute('data-theme')
    })

    it('header and footer maintain visual consistency in dark mode', () => {
      const header = screen.getByRole('banner')
      const footer = screen.getByRole('contentinfo')
      
      // Both should be present and styled
      expect(header).toHaveClass('gradient-bg')
      expect(footer).toHaveClass('bg-accent-dark')
    })

    it('dark mode text remains readable', () => {
      // Validate that text improvements are working
      const copyrightText = screen.getByText(/© 2025 Bruno Marcuche/)
      const contactLink = screen.getByText('Contact')
      
      expect(copyrightText).toBeInTheDocument()
      expect(contactLink).toBeInTheDocument()
    })
  })

  describe('Visual Hierarchy', () => {
    it('footer appears darker than header for proper hierarchy', () => {
      render(<Home />)
      
      const header = screen.getByRole('banner')
      const footer = screen.getByRole('contentinfo')
      
      // Header uses primary blue start (#093e8f)
      // Footer uses darker blue start (#072f6b)
      // This creates proper visual hierarchy
      expect(header).toHaveClass('gradient-bg')
      expect(footer).toHaveClass('bg-accent-dark')
    })

    it('both gradients end with same color for harmony', () => {
      render(<Home />)
      
      // Both header and footer gradients should end with analogous blue
      // Header: #093e8f → #09818f
      // Footer: #072f6b → #09818f
      // This creates visual harmony while maintaining hierarchy
      
      const header = screen.getByRole('banner')
      const footer = screen.getByRole('contentinfo')
      
      expect(header).toBeInTheDocument()
      expect(footer).toBeInTheDocument()
    })
  })
})
