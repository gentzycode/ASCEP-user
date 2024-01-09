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
  question: questionToEdit,
}) => {
  const [options, setOptions] = useState<string[]>([]);

  const { pollId } = useParams();

  const { mutateAsync: publishPollQuestion, isLoading: isPublishing } =
    usePublishPollQuestion();

  const form = useForm<z.infer<typeof publishPollingQuestionSchema>>({
    resolver: zodResolver(publishPollingQuestionSchema),
    defaultValues: {
      question: "",
      voting_id: pollId!,
      response_type: undefined,
      options: [],
      id: undefined,
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
    if (options.length > 0) {
      setValue("options", options);
      trigger("options");
    }
  }, [options]);

  useEffect(() => {
    if (questionToEdit) {
      const { id, options, response_type, voting_id, question } =
        questionToEdit;
      setValue("options", options);
      setValue("question", question);
      setValue("response_type", response_type);
      setValue("voting_id", String(voting_id));
      setValue("id", String(id));
      setOptions(options);
    }
  }, []);

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
  const cancelEditing = () => {
    onClose();
  };
  const handleCloseModal = () => {
    reset();
    setOptions([]);
    onClose();
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
                className="w-full max-w-[150px] text-base h-12"
                isLoading={isPublishing}
                disabled={isPublishing}
              >
                {isEditing ? "Update question" : "Save"}
              </Button>
              <Button
                className="w-full max-w-[150px] text-base p-0 h-12 bg-transparent border border-primary"
                onClick={cancelEditing}
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
