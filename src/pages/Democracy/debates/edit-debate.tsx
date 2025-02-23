import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startDebateSchema } from "@/schemas/DebateSchema";
import {
  FormCheckBoxSDG,
  FormInput,
  FormTags,
  NotFound,
  TextEditor,
} from "@/components/Democracy";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetDebateInfo, usePublishDebate } from "@/api/democracy/debates";
import { PageLoader } from "@/components/custom";
import { useAppContext } from "@/contexts/AppContext";
import TargetsMultiSelect from "@/components/custom/TargetsMultiSelect";
import ROUTES from "@/utils/routesNames";

interface EditDebatePageProps {}
const EditDebatePage: React.FC<EditDebatePageProps> = () => {
  const { debateId } = useParams();

  const {
    data: debate,
    isError,
    isLoading: isLoadingDebate,
  } = useGetDebateInfo(debateId!);

  const { targets: allTargets } = useAppContext();

  const { mutateAsync: publishDebate, isLoading: isUpdatingDebate } =
    usePublishDebate();

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
      id: undefined,
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

  const getTargets = () => {
    const newArray = debate?.debateTarget
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
    if (debate) {
      getTargets();
      const { title, description, debateSDGs, debateTag } = debate;
      setValue("id", debateId);
      setValue("title", title);
      setValue("description", description);
      setTags(debateTag.map((tag) => tag.tag_name));
      setValue(
        "sdgs",
        debateSDGs.map((item) => item.sdgs_id)
      );
    }
  }, [debate, allTargets]);

  return (
    <>
      {isLoadingDebate && <PageLoader />}
      {isError && !debate && <NotFound message="No Debate found" />}
      {debate && (
        <div className="flex flex-col gap-8 max-w-[800px]">
          {/* HEADING */}
          <div>
            <h1 className="text-[20px] md:text-[36px] text-dark">
              Update Debate
            </h1>
            <p className="text-[12px] md:text-[14px] text-subtle_text -tracking-[0.28px]">
              How do Debates Work?
            </p>
          </div>
          {/* RECOMMENDATIONS */}
          <div>
            <h2 className="text-[18px] md:text-[24px] -tracking-[0.48px] text-dark mb-2">
              Recommendations for creating a debate
            </h2>
            <ul className="list-disc list-inside pl-3 text-subtle_text flex flex-col gap-4">
              <li className="text-[14px] md:text-[16px] -tracking-[0.32px]">
                Do not use capital letters for the debate title or for whole
                sentences. On the internet, this is considered shouting. And
                nobody likes being shouted at.
              </li>
              <li className="text-[14px] md:text-[16px] -tracking-[0.32px]">
                Any debate or comment suggesting illegal action will be deleted,
                as well as those intending to sabotage the debate spaces.
                Anything else is allowed.
              </li>
              <li className="text-[14px] md:text-[16px] -tracking-[0.32px] ">
                Ruthless criticism is very welcome. This is a space for
                reflection. But we recommend that you stick to elegance and
                intelligence. The world is a better place with these virtues in
                it.
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
                label="Debate title"
                control={control}
                errors={errors}
                placeholder="Enter title of the debate "
              />
              <TextEditor
                name="description"
                label="Initial Debate Text"
                control={control}
                errors={errors}
                onChange={onEditorStateChange}
                value={editorContent}
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
                  You can choose one or several SDGs aligned with your debate
                </p>
                <div className="flex flex-wrap gap-[15px] justify-stretch  mt-[23px]">
                  <FormCheckBoxSDG control={control} name="sdgs" />
                </div>
                <p className="text-[14px] md:text-[16px] text-subtle_text -tracking-[0.36px] my-2">
                  You can introduce the code of a specific goal/target or a text
                  to find one. For more information visit the
                  <Link
                    to={ROUTES.SDGs_HOME_ROUTE}
                    className="text-primary ml-1"
                    target="_blank"
                  >
                    SDG help page.
                  </Link>
                </p>
              </div>
              {/* TARGETS */}
              <TargetsMultiSelect setSelected={setTargets} selected={targets} />
              <Button
                type="submit"
                className="w-full max-w-[400px] p-0 h-12"
                isLoading={isUpdatingDebate}
                disabled={isUpdatingDebate}
              >
                Update Debate
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditDebatePage;
