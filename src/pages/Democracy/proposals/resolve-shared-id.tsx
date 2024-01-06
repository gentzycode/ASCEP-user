import { useResolveProposalShareID } from "@/api/democracy/proposals";
import { NotFound } from "@/components/Democracy";
import { IconWrapper } from "@/components/custom";
import { Skeleton } from "@/components/ui/skeleton";
import ROUTES from "@/utils/routesNames";
import { FaSpinner } from "react-icons/fa";
import { Navigate, useParams } from "react-router-dom";

interface ResolveSharedIDPageProp {}

const ResolveSharedIDPage: React.FC<ResolveSharedIDPageProp> = () => {
  const { shareableId } = useParams();

  const { data: proposalId, isLoading: isLoadingProposal } =
    useResolveProposalShareID(shareableId!);

  if (isLoadingProposal)
    return (
      <Skeleton className="w-full flex justify-center items-center gap-4 flex-wrap bg-transparent">
        <Skeleton className="text-base md:text-2xl bg-transparent font-bold">
          Redirecting
        </Skeleton>
        <IconWrapper className=" text-primary bg-transparent w-fit h-full rounded-full">
          <FaSpinner className="animate-spin text-[100px]" />
        </IconWrapper>
      </Skeleton>
    );

  if (proposalId && !isLoadingProposal)
    return (
      <Navigate to={ROUTES.PROPOSAL_INFO_ROUTE(proposalId)} replace={true} />
    );

  return (
    <div>
      {(!shareableId || !proposalId) && (
        <NotFound message="No Proposal Found" />
      )}
    </div>
  );
};

export default ResolveSharedIDPage;
