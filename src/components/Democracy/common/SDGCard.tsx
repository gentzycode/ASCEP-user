import ROUTES from "@/utils/routesNames";
import { Link } from "react-router-dom";

interface SDGCardProps {
  index: number;
  isCard?: boolean;
  SDG: {
    title: string;
    banner: string;
    id: number;
  };
}

const SDGCard: React.FC<SDGCardProps> = ({ SDG, index, isCard }) => {
  if (isCard && index > 3) {
    return;
  } else if (isCard && index === 3) {
    return (
      <div className="h-12 w-12 p-0 flex justify-center overflow-hidden rounded-lg bg-dark text-light items-center">
        <span>+3</span>
      </div>
    );
  }
  return (
    <Link to={ROUTES.SDGs_DETAILS_ROUTE} state={{ id: SDG.id }}>
      <div className="h-12 p-0 flex justify-start relative overflow-hidden rounded-lg">
        <img src={SDG.banner} alt={SDG.title} />
      </div>
    </Link>
  );
};

export default SDGCard;
