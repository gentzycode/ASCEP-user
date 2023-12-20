import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

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
import { IoClose } from "react-icons/io5";
import { useGetAllSDGs } from "@/api/democracy/debates";

interface TargetsMultiSelectProps {
  selected: SDGTarget[];
  setSelected: React.Dispatch<React.SetStateAction<SDGTarget[]>>;
}

export default function TargetsMultiSelect({
  selected,
  setSelected,
}: TargetsMultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [renderedItems, setRenderedItems] = React.useState<SDGTarget[]>([]);
  const { isLoading: fetchingSdgs, data: sdgData, isSuccess } = useGetAllSDGs();
  const [targets, setTargets] = React.useState<SDGTarget[]>([]);

  React.useEffect(() => {
    if (isSuccess) {
      let newTargets: SDGTarget[] = [];
      if (sdgData) {
        sdgData.forEach((sdg: SDGsType) => {
          newTargets.push(...sdg.sdgTarget);
        });
      }
      setTargets(newTargets);
    }
  }, [isSuccess, sdgData]);

  React.useEffect(() => {
    if (selected.length === 0 && !!targets) {
      setRenderedItems(targets);
    }
  }, [targets, selected]);

  const handleSelect = (collectionJson: string) => {
    const collection = JSON.parse(collectionJson);
    setSelected([
      ...selected,
      renderedItems.filter((option) => option.id === collection.id)[0],
    ]);
    setRenderedItems(
      renderedItems.filter((rendredItem) => rendredItem.id !== collection.id)
    );
  };

  const handleRemove = (collectionsJson: string) => {
    const collection = JSON.parse(collectionsJson);

    setRenderedItems([
      ...renderedItems,
      selected.filter((option) => option.id === collection.id)[0],
    ]);
    setSelected(
      selected.filter((selectedItem) => selectedItem.id !== collection.id)
    );
  };

  return (
    <div className="relative w-full space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            className="bg-[#C4C4C41F] hover:bg-[#C4C4C41F] rounded-full text-base text-text focus-visible:ring-0 focus-visible:ring-primary border-none focus:border-none focus-visible:ring-offset-0 h-[50px] placeholder:text-base placeholder:text-subtle_text/30 placeholder:font-medium w-full justify-between "
          >
            {fetchingSdgs ? "Fetching Targets" : "Select Targets"}
            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 ">
          <Command>
            <CommandInput placeholder="Search Targets..." />
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {renderedItems.map((renderedItem) => (
                <CommandItem
                  key={renderedItem.id}
                  value={JSON.stringify(renderedItem)}
                  onSelect={(currentValue) => {
                    handleSelect(String(currentValue));
                    setOpen(false);
                  }}
                >
                  {renderedItem.description}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2 ">
        {selected.map((item) => (
          <SelectedTargets
            item={item}
            key={item.id}
            handleRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
}

interface SelectedTargetsProps {
  item: SDGTarget;
  handleRemove: (args: string) => void;
}

const SelectedTargets = ({ item, handleRemove }: SelectedTargetsProps) => {
  return (
    <div className="top-0 left-0 z-10 flex h-full gap-1 p-1 px-2 text-xs text-white transition-all duration-300 ease-in-out rounded-lg bg-dark w-fit">
      {item.description}

      <IoClose
        className="text-base cursor-pointer"
        onClick={() => handleRemove(JSON.stringify(item))}
      />
    </div>
  );
};
