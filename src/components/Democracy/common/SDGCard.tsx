import { Checkbox } from "@/components/ui/checkbox";

interface SDGCardProps {
  SDGs: {
    title: string;
    banner: string;
    id: number;
  };
}

const SDGCard: React.FC<SDGCardProps> = ({ SDGs }) => {
  return (
    <div
      className="h-12 p-0 flex justify-start relative overflow-hidden rounded-lg"
      key={SDGs.id}
    >
      <Checkbox
        className="border-dark absolute top-0 left-0 w-full h-full border-transparent
                opacity-60 checked:bg-primary appearance-none rounded-lg 
              "
      />
      <img src={SDGs.banner} alt={SDGs.title} />
    </div>
  );
};

export default SDGCard;
