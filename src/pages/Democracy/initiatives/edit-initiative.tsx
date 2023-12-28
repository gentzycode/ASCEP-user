import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormCheckBoxSDG,
  FormInput,
  FormSelectMultipleCategory,
  FormSelectWard,
  FormTags,
  NotFound,
} from "@/components/Democracy";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormTextArea from "@/components/Democracy/common/FormTextArea";
import TargetsMultiSelect from "@/components/custom/TargetsMultiSelect";
import { IconWrapper } from "@/components/custom";
import { FaSpinner } from "react-icons/fa";
import { useAppContext } from "@/contexts/AppContext";
import { useGetAllCategories } from "@/api/category";
import {
  useGetInitiativeInfo,
  usePublishInitiative,
} from "@/api/democracy/initiatives";
import { startInitiativeSchema } from "@/schemas/InitiativesSchema";

interface EditInitiativePageProps {}

const EditInitiativePage: React.FC<EditInitiativePageProps> = () => {
  const { initiativeId } = useParams();

  const { mutateAsync: UpdateInitiative, isLoading: isUpdatingInitiative } =
    usePublishInitiative();

  const { targets: allTargets } = useAppContext();
  const { data: allCategories } = useGetAllCategories();

  const {
    data: initiative,
    isLoading: isLoadingProposal,
    isError,
  } = useGetInitiativeInfo(initiativeId!);

  const [tags, setTags] = useState<string[]>(
    initiative?.initiativeTag.map((tag) => tag.tag_name) ?? []
  );
  const [targets, setTargets] = useState<SDGTarget[]>([]);

  const [categories, setCategories] = useState<CategoryType[]>([]);

  const form = useForm<z.infer<typeof startInitiativeSchema>>({
    resolver: zodResolver(startInitiativeSchema),
    defaultValues: {
      title: initiative?.title,
      description: initiative?.description,
      ward_id: initiative?.ward_id,
      tags: [],
      categories: initiative?.initiativeCategory.map(
        (item) => item.category_id
      ),
      sdgs: initiative?.initiativeSDGs.map((item) => item.sdg_id),
      targets: [],
      support_needed: initiative?.support_needed,
    },
  });

  const {
    setValue,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof startInitiativeSchema>) {
    console.log({ ...values, id: initiative?.id });
    await UpdateInitiative({ ...values, id: initiative?.id });
  }

  useEffect(() => {
    const IDs = targets.map((target) => target.id);
    setValue("targets", IDs);
  }, [targets]);

  useEffect(() => {
    const IDs = categories.map((category) => category.id);
    setValue("categories", IDs);
  }, [categories]);

  useEffect(() => {
    setValue("tags", tags);
  }, [tags]);

  const getTargets = () => {
    const newArray = initiative?.initiativeTarget
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

  const getCategories = () => {
    const newArray = initiative?.initiativeCategory
      .map(({ category_id }) => {
        const matchingObject = allCategories?.find(
          (item) => item.id === category_id
        );
        return matchingObject || null;
      })
      .filter(Boolean) as CollectionData[];
    if (newArray) {
      setCategories(newArray);
    }
  };

  useEffect(() => {
    getTargets();
    getCategories();
  }, []);

  return (
    <>
      {isLoadingProposal && (
        <IconWrapper className=" text-primary my-10 w-fit h-full rounded-full">
          <FaSpinner className="animate-spin text-[100px]" />
        </IconWrapper>
      )}
      {isError && !initiative && <NotFound message="No Debate found" />}

      {initiative && (
        <div className="flex flex-col gap-8 max-w-[800px]">
          {/* HEADING */}
          <div>
            <h1 className="text-[20px] md:text-[36px] text-dark">
              Update Initiative
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
              {/* TITLE */}
              <FormInput
                name="title"
                label="Initiative title"
                control={control}
                errors={errors}
                placeholder="Enter title of the initiative "
              />

              {/* SUMMARY */}
              <FormTextArea
                name="description"
                label="Initiative summary (maximum of 200 characters)"
                control={control}
                errors={errors}
              />

              {/* WARD */}
              <FormSelectWard
                name="ward_id"
                label="Ward"
                selectedWard={initiative.ward_id}
              />

              {/* CATEGORIES */}
              <FormSelectMultipleCategory
                name="categories"
                label="Select categories"
                selected={categories}
                setSelected={setCategories}
              />
              {/* SUPPORTS NEEDED*/}
              <FormInput
                name="support_needed"
                control={control}
                errors={errors}
                label="Support needed"
                type="number"
                min={1}
                onChange={(e) => {
                  setValue("support_needed", Number(e.target.value));
                  trigger("support_needed");
                }}
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
                isLoading={isUpdatingInitiative}
                disabled={isUpdatingInitiative}
              >
                Update Initiative
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditInitiativePage;
