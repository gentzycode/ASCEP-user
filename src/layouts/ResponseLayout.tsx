import { CreateReportModal, ResponseFilters } from "@/components/Response";
import GroupedFiltersButton from "@/components/custom/GroupedFiltersButton";
import { Button } from "@/components/ui/button";
import useDisclosure from "@/hooks/useDisclosure";
import { useAuthContext } from "@/providers/AuthProvider";
import { Add } from "iconsax-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function ResponseLayout() {
  const [selectedPage, setSelectedPage] = useState("");
  const { isLoggedIn, logout } = useAuthContext();

  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setSelectedPage(
      responsePages?.filter((page) => page.path === location.pathname)[0]?.title
    );
  }, [location]);

  const handleOpen = () => {
    if (isLoggedIn) {
      onOpen();
    } else logout();
    // else
  };

  return (
    <div className="relative w-full min-h-[calc(100%-93px)] px-2 md:px-8 overflow-y-auto pt-4 md:pt-0 pb-12 ">
      <div className="flex items-center justify-between h-full mb-8 ">
        <h4>{selectedPage}</h4>

        <div className="flex gap-4">
          <Button
            className="hidden md:block"
            onClick={handleOpen}
            size="xs"
            variant="primary"
          >
            + Add new report
          </Button>
          <Button size="xs" variant="pill">
            Post history
          </Button>
          <GroupedFiltersButton variant="pill">
            <ResponseFilters />
          </GroupedFiltersButton>
        </div>
      </div>

      <Outlet />

      <div className="fixed md:hidden top-[85vh] z-50 right-4 flex justify-end  ml-auto">
        <Button onClick={onOpen} className="w-12 h-12 p-0">
          <Add size="18" color="black" />
        </Button>
      </div>

      <div className="fixed z-50 top-[92vh] md:top-[90vh] left-0 flex justify-center w-full md:w-[115vw] ml-auto">
        <div className="bg-white p-1 md:p-[6px] rounded-xl md:rounded-[20px] flex items-center gap-1 shadow-lg">
          {responsePages.map((page) => (
            <Link
              to={page.path}
              className={` px-4 md:px-8 py-2  ${
                page.path === location.pathname
                  ? "bg-primary text-dark rounded-lg text-sm md:text-base md:rounded-xl"
                  : ""
              }  `}
              key={page.title}
            >
              {page.title}
            </Link>
          ))}
        </div>
      </div>
      <CreateReportModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

const responsePages: NavLinkType[] = [
  {
    title: "Data View",
    path: "/response/data-view",
  },
  {
    title: "Activity",
    path: "/response/activity",
  },
  {
    title: "Map View",
    path: "/response/map-view",
  },
];
