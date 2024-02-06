import { useGetProposalTopicInfo } from "@/api/democracy/proposals";
import {
  CreateTopicModal,
  NotFound,
  ProposalTopicComments,
  ProposalTopicInfo,
} from "@/components/Democracy";
import { PageLoader } from "@/components/custom";
import useDisclosure from "@/hooks/useDisclosure";
import useScrollToComments from "@/hooks/useScrollToComments";
import { useParams } from "react-router-dom";

interface ProposalTopicInfoPageProps {}
const ProposalTopicInfoPage: React.FC<ProposalTopicInfoPageProps> = () => {
  const { commentsSectionRef, scrollToComments } = useScrollToComments();

  const { isOpen: isModalOpen, onClose, onOpen } = useDisclosure();

  const { topicId } = useParams();

  const {
    data: topic,
    isLoading: isLoadingTopic,
    isError,
  } = useGetProposalTopicInfo(topicId!);

  return (
    <div>
      {/* ERROR */}
      {isError && !topic && <NotFound message="No Topic found" />}

      {/* LOADING */}
      {isLoadingTopic && <PageLoader />}

      {/* TOPIC INFO */}
      {topic && (
        <ProposalTopicInfo
          topic={topic}
          scrollToComments={scrollToComments}
          onOpen={onOpen}
        />
      )}

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
          {topic && <ProposalTopicComments />}
        </div>
      </div>

      {/* EDIT PROPOSAL TOPIC */}
      {topic && (
        <CreateTopicModal
          isOpen={isModalOpen}
          onOpenChange={onClose}
          onClose={onClose}
          propsalId={topic.proposal.id}
          isEditing={true}
          title={topic.title}
          content={topic.content}
          topicId={topic.id}
        />
      )}
    </div>
  );
};
export default ProposalTopicInfoPage;
