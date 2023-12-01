import { DemocracyLinks, FooterLinks } from "@/utils/NavigationData";
import { ReactNode } from "react";
import { useNavigationContext } from "@/contexts/NavigationContext";
interface DemocracyLayoutProps {
  children: ReactNode;
}
interface DemocracyLayoutProps {}
const DemocracyLayout: React.FC<DemocracyLayoutProps> = ({ children }) => {
  const { activeLink, handleActiveLink } = useNavigationContext();
  return (
    <div className="md:flex-auto md:h-screen md:overflow-y-scroll ">
      <header className="hidden md:block sticky top-0 z-10">
        <h1 className="bg-primary w-full text-[48px] py-4 pl-4 font-barlow sticky top-0">
          ASCEP Democracy
        </h1>
        <ul className="inline-flex justify-start gap-[33px] bg-[#fff] h-[70px] px-8 w-full">
          {DemocracyLinks.map((link: NavLinkType, index) => {
            return (
              <li
                key={index}
                className={`${
                  activeLink === link.title
                    ? "border-b-4 border-primary"
                    : "text-[#6B6B6B]"
                }  py-[16px]`}
              >
                <button
                  className={`inline-flex text-[18px] duration-300 font-[500] gap-[14px] pb-2`}
                  onClick={() => handleActiveLink(link)}
                >
                  {link.title}
                </button>
              </li>
            );
          })}
        </ul>
      </header>
      <div className="bg-light pt-[40px] pb-10 md:px-10 p-6">{children}</div>
      <div className="bg-dark">
        <h1>ASCEP</h1>
        <div>
          {FooterLinks.map((link) => (
            <a href={link.path}>{link.title}</a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemocracyLayout;
