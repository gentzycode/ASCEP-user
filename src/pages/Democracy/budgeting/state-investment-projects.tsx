import {
  AdvancedSearch,
  InvestmentCard,
  ListViewCard,
} from "@/components/Democracy";
import IconWrapper from "@/components/custom/IconWrapper 2";
import PaginationComponent from "@/components/custom/Pagination";
import { wardFilterButtonOptions } from "@/utils/Democracy/Budgets";
import ROUTES from "@/utils/routesNames";
import { Moneys } from "iconsax-react";
import { useState } from "react";

const StateInvestmentProjectsPage = () => {
  const [view, setView] = useState("list-view");

  return (
    <div>
      <header className="flex justify-between items-start mb-28">
        <div>
          <h1 className="text-text text-2xl lg:text-3xl">
            Investment projects with scope:
          </h1>
          <h3 className="text-primary lg:text-4xl text-2xl py-3">
            Anambra State
          </h3>
        </div>
        <div className="w-[300px] space-y-3">
          <p className="text-subtle_text text-lg md:text-xl">
            Total budget for State
          </p>
          <div className="bg-dark rounded-xl p-3 flex justify-between items-center gap-3 w-full">
            <div>
              <h3 className="text-lg text-light">Anambra</h3>
              <h3 className="text-base text-[#F9F6FB] font-normal">
                ₦600, 000,000
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
          setView={setView}
          view={view}
          setFilterOptions={() => {}}
          defaultFilterButtonValue="random"
          isSearching={false}
        />

        {/* PROJECTS */}
        {view === "card-view" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 my-10">
            <InvestmentCard />
            <InvestmentCard />
            <InvestmentCard />
            <InvestmentCard />
          </div>
        )}

        {view === "list-view" && (
          <div className="grid grid-cols-1 gap-8 my-10">
            <ListViewCard
              route={ROUTES.INITIATIVE_INFO_ROUTE("2")}
              title="Strategic plan for a 100% green city"
            />
            <ListViewCard
              route={ROUTES.INITIATIVE_INFO_ROUTE("2")}
              title="Strategic plan for a 100% green city"
            />
            <ListViewCard
              route={ROUTES.INITIATIVE_INFO_ROUTE("2")}
              title="Strategic plan for a 100% green city"
            />
            <ListViewCard
              route={ROUTES.INITIATIVE_INFO_ROUTE("2")}
              title="Strategic plan for a 100% green city"
            />
          </div>
        )}

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
    </div>
  );
};

export default StateInvestmentProjectsPage;
