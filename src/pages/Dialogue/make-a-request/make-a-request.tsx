import { useGetAllAuthorities } from "@/api/authorities";
import {
  MakeARequestHeading,
  MakeRequestPageFooter,
  SearchAuthoritiesForm,
  SearchedAuthoritiesList,
} from "@/components/Dialogue";
import { PageLoader } from "@/components/custom";
import { useState } from "react";

interface MakeARequestHomePageProp {}
const MakeARequestHomePage: React.FC<MakeARequestHomePageProp> = () => {
  const { data: allAuthorities, isLoading } = useGetAllAuthorities();

  const [searchResult, setsearchResult] = useState<AuthorityType[] | undefined>(
    allAuthorities
  );
  return (
    <div className="max-w-[900px] mt-11">
      <MakeARequestHeading />
      <SearchAuthoritiesForm setsearchResult={setsearchResult} />

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
