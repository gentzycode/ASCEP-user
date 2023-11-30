import { ArrowSquareLeft, ArrowSquareRight } from "@/Icons";
import { sidebarLinks } from "@/utils/NavigationData";
import { useNavigationContext } from "@/contexts/NavigationContext";
interface SideNavigationProps {}

const SideNavigation: React.FC<SideNavigationProps> = () => {
  const { openSidebar, toggleSidebar, activeModule, handleNavigation } =
    useNavigationContext();

  return (
    <div
      className={`bg-[#EBE5F0] h-screen relative hidden md:block duration-300 px-6 ${
        openSidebar ? "w-[285px]" : "w-[130px]"
      }`}
    >
      <button className="absolute -right-3 top-12 z-10" onClick={toggleSidebar}>
        {openSidebar ? <ArrowSquareLeft /> : <ArrowSquareRight />}
      </button>
      <div className="w-fit mx-auto flex justify-center flex-wrap my-8 items-center duration-700">
        <img src="/images/logopic.png" alt="logo" className="h-[70px] -mb-3 " />
        <h1 className="text-[18px] text-[#6B6B6B]">ASCEP</h1>
      </div>
      <div className="flex flex-col justify-center w-full items-center mt-[100px]">
        <ul className="flex flex-col justify-center gap-[25px]">
          {sidebarLinks.map((links: NavLinkType, index) => {
            return (
              <li
                key={index}
                className={`${
                  activeModule === links.title ? "bg-dark" : ""
                } px-3 py-4 rounded-3xl`}
              >
                <button
                  className={` ${
                    activeModule === links.title
                      ? "text-primary"
                      : "text-[#6B6B6B]"
                  }  flex items-center text-[18px]  font-[500] gap-[14px]`}
                  onClick={() => handleNavigation(links)}
                >
                  {links.Icon}
                  <span className={`${!openSidebar && "hidden"}`}>
                    {links.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideNavigation;
