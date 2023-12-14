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
import { useGetAllCategories } from "@/api/category";

interface CategoriesMultiSelectProps {
  selected: CollectionData[];
  setSelected: React.Dispatch<React.SetStateAction<CollectionData[]>>;
}

export default function CategoriesMultiSelect({
  selected,
  setSelected,
}: CategoriesMultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [renderedItems, setRenderedItems] = React.useState<CollectionData[]>(
    []
  );

  const { data, isLoading } = useGetAllCategories();
  React.useEffect(() => {
    if (selected.length === 0 && !!data) {
      setRenderedItems(data);
    }
  }, [data, selected]);

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
            className="bg-[#F5F5F5] text-base text-text focus-visible:ring-0 focus-visible:ring-primary border-none focus:border-none focus-visible:ring-offset-0 rounded-[20px] h-[50px] placeholder:text-base placeholder:text-subtle_text/30 placeholder:font-medium w-full hover:bg-[#f5f5f5] justify-between "
          >
            {isLoading ? "Fetching Categories" : "Select Categories"}
            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 ">
          <Command>
            <CommandInput placeholder="Search Categories..." />
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {renderedItems.map((renderedItem) => (
                <CommandItem
                  key={renderedItem.id}
                  value={JSON.stringify(renderedItem)}
                  onSelect={(currentValue) => {
                    handleSelect(currentValue);
                    setOpen(false);
                  }}
                >
                  {renderedItem.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2 ">
        {selected.map((item) => (
          <SelectedSdg item={item} key={item.id} handleRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
}

interface SelectedSdgProps {
  item: CollectionData;
  handleRemove: (args: string) => void;
}

const SelectedSdg = ({ item, handleRemove }: SelectedSdgProps) => {
  return (
    <div className="top-0 left-0 z-10 flex h-full gap-1 p-1 px-2 text-xs text-white transition-all duration-300 ease-in-out rounded-lg bg-dark w-fit">
      {item.name}

      <IoClose
        className="text-base cursor-pointer"
        onClick={() => handleRemove(JSON.stringify(item))}
      />
    </div>
  );
};
