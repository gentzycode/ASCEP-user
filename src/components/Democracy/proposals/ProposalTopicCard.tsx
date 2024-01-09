import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formattedDate } from "@/utils/helper";
import ROUTES from "@/utils/routesNames";
import { Messages1 } from "iconsax-react";
import { Link } from "react-router-dom";
interface ProposalTopicCardProps {
  topic: ProposalTopicType;
}
const ProposalTopicCard: React.FC<ProposalTopicCardProps> = ({ topic }) => {
  const { created_at, creator, total_comment_cache, title, id } = topic;
  return (
    <div className="flex flex-col w-full bg-[#fff] shadow-xl p-4 rounded-2xl">
      <Link
        to={ROUTES.PROPOSAL_TOPIC_INFO_ROUTE(id)}
        className="hover:underline"
      >
        <h1 className="text-[20px] text-dark pb-4">{title}</h1>
      </Link>
      <div className="flex justify-start items-start gap-6 flex-wrap">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={creator.profile_picture ? creator.profile_picture : undefined}
          />
          <AvatarFallback className="uppercase font-[700]">
            {creator.username.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-dark text-[14px] -ml-4">{creator.username}</h2>
          <h5 className="text-sm text-subtle_text -ml-4">Participant</h5>
        </div>
        <p className="text-[12px] text-base-400">{formattedDate(created_at)}</p>
        <div className="flex items-center gap-2 rounded-[10px] px-3 py-1 text-white bg-dark text-xs w-fit ">
          <Messages1 size={20} />
          {total_comment_cache} Comments
        </div>
      </div>
    </div>
  );
};

export default ProposalTopicCard;
