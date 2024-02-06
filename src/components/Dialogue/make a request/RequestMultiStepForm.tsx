import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FormInput, FormTextArea } from "@/components/Democracy";
import { createRequestSchema } from "@/schemas/MakeARequestSchema";
import { useState } from "react";
import { FormSelectPublicIdentifier } from "..";
import { useAppContext } from "@/contexts/AppContext";
import { useCreateRequest } from "@/api/dialogue/requests";

interface RequestMultiStepFormProp {
  authority: AuthorityInfoType;
}
const RequestMultiStepForm: React.FC<RequestMultiStepFormProp> = ({
  authority,
}) => {
  const [step, setStep] = useState(1);
  const { mutateAsync: createRequest, isLoading: isCreatingRequest } =
    useCreateRequest();

  const form = useForm<z.infer<typeof createRequestSchema>>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      authority_id: "",
      description: "",
      public_identifier: "",
      title: "",
    },
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    trigger,
    reset,
  } = form;

  async function onSubmit(values: z.infer<typeof createRequestSchema>) {
    console.log(values);
    const formData = new FormData();
    formData.append("authority_id", authority.id);
    formData.append("description", values.description);
    formData.append("public_identifier", values.public_identifier);
    formData.append("title", values.title);
    createRequest(formData);
    reset();
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 relative"
        >
          {step === 1 ? (
            <>
              <FormInput
                name="title"
                label="Title"
                control={control}
                errors={errors}
                placeholder="Enter request title "
                description="A one line summary of the information you are requesting, e.g. 'Crime statistics by ward level for Wales'"
              />

              <FormSelectPublicIdentifier
                name="public_identifier"
                label="Request type"
                errors={errors}
                control={control}
              />

              <FormTextArea
                errors={errors}
                control={control}
                name="description"
                label="Your Request description"
                rows={10}
                placeholder="Dear Department for Levelling Up, Housing & Communities"
              />
            </>
          ) : (
            <StepTwo
              title={getValues("title")}
              description={getValues("description")}
              type={getValues("public_identifier")}
              authority={authority}
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
                className="w-full max-w-[300px] px-4  py-0 h-12 bg-transparent border border-primary text-primary hover:text-light"
                onClick={handlePrev}
              >
                Edit your request
              </Button>
              <Button
                type="submit"
                className="w-full max-w-[300px] px-4  py-0 h-12"
                isLoading={isCreatingRequest}
                disabled={isCreatingRequest}
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
  title: string;
  description: string;
  type: string;
  authority: AuthorityInfoType;
}
const StepTwo: React.FC<StepTwoProp> = ({
  title,
  description,
  type,
  authority,
}) => {
  const { name } = authority;
  const { user } = useAppContext();
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
          <p className="text-dark text-sm">{name}</p>
        </div>
        <div>
          <h4 className="text-sm text-dark">From</h4>
          <p className="text-dark text-sm"> {user?.email ?? user?.firstname}</p>
        </div>
        <div>
          <h4 className="text-sm text-dark">Subject</h4>
          <p className="text-dark text-sm py-8">{title}</p>
          <p className="text-dark text-sm">{description}</p>
          <p className="text-dark text-sm">
            <span>Request type:</span> {type}
          </p>
        </div>
        <div>
          <h4 className="text-sm text-dark">Yours faithfully,</h4>
          <p className="text-dark text-sm">
            {user?.firstname ?? user?.lastname ?? user?.username}
          </p>
        </div>
      </div>
    </div>
  );
};
