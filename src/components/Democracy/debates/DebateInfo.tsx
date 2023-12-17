import { IconWrapper } from "@/components/custom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formattedDate } from "@/utils/helper";
import {
  CardEdit,
  Dislike,
  DocumentCopy,
  Facebook,
  Flag,
  Like1,
  Messages1,
  Whatsapp,
} from "iconsax-react";
import { Link } from "react-router-dom";
import { SDGCard } from "..";
import { useVoteDebate } from "@/api/democracy/debates";
import ROUTES from "@/utils/routesNames";

interface DebateInfoProps {
  debate: DebateType;
  scrollToComments: () => void;
}
const DebateInfo: React.FC<DebateInfoProps> = ({
  debate,
  scrollToComments,
}) => {
  const { mutate: voteDebate, isLoading: isVoting } = useVoteDebate();
  const {
    title,
    author,
    createdAt,
    debateSDGs,
    debateTag,
    debateTarget,
    description,
    userVoted,
    total_comments_cache,
  } = debate;
  return (
    <div className="flex justify-start gap-10 lg:flex-row flex-col">
      <div className=" w-full xl:min-w-[700px] flex flex-col gap-6">
        {/* MAIN INFO */}
        <div>
          <h1 className="text-[20px] text-dark">{title}</h1>
          <div className="flex justify-start items-center gap-6 my-4 flex-wrap">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={
                  author.profile_picture ? author.profile_picture : undefined
                }
              />
              <AvatarFallback className="uppercase font-[700]">
                {author.username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-dark text-[14px] -ml-4">{author.username}</h2>
            <p className="text-[12px] text-base-400 my-3 ">
              {formattedDate(createdAt)}
            </p>
            <div
              className="flex items-center gap-3 rounded-[10px] px-3 py-1 text-white bg-dark text-xs w-fit cursor-pointer"
              onClick={scrollToComments}
            >
              <Messages1 size={20} />
              {total_comments_cache} Comments
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>

        {/* SDGs */}
        {debateSDGs.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {debate.debateSDGs.map((SDGs) => (
              <SDGCard SDGs={SDGs.sdgs} key={SDGs.sdgs_id} />
            ))}
          </div>
        )}

        {/* TARGETS */}
        {debateTarget.length > 0 && (
          <div className="flex gap-[8px] flex-wrap">
            {debate.debateTarget.map((target) => (
              <Button
                key={target.target_id}
                className="h-fit text-[12px] text-dark bg-light_grey px-[25px]"
              >
                Traget {target.targetInfo.code}
              </Button>
            ))}
          </div>
        )}

        {/* TAGS */}
        {debateTag.length > 0 && (
          <div className="flex gap-[8px] flex-wrap">
            {debate.debateTag.map((tag) => (
              <Button
                key={tag.id}
                className="h-fit text-[12px] text-dark bg-light_grey px-[20px]"
              >
                {tag.tag_name}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="w-full  md:w-[300px] flex justify-start flex-col gap-10">
        <div className="flex gap-2">
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
        {/* AUTHOR */}
        {debate.user_id === debate.author.id && (
          <div>
            <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
              Author
            </h2>
            <Link to={ROUTES.EDIT_DEBATE_ROUTE(debate.id)}>
              <Button className="text-dark text-[16px] h-fit w-fit my-4 px-8 justify-center gap-3 flex rounded-lg">
                <span>Edit</span>
                <CardEdit />
              </Button>
            </Link>
          </div>
        )}

        {/* SUPPORT */}
        <div>
          <div className="flex justify-start items-center gap-8">
            <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
              Support
            </h2>
            <h3 className="capitalize text-dark text-[14px] ">
              {debate.total_votes_cache} votes
            </h3>
          </div>
          {/* LIKE AND DISLIKE */}
          <div className="flex gap-4 my-4">
            <Button
              className="w-[72px] h-[72px] p-0 bg-transparent hover:bg-transparent"
              isLoading={isVoting}
            >
              <IconWrapper
                className={`${
                  userVoted.reactionType === "like"
                    ? "bg-[#31D0AA]/10 text-[#31D0AA]"
                    : "bg-subtle_text text-light"
                } h-full w-full flex gap-1`}
                onClick={() =>
                  voteDebate({ type: "like", debate_id: debate.id })
                }
              >
                <Like1 />
                {debate.likePercentage}%
              </IconWrapper>
            </Button>

            <Button
              className="w-[72px] h-[72px] p-0 bg-transparent hover:bg-transparent"
              isLoading={isVoting}
            >
              <IconWrapper
                className={`${
                  userVoted.reactionType === "dislike"
                    ? " bg-[#E43F40]/10 text-[#E43F40]"
                    : "bg-subtle_text text-light"
                } w-full h-full    flex gap-1`}
                onClick={() =>
                  voteDebate({ type: "dislike", debate_id: debate.id })
                }
              >
                <Dislike />
                {debate.dislikePercentage}%
              </IconWrapper>
            </Button>
          </div>
        </div>
        {/* SHARE */}
        <div>
          <div className="flex justify-start items-start gap-8">
            <h2 className="pb-2  border-b-4 text-[18px] font-medium border-primary w-fit">
              Share
            </h2>
            <Button className="bg-transparent p-0 w-fit hover:bg-transparent text-dark text-[14px] flex justify-center  gap-1">
              <DocumentCopy size={20} />
              <span>Copy link</span>
            </Button>
          </div>
          <div className="flex gap-2 my-4">
            <Link to="#" className="text-subtle_text">
              <Whatsapp size={35} variant="Bold" />
            </Link>
            <Link to="#" className=" text-subtle_text">
              <Facebook size={35} variant="Bold" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DebateInfo;
