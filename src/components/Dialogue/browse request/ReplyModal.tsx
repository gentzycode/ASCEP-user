import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useCreateRequestResponse } from "@/api/dialogue/requests";
import { IconWrapper } from "@/components/custom";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { CreateRequestResponseSchema } from "@/schemas/MakeARequestSchema";
import { CloseCircle } from "iconsax-react";
import { useParams } from "react-router-dom";
import { FormTextArea } from "@/components/Democracy";
import { Button } from "@/components/ui/button";

interface ReplyModalProp {
  isOpen: boolean;
  onClose: () => void;
}

const ReplyModal: React.FC<ReplyModalProp> = ({ isOpen, onClose }) => {
  const { mutateAsync: createResponse, isLoading } = useCreateRequestResponse();
  const { requestId } = useParams();
  const form = useForm<z.infer<typeof CreateRequestResponseSchema>>({
    resolver: zodResolver(CreateRequestResponseSchema),
    defaultValues: {
      content: "",
      request_id: "",
    },
  });
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof CreateRequestResponseSchema>) {
    const formData = new FormData();
    formData.append("content", values.content);
    formData.append("request_id", requestId!);
    await createResponse(formData);
    onClose();
  }
  return (
    <div>
      <AlertDialog open={isOpen}>
        <AlertDialogContent className="max-w-[700px] w-[98%] px-1 md:px-6">
          <IconWrapper
            className="absolute top-0 right-0 bg-transparent cursor-pointer"
            onClick={() => {
              onClose();
              reset();
            }}
          >
            <CloseCircle />
          </IconWrapper>
          {/* FORM */}
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* TITLE */}
              <FormTextArea
                name="content"
                label="Write reply"
                control={control}
                errors={errors}
                placeholder="Enter reply "
                rows={4}
              />
              <div className="flex gap-3 flex-wrap">
                <Button
                  type="submit"
                  className="w-full max-w-[150px] text-base p-1 h-12 py-3"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Send reply
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReplyModal;
