import DemocracyLayout from "@/layouts/DemocracyLayout";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startDebateSchema } from "@/schemas/DebateSchema";
import {
  FormCheckBoxSDG,
  FormComboboxTarget,
  FormImageInput,
  FormInput,
  TextEditor,
} from "@/components/Democracy";
import { useEffect, useState } from "react";
import { CloseCircle } from "iconsax-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { usePublishDebate } from "@/api/democracy/debates";
import { startProposalSchema } from "@/schemas/ProposalSchema";
import FormTextArea from "@/components/Democracy/common/FormTextArea";

interface StartProposalPageProps {}
const StartProposalPage: React.FC<StartProposalPageProps> = () => {
  const { mutateAsync: publishDebate, isLoading } = usePublishDebate();
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [target, setTarget] = useState<number | null>(null);
  const [targets, setTargets] = useState<number[]>([]);
  const form = useForm<z.infer<typeof startProposalSchema>>({
    resolver: zodResolver(startProposalSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      external_video_url: "",
      ward_id: undefined,
      tags: [],
      categories: [],
      sdgs: [],
      targets: [],
      support_needed: undefined,
      documents: undefined,
      image: undefined,
    },
  });

  const {
    setValue,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof startProposalSchema>) {
    console.log(values);
  }

  //   useEffect(() => {
  //     register("description");
  //   }, [register]);

  useEffect(() => {
    if (target) {
      setTargets((targets) => [...targets, target]);
    }
  }, [target]);

  useEffect(() => {
    setValue("targets", targets);
  }, [targets]);

  useEffect(() => {
    setValue("tags", tags);
  }, [tags]);

  //   const [image, setImage] = useState(null);
  //   const [selectedImage, setSelectedImage] = (useState < File) | (null > []);
  const onEditorStateChange = (text: any) => {
    setValue("content", text);
  };

  //   useEffect(() => {
  //     setValue("image", image);
  //   }, [image]);

  const addTopic = () => {
    if (tagInput && tagInput !== "") {
      if (!tags.includes(tagInput)) {
        setTags((tag) => [...tag, tagInput]);
        setTagInput("");
      }
    }
  };

  const removeTopic = (value: string) =>
    setTags((tags) => tags.filter((tag) => value !== tag));

  const removeTarget = (value: number) =>
    setTargets((targets) => targets.filter((target) => value !== target));

  const editorContent = watch("content");
  return (
    <DemocracyLayout>
      <div className="flex flex-col gap-8 max-w-[800px]">
        {/* HEADING */}
        <div>
          <h1 className="text-[20px] md:text-[36px] text-dark">
            Start a Proposal
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
              as well as those intending to sabotage the debate spaces. Anything
              else is allowed.
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
              label="Proposal title"
              control={control}
              errors={errors}
              placeholder="Enter title of the proposal "
            />
            {/* SUMMARY */}
            <FormTextArea
              name="summary"
              label="Proposal Summary ((Maximum of 200 characters))"
              control={control}
              errors={errors}
            />
            {/* PROPOSAL TEXT */}
            <TextEditor
              name="content"
              label="Proposal Text"
              control={control}
              errors={errors}
              onChange={onEditorStateChange}
              value={editorContent}
            />

            {/* OPTIONAL FIELDS */}
            <h2 className="text-[20px] md:text-[24px] text-dark -tracking-[0.48px]">
              Optional Fields
            </h2>

            {/* EXTERNAL VIDEO URL */}
            <FormInput
              name="external_video_url"
              label="External video URL"
              control={control}
              errors={errors}
              placeholder="You may add a link to YouTube or Vimeo"
            />
            {/* DESCRIPTIVE IMAGE */}
            <FormImageInput name="image" control={control} />

            {/* TAGS */}
            <div>
              <div className="flex gap-2 items-end">
                <Input
                  onChange={(e) => setTagInput(e.target.value)}
                  value={tagInput}
                  className="h-12 text-dark focus-visible:ring-primary focus-visible:ring-offset-0 rounded-full  focus-visible:ring-1 bg-[#C4C4C41F]"
                  placeholder="Enter the tag name you would like to use"
                />

                <Button
                  className="w-fit h-fit rounded-md"
                  type="button"
                  onClick={addTopic}
                >
                  Add tag
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="my-4">
                  <h5>Tags</h5>
                  <div className="flex gap-2 flex-wrap">
                    {tags.map((tag, index) => (
                      <Button
                        type="button"
                        className=" w-fit h-fit rounded-md bg-dark text-light hover:bg-dark flex justify-between items-center cursor-auto text-[14px] "
                        key={index}
                      >
                        <span>{tag}</span>
                        <CloseCircle
                          size={18}
                          onClick={() => removeTopic(tag)}
                          className="cursor-pointer"
                          variant="Bold"
                        />
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
            <div>
              <FormComboboxTarget setTarget={setTarget} />

              {targets.length > 0 && (
                <div className="my-4">
                  <h5>Targets</h5>
                  <div className="flex gap-2 flex-wrap">
                    {targets.map((target, index) => (
                      <Button
                        type="button"
                        className=" w-fit h-fit rounded-md bg-dark text-light hover:bg-dark flex justify-between items-center cursor-auto text-[14px] "
                        key={index}
                      >
                        <span>{target}</span>
                        <CloseCircle
                          size={18}
                          onClick={() => removeTarget(target)}
                          className="cursor-pointer"
                          variant="Bold"
                        />
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button
              type="submit"
              className="w-full max-w-[400px] p-0 h-fit py-3"
              isLoading={isLoading}
            >
              Start A Debate
            </Button>
          </form>
        </Form>
      </div>
    </DemocracyLayout>
  );
};

export default StartProposalPage;
