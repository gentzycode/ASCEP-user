/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import * as lodash from "lodash";
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
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { IconWrapper } from "@/components/custom";
import { TickSquare } from "iconsax-react";
import { useGetAllWards } from "@/api/locale";
import { ChevronsUpDownIcon } from "lucide-react";

type FormSelectWardProps<TFormValues extends FieldValues = FieldValues> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
  selectedWard?: number;
} & Omit<InputProps, "name">;

const FormSelectWard = <TFormValues extends Record<string, unknown>>({
  control,
  name,
  label,
  errors,
  selectedWard,
}: FormSelectWardProps<TFormValues>): JSX.Element => {
  const { data: wards, isLoading: isLoadingWards } = useGetAllWards();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>(
    wards?.find((ward) => ward.id === selectedWard)?.ward ?? ""
  );
  const errorMessage = lodash.get(errors, name);
  const hasError = !!errors && errorMessage;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <h3 className="text-sm md:text-base text-text">{label}</h3>
          <FormControl>
            {/* @ts-ignore */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  role="combobox"
                  aria-expanded={open}
                  className={`${
                    hasError
                      ? " border-red-500 border"
                      : "focus-visible:ring-primary"
                  }  w-full bg-[#C4C4C41F] ring-offset-2 hover:bg-[#C4C4C41F] justify-between text-text capitalize rounded-full`}
                >
                  {isLoadingWards
                    ? "Fetching Wards"
                    : value
                    ? value
                    : "Select Ward"}
                  <ChevronsUpDownIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent id="ward-popover" className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search ward..." className="h-9" />
                  <CommandEmpty>No Ward found.</CommandEmpty>
                  <CommandGroup className="h-[300px] overflow-y-scroll">
                    {wards?.map((ward) => (
                      <CommandItem
                        key={ward.id}
                        value={ward.ward}
                        onSelect={(currentValue) => {
                          setValue(
                            currentValue === value ? "" : String(currentValue)
                          );
                          setOpen(false);
                          field.onChange(
                            currentValue === value ? undefined : ward.id
                          );
                        }}
                        className="w-full text-dark text-[14px]"
                      >
                        {ward.ward}
                        <IconWrapper
                          className={cn(
                            "ml-auto h-4 w-4 text-primary",
                            value?.toLowerCase() === ward.ward.toLowerCase()
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        >
                          <TickSquare size="40" variant="Bold" />
                        </IconWrapper>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage className="text-xs md:text-sm" />
        </FormItem>
      )}
    />
  );
};

export default React.memo(FormSelectWard);
