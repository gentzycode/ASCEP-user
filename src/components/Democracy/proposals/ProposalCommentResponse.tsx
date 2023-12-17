import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AddSquare,
  CloseCircle,
  Flag,
  MinusSquare,
} from "iconsax-react";
import { useState } from "react";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { FormInput } from "..";
import { IconWrapper } from "@/components/custom";
import { useClickAway } from "@uidotdev/usehooks";
import { proposalCommentSchema } from "@/schemas/ProposalSchema";
import { usePublishProposalComment } from "@/api/democracy/proposals";

interface ProposalCommentResponseProps {
  response: CommentResponseType;
  paddingLeft: number;
}
const ProposalCommentResponse: React.FC<ProposalCommentResponseProps> = ({
  response,
  paddingLeft,
}) => {
  const { mutateAsync: publishResponse, isLoading: isPublishingComment } =
    usePublishProposalComment();
  const { proposalId } = useParams();
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
      proposal_id: parseInt(proposalId!),
      comment_reference: response.response_id,
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof proposalCommentSchema>) {
    await publishResponse(values);
    closeResponse();
  }

  const closeResponse = () => {
    reset();
    setIsReplying(false);
  };

  return (
    <>
      <div ref={ref}>
        <div className=" border-t-2 border-base-500 mt-2" />
        <div
          className={`pl-[${paddingLeft}px]`}
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          <div className="flex justify-start items-center gap-6 my-4 flex-wrap pt-2 ">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={
                  response.commentDetail.user.profile_picture
                    ? response.commentDetail.user.profile_picture
                    : undefined
                }
              />
              <AvatarFallback className="uppercase font-[700]">
                AB
              </AvatarFallback>
            </Avatar>
            <h2 className="text-dark text-[14px] -ml-4">
              {response.commentDetail.user.username}
            </h2>
          </div>
          <p className=" pb-2 text-base-500">
            {response.commentDetail.content}
          </p>

          {/* FOOTER */}
          <div className="flex justify-between items-center flex-wrap-reverse gap-2">
            <div className="flex justify-start  gap-2 items-center pt-4 flex-wrap">
              <Button
                className="bg-transparent hover:bg-transparent h-fit w-fit p-0  text-[14px]"
                onClick={() => setShowResponse(!showResponse)}
              >
                {showResponse ? (
                  <MinusSquare size={25} />
                ) : (
                  <AddSquare size={25} />
                )}
                <span>
                  {response.commentDetail?.responses?.length} responses
                </span>
              </Button>

              <Separator
                orientation="vertical"
                className="h-5  text-dark bg-base-500"
              />

              <Button
                className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]"
                onClick={() => setIsReplying(true)}
              >
                Reply
              </Button>

              <Separator
                orientation="vertical"
                className="h-5  text-dark bg-base-500"
              />

              <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
                <Flag size="25" />
              </Button>

              <Separator
                orientation="vertical"
                className="h-5  text-dark bg-base-500"
              />
              <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
                Hide
              </Button>
              <Separator
                orientation="vertical"
                className="h-5  text-dark bg-base-500"
              />
              <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
                Block Author
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
          {response?.commentDetail?.responses?.map((response) => (
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
