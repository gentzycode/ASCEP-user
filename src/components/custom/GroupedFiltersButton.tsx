import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiFilterAlt } from "react-icons/bi";
import FilterDropdown from "./FilterDropdown";

interface GroupedFiltersButtonProps {
  variant?: "primary" | "secondary";
  filters: FilterShape[];
}
export default function GroupedFiltersButton({
  variant,
  filters,
}: GroupedFiltersButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant || "primary"} className="rounded-[10px] h-7 ">
          <span className="sr-only">Open menu</span>
          <BiFilterAlt size={16} />
          <p className="text-xs font-semibold">Filter</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="px-2 font-normal text-subtle_text rounded-[26px] "
        align="end"
      >
        <div className="flex items-center gap-4 p-4 bg-white ">
          {filters.map((filter) => (
            <FilterDropdown
              key={filter.title}
              title={filter.title}
              options={filter.options}
            />
          ))}

          {/* <FilterDropdown title="Date range" options={dateRanges} />
          <FilterDropdown title="Locations" options={locations} /> */}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
