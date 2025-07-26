'use client'

import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// Set up PDF.js worker for react-pdf 9.x with .mjs format
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PDFViewerProps {
  file: string
}

export default function PDFViewer({ file }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setLoading(false)
    setError(null)
  }

  function onDocumentLoadError(error: Error) {
    console.error('Error loading PDF:', error)
    setLoading(false)
    setError('Failed to load PDF file. Please try downloading it directly.')
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">PDF Load Error</h3>
            <p className="mt-1 text-sm text-gray-500">{error}</p>
            <div className="mt-6">
              <a
                href={file}
                download
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent-teal hover:bg-accent-teal/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-teal"
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {loading && (
        <div className="flex justify-center items-center h-96" role="status" aria-label="Loading PDF">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-teal"></div>
        </div>
      )}
      
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading=""
        className="flex flex-col items-center"
      >
        {!loading && numPages > 0 && (
          <Page
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="pdf-container rounded-lg overflow-hidden mb-4 shadow-lg border border-gray-200"
            width={Math.min(800, typeof window !== 'undefined' ? window.innerWidth - 40 : 800)}
          />
        )}
      </Document>

      {!loading && numPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
            disabled={pageNumber <= 1}
            className="px-4 py-2 bg-accent-teal text-white rounded-lg disabled:bg-secondary disabled:text-body disabled:cursor-not-allowed hover:bg-teal-600 transition-colors font-medium shadow-sm"
          >
            Previous
          </button>
          
          <span className="pdf-page-indicator font-medium px-3 py-2 rounded-lg shadow-sm border">
            Page {pageNumber} of {numPages}
          </span>
          
          <button
            onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
            disabled={pageNumber >= numPages}
            className="px-4 py-2 bg-accent-teal text-white rounded-lg disabled:bg-secondary disabled:text-body disabled:cursor-not-allowed hover:bg-teal-600 transition-colors font-medium shadow-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
