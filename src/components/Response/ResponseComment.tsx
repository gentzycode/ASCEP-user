import { AddSquare } from "iconsax-react";
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
      <div className="bg-white rounded-[24px] space-y-4 shadow-sm p-8">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img
              src={comment.author.profile_picture}
              className="w-10 h-10 rounded-full"
              alt=""
            />
            <p className="text-xl font-bold text-dark">
              {comment.author.username}
            </p>
          </div>

          <p className="text-subtle_text">
            {new Date(comment.createdAt).toDateString()}
          </p>
        </div>

        <p className="text-sm text-dark">{comment.content}</p>

        <div className="border-[1px] border-dark/20"></div>

        <div
          onClick={() => setShowInput(!showInput)}
          className="flex items-center gap-2 font-medium cursor-pointer w-fit"
        >
          <AddSquare size="32" color="black" />

          <p>Add Response</p>
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
