import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startDebateSchema } from "@/schemas/DebateSchema";
import { FormSelectInitiatives, FormSelectProposal, FormSelectWard } from "..";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SetStateAction, useState } from "react";

const AcceptingProjects = () => {
  const [projectSource, setProjectSource] = useState("");
  const form = useForm({
    // resolver: zodResolver(startDebateSchema),
    defaultValues: {
      title: "",
      description: "",
      sdgs: [],
      targets: [],
      tags: [],
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof startDebateSchema>) {
    console.log(values);
  }

  return (
    <div>
      <h1 className="text-text text-2xl xl:text-5xl capitalize">
        Accepting Projects
      </h1>
      <h3 className="text-text text-lg xl:text-2xl py-4">
        Suggest an existing project or Initiative
      </h3>
      <div className="my-8">
        <ToggleInitiativeProposal setSource={setProjectSource} />
      </div>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[900px] my-6 space-y-6"
        >
          {/* PROPOSAL OR INITIATIVES */}
          <div>
            {projectSource === "proposal" ? (
              <FormSelectProposal name="proposal" label="Select proposal" />
            ) : projectSource === "initiative" ? (
              <FormSelectInitiatives
                name="initiative"
                label="Select initiative"
              />
            ) : (
              ""
            )}
          </div>
          <FormSelectWard
            label="Ward"
            name="ward"
            // @ts-ignore
            errors={errors}
            // @ts-ignore
            control={control}
          />
        </form>
      </Form>

      <div className="flex gap-4 flex-wrap mt-28">
        <Button className="text-primary bg-transparent border border-primary w-full  max-w-[250px] hover:text-light">
          or create a new proposal
        </Button>
        <Button className="w-full max-w-[250px]">Submit</Button>
      </div>
    </div>
  );
};

export default AcceptingProjects;

interface ToggleInitiativeProposalProps {
  setSource: React.Dispatch<SetStateAction<string>>;
}

const ToggleInitiativeProposal: React.FC<ToggleInitiativeProposalProps> = ({
  setSource,
}) => {
  return (
    <RadioGroup
      className="flex gap-4"
      onValueChange={(Value) => setSource(Value)}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="initiative" id="r1" />
        <Label htmlFor="r1" className="text-text text-base">
          Initiative
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="proposal" id="r2" />
        <Label htmlFor="r2" className="text-text text-base">
          Proposal
        </Label>
      </div>
    </RadioGroup>
  );
};
