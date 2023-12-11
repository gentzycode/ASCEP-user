import { DemocracyNavigation } from "@/components/Democracy";
import { Button } from "@/components/ui/button";
import { ArrowLeft2 } from "iconsax-react";
import { ReactNode } from "react";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useNavigate } from "react-router-dom";
interface DemocracyLayoutProps {
  children: ReactNode;
}

const DemocracyLayout: React.FC<DemocracyLayoutProps> = ({ children }) => {
  const { location } = useNavigationContext();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  const subpage = location.pathname.split("/")[3];
  // const page = location.pathname.split("/")[2];

  return (
    <div className=" p-6">
      <DemocracyNavigation />
      <div className="bg-light pt-[40px] pb-10 ">
        {subpage && (
          <Button
            className="text-[14px] capitalize gap-1 mb-7 bg-transparent w-fit  h-fit px-0 hover:bg-transparent text-dark"
            onClick={handleGoBack}
          >
            <ArrowLeft2 size="20" />
            Go Back
          </Button>
        )}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default DemocracyLayout;
