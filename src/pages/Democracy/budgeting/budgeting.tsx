import {
  CurrentPhase,
  Investments,
  PagesHeroSection,
  WardProjects,
} from "@/components/Democracy";
import { Button } from "@/components/ui/button";
import ROUTES from "@/utils/routesNames";
import { Link } from "react-router-dom";

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
      <Link to={ROUTES.STATE_INVESTMENT_PROJECTS_ROUTE}>
        <Button className="mx-auto block">View all Investments</Button>
      </Link>
    </>
  );
};

export default BudgetingHomePage;
