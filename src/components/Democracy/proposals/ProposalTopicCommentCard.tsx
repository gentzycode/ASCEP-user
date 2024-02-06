import { Button } from "@/components/ui/button";
import { CloseCircle } from "iconsax-react";
import { useState } from "react";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CommentCard, FormInput, ProposalTopicCommentResponse } from "..";
import { IconWrapper } from "@/components/custom";
import { useClickAway } from "@uidotdev/usehooks";
import {
  useGetProposalTopicCommentResponses,
  usePublishProposalTopicComment,
  useVoteProposalTopicComment,
} from "@/api/democracy/proposals";
import { proposalTopicCommentSchema } from "@/schemas/ProposalSchema";
import { Separator } from "@/components/ui/separator";

interface ProposalTopicCommentCardProps {
  comment: CommentType;
}
const ProposalTopicCommentCard: React.FC<ProposalTopicCommentCardProps> = ({
  comment,
}) => {
  const [dynamicPadding] = useState(24);
  const { topicId } = useParams();
  const [showResponse, setShowResponse] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const { mutateAsync: publishResponse, isLoading: isPublishingComment } =
    usePublishProposalTopicComment();

  const {
    data: Data,
    isRefetching: isLoadingResponses,
    refetch: getResponses,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetProposalTopicCommentResponses(comment.id);

  const { mutate: voteComment, isLoading: isVotingComment } =
    useVoteProposalTopicComment();

  // CLose responses on click away
  const ref = useClickAway<HTMLDivElement>(() => {
    setTimeout(() => {
      setIsReplying(false);
      setShowResponse(false);
    }, 500);
  });

  const form = useForm<z.infer<typeof proposalTopicCommentSchema>>({
    resolver: zodResolver(proposalTopicCommentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      proposal_topic_id: "",
      comment_reference: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof proposalTopicCommentSchema>) {
    await publishResponse({
      ...values,
      proposal_topic_id: topicId!,
      comment_reference: comment.id,
    });
    closeResponse();
  }

  //close response
  const closeResponse = () => {
    reset();
    setIsReplying(false);
  };

  // like comment
  const handleLike = () => {
    voteComment({ type: "like", comment_id: comment.id });
  };

  // dislike comment
  const handleDislike = () => {
    voteComment({ type: "dislike", comment_id: comment.id });
  };

  return (
    <div className="bg-[#fff] p-6 rounded-xl" ref={ref}>
      <CommentCard
        comment={comment}
        setIsReplying={setIsReplying}
        setShowResponse={setShowResponse}
        showResponse={showResponse}
        getResponses={getResponses}
        isLoadingResponses={isLoadingResponses}
        isVotingComment={isVotingComment}
        handleLike={handleLike}
        handleDislike={handleDislike}
      />

      {/* REPLY INPUT */}
      {isReplying && (
        <div>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormInput
                label="Leave a response"
                control={control}
                name="content"
                errors={errors}
                className="h-8 focus-visible:ring-primary focus-visible:ring-1 rounded-full focus-visible:ring-offset-0"
              />

              <div className="flex justify-between items-center">
                <Button
                  type="submit"
                  className="w-full max-w-[200px] h-10"
                  isLoading={isPublishingComment}
                  disabled={isPublishingComment}
                >
                  Publish response
                </Button>
                <IconWrapper
                  className="text-dark p-0 cursor-pointer"
                  onClick={closeResponse}
                >
                  <CloseCircle size={20} />
                </IconWrapper>
              </div>
            </form>
          </Form>
        </div>
      )}

      {/* RESPONSE */}
      <div
        className={`${showResponse ? "" : "h-0  overflow-hidden"} ${
          isLoadingResponses && "opacity-50 pointer-events-none"
        }`}
      >
        {Data?.pages.map((commentsData, i) => (
          <div key={i}>
            {commentsData.comments.map((response) => (
              <ProposalTopicCommentResponse
                key={response.id}
                response={response}
                paddingLeft={dynamicPadding + 10}
                refetchParentResponses={getResponses}
              />
            ))}
          </div>
        ))}
        <Separator orientation="horizontal" className="bg-base-500 my-1" />
        {Data?.pages[Data.pages.length - 1].meta.next_page_url && (
          <Button
            className="w-full h-fit bg-transparent py-4 hover:bg-transparent -mb-5"
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
          >
            Load more
          </Button>
        )}
      </div>
    </div>
  );
};
export default ProposalTopicCommentCard;
