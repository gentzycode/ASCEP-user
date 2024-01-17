import { useGetAllAuthorities } from "@/api/authorities";
import { FetchingError } from "@/components/Democracy";
import {
  FilterAuthorities,
  MakeARequestHeading,
  MakeRequestPageFooter,
  SearchAuthoritiesForm,
  SearchedAuthoritiesList,
} from "@/components/Dialogue";
import { PageLoader } from "@/components/custom";
import PaginationComponent from "@/components/custom/Pagination";
import { useEffect, useState } from "react";

interface ViewAuthoritiesHomePageProp {}
const ViewAuthoritiesHomePage: React.FC<ViewAuthoritiesHomePageProp> = () => {
  const {
    data: allAuthorities,
    isLoading,
    isFetching,
    refetch,
    isError,
  } = useGetAllAuthorities();

  const [searchResult, setsearchResult] = useState<AuthorityType[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (allAuthorities && !isLoading) {
      setsearchResult(allAuthorities);
    }
  }, [allAuthorities]);

  useEffect(() => {
    refetch();
  }, []);
  return (
    <div>
      <div className="max-w-[900px] mb-16">
        <MakeARequestHeading />
        {/* SEARCH FIELD */}
        <SearchAuthoritiesForm
          setsearchResult={setsearchResult}
          resetButton={true}
          cancelButton={false}
        />
      </div>

      {/* LOADING */}
      {isLoading && <PageLoader />}

      {/* ERROR */}
      {isError && !isLoading && (
        <FetchingError
          message="Error fetching Authorities"
          refetching={isFetching}
          retryFunction={refetch}
        />
      )}

      {searchResult && !isLoading && (
        <div className="flex justify-start gap-10 lg:flex-row flex-col-reverse">
          <div className=" w-full xl:min-w-[700px] flex flex-col gap-6">
            {/* SEARCH LIST */}
            <SearchedAuthoritiesList searchResult={searchResult} />

            {/* PAGINATION */}
            <PaginationComponent
              page={1}
              setPage={() => {}}
              isFetching={false}
              paginationData={{
                total: 2,
                per_page: 10,
                current_page: 1,
                last_page: 1,
                first_page: 1,
                first_page_url: "/?page=1",
                last_page_url: "/?page=2",
                next_page_url: "/?page=2",
                previous_page_url: null,
              }}
            />
          </div>
          <div className="w-full  md:w-[400px] flex justify-start flex-col space-y-2">
            <FilterAuthorities />
          </div>
        </div>
      )}
      <MakeRequestPageFooter />
    </div>
  );
};

export default ViewAuthoritiesHomePage;
