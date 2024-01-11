import {
  FilterAuthorities,
  MakeARequestHeading,
  MakeRequestPageFooter,
  SearchAuthoritiesCard,
} from "@/components/Dialogue";
import PaginationComponent from "@/components/custom/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ViewAuthoritiesHomePageProp {}
const ViewAuthoritiesHomePage: React.FC<ViewAuthoritiesHomePageProp> = () => {
  return (
    <div>
      {/* SEARCH FIELD */}
      <div className="max-w-[900px] mb-16">
        <MakeARequestHeading />
        <div className="flex items-start justify-start gap-4 flex-wrap flex-col min-[500px]:flex-row mt-9">
          <Input
            placeholder="e.g Ministry of ..."
            className="flex-1 h-11 rounded-full"
          />
          <Button className="h-11 text-base text-dark w-[150px]">Search</Button>
        </div>
        <p className="text-base text-text py-8">4 matching authorities</p>
      </div>

      <div className="flex justify-start gap-10 lg:flex-row flex-col-reverse">
        <div className=" w-full xl:min-w-[700px] flex flex-col gap-6">
          <div className="flex flex-col gap-10">
            <SearchAuthoritiesCard />
            <SearchAuthoritiesCard />
            <SearchAuthoritiesCard />
            <SearchAuthoritiesCard />
          </div>
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
      <MakeRequestPageFooter />
    </div>
  );
};

export default ViewAuthoritiesHomePage;
