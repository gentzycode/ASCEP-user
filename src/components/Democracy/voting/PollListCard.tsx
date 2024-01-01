import { Messages1 } from "iconsax-react";
import { SDGCard, TargetDisplay } from "..";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/providers/AuthProvider";
import ROUTES from "@/utils/routesNames";
import { Link } from "react-router-dom";
import { formattedDate } from "@/utils/helper";

const SDGs = [
  {
    sdgs_id: 1,
    proposal_id: 46,
    sdgs: {
      title: "No Poverty",
      banner:
        "https://res.cloudinary.com/djewdwjfh/image/upload/v1701525241/ascep/sdgs_banner/r4ps4eqn8salyrmdgl0v.png",
      id: 1,
    },
  },
  {
    sdgs_id: 2,
    proposal_id: 46,
    sdgs: {
      title: "Zero Hunger",
      banner:
        "https://res.cloudinary.com/djewdwjfh/image/upload/v1701525284/ascep/sdgs_banner/txtmrimdragt6vnll2jm.png",
      id: 2,
    },
  },
];

const Target = [
  {
    target_id: 1,
    proposal_id: 46,
    targetInfo: {
      code: "1.1",
      id: 1,
    },
  },
  {
    target_id: 3,
    proposal_id: 46,
    targetInfo: {
      code: "2.1",
      id: 3,
    },
  },
];
interface PollListCardProp {
  poll: VotingType;
}
const PollListCard: React.FC<PollListCardProp> = ({ poll }) => {
  const { isLoggedIn } = useAuthContext();
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
        <Link to={ROUTES.VOTING_INFO_ROUTE(id)}>
          <h1 className="text-base text-text hover:underline">{title}</h1>
        </Link>
        <p className="text-sm text-subtle_text">
          From {formattedDate(start_date)} to {formattedDate(end_date)}
        </p>
        <ul className="list-inside list-disc text-dark">
          {questions.map((question) => (
            <li className="text-sm">{question.question}</li>
          ))}
        </ul>

        {/* SDGs */}
        <div className="my-6 flex gap-[4px]">
          {votingSDGs.map((SDGs) => (
            <SDGCard SDG={SDGs.sdg} key={SDGs.sdg_id} />
          ))}
        </div>

        {/* TARGETS */}
        <div className="flex gap-[8px] flex-wrap my-3">
          {votingTarget.map((target) => (
            <TargetDisplay target={target.targetInfo} key={target.target_id} />
          ))}
        </div>
      </div>
      {/* BOTTOM */}
      <div className="bg-[#FFFFFF] shadow-xl flex justify-start items-center  rounded-xl p-6 gap-2 flex-wrap">
        {isLoggedIn ? (
          <Link to={ROUTES.VOTING_INFO_ROUTE(id)}>
            <Button className="h-fit text-base">
              Participate in this poll
            </Button>
          </Link>
        ) : (
          <Link to={ROUTES.SIGNIN_ROUTE}>
            <Button className="bg-transparent border-dark border-2 w-[150px]">
              Log in
            </Button>
          </Link>
        )}
        <div className="flex items-center gap-2 rounded-[10px] px-2 py-1 text-white bg-dark text-[14px]">
          <Messages1 />
          {total_comments_cache} Comments
        </div>
      </div>
    </div>
  );
};

export default PollListCard;
