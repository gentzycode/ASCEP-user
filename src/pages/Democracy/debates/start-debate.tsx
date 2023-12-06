import DemocracyLayout from "@/layouts/DemocracyLayout";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startDebateSchema } from "@/schemas/DebateSchema";
import { FormInput, TextEditor } from "@/components/Democracy";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CloseCircle } from "iconsax-react";
import { Link } from "react-router-dom";
import { SDG_Options } from "@/utils/Democracy/Images";
import { Checkbox } from "@/components/ui/checkbox";

interface StartDebateProps {}

const StartDebate: React.FC<StartDebateProps> = () => {
  const [topics, setTopics] = useState<{ topic: string; id: string }[] | []>(
    []
  );
  const [sdg, setSdg] = useState<SdgOptionsType[] | []>([]);
  const form = useForm<z.infer<typeof startDebateSchema>>({
    resolver: zodResolver(startDebateSchema),
  });
  const {
    trigger,
    setValue,
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof startDebateSchema>) {
    console.log(values);
  }
  useEffect(() => {
    register("text");
  }, [register]);

  useEffect(() => {
    const sdgValue = sdg.map((item) => item.value).join(",");
    setValue("sdg", sdgValue);
  }, [sdg]);

  useEffect(() => {
    const Value = topics.map((item) => item.topic).join(",");
    setValue("topics", Value);
  }, [topics]);

  const onEditorStateChange = (text: any) => {
    setValue("text", text);
  };

  const addTopic = () => {
    const topic = watch("topics");
    if (topic !== "") {
      trigger("topics").then((isValid) => {
        if (isValid) {
          const value = topic?.split(",").pop()?.trim() as string;
          const check = topics.find((topic) => topic.topic === value);
          if (!check) {
            const id = uuidv4();
            setTopics((topics) => [...topics, { topic: value, id }]);
          }
        }
      });
    }
  };

  const removeTopic = (id: string) =>
    setTopics((topics) => topics.filter((topic) => topic.id !== id));

  const editorContent = watch("text");

  return (
    <DemocracyLayout>
      <div className="flex flex-col gap-8 max-w-[800px]">
        {/* HEADING */}
        <div>
          <h1 className="text-[20px] md:text-[36px] text-dark">
            Start a Debate
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
            <FormInput
              name="title"
              label="Debate title"
              control={control}
              errors={errors}
              placeholder="Enter title of the debate "
            />
            <TextEditor
              name="text"
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
            <div>
              <div className="flex gap-2 items-end">
                <FormInput
                  name="topics"
                  label="Topics"
                  control={control}
                  errors={errors}
                  placeholder="Enter the tags you would like to use separated with commas (‘,’)"
                />

                <Button
                  className="w-fit h-fit rounded-md"
                  type="button"
                  onClick={addTopic}
                >
                  Add tag
                </Button>
              </div>
              {topics.length > 0 && (
                <div className="my-4">
                  <h5>Tags</h5>
                  <div className="flex gap-2 flex-wrap">
                    {topics.map((topic) => (
                      <Button
                        type="button"
                        className=" w-fit h-fit rounded-md bg-dark text-light hover:bg-dark flex justify-between items-center cursor-auto text-[14px] "
                        key={topic.id}
                      >
                        <span>{topic.topic}</span>
                        <CloseCircle
                          size={18}
                          onClick={() => removeTopic(topic.id)}
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
                {SDG_Options.map((item) => (
                  <div
                    className="h-fit p-0 flex justify-start relative overflow-hidden"
                    key={item.id}
                  >
                    <Checkbox
                      className="border-dark absolute top-0 left-0 w-full h-full border-transparent  
                        opacity-60 checked:bg-primary appearance-none rounded-lg
                      "
                      onCheckedChange={(checked) => {
                        return checked
                          ? setSdg((values) => [...values, { ...item }])
                          : setSdg((values) => {
                              return values.filter(
                                (value) => value.id !== item.id
                              );
                            });
                      }}
                    />
                    <img src={item.image} alt={item.value.toString()} />
                  </div>
                ))}
              </div>
              <p className="text-[14px] md:text-[16px] text-subtle_text -tracking-[0.36px] my-2">
                You can introduce the code of a specific goal/target or a text
                to find one. For more information visit the
                <Link to="#" className="text-primary ml-1">
                  SDG help page.
                </Link>
              </p>
            </div>

            <Button
              type="submit"
              className="w-full max-w-[400px] p-0 h-fit py-3"
            >
              Start A Debate
            </Button>
          </form>
        </Form>
      </div>
    </DemocracyLayout>
  );
};

export default StartDebate;
