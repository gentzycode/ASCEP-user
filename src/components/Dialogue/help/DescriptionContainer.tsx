import { Introduction } from "..";

interface DescriptionContainerProp {}
const DescriptionContainer: React.FC<DescriptionContainerProp> = () => {
  return (
    <div className="flex-1">
      <Introduction />
    </div>
  );
};

export default DescriptionContainer;
