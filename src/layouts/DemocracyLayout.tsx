import { DemocracyNavigation } from "@/components/Democracy";
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
    </div>
  );
};

export default DemocracyLayout;
