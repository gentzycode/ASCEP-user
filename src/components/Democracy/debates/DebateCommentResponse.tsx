import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CloseCircle } from "iconsax-react";
import { useState } from "react";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { debateCommentSchema } from "@/schemas/DebateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  usePublishDebateComment,
  useVoteDebateComment,
} from "@/api/democracy/debates";
import {
  CommentCardFooter,
  CommentCardHeader,
  FormInput,
  VoteCommentButtons,
} from "..";
import { IconWrapper } from "@/components/custom";
import { useClickAway } from "@uidotdev/usehooks";

interface DebateCommentResponseProps {
  response: CommentType;
  paddingLeft: number;
}
const DebateCommentResponse: React.FC<DebateCommentResponseProps> = ({
  response,
  paddingLeft,
}) => {
  const { debateId } = useParams();

  const { mutateAsync: publishResponse, isLoading: isPublishingComment } =
    usePublishDebateComment();

  const { mutate: voteComment, isLoading: isVotingComment } =
    useVoteDebateComment();

  const [showResponse, setShowResponse] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

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
      comment_reference: response.id,
    });
    closeResponse();
  }

  const closeResponse = () => {
    reset();
    setIsReplying(false);
  };

  return (
    <>
      <div ref={ref}>
        <Separator orientation="horizontal" className="bg-base-500 my-1" />
        <div
          className={`pl-[${paddingLeft}px]`}
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          <CommentCardHeader
            username={response.author.username}
            content={response.content}
            createdAt={response.createdAt}
            profilePicture={response.author.profile_picture}
          />

          {/* FOOTER */}
          <div className="flex justify-between items-center flex-wrap-reverse gap-2">
            <CommentCardFooter
              numberOfResponses={0}
              setIsReplying={setIsReplying}
              setShowResponse={setShowResponse}
              showResponse={showResponse}
              fetchResponse={() => {}}
              isLoadingResponses={false}
              loading={false}
            />
            <VoteCommentButtons
              dislikeComment={() =>
                voteComment({ type: "dislike", comment_id: response.id })
              }
              likeComment={() =>
                voteComment({ type: "like", comment_id: response.id })
              }
              dislikes={response.dislikes}
              isVoting={isVotingComment}
              likes={response.likes}
              reactionType={response.userVoted.reactionType}
            />
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
                    className="h-8 focus-visible:ring-primary focus-visible:ring-1 rounded-full focus-visible:ring-offset-0"
                  />

                  <div className="flex justify-between items-center">
                    <Button
                      type="submit"
                      className="w-fit h-fit text-[12px] font-[500]"
                      isLoading={isPublishingComment}
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
        </div>

        <div className={` ${showResponse ? "" : "h-0  overflow-hidden"}`}>
          {response?.responses?.map((response) => (
            <DebateCommentResponse
              key={response.response_id}
              response={response}
              paddingLeft={paddingLeft + 20}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DebateCommentResponse;
