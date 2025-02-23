import { PageLoader, Pagination } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/providers/AuthProvider";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import {
  DebateCommentCard,
  FilterButtons,
  FormInput,
  LoginSigninPrompt,
} from "..";
import { commentFilterButtonOptions } from "@/utils/Democracy/General";
import {
  useGetDebateComments,
  usePublishDebateComment,
} from "@/api/democracy/debates";
import { useEffect, useState } from "react";
import { debateCommentSchema } from "@/schemas/DebateSchema";

interface DebateCommentSectionProp {}
const DebateCommentSection: React.FC<DebateCommentSectionProp> = () => {
  const { isLoggedIn } = useAuthContext();
  const { debateId } = useParams();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("newest");

  const { mutateAsync: publishComment, isLoading: isPublishingComment } =
    usePublishDebateComment();

  const {
    data: commentsData,
    isLoading: isLoadingComments,
    refetch,
    isFetching: isFetchingComments,
  } = useGetDebateComments(debateId!, page, filter);

  const form = useForm<z.infer<typeof debateCommentSchema>>({
    resolver: zodResolver(debateCommentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      debate_id: debateId,
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof debateCommentSchema>) {
    await publishComment(values);
    if (commentsData) {
      reset();
    }
  }
  
  useEffect(() => {
    refetch();
  }, [page, filter]);

  return (
    <>
      {/*COMMENTS */}
      <div className="w-full">
        <h2 className="pb-2 mb-4 pt-0 pl-0 border-b-4 text-lg text-text font-medium border-primary w-fit">
          Comments
        </h2>
      </div>
      {!isLoggedIn ? (
        <LoginSigninPrompt />
      ) : (
        <div>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 max-w-[900px]"
            >
              <FormInput
                label="Leave a comment"
                control={control}
                name="content"
                errors={errors}
              />
              <Button
                type="submit"
                className="w-full max-w-[200px] h-12"
                isLoading={isPublishingComment}
                disabled={isPublishingComment}
              >
                Publish Comment
              </Button>
            </form>
          </Form>
        </div>
      )}

      {/* FILTER BUTTONS */}
      <div className="my-8">
        <FilterButtons
          filterButtonOptions={commentFilterButtonOptions}
          filterByButton={(value: string) => {
            setFilter(value);
            setPage(1);
          }}
          isFiltering={isFetchingComments}
          defaultFilterButtonValue="newest"
        />
      </div>

      {/* LOADING */}
      {isLoadingComments && <PageLoader />}
      {commentsData?.comments?.length === 0 && (
        <div>
          <h1 className="text-text text-base md:text-xl">
            This debate has no comments yet
          </h1>
        </div>
      )}

      {commentsData && commentsData.comments.length > 0 && (
        <div
          className={`${
            isFetchingComments
              ? "opacity-50 pointer-events-none"
              : "opacity-100 "
          } flex flex-col gap-6`}
        >
          {commentsData.comments.map((comment: CommentType) => (
            <DebateCommentCard comment={comment} key={comment.id} />
          ))}

          {/* PAGINATION */}
          <Pagination
            page={page}
            setPage={setPage}
            paginationData={commentsData.meta}
            isFetching={isFetchingComments}
          />
        </div>
      )}
    </>
  );
};

export default DebateCommentSection;
