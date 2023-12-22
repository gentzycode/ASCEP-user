import ROUTES from "@/utils/routesNames";
import { Link } from "react-router-dom";

interface SDGCardProps {
  SDG: {
    title: string;
    banner: string;
    id: number;
  };
}

const SDGCard: React.FC<SDGCardProps> = ({ SDG }) => {
  return (
    <Link to={ROUTES.SDGs_DETAILS_ROUTE} state={{ id: SDG.id }}>
      <div className="h-12 p-0 flex justify-start relative overflow-hidden rounded-lg">
        <img src={SDG.banner} alt={SDG.title} />
      </div>
    </Link>
  );
};

export default SDGCard;
