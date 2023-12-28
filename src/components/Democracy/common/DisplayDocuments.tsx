import { Worker, Viewer } from "@react-pdf-viewer/core";
import { pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import React from "react";
import { useDeleteProposalDoc } from "@/api/democracy/proposals";
import ALert from "@/components/custom/Alert";
import useDisclosure from "@/hooks/useDisclosure";
import { Trash } from "iconsax-react";
import { IconWrapper } from "@/components/custom";
import { useAuthContext } from "@/providers/AuthProvider";
interface DisplayDocumentsProps {
  doc: {
    document_url: string;
    proposal_id: string;
    id: string;
  };
}

const DisplayDocuments: React.FC<DisplayDocumentsProps> = ({ doc }) => {
  const { isLoggedIn } = useAuthContext();

  const { document_url, proposal_id, id } = doc;

  const { mutateAsync: deleteDoc, isLoading: isDeletingDoc } =
    useDeleteProposalDoc(proposal_id, id);

  const {
    isOpen: alertOpen,
    onOpen: openAlert,
    onClose: closeAlert,
  } = useDisclosure();

  const handleDelete = async () => {
    await deleteDoc();
    closeAlert();
  };

  return (
    <>
      <div>
        <div className="w-[200px] h-[200px]">
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
          >
            <Viewer fileUrl={document_url} />
          </Worker>
        </div>
        <div className="flex items-center gap-4 justify-center py-3">
          <a
            download={document_url}
            href={document_url}
            target="_blank"
            className="text-text"
          >
            Download file
          </a>
          {isLoggedIn && (
            <IconWrapper className="border border-red-500 text-red-500 cursor-pointer rounded-sm bg-light px-2 py-1 h-fit w-fit hover:bg-red-500 hover:text-light">
              <Trash size={20} onClick={openAlert} />
            </IconWrapper>
          )}
        </div>
      </div>
      {/* DELETE ALERT */}
      <ALert
        message="Are you sure you want to delete this document"
        description="This action cannot be undone. This will permanently delete the document."
        action={handleDelete}
        isOpen={alertOpen}
        close={closeAlert}
        loadingAction={isDeletingDoc}
      />
    </>
  );
};

export default DisplayDocuments;
