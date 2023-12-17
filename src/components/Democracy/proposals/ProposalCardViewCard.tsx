import { Messages1 } from "iconsax-react";
import { Button } from "../../ui/button";
import { formattedDate } from "@/utils/helper";
import { SDGCard } from "..";
import { Link } from "react-router-dom";
import ROUTES from "@/utils/routesNames";

interface ProposalCardViewCardProps {
  proposal: ProposalType;
}

const ProposalCardViewCard: React.FC<ProposalCardViewCardProps> = ({
  proposal,
}) => {
  return (
    <div className="flex flex-col  gap-1">
      <div className="flex-1 bg-[#FFFFFF] shadow-xl flex flex-col justify-start rounded-xl overflow-hidden w-full">
        {proposal.descriptive_image && (
          <div className="relative h-[100px] w-full">
            <img
              src={proposal.descriptive_image}
              alt="image"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-8">
          <div>
            <Link to={ROUTES.PROPOSAL_INFO_ROUTE(proposal.id)}>
              <h1 className="text-[20px] text-dark hover:underline">{proposal.title}</h1>
            </Link>
            <p className="text-[12px] text-base-400 my-3 ">
              {formattedDate(proposal.createdAt)}
            </p>
            <div className="text-14px text-transparent max-h-[70px] pb-5 bg-gradient-to-t to-[#64748B] to-70% from-[#f0f2f4] bg-clip-text overflow-hidden">
              <div dangerouslySetInnerHTML={{ __html: proposal.content }} />
            </div>
          </div>

          <div className="my-6 flex gap-[4px]">
            {proposal.proposalSDGs.map((SDGs: ProposalSDGType) => (
              <SDGCard SDGs={SDGs.sdgs} key={SDGs.sdgs_id} />
            ))}
          </div>
          <div className="flex gap-[8px] flex-wrap">
            {proposal.proposalTag.map((tag) => (
              <Button
                key={tag.id}
                className="h-fit text-[12px] text-dark bg-light_grey px-[20px]"
              >
                {tag.tag_name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] shadow-xl flex justify-center items-center  rounded-xl px-4 gap-4 py-3 "
      >
        <Button
          className={`${
            proposal.supportGotten < 40
              ? "bg-[#E84356]/10"
              : proposal.supportGotten > 40 && proposal.supportGotten < 70
              ? "bg-[#DDA63A]/10"
              : "bg-[#4C9F38]/10"
          } ${
            proposal.supportGotten < 40
              ? "text-[#E84356]"
              : proposal.supportGotten > 40 && proposal.supportGotten < 70
              ? "text-[#DDA63A]"
              : "text-[#4C9F38]"
          } w-[74px] h-[74px] hover:bg-inherit `}
        >
          {proposal.supportGotten}%
        </Button>
        <div className="flex flex-col gap-2">
          <Button className="h-fit text-[12px] bg-dark text-light">
            <Messages1 size="25" />
            <span>{proposal.supportNeeded} support needed</span>
          </Button>
          <Button className="h-fit text-[16px] w-full rounded-full">
            Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProposalCardViewCard;
