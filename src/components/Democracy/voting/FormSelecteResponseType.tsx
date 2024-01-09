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

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input, InputProps } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormSelecteResponseTypeProps<
  TFormValues extends FieldValues = FieldValues
> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
} & Omit<InputProps, "name">;

const FormSelecteResponseType = <TFormValues extends Record<string, unknown>>({
  control,
  label,
  name,
  placeholder,
  errors,
  description,
  ...props
}: FormSelecteResponseTypeProps<TFormValues>): JSX.Element => {
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
            defaultValue={field.value}
            {...props}
          >
            <FormControl>
              <SelectTrigger
                className={`focus-visible:ring-1 bg-[#C4C4C41F] ${
                  hasError
                    ? "focus-visible:ring-red-500 focus:ring-red-500"
                    : "focus-visible:ring-primary focus:ring-primary"
                } focus-visible:ring-offset-2 border-transparent ring-transparent  focus:ring-1 h-12 rounded-full px-4 text-sm md:text-base`}
              >
                <SelectValue placeholder="Select answer type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="single">Single answer</SelectItem>
              <SelectItem value="multi_choice">Multiple answers</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelecteResponseType;
