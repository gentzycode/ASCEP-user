import { FaSpinner } from "react-icons/fa";

export default function FloatingLoader() {
  return (
    <div className="absolute left-0 z-10 flex items-center justify-center w-full h-screen -top-4 bg-black/10 ">
      <FaSpinner className="text-[40px] animate-spin text-primary" />
    </div>
  );
}
