import { IconWrapper } from "@/components/custom";
import { Button } from "@/components/ui/button";
import ROUTES from "@/utils/routesNames";
import { Moneys } from "iconsax-react";
import { Link } from "react-router-dom";

interface WardProjectCardProp {}
const WardProjectCard: React.FC<WardProjectCardProp> = () => {
  return (
    <Link to={ROUTES.WARD_PROJECTS_HOME_ROUTE("1")}>
      <Button className="bg-dark rounded-3xl p-6 h-28 flex items-center gap-3 w-fit group">
        <IconWrapper className="p-4 w-fit h-fit bg-[#FFC334]/10 text-primary group-hover:text-dark group-hover:bg-dark/20">
          <Moneys size="25" />
        </IconWrapper>
        <div>
          <h3 className="text-lg text-light group-hover:text-text">Awka</h3>
          <h3 className="text-base text-[#F9F6FB] font-normal group-hover:text-text">
            ₦60, 000
          </h3>
        </div>
      </Button>
    </Link>
  );
};

export default WardProjectCard;
