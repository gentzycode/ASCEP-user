import { getPastDays } from "@/utils/helper";
import FilterDropdown from "../custom/FilterDropdown";
import { useAppContext } from "@/contexts/AppContext";
import { useEffect, useState } from "react";
import { useResponseContext } from "@/providers/ResponseProvider";
import { Button } from "../ui/button";

const dateRange: FilterOption[] = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Today",
    value: getPastDays(0),
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

export default function ResponseFilters() {
  const [categoryFilters, setCategoryFilters] = useState<FilterOption[]>([]);
  const [locationFilters, setLocationFilters] = useState<FilterOption[]>([]);

  const { categories, wards } = useAppContext();
  const { filterCategory, filterDate, filterLocation, clearFilter } =
    useResponseContext();

  useEffect(() => {
    if (categories) {
      const categoriesOptions: FilterOption[] = categories.map((category) => ({
        label: category.name,
        value: category.id,
      }));

      categoriesOptions.unshift({ label: "All", value: "" });
      setCategoryFilters(categoriesOptions);
    }

    if (wards) {
      const locationsOptions: FilterOption[] = wards.map((ward) => ({
        label: `${ward.ward}, ${ward.lga}`,
        value: `${ward.longitude}&latitude=${ward.latitude}`,
      }));
      locationsOptions.unshift({ label: "Everywhere", value: "" });
      setLocationFilters(locationsOptions);
    }
  }, [wards, categories]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white md:items-center md:flex-row ">
      {!!categoryFilters.length && (
        <FilterDropdown
          title={"Category"}
          options={categoryFilters}
          onSelect={(e) =>
            filterCategory(e.value === "" ? null : e.value.toString())
          }
        />
      )}
      {!!locationFilters.length && (
        <FilterDropdown
          title={"Locations"}
          options={locationFilters}
          onSelect={(e) =>
            filterLocation(e.value === "" ? null : e.value.toString())
          }
        />
      )}
      <FilterDropdown
        title={"Date Range"}
        options={dateRange}
        onSelect={(e) => filterDate(e.value === "" ? null : e.value.toString())}
      />

      <div className="flex flex-row gap-4 md:hidden">
        <Button
          className="w-full"
          variant="outline-primary"
          onClick={() => {
            clearFilter();
          }}
        >
          Clear all filters
        </Button>

        {/* <Button className="w-full">Submit</Button> */}
      </div>
    </div>
  );
}
