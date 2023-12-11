import { Dislike, Like1, Messages1 } from "iconsax-react";
import { IconWrapper } from "../../custom";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import ROUTES from "@/utils/routesNames";
import { formattedDate } from "@/utils/helper";
import { DebateSDGs } from "..";

interface DebatesCardViewCardProps {
  debate: DebateType;
}
const DebatesCardViewCard: React.FC<DebatesCardViewCardProps> = ({
  debate,
}) => {
  return (
    <div className="flex flex-col gap-3 justify-start">
      <div className="bg-[#FFFFFF] shadow-xl flex flex-col md:flex-row justify-start rounded-xl overflow-hidden flex-1">
        <div className="p-8 ">
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
            {debate.debateSDGs.map((SDGs) => (
              <DebateSDGs SDGs={SDGs} key={SDGs.sdgs_id} />
            ))}
          </div>
          {/* TARGETS */}
          <div className="flex gap-[8px] flex-wrap my-3">
            {debate.debateTarget.map((target, index) => (
              <Button
                key={index}
                className="h-fit text-[12px] text-dark bg-light_grey px-[20px]"
              >
                Target {target.targetInfo.code}
              </Button>
            ))}
          </div>
          {/* TAGS */}
          <div className="flex gap-[8px] flex-wrap">
            {debate.debateTag.map((tag, index) => (
              <Button
                key={index}
                className="h-fit text-[12px] text-dark bg-light_grey px-[20px]"
              >
                {tag.tag_name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#FFFFFF] shadow-xl flex justify-start items-center  rounded-xl px-4 gap-4 py-3 flex-wrap">
        <IconWrapper className="w-[72px] h-[72px] bg-[#31D0AA]/10 text-[#31D0AA]  ">
          <div className="flex items-center gap-1">
            <Like1 />
            {debate.likePercentage}%
          </div>
        </IconWrapper>

        <IconWrapper className="w-[72px] h-[72px] bg-[#E43F40]/10 text-[#E43F40]  ">
          <div className="flex items-center gap-1">
            <Dislike />
            {debate.dislikePercentage}%
          </div>
        </IconWrapper>

        <div className="flex items-center gap-2 rounded-[10px] px-2 py-1 text-white bg-dark text-[14px]">
          <Messages1 />
          {debate.total_comments_cache} Comments
        </div>
      </div>
    </div>
  );
};

export default DebatesCardViewCard;
