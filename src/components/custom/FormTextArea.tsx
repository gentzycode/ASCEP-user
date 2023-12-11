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

import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useState } from "react";
import { InputProps } from "../ui/input";
import { Textarea } from "../ui/textarea";

type FormInputProps<TFormValues extends FieldValues = FieldValues> = {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;

  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
} & Omit<InputProps, "name">;

const FormTextArea = <TFormValues extends Record<string, unknown>>({
  control,
  label,
  name,
  placeholder,
  errors,
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessage = lodash.get(errors, name);
  const hasError = !!errors && errorMessage;

  const [showLabel, setShowLabel] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="relative ">
            {showLabel && (
              <p
                className={`absolute h-full text-[11px] font-normal top-1 left-4 ${
                  hasError ? "text-red-500" : "text-primary"
                }`}
              >
                {label}
              </p>
            )}

            <FormControl>
              {/* @ts-ignore */}
              <Textarea
                onFocus={() => setShowLabel(true)}
                onBlurCapture={() => setShowLabel(false)}
                // onBlur={() => setShowLabel(false)}
                className={`bg-[#F5F5F5] text-base text-text focus-visible:ring-0 focus-visible:ring-primary border-none focus:border-none focus-visible:ring-offset-0 rounded-[20px] h-[140px] placeholder:text-base placeholder:text-subtle_text/30 placeholder:font-medium resize-none
                ${showLabel ? "pt-4" : ""}`}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
          </div>
          {hasError && (
            <FormMessage className="px-4 text-[11px] font-normal">
              {errorMessage.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

export default FormTextArea;
