/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AddSquare, CloseCircle } from "iconsax-react";
import React, { useState } from "react";
import { CommentInput, UserAvatar } from "../custom";
import { usePostComment } from "@/api/response";

import { DeleteComment } from "./DeleteComment";
import CommentResponses from "./CommentResponses";
import { useAppContext } from "@/contexts/AppContext";
import { useAuthContext } from "@/providers/AuthProvider";

interface ResponseCommentProps {
  comment: ReportComment;
  reportId: string;
}

const ResponseComment = ({ comment, reportId }: ResponseCommentProps) => {
  const [showInput, setShowInput] = useState(false);
  const { mutate, isLoading, isSuccess } = usePostComment();
  const { user } = useAppContext();
  const { isLoggedIn, logout } = useAuthContext();

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-[24px] space-y-4 shadow-sm p-4 md:p-8">
        <div className="flex items-center justify-between gap-8 md:justify-start">
          <div className="flex items-center gap-2">
            {/* @ts-ignore */}
            <UserAvatar size={40} user={comment.author} />
            <p className="text-lg font-bold md:text-xl text-dark">
              {comment.author.username}
            </p>
          </div>

          <p className="text-sm md:text-base text-subtle_text">
            {new Date(comment.createdAt).toDateString()}
          </p>
          {comment.user_id === user?.id && (
            <DeleteComment commentId={comment.id} />
          )}
        </div>

        <p className="text-sm text-dark">{comment.content}</p>

        {comment.comment_response_cache > 0 && (
          <CommentResponses comment={comment} reportId={reportId} />
        )}
        <div className="border-[1px] border-dark/10"></div>

        <div
          onClick={() => (isLoggedIn ? setShowInput(!showInput) : logout())}
          className="flex items-center gap-2 ml-4 font-medium cursor-pointer sm:ml-8 w-fit"
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
};

export default React.memo(ResponseComment);
