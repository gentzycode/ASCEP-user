import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formattedDate } from "@/utils/helper";
import { AddSquare, Dislike, Flag, Like1, MinusSquare } from "iconsax-react";
import React from "react";

interface CommentsCardProps {
  comment: CommentType;
  isVotingComment: boolean;
  likeComment: () => void;
  dislikeComment: () => void;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
  setShowResponse: React.Dispatch<React.SetStateAction<boolean>>;
  showResponse: boolean;
}
const Comment: React.FC<CommentsCardProps> = ({
  comment,
  likeComment,
  isVotingComment,
  dislikeComment,
  setIsReplying,
  setShowResponse,
  showResponse,
}) => {
  const { userVoted } = comment;
  return (
    <>
      <div className="flex justify-start items-center gap-6 my-4 flex-wrap">
        <Avatar className="h-10 w-10">
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
      <p className="border-b-2 border-base-500 pb-2 text-base-500">
        {comment.content}
      </p>

      {/* FOOTER */}
      <div className="flex justify-between items-center flex-wrap-reverse gap-2 py-2">
        <div className="flex justify-start  gap-2 items-center flex-wrap">
          <Button
            className="bg-transparent hover:bg-transparent h-fit w-fit p-0  text-[14px]"
            onClick={() => setShowResponse(!showResponse)}
          >
            {showResponse ? <MinusSquare size={25} /> : <AddSquare size={25} />}
            <span>{comment.responses.length} responses</span>
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

        <div className="flex justify-start items-center  gap-2">
          <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
            {comment.likes + comment.dislikes} Vote(s)
          </Button>
          <Separator
            orientation="vertical"
            className="h-5  text-dark bg-base-500"
          />
          <Button
            className={`${
              userVoted.reactionType === "like"
                ? "text-[#31D0AA]"
                : "text-subtitle_text"
            }  gap-1 bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]`}
            onClick={() => likeComment()}
            isLoading={isVotingComment}
          >
            <Like1 variant="Bold" /> <span>{comment.likes}</span>
          </Button>
          <Button
            className={`${
              userVoted.reactionType === "dislike"
                ? "text-[#E43F40]"
                : "text-subtitle_text"
            }  gap-1 bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]`}
            onClick={() => dislikeComment()}
            isLoading={isVotingComment}
          >
            <Dislike variant="Bold" /> <span>{comment.dislikes}</span>
          </Button>
        </div>
      </div>
    </>
  );
};
export default Comment;
