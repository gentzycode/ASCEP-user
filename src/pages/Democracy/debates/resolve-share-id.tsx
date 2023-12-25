import { useResolveShareID } from "@/api/democracy/debates";
import { NotFound } from "@/components/Democracy";
import { IconWrapper } from "@/components/custom";
import { Skeleton } from "@/components/ui/skeleton";
import ROUTES from "@/utils/routesNames";
import { FaSpinner } from "react-icons/fa";
import { Navigate, useParams } from "react-router-dom";

interface ResolveSharedIDPageProp {}

const ResolveSharedIDPage: React.FC<ResolveSharedIDPageProp> = () => {
  const { shareableId } = useParams();
  const { data: debateId, isLoading: isLoadingDebate } = useResolveShareID(
    shareableId!
  );

  if (isLoadingDebate)
    return (
      <Skeleton className="w-full flex justify-center items-center gap-4 flex-wrap">
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
  return (
    <div>
      {!shareableId && !debateId && <NotFound message="No Debate Found" />}
    </div>
  );
};

export default ResolveSharedIDPage;
