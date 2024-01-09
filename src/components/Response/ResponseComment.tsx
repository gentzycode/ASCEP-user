import { AddSquare, CloseCircle } from "iconsax-react";
import { useState } from "react";
import { CommentInput } from "../custom";
import { usePostComment } from "@/api/response";

interface ResponseCommentProps {
  comment: ReportComment;
  reportId: string;
}

export default function ResponseComment({
  comment,
  reportId,
}: ResponseCommentProps) {
  const [showInput, setShowInput] = useState(false);

  const { mutate, isLoading, isSuccess } = usePostComment();

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-[24px] space-y-4 shadow-sm p-4 md:p-8">
        <div className="flex items-center justify-between gap-8 md:justify-start">
          <div className="flex items-center gap-2">
            <img
              src={comment.author.profile_picture}
              className="w-10 h-10 rounded-full"
              alt=""
            />
            <p className="text-lg font-bold md:text-xl text-dark">
              {comment.author.username}
            </p>
          </div>

          <p className="text-sm md:text-base text-subtle_text">
            {new Date(comment.createdAt).toDateString()}
          </p>
        </div>

        <p className="text-sm text-dark">{comment.content}</p>

        <div className="border-[1px] border-dark/20"></div>

        <div
          onClick={() => setShowInput(!showInput)}
          className="flex items-center gap-2 font-medium cursor-pointer w-fit"
        >
          {showInput ? (
            <CloseCircle color="black" />
          ) : (
            <AddSquare color="black" />
          )}

          {showInput ? <p>Close</p> : <p>Add Response</p>}
        </div>
      </div>
      {showInput && (
        <CommentInput
          isLoading={isLoading}
          handleSend={(data) =>
            mutate({
              ...data,
              report_id: reportId,
              comment_reference: comment.id,
            })
          }
          placeholder="Type your comment here"
          isSent={isSuccess}
        />
      )}
    </div>
  );
}
