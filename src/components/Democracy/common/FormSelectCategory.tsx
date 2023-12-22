/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import * as lodash from "lodash";
import * as React from "react";
import {
  Control,
  FieldValues,
  Path,
  FieldError,
  DeepMap,
  FieldErrors,
} from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../../ui/form";
import { InputProps } from "../../ui/input";
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

type FormSelectCategoryProps<TFormValues extends FieldValues = FieldValues> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
  selected: CollectionData[];
  setSelected: React.Dispatch<React.SetStateAction<CollectionData[]>>;
} & Omit<InputProps, "name">;

const FormSelectCategory = <TFormValues extends Record<string, unknown>>({
  control,
  name,
  label,
  errors,
  selected,
  setSelected,
}: FormSelectCategoryProps<TFormValues>): JSX.Element => {
  const { data, isLoading } = useGetAllCategories();
  const [open, setOpen] = React.useState(false);
  const [renderedItems, setRenderedItems] = React.useState<CollectionData[]>(
    []
  );
  const errorMessage = lodash.get(errors, name);
  const hasError = !!errors && errorMessage;

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
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            <h3 className="text-sm md:text-base text-text">{label}</h3>
            <FormControl>
              {/* @ts-ignore */}
              <div className="relative w-full space-y-4">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      role="combobox"
                      aria-expanded={open}
                      // className="bg-[#C4C4C41F] hover:bg-[#C4C4C41F] rounded-full text-base text-text focus-visible:ring-0 focus-visible:ring-primary border-none focus:border-none focus-visible:ring-offset-0 h-[50px] placeholder:text-base placeholder:text-subtle_text/30 placeholder:font-medium w-full justify-between "
                      className={`${
                        hasError
                          ? " border-red-500 border"
                          : "focus-visible:ring-primary"
                      }  w-full bg-[#C4C4C41F] ring-offset-2 hover:bg-[#C4C4C41F] justify-between text-text capitalize rounded-full`}
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
                              handleSelect(String(currentValue));
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
              </div>
            </FormControl>
            <FormMessage className="text-xs md:text-sm" />
          </FormItem>
        )}
      />
      <div className="flex flex-wrap gap-2 pt-4">
        {selected.map((item) => (
          <SelectedCategories
            item={item}
            key={item.id}
            handleRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default FormSelectCategory;

interface SelectedCategoriesProps {
  item: CollectionData;
  handleRemove: (args: string) => void;
}

const SelectedCategories = ({
  item,
  handleRemove,
}: SelectedCategoriesProps) => {
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
