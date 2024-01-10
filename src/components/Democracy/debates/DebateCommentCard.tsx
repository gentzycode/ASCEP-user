import { Button } from "@/components/ui/button";
import { CloseCircle } from "iconsax-react";
import React, { useState } from "react";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { debateCommentSchema } from "@/schemas/DebateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useGetDebateCommentResponses,
  usePublishDebateComment,
  useVoteDebateComment,
} from "@/api/democracy/debates";
import { CommentCard, DebateCommentResponse, FormInput } from "..";
import { IconWrapper } from "@/components/custom";
import { useClickAway } from "@uidotdev/usehooks";
import { Separator } from "@/components/ui/separator";

interface DebateCommentCardProps {
  comment: CommentType;
}

const DebateCommentCard: React.FC<DebateCommentCardProps> = ({ comment }) => {
  const [dynamicPadding] = useState(20);

  const { debateId } = useParams();

  const [showResponse, setShowResponse] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const { mutateAsync: publishResponse, isLoading: isPublishingComment } =
    usePublishDebateComment();

  const {
    data: Data,
    isRefetching: isLoadingResponses,
    refetch: getResponses,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetDebateCommentResponses(comment.id);

  const { mutate: voteComment, isLoading: isVotingComment } =
    useVoteDebateComment();

  // CLose responses on click away
  const ref = useClickAway<HTMLDivElement>(() => {
    setTimeout(() => {
      setIsReplying(false);
      setShowResponse(false);
    }, 500);
  });

  const form = useForm<z.infer<typeof debateCommentSchema>>({
    resolver: zodResolver(debateCommentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      debate_id: "",
      comment_reference: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof debateCommentSchema>) {
    await publishResponse({
      ...values,
      debate_id: debateId!,
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
                className="h-8 rounded-full focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-0"
              />

              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  className="w-fit h-fit text-[12px] font-[500]"
                  isLoading={isPublishingComment}
                  disabled={isPublishingComment}
                >
                  Publish response
                </Button>
                <IconWrapper
                  className="p-0 cursor-pointer text-dark"
                  onClick={closeResponse}
                >
                  <CloseCircle size={20} />
                </IconWrapper>
              </div>
            </form>
          </Form>
        </div>
      )}

      <div
        className={`${showResponse ? "" : "h-0  overflow-hidden"} ${
          isLoadingResponses && "opacity-50 pointer-events-none"
        }`}
      >
        {Data?.pages.map((commentsData, i) => (
          <div key={i}>
            {commentsData.comments.map((response) => (
              <DebateCommentResponse
                key={response.id}
                response={response}
                paddingLeft={dynamicPadding + 20}
              />
            ))}
          </div>
        ))}
        <Separator orientation="horizontal" className="my-1 bg-base-500" />
        {Data?.pages[Data.pages.length - 1].meta.next_page_url && (
          <Button
            className="w-full py-4 -mb-5 bg-transparent h-fit hover:bg-transparent"
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
export default DebateCommentCard;
