import { IconWrapper } from "@/components/custom";
import { Button } from "@/components/ui/button";

interface CurrentPhaseCardProp {
  phase: string;
  index: number;
  active: boolean;
}
const CurrentPhaseCard: React.FC<CurrentPhaseCardProp> = ({
  phase,
  index,
  active,
}) => {
  console.log(active, phase);

  return (
    <Button
      className={`${
        active ? "bg-primary" : "bg-[#fff]"
      } rounded-3xl p-6 h-fit flex items-center gap-3 w-full group`}
    >
      <IconWrapper
        className={`p-7  ${active && "bg-dark/20 group-hover:bg-dark/20"}`}
      >
        <h1
          className={`text-2xl group-hover:text-text ${
            active ? "text-text" : "text-primary"
          }`}
        >
          {index + 1}
        </h1>
      </IconWrapper>
      <h3 className="text-xl text-text">{phase}</h3>
    </Button>
  );
};

export default CurrentPhaseCard;
