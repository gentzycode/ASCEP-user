import { PageLoader, Pagination } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/providers/AuthProvider";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import {
  FilterButtons,
  FormInput,
  LoginSigninPrompt,
  ProposalCommentCard,
} from "..";
import { commentFilterButtonOptions } from "@/utils/Democracy/General";
import { useEffect, useState } from "react";
import {
  useGetProposalComments,
  usePublishProposalComment,
} from "@/api/democracy/proposals";
import { proposalCommentSchema } from "@/schemas/ProposalSchema";

interface ProposalCommentSectionProp {}

const ProposalCommentSection: React.FC<ProposalCommentSectionProp> = () => {
  const { isLoggedIn } = useAuthContext();
  const { proposalId } = useParams();

  const { mutateAsync: publishComment, isLoading: isPublishingComment } =
    usePublishProposalComment();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("newest");

  const {
    data: commentsData,
    isLoading: isLoadingComments,
    refetch,
    isFetching: isFetchingComments,
  } = useGetProposalComments(proposalId!, page, filter);

  const form = useForm<z.infer<typeof proposalCommentSchema>>({
    resolver: zodResolver(proposalCommentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      proposal_id: proposalId!,
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof proposalCommentSchema>) {
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
                className="w-full max-w-[200px] h-10"
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
          <h1 className="text-dark text-[16px] md:text-[20px]">
            This Proposal has no comments yet
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
            <ProposalCommentCard comment={comment} key={comment.id} />
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

export default ProposalCommentSection;
