import { useForm } from "react-hook-form";
import { ListViewCard } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput } from "@/components/custom";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RelatedDebatesProps {}
const RelatedDebates: React.FC<RelatedDebatesProps> = () => {
  const [addRelated, setAddRelated] = useState(false);
  const addRelatedSchema = z.object({
    url: z
      .string({ required_error: "Url is required" })
      .min(1, { message: "Url is required" }),
  });
  const form = useForm<z.infer<typeof addRelatedSchema>>({
    resolver: zodResolver(addRelatedSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  function onSubmit(values: z.infer<typeof addRelatedSchema>) {
    console.log(values);
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
          Related content (3)
        </h2>
        <button onClick={() => setAddRelated(!addRelated)}>
          Add related content
        </button>
      </div>
      <h4 className="mt-6">Link to related content</h4>
      <p>You can add links of Proposal, Debate, and Budget investment.</p>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${
            addRelated ? "h-[60px] opacity-100" : "h-0 opacity-0"} overflow-hidden duration-300 flex items-start justify-stretch gap-2  my-5`}
        >
          <div className="flex-1">
            <FormInput
              name="url"
              label="url"
              control={control}
              placeholder="https://ascep.org/"
              errors={errors}
              className="!bg-dark"
            />
          </div>
          <Button type="submit" className="w-fit px-8">
            Add
          </Button>
        </form>
      </Form>

      <div className="flex gap-10 flex-col mt-10">
        {/* <ListViewCard title="The right to play: for a more child-friendly city" /> */}
        {/* <ListViewCard title="The right to play: for a more child-friendly city" /> */}
        {/* <ListViewCard title="The right to play: for a more child-friendly city" /> */}
      </div>
    </div>
  );
};

export default RelatedDebates;
