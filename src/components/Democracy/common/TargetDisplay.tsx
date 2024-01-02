import { Button } from "@/components/ui/button";

interface TargetDisplayProps {
  index: number;
  isCard?: boolean;
  target: {
    code: string;
    id: number;
  };
}
const colors = ["#EF4444", "#DDA63A", "#4C9F38", "#A21942"];

const TargetDisplay: React.FC<TargetDisplayProps> = ({
  target,
  index,
  isCard,
}) => {
  const bgColor = colors[index % colors.length];
  if (isCard && index > 3) {
    return;
  } else if (isCard && index === 3) {
    return (
      <Button
        className="text-light px-3 py-1 h-fit w-fit  text-sm font-normal disabled:opacity-100 rounded-lg"
        disabled
        style={{ backgroundColor: bgColor, opacity: 50 }}
      >
        +3
      </Button>
    );
  }
  return (
    <Button
      className="text-light px-3 py-1 h-fit w-fit  text-sm font-normal disabled:opacity-100 rounded-lg"
      disabled
      style={{ backgroundColor: bgColor }}
    >
      Target {target.code}
    </Button>
  );
};

export default TargetDisplay;
