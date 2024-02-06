import { useGetAllAuthorities } from "@/api/authorities";
import { FetchingError } from "@/components/Democracy";
import {
  MakeARequestHeading,
  MakeRequestPageFooter,
  SearchAuthoritiesForm,
  SearchedAuthoritiesList,
} from "@/components/Dialogue";
import { PageLoader } from "@/components/custom";
import { useEffect, useState } from "react";

interface MakeARequestHomePageProp {}
const MakeARequestHomePage: React.FC<MakeARequestHomePageProp> = () => {
  const {
    data: allAuthorities,
    isLoading,
    isFetching,
    refetch,
    isError,
  } = useGetAllAuthorities();

  useEffect(() => {
    if (allAuthorities && !isLoading) {
      setsearchResult(allAuthorities);
    }
  }, [allAuthorities]);

  useEffect(() => {
    refetch();
  }, []);
  const [searchResult, setsearchResult] = useState<AuthorityType[] | undefined>(
    allAuthorities
  );
  return (
    <div className="max-w-[900px] mt-11">
      <MakeARequestHeading />
      <SearchAuthoritiesForm
        setsearchResult={setsearchResult}
        resetButton={true}
        cancelButton={false}
      />

      {/* ERROR */}
      {isError && !isLoading && (
        <FetchingError
          message="Error fetching Authorities"
          refetching={isFetching}
          retryFunction={refetch}
        />
      )}

      {/* LOADING */}
      {isLoading && <PageLoader />}

      {searchResult && (
        <div className="mb-20">
          <SearchedAuthoritiesList searchResult={searchResult} />
        </div>
      )}
      <MakeRequestPageFooter />
    </div>
  );
};

export default MakeARequestHomePage;
