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
import React, { useEffect, useState } from "react";
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
import { ChevronsUpDownIcon } from "lucide-react";
import { useGetAllInitiatives } from "@/api/democracy/initiatives";

type FormSelectInitiativesProps<TFormValues extends FieldValues = FieldValues> =
  {
    control?: Control<TFormValues>;
    name: Path<TFormValues>;
    label?: string;
    errors?:
      | Partial<DeepMap<TFormValues, FieldError>>
      | FieldErrors<TFormValues>;
    selectedInitiatives?: number;
  } & Omit<InputProps, "name">;

const FormSelectInitiatives = <TFormValues extends Record<string, unknown>>({
  control,
  name,
  label,
  errors,
}: FormSelectInitiativesProps<TFormValues>): JSX.Element => {
  const {
    data: initiatives,
    isLoading: isLoadingInitiatives,
    mutateAsync,
  } = useGetAllInitiatives();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const errorMessage = lodash.get(errors, name);
  const hasError = !!errors && errorMessage;

  useEffect(() => {
    mutateAsync({ page: 1, perPage: 5000, filter: { newest: true } });
  }, []);
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
                  }  w-full bg-[#C4C4C41F] whitespace-pre-wrap text-left ring-offset-2 hover:bg-[#C4C4C41F] justify-between text-text capitalize rounded-full`}
                >
                  {isLoadingInitiatives
                    ? "Fetching Initiatives"
                    : value
                    ? value
                    : "Select Initiative"}
                  <ChevronsUpDownIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent id="initiative-popover" className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search Initiative..." className="h-9" />
                  <CommandEmpty>No Initiatives found.</CommandEmpty>
                  <CommandGroup className="h-[300px] overflow-y-scroll">
                    {initiatives?.initiatives?.map((initiative) => (
                      <CommandItem
                        key={initiative.id}
                        value={initiative.title}
                        onSelect={(currentValue) => {
                          setValue(
                            currentValue === value ? "" : String(currentValue)
                          );
                          setOpen(false);
                          field.onChange(
                            currentValue === value
                              ? undefined
                              : initiative.title
                          );
                        }}
                        className="w-full text-dark text-[14px]"
                      >
                        {initiative.title}
                        <IconWrapper
                          className={cn(
                            "ml-auto h-4 w-4 text-primary",
                            value?.toLowerCase() ===
                              initiative.title.toLowerCase()
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

export default React.memo(FormSelectInitiatives);
