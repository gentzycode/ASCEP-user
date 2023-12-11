import { useNavigationContext } from "@/contexts/NavigationContext";
import { DemocracyLinks } from "@/utils/NavigationData";
import { Link } from "react-router-dom";

const DemocracyNavigation = () => {
  const { activeLink } = useNavigationContext();

  return (
    <div className="hidden md:inline-flex justify-start gap-[5px] bg-[#fff]  w-max rounded-2xl">
      {DemocracyLinks.map((link: NavLinkType, index) => {
        return (
          <Link
            key={index}
            className={`${
              activeLink === link.path
                ? " bg-primary"
                : "text-[#6B6B6B]"
            } flex h-fit items-center rounded-2xl`}
            to={link.path}
          >
            <button className="inline-flex text-[14px] xl:text-[18px] duration-300 font-[500] gap-[14px] h-fit my-auto px-4 py-3 ">
              {link.title}
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default DemocracyNavigation;
