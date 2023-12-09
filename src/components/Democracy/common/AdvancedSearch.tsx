import { IconWrapper } from "../../custom";
import { Calendar2, Filter } from "iconsax-react";
import { Button } from "../../ui/button";
import {
  FilterButtons,
  FormCheckBoxSDG,
  FormInput,
  FormSelectTarget,
} from "..";
import { useState } from "react";
import { Form, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDebateContext } from "@/contexts/DebateContext";
import { format } from "date-fns";

export const filterSchema = z.object({
  sdgs: z.array(z.number()).optional(),
  specificSDG: z.string().optional(),
  specificTarget: z.number().optional(),
  targets: z.array(z.number()).optional(),
  tags: z.array(z.string()).optional(),
  mostactive: z.boolean().optional(),
  text: z.string().optional(),
  highestrating: z.boolean().optional(),
  newest: z.boolean().optional(),
  datetimeSpecific: z.string().optional(),
});
interface AdvancedSearchProps {
  filterButtonOptions: FilterButtonOptionsType[];
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  filterByButton: (value: string) => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  filterButtonOptions,
  view,
  setView,
  filterByButton,
}) => {
  const { setFilterOptions, filterOptions } = useDebateContext();
  const [advanceSearch, setAdvanceSearch] = useState(false);

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    mode: "onChange",
    defaultValues: {
      sdgs: [],
      specificSDG: undefined,
      specificTarget: undefined,
      targets: [],
      tags: [],
      mostactive: false,
      text: "",
      highestrating: false,
      newest: false,
      datetimeSpecific: "",
    },
  });
  const { control, handleSubmit, reset } = form;

  // GET FILTER OBJECT WITH VALUES
  const getFiltersWithValues = (filters: any) => {
    const entries = Object.entries(filters);
    const filteredEntries = entries.filter(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          return value.length > 0;
        } else {
          return true;
        }
      } else {
        return false;
      }
    });
    const filteredObject = Object.fromEntries(filteredEntries);
    return filteredObject;
  };

  async function onSubmit(values: z.infer<typeof filterSchema>) {
    const filteredObject = getFiltersWithValues(filterOptions);
    console.log("filteredObject", filteredObject);

    let formattedDate;
    let numericFilterOptions;

    numericFilterOptions = { ...values };
    if (values.datetimeSpecific) {
      formattedDate = format(
        new Date(values?.datetimeSpecific),
        "yyyy-MM-dd HH:mm:ss.SSSxxx"
      );
      numericFilterOptions = {
        ...values,
        datetimeSpecific: formattedDate,
      };
    }
    numericFilterOptions = getFiltersWithValues(numericFilterOptions);
    setFilterOptions({ ...filteredObject, ...numericFilterOptions });
  }

  return (
    <div>
      <div className=" flex justify-between md:justify-end gap-[8px] items-center  mb-4">
        <div className="md:hidden">
          {/* View type */}
          <button
            className="flex items-center text-[14px] tracking-[-0.28px] gap-[4px] bg-[#fff] border-light_grey border-2 px-4 py-0"
            onClick={() =>
              view === "card-view" ? setView("list-view") : setView("card-view")
            }
          >
            <IconWrapper className="bg-transparent text-light">
              <Calendar2 size="20" color="#292925" />
            </IconWrapper>
            <span>{view === "card-view" ? "List View" : "Card View"}</span>
          </button>
        </div>
        {!advanceSearch ? (
          <Button
            className="text-[18px] font-400 text-right md:w-fit bg-transparent p-0 hover:bg-transparent"
            onClick={() => {
              setAdvanceSearch(!advanceSearch);
            }}
          >
            Advanced Search
          </Button>
        ) : (
          <Button
            className="text-[18px] font-400 text-right md:w-fit bg-transparent p-0 hover:bg-transparent"
            onClick={() => {
              reset();
              setAdvanceSearch(!advanceSearch);
              setFilterOptions({});
            }}
          >
            Reset Search
          </Button>
        )}
      </div>

      <div className="flex justify-between gap-2 mb-2 flex-wrap">
        {/* Filter buttons */}
        <FilterButtons
          filterButtonOptions={filterButtonOptions}
          filterByButton={filterByButton}
        />
        {/* View type */}
        <div className="hidden md:block">
          <button
            className="flex items-center text-[14px] tracking-[-0.28px] gap-[4px] bg-[#fff] border-light_grey border-2 px-4 py-0"
            onClick={() =>
              view === "card-view" ? setView("list-view") : setView("card-view")
            }
          >
            <IconWrapper className="bg-transparent text-light">
              <Calendar2 size="25" color="#292925" />
            </IconWrapper>
            <span>{view === "card-view" ? "List View" : "Card View"}</span>
          </button>
        </div>
      </div>

      {/* ADVANCED SEARCH */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className={`relative`}>
          <div
            className={`grid grid-cols-2  gap-8 duration-300 overflow-hidden ${
              advanceSearch ? "max-h-[4000px]" : "h-0"
            }`}
          >
            {/* text */}
            <div className="col-span-3 md:grid-cols-3">
              <FormInput name="text" control={control} label="By words" />
            </div>
            {/* date */}
            <div className="col-span-1">
              <FormInput
                name="datetimeSpecific"
                control={control}
                label="By date"
                type="date"
              />
            </div>
            {/* SDG */}
            {/* <div className="col-span-1">
              <FormSelectSDG name="specificSDG" control={control} />
            </div> */}
            {/* Target */}
            <div className="col-span-1">
              <FormSelectTarget name="specificTarget" control={control} />
            </div>

            {/* <div className="flex flex-wrap col-span-3 gap-[15px] justify-stretch">
              {sdgData?.map((sdg) => (
                <div
                  className="h-14 p-0 flex justify-start relative overflow-hidden rounded-md"
                  key={sdg.id}
                >
                  <Checkbox
                    className="border-dark absolute top-0 left-0 w-full h-full border-transparent  
                        opacity-60 checked:bg-primary appearance-none rounded-lg
                      "
                    // onCheckedChange={(checked) => {
                    //   return checked
                    //     ? setSdg((values) => [...values, { ...item }])
                    //     : setSdg((values) => {
                    //         return values.filter(
                    //           (value) => value.id !== item.id
                    //         );
                    //       });
                    // }}
                    name="sdgs"
                  />
                  <img src={sdg.banner} alt={sdg.title} />
                </div>
              ))}
            </div> */}
            <div className="col-span-3 flex flex-col">
              <FormLabel className="mb-2">Select SDGs</FormLabel>
              <FormCheckBoxSDG control={control} name="sdgs" />
            </div>

            <Button type="submit" className="w-[175px] col-span-2">
              Filter
              <IconWrapper className="bg-transparent">
                <Filter size="25" color="#292925" variant="Bold" />
              </IconWrapper>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdvancedSearch;
