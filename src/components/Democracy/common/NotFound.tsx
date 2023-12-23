import { IconWrapper } from "@/components/custom";
import { Danger } from "iconsax-react";

interface NotFoundProp {
  message: string;
}
const NotFound: React.FC<NotFoundProp> = ({ message }) => {
  return (
    <div className="w-fit mx-auto border-2 border-primary rounded-md p-2 bg-[#F59E0B]/10 my-10">
      <div className="flex justify-center items-center gap-4 flex-wrap">
        <IconWrapper className="text-primary rounded-full">
          <Danger size="32" />
        </IconWrapper>
        <p className="text-base md:text-lg">{message}</p>
      </div>
    </div>
  );
};

export default NotFound;
