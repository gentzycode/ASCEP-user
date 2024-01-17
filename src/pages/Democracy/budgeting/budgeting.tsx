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
    "Budget is a key feature that introduces the concept of participatory budgeting to the community. It allows citizens to have a direct say in how a portion of the public budget is allocated. Users can propose, discuss, and vote on budget allocations for various community projects and initiatives. This feature promotes transparency and accountability in financial governance, as it empowers citizens to make informed decisions about public spending. The Budget feature is a testament to the platform's commitment to fostering a sense of ownership and responsibility among citizens regarding community development and financial stewardship.";

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
