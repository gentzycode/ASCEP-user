import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formattedDate } from "@/utils/helper";
import {
  AddSquare,
  CloseCircle,
  Dislike,
  Flag,
  Like1,
  MinusSquare,
} from "iconsax-react";
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
import { CommentCard, DebateCommentResponse, FormInput } from "..";
import { IconWrapper } from "@/components/custom";
import { useClickAway } from "@uidotdev/usehooks";

interface DebateCommentCardProps {
  comment: CommentType;
}
const DebateCommentCard: React.FC<DebateCommentCardProps> = ({ comment }) => {
  const [dynamicPadding] = useState(24);

  const { mutateAsync: publishResponse, isLoading: isPublishingComment } =
    usePublishDebateComment();
  const { mutate: voteComment, isLoading: isVotingComment } =
    useVoteDebateComment();
  const { debateId } = useParams();
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
      debate_id: parseInt(debateId!),
      comment_reference: comment.id,
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof debateCommentSchema>) {
    await publishResponse(values);
    closeResponse();
  }

  const closeResponse = () => {
    reset();
    setIsReplying(false);
  };

  return (
    <div className="bg-[#fff] p-6 rounded-xl" ref={ref}>
      <CommentCard
        comment={comment}
        isVotingComment={isVotingComment}
        likeComment={() =>
          voteComment({ type: "like", comment_id: comment.id })
        }
        dislikeComment={() =>
          voteComment({ type: "dislike", comment_id: comment.id })
        }
        setIsReplying={setIsReplying}
        setShowResponse={setShowResponse}
        showResponse={showResponse}
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

      {/* RESPONSE */}
      <div
        className={` ${
          showResponse ? "" : "h-0  overflow-hidden"
        } duration-300`}
      >
        {comment.responses.map((response) => (
          <DebateCommentResponse
            key={response.response_id}
            response={response}
            paddingLeft={dynamicPadding + 20}
          />
        ))}
      </div>
    </div>
  );
};
export default DebateCommentCard;
