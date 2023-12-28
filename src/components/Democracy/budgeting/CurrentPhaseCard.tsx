import { IconWrapper } from "@/components/custom";
import { Button } from "@/components/ui/button";

interface CurrentPhaseCardProp {}
const CurrentPhaseCard: React.FC<CurrentPhaseCardProp> = () => {
  return (
    <Button className="bg-[#fff] rounded-3xl p-6 h-fit flex items-center gap-3 w-fit group">
      <IconWrapper className="p-7  bg-[#FFC334]/10 group-hover:bg-dark/20">
        <h1 className="text-2xl text-primary group-hover:text-text">1</h1>
      </IconWrapper>
      <h3 className="text-xl text-text">Information</h3>
    </Button>
  );
};

export default CurrentPhaseCard;
