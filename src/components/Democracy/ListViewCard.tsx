import { ArrowCircleRight2 } from "iconsax-react";
import { Button } from "../ui/button";

interface ListViewCardsProps {
  title: string;
}
const ListViewCard: React.FC<ListViewCardsProps> = ({ title }) => {
  return (
    <div className="col-span-1">
      <Button className="bg-[#F9F6FB] hover:bg-transparent w-full h-fit text-[16px] text-dark  md:text-[24px] p-[24px] flex justify-between gap-4  items-center shadow-xl">
        <span className="whitespace-pre-wrap text-left flex-auto">{title}</span>
        <ArrowCircleRight2 size="25" />
      </Button>
    </div>
  );
};

export default ListViewCard;
