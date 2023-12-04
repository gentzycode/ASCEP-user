import { useNavigationContext } from "@/contexts/NavigationContext";
import { DemocracyLinks } from "@/utils/NavigationData";
import { Link } from "react-router-dom";

const DemocracyNavigation = () => {
  const { activeLink } = useNavigationContext();

  return (
    <div className="hidden md:inline-flex justify-start gap-[33px] bg-[#fff] h-[70px] px-8 w-full">
      {DemocracyLinks.map((link: NavLinkType, index) => {
        return (
          <Link
            key={index}
            className={`${
              activeLink === link.path
                ? "border-b-4 border-primary"
                : "text-[#6B6B6B]"
            }  py-[16px]`}
            to={link.path}
          >
            <button className="inline-flex text-[18px] duration-300 font-[500] gap-[14px] pb-2">
              {link.title}
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default DemocracyNavigation;
