import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startDebateSchema } from "@/schemas/DebateSchema";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FormInput, FormTextArea } from "@/components/Democracy";

interface RequestMultiStepFormProp {}
const RequestMultiStepForm: React.FC<RequestMultiStepFormProp> = () => {
  const form = useForm<z.infer<typeof startDebateSchema>>({
    resolver: zodResolver(startDebateSchema),
    defaultValues: {
      title: "",
      description: "",
      sdgs: [],
      targets: [],
      tags: [],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof startDebateSchema>) {
    console.log(values);
  }

  return (
    <div className="flex-1">
      {/* FORM */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <FormInput
            name="title"
            label="Summary"
            control={control}
            errors={errors}
            placeholder="Enter summary of the request "
            description="A one line summary of the information you are requesting, e.g. 'Crime statistics by ward level for Wales'"
          />

          <FormTextArea
            name="request"
            label="Your Request"
            rows={10}
            placeholder="Dear Department for Levelling Up, Housing & Communities"
          />
          <Button type="submit" className="w-fit px-4  py-0 h-12">
            Next: Preview your public Request
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RequestMultiStepForm;
