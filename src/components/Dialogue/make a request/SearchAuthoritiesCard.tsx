import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { useAuthContext } from "@/providers/AuthProvider";
import ROUTES from "@/utils/routesNames";
import { Link, useNavigate } from "react-router-dom";

interface SearchRequestCardProp {
  authority: AuthorityType;
}
const SearchRequestCard: React.FC<SearchRequestCardProp> = ({ authority }) => {
  const { isLoggedIn } = useAuthContext();
  const { handleOpenModal } = useAppContext();
  const navigate = useNavigate();

  const handleMakeRequest = () => {
    if (isLoggedIn) {
      navigate(ROUTES.CREATE_REQUEST_ROUTE(authority.id));
    } else {
      handleOpenModal();
    }
  };
  const { total_request_cache, description, name, id } = authority;
  return (
    <div className="flex items-start justify-between flex-col lg:flex-row space-y-3 lg:space-y-0 gap-4 w-full">
      <div className="space-y-3">
        <Link to={ROUTES.AUTHORITY_INFO_ROUTE(id)}>
          <h3 className="text-royal_blue text-xl md:text-2xl">{name}</h3>
        </Link>
        <p className="text-base md:text-lg text-text">{description}</p>
        <p className="text-primary text-base md:text-lg">
          {total_request_cache} requests
        </p>
      </div>
      <Button className=" h-12" onClick={handleMakeRequest}>
        Make a request
      </Button>
    </div>
  );
};

export default SearchRequestCard;
