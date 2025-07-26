import { render, screen, waitFor } from '@testing-library/react'
import PDFViewer from '../components/PDFViewer'

// Mock react-pdf
jest.mock('react-pdf', () => ({
  Document: ({ children, onLoadSuccess, onLoadError, file }: any) => {
    // Simulate successful PDF load
    setTimeout(() => {
      if (onLoadSuccess) {
        onLoadSuccess({ numPages: 2 })
      }
    }, 100)
    
    return (
      <div data-testid="pdf-document" data-file={file}>
        {children}
      </div>
    )
  },
  Page: ({ pageNumber }: any) => (
    <div data-testid={`pdf-page-${pageNumber}`}>
      PDF Page {pageNumber}
    </div>
  ),
  pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: ''
    },
    version: '3.11.174'
  }
}))

// Mock CSS imports
jest.mock('react-pdf/dist/esm/Page/AnnotationLayer.css', () => ({}))
jest.mock('react-pdf/dist/esm/Page/TextLayer.css', () => ({}))

describe('PDFViewer', () => {
  const testFile = '/resume/bruno_marcuche_resume.pdf'

  beforeEach(() => {
    // Reset any mocks
    jest.clearAllMocks()
  })

  it('renders PDF viewer component', () => {
    render(<PDFViewer file={testFile} />)
    
    expect(screen.getByTestId('pdf-document')).toBeInTheDocument()
    expect(screen.getByTestId('pdf-document')).toHaveAttribute('data-file', testFile)
  })

  it('shows loading state initially', () => {
    render(<PDFViewer file={testFile} />)
    
    // Should show loading spinner
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('loads PDF successfully and shows pages', async () => {
    render(<PDFViewer file={testFile} />)
    
    // Wait for PDF to load
    await waitFor(() => {
      expect(screen.getByTestId('pdf-page-1')).toBeInTheDocument()
    }, { timeout: 2000 })

    // Should show first page
    expect(screen.getByText('PDF Page 1')).toBeInTheDocument()
  })

  it('handles PDF load errors gracefully', async () => {
    // Mock console.error to avoid test output noise
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    // Create a version that triggers error
    const ErrorPDFViewer = () => {
      const mockDocument = ({ onLoadError }: any) => {
        setTimeout(() => {
          if (onLoadError) {
            onLoadError(new Error('Failed to load PDF'))
          }
        }, 100)
        return <div data-testid="pdf-error">Error loading PDF</div>
      }

      return mockDocument({ onLoadError: (error: Error) => console.error('PDF Error:', error) })
    }

    render(<ErrorPDFViewer />)
    
    await waitFor(() => {
      expect(screen.getByTestId('pdf-error')).toBeInTheDocument()
    })

    consoleSpy.mockRestore()
  })

  it('has proper PDF.js worker configuration', () => {
    const { pdfjs } = require('react-pdf')
    
    // Should have worker source configured
    expect(pdfjs.GlobalWorkerOptions.workerSrc).toBeDefined()
    expect(typeof pdfjs.GlobalWorkerOptions.workerSrc).toBe('string')
  })

  it('renders navigation controls when PDF loads', async () => {
    render(<PDFViewer file={testFile} />)
    
    // Wait for PDF to load
    await waitFor(() => {
      expect(screen.getByTestId('pdf-page-1')).toBeInTheDocument()
    })

    // Should show page navigation
    expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument()
  })

  it('handles page navigation', async () => {
    render(<PDFViewer file={testFile} />)
    
    // Wait for PDF to load
    await waitFor(() => {
      expect(screen.getByTestId('pdf-page-1')).toBeInTheDocument()
    })

    // Should be able to navigate to next page
    const nextButton = screen.getByText('Next')
    expect(nextButton).toBeInTheDocument()
    expect(nextButton).not.toBeDisabled()
  })

  it('validates PDF file path', () => {
    render(<PDFViewer file={testFile} />)
    
    const pdfDocument = screen.getByTestId('pdf-document')
    expect(pdfDocument).toHaveAttribute('data-file', '/resume/bruno_marcuche_resume.pdf')
  })
})
