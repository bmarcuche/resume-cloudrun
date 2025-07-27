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

describe('Footer Color Consistency', () => {
  describe('Light Mode', () => {
    beforeEach(() => {
      // Ensure light mode
      document.documentElement.removeAttribute('data-theme')
      render(<Home />)
    })

    it('footer uses bg-accent-dark class', () => {
      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveClass('bg-accent-dark')
    })

    it('footer has white text for contrast', () => {
      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveClass('text-white')
    })

    it('footer contains expected content', () => {
      expect(screen.getByText(/© 2025 Bruno Marcuche/)).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
      expect(screen.getByText('Download Resume')).toBeInTheDocument()
      expect(screen.getByText('View Source Code')).toBeInTheDocument()
    })

    it('header and footer should both use blue-based backgrounds', () => {
      const header = screen.getByRole('banner')
      const footer = screen.getByRole('contentinfo')
      
      // Both should have blue-based styling
      expect(header).toHaveClass('gradient-bg')
      expect(footer).toHaveClass('bg-accent-dark')
    })
  })

  describe('Dark Mode', () => {
    beforeEach(() => {
      // Set dark mode
      document.documentElement.setAttribute('data-theme', 'dark')
      render(<Home />)
    })

    afterEach(() => {
      // Clean up
      document.documentElement.removeAttribute('data-theme')
    })

    it('footer maintains bg-accent-dark class in dark mode', () => {
      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveClass('bg-accent-dark')
    })

    it('footer maintains white text in dark mode', () => {
      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveClass('text-white')
    })

    it('footer text should be readable in dark mode', () => {
      // Check that copyright text is present and should be readable
      const copyrightText = screen.getByText(/© 2025 Bruno Marcuche/)
      expect(copyrightText).toBeInTheDocument()
      expect(copyrightText).toHaveClass('text-gray-300')
    })

    it('footer links should be readable in dark mode', () => {
      const contactLink = screen.getByText('Contact')
      const downloadLink = screen.getByText('Download Resume')
      const sourceLink = screen.getByText('View Source Code')
      
      // Links should be present and styled for readability
      expect(contactLink).toBeInTheDocument()
      expect(downloadLink).toBeInTheDocument()
      expect(sourceLink).toBeInTheDocument()
    })

    it('header and footer should have consistent dark appearance', () => {
      const header = screen.getByRole('banner')
      const footer = screen.getByRole('contentinfo')
      
      // Both should be present and styled
      expect(header).toHaveClass('gradient-bg')
      expect(footer).toHaveClass('bg-accent-dark')
    })
  })

  describe('Visual Consistency', () => {
    it('footer links have proper styling', () => {
      render(<Home />)
      
      const contactLink = screen.getByText('Contact')
      const downloadLink = screen.getByText('Download Resume')
      const sourceLink = screen.getByText('View Source Code')
      
      // All should be anchor elements
      expect(contactLink.tagName).toBe('A')
      expect(downloadLink.tagName).toBe('A')
      expect(sourceLink.tagName).toBe('A')
    })

    it('footer maintains proper spacing and layout', () => {
      render(<Home />)
      
      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveClass('py-8')
      
      const container = footer.querySelector('.container')
      expect(container).toHaveClass('mx-auto', 'px-4', 'text-center')
    })
  })
})
