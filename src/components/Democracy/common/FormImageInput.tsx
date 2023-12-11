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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input, InputProps } from "../../ui/input";
import { Button } from "@/components/ui/button";

type FormImageInputProps<TFormValues extends FieldValues = FieldValues> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
} & Omit<InputProps, "name">;

const FormImageInput = <TFormValues extends Record<string, unknown>>({
  control,
  label,
  name,
  placeholder,
  errors,
  description,
  ...props
}: FormImageInputProps<TFormValues>): JSX.Element => {
  const errorMessage = lodash.get(errors, name);
  const hasError = !!errors && errorMessage;
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Button type="button">
                <input
                  type="file"
                  className="hidden"
                  id="fileInput"
                  onBlur={field.onBlur}
                  name={field.name}
                  onChange={(e) => {
                    field.onChange(e.target.files);
                  }}
                  ref={field.ref}
                />
                <label
                  htmlFor="fileInput"
                  className="bg-blue-500 hover:bg-blue-600 text-neutral-90  rounded-md cursor-pointer inline-flex items-center"
                >
                  <span className="whitespace-nowrap">choose your image</span>
                </label>
              </Button>
            </FormControl>
            {/* <FormDescription>This is your public display email.</FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FormImageInput;

{/* <FormField
  control={control}
  name={name}
  render={({ field }) => (
    <FormItem className="flex-1">
      <FormLabel>{label}</FormLabel>
      <p className="text-[12px] text-dark -tracking-[0.28px]">
        {description}
      </p>
      <FormControl>
        <Input
          placeholder={placeholder}
          {...field}
          className={`focus-visible:ring-1 bg-[#C4C4C41F] ${
            hasError
            ? "focus-visible:ring-red-500"
              : "focus-visible:ring-primary"
          } focus-visible:ring-offset-1 h-12 rounded-full px-8`}
          {...props}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/> */}
            {/* @ts-ignore */}