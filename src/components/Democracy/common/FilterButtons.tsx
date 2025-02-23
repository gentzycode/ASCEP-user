import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
interface FilterButtonsProps {
  filterButtonOptions: FilterButtonOptionsType[];
  filterByButton?: (value: string) => void;
  isFiltering?: boolean;
  defaultFilterButtonValue: string;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  filterButtonOptions,
  filterByButton,
  isFiltering,
  defaultFilterButtonValue,
}) => {
  return (
    <RadioGroup
      defaultValue={defaultFilterButtonValue}
      onValueChange={(value) => {
        if (filterByButton) {
          filterByButton(value);
        }
      }}
      className="flex flex-wrap"
    >
      {filterButtonOptions.map((button, i) => (
        <Button
          className="relative bg-[#fff] text-base-900 border-2 border-base-200 text-sm  has-[span]:bg-dark has-[span]:text-primary has-[span]:hover:bg-dark rounded-full h-11 min-w-20"
          disabled={isFiltering}
          key={i}
        >
          <RadioGroupItem
            value={button.value}

            className="absolute w-full h-full top-0 left-0 opacity-0"
          />
          {button.label}
        </Button>
      ))}
    </RadioGroup>
  );
};

export default FilterButtons;
