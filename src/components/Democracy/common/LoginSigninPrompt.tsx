import IconWrapper from "@/components/custom/IconWrapper 2";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import ROUTES from "@/utils/routesNames";
import { CloseCircle, Danger } from "iconsax-react";
import { Link } from "react-router-dom";

const LoginSigninPrompt = () => {
  const { handleOpenModal } = useAppContext();
  return (
    <div className="flex items-center justify-between border-2 border-primary rounded-md p-2 bg-[#F59E0B]/10">
      <div className="flex justify-start items-center gap-1">
        <IconWrapper className="text-primary rounded-full">
          <Danger size="32" />
        </IconWrapper>
        <p className="text-[16px]">
          You must{" "}
          <span className="underline cursor-pointer" onClick={handleOpenModal}>
            sign in
          </span>{" "}
          or{" "}
          <Link to={ROUTES.SIGNUP_ROUTE} className="underline">
            sign up
          </Link>{" "}
          to leave a comment.
        </p>
      </div>
      {/* <Button className="bg-transparent hover:bg-transparent w-fit h-fit">
        <CloseCircle size="32" />
      </Button> */}
    </div>
  );
};

export default LoginSigninPrompt;
