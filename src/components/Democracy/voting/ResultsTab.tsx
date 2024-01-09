import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { showResultsSchema } from "@/schemas/VotingSchema";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
interface ResultsTabProp {}
const ResultsTab: React.FC<ResultsTabProp> = () => {
  const form = useForm<z.infer<typeof showResultsSchema>>({
    resolver: zodResolver(showResultsSchema),
    defaultValues: {
      results: undefined,
      stats: undefined,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof showResultsSchema>) {
    console.log(values);
  }
  return (
    <div>
      <h3 className="text-text text-base md:text-xl pt-8">
        Show results and stats
      </h3>
      <p className="text-subtitle_text ">
        Marking these checkboxes the results and/or stats will be publicly
        available and every user will see them.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 relative my-4"
      >
        <Controller
          name="results"
          control={control}
          render={({ field }) => (
            <div className="flex gap-2 items-center">
              {/* @ts-ignore */}
              <Checkbox
                className="border border-dark"
                {...field}
                onCheckedChange={(value) => field.onChange(value)}
              />
              <h3 className="text-sm md:text-base text-text">Show Results</h3>
            </div>
          )}
        />
        <Controller
          name="stats"
          control={control}
          render={({ field }) => (
            <div className="flex gap-2 items-center">
              {/* @ts-ignore */}
              <Checkbox
                className="border border-dark"
                {...field}
                onCheckedChange={(value) => field.onChange(value)}
              />
              <h3 className="text-sm md:text-base text-text">Show Stats</h3>
            </div>
          )}
        />
        <Button
          type="submit"
          className="h-12 p-0 text-dark rounded-xl w-full max-w-[200px] mt-2"
        >
          Update poll
        </Button>
      </form>
    </div>
  );
};

export default ResultsTab;
