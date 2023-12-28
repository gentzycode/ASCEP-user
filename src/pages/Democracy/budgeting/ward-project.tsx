import { AdvancedSearch, InvestmentCard } from "@/components/Democracy";
import { wardFilterButtonOptions } from "@/utils/Democracy/Budgets";

interface WardProjectsHomePageProp {}
const WardProjectsHomePage: React.FC<WardProjectsHomePageProp> = () => {
  return (
    <div>
      {/* HEADING */}
      <h1 className="text-xl md:text-2xl">
        Investments' proposals located in Ward: Awka
      </h1>
      <div className="flex items-center gap-6 py-6">
        <p className="text-subtle_text">Total budget</p>
        <p className="text-subtle_text">₦60, 000</p>
      </div>

      {/* ADVANCED SEARCH */}
      <AdvancedSearch
        filterButtonOptions={wardFilterButtonOptions}
        filterByButton={() => {}}
        filterOptions={{ newest: true }}
        setView={() => {}}
        view="card-view"
        setFilterOptions={() => {}}
      />

      {/* PROJECTS */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 my-10">
        <InvestmentCard />
        <InvestmentCard />
        <InvestmentCard />
        <InvestmentCard />
      </div>
    </div>
  );
};

export default WardProjectsHomePage;
