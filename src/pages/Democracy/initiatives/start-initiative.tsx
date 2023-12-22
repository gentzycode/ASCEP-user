import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startDebateSchema } from "@/schemas/DebateSchema";
import {
  FormCheckBoxSDG,
  FormInput,
  FormSelectWard,
  FormTags,
  TextEditor,
} from "@/components/Democracy";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePublishDebate } from "@/api/democracy/debates";
import TargetsMultiSelect from "@/components/custom/TargetsMultiSelect";

interface StartInitiativePageProps {}
const StartInitiativePage: React.FC<StartInitiativePageProps> = () => {
  const { mutateAsync: publishDebate, isLoading } = usePublishDebate();
  const [tags, setTags] = useState<string[]>([]);
  const [targets, setTargets] = useState<SDGTarget[]>([]);
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
    setValue,
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof startDebateSchema>) {
    await publishDebate({ ...values });
  }

  useEffect(() => {
    register("description");
  }, [register]);

  useEffect(() => {
    const IDs = targets.map((target) => target.id);
    setValue("targets", IDs);
  }, [targets]);

  useEffect(() => {
    setValue("tags", tags);
  }, [tags]);

  const onEditorStateChange = (text: any) => {
    setValue("description", text);
  };

  const editorContent = watch("description");

  return (
    <>
      <div className="flex flex-col gap-8 max-w-[800px]">
        {/* HEADING */}
        <div>
          <h1 className="text-[20px] md:text-[36px] text-dark">
            Start an Initiative
          </h1>
          <p className="text-[12px] md:text-[14px] text-subtle_text -tracking-[0.28px]">
            How do Initiative Work?
          </p>
        </div>
        {/* RECOMMENDATIONS */}
        <div>
          <h2 className="text-[18px] md:text-[24px] -tracking-[0.48px] text-dark mb-2">
            Recommendations for creating a debate
          </h2>
          <ul className="list-disc list-inside pl-3 text-subtle_text flex flex-col gap-4">
            <li className="text-[14px] md:text-[16px] -tracking-[0.32px]">
              Review the content of your initiative. Is your title easy to
              understand? Is the objective of your initiative clear?
            </li>
            <li className="text-[14px] md:text-[16px] -tracking-[0.32px]">
              You have to choose the type of signature. In-person, online or a
              combination of both
            </li>
            <li className="text-[14px] md:text-[16px] -tracking-[0.32px] ">
              Which is the geographic scope of the initiative
            </li>
          </ul>
        </div>

        {/* FORM */}
        <Form {...form}>
          {/* REQUIRED FIELDS */}
          <h2 className="text-[20px] md:text-[24px] text-dark -tracking-[0.48px]">
            Required Fields
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormInput
              name="title"
              label="Initiative title"
              control={control}
              errors={errors}
              placeholder="Enter title of the initiative "
            />
            <TextEditor
              name="description"
              label="Initiative  Text"
              control={control}
              errors={errors}
              onChange={onEditorStateChange}
              value={editorContent}
            />
            <FormSelectWard name="ward" label="Ward" />
            <FormInput
              name="author"
              label="Author"
              control={control}
              errors={errors}
            />
            <FormInput
              name="meeting-link"
              label="Meeting Link"
              control={control}
              errors={errors}
            />

            {/* OPTIONAL FIELDS */}
            <h2 className="text-[20px] md:text-[24px] text-dark -tracking-[0.48px]">
              Optional Fields
            </h2>
            {/* MAP */}
            <div>
              <h4 className="text-[14px] text-dark ">Map location</h4>
              <p className="text-subtle_text text-[14px]">
                Navigate the map to the location and place the marker
              </p>
            </div>
            {/* TAGS */}
            <FormTags setTags={setTags} tags={tags} />
            {/* SDGs */}
            <div>
              <h5 className="text-[16px] md:text-[18px] text-dark -tracking-[0.36px] ">
                Sustainable Development Goals and Targets
              </h5>
              <p className="text-[14px] md:text-[16px] text-subtle_text -tracking-[0.36px]">
                You can choose one or several SDGs aligned with your debate
              </p>
              <div className="flex flex-wrap gap-[15px] justify-stretch  mt-[23px]">
                <FormCheckBoxSDG control={control} name="sdgs" />
              </div>
              <p className="text-[14px] md:text-[16px] text-subtle_text -tracking-[0.36px] my-2">
                You can introduce the code of a specific goal/target or a text
                to find one. For more information visit the
                <Link to="#" className="text-primary ml-1">
                  SDG help page.
                </Link>
              </p>
            </div>
            {/* TARGETS */}
            <TargetsMultiSelect selected={targets} setSelected={setTargets} />
            <Button
              type="submit"
              className="w-full max-w-[400px] p-0 h-fit py-3"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Start an Initiative
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default StartInitiativePage;
