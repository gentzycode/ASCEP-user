import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormCheckBoxSDG,
  FormImageInput,
  FormInput,
  FormSelectWard,
  FormTags,
} from "@/components/Democracy";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormTextArea from "@/components/Democracy/common/FormTextArea";
import { usePublishProposal } from "@/api/democracy/proposals";
import TargetsMultiSelect from "@/components/custom/TargetsMultiSelect";
import { startVotingSchema } from "@/schemas/VotingSchema";

interface StartPollPageProps {}
const StartPollPage: React.FC<StartPollPageProps> = () => {
  const { mutateAsync: publishProposal, isLoading } = usePublishProposal();
  const [tags, setTags] = useState<string[]>([]);
  const [targets, setTargets] = useState<SDGTarget[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const form = useForm<z.infer<typeof startVotingSchema>>({
    resolver: zodResolver(startVotingSchema),
    defaultValues: {
      title: undefined,
      summary: "",
      more_info: "",
      ward_id: undefined,
      tags: [],
      sdgs: [],
      targets: [],
      image: undefined,
    },
  });

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof startVotingSchema>) {
    console.log(values);

    const formData = new FormData();
    formData.append("title", values.title!);
    formData.append("summary", values.summary!);
    formData.append("ward_id", JSON.stringify(values.ward_id!));

    if (values.image) {
      formData.append("image", values.image);
    }

    if (values.sdgs && values.sdgs.length > 0) {
      values.sdgs.forEach((sdg, index) => {
        formData.append(`sdgs[${index}]`, JSON.stringify(sdg));
      });
    }

    if (values.tags && values.tags.length > 0) {
      values.tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
    }
    if (values.targets && values.targets.length > 0) {
      values.targets.forEach((target, index) => {
        formData.append(`targets[${index}]`, JSON.stringify(target));
      });
    }

    // await publishProposal(formData);
  }

  useEffect(() => {
    const IDs = targets.map((target) => target.id);
    setValue("targets", IDs);
  }, [targets]);

  useEffect(() => {
    setValue("tags", tags);
  }, [tags]);

  return (
    <>
      <div className="flex flex-col gap-8 max-w-[800px]">
        {/* HEADING */}
        <h1 className="text-[20px] md:text-[36px] text-dark">Start a Poll</h1>

        {/* FORM */}
        <Form {...form}>
          {/* REQUIRED FIELDS */}
          <h2 className="text-[20px] md:text-[24px] text-dark -tracking-[0.48px]">
            Required Fields
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-10"
          >
            <div className="flex gap-4 flex-wrap">
              {/* START DATE */}
              <FormInput
                name="start_date"
                label="Start Date"
                control={control}
                errors={errors}
                placeholder="Enter title of the proposal "
                type="date"
              />

              {/* CLOSING DATE */}
              <FormInput
                name="closing_date"
                label="Closing Date"
                control={control}
                errors={errors}
                placeholder="Enter title of the proposal "
                type="date"
              />
            </div>

            {/* TITLE */}
            <FormInput
              name="title"
              label="Title"
              control={control}
              errors={errors}
              placeholder="Enter title of the proposal "
            />

            {/* SUMMARY */}
            <FormTextArea
              name="summary"
              label="Summary"
              control={control}
              errors={errors}
            />

            {/* MORE INFO */}
            <FormTextArea
              name="more_info"
              label="More information"
              control={control}
              errors={errors}
            />

            {/* DESCRIPTIVE IMAGE */}
            <FormImageInput
              name="image"
              control={control}
              description="You can upload one image of following content types: jpg, up to 1 MB."
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage}
            />

            {/* WARD */}
            <FormSelectWard
              /* @ts-ignore */
              control={control}
              /* @ts-ignore */
              errors={errors}
              name="ward_id"
              label="Ward"
            />

            {/* OPTIONAL FIELDS */}
            <h2 className="text-[20px] md:text-[24px] text-dark -tracking-[0.48px]">
              Optional Fields
            </h2>

            {/* TAGS */}
            <FormTags tags={tags} setTags={setTags} />

            {/* SDGs */}
            <div>
              <h5 className="text-[16px] md:text-[18px] text-dark -tracking-[0.36px] ">
                Sustainable Development Goals and Targets
              </h5>
              <p className="text-[14px] md:text-[16px] text-subtle_text -tracking-[0.36px]">
                You can choose one or several SDGs aligned with your poll
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
            >
              Create Poll
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default StartPollPage;
