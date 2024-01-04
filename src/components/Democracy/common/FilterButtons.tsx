import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";

interface FilterButtonsProps {
  filterButtonOptions: FilterButtonOptionsType[];
  filterByButton?: (value: string) => void;
  isFiltering?: boolean;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  filterButtonOptions,
  filterByButton,
  isFiltering,
}) => {
  return (
    <ToggleGroup
      type="single"
      defaultValue="newest"
      onValueChange={(value) => {
        if (value) {
          if (filterByButton) {
            filterByButton(value);
          }
        }
      }}
      className="gap-4 mb-2 w-full md:w-fit justify-start flex-wrap"
    >
      {filterButtonOptions.map((button) => (
        <ToggleGroupItem
          value={button.value}
          key={button.value}
          className="px-4 bg-[#fff] text-base-900 border-2 border-base-200 text-[14px] mx-0 !rounded-full [&[data-state='on']]:bg-base-900 [&[data-state='on']]:text-primary [&[data-state='on']]:border-0"
          disabled={isFiltering}
        >
          {button.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default FilterButtons;
