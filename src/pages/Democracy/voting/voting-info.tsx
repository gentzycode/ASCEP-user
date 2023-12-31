import { useGetPollInfo } from "@/api/democracy/voting";
import {
  CompareProposals,
  PollInfo,
  PollCommentSection,
  NotFound,
} from "@/components/Democracy";
import { PageLoader } from "@/components/custom";
import { useRef } from "react";
import { useParams } from "react-router-dom";

interface VotingInfoPageProp {}

const VotingInfoPage: React.FC<VotingInfoPageProp> = () => {
  const { pollId } = useParams();

  const {
    isLoading: isLoadingPoll,
    data: poll,
    isError,
  } = useGetPollInfo(pollId!);

  const commentsSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToComments = () => {
    commentsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
