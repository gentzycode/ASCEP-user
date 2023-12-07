import { Dislike, Like1, Messages1 } from "iconsax-react";
import { IconWrapper } from "../../custom";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import ROUTES from "@/utils/routesNames";
import { formattedDate } from "@/utils/helper";

interface DebatesCardViewCardProps {
  debate: DebateType;
}
const DebatesCardViewCard: React.FC<DebatesCardViewCardProps> = ({
  debate,
}) => {
  const bgColors = [
    "rgba(232, 67, 86, 0.10)",
    "rgba(221, 166, 58, 0.10)",
    "rgba(76,159, 56, 0.10)",
    "#292925",
  ];
  const textColors = ["#E84356", "#DDA63A", "#4C9F38", "#F9F6FB"];
  return (
    <div className="col-span-1 flex flex-col lg:flex-row gap-3">
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
          <p className="text-14px text-transparent max-h-[65px] pb-5 bg-gradient-to-t to-[#64748B] to-70% from-[#f0f2f4] bg-clip-text">
            {debate.description}
          </p>
          {/* SDGs */}
          <div className="my-6 flex gap-[4px]">
            {Array.from(["1", "2", "3", "+3"]).map((num, index) => {
              return (
                <Button
                  className={`w-[50px] rounded-lg hover:bg-current`}
                  key={index}
                  style={{
                    backgroundColor: `${bgColors[index]}`,
                    color: `${textColors[index]}`,
                    opacity: "10",
                  }}
                >
                  {num}
                </Button>
              );
            })}
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
      <div className="bg-[#FFFFFF] shadow-xl flex lg:flex-col justify-center items-center  rounded-xl px-4 gap-4 py-3 flex-wrap">
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
