import { Button } from "../../ui/button";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";

interface FilterButtonsProps {
  filterOptions: string[];
  filterOption: string;
  setFilterOption: React.Dispatch<React.SetStateAction<string>>;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  filterOptions,
  filterOption,
  setFilterOption,
}) => {
  return (
    <ToggleGroup
      type="single"
      defaultValue={filterOption}
      onValueChange={(value) => {
        if (value) setFilterOption(value);
      }}
      className="gap-4 mb-2 w-full md:w-fit justify-start flex-wrap"
    >
      {filterOptions.map((option, index) => (
        <ToggleGroupItem
          value={option}
          aria-label="Toggle bold"
          key={index}
          className="p-0"
        >
          <Button
            className={`${
              filterOption === option
                ? "text-primary bg-base-900 hover:bg-dark"
                : "bg-[#fff] text-base-900 border-2 border-base-200 "
            }  h-fit text-[14px] mx-0 `}
          >
            {option}
          </Button>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default FilterButtons;
