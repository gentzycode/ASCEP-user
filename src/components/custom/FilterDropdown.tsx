import { Button } from "@/components/ui/button";
import { ArrowDown2 } from "iconsax-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";

interface FilterDropdownProps {
  options: FilterOption[];
  title: string;
}

export default function FilterDropdown({
  options,
  title,
}: FilterDropdownProps) {
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);

  const handleSelect = (selectedJson: string) => {
    const selected = JSON.parse(selectedJson);
    setSelected(selected);
  };

  return (
    <div className="flex gap-3">
      <p className="text-lg text-subtitle_text">{title}</p>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="gap-4 capitalize rounded-full h-7 ">
            <p className="text-xs font-semibold text-dark">{selected.label}</p>

            <ArrowDown2 size="18" color="#292925" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="p-0 max-w-[230px]">
          <Command>
            <CommandInput placeholder="Search Categories..." />
            <CommandEmpty>None found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={JSON.stringify(option)}
                  onSelect={(currentValue) => {
                    handleSelect(currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
