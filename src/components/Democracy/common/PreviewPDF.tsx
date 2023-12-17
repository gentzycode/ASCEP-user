import { Worker, Viewer } from "@react-pdf-viewer/core";
import { pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import React from "react";

const PdfPreview = ({ file }: { file: File }) => {
  return (
    <Worker
      workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
    >
      <Viewer fileUrl={URL.createObjectURL(file)} />
    </Worker>
  );
};

export default React.memo(PdfPreview);
