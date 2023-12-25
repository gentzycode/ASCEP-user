import { Worker, Viewer } from "@react-pdf-viewer/core";
import { pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import React from "react";
interface DisplayDocumentsProps {
  doc: {
    document_url: string;
    proposal_id: string;
  };
}

const DisplayDocuments: React.FC<DisplayDocumentsProps> = ({ doc }) => {
  return (
    <div>
      <div className="w-[200px] h-[200px]">
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
        >
          <Viewer fileUrl={doc.document_url} />
        </Worker>
      </div>
      <a download={doc.document_url} href={doc.document_url} target="_blank" className="text-text">
        Download file
      </a>
    </div>
  );
};

export default DisplayDocuments;
