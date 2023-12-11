import { DebateCommentCard, FilterButtons, FormInput } from "..";
import { debateFilterButtonOptions } from "@/utils/Democracy/Debates";
import { IconWrapper } from "@/components/custom";
import { CloseCircle, Danger } from "iconsax-react";
import { Link, useParams } from "react-router-dom";
import ROUTES from "@/utils/routesNames";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { useAuthContext } from "@/providers/AuthProvider";
import {
  useGetDebateComments,
  usePublishComment,
} from "@/api/democracy/debates";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { commentSchema } from "@/schemas/DebateSchema";

interface DebateCommentsCardProps {
  debate: DebateType;
}
const DebateComments: React.FC<DebateCommentsCardProps> = ({ debate }) => {
  const { mutateAsync: publishComment, isLoading: isPublishingComment } =
    usePublishComment();
  const { isLoggedIn } = useAuthContext();
  const [page] = useState(1);
  const { debateId } = useParams();

  const { data, isLoading: isLoadingComments } = useGetDebateComments(
    parseInt(debateId!),
    page
  );

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      debate_id: parseInt(debateId!),
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof commentSchema>) {
    await publishComment(values);
    if (data) {
      reset();
    }
  }

  return (
    <>
      {!isLoggedIn ? (
        <div className="flex items-center justify-between border-2 border-primary rounded-md p-2 bg-[#F59E0B]/10">
          <div className="flex justify-start items-center gap-1">
            <IconWrapper className="text-primary rounded-full">
              <Danger size="32" />
            </IconWrapper>
            <p className="text-[16px]">
              You must{" "}
              <Link to={ROUTES.SIGNIN_ROUTE} className="underline">
                sign in
              </Link>{" "}
              or{" "}
              <Link to={ROUTES.SIGNIN_ROUTE} className="underline">
                sign up
              </Link>{" "}
              to leave a comment.
            </p>
          </div>
          <Button className="bg-transparent hover:bg-transparent w-fit h-fit">
            <CloseCircle size="32" />
          </Button>
        </div>
      ) : (
        <div>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormInput
                label="Leave a comment"
                control={control}
                name="content"
                errors={errors}
              />

              <Button
                type="submit"
                className="w-fit"
                isLoading={isPublishingComment}
              >
                Publish Comment
              </Button>
            </form>
          </Form>
        </div>
      )}

      {data?.comments.length !== 0 && (
        <FilterButtons
          filterButtonOptions={debateFilterButtonOptions}
          filterByButton={() => {}}
        />
      )}
      {data?.comments.length === 0 && (
        <div>
          <h1 className="text-dark text-[16px] md:text-[20px]">
            This debate has no comments yet
          </h1>
        </div>
      )}
      <div className="w-full flex justify-center">
        {isLoadingComments && (
          <IconWrapper className=" text-primary my-10 w-fit h-full rounded-full">
            <FaSpinner className="animate-spin text-[100px]" />
          </IconWrapper>
        )}
      </div>
      {data && (
        <>
          {data.comments.map((comment: DebateCommentType) => (
            <DebateCommentCard comment={comment} key={comment.id} />
          ))}
        </>
      )}
    </>
  );
};
export default DebateComments;
