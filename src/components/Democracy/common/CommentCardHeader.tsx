import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formattedDate } from "@/utils/helper";

interface CommentCardHeaderProp {
  profilePicture: string | null;
  username: string;
  createdAt: string;
  content: string;
}
const CommentCardHeader: React.FC<CommentCardHeaderProp> = ({
  profilePicture,
  username,
  createdAt,
  content,
}) => {
  return (
    <>
      <div className="flex justify-start items-center gap-6 my-4 flex-wrap pt-2 ">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profilePicture ? profilePicture : undefined} />
          <AvatarFallback className="uppercase font-[700]">
            {username ? username.slice(0, 2) : ""}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-dark text-[14px] -ml-4">{username}</h2>
        <p className="text-[12px] text-base-400 my-3 ">
          {formattedDate(createdAt)}
        </p>
      </div>
      <p className=" pb-2 text-base-500 pl-14 text-sm">{content}</p>
    </>
  );
};

export default CommentCardHeader;
