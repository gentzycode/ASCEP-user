import { useAuthContext } from "@/providers/AuthProvider";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import ROUTES from "@/utils/routesNames";
import { useAppContext } from "@/contexts/AppContext";

interface HeroSectionProps {
  title: string;
  description: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description }) => {
  const { isLoggedIn } = useAuthContext();
  const { handleOpenModal } = useAppContext();
  return (
    <>
      <h1 className="tracking-[1px]  text-left font-sans text-text text-3xl md:text-6xl capitalize">
        {title}
      </h1>
      <p className="text-[24px] text-subtitle_text my-6 max-w-[1000px] text-justify ">
        {description}
      </p>
      {!isLoggedIn && (
        <div className="flex justify-start items-center gap-8 md:flex-row">
          <Link to={ROUTES.SIGNUP_ROUTE}>
            <Button className="w-[175px]">Sign Up</Button>
          </Link>
          <Button
            className="bg-transparent border-dark border-2 w-[175px]"
            onClick={handleOpenModal}
          >
            Log in
          </Button>
        </div>
      )}
    </>
  );
};

export default HeroSection;
