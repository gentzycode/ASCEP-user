import { ArrowCircleRight2 } from "iconsax-react";
import { Link } from "react-router-dom";

interface ListViewCardsProps {
  title: string;
  route: string;
}
const ListViewCard: React.FC<ListViewCardsProps> = ({ title, route }) => {
  return (
    <div className="col-span-1">
      <div className="bg-[#F9F6FB] hover:bg-transparent w-full h-fit text-[16px] text-dark  md:text-[24px] p-[24px] flex justify-between gap-4  items-center shadow-xl rounded-lg">
        <span className="whitespace-pre-wrap text-left flex-auto">{title}</span>
        <Link to={route}>
          <ArrowCircleRight2 size="25" />
        </Link>
      </div>
    </div>
  );
};

export default ListViewCard;
