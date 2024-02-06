import { Link } from "react-router-dom";
import { IconWrapper, UserAvatar } from "../custom";

export default function Recommendation({
  recommendation,
}: {
  recommendation: Recommendation;
}) {
  let redirectLink = "";

  switch (recommendation.entity_type) {
    case "budget":
      redirectLink = `/democracy/budjet/${recommendation.id}`;
      break;
    case "debate":
      redirectLink = `/democracy/debates/${recommendation.id}`;
      break;
    case "foirequest":
      redirectLink = "/";
      break;
    case "initiative":
      redirectLink = `/democracy/initiatives/${recommendation.id}`;
      break;
    case "proposal":
      redirectLink = `/democracy/proposals/${recommendation.id}`;
      break;
    case "report":
      redirectLink = `/response/reports/${recommendation.id}`;

      break;
    case "survey":
      redirectLink = `/response/surveys/${recommendation.id}`;
      break;
    case "voting":
      redirectLink = `/democracy/voting/${recommendation.id}`;
      break;

    default:
      break;
  }

  return (
    <Link
      to={redirectLink}
      className="bg-white rounded-[40px] gap-4 p-3 lg:p-6 flex flex-col lg:flex-row items-center"
    >
      <div className="flex-1 ml-3 mr-auto">
        <IconWrapper className="h-[50px] w-[50px] rounded-full">
          <UserAvatar size={50} user={recommendation.createdBy} />
        </IconWrapper>
      </div>
      <div className="ml-[18px] mr-11">
        <p className="text-lg md:text-xl font-semibold mb-[14px] ">
          {recommendation.title}
        </p>
        <div className="flex gap-1 mb-[10px] ">
          Created by
          <span className="font-medium text-link">
            {recommendation.createdBy.firstname}{" "}
            {recommendation.createdBy.lastname}
          </span>
          {/* request to the{" "}
          <span className="font-medium text-link">
            Chicago Department of Public Health
          </span>{" "} */}
          on {new Date(recommendation.createdAt).toDateString()}
        </div>

        <p className="text-sm font-medium text-subtle_text line-clamp-5 md:line-clamp-3">
          {recommendation.description}
        </p>
      </div>

      <div className="px-10 py-1 ml-auto capitalize rounded-full text-slate-700 bg-slate-300">
        {recommendation.entity_type}
      </div>
    </Link>
  );
}
