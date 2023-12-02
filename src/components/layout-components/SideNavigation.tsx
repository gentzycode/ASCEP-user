import { ArrowSquareLeft, ArrowSquareRight } from "@/Icons";
import { sidebarLinks } from "@/utils/NavigationData";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { Link } from "react-router-dom";
interface SideNavigationProps {}

const SideNavigation: React.FC<SideNavigationProps> = () => {
  const { openSidebar, toggleSidebar, activeModule } =
    useNavigationContext();
  return (
    <div
      className={`bg-[#EBE5F0] h-screen relative hidden md:block duration-300 px-4 ${
        openSidebar ? "w-[285px]" : "w-[100px]"
      }`}
    >
      <button className="absolute -right-3 top-12 z-20" onClick={toggleSidebar}>
        {openSidebar ? <ArrowSquareLeft /> : <ArrowSquareRight />}
      </button>
      <div className="w-full mx-auto flex justify-center flex-wrap my-8 items-center duration-700">
        <img src="/images/logopic.png" alt="logo" className="h-[70px] -mb-3 " />
        <h1 className="text-[18px] text-[#6B6B6B]">ASCEP</h1>
      </div>
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
                    ? "w-[50px] h-[50px] pl-2 rounded-lg  justify-start"
                    : "px-3 py-4 rounded-3xl "
                } cursor-pointer inline-flex items-center duration-300`}
                to={links.path}
              >
                <button
                  className={` ${
                    activeModule === links.module
                      ? "text-primary"
                      : "text-[#6B6B6B]"
                  } float-left mr-2 block `}
                >
                  {links.Icon}
                </button>
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
