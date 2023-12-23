import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formattedDate } from "@/utils/helper";
import {
  CardEdit,
  Copy,
  DocumentCopy,
  Facebook,
  Flag,
  Messages1,
  PlayCircle,
  Whatsapp,
} from "iconsax-react";
import { Link } from "react-router-dom";
import { SDGCard, TagDisplay, TargetDisplay } from "..";
import ROUTES from "@/utils/routesNames";
import { useEffect, useState } from "react";
import { useSupportProposal } from "@/api/democracy/proposals";

interface ProposalInfoProps {
  proposal: ProposalType;
  scrollToComments: () => void;
}

const ProposalInfo: React.FC<ProposalInfoProps> = ({
  proposal,
  scrollToComments,
}) => {

  const { mutate: supportProposal, isLoading: isSupportingProposal } =
    useSupportProposal(proposal.id);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(proposal.external_video_url);
    setCopied(true);
  };

  return (
    <div className="flex justify-start gap-10 xl:flex-row flex-col">
      <div className=" w-full xl:min-w-[700px] flex flex-col gap-6">
        {/* MAIN INFO */}
        <div className="flex flex-col w-full">
          <h1 className="text-[20px] text-dark">{proposal.title}</h1>
          <div className="flex justify-start items-center gap-6 flex-wrap">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={
                  proposal.author.profile_picture
                    ? proposal.author.profile_picture
                    : undefined
                }
              />
              <AvatarFallback className="uppercase font-[700]">
                {proposal.author.username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-dark text-[14px] -ml-4">
              {proposal.author.username}
            </h2>
            <p className="text-[12px] text-base-400 my-3 ">
              {formattedDate(proposal.createdAt)}
            </p>
            <div
              className="flex items-center gap-3 rounded-[10px] px-3 py-1 text-white bg-dark text-xs w-fit cursor-pointer"
              onClick={scrollToComments}
            >
              <Messages1 size={20} />
              {proposal.total_comments_cache} Comments
            </div>
          </div>
          {/* IMAGE */}
          <div className="w-full max-w-[700px] relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden my-8">
            <img
              src={proposal.descriptive_image}
              alt={proposal.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
          {/* SUMMARY */}
          <div className="border-t-2 border-subtle_text py-4">
            <h2 className="text-base">
              Proposal code: <span>{proposal.proposal_code}</span>
            </h2>
            <p className="text-sm md:text-base py-2">{proposal.summary}</p>
          </div>
          {/* BODY */}
          <div className="border-t-2 border-subtle_text py-4 whitespace-pre-wrap w-full  overflow-hidden">
            <div
              dangerouslySetInnerHTML={{ __html: proposal.content }}
              className=""
            />
          </div>
          {/* MAP */}
          <div>
            <h3 className="text-base underline underline-offset-8 decoration-primary py-2">
              Map view
            </h3>
            <div className="bg-subtle_text h-[400px] rounded-2xl w-full max-w-[700px] my-2"></div>
          </div>
          {/* VIDEO */}
          <div className="py-4 my-8 px-2 max-w-[700px] flex-wrap bg-light border border-primary rounded-lg flex justify-between items-center">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                to={proposal.external_video_url}
                target="_blank"
                className="text-primary"
              >
                <PlayCircle size="40" variant="Bold" />
              </Link>
              <div>
                <h3 className="text-sm">External video link</h3>
                <p className="text-sm whitespace-pre-wrap">
                  {proposal.external_video_url}
                </p>
              </div>
            </div>

            <Button className="w-fit h-fit relative p-0 bg-transparent hover:bg-transparent">
              <Copy
                size="25"
                color="#292925"
                variant="Bold"
                onClick={handleCopyLink}
                className="cursor-pointer"
              />
              {copied && (
                <p className="absolute -left-12 text-sm text-primary">Copied</p>
              )}
            </Button>
          </div>
        </div>

        {/* SDGs */}
        {proposal.proposalSDGs.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {proposal.proposalSDGs.map((SDGs) => (
              <SDGCard SDG={SDGs.sdgs} key={SDGs.sdgs_id} />
            ))}
          </div>
        )}

        {/* TARGETS */}
        {proposal.proposalTarget.length > 0 && (
          <div className="flex gap-[8px] flex-wrap">
            {proposal.proposalTarget.map((target) => (
              <TargetDisplay target={target} key={target.target_id} />
            ))}
          </div>
        )}

        {/* TAGS */}
        {proposal.proposalTag.length > 0 && (
          <div className="flex gap-[8px] flex-wrap">
            {proposal.proposalTag.map((tag) => (
              <TagDisplay tag={tag.tag_name} key={tag.id} />
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
        {/* {proposal.user_id === proposal.author.id && (
          <div>
            <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
              Author
            </h2>
            <Link to={ROUTES.EDIT_DEBATE_ROUTE(proposal.id)}>
              <Button className="text-dark text-[16px] h-fit w-fit my-4 px-8 justify-center gap-3 flex rounded-lg">
                <span>Edit</span>
                <CardEdit />
              </Button>
            </Link>
          </div>
        )} */}

        {/* SUPPORT */}
        <div>
          <div className="flex justify-start items-center gap-8">
            <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
              Support
            </h2>
            <h3 className="capitalize text-dark text-[14px] ">
              {proposal.supportGotten} votes
            </h3>
          </div>
          <div className="flex flex-col justify-start items-start gap-4 py-3 ">
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
              } w-[74px] h-[74px] disabled:opacity-100 `}
              disabled
            >
              {proposal.supportGotten}%
            </Button>
            <Button
              className="h-fit w-full text-[12px] bg-dark text-light max-w-[200px] disabled:opacity-100"
              disabled
            >
              <Messages1 size="25" />
              <span>{proposal.supportNeeded} support needed</span>
            </Button>
            <Button
              className="h-fit  max-w-[200px] py-4 text-lg w-full rounded-full"
              isLoading={isSupportingProposal}
              onClick={() => supportProposal()}
            >
              Support
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
        {/* FOLLOW */}
        <div>
          <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
            Follow
          </h2>
          <Button className="bg-transparent border border-primary mt-3 text-primary hover:text-light">
            Follow citizen Proposal
          </Button>
        </div>
        {/* COMMUNITY */}
        <div>
          <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
            Community
          </h2>
          <Link
            to={ROUTES.PROPOSAL_COMMUNITY_ROUTE(proposal.id)}
            state={{ proposal: proposal }}
          >
            <Button className="bg-transparent border border-primary mt-3 text-primary hover:text-light">
              Access the Community
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProposalInfo;
