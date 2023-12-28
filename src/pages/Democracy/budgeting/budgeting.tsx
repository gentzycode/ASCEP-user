import {
  CurrentPhase,
  Investments,
  PagesHeroSection,
  WardProjects,
} from "@/components/Democracy";

interface BudgetingHomePageProp {}
const BudgetingHomePage: React.FC<BudgetingHomePageProp> = () => {
  const pageDescription =
    " Suggest initiatives, interact with investment mappings, and participate in polls with deadlines. Understand the budgeting phases, and utilize the opportunity to suggest city-specific budget items that allows for localized and impactful contributions.";

  return (
    <>
      {/* HEADING */}
      <PagesHeroSection title="Budgeting" description={pageDescription} />

      {/* CURRENT PHASE */}
      <CurrentPhase />

      {/* WARD PROJECTS */}
      <WardProjects />

      {/* INVESTMENTS */}
      <Investments />
    </>
  );
};

export default BudgetingHomePage;
