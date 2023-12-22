import { useGetProposalInfo } from "@/api/democracy/proposals";
import {
  DisplayDocuments,
  ProposalComments,
  ProposalInfo,
  RelatedDebates,
} from "@/components/Democracy";
import { IconWrapper } from "@/components/custom";
import { Danger } from "iconsax-react";
import { useRef } from "react";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";

interface ProposalInfoPageProps {}
const ProposalInfoPage: React.FC<ProposalInfoPageProps> = () => {
  const { proposalId } = useParams();
  const {
    data: proposal,
    isLoading: isLoadingProposal,
    isError,
  } = useGetProposalInfo(parseInt(proposalId!));

  const commentsSectionRef = useRef<HTMLDivElement | null>(null);
  const scrollToComments = () => {
    commentsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* LOADING */}
      <div className="w-full flex justify-center ">
        {isLoadingProposal && (
          <IconWrapper className=" text-primary my-10 w-fit h-full rounded-full">
            <FaSpinner className="animate-spin text-[100px]" />
          </IconWrapper>
        )}
      </div>
      {/* ERROR */}
      {isError && (
        <div className="flex items-center flex-wrap justify-between border-2 border-primary rounded-md p-2 bg-[#F59E0B]/10 my-10">
          <div className="flex justify-start items-center gap-1">
            <IconWrapper className="text-primary rounded-full">
              <Danger size="32" />
            </IconWrapper>
            <p className="text-[16px]">No Proposal Found</p>
          </div>
        </div>
      )}
      {/* PROPOSAL INFO */}
      {proposal && (
        <div>
          <ProposalInfo
            scrollToComments={scrollToComments}
            proposal={proposal}
          />
        </div>
      )}

      {/* ***********************************RELATED CONTENT***************************************** */}
      {/* <div className="my-10 w-full max-w-[700px]">
        <RelatedDebates />
      </div> */}

      {/* DOCUMENTS */}
      <div className="pt-10">
        {proposal?.proposalDocuments.length !== 0 && (
          <>
            <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit mb-8">
              Documents ({proposal?.proposalDocuments.length})
            </h2>
            <div className="flex gap-4 flex-wrap">
              {proposal?.proposalDocuments.map((doc) => (
                <DisplayDocuments doc={doc} />
              ))}
            </div>
          </>
        )}
      </div>

      {/*COMMENTS */}
      <div
        className="my-10 w-full max-w-[700px]"
        id="comments"
        ref={commentsSectionRef}
      >
        <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
          Comments
        </h2>
        <div className="flex gap-10 flex-col mt-10">
          {proposal && <ProposalComments />}
        </div>
      </div>
    </>
  );
};

export default ProposalInfoPage;
