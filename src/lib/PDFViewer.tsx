import React, { useState, useEffect  ,useMemo, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { pdfjs } from 'react-pdf';




import type { PDFDocumentProxy } from 'pdfjs-dist';



// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


// Set up the worker script
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const maxWidth = 800;

interface PDFViewerProps {
  fileUrl: string;
}


const PDFViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageWidth, setPageWidth] = useState<number>(800);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const options = useMemo(() => ({
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
  }), []);

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    console.log('onDocumentLoadSuccess');
    setNumPages(nextNumPages);
  }


//   useEffect(() => {
//     function handleResize() {
//       if (containerRef) {
//         setPageWidth(containerRef.getBoundingClientRect().width);
//       }
//     }

//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => window.removeEventListener('resize', handleResize);
//   }, [containerRef]);


  if (loading) {
    return <div>Loading PDF...</div>;
  }


  return (
    <div ref={containerRef}>
       <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} >
            {Array.from(new Array(numPages), (_el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
              />
            ))}
        </Document>
    </div>
  );
};

export default PDFViewer;