import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useState } from "react";

interface FormComboboxTargetProps {
  setCategory: React.Dispatch<React.SetStateAction<CategoryType | undefined>>;
}

const FormComboboxTarget: React.FC<FormComboboxTargetProps> = ({
  setCategory,
}) => {
  const [open, setOpen] = useState(false);
  const [value] = useState<number | string>();
  const { categories } = useAppContext();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-full bg-[#C4C4C41F] hover:bg-[#C4C4C41F]  justify-between text-dark rounded-full"
        >
          {value
            ? categories.find((category) => category.id === value)?.name
            : "Select categories..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search categories..." className="h-9" />
          <CommandEmpty>No Category found.</CommandEmpty>
          <CommandGroup>
            {categories.map((category) => (
              <CommandItem
                key={category.id}
                value={category.id}
                onSelect={() => {
                  setOpen(false);
                  setCategory(category);
                }}
                className="w-full text-dark text-[14px]"
              >
                {category.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === category.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FormComboboxTarget;
