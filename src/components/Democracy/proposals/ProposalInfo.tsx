import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formattedDate } from "@/utils/helper";
import {
  CardEdit,
  Copy,
  Flag,
  Messages1,
  PlayCircle,
  Trash,
} from "iconsax-react";
import { Link } from "react-router-dom";
import { CategoryDisplay, SDGCard, Share, TagDisplay, TargetDisplay } from "..";
import ROUTES from "@/utils/routesNames";
import { useEffect, useState } from "react";
import {
  useDeleteProposal,
  useSupportProposal,
} from "@/api/democracy/proposals";
import useDisclosure from "@/hooks/useDisclosure";
import ALert from "@/components/custom/Alert";
import { useAuthContext } from "@/providers/AuthProvider";
import { frontendURL } from "@/api/baseUrl";
import { useAppContext } from "@/contexts/AppContext";

interface ProposalInfoProps {
  proposal: ProposalType;
  scrollToComments: () => void;
}

const ProposalInfo: React.FC<ProposalInfoProps> = ({
  proposal,
  scrollToComments,
}) => {
  const { isLoggedIn } = useAuthContext();
  const { user } = useAppContext();
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

  const { mutateAsync: deleteProposal, isLoading: isDeletingProposal } =
    useDeleteProposal(proposal.id);

  const {
    isOpen: alertOpen,
    onOpen: openAlert,
    onClose: closeAlert,
  } = useDisclosure();

  const handleDelete = async () => {
    await deleteProposal();
    close();
  };
  const createdByUser = user?.id === Number(proposal.author.id);

  return (
    <div className="flex justify-start gap-10 xl:flex-row flex-col">
      <div className=" w-full xl:min-w-[700px] flex flex-col gap-6">
        {/* MAIN INFO */}
        <div className="flex flex-col w-full">
          <h1 className="text-2xl lg:text-3xl text-dark py-3">
            {proposal.title}
          </h1>
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
          {proposal.descriptive_image && (
            <div className="w-full max-w-[700px] relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden my-8">
              <img
                src={proposal.descriptive_image}
                alt={proposal.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          )}

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
          {/* <div>
            <h2 className="pb-2  pl-0 my-6 border-b-4 text-[18px] font-medium border-primary w-fit">
              Map view
            </h2>
            <div className="bg-subtle_text h-[400px] rounded-2xl w-full max-w-[700px] my-2"></div>
          </div> */}

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
            {proposal.proposalSDGs.map((SDGs, i) => (
              <SDGCard SDG={SDGs.sdgs} key={SDGs.sdgs_id} index={i} />
            ))}
          </div>
        )}

        {/* TARGETS */}
        {proposal.proposalTarget.length > 0 && (
          <div className="flex gap-[8px] flex-wrap">
            {proposal.proposalTarget.map((target, i) => (
              <TargetDisplay
                target={target.targetInfo}
                key={target.target_id}
                index={i}
              />
            ))}
          </div>
        )}

        {/* TAGS */}
        {proposal.proposalTag.length > 0 && (
          <div className="flex gap-[8px] flex-wrap">
            {proposal.proposalTag.map((tag, i) => (
              <TagDisplay tag={tag.tag_name} key={tag.id} index={i} />
            ))}
          </div>
        )}

        {/* CATEGORIES */}
        {proposal.proposalCategory.length > 0 && (
          <div className="flex gap-[8px] flex-wrap">
            {proposal.proposalCategory.map((category, i) => (
              <CategoryDisplay
                category={category.categoryDetail.name}
                index={i}
                key={category.category_id}
              />
            ))}
          </div>
        )}
      </div>

      <div className="w-full  md:w-[300px] flex justify-start flex-col gap-10">
        {isLoggedIn && (
          <>
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
            {createdByUser && (
              <div>
                <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
                  Author
                </h2>
                <Button
                  className="text-dark text-base h-fit my-4  w-full p-0  justify-center gap-3 flex rounded-lg max-w-[220px]"
                  disabled={
                    proposal.total_comments_cache > 0 ||
                    proposal.total_support_cache > 0
                  }
                >
                  <Link
                    to={ROUTES.EDIT_PROPOSAL_ROUTE(proposal.id)}
                    className="justify-center gap-3 flex w-full h-full px-8 py-3"
                  >
                    <span>Edit</span>
                    <CardEdit />
                  </Link>
                </Button>
                <Button
                  className="text-red-500 border border-red-500
                 hover:text-light text-base  bg-transparent hover:bg-red-400 h-fit my-4 px-8 py-3 
                 justify-center gap-1 flex rounded-lg w-full max-w-[220px]"
                  onClick={openAlert}
                  disabled={
                    proposal.total_comments_cache > 0 ||
                    proposal.total_support_cache > 0
                  }
                >
                  <span>Delete Proposal</span>
                  <Trash />
                </Button>
              </div>
            )}
          </>
        )}

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
              className="h-12  max-w-[200px] py-4 text-lg w-full rounded-full"
              isLoading={isSupportingProposal}
              onClick={() => supportProposal()}
            >
              Support
            </Button>
          </div>
        </div>
        {/* SHARE */}
        <Share
          shareableURL={
            frontendURL + `/democracy/proposal/share/${proposal.proposal_code}`
          }
        />

        {/* FOLLOW */}
        {isLoggedIn && (
          <>
            {/* <div>
              <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
                Follow
              </h2>
              <Button className="bg-transparent border border-primary mt-3 text-primary hover:text-light h-12">
                Follow citizen Proposal
              </Button>
            </div> */}

            {/* COMMUNITY */}
            <div>
              <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
                Community
              </h2>
              <Link
                to={ROUTES.PROPOSAL_COMMUNITY_ROUTE(proposal.id)}
                state={{ proposal: proposal }}
              >
                <Button className="h-12 bg-transparent border border-primary mt-3 text-primary hover:text-light">
                  Access the Community
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* DELETE ALERT */}
      <ALert
        message="Are you sure you want to delete this proposal"
        description="This action cannot be undone. This will permanently delete your proposal."
        action={handleDelete}
        isOpen={alertOpen}
        close={closeAlert}
        loadingAction={isDeletingProposal}
      />
    </div>
  );
};
export default ProposalInfo;
