import { useResolveDebateShareID } from "@/api/democracy/debates";
import { useResolveInitiativeShareID } from "@/api/democracy/initiatives";
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

  const { data: proposalId, isLoading: isLoadingDProposal } =
    useResolveProposalShareID(shareableId!);

  const { data: debateId, isLoading: isLoadingDebate } =
    useResolveDebateShareID(shareableId!);

  const { data: initiativeId, isLoading: isLoadingInitiative } =
    useResolveInitiativeShareID(shareableId!);

  if (isLoadingDebate)
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
  if (debateId && !isLoadingDebate)
    return <Navigate to={ROUTES.DEBATE_INFO_ROUTE(debateId)} replace={true} />;
  if (proposalId && !isLoadingDProposal)
    return (
      <Navigate to={ROUTES.PROPOSAL_INFO_ROUTE(proposalId)} replace={true} />
    );
  if (initiativeId && !isLoadingInitiative)
    return (
      <Navigate
        to={ROUTES.INITIATIVE_INFO_ROUTE(initiativeId)}
        replace={true}
      />
    );
  return (
    <div>
      {!shareableId && !debateId && !proposalId && !initiativeId && (
        <NotFound message="No Debate Found" />
      )}
    </div>
  );
};

export default ResolveSharedIDPage;

// import React, { useEffect, useState } from "react";
// import { useResolveDebateShareID } from "@/api/democracy/debates";
// import { useResolveInitiativeShareID } from "@/api/democracy/initiatives";
// import { useResolveProposalShareID } from "@/api/democracy/proposals";
// import { NotFound } from "@/components/Democracy";
// import { IconWrapper } from "@/components/custom";
// import { Skeleton } from "@/components/ui/skeleton";
// import ROUTES from "@/utils/routesNames";
// import { FaSpinner } from "react-icons/fa";
// import { Navigate, useParams } from "react-router-dom";
// import { useQuery } from "react-query";

// interface ResolveSharedIDPageProp {}

// const ResolveSharedIDPage: React.FC<ResolveSharedIDPageProp> = () => {
//   const { shareableId } = useParams();
//   const [debate, setDebate] = useState("");

//   const { data, isLoading } = useQuery({
//     queryKey: ["debate-shareID"],
//     queryFn: useResolveDebateShareID(shareableId?.toLowerCase()!).refetch,
//     onSuccess: (res: string) => setDebate(res),
//   });

//   const { data: proposalId } = useQuery({
//     queryKey: ["proposal-shareID"],
//     queryFn: useResolveProposalShareID(shareableId?.toLowerCase()!).refetch,
//   });

//   const { data: initiativeId } = useQuery({
//     queryKey: ["initiative-shareID"],
//     queryFn: useResolveInitiativeShareID(shareableId?.toLowerCase()!).refetch,
//   });

//   console.log(debate);
//   console.log(proposalId);
//   console.log(initiativeId);

//   if (
//     !shareableId ||
//     (!debateId && !proposalId && !initiativeId && !isLoading)
//   ) {
//     return <NotFound message="No Data Found" />;
//   }

//   if ((!debateId && !proposalId && !initiativeId) || isLoading) {
//     return (
//       <Skeleton className="w-full flex justify-center items-center gap-4 flex-wrap bg-transparent">
//         <Skeleton className="text-base md:text-2xl bg-transparent font-bold">
//           Redirecting
//         </Skeleton>
//         <IconWrapper className=" text-primary bg-transparent w-fit h-full rounded-full">
//           <FaSpinner className="animate-spin text-[100px]" />
//         </IconWrapper>
//       </Skeleton>
//     );
//   }

//   if (debate) {
//     return (
//       <Navigate
//         to={ROUTES.DEBATE_INFO_ROUTE(debate.toString())}
//         replace={true}
//       />
//     );
//   }

//   if (proposalId) {
//     return (
//       <Navigate
//         to={ROUTES.PROPOSAL_INFO_ROUTE(proposalId.toString())}
//         replace={true}
//       />
//     );
//   }

//   if (initiativeId) {
//     return (
//       <Navigate
//         to={ROUTES.INITIATIVE_INFO_ROUTE(initiativeId.toString())}
//         replace={true}
//       />
//     );
//   }

//   return null;
// };

// export default ResolveSharedIDPage;
