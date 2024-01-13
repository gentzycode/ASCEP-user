import { Messages1 } from "iconsax-react";
import { Button } from "../../ui/button";
import { formattedDate } from "@/utils/helper";
import { CategoryDisplay, SDGCard, TagDisplay, TargetDisplay } from "..";
import { Link } from "react-router-dom";
import ROUTES from "@/utils/routesNames";
import { useSupportProposal } from "@/api/democracy/proposals";
import { useProposalContext } from "@/contexts/ProposalContext";

interface ProposalCardViewCardProps {
  proposal: ProposalType;
}

const ProposalCardViewCard: React.FC<ProposalCardViewCardProps> = ({
  proposal,
}) => {
  const { mutateAsync: supportInitiative, isLoading: isSupporting } =
    useSupportProposal(proposal.id);

  const { refetchProposals } = useProposalContext();

  const handleSupport = async () => {
    await supportInitiative();
    refetchProposals();
  };
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
              <h1 className="text-[20px] text-dark hover:underline">
                {proposal.title}
              </h1>
            </Link>
            <p className="text-[12px] text-base-400 my-3 ">
              {formattedDate(proposal.createdAt)}
            </p>
            <div
              className="text-14px text-transparent max-h-[70px] pb-5 bg-gradient-to-t 
            to-[#64748B] to-70% from-[#f0f2f4] bg-clip-text overflow-hidden"
            >
              <div dangerouslySetInnerHTML={{ __html: proposal.content }} />
            </div>
          </div>
          {/* SDG */}
          <div className="my-6 flex gap-[4px]">
            {proposal.proposalSDGs.map((SDGs: ProposalSDGType, i) => (
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
            {proposal.proposalTarget.map((target, i) => (
              <TargetDisplay
                target={target.targetInfo}
                key={target.target_id}
                index={i}
              />
            ))}
          </div>
          {/* TAGS */}
          <div className="flex gap-[8px] flex-wrap">
            {proposal.proposalTag.map((tag, i) => (
              <TagDisplay
                tag={tag.tag_name}
                key={tag.id}
                index={i}
                isCard={true}
              />
            ))}
          </div>

          {/* CATEGORIES */}
          <div className="flex gap-[8px] flex-wrap mt-3">
            {proposal.proposalCategory.map((category, i) => (
              <CategoryDisplay
                category={category.categoryDetail.name}
                key={category.category_id}
                index={i}
                isCard={true}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] shadow-xl flex justify-center items-center  rounded-xl px-4 gap-4 py-3 ">
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
          } w-[74px] h-[74px] disabled:opacity-100`}
          disabled
        >
          {proposal.supportGotten}%
        </Button>
        <div className="flex flex-col gap-2">
          <Button
            className="h-fit text-[12px] bg-dark text-light disabled:opacity-100"
            disabled
          >
            <Messages1 size="25" />
            <span>{proposal.supportNeeded} support needed</span>
          </Button>
          <Button
            className="h-11 text-[16px] w-full rounded-full"
            onClick={handleSupport}
            isLoading={isSupporting}
            disabled={isSupporting}
          >
            Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProposalCardViewCard;
