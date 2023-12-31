import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/providers/AuthProvider";
import { Dislike, Like1 } from "iconsax-react";

interface VoteCommentButtonsProp {
  likes: number;
  dislikes: number;
  reactionType: "like" | "dislike";
  isVoting: boolean;
  likeComment: () => void;
  dislikeComment: () => void;
}
const VoteCommentButtons: React.FC<VoteCommentButtonsProp> = ({
  likes,
  dislikes,
  reactionType,
  isVoting,
  likeComment,
  dislikeComment,
}) => {
  const { isLoggedIn } = useAuthContext();

  return (
    <div className="flex justify-start items-center  gap-2">
      <Button className="bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]">
        {likes + dislikes} Vote(s)
      </Button>
      {isLoggedIn && (
        <>
          <Separator
            orientation="vertical"
            className="h-5  text-dark bg-base-500"
          />
          <Button
            className={`${
              reactionType === "like" ? "text-[#31D0AA]" : "text-subtitle_text"
            }  gap-1 bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]`}
            onClick={likeComment}
            isLoading={isVoting}
          >
            <Like1 variant="Bold" /> <span>{likes}</span>
          </Button>
          <Button
            className={`${
              reactionType === "dislike"
                ? "text-[#E43F40]"
                : "text-subtitle_text"
            }  gap-1 bg-transparent hover:bg-transparent h-fit w-fit p-0 text-[14px]`}
            onClick={dislikeComment}
            isLoading={isVoting}
          >
            <Dislike variant="Bold" /> <span>{dislikes}</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default VoteCommentButtons;
