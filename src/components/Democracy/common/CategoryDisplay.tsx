import { Button } from "@/components/ui/button";

interface CategoryDisplayProps {
  category: string;
}

const CategoryDisplay: React.FC<CategoryDisplayProps> = ({ category }) => {
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
