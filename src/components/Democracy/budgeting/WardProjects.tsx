import { useForm } from "react-hook-form";
import { FormSelectWard, WardProjectCard } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import * as z from "zod";

export const ward = z.object({
  ward: z
    .string({ required_error: "ward is required" })
    .refine((data) => data.trim() !== "", {
      message: "comment text cannot be empty",
    }),
});

interface WardProjectsProp {}
const WardProjects: React.FC<WardProjectsProp> = () => {
  const form = useForm<z.infer<typeof ward>>({
    resolver: zodResolver(ward),
    defaultValues: {
      ward: undefined,
    },
  });

  const {
    control,
    formState: { errors },
  } = form;
  return (
    <div>
      <h2 className="text-text text-2xl md:text-4xl">Ward Projects</h2>
      <Form {...form}>
        <form className="flex flex-col gap-10 w-full max-w-[400px] py-10">
          <FormSelectWard
            name="ward"
            label="Ward"
            /* @ts-ignore */
            control={control}
            /* @ts-ignore */
            errors={errors}
          />
        </form>
      </Form>

      <div className="flex flex-wrap gap-3 py-4">
        <WardProjectCard />
        <WardProjectCard />
        <WardProjectCard />
        <WardProjectCard />
      </div>
      <h4 className="py-8 text-text text-xl md:text:2xl">
        Budget investments' proposals located geographically
      </h4>
      {/* <div className="w-full max-w-[900px] rounded-3xl bg-dark h-[500px]"> */}
      
      {/* MAP */}
      <div className="w-full max-w-[900px] rounded-3xl bg-dark h-[500px] relative">
        <img
          src="/images/democracy/map.png"
          alt="map"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default WardProjects;
