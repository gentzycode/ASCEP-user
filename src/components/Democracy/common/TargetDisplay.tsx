import { Button } from "@/components/ui/button";

interface TargetDisplayProps {
  target: TargetType;
}

const TargetDisplay: React.FC<TargetDisplayProps> = ({ target }) => {
  return (
    <Button
      className="bg-light_grey px-3 py-1 h-fit w-fit hover:bg-light_grey text-sm font-normal disabled:opacity-100 rounded-lg"
      disabled
    >
      Target {target.targetInfo.code}
    </Button>
  );
};

export default TargetDisplay;
