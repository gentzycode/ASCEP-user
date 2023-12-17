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

import { FormControl, FormField, FormMessage, FormItem } from "../../ui/form";
import { InputProps } from "../../ui/input";
import { Button } from "@/components/ui/button";
import { GalleryAdd } from "iconsax-react";

type FormImageInputProps<TFormValues extends FieldValues = FieldValues> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
} & Omit<InputProps, "name">;

const FormImageInput = <TFormValues extends Record<string, unknown>>({
  control,
  label,
  name,
  placeholder,
  errors,
  description,
  setSelectedImage,
  ...props
}: FormImageInputProps<TFormValues>): JSX.Element => {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <p className="text-dark text-[14px]">{description}</p>
            <FormControl>
              <Button
                type="button"
                className="w-full max-w-[300px] p-0 flex justify-center items-center"
              >
                <input
                  type="file"
                  className="hidden"
                  id="fileInput"
                  onBlur={field.onBlur}
                  name={field.name}
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0]);
                    setSelectedImage(e.target.files?.[0] ?? null);
                  }}
                  ref={field.ref}
                  {...props}
                />
                <label
                  htmlFor="fileInput"
                  className="flex gap-2 items-center justify-center cursor-pointer w-full h-full"
                >
                  <GalleryAdd variant="Bold" size={30} />
                  <span className="whitespace-nowrap capitalize">
                    Add image
                  </span>
                </label>
              </Button>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FormImageInput;

{
  /* <FormField
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
/> */
}
{
  /* @ts-ignore */
}
