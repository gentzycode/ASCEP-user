import { Checkbox } from "@/components/ui/checkbox";

interface DebateSDGsProps {
  SDGs: DebateSDGsType;
}

const DebateSDGs: React.FC<DebateSDGsProps> = ({ SDGs }) => {
  return (
    <div
      className="h-12 p-0 flex justify-start relative overflow-hidden rounded-lg"
      key={SDGs.sdgs_id}
    >
      <Checkbox
        className="border-dark absolute top-0 left-0 w-full h-full border-transparent
                opacity-60 checked:bg-primary appearance-none rounded-lg 
              "
      />
      <img src={SDGs.sdgs.banner} alt={SDGs.sdgs.title} />
    </div>
  );
};

export default DebateSDGs;
