import { useGetInitiativeInfo } from "@/api/democracy/initiatives";
import {
  InitiativeComments,
  InitiativeInfo,
  NotFound,
  RelatedDebates,
} from "@/components/Democracy";
import { IconWrapper } from "@/components/custom";
import { useRef } from "react";
import { FaSpinner } from "react-icons/fa";
import {useParams } from "react-router-dom";

interface InitiativeInfoPageProps {}

const InitiativeInfoPage: React.FC<InitiativeInfoPageProps> = () => {
  const { initiativeId } = useParams();
  const {
    data: initiative,
    isLoading: isLoadingProposal,
    isError,
  } = useGetInitiativeInfo(initiativeId!);

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
          {initiative && <InitiativeComments />}
        </div>
      </div>
    </>
  );
};

export default InitiativeInfoPage;
