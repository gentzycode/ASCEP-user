import { IconWrapper } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Danger } from "iconsax-react";

interface FetchingErrorProp {
  message: string;
  retryFunction?: () => void;
  refetching: boolean;
}
const FetchingError: React.FC<FetchingErrorProp> = ({
  message,
  retryFunction,
  refetching,
}) => {
  return (
    <div
      className={`${
        refetching && "pointer-events-none opacity-50"
      } w-fit mx-auto flex items-center flex-wrap justify-between border-2 border-primary rounded-md p-2 bg-[#F59E0B]/10 my-10`}
    >
      <div className="flex flex-wrap justify-center items-center gap-4">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <IconWrapper className="text-primary rounded-full">
            <Danger size="32" />
          </IconWrapper>
          <p className="text-sm md:text-base">{message}</p>
        </div>
        <Button
          className="h-8 w-14 text-dark p-0 px-4 py-1 text-base rounded-xl"
          onClick={retryFunction}
          isLoading={refetching}
        >
          Retry
        </Button>
      </div>
    </div>
  );
};

export default FetchingError;
