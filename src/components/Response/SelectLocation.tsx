import { Gps } from "iconsax-react";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { useAppContext } from "@/contexts/AppContext";
import { PageLoader } from "../custom";
import { Input } from "../ui/input";

interface SelectLocationProps {
  onSelect?: (arg: WardsType) => void;
}

export default function SelectLocation({ onSelect }: SelectLocationProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<WardsType | null>(null);

  const handleSelect = (selectedJson: string) => {
    const selected = JSON.parse(selectedJson);
    setSelected(selected);
  };

  const { wards, fetchingWards } = useAppContext();

  useEffect(() => {
    if (onSelect && selected) onSelect(selected);
  }, [selected]);

  return (
    <div className="flex justify-between gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Input
              className="bg-[#F5F5F5] capitalize w-full text-base text-text focus-visible:ring-0 focus-visible:ring-primary border-none focus:border-none focus-visible:ring-offset-0 rounded-[20px] h-11 sm:h-[50px] placeholder:text-base placeholder:text-subtle_text/30 placeholder:font-medium"
              value={
                selected
                  ? `${selected?.ward} ${selected?.lga}`
                  : "Select Location"
              }
            />
            <div className="absolute rounded-r-[20px] bg-[#f5f5f5] top-0 flex items-center h-full pr-4 pl-1 right-0 ">
              <Gps size={24} color="#000" />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent align="end" className="p-0 max-w-[270px] ">
          {fetchingWards ? (
            <PageLoader />
          ) : (
            <Command>
              <CommandInput placeholder="Search Categories..." />
              <CommandEmpty>None found.</CommandEmpty>
              <CommandGroup className="h-full overflow-y-auto max-h-80">
                {wards.map((ward) => (
                  <CommandItem
                    key={ward.id}
                    value={JSON.stringify(ward)}
                    onSelect={(currentValue) => {
                      handleSelect(currentValue);
                      setOpen(false);
                    }}
                    className="line-clamp-1"
                  >
                    {ward.ward}, {ward.lga}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
