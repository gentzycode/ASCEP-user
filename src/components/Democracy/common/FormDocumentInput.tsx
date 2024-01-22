/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
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
import { CloseCircle, DocumentText1 } from "iconsax-react";
import { v4 } from "uuid";
import PdfPreview from "@/components/Democracy/common/PreviewPDF";
import { IconWrapper } from "@/components/custom";
type FormDocumentInputProps<TFormValues extends FieldValues = FieldValues> = {
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
  setSelectedDocuments: React.Dispatch<React.SetStateAction<File[]>>;
  selectedDocuments: File[];
} & Omit<InputProps, "name">;

const FormDocumentInput = <TFormValues extends Record<string, unknown>>({
  control,
  label,
  name,
  placeholder,
  errors,
  description,
  setSelectedDocuments,
  selectedDocuments,
  ...props
}: FormDocumentInputProps<TFormValues>): JSX.Element => {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <p className="text-dark text-[14px]">{description}</p>
            <FormControl>
              <div
                // type="button"
                className="w-full max-w-[300px] p-0 flex justify-center items-center bg-primary py-3 rounded-2xl"
              >
                <input
                  type="file"
                  className="hidden"
                  id="fileInputDoc"
                  onBlur={field.onBlur}
                  name={field.name}
                  multiple
                  ref={field.ref}
                  {...props}
                  // key={v4()}
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
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* DOC PREVIEW */}
      {selectedDocuments.length > 0 && (
        <>
          <p>Document preview</p>
          <div className="flex justify-start items-center gap-3 flex-wrap">
            {selectedDocuments.map((doc, index) => (
              <div className="w-[200px] h-[200px] relative" key={index}>
                <PdfPreview file={doc} />
                <IconWrapper
                  onClick={() => {
                    setSelectedDocuments((selectedDocuments) =>
                      selectedDocuments.filter((docu) => docu !== doc)
                    );
                  }}
                  className="absolute top-0 right-0 text-dark bg-primary p-0 h-fit w-fit cursor-pointer"
                >
                  <CloseCircle size={20} />
                </IconWrapper>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FormDocumentInput;
