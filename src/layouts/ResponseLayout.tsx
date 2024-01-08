import { CreateReportModal } from "@/components/Response";
import GroupedFiltersButton from "@/components/custom/GroupedFiltersButton";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import useDisclosure from "@/hooks/useDisclosure";
import { getPastDays } from "@/utils/helper";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const dateRange: FilterOption[] = [
  {
    label: "Today",
    value: "",
  },
  {
    label: "Past One Week",
    value: getPastDays(7),
  },
  {
    label: "Past One Month",
    value: getPastDays(31),
  },
  {
    label: "Past One Year",
    value: getPastDays(366),
  },
];

export default function ResponseLayout() {
  const [selectedPage, setSelectedPage] = useState("");
  const [filters, setFilters] = useState<FilterShape[]>([]);

  const location = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { categories, wards } = useAppContext();

  useEffect(() => {
    let newFilters: FilterShape[] = [];
    if (categories) {
      const categoriesOptions: FilterOption[] = categories.map((category) => ({
        label: category.name,
        value: category.id,
      }));

      categoriesOptions.unshift({ label: "All", value: "" });
      const filteredFilters = filters.filter(
        (filter) => filter.title !== "Categories"
      );

      newFilters = [
        ...filteredFilters,
        { title: "Categories", options: categoriesOptions },
      ];
      setFilters(newFilters);
    }

    if (wards) {
      const locationsOptions: FilterOption[] = wards.map((ward) => ({
        label: ward.ward,
        value: `longitude=${ward.longitude}&latitude=${ward.latitude}`,
      }));
      locationsOptions.unshift({ label: "Everywhere", value: "" });

      const filteredFilters = newFilters.filter(
        (filter) => filter.title !== "Locations"
      );

      newFilters = [
        ...filteredFilters,
        { title: "Locations", options: locationsOptions },
      ];
      setFilters(newFilters);
    }

    const filteredFilters = newFilters.filter(
      (filter) => filter.title !== "Date Range"
    );

    setFilters([
      ...filteredFilters,
      { title: "Date Range", options: dateRange },
    ]);
  }, [categories, wards, dateRange]);

  useEffect(() => {
    setSelectedPage(
      responsePages?.filter((page) => page.path === location.pathname)[0]?.title
    );
  }, []);

  return (
    <div className="relative w-full min-h-[calc(100%-93px)] px-8 overflow-y-auto pb-12 ">
      <div className="flex items-center justify-between h-full mb-8 ">
        <h4>{selectedPage}</h4>

        <div className="flex gap-4">
          <Button onClick={onOpen} size="xs" variant="pill">
            Add new report
          </Button>
          <CreateReportModal isOpen={isOpen} onClose={onClose} />
          <Button size="xs" variant="pill">
            Post history
          </Button>
          {filters.length > 0 && (
            <GroupedFiltersButton variant="secondary" filters={filters} />
          )}
        </div>
      </div>

      <Outlet />

      <div className="fixed top-[80vh] left-0 flex justify-center w-[115vw] ml-auto">
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

// const

// const categories = [
//   "all",
//   "event",
//   "education",
//   "justice",
//   "violence",
//   "accident",
//   "build",
// ];

// const locations = ["Everywhere", "Abuja", "Lagos", "Kano", "Port-Harcout"];
