import DemocracyLayout from "@/layouts/DemocracyLayout";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormCheckBoxSDG,
  FormComboboxTarget,
  FormDocumentInput,
  FormImageInput,
  FormInput,
  FormSelectCategory,
  FormSelectWard,
  TextEditor,
} from "@/components/Democracy";
import { useEffect, useState } from "react";
import { CloseCircle } from "iconsax-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { startProposalSchema } from "@/schemas/ProposalSchema";
import FormTextArea from "@/components/Democracy/common/FormTextArea";
import PdfPreview from "@/components/Democracy/common/PreviewPDF";
import { IconWrapper } from "@/components/custom";
import { useAppContext } from "@/contexts/AppContext";
import { usePublishProposal } from "@/api/democracy/proposals";

interface StartProposalPageProps {}
const StartProposalPage: React.FC<StartProposalPageProps> = () => {
  const {} = useAppContext();
  const { mutateAsync: publishProposal, isLoading } = usePublishProposal();
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [target, setTarget] = useState<SDGTarget>();
  const [targets, setTargets] = useState<SDGTarget[]>([]);
  const [category, setCategory] = useState<CategoryType>();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);
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
    trigger,
    setError,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof startProposalSchema>) {
    console.log(values);
    const formData = new FormData();
    formData.append("title", values.title!);
    formData.append("summary", values.summary!);
    formData.append("content", values.content!);
    formData.append("ward_id", JSON.stringify(values.ward_id!));
    formData.append("support_needed", JSON.stringify(values.support_needed!));
    formData.append("external_video_url", String(values.external_video_url!));

    if (values.image) {
      formData.append("image", values.image);
    }
    if (values.documents && values.documents.length > 0) {
      values.documents.forEach((doc, index) => {
        formData.append(`documents[${index}]`, doc);
      });
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
    if (values.categories && values.categories.length > 0) {
      values.categories.forEach((category, index) => {
        formData.append(`categories[${index}]`, JSON.stringify(category));
      });
    }
    await publishProposal(formData);
  }

  useEffect(() => {
    if (target) {
      if (!targets.includes(target)) {
        setTargets((targets) => [...targets, target]);
      }
    }
  }, [target]);
  useEffect(() => {
    if (category) {
      setCategories((categories) => [...categories, category]);
    }
  }, [category]);

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

  const onEditorStateChange = (text: any) => {
    setValue("content", text);
  };

  useEffect(() => {
    setValue("documents", selectedDocuments);
  }, [selectedDocuments]);

  const addTag = () => {
    if (tagInput && tagInput !== "") {
      if (!tags.includes(tagInput)) {
        setTags((tag) => [...tag, tagInput]);
        setTagInput("");
      }
    }
  };

  const removeTag = (value: string) =>
    setTags((tags) => tags.filter((tag) => value !== tag));

  const removeTarget = (value: number) =>
    setTargets((targets) => targets.filter((target) => value !== target.id));
  const removeCategory = (value: number) =>
    setCategories((categories) =>
      categories.filter((category) => value !== category.id)
    );

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
            className="flex flex-col gap-12"
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
            <div className="flex flex-col gap-4">
              <FormImageInput
                name="image"
                control={control}
                description="You can upload one image of following content types: jpg, up to 1 MB."
                setSelectedImage={setSelectedImage}
              />
              {/* IMAGE PREVIEW */}
              {selectedImage && (
                <div className="w-[150px]">
                  <p>Image preview</p>
                  <div className="relative h-[150px] w-[150px]">
                    <img
                      // src={URL.createObjectURL(selectedImage[0])}
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                    />
                    <IconWrapper
                      onClick={() => {
                        setSelectedImage(null);
                        setValue("image", undefined);
                      }}
                      className="absolute top-0 right-0 text-dark bg-primary p-0 h-fit w-fit cursor-pointer"
                    >
                      <CloseCircle size={20} />
                    </IconWrapper>
                  </div>
                </div>
              )}
            </div>

            {/* DOCUMENT  */}
            <div className="flex flex-col gap-4">
              <FormDocumentInput
                name="documents"
                control={control}
                description="You can upload up to a maximum of 3 documents of following content types: pdf, up to 3 MB per file."
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (selectedDocuments.length === 3) {
                      setError("documents", {
                        type: "manual",
                        message: "You can only upload 3 documents",
                      });
                    } else {
                      setSelectedDocuments((selectedDocuments) => [
                        ...selectedDocuments,
                        file,
                      ]);
                    }
                  }
                }}
              />
              {/* DOC PREVIEW */}
              {selectedDocuments.length > 0 && (
                <>
                  <p>Document preview</p>
                  <div className="flex justify-start items-center gap-3 flex-wrap">
                    {selectedDocuments.map((doc, index) => (
                      <div className="w-[200px] h-[200px] relative" key={index}>
                        <PdfPreview file={doc} />
                        <IconWrapper
                          onClick={() => {
                            setSelectedDocuments((selectedDocuments) =>
                              selectedDocuments.filter((docu) => docu !== doc)
                            );
                            trigger("documents");
                          }}
                          className="absolute top-0 right-0 text-dark bg-primary p-0 h-fit w-fit cursor-pointer"
                        >
                          <CloseCircle size={20} />
                        </IconWrapper>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* WARD */}
            {/* @ts-ignore */}
            <FormSelectWard control={control} name="ward_id" />

            {/* MAP */}
            <div>
              <h4 className="text-[14px] text-dark ">Map location</h4>
              <p className="text-subtle_text text-[14px]">
                Navigate the map to the location and place the marker
              </p>
            </div>

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
                  onClick={addTag}
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
                          onClick={() => removeTag(tag)}
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
                        Target <span>{target.code}</span>
                        <CloseCircle
                          size={18}
                          onClick={() => removeTarget(target.id)}
                          className="cursor-pointer"
                          variant="Bold"
                        />
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* CATEGORY */}
            <div>
              <FormSelectCategory setCategory={setCategory} />

              {categories.length > 0 && (
                <div className="my-4">
                  <h5>Categories</h5>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <Button
                        type="button"
                        className=" w-fit h-fit rounded-md bg-dark text-light hover:bg-dark flex justify-between items-center cursor-auto text-[14px] "
                        key={category.id}
                      >
                        <span>{category.name}</span>
                        <CloseCircle
                          size={18}
                          onClick={() => removeCategory(category.id)}
                          className="cursor-pointer"
                          variant="Bold"
                        />
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* SUPPORTS */}
            <FormInput
              name="support_needed"
              control={control}
              label="Support needed"
              type="number"
              onChange={(e) => {
                setValue("support_needed", Number(e.target.value));
              }}
            />
            <Button
              type="submit"
              className="w-full max-w-[400px] p-0 h-fit py-3"
              isLoading={isLoading}
            >
              Start A Proposal
            </Button>
          </form>
        </Form>
      </div>
    </DemocracyLayout>
  );
};

export default StartProposalPage;
