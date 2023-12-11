import { useAuthContext } from "@/providers/AuthProvider";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import ROUTES from "@/utils/routesNames";

interface HeroSectionProps {
  title: string;
  description: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description }) => {
  const { isLoggedIn } = useAuthContext();
  return (
    <>
      <h1 className="tracking-[1px]  text-left font-sans text-dark text-[30px] md:text-[60px] capitalize">
        {title}
      </h1>
      <p className="text-[24px] text-subtle_text my-6 max-w-[800px] text-justify ">
        {description}
      </p>
      {!isLoggedIn && (
        <div className="flex justify-start items-center gap-8 md:flex-row">
          <Button className="w-[175px]">Get started</Button>
          <Link to={ROUTES.SIGNIN_ROUTE}>
            <Button className="bg-transparent border-dark border-2 w-[175px]">
              Log in
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default HeroSection;
