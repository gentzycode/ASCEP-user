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
interface SearchRequestProp {}
const SearchRequest: React.FC<SearchRequestProp> = () => {
  const form = useForm<z.infer<typeof searchRequestSchema>>({
    resolver: zodResolver(searchRequestSchema),
    defaultValues: {
      authority: "",
      privacy: "",
      words: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof searchRequestSchema>) {
    console.log(values);
  }

  return (
    <div className="space-y-11">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 py-8">
          <FormInput control={control} name="words" placeholder="Keywords" />
          <Button className="h-11 text-base text-dark w-[150px]" type="button">
            <Filter /> Filter
          </Button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormCalendar
              name="from"
              label="Made between"
              control={control}
              errors={errors}
            />
            <FormCalendar
              name="to"
              label="and"
              control={control}
              errors={errors}
            />
            <FormInput
              name="authority"
              control={control}
              errors={errors}
              placeholder="Name of Authority"
            />
            <FormInput
              name="privacy"
              control={control}
              errors={errors}
              placeholder="Public or Private"
            />
          </div>
          <Button className="h-11 text-base text-dark w-[150px]">Search</Button>
        </form>
      </Form>
      <FilterButtons
        filterButtonOptions={browseRequestFilterButtonOptions}
        filterByButton={() => {}}
        defaultFilterButtonValue="all"
      />
    </div>
  );
};

export default SearchRequest;
