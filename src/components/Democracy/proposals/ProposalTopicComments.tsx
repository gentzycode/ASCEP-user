import {
  FilterButtons,
  FormInput,
  LoginSigninPrompt,
  ProposalTopicCommentCard,
} from "..";
import { debateCommentFilterButtonOptions } from "@/utils/Democracy/Debates";
import { IconWrapper, PageLoader, Pagination } from "@/components/custom";
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
import {
  useGetProposalTopicComments,
  usePublishProposalTopicComment,
} from "@/api/democracy/proposals";
import { proposalTopicCommentSchema } from "@/schemas/ProposalSchema";

interface ProposalTopicCommentsCardProps {}
const ProposalTopicComments: React.FC<ProposalTopicCommentsCardProps> = () => {
  const { isLoggedIn } = useAuthContext();
  const { topicId } = useParams();

  const { mutateAsync: publishComment, isLoading: isPublishingComment } =
    usePublishProposalTopicComment();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("newest");

  const {
    data: commentsData,
    isLoading: isLoadingComments,
    isFetching: isFetchingComments,
    refetch: refetchComments,
  } = useGetProposalTopicComments(topicId!, page, filter);

  const form = useForm<z.infer<typeof proposalTopicCommentSchema>>({
    resolver: zodResolver(proposalTopicCommentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      proposal_topic_id: topicId!,
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof proposalTopicCommentSchema>) {
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
        <LoginSigninPrompt />
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

      {commentsData?.comments?.length !== 0 && (
        <FilterButtons
          filterButtonOptions={debateCommentFilterButtonOptions}
          filterByButton={(value: string) => {
            setFilter(value);
            setPage(1);
          }}
          defaultFilterButtonValue="newest"
          isFiltering={isFetchingComments}
        />
      )}
      {commentsData?.comments?.length === 0 && (
        <div>
          <h1 className="text-dark text-[16px] md:text-[20px]">
            This Topic has no comments
          </h1>
        </div>
      )}
      {isLoadingComments && <PageLoader />}

      {commentsData && commentsData.comments.length > 0 && (
        <div
          className={`${
            isFetchingComments
              ? "opacity-50 pointer-events-none"
              : "opacity-100"
          } flex flex-col gap-6`}
        >
          {commentsData.comments.map((comment: CommentType) => (
            <ProposalTopicCommentCard comment={comment} key={comment.id} />
          ))}

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
export default ProposalTopicComments;
