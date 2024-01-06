import { useResolveInitiativeShareID } from "@/api/democracy/initiatives";
import { NotFound } from "@/components/Democracy";
import { IconWrapper } from "@/components/custom";
import { Skeleton } from "@/components/ui/skeleton";
import ROUTES from "@/utils/routesNames";
import { FaSpinner } from "react-icons/fa";
import { Navigate, useParams } from "react-router-dom";

interface ResolveSharedIDPageProp {}

const ResolveSharedIDPage: React.FC<ResolveSharedIDPageProp> = () => {
  const { shareableId } = useParams();

  const { data: initiativeId, isLoading: isLoadingInitiative } =
    useResolveInitiativeShareID(shareableId!);

  if (isLoadingInitiative)
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

  if (initiativeId && !isLoadingInitiative)
    return (
      <Navigate
        to={ROUTES.INITIATIVE_INFO_ROUTE(initiativeId)}
        replace={true}
      />
    );

  return (
    <div>
      {(!shareableId || !initiativeId) && (
        <NotFound message="No Initiative Found" />
      )}
    </div>
  );
};

export default ResolveSharedIDPage;
