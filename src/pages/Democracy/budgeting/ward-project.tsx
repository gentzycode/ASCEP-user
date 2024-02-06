import { AdvancedSearch, InvestmentCard } from "@/components/Democracy";
import IconWrapper from "@/components/custom/IconWrapper 2";
import PaginationComponent from "@/components/custom/Pagination";
import { wardFilterButtonOptions } from "@/utils/Democracy/Budgets";
import { Moneys } from "iconsax-react";

interface WardProjectsHomePageProp {}
const WardProjectsHomePage: React.FC<WardProjectsHomePageProp> = () => {
  return (
    <div>
      {/* HEADING */}
      <header className="flex justify-between items-start mb-28">
        <div>
          <h1 className="text-text text-2xl lg:text-3xl">
            Investments' proposals located in Ward:
          </h1>
          <h3 className="text-primary lg:text-4xl text-2xl py-3">
            Achina Ward
          </h3>
        </div>
        <div className="w-[300px] space-y-3">
          <p className="text-subtle_text text-lg md:text-xl">
            Total budget for Ward
          </p>
          <div className="bg-dark rounded-xl p-3 flex justify-between items-center gap-3 w-full">
            <div>
              <h3 className="text-lg text-light">Achina I</h3>
              <h3 className="text-base text-[#F9F6FB] font-normal">
                ₦ 600, 000
              </h3>
            </div>
            <IconWrapper className="p-4 w-fit h-fit bg-[#FFC334]/10 text-primary">
              <Moneys size="25" />
            </IconWrapper>
          </div>
        </div>
      </header>
      <div className="max-w-[1000px] mt-8">
        {/* ADVANCED SEARCH */}
        <AdvancedSearch
          filterButtonOptions={wardFilterButtonOptions}
          filterByButton={() => {}}
          filterOptions={{ newest: true }}
          setView={() => {}}
          view="card-view"
          setFilterOptions={() => {}}
          defaultFilterButtonValue="newest"
          isSearching={false}
        />

        {/* PROJECTS */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 my-10">
          <InvestmentCard />
          <InvestmentCard />
          <InvestmentCard />
          <InvestmentCard />
        </div>

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
    </div>
  );
};

export default WardProjectsHomePage;
