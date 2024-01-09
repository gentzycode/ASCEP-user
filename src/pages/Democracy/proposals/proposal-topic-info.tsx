import { useGetProposalTopicInfo } from "@/api/democracy/proposals";
import {
  CreateTopicModal,
  NotFound,
  ProposalTopicComments,
  ProposalTopicInfo,
} from "@/components/Democracy";
import { IconWrapper } from "@/components/custom";
import useDisclosure from "@/hooks/useDisclosure";
import { useRef } from "react";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";

interface ProposalTopicInfoPageProps {}
const ProposalTopicInfoPage: React.FC<ProposalTopicInfoPageProps> = () => {
  const { isOpen: isModalOpen, onClose, onOpen } = useDisclosure();

  const { topicId } = useParams();

  const {
    data: topic,
    isLoading: isLoadingTopic,
    isError,
  } = useGetProposalTopicInfo(topicId!);

  const commentsSectionRef = useRef<HTMLDivElement | null>(null);
  const scrollToComments = () => {
    commentsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* ERROR */}
      {isError && !topic && <NotFound message="No Topic found" />}

      {/* LOADING */}
      {isLoadingTopic && (
        <div className="w-full flex justify-center">
          <IconWrapper className=" text-primary my-10 w-fit h-full rounded-full">
            <FaSpinner className="animate-spin text-[100px]" />
          </IconWrapper>
        </div>
      )}

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
