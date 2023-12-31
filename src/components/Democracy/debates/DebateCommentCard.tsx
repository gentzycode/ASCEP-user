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
      <div className="flex flex-wrap items-center justify-start gap-6 my-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/images/avatar.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h2 className="text-dark text-[14px] -ml-4">
          {comment.author.username}
        </h2>
        <p className="text-[12px] text-base-400 my-3 ">
          {formattedDate(comment.createdAt)}
        </p>
      </div>
      <p className="pb-2 border-b-2 border-base-500 text-base-500">
        {comment.content}
      </p>

      {/* FOOTER */}
      <div className="flex flex-wrap-reverse items-center justify-between gap-2 py-2">
        <div className="flex flex-wrap items-center justify-start gap-2">
          <Button
            className="bg-transparent hover:bg-transparent h-fit w-fit p-0  text-[14px]"
            onClick={() => setShowResponse(!showResponse)}
          >
            {showResponse ? <MinusSquare size={25} /> : <AddSquare size={25} />}
            <span>{comment.responses.length} responses</span>
          </Button>

          <Separator
            orientation="vertical"
            className="h-5 text-dark bg-base-500"
          />

          <Button
            className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]"
            onClick={() => setIsReplying(true)}
          >
            Reply
          </Button>

          <Separator
            orientation="vertical"
            className="h-5 text-dark bg-base-500"
          />

          <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
            <Flag size="25" />
          </Button>

          <Separator
            orientation="vertical"
            className="h-5 text-dark bg-base-500"
          />
          <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
            Hide
          </Button>
          <Separator
            orientation="vertical"
            className="h-5 text-dark bg-base-500"
          />
          <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
            Block Author
          </Button>
        </div>

        <div className="flex items-center justify-start gap-2">
          <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
            13 Votes
          </Button>
          <Separator
            orientation="vertical"
            className="h-5 text-dark bg-base-500"
          />
          <Button className="text-[#31D0AA] gap-1 bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
            <Like1 variant="Bold" /> <span>{comment.dislikes}</span>
          </Button>
          <Button className="text-[#E43F40] gap-1 bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
            <Dislike variant="Bold" /> <span>{comment.dislikePercentage}</span>
          </Button>
        </div>
      </div>

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
