import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";

interface FilterButtonsProps {
  filterButtonOptions: FilterButtonOptionsType[];
  filterByButton?: (value: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  filterButtonOptions,
  filterByButton,
}) => {
  return (
    <ToggleGroup
      type="single"
      defaultValue=""
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
          aria-label="Toggle bold"
          key={button.value}
          className="px-4 bg-[#fff] text-base-900 border-2 border-base-200 text-[14px] mx-0 !rounded-full [&[data-state='on']]:bg-base-900 [&[data-state='on']]:text-primary [&[data-state='on']]:border-0"
        >
          {button.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default FilterButtons;
