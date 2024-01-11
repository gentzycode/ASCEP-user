import { Messages1 } from "iconsax-react";
import { SDGCard, TargetDisplay } from "..";
import { Button } from "@/components/ui/button";
import ROUTES from "@/utils/routesNames";
import { Link } from "react-router-dom";
import { formattedDate } from "@/utils/helper";

interface PollListCardProp {
  poll: VotingType;
}
const PollListCard: React.FC<PollListCardProp> = ({ poll }) => {
  const {
    id,
    title,
    start_date,
    end_date,
    questions,
    votingSDGs,
    votingTarget,
    total_comments_cache,
  } = poll;
  return (
    <div className="flex flex-col  gap-1">
      {/* TOP */}
      <div className="flex-1 bg-[#FFFFFF] shadow-xl flex flex-col justify-start rounded-xl overflow-hidden w-full p-6 gap-2">
        <div>
          <Link to={ROUTES.VOTING_INFO_ROUTE(id)}>
            <h1 className="text-base text-text hover:underline p-0">{title}</h1>
          </Link>
          <p className="text-sm text-subtle_text">
            From {formattedDate(start_date)} to {formattedDate(end_date)}
          </p>
        </div>
        <div
          className="text-14px text-transparent max-h-[90px] pb-5 bg-gradient-to-t 
            to-[#64748B] to-70% from-[#f0f2f4] bg-clip-text overflow-hidden"
        >
          <ul className="list-inside list-disc text-dark pb-2">
            {questions.map((question) => (
              <li className="text-sm" key={question.id}>
                {question.question}
              </li>
            ))}
          </ul>
        </div>

        {/* SDGs */}
        <div className="my-6 flex gap-[4px]">
          {votingSDGs.map((SDGs, i) => (
            <SDGCard SDG={SDGs.sdg} key={SDGs.sdg_id} index={i} isCard={true} />
          ))}
        </div>

        {/* TARGETS */}
        <div className="flex gap-[8px] flex-wrap my-3">
          {votingTarget.map((target, i) => (
            <TargetDisplay
              target={target.targetInfo}
              key={target.target_id}
              index={i}
              isCard={true}
            />
          ))}
        </div>
      </div>
      {/* BOTTOM */}
      <div className="bg-[#FFFFFF] shadow-xl flex justify-start items-center  rounded-xl p-6 gap-2 flex-wrap">
        <Link to={ROUTES.VOTING_INFO_ROUTE(id)}>
          <Button className="h-fit text-base">Participate in this poll</Button>
        </Link>

        <div className="flex items-center gap-2 rounded-[10px] px-2 py-1 text-white bg-dark text-[14px]">
          <Messages1 />
          {total_comments_cache} Comments
        </div>
      </div>
    </div>
  );
};

export default PollListCard;
