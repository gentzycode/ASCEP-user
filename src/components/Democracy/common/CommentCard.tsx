import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { CommentCardFooter, CommentCardHeader, VoteCommentButtons } from "..";

interface CommentsCardProps {
  comment: CommentType;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
  showResponse: boolean;
  setShowResponse: React.Dispatch<React.SetStateAction<boolean>>;
  getResponses: () => void;
  isLoadingResponses: boolean;
  handleLike: () => void;
  handleDislike: () => void;
  isVotingComment: boolean;
}

const Comment: React.FC<CommentsCardProps> = ({
  comment,
  setIsReplying,
  showResponse,
  setShowResponse,
  getResponses,
  isLoadingResponses,
  handleDislike,
  handleLike,
  isVotingComment,
}) => {
  const [loading, setLoading] = useState(false);

  const fetchResponse = async () => {
    setLoading(true);
    setIsReplying(false);
    await getResponses();
    setLoading(false);
    setShowResponse(true);
  };

  return (
    <>
      <CommentCardHeader
        username={comment.author.username}
        content={comment.content}
        createdAt={comment.createdAt}
        profilePicture={comment.author.profile_picture}
      />
      <Separator orientation="horizontal" className="bg-base-500" />
      {/* FOOTER */}
      <div className="flex justify-between items-center flex-wrap-reverse gap-2 py-2">
        <CommentCardFooter
          numberOfResponses={comment.comment_response_cache}
          setIsReplying={setIsReplying}
          setShowResponse={setShowResponse}
          showResponse={showResponse}
          fetchResponse={fetchResponse}
          isLoadingResponses={isLoadingResponses}
          loading={loading}
        />

        <VoteCommentButtons
          dislikeComment={handleDislike}
          likeComment={handleLike}
          dislikes={comment.dislikes}
          isVoting={isVotingComment}
          likes={comment.likes}
          reactionType={comment.userVoted.reactionType}
        />
      </div>
    </>
  );
};
export default Comment;
