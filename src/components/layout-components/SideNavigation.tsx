import { sidebarLinks } from "@/utils/NavigationData";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { Link } from "react-router-dom";
import { ArrowSquareLeft, ArrowSquareRight } from "iconsax-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SideNavigationProps {}

const SideNavigation: React.FC<SideNavigationProps> = () => {
  const { openSidebar, toggleSidebar, activeModule } = useNavigationContext();
  return (
    <div
      className={`bg-[#EBE5F0] h-screen relative hidden md:block duration-300 px-4 ${
        openSidebar ? "w-[285px]" : "w-[100px]"
      }`}
    >
      <button
        className="absolute z-20 -right-3 top-12 text-primary "
        onClick={toggleSidebar}
      >
        {openSidebar ? (
          <ArrowSquareLeft size={30} />
        ) : (
          <ArrowSquareRight size={30} />
        )}
      </button>
      <Link
        to="/"
        className="flex flex-wrap items-center justify-center w-full mx-auto my-8 duration-700"
      >
        <img src="/images/logopic.png" alt="logo" className="h-[70px] -mb-3 " />
        <h1 className="text-[18px] text-[#6B6B6B]">ASCEP</h1>
      </Link>
      <div className="flex flex-col justify-start w-full items-start mt-[50px]">
        <div className="flex flex-col gap-[20px]">
          {sidebarLinks.map((links: NavLinkType, index) => {
            return (
              <Link
                key={index}
                className={`${
                  activeModule === links.module ? "bg-dark" : ""
                }  ${
                  !openSidebar
                    ? "w-[50px] h-[50px] pl-3 rounded-lg  justify-start"
                    : "px-3 py-4 rounded-3xl "
                } cursor-pointer inline-flex items-center duration-300`}
                to={links.path}
              >
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger
                      className={` ${
                        activeModule === links.module
                          ? "text-primary"
                          : "text-[#6B6B6B]"
                      } float-left mr-2 block `}
                    >
                      {links.Icon}
                    </TooltipTrigger>
                    {!openSidebar && (
                      <TooltipContent
                        side="right"
                        className="ml-2 border-none  bg-primary text-dark"
                      >
                        <p className="text-[14px] font-[500] capitalize">
                          {links.module}
                        </p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>

                <p
                  className={`lg:text-[18px] text-[14px]  font-[500] origin-left w-max 
                  ${!openSidebar && "scale-0"}  ${
                    activeModule === links.module
                      ? "text-primary"
                      : "text-[#6B6B6B]"
                  } duration-300 `}
                >
                  {links.title}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNavigation;
