import { PagesHeroSection } from "@/components/Democracy";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/providers/AuthProvider";
import ROUTES from "@/utils/routesNames";
import { Link } from "react-router-dom";

interface VotingHomePageProp {}
const pageDescription =
  "Citizens' polls are a participatory mechanism by which citizens with voting rights can make direct decisions. This will help citizens vote on the relevant  proposals and Initiatives for their community and collectives to decide directly how they want their city to be, after posting and creating sufficient support and effective plan.";
const VotingHomePage: React.FC<VotingHomePageProp> = () => {
  const { isLoggedIn } = useAuthContext();
  return (
    <>
      <PagesHeroSection title="voting" description={pageDescription} />
      {isLoggedIn && (
        <Link to={ROUTES.START_POLL_ROUTE}>
          <Button className="w-[175px] mb-4">Create a Poll</Button>
        </Link>
      )}
    </>
  );
};

export default VotingHomePage;
