'use client'

import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

interface PDFViewerProps {
  file: string
}

export default function PDFViewer({ file }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setLoading(false)
  }

  function onDocumentLoadError(error: Error) {
    console.error('Error loading PDF:', error)
    setLoading(false)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {loading && (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      )}
      
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading=""
        className="flex flex-col items-center"
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={true}
          renderAnnotationLayer={true}
          className="pdf-container rounded-lg overflow-hidden mb-4"
          width={Math.min(800, typeof window !== 'undefined' ? window.innerWidth - 40 : 800)}
        />
      </Document>

      {numPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
            disabled={pageNumber <= 1}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
          >
            Previous
          </button>
          
          <span className="text-gray-700 font-medium">
            Page {pageNumber} of {numPages}
          </span>
          
          <button
            onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
            disabled={pageNumber >= numPages}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
