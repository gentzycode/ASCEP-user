import { ArrowCircleRight2 } from "iconsax-react";
import { Link } from "react-router-dom";
import ROUTES from "@/utils/routesNames";

interface ListViewCardsProps {
  debate: DebateType;
}
const ListViewCard: React.FC<ListViewCardsProps> = ({ debate }) => {
  return (
    <div className="col-span-1">
      <div className="bg-[#F9F6FB] hover:bg-transparent w-full h-fit text-[16px] text-dark  md:text-[24px] p-[24px] flex justify-between gap-4  items-center shadow-xl rounded-lg">
        <span className="whitespace-pre-wrap text-left flex-auto">
          {debate.title}
        </span>
        <Link to={ROUTES.DEBATE_INFO_ROUTE(debate.id)}>
          <ArrowCircleRight2 size="25" />
        </Link>
      </div>
    </div>
  );
};

export default ListViewCard;
