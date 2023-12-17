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
import { useAppContext } from "@/contexts/AppContext";
import { IoClose } from "react-icons/io5";

interface SDGMultiSelectProps {
  selected: SDGData[];
  setSelected: React.Dispatch<React.SetStateAction<SDGData[]>>;
}

export default function SDGMultiSelect({
  selected,
  setSelected,
}: SDGMultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [renderedItems, setRenderedItems] = React.useState<SDGData[]>([]);

  const { sdgData, fetchingSdgs } = useAppContext();

  React.useEffect(() => {
    if (selected.length === 0) {
      setRenderedItems(sdgData);
    }
  }, [sdgData, selected]);

  const handleSelect = (sdgJson: string) => {
    const sdg = JSON.parse(sdgJson);

    setSelected([
      ...selected,
      renderedItems.filter((option) => option.id === sdg.id)[0],
    ]);
    setRenderedItems(
      renderedItems.filter((rendredItem) => rendredItem.id !== sdg.id)
    );
  };

  const handleRemove = (sdgJson: string) => {
    const sdg = JSON.parse(sdgJson);

    setRenderedItems([
      ...renderedItems,
      selected.filter((option) => option.id === sdg.id)[0],
    ]);
    setSelected(selected.filter((selectedItem) => selectedItem.id !== sdg.id));
  };

  return (
    <div className="relative w-full space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            className="bg-[#F5F5F5] text-base text-text focus-visible:ring-0 focus-visible:ring-primary border-none focus:border-none focus-visible:ring-offset-0 rounded-[20px] h-[50px] placeholder:text-base placeholder:text-subtle_text/30 placeholder:font-medium w-full hover:bg-[#f5f5f5] justify-between "
          >
            {fetchingSdgs ? "Fetching SDGs" : "Select SDG"}
            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 ">
          <Command>
            <CommandInput placeholder="Search SDGs..." />
            <CommandEmpty>No SDG found.</CommandEmpty>
            <CommandGroup>
              {renderedItems?.length > 0 &&
                renderedItems.map((renderedItem) => (
                  <CommandItem
                    key={renderedItem.id}
                    value={JSON.stringify(renderedItem)}
                    onSelect={(currentValue) => {
                      handleSelect(currentValue);
                      setOpen(false);
                    }}
                  >
                    {renderedItem.title}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex gap-2 ">
        {selected?.length > 0 &&
          selected.map((item) => (
            <SelectedSdg
              item={item}
              key={item.id}
              handleRemove={handleRemove}
            />
          ))}
      </div>
    </div>
  );
}

interface SelectedSdgProps {
  item: SDGData;
  handleRemove: (args: string) => void;
}

const SelectedSdg = ({ item, handleRemove }: SelectedSdgProps) => {
  const [showClose, setShowClose] = React.useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowClose(true)}
      onMouseLeave={() => setShowClose(false)}
    >
      <img className="rounded-lg w-14 h-14" src={item.banner} />
      <div className="absolute top-0 left-0 z-10 flex justify-end w-full h-full p-1 text-base transition-all duration-300 ease-in-out rounded-lg hover:bg-black/10 ">
        {showClose && (
          <IoClose
            className="cursor-pointer"
            onClick={() => handleRemove(JSON.stringify(item))}
          />
        )}
      </div>
    </div>
  );
};
