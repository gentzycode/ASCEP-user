import { MdError } from "react-icons/md";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function PageFetchError() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
      <MdError className="text-red-500 text-[70px] animate-pulse" />

      <p className="text-xl font-medium text-subtle_text">
        Sorry, there was an error fetching the resource
      </p>

      <div className="flex gap-2">
        <Button
          onClick={() => navigate(-1)}
          variant="outline-secondary"
          className="w-[140px]"
        >
          Go back
        </Button>

        <Button onClick={() => window.location.reload()} className="w-[140px]">
          Refresh
        </Button>
      </div>
    </div>
  );
}
