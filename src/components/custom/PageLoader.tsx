import { FaSpinner } from "react-icons/fa";

export default function PageLoader() {
  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <FaSpinner className="text-[40px] animate-spin text-primary" />
    </div>
  );
}
