/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import * as lodash from "lodash";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";
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

type TextEditorProps<TFormValues extends FieldValues = FieldValues> = {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value: any;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
} & Omit<InputProps, "name">;

const TextEditor = <TFormValues extends Record<string, unknown>>({
  control,
  label,
  name,
  errors,
  onChange,
  value,
}: TextEditorProps<TFormValues>): JSX.Element => {
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["link"],
    [{ color: ["#FFC334", "#292925"] }],
    [{ font: ["Outfit"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ header: [5, 6, false] }],
  ];
  const module = {
    toolbar: toolbarOptions,
  };
  const errorMessage = lodash.get(errors, name);
  const hasError = !!errors && errorMessage;
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <h3 className="text-sm md:text-base text-text">{label}</h3>
          <FormControl>
            <ReactQuill
              theme="snow"
              value={value}
              modules={module}
              onChange={onChange}
              className={`focus-visible:ring-1 bg-[#C4C4C41F] ${
                hasError
                  ? "focus-visible:ring-red-500"
                  : "focus-visible:ring-primary"
              } focus-visible:ring-offset-2 text-sm md:text-base`}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextEditor;
