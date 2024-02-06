import { Dislike, Like1, Messages1 } from "iconsax-react";
import { IconWrapper } from "../../custom";
import { Link } from "react-router-dom";
import ROUTES from "@/utils/routesNames";
import { formattedDate } from "@/utils/helper";
import { SDGCard, TagDisplay, TargetDisplay } from "..";
import { useVoteDebate } from "@/api/democracy/debates";
import { Button } from "@/components/ui/button";
import { useDebateContext } from "@/contexts/DebateContext";

interface DebatesCardViewCardProps {
  debate: DebateType;
}
const DebatesCardViewCard: React.FC<DebatesCardViewCardProps> = ({
  debate,
}) => {
  const {
    mutateAsync: voteDebate,
    isLoading: isVotingDebate,
    isError,
    data,
  } = useVoteDebate();

  const { refetchDebates } = useDebateContext();

  const handleLike = async () => {
    await voteDebate({ type: "like", debate_id: debate.id });
    refetchDebates();
  };

  const handleDislike = async () => {
    console.log(data);
    await voteDebate({ type: "dislike", debate_id: debate.id });
    // if (isError) {
      console.log(data);
      console.log(isError);
    // }
    refetchDebates();
  };

  return (
    <div className="flex flex-col gap-3 justify-start">
      <div className="bg-[#FFFFFF] shadow-xl flex flex-col md:flex-row justify-start rounded-xl overflow-hidden flex-1">
        <div className="p-8">
          <Link to={ROUTES.DEBATE_INFO_ROUTE(debate.id)}>
            <h1 className="text-[20px] text-dark hover:underline">
              {debate.title}
            </h1>
          </Link>
          <p className="text-[12px] text-base-400 my-3 ">
            {formattedDate(debate.createdAt)}
          </p>
          <div className="text-14px text-transparent max-h-[65px] pb-5 bg-gradient-to-t to-[#64748B] to-70% from-[#f0f2f4] bg-clip-text overflow-hidden">
            <div dangerouslySetInnerHTML={{ __html: debate.description }} />
          </div>
          {/* SDGs */}
          <div className="my-6 flex gap-[4px]">
            {debate.debateSDGs.map((SDGs, i) => (
              <SDGCard
                SDG={SDGs.sdgs}
                key={SDGs.sdgs_id}
                index={i}
                isCard={true}
              />
            ))}
          </div>
          {/* TARGETS */}
          <div className="flex gap-[8px] flex-wrap my-3">
            {debate.debateTarget.map((target, i) => (
              <TargetDisplay
                target={target.targetInfo}
                key={target.target_id}
                index={i}
                isCard={true}
              />
            ))}
          </div>
          {/* TAGS */}
          <div className="flex gap-[8px] flex-wrap">
            {debate.debateTag.map((tag, i) => (
              <TagDisplay
                tag={tag.tag_name}
                key={tag.id}
                index={i}
                isCard={true}
              />
            ))}
          </div>
        </div>
      </div>

      {/* LIKE AND DISLIKE */}
      <div className="bg-[#FFFFFF] shadow-xl flex justify-start items-center  rounded-xl px-8 gap-4 py-3 flex-wrap">
        <Button
          className="w-[72px] h-[72px] p-0 bg-transparent hover:bg-transparent"
          isLoading={isVotingDebate}
        >
          <IconWrapper
            className={`${
              debate.userVoted.reactionType === "like"
                ? "bg-[#31D0AA]/10 text-[#31D0AA]"
                : "bg-subtle_text text-light"
            } h-full w-full flex gap-1`}
            onClick={handleLike}
          >
            <Like1 />
            {debate.likePercentage}%
          </IconWrapper>
        </Button>

        <Button
          className="w-[72px] h-[72px] p-0 bg-transparent hover:bg-transparent"
          isLoading={isVotingDebate}
        >
          <IconWrapper
            className={`${
              debate.userVoted.reactionType === "dislike"
                ? " bg-[#E43F40]/10 text-[#E43F40]"
                : "bg-subtle_text text-light"
            } w-full h-full    flex gap-1`}
            onClick={handleDislike}
          >
            <Dislike />
            {debate.dislikePercentage}%
          </IconWrapper>
        </Button>

        <div className="flex items-center gap-2 rounded-[10px] px-2 py-1 text-white bg-dark text-[14px]">
          <Messages1 />
          {debate.total_comments_cache} Comments
        </div>
      </div>
    </div>
  );
};

export default DebatesCardViewCard;
