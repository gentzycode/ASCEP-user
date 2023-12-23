import { Button } from "@/components/ui/button";

interface TagDisplayProps {
  tag: string;
}

const TagDisplay: React.FC<TagDisplayProps> = ({ tag }) => {
  return (
    <Button
      className="bg-light_grey px-3 py-1 h-fit w-fit hover:bg-light_grey text-sm font-normal disabled:opacity-100 rounded-lg"
      disabled
    >
      {tag}
    </Button>
  );
};

export default TagDisplay;
