import { FaFolderOpen } from "react-icons/fa6";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <FaFolderOpen className="text-5xl text-primary" />
      <p className="text-lg text-dark">No Record Found</p>
    </div>
  );
};

export default EmptyState;
