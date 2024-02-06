import { useGetPollInfo } from "@/api/democracy/voting";
import {
  CompareProposals,
  PollInfo,
  PollCommentSection,
  NotFound,
} from "@/components/Democracy";
import { PageLoader } from "@/components/custom";
import useScrollToComments from "@/hooks/useScrollToComments";
import { useParams } from "react-router-dom";

interface VotingInfoPageProp {}

const VotingInfoPage: React.FC<VotingInfoPageProp> = () => {
  const { commentsSectionRef, scrollToComments } = useScrollToComments();

  const { pollId } = useParams();

  const {
    isLoading: isLoadingPoll,
    data: poll,
    isError,
  } = useGetPollInfo(pollId!);



  return (
    <>
      {/* LOADING */}
      {isLoadingPoll && <PageLoader />}

      {/* ERROR */}
      {isError && !poll && <NotFound message="Poll not found" />}

      {/* POLL INFO */}
      {poll && <PollInfo scrollToComments={scrollToComments} poll={poll} />}

      {/* COMAPRE PROPOSAL */}
      {poll?.proposals && <CompareProposals proposals={poll.proposals} />}

      {/* COMMENT SECTION */}
      <div ref={commentsSectionRef} className="max-w-[900px] mt-10">
        <PollCommentSection />
      </div>
    </>
  );
};

export default VotingInfoPage;
