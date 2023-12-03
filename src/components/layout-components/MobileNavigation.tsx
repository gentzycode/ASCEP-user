import { useNavigationContext } from "@/contexts/NavigationContext";
import {
  DemocracyLinks,
  FooterLinks,
  sidebarLinks,
} from "@/utils/NavigationData";
import { Link } from "react-router-dom";
import { HambergerMenu, CloseCircle } from "iconsax-react";
const MobileNavigation = () => {
  const { openMobileNav, toggleMobileNav, activeLink, activeModule } =
    useNavigationContext();

  return (
    <nav className="md:hidden py-8 px-2 bg-light_grey sticky top-0 z-10">
      <div className="flex justify-between items-center max-w-[700px] mx-auto w-[95%]">
        <button className="cursor-pointer" onClick={toggleMobileNav}>
          <HambergerMenu />
        </button>
        <img src="/images/logo.png" alt="logo" className="h-[70px] -mb-6" />
      </div>
      <div
        className={` ${
          openMobileNav ? "w-screen" : "w-0 overflow-hidden"
        } duration-300 fixed top-0 left-0 h-screen z-20 bg-light_grey  overflow-y-scroll`}
        onClick={toggleMobileNav}
      >
        <button
          className={`${
            !openMobileNav && "hidden"
          } fixed right-[25px] top-[40px]  duration-1000`}
          onClick={toggleMobileNav}
        >
          <CloseCircle />
        </button>

        {/* Democracy links */}
        {activeModule === "democracy" && (
          <>
            <div className="flex flex-col mt-[60px]  pb-20 px-6">
              <div className="flex flex-col justify-start gap-[25px]">
                {DemocracyLinks.map((link: NavLinkType, index) => {
                  return (
                    <Link
                      key={index}
                      className={`${
                        activeLink === link.path
                          ? "border-b-4 border-primary"
                          : "text-[#6B6B6B]"
                      } w-fit`}
                      to={link.path}
                    >
                      <button className="inline-flex text-[18px] duration-300 font-[500] gap-[14px] pb-2">
                        {link.title}
                      </button>
                    </Link>
                  );
                })}
              </div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="300"
              height="5"
              viewBox="0 0 193 2"
              fill="none"
              className="mx-auto"
            >
              <path
                d="M1 1H192"
                stroke="url(#paint0_radial_300_2198)"
                strokeLinecap="round"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_300_2198"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(96.5 1.5) rotate(90) scale(0.5 95.5)"
                >
                  <stop stopColor="#6B6B6B" />
                  <stop offset="1" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </>
        )}

        {/* Module  links */}
        <div className="flex flex-col mt-[50px] pb-20 px-6">
          <div className="flex flex-col justify-center gap-[25px]">
            {sidebarLinks.map((link: NavLinkType, index) => {
              return (
                <Link
                  key={index}
                  className={`${
                    activeModule === link.module ? "bg-dark" : ""
                  } px-3 py-4 rounded-3xl`}
                  to={link.path}
                >
                  <button
                    className={` ${
                      activeModule === link.module
                        ? "text-primary"
                        : "text-[#6B6B6B]"
                    }  flex items-center text-[18px] duration-300 font-[500] gap-[14px]`}
                  >
                    {link.Icon}
                    <span>{link.title}</span>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="300"
          height="5"
          viewBox="0 0 193 2"
          fill="none"
          className="mx-auto"
        >
          <path
            d="M1 1H192"
            stroke="url(#paint0_radial_300_2198)"
            strokeLinecap="round"
          />
          <defs>
            <radialGradient
              id="paint0_radial_300_2198"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(96.5 1.5) rotate(90) scale(0.5 95.5)"
            >
              <stop stopColor="#6B6B6B" />
              <stop offset="1" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* footer links */}
        <div className="flex flex-col mt-[40px] pb-10 px-6">
          <ul className="flex flex-col gap-[25px]">
            {FooterLinks.map((links: NavLinkType, index) => {
              return (
                <li key={index}>
                  <a
                    href={links.path}
                    className="inline-flex text-[18px] duration-300 font-[500] text-[#6B6B6B]  gap-[14px]"
                  >
                    {links.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavigation;
