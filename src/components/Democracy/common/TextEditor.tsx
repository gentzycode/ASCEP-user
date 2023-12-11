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

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
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
    [{ header: [ 5, 6, false] }],
  ];
  const module = {
    toolbar: toolbarOptions,
  };
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <ReactQuill
              theme="snow"
              value={value}
              modules={module}
              onChange={onChange}
              className=" bg=[#C4C4C41F]  mb-10"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextEditor;
