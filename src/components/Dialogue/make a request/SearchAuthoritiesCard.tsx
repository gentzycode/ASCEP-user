import { Button } from "@/components/ui/button";
import ROUTES from "@/utils/routesNames";
import { Link } from "react-router-dom";

interface SearchRequestCardProp {
  authority: AuthorityType;
}
const SearchRequestCard: React.FC<SearchRequestCardProp> = ({ authority }) => {
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
      <Link to={ROUTES.CREATE_REQUEST_ROUTE(id)}>
        <Button className=" h-12">Make a request</Button>
      </Link>
    </div>
  );
};

export default SearchRequestCard;
