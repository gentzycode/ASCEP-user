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
import { Button } from "@/components/ui/button";
import { DocumentText1 } from "iconsax-react";

type FormDocumentInputProps<TFormValues extends FieldValues = FieldValues> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
  //   setSelectedDocument: React.Dispatch<React.SetStateAction<File[] | null>>;
  //   selectedDocuments: File[] | null;
  //   arr: File[];
} & Omit<InputProps, "name">;

const FormDocumentInput = <TFormValues extends Record<string, unknown>>({
  control,
  label,
  name,
  placeholder,
  errors,
  description,
  //   setSelectedDocument,
  //   selectedDocuments,
  //   arr,
  ...props
}: FormDocumentInputProps<TFormValues>): JSX.Element => {
  const errorMessage = lodash.get(errors, name);
  const hasError = !!errors && errorMessage;

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <p className="text-dark text-[14px]">{description}</p>
            <FormControl>
              <Button type="button" className="w-full max-w-[300px] p-0 flex justify-center items-center">
                <input
                  type="file"
                  className="hidden"
                  id="fileInputDoc"
                  onBlur={field.onBlur}
                  name={field.name}
                  multiple
                  ref={field.ref}
                  {...props}
                />
                <label
                  htmlFor="fileInputDoc"
                  className="flex gap-2 items-center justify-center cursor-pointer w-full h-full"
                >
                  <DocumentText1 variant="Bold" size={30} />
                  <span className="whitespace-nowrap capitalize">
                    Add Document
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

export default FormDocumentInput;
