import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AnswerOptions, FormInput, FormSelecteResponseType } from "..";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { publishPollingQuestionSchema } from "@/schemas/VotingSchema";
import { usePublishPollQuestion } from "@/api/democracy/voting";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing?: boolean;
  question?: VotingQuestionsType;
}

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  isOpen,
  onClose,
  isEditing,
  question,
}) => {
  const [options, setOptions] = useState<string[]>(
    question?.options ? [...question.options] : []
  );

  const { pollId } = useParams();

  const { mutateAsync: publishPollQuestion, isLoading: isPublishing } =
    usePublishPollQuestion();

  const form = useForm<z.infer<typeof publishPollingQuestionSchema>>({
    resolver: zodResolver(publishPollingQuestionSchema),
    defaultValues: {
      question: question?.question ?? "",
      voting_id: pollId!,
      response_type: question?.response_type ?? undefined,
      options: [],
      id: question?.id ? String(question?.id) : undefined,
    },
  });

  const {
    reset,
    setValue,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = form;

  useEffect(() => {
    setValue("options", options);
    if (options.length > 0) {
      trigger("options");
    }
  }, [options]);

  async function onSubmit(
    values: z.infer<typeof publishPollingQuestionSchema>
  ) {
    const formData = new FormData();
    formData.append("question", values.question!);
    formData.append("response_type", values.response_type!);
    formData.append("voting_id", values.voting_id!);
    if (values.options && values.options.length > 0) {
      values.options.forEach((option, index) => {
        formData.append(`options[${index}]`, option);
      });
    }
    if (isEditing) {
      formData.append("id", values.id!);
    }
    await publishPollQuestion(formData);
    handleCloseModal();
  }
  const handleCloseModal = () => {
    reset();
    onClose();
    setOptions([]);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-[600px] w-[98%] px-3 md:px-6">
        <AlertDialogHeader className="justify-start text-left">
          <h1 className="text-lg text-dark">Create question for poll</h1>
        </AlertDialogHeader>
        {/* FORM */}
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            id="publish question"
          >
            {/* TITLE */}
            <FormInput
              name="question"
              label="Question"
              control={control}
              errors={errors}
              placeholder=""
            />

            {/* RESPONSE TYPE */}
            <FormSelecteResponseType
              control={control}
              name="response_type"
              label="Answer type"
              errors={errors}
            />

            {/* ANSWERS */}
            <AnswerOptions
              options={options}
              setOptions={setOptions}
              error={errors.options?.message ?? null}
            />

            <div className="flex gap-3 flex-wrap">
              <Button
                type="submit"
                className="w-full max-w-[150px] text-base p-1 h-fit py-3"
                isLoading={isPublishing}
                disabled={isPublishing}
              >
                {isEditing ? "Update question" : "Save"}
              </Button>
              <Button
                className="w-full max-w-[150px] text-base p-0 h-fit py-3 bg-transparent border border-primary"
                onClick={() => {
                  onClose();
                  reset();
                }}
                type="button"
                disabled={isPublishing}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddQuestionModal;
