import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FormInput, FormTextArea } from "@/components/Democracy";
import { createRequestSchema } from "@/schemas/MakeARequestSchema";
import { useState } from "react";

interface RequestMultiStepFormProp {}
const RequestMultiStepForm: React.FC<RequestMultiStepFormProp> = () => {
  const [step, setStep] = useState(1);
  const form = useForm<z.infer<typeof createRequestSchema>>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      summary: "",
      request: "",
    },
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    trigger,
  } = form;

  async function onSubmit(values: z.infer<typeof createRequestSchema>) {
    console.log(values);
  }

  const handleNext = async () => {
    await trigger();
    if (isValid) {
      setStep(2);
    }
  };
  const handlePrev = () => {
    setStep(1);
  };

  return (
    <div className="flex-1">
      {/* FORM */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {step === 1 ? (
            <>
              <FormInput
                name="summary"
                label="Summary"
                control={control}
                errors={errors}
                placeholder="Enter summary of the request "
                description="A one line summary of the information you are requesting, e.g. 'Crime statistics by ward level for Wales'"
              />

              <FormTextArea
                errors={errors}
                control={control}
                name="request"
                label="Your Request"
                rows={10}
                placeholder="Dear Department for Levelling Up, Housing & Communities"
              />
            </>
          ) : (
            <StepTwo
              request={getValues("request")}
              summary={getValues("summary")}
            />
          )}
          {step === 1 ? (
            <Button
              type="button"
              className="w-fit px-4  py-0 h-12"
              onClick={handleNext}
            >
              Next: Preview your public Request
            </Button>
          ) : (
            <div className="flex gap-2 flex-wrap">
              <Button
                type="button"
                className="w-full max-w-[200px] px-4  py-0 h-12 bg-transparent border border-primary text-primary hover:text-light"
                onClick={handlePrev}
              >
                Edit your request
              </Button>
              <Button
                type="submit"
                className="w-full max-w-[300px] px-4  py-0 h-12"
              >
                Send and publish request
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default RequestMultiStepForm;

interface StepTwoProp {
  summary: string;
  request: string;
}
const StepTwo: React.FC<StepTwoProp> = ({ summary, request }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-text text-xl">Preview your request</h2>
        <ul className="list-disc list-inside text-subtitle_text text-base">
          <li>Check you haven't included any personal information.</li>
          <li>
            Your name, request and any responses will appear in search engines.
          </li>
        </ul>
      </div>
      <div className="bg-light_grey rounded-xl py-10 px-6 space-y-8">
        <div>
          <h4 className="text-sm text-dark">To</h4>
          <p className="text-dark text-sm">
            Department for Levelling Up, Housing & Communities
          </p>
        </div>
        <div>
          <h4 className="text-sm text-dark">From</h4>
          <p className="text-dark text-sm"> User</p>
        </div>
        <div>
          <h4 className="text-sm text-dark">Subject</h4>
          <p className="text-dark text-sm py-8">{summary}</p>
          <p className="text-dark text-sm">{request}</p>
        </div>
        <div>
          <h4 className="text-sm text-dark">Yours faithfully,</h4>
          <p className="text-dark text-sm">Goodness</p>
        </div>
      </div>
    </div>
  );
};
