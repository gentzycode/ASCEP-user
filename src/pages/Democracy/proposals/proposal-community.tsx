import {
  useGetAllProposalTopics,
  useGetProposalCommunityMembers,
  useGetProposalInfo,
} from "@/api/democracy/proposals";
import {
  CommentsPagination,
  CreateTopicModal,
  FilterButtons,
  ProposalParticipantCard,
  ProposalTopicCard,
} from "@/components/Democracy";
import { IconWrapper } from "@/components/custom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useDisclosure from "@/hooks/useDisclosure";
import DemocracyLayout from "@/layouts/DemocracyLayout";
import { proposalTopicFilterButtonOptions } from "@/utils/Democracy/Proposals";
import { formattedDate } from "@/utils/helper";
import { Danger, Messages1 } from "iconsax-react";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";

const ProposalCommuntityHomePage = () => {
  const { proposalId } = useParams();
  const { isOpen: isModalOpen, onClose, onOpen } = useDisclosure();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("newest");
  const { data: proposal, isError: noProposalError } = useGetProposalInfo(
    parseInt(proposalId!)
  );
  const {
    refetch: refetchProposalTopics,
    data: proposalTopicData,
    isLoading: isLoadingProposalTopics,
    isFetching: isFetchingProposalTopics,
  } = useGetAllProposalTopics(page, parseInt(proposalId!), filter);
  const {
    isLoading: isLoadingMembers,
    data: communityMembers,
    refetch: refetchCommunityMembers,
  } = useGetProposalCommunityMembers(parseInt(proposalId!));

  useEffect(() => {
    refetchProposalTopics();
  }, [page, filter]);

  return (
    <DemocracyLayout>
      <h4 className="text-xl md:text-2xl text-primary font-semibold">
        Proposal community
      </h4>
      {/* ERROR */}
      {noProposalError && (
        <div className="flex items-center flex-wrap justify-between border-2 border-primary rounded-md p-2 bg-[#F59E0B]/10 my-10">
          <div className="flex justify-start items-center gap-1">
            <IconWrapper className="text-primary rounded-full">
              <Danger size="32" />
            </IconWrapper>
            <p className="text-[16px]">No proposal found</p>
          </div>
        </div>
      )}
      {/* PROPOSAL INFO */}
      {proposal && (
        <div>
          <div className="mt-10">
            <h1 className="text-xl md:text-2xl text-dark my-2">
              {proposal.title}
            </h1>
            <div className="flex justify-start items-center gap-6 flex-wrap">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={
                    proposal.author.profile_picture
                      ? proposal.author.profile_picture
                      : undefined
                  }
                />
                <AvatarFallback className="uppercase font-[700]">
                  {proposal.author.username.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-dark text-[14px] -ml-4">
                {proposal.author.username}
              </h2>
              <p className="text-[12px] text-base-400 my-3 ">
                {formattedDate(proposal.createdAt)}
              </p>
              <div className="flex items-center gap-3 rounded-[10px] px-3 py-1 text-white bg-dark text-xs w-fit">
                <Messages1 size={20} />
                {proposal.total_comments_cache} Comments
              </div>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row gap-10 my-11 max-w-[1000px]">
            <p className="text-xl md:text-2xl text-subtle_text text-justify">
              Participate in the community of this proposal. An active community
              can help to improve the content of the proposal and boost its
              dissemination to get more support.
            </p>
            <div className="flex flex-col gap-5">
              <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
                Participant
              </h2>
              <Button className="h-fit w-fit rounded-lg" onClick={onOpen}>
                Create Topic
              </Button>
            </div>
          </div>
          <Separator orientation="horizontal" className="bg-base-500 mb-10" />
        </div>
      )}

      {/* FILTER BUTTONS */}
      {communityMembers?.length !== 0 && (
        <FilterButtons
          filterButtonOptions={proposalTopicFilterButtonOptions}
          filterByButton={async (value) => await setFilter(value)}
        />
      )}
      {isLoadingProposalTopics && (
        <div className="w-full flex justify-center">
          <IconWrapper className=" text-primary my-10 w-fit h-full rounded-full">
            <FaSpinner className="animate-spin text-[100px]" />
          </IconWrapper>
        </div>
      )}

      {/* TOPICS */}
      {proposalTopicData?.data && proposalTopicData?.data.length > 0 ? (
        <div
          className={`${
            isFetchingProposalTopics
              ? "opacity-50 pointer-events-none"
              : "bg-opacity-100"
          } grid lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-4 my-8`}
        >
          {proposalTopicData.data.map((topic) => (
            <ProposalTopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        <h1 className="text-xl">
          No topics created, Create the first community topic
        </h1>
      )}

      {/* PAGINATION */}
      {proposalTopicData?.meta && proposalTopicData.data.length > 0 && (
        <CommentsPagination
          onPageChange={(page: number) => setPage(page)}
          meta={proposalTopicData?.meta}
        />
      )}
      {/* PARTICIPANTS */}
      <h2 className="pb-2 pt-0 pl-0 my-8 border-b-4 text-[18px] font-medium border-primary w-fit">
        Participant ({communityMembers?.length})
      </h2>

      {communityMembers && communityMembers?.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {communityMembers.map((member) => (
            <ProposalParticipantCard key={member.user_id} member={member} />
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-xl">No participant in this community</h1>
        </div>
      )}
      {/* CREATE TOPIC */}
      {proposal && (
        <CreateTopicModal
          isOpen={isModalOpen}
          onOpenChange={onClose}
          onClose={onClose}
          propsalId={proposal.id}
        />
      )}
    </DemocracyLayout>
  );
};

export default ProposalCommuntityHomePage;
