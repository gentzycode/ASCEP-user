import { FormCalendar } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Filter } from "iconsax-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchRequestSchema } from "@/schemas/MakeARequestSchema";
import { FilterButtons, FormInput } from "@/components/Democracy";
import { browseRequestFilterButtonOptions } from "@/utils/Dialogue/BrowseRequest";
import { FormSelectAuthority, FormSelectPublicIdentifier } from "..";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface SearchRequestProp {
  isLoading: boolean;
  setFilterOptions: React.Dispatch<
    React.SetStateAction<z.infer<typeof searchRequestSchema>>
  >;
}
const SearchRequest: React.FC<SearchRequestProp> = ({
  isLoading,
  setFilterOptions,
}) => {
  const [showFilter, setShowFilter] = useState(false);

  const form = useForm<z.infer<typeof searchRequestSchema>>({
    resolver: zodResolver(searchRequestSchema),
    defaultValues: {
      authority: undefined,
      datetimeRange: {
        endDate: undefined,
        startDate: undefined,
      },
      privacy: undefined,
      status: "",
      text: "",
    },
  });

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof searchRequestSchema>) {
    let formValues = values;
    if (values.datetimeRange?.startDate && !values.datetimeRange.endDate) {
      setValue("datetimeRange.endDate", new Date());
      formValues = {
        ...formValues,
        datetimeRange: {
          ...formValues.datetimeRange,
          endDate: new Date(),
        },
      };
    }

    if (!values.datetimeRange?.startDate && values.datetimeRange?.endDate) {
      return toast({
        description: "Please select Start date",
        title: "Error",
        variant: "error",
      });
    }

    const getFiltersWithValues = Object.fromEntries(
      Object.entries(formValues).filter(([key, value]) => {
        if (
          key === "datetimeRange" &&
          // @ts-ignore
          value.endDate === undefined &&
          // @ts-ignore
          value.startDate === undefined
        ) {
          return false;
        }
        return value != null && value !== "" && value !== undefined;
      })
    );

    setFilterOptions((prevState) => ({
      ...prevState,
      ...getFiltersWithValues,
      status: prevState.status,
    }));
  }

  const resetFilter = () => {
    reset();
    setValue("authority", undefined);
    setValue("privacy", "");
    setFilterOptions({ status: "all" });
  };

  const filterByButton = (value: string) => {
    setFilterOptions((options) => ({ ...options, status: value }));
  };

  return (
    <div className="space-y-11">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-7 py-8 relative"
        >
          <FormInput control={control} name="text" placeholder="Keywords" />
          <Button
            className="h-11 text-base text-dark w-[150px]"
            type="button"
            onClick={() => setShowFilter(!showFilter)}
          >
            <Filter /> {showFilter ? "Hide Filter" : "Show Filter"}
          </Button>
          <div
            className={`${
              showFilter ? "h-max" : "h-0 overflow-hidden"
            }  duration-500  grid grid-cols-1 lg:grid-cols-2 gap-8`}
          >
            <FormCalendar
              name="datetimeRange.startDate"
              label="Made between"
              control={control}
              errors={errors}
            />
            <FormCalendar
              name="datetimeRange.endDate"
              label="and"
              control={control}
              errors={errors}
            />
            <FormSelectAuthority
              name="authority"
              placeholder="Name of Authority"
              label="Select Authority"
            />
            <FormSelectPublicIdentifier
              name="privacy"
              control={control}
              errors={errors}
              placeholder="Public or Private"
              label="Select privacy"
            />
          </div>
          <div className="flex gap-4 flex-wrap">
            <Button
              className="h-11 text-base text-dark w-[150px]"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Search
            </Button>
            <Button
              className="h-11 text-base text-dark w-[150px] bg-transparent border border-dark"
              disabled={isLoading}
              type="button"
              onClick={resetFilter}
            >
              Reset Filter
            </Button>
          </div>
        </form>
      </Form>
      <FilterButtons
        filterButtonOptions={browseRequestFilterButtonOptions}
        filterByButton={(value) => {
          filterByButton(value);
        }}
        defaultFilterButtonValue="all"
        isFiltering={isLoading}
      />
    </div>
  );
};

export default SearchRequest;
