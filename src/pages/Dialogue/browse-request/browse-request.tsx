import { useGetAllRequests } from "@/api/dialogue/requests";
import { FetchingError, NotFound } from "@/components/Democracy";
import { RequestList, SearchRequest } from "@/components/Dialogue";
import { PageLoader } from "@/components/custom";
import PaginationComponent from "@/components/custom/Pagination";
import { searchRequestSchema } from "@/schemas/MakeARequestSchema";
import { useEffect, useState } from "react";
import * as z from "zod";

interface BrowseRequestHomePageProp {}
const BrowseRequestHomePage: React.FC<BrowseRequestHomePageProp> = () => {
  const initialFilter = {
    text: undefined,
    authority: undefined,
    privacy: undefined,
    status: "all",
    datetimeRange: undefined,
  };
  const perPage = 10;
  const [page, setPage] = useState(1);
  const [filterOptions, setFilterOptions] =
    useState<z.infer<typeof searchRequestSchema>>(initialFilter);

  const {
    data: requestData,
    isLoading,
    mutateAsync: getRequests,
    isError,
  } = useGetAllRequests();

  useEffect(() => {
    getRequests({ page, perPage, filter: filterOptions });
  }, [filterOptions, page]);

  const refetch = () => {
    getRequests({ page, perPage, filter: filterOptions });
  };
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
      <SearchRequest
        isLoading={isLoading}
        setFilterOptions={setFilterOptions}
      />

      {/* ERROR */}
      {isError && !isLoading && (
        <FetchingError
          message="Error fetching Requests"
          refetching={isLoading}
          retryFunction={refetch}
        />
      )}

      {/* LOADING */}
      {isLoading && <PageLoader />}

      {requestData && <RequestList requests={requestData.foi_requests} />}

      {/* NO REQUEST FOUND */}
      {requestData && requestData.foi_requests.length === 0 && (
        <NotFound message="No Requests found" />
      )}

      {/* PAGINATION */}
      {requestData && requestData.foi_requests.length !== 0 && (
        <PaginationComponent
          page={page}
          paginationData={requestData.meta}
          setPage={setPage}
          isFetching={isLoading}
        />
      )}
    </div>
  );
};

export default BrowseRequestHomePage;
