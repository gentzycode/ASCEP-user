import { Button } from "@/components/ui/button";

interface CategoryDisplayProps {
  category: string;
  isCard?: boolean;
  index: number;
}

const CategoryDisplay: React.FC<CategoryDisplayProps> = ({
  category,
  isCard,
  index,
}) => {
  if (isCard && index > 3) {
    return;
  } else if (isCard && index === 3) {
    return (
      <Button
        className="bg-dark text-light px-3 py-1 h-fit w-fit hover:bg-light_grey text-sm font-normal disabled:opacity-100 rounded-lg"
        disabled
      >
        +3
      </Button>
    );
  }
  return (
    <Button
      className="bg-light_grey px-3 py-1 h-fit w-fit hover:bg-light_grey text-sm font-normal disabled:opacity-100 rounded-lg"
      disabled
    >
      {category}
    </Button>
  );
};

export default CategoryDisplay;
