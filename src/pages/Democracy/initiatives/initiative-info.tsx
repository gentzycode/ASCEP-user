import { useGetInitiativeInfo } from "@/api/democracy/initiatives";
import {
  InitiativeCommentSection,
  InitiativeInfo,
  NotFound,
  RelatedDebates,
} from "@/components/Democracy";
import { PageLoader } from "@/components/custom";
import useScrollToComments from "@/hooks/useScrollToComments";
import { useParams } from "react-router-dom";

interface InitiativeInfoPageProps {}

const InitiativeInfoPage: React.FC<InitiativeInfoPageProps> = () => {
  const { commentsSectionRef, scrollToComments } = useScrollToComments();
  const { initiativeId } = useParams();
  const {
    data: initiative,
    isLoading: isLoadingProposal,
    isError,
  } = useGetInitiativeInfo(initiativeId!);

  return (
    <>
      {/* LOADING */}
      <div className="w-full flex justify-center">
        {isLoadingProposal && <PageLoader />}
      </div>

      {/* ERROR */}
      {isError && !initiative && <NotFound message="Initiative not found" />}

      {/* PROPOSAL INFO */}
      {initiative && (
        <div>
          <InitiativeInfo
            scrollToComments={scrollToComments}
            initiative={initiative}
          />
        </div>
      )}

      {/* ***********************************RELATED CONTENT***************************************** */}
      {/* <div className="my-10 w-full max-w-[700px]">
        <RelatedDebates />
      </div> */}

      {/* COMMENT SECTION */}
      <div ref={commentsSectionRef} className="max-w-[900px] mt-10">
        <InitiativeCommentSection />
      </div>
    </>
  );
};

export default InitiativeInfoPage;
