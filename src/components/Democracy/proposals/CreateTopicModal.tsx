import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import FormTextArea from "../common/FormTextArea";
import { FormInput } from "..";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { proposalTopicSchema } from "@/schemas/ProposalSchema";
import { usePublishProposalTopic } from "@/api/democracy/proposals";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

interface CreateTopicModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  propsalId: string;
  isEditing?: boolean;
  topicId?: string;
  title?: string;
  content?: string;
}

const CreateTopicModal: React.FC<CreateTopicModalProps> = ({
  isOpen,
  onOpenChange,
  onClose,
  propsalId,
  isEditing,
  topicId,
  title,
  content,
}) => {
  const { mutateAsync: publishTopic, isLoading: isPublishing } =
    usePublishProposalTopic();

  const form = useForm<z.infer<typeof proposalTopicSchema>>({
    resolver: zodResolver(proposalTopicSchema),
    defaultValues: {
      title: title ?? "",
      content: content ?? "",
      proposal_id: "",
      id: undefined,
    },
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof proposalTopicSchema>) {
    await publishTopic({ ...values, proposal_id: propsalId, id: topicId });
    onClose();
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[900px] w-[98%] px-1 md:px-6">
        <AlertDialogHeader className="justify-start text-left">
          <h1 className="text-[20px] text-dark">Create a Topic</h1>
          <div>
            <h4 className="text-[18px] -tracking-[0.48px] text-dark mb-2">
              Recommendations for creating a Topic
            </h4>
            <ul className="list-disc list-inside pl-3 text-subtle_text flex flex-col gap-2">
              <li className="text-[14px] -tracking-[0.32px] md:text-lg">
                Do not write the topic title or whole sentences in capital
                letters. On the internet that is considered shouting. And no one
                likes to be yelled at.
              </li>
              <li className="text-[14px] -tracking-[0.32px] md:text-lg">
                Any topic or comment that implies an illegal action will be
                eliminated, also those that intend to sabotage the spaces of the
                subject, everything else is allowed.
              </li>
              <li className="text-[14px] -tracking-[0.32px]  md:text-lg">
                Enjoy this space, the voices that fill it, it's yours too.
              </li>
            </ul>
          </div>
        </AlertDialogHeader>
        {/* FORM */}
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* TITLE */}
            <FormInput
              name="title"
              label="Topic title"
              control={control}
              errors={errors}
              placeholder="Enter title of the Topic "
            />
            {/* SUMMARY */}
            <FormTextArea
              name="content"
              label="Initial Text"
              control={control}
              errors={errors}
              rows={4}
            />
            <div className="flex gap-3 flex-wrap">
              <Button
                type="submit"
                className="w-full max-w-[150px] text-base p-1 h-fit py-3"
                isLoading={isPublishing}
                disabled={isPublishing}
              >
                {isEditing ? "Update topic" : "Create topic"}
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

export default CreateTopicModal;
