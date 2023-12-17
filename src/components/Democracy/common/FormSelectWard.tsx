/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore

import * as lodash from "lodash";
import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { InputProps } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppContext } from "@/contexts/AppContext";
import React from "react";

type FormSelectWardProps<TFormValues extends FieldValues = FieldValues> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
} & Omit<InputProps, "name">;

const FormSelectWard = <TFormValues extends Record<string, unknown>>({
  control,
  name,
}: FormSelectWardProps<TFormValues>): JSX.Element => {
  const { wards } = useAppContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1 relative">
          <FormLabel>Wards</FormLabel>
          <FormControl>
            <Select
              {...field}
              onValueChange={(value: number) => field.onChange(Number(value))}
              value={field.value && Number(field.value)}
            >
              <SelectTrigger className="rounded-full bg-transparent h-12 border-subtle_text text-[12px] text-subtle_text focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Select a ward" />
              </SelectTrigger>
              <SelectContent>
                {wards?.map((ward) => (
                  <SelectItem value={ward.id} key={ward.id}>
                    {ward.ward}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default React.memo(FormSelectWard);
