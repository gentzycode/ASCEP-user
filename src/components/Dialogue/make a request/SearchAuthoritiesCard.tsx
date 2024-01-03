import { Button } from "@/components/ui/button";
import ROUTES from "@/utils/routesNames";
import { Link } from "react-router-dom";

interface SearchRequestCardProp {}
const SearchRequestCard: React.FC<SearchRequestCardProp> = () => {
  return (
    <div className="flex items-start justify-start flex-col lg:flex-row space-y-3 lg:space-y-0">
      <div className="space-y-3">
        <h3 className="text-royal_blue text-xl md:text-2xl">
          Department for Levelling Up, Housing & Communities
        </h3>
        <p className="text-base md:text-lg text-text">
          Also called LUHC Prior to September 2021[1], this body was known as
          the Ministry of Housing, Communities and Local Government; and prior
          to January 2018 it was called t...
        </p>
        <p className="text-primary text-base md:text-lg">2247 requests</p>
      </div>
      <Link to={ROUTES.CREATE_REQUEST_ROUTE}>
        <Button className=" h-12">Make a request</Button>
      </Link>
    </div>
  );
};

export default SearchRequestCard;
