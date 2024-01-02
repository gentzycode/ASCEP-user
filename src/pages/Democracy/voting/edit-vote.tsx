import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormCheckBoxSDG,
  FormImageInput,
  FormInput,
  NotFound,
} from "@/components/Democracy";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormTextArea from "@/components/Democracy/common/FormTextArea";
import TargetsMultiSelect from "@/components/custom/TargetsMultiSelect";
import { publishPollingSchema } from "@/schemas/VotingSchema";
import { PageLoader, WardsMultiSelect } from "@/components/custom";
import { useGetPollInfo, usePublishPoll } from "@/api/democracy/voting";
import { format, parseISO } from "date-fns";
import { useAppContext } from "@/contexts/AppContext";

interface EditVotePageProps {}
const EditVotePage: React.FC<EditVotePageProps> = () => {
  const { pollId } = useParams();

  const [targets, setTargets] = useState<SDGTarget[]>([]);
  const [wards, setWards] = useState<WardsType[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const {
    data: poll,
    isLoading: isLoadingPoll,
    isError,
  } = useGetPollInfo(pollId!);

  const { mutateAsync: updatePoll, isLoading: isUpdatingPoll } =
    usePublishPoll();
  const { targets: allTargets } = useAppContext();

  const form = useForm<z.infer<typeof publishPollingSchema>>({
    resolver: zodResolver(publishPollingSchema),
    defaultValues: {
      title: "",
      summary: "",
      description: "",
      wards: [],
      sdgs: [],
      targets: [],
      image: undefined,
      id: "",
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
    formData.append("id", pollId!);

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

    await updatePoll(formData);
  }
  useEffect(() => {
    const IDs = targets.map((target) => target.id);
    setValue("targets", IDs);
  }, [targets]);

  useEffect(() => {
    const IDs = wards.map((ward) => ward.id);
    setValue("wards", IDs);
  }, [wards]);

  const getTargets = () => {
    const newArray = poll?.votingTarget
      .map(({ targetInfo }) => {
        const matchingObject = allTargets.find(
          (item) => item.code === targetInfo.code
        );
        return matchingObject || null;
      })
      .filter(Boolean) as SDGTarget[];
    if (newArray) {
      setTargets(newArray);
    }
  };

  useEffect(() => {
    if (poll) {
      getTargets();
      const {
        title,
        description,
        summary,
        start_date,
        end_date,
        votingSDGs,
        votingWards,
      } = poll;
      setValue("id", pollId);
      setValue("title", title);
      setValue("description", description);
      setValue("summary", summary);
      // @ts-ignore
      setValue("start_date", format(parseISO(start_date!), "yyyy-MM-dd"));
      // @ts-ignore
      setValue("end_date", format(parseISO(end_date!), "yyyy-MM-dd"));
      setValue(
        "sdgs",
        votingSDGs.map((item) => item.sdg_id)
      );
      setWards(votingWards.map((ward) => ward.wardDetail));
    }
  }, [poll, allTargets]);

  return (
    <>
      {isLoadingPoll && <PageLoader />}
      {isError && !poll && <NotFound message="No Poll found" />}

      {poll && (
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
                  name="end_date"
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
                isLoading={isUpdatingPoll}
                disabled={isUpdatingPoll}
              >
                Update Poll
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditVotePage;
