import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { pollQuestionAnswerSchema } from "@/schemas/VotingSchema";
import { useParams } from "react-router-dom";
import { usePublishQuestionAnswers } from "@/api/democracy/voting";
import { TickSquare } from "iconsax-react";

interface SingleAnswerQuestionProp {
  questions: VotingQuestionsType;
}
const SingleAnswerQuestion: React.FC<SingleAnswerQuestionProp> = ({
  questions,
}) => {
  const { pollId } = useParams();
  const { options, question, id, userAnswered } = questions;

  const { mutateAsync: publishAnswer, isLoading: isPublishingAnswer } =
    usePublishQuestionAnswers();

  const form = useForm<z.infer<typeof pollQuestionAnswerSchema>>({
    resolver: zodResolver(pollQuestionAnswerSchema),
    defaultValues: {
      voting_id: "",
      question_id: "",
      selected_option: userAnswered?.response?.answer[0] ?? "",
    },
  });

  function onSubmit(data: z.infer<typeof pollQuestionAnswerSchema>) {
    publishAnswer({ ...data, question_id: id, voting_id: pollId! });
  }

  const selected = (option: string) =>
    userAnswered?.response?.answer.includes(option);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 relative"
      >
        <FormField
          control={form.control}
          name="selected_option"
          render={() => (
            <FormItem>
              <div className="mb-5">
                <h4 className="text-text text-base md:text-lg  flex items-center gap-2">
                  {question}
                </h4>
              </div>
              <div className="flex justify-start items-center gap-2 flex-wrap my-2">
                {options.map((item, i) => (
                  <FormField
                    key={i}
                    control={form.control}
                    name="selected_option"
                    render={({ field }) => {
                      return (
                        <FormItem key={i}>
                          <FormControl>
                            <div
                              className={`bg-transparent flex justify-center gap-2 py-3 rounded-xl border text-text border-dark min-w-[150px] whitespace-normal h-fit relative ${
                                selected(item) && "!bg-primary"
                              }`}
                            >
                              <Checkbox
                                checked={userAnswered?.response?.answer?.includes(
                                  item
                                )}
                                onCheckedChange={(checked: boolean) => {
                                  return checked
                                    ? field.onChange(item)
                                    : field.onChange(item);
                                }}
                                className="absolute top-0 left-0 w-full h-full !appearance-none !text-transparent !bg-transparent"
                                type="submit"
                                disabled={isPublishingAnswer}
                              />
                              <Button
                                className="text-sm text-text h-4 w-fit p-0 bg-transparent "
                                isLoading={isPublishingAnswer}
                              >
                                {item}
                                {userAnswered?.response?.answer?.includes(
                                  item
                                ) && <TickSquare size="20" color="green" />}
                              </Button>
                            </div>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SingleAnswerQuestion;
