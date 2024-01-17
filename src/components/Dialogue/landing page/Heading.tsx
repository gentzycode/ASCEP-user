import {
  useGetAllRequests,
  useGetAuthoritiesAndRequestCount,
} from "@/api/dialogue/requests";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { useAuthContext } from "@/providers/AuthProvider";
import ROUTES from "@/utils/routesNames";
import { Link, useNavigate } from "react-router-dom";

interface HeadingProp {}
const Heading: React.FC<HeadingProp> = () => {
  const { isLoggedIn } = useAuthContext();
  const { handleOpenModal } = useAppContext();
  const navigate = useNavigate();

  const handleMakeRequest = () => {
    if (isLoggedIn) {
      navigate(ROUTES.VIEW_AUTHORITIES_HOME_ROUTE);
    } else {
      handleOpenModal();
    }
  };

  const { data: counts } = useGetAuthoritiesAndRequestCount();

  return (
    <div>
      <h1 className="text-text text-3xl md:text-6xl">
        Get answers from the government and public sector
      </h1>
      <p className="text-subtle_text py-8 text-xl xl:text-2xl">
        Make a request for information to a public authority: by law, they have
        to respond
      </p>
      <div className="flex items-center gap-2 flex-wrap text-xl md:text-2xl">
        <Button
          className="h-11 text-dark text-base"
          onClick={handleMakeRequest}
        >
          Make a request
        </Button>
        <p className="text-text text-xl xl:text-2xl">
          or Browse{" "}
          <Link to={ROUTES.BROWSE_REQUEST_HOME_ROUTE} className="text-primary">
            {counts?.totalRequests} requests{" "}
          </Link>
          to{" "}
          <Link
            to={ROUTES.VIEW_AUTHORITIES_HOME_ROUTE}
            className="text-royal_blue"
          >
            {counts?.totalAuthorities} authorities
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Heading;
