import { CreateReportModal } from "@/components/Response";
import { Button } from "@/components/ui/button";
import useDisclosure from "@/hooks/useDisclosure";
import { FilterSquare } from "iconsax-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function ResponseLayout() {
  const [selectedPage, setSelectedPage] = useState("");
  const location = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setSelectedPage(
      responsePages?.filter((page) => page.path === location.pathname)[0]?.title
    );
  }, []);

  return (
    <div className="relative w-full h-[calc(100%-93px)] px-8 ">
      <div className="flex items-center justify-between mb-8 ">
        <h4>{selectedPage}</h4>

        <div className="flex gap-4">
          <Button onClick={onOpen} size="xs" variant="pill">
            Add new report
          </Button>
          <CreateReportModal isOpen={isOpen} onClose={onClose} />
          <Button size="xs" variant="pill">
            Post history
          </Button>
          <Button size="xs" variant="pill">
            <FilterSquare size={18} />
            Filter
          </Button>
        </div>
      </div>

      <Outlet />

      <div className="absolute left-0 flex justify-center w-full bottom-10">
        <div className="bg-white p-[6px] rounded-[20px] flex items-center gap-1 shadow-lg">
          {responsePages.map((page) => (
            <Link
              to={page.path}
              className={` px-8 py-2  ${
                page.path === location.pathname
                  ? "bg-primary text-dark rounded-xl"
                  : ""
              }  `}
              key={page.title}
            >
              {page.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const responsePages: NavLinkType[] = [
  {
    title: "Map View",
    path: "/response/map-view",
  },
  {
    title: "Data View",
    path: "/response/data-view",
  },
  {
    title: "Activity",
    path: "/response/activity",
  },
];
