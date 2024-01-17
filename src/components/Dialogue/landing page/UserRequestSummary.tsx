import { useGetAllRequests } from "@/api/dialogue/requests";
import { PageLoader } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ROUTES from "@/utils/routesNames";
import { formatDistance } from "date-fns";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface UserRequestSummaryProp {}
const UserRequestSummary: React.FC<UserRequestSummaryProp> = () => {
  const {
    data: requests,
    isLoading,
    mutateAsync: getRequests,
  } = useGetAllRequests();

  useEffect(() => {
    getRequests({ page: 1, perPage: 10, filter: { status: "all" } });
  }, []);

  return (
    <div>
      {isLoading && <PageLoader />}
      {requests && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          {requests.foi_requests.map((request) => (
            <div key={request.id}>
              <p className="text-text text-base md:text-lg">
                <Link to={ROUTES.AUTHORITY_INFO_ROUTE(request.authority_id)}>
                  <span className="text-royal_blue">
                    {request.authority.name}
                  </span>{" "}
                </Link>
                answered a request about{" "}
                <Link to={ROUTES.REQUEST_INFO_ROUTE(request.id)}>
                  <span className="text-primary">{request.title}</span>
                </Link>
              </p>
              <p className="text-dark py-1">
                {formatDistance(new Date(), new Date(request.createdAt))} ago
              </p>
              <Separator className="h-[2px] " />
            </div>
          ))}
        </div>
      )}
      <Link to={ROUTES.BROWSE_REQUEST_HOME_ROUTE}>
        <Button className="h-12 w-full max-w-[200px] text-dark my-8">
          Browse all requests
        </Button>
      </Link>
    </div>
  );
};

export default UserRequestSummary;
