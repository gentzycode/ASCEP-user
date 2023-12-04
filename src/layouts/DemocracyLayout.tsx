import { DemocracyNavigation } from "@/components/Democracy";
import { FooterLinks } from "@/utils/NavigationData";
import { ReactNode } from "react";

interface DemocracyLayoutProps {
  children: ReactNode;
}

interface DemocracyLayoutProps {}
const DemocracyLayout: React.FC<DemocracyLayoutProps> = ({ children }) => {
  return (
    <div className=" ">
      <DemocracyNavigation />
      <div className="bg-light pt-[40px] pb-10 md:px-10 p-6">
        <div className="w-full">{children}</div>
      </div>
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
