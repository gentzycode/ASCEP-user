import {
  CommentsPagination,
  FilterButtons,
  FormInput,
  InitiativeCommentCard,
  ProposalCommentCard,
} from "..";
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
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import {
  useGetInitiativeComments,
  usePublishInitiativeComment,
} from "@/api/democracy/initiatives";
import { initiativeCommentSchema } from "@/schemas/InitiativesSchema";
import { InitiativeCommentFilterButtonOptions } from "@/utils/Democracy/Initiatives";

interface InitiativeCommentsCardProps {}
const InitiativeComments: React.FC<InitiativeCommentsCardProps> = () => {
  const { isLoggedIn } = useAuthContext();
  const { initiativeId } = useParams();

  const { mutateAsync: publishComment, isLoading: isPublishingComment } =
    usePublishInitiativeComment();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("newest");

  const {
    data: commentsData,
    isLoading: isLoadingComments,
    isFetching: isFetchingComments,
    refetch: refetchComments,
  } = useGetInitiativeComments(initiativeId!, page, filter);

  const form = useForm<z.infer<typeof initiativeCommentSchema>>({
    resolver: zodResolver(initiativeCommentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      initiative_id: initiativeId!,
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof initiativeCommentSchema>) {
    await publishComment(values);
    if (commentsData) {
      reset();
    }
  }
  useEffect(() => {
    refetchComments();
  }, [page, filter]);
  
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

      {commentsData?.comments?.length !== 0 && (
        <FilterButtons
          filterButtonOptions={InitiativeCommentFilterButtonOptions}
          filterByButton={(value: string) => {
            setFilter(value);
            setPage(1);
          }}
        />
      )}
      {commentsData?.comments?.length === 0 && (
        <div>
          <h1 className="text-dark text-[16px] md:text-[20px]">
            This Initiative has no comments
          </h1>
        </div>
      )}
      {isLoadingComments && (
        <div className="w-full flex justify-center">
          <IconWrapper className=" text-primary my-10 w-fit h-full rounded-full">
            <FaSpinner className="animate-spin text-[100px]" />
          </IconWrapper>
        </div>
      )}

      {commentsData && commentsData.comments.length > 0 && (
        <div
          className={`${
            isFetchingComments
              ? "opacity-50 pointer-events-none"
              : "opacity-100"
          } flex flex-col gap-6`}
        >
          {commentsData.comments.map((comment: CommentType) => (
            <InitiativeCommentCard comment={comment} key={comment.id} />
          ))}

          <CommentsPagination
            meta={commentsData.meta}
            onPageChange={(page: number) => setPage(page)}
          />
        </div>
      )}
    </>
  );
};
export default InitiativeComments;
