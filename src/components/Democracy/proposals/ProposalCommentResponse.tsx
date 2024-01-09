import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CloseCircle } from "iconsax-react";
import { useState } from "react";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  CommentCardFooter,
  CommentCardHeader,
  FormInput,
  VoteCommentButtons,
} from "..";
import { IconWrapper } from "@/components/custom";
import { useClickAway } from "@uidotdev/usehooks";
import { proposalCommentSchema } from "@/schemas/ProposalSchema";
import { usePublishProposalComment } from "@/api/democracy/proposals";

interface ProposalCommentResponseProps {
  response: CommentType;
  paddingLeft: number;
}
const ProposalCommentResponse: React.FC<ProposalCommentResponseProps> = ({
  response,
  paddingLeft,
}) => {
  const { proposalId } = useParams();

  const { mutateAsync: publishResponse, isLoading: isPublishingComment } =
    usePublishProposalComment();

  const [showResponse, setShowResponse] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const ref = useClickAway<HTMLDivElement>(() => {
    setTimeout(() => {
      setIsReplying(false);
      setShowResponse(false);
    }, 500);
  });

  const form = useForm<z.infer<typeof proposalCommentSchema>>({
    resolver: zodResolver(proposalCommentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      proposal_id: "",
      comment_reference: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof proposalCommentSchema>) {
    await publishResponse({
      ...values,
      proposal_id: proposalId!,
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
        <Separator orientation="horizontal" className="bg-base-500" />
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
              dislikeComment={() => {}}
              likeComment={() => {}}
              dislikes={response.dislikes}
              isVoting={false}
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

        <div
          className={` ${
            showResponse ? "" : "h-0  overflow-hidden"
          } duration-300`}
        >
          {response?.responses?.map((response) => (
            <ProposalCommentResponse
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

export default ProposalCommentResponse;
