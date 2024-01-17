/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import * as lodash from "lodash";
import {
  Control,
  DeepMap,
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

import { FormControl, FormField, FormItem, FormMessage } from "../../ui/form";
import { InputProps } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormSelectPublicIdentifierProps<
  TFormValues extends FieldValues = FieldValues
> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
} & Omit<InputProps, "name">;

const FormSelectPublicIdentifier = <
  TFormValues extends Record<string, unknown>
>({
  control,
  label,
  name,
  placeholder,
  errors,
  description,
  ...props
}: FormSelectPublicIdentifierProps<TFormValues>): JSX.Element => {
  const errorMessage = lodash.get(errors, name);
  const hasError = !!errors && errorMessage;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <h3 className="text-sm md:text-base text-text">{label}</h3>
          <Select
            onValueChange={field.onChange}
            // @ts-ignore
            defaultValue={field.value}
            {...props}
          >
            <FormControl>
              <SelectTrigger
                className={`focus-visible:ring-1 bg-[#C4C4C41F] ${
                  hasError
                    ? "focus-visible:ring-red-500 focus:ring-red-500"
                    : "focus-visible:ring-primary focus:ring-primary"
                } focus-visible:ring-offset-2 border-transparent ring-transparent text-text  focus:ring-1 h-12 rounded-full px-4 text-base`}
              >
                <SelectValue
                  placeholder="Select type"
                  className="text-text text-base"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Privacy</SelectLabel>
                <SelectItem value="private" className="text-text text-base">
                  Private
                </SelectItem>
                <SelectItem value="public" className="text-text text-base">
                  Public
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelectPublicIdentifier;
