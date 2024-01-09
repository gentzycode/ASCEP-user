import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormCheckBoxSDG,
  FormImageInput,
  FormInput,
} from "@/components/Democracy";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormTextArea from "@/components/Democracy/common/FormTextArea";
import TargetsMultiSelect from "@/components/custom/TargetsMultiSelect";
import { publishPollingSchema } from "@/schemas/VotingSchema";
import { FormCalendar, WardsMultiSelect } from "@/components/custom";
import { usePublishPoll } from "@/api/democracy/voting";
import { format } from "date-fns";

interface StartPollPageProps {}
const StartPollPage: React.FC<StartPollPageProps> = () => {
  const { mutateAsync: publishPoll, isLoading: isCreatingPoll } =
    usePublishPoll();
  const [targets, setTargets] = useState<SDGTarget[]>([]);
  const [wards, setWards] = useState<WardsType[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const form = useForm<z.infer<typeof publishPollingSchema>>({
    resolver: zodResolver(publishPollingSchema),
    defaultValues: {
      title: undefined,
      summary: "",
      description: "",
      wards: [],
      sdgs: [],
      targets: [],
      image: undefined,
      id: undefined,
      start_date: undefined,
      end_date: undefined,
    },
  });

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof publishPollingSchema>) {
    const formData = new FormData();
    formData.append("title", values.title!);
    formData.append("summary", values.summary!);
    formData.append("start_date", format(values.start_date, "yyyy-MM-dd"));
    formData.append("end_date", format(values.end_date, "yyyy-MM-dd"));
    formData.append("description", values.description);

    if (values.image) {
      formData.append("image", values.image);
    }

    if (values.sdgs && values.sdgs.length > 0) {
      values.sdgs.forEach((sdg, index) => {
        formData.append(`sdgs[${index}]`, JSON.stringify(sdg));
      });
    }

    if (values.wards && values.wards.length > 0) {
      values.wards.forEach((ward, index) => {
        formData.append(`wards[${index}]`, JSON.stringify(ward));
      });
    }

    if (values.targets && values.targets.length > 0) {
      values.targets.forEach((target, index) => {
        formData.append(`targets[${index}]`, JSON.stringify(target));
      });
    }

    await publishPoll(formData);
  }
  useEffect(() => {
    const IDs = targets.map((target) => target.id);
    setValue("targets", IDs);
  }, [targets]);

  useEffect(() => {
    const IDs = wards.map((ward) => ward.id);
    setValue("wards", IDs);
  }, [wards]);

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
            <div className="flex gap-4 flex-col md:flex-row">
              {/* START DATE */}
              <FormCalendar
                name="start_date"
                label="Start Date"
                control={control}
                errors={errors}
              />

              {/* CLOSING DATE */}
              <FormCalendar
                name="end_date"
                label="End Date"
                control={control}
                errors={errors}
              />
            </div>

            {/* TITLE */}
            <FormInput
              name="title"
              label="Title"
              control={control}
              errors={errors}
              placeholder="Enter title of the poll "
            />

            {/* SUMMARY */}
            <FormTextArea
              name="summary"
              label="Summary"
              control={control}
              errors={errors}
              rows={4}
            />

            {/* MORE INFO */}
            <FormTextArea
              name="description"
              label="Description"
              control={control}
              errors={errors}
              rows={6}
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

            <WardsMultiSelect
              selected={wards}
              setSelected={setWards}
              // @ts-ignore
              name="wards"
              errors={errors}
              control={control}
            />

            {/* OPTIONAL FIELDS */}
            <h2 className="text-[20px] md:text-[24px] text-dark -tracking-[0.48px]">
              Optional Fields
            </h2>

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
              className="w-full max-w-[400px] p-0 h-12"
              isLoading={isCreatingPoll}
              disabled={isCreatingPoll}
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
