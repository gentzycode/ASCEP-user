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
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { useAppContext } from "@/contexts/AppContext";
import { InputProps } from "../../ui/input";
import { IconWrapper } from "@/components/custom";
import { FaSpinner } from "react-icons/fa";

type FormInputProps<TFormValues extends FieldValues = FieldValues> = {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  placeholder?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | FieldErrors<TFormValues>;
} & Omit<InputProps, "name">;

const FormCheckBoxSDG = <TFormValues extends Record<string, unknown>>({
  control,
  name,
}: FormInputProps<TFormValues>): JSX.Element => {
  const { sdgData, fetchingSdgs } = useAppContext();
  return (
    <>
      {fetchingSdgs && (
        <IconWrapper className=" text-primary my-10 w-fit h-full rounded-full">
          <FaSpinner className="animate-spin text-[100px]" />
        </IconWrapper>
      )}
      <FormField
        control={control}
        name={name}
        render={() => (
          <FormItem className="w-full flex justify-start flex-wrap gap-2">
            {sdgData?.map((sdg) => (
              <FormField
                key={sdg.id}
                control={control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem key={sdg.id} className=" w-fit !m-0 p-0 h-fit">
                      <FormControl>
                        <div
                          className="h-16 p-0 flex justify-start relative overflow-hidden rounded-md "
                          key={sdg.id}
                        >
                          <Checkbox
                            checked={
                              (field.value as number[]).includes(sdg.id) ??
                              false
                            }
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange(
                                    Array.isArray(field.value)
                                      ? [...field.value, sdg.id]
                                      : [sdg.id]
                                  )
                                : field.onChange(
                                    Array.isArray(field.value)
                                      ? field.value.filter(
                                          (value) => value !== sdg.id
                                        )
                                      : []
                                  );
                            }}
                            className="border-dark absolute top-0 left-0 w-full h-full border-transparent  
                          opacity-60 checked:bg-primary appearance-none rounded-lg
                        "
                          />
                          <img src={sdg.banner} alt={sdg.title} />
                        </div>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            ))}
          </FormItem>
        )}
      />
    </>
  );
};

export default FormCheckBoxSDG;
