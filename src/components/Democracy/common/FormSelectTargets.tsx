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
  setTarget: React.Dispatch<React.SetStateAction<SDGTarget | undefined>>;
}

const FormComboboxTarget: React.FC<FormComboboxTargetProps> = ({
  setTarget,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>();
  const { targets } = useAppContext();
  console.log(targets);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-full bg-[#C4C4C41F] hover:bg-[#C4C4C41F]  justify-between text-text rounded-full"
        >
          {value
            ? targets.find(
                (target) =>
                  target.description.toLowerCase() == value?.toLowerCase()
              )?.description
            : "Select target..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search target..." className="h-9" />
          <CommandEmpty>No target found.</CommandEmpty>
          <CommandGroup>
            {targets.map((target) => (
              <CommandItem
                key={target.id}
                value={target.id}
                onSelect={(currentValue) => {
                  setOpen(false);
                  setTarget(target);
                  setValue(currentValue === value ? "" : String(currentValue));
                }}
                className="w-full text-dark text-[14px]"
              >
                {target.description}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value?.toLowerCase() === target.description.toLowerCase()
                      ? "opacity-100"
                      : "opacity-0"
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
