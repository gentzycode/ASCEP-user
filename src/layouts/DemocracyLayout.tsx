import { DemocracyNavigation } from "@/components/Democracy";
import { Button } from "@/components/ui/button";
import { ArrowLeft2 } from "iconsax-react";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { Outlet, useNavigate } from "react-router-dom";
interface DemocracyLayoutProps {}

const DemocracyLayout: React.FC<DemocracyLayoutProps> = () => {
  const { location } = useNavigationContext();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  const subpage = location.pathname.split("/")[3];

  return (
    <div className=" p-3 min-[600px]:p-6 md:p-8 :">
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
        <div className="w-full min-h-[70vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DemocracyLayout;
