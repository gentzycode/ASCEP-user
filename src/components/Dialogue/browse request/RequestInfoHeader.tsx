import { Button } from "@/components/ui/button";
import ROUTES from "@/utils/routesNames";
import { Link } from "react-router-dom";

interface RequestInfoHeaderProp {
  request: RequestType;
}
const RequestInfoHeader: React.FC<RequestInfoHeaderProp> = ({ request }) => {
  const {
    title,
    status,
    public_identifier,
    authority,
    author,
    id,
    authority_id,
  } = request;
  return (
    <div className="space-y-3">
      <Link to={ROUTES.REQUEST_INFO_ROUTE(id)}>
        <h3 className="text-xl lg:text-2xl text-dark">{title}</h3>
      </Link>
      <p className="text-base lg:text-lg text-text">
        Request to{" "}
        <Link to={ROUTES.AUTHORITY_INFO_ROUTE(authority_id)}>
          {" "}
          <span className="text-royal_blue">{authority.name}</span>
        </Link>{" "}
        by <span className="text-primary">{author.username}</span> 
        {/* . Annotated by <span className="text-primary">J Roberts </span> on 30 December 2023. */}
      </p>
      <footer className="flex gap-3">
        <Button className="h-fit w-fit text-green-500 bg-green-500/10 pointer-events-none">
          {status}
        </Button>
        <Button className="h-fit w-fit text-green-500 bg-green-500/10 pointer-events-none">
          {public_identifier}
        </Button>
      </footer>
    </div>
  );
};

export default RequestInfoHeader;
