import { useGetAllRequests } from "@/api/dialogue/requests";
import { RequestList, SearchRequest } from "@/components/Dialogue";
import { useEffect, useState } from "react";

interface BrowseRequestHomePageProp {}
const BrowseRequestHomePage: React.FC<BrowseRequestHomePageProp> = () => {
  const [page, setPage] = useState(1);
  const perPage = 10;
  const filter = {
    text: undefined,
    newest: undefined,
    datetimeSpecific: undefined,
    // status: undefined,
    status: "all",
    authority: undefined,
    privacy: undefined,
  };

  const {
    data: allRequests,
    isLoading,
    mutateAsync: getRequests,
  } = useGetAllRequests();

  useEffect(() => {
    getRequests({ page, perPage, filter });
  }, []);

  return (
    <div className="max-w-[900px]">
      <div className=" space-y-2">
        <h2 className="text-text text-3xl xl:text-4xl">
          Browse and search requests
        </h2>
        <p className="text-base text-subtitle_text">
          ACEPS Dialogue covers requests to 46,398 authorities, type in the name
          of the public authority or keywords related to your topic you'd like
          information from.
        </p>
      </div>
      <SearchRequest />
      <RequestList />
    </div>
  );
};

export default BrowseRequestHomePage;
