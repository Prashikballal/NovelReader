import { Document, Page, pdfjs } from 'react-pdf';
import { useState, useEffect, useRef } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = '/NovelReader/pdf.worker.min.mjs';


export default function NovelReader() {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const containerRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(600);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => setPageNumber(p => Math.max(p - 1, 1));
  const goToNextPage = () => setPageNumber(p => Math.min(p + 1, numPages));

  // Dynamically set page width based on container width for responsiveness
  useEffect(() => {
    function updatePageWidth() {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setPageWidth(width > 800 ? 800 : width - 20); // max 800px, else container width minus padding
      }
    }
    updatePageWidth();
    window.addEventListener('resize', updatePageWidth);
    return () => window.removeEventListener('resize', updatePageWidth);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <h3>Novel Reader</h3>

      <div
        style={{
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
          Previous
        </button>
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
          Next
        </button>
      </div>

      <div
        style={{
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '80vh',
          overflow: 'auto',
          borderRadius: '4px',
        }}
      >
        <Document
          file="http://localhost:5294/api/novels/read/1"
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
          loading={<div>Loading PDF...</div>}
          error={<div>Failed to load PDF</div>}
        >
          <Page pageNumber={pageNumber} width={pageWidth} />
        </Document>
      </div>
    </div>
  );
}
