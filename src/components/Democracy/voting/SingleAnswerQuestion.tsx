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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { singleAnswerQuestionSchema } from "@/schemas/VotingSchema";
import { useParams } from "react-router-dom";

interface SingleAnswerQuestionProp {
  questions: VotingQuestionsType;
}
const SingleAnswerQuestion: React.FC<SingleAnswerQuestionProp> = ({
  questions,
}) => {
  const { pollId } = useParams();

  const { options, question, id } = questions;

  const form = useForm<z.infer<typeof singleAnswerQuestionSchema>>({
    resolver: zodResolver(singleAnswerQuestionSchema),
    defaultValues: {
      voting_id: "",
      question_id: "",
      selected_option: "",
    },
  });

  function onSubmit(data: z.infer<typeof singleAnswerQuestionSchema>) {
    console.log({ ...data, question_id: id, voting_id: pollId });
  }

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
                <h4 className="text-text text-base md:text-lg  ">{question}</h4>
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
                            <div className="bg-transparent flex justify-center py-3 rounded-xl border text-text border-dark min-w-[150px] whitespace-normal h-fit relative has-[:checked]:bg-primary">
                              <Checkbox
                                checked={field.value === item}
                                onCheckedChange={(checked: boolean) => {
                                  return checked
                                    ? field.onChange(item)
                                    : field.onChange("");
                                }}
                                className="absolute top-0 left-0 w-full h-full !appearance-none !text-transparent !bg-transparent"
                              />
                              <FormLabel className="text-sm text-text">
                                {item}
                              </FormLabel>
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
        <Button
          type="submit"
          className="w-full max-w-[150px] text-text text-base py-2 h-fit px-3"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SingleAnswerQuestion;
