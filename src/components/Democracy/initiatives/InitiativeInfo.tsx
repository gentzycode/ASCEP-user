import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formattedDate } from "@/utils/helper";
import { Airdrop, CardEdit, Copy, Flag, Messages1, Trash } from "iconsax-react";
import { Link } from "react-router-dom";
import { CategoryDisplay, SDGCard, Share, TagDisplay, TargetDisplay } from "..";
import ROUTES from "@/utils/routesNames";
import useDisclosure from "@/hooks/useDisclosure";
import ALert from "@/components/custom/Alert";
import {
  useDeleteInitiative,
  useFollowInitiative,
  useSupportInitiative,
} from "@/api/democracy/initiatives";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/providers/AuthProvider";
import { frontendURL } from "@/api/baseUrl";
import { useAppContext } from "@/contexts/AppContext";

interface InitiativeInfoProps {
  initiative: InitiativeType;
  scrollToComments: () => void;
}

const InitiativeInfo: React.FC<InitiativeInfoProps> = ({
  initiative,
  scrollToComments,
}) => {
  const { user } = useAppContext();
  const { isLoggedIn } = useAuthContext();

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
    navigator.clipboard.writeText(initiative.meeting_link);
    setCopied(true);
  };

  const { mutate: supportProposal, isLoading: isSupportingProposal } =
    useSupportInitiative(initiative.id);

  const { mutateAsync: deleteProposal, isLoading: isDeletingProposal } =
    useDeleteInitiative(initiative.id);

  const { mutateAsync: followInitiative, isLoading: isFollowingInitiative } =
    useFollowInitiative();

  const {
    isOpen: alertOpen,
    onOpen: openAlert,
    onClose: closeAlert,
  } = useDisclosure();

  const handleDelete = async () => {
    await deleteProposal();
    close();
  };

  const handleFollow = async () => {
    await followInitiative({ initiative_id: initiative.id });
  };

  const createdByUser = user?.id === Number(initiative.author.id);

  return (
    <div className="flex justify-start gap-10 xl:flex-row flex-col">
      <div className=" w-full xl:min-w-[700px] flex flex-col gap-6">
        {/* MAIN INFO */}
        <div className="flex flex-col w-full">
          <h1 className="text-2xl lg:text-3xl text-dark py-3">
            {initiative.title}
          </h1>
          <div className="flex justify-start items-center gap-6 flex-wrap">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={
                  initiative.author.profile_picture
                    ? initiative.author.profile_picture
                    : undefined
                }
              />
              <AvatarFallback className="uppercase font-[700]">
                {initiative.author.username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-dark text-[14px] -ml-4">
              {initiative.author.username}
            </h2>
            <p className="text-[12px] text-base-400 my-3 ">
              {formattedDate(initiative.createdAt)}
            </p>
            <div
              className="flex items-center gap-3 rounded-[10px] px-3 py-1 text-white bg-dark text-xs w-fit cursor-pointer"
              onClick={scrollToComments}
            >
              <Messages1 size={20} />
              {initiative.total_comments_cache} Comments
            </div>
            <p
              className={`${
                initiative.status === "in review"
                  ? "text-primary bg-primary/10"
                  : "text-[#31D0AA] bg-[#31D0AA]/10"
              } text-base font-extrabold my-3 capitalize px-4 rounded-full`}
            >
              {initiative.status}
            </p>
          </div>

          {/* SUMMARY */}
          <div className="py-4">
            <p className="text-sm md:text-base py-2">
              {initiative.description}
            </p>
          </div>
        </div>

        {/* SDGs */}
        {initiative.initiativeSDGs.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {initiative.initiativeSDGs.map((SDGs, i) => (
              <SDGCard SDG={SDGs.sdg} key={SDGs.sdg_id} index={i} />
            ))}
          </div>
        )}

        {/* TARGETS */}
        {initiative.initiativeTarget.length > 0 && (
          <div className="flex gap-[8px] flex-wrap">
            {initiative.initiativeTarget.map((target, i) => (
              <TargetDisplay
                target={target.targetInfo}
                key={target.target_id}
                index={i}
              />
            ))}
          </div>
        )}

        {/* TAGS */}
        {initiative.initiativeTag.length > 0 && (
          <div className="flex gap-[8px] flex-wrap">
            {initiative.initiativeTag.map((tag, i) => (
              <TagDisplay tag={tag.tag_name} key={tag.id} index={i} />
            ))}
          </div>
        )}

        {/* CATEGORIES */}
        {initiative.initiativeCategory.length > 0 && (
          <div className="flex gap-[8px] flex-wrap">
            {initiative.initiativeCategory.map((category, i) => (
              <CategoryDisplay
                category={category.categoryDetail.name}
                index={i}
                key={category.category_id}
              />
            ))}
          </div>
        )}

        {/*MEETING */}
        <h2 className="pb-2 pt-6 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
          Meeting
        </h2>
        <div
          className="py-4 px-2 max-w-[700px] flex-wrap justify-between bg-light border
         border-primary rounded-lg flex items-center gap-4"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <Link to="#" target="_blank" className="text-dark">
              <Airdrop size="40" />
            </Link>
            <div>
              <h3 className="text-sm">Meeting link</h3>
              <p className="text-sm whitespace-pre-wrap">
                {"external_video_url"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button className="w-fit h-fit relative p-0 bg-transparent hover:bg-transparent">
              <Copy
                size="30"
                color="#292925"
                variant="Bold"
                onClick={handleCopyLink}
                className="cursor-pointer"
              />
              {copied && (
                <p className="absolute -bottom-12 text-sm text-primary">
                  Copied
                </p>
              )}
            </Button>
            <Button>Add to calendar</Button>
          </div>
        </div>
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
                <Link to={ROUTES.EDIT_INITIATIVE_ROUTE(initiative.id)}>
                  <Button
                    className="text-dark text-base h-fit my-4 px-8 py-3 w-full justify-center
               gap-3 flex rounded-lg max-w-[220px]"
                  >
                    <span>Edit</span>
                    <CardEdit />
                  </Button>
                </Link>
                <Button
                  className="text-red-500 border border-red-500
                 hover:text-light text-base  bg-transparent hover:bg-red-400 h-fit my-4 px-8 py-3 
                 justify-center gap-1 flex rounded-lg w-full max-w-[220px]"
                  onClick={openAlert}
                >
                  <span>Delete Initiative</span>
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
              {initiative.supportGotten} votes
            </h3>
          </div>
          <div className="flex flex-col justify-start items-start gap-4 py-3 ">
            <Button
              className={`${
                initiative.supportGotten < 40
                  ? "bg-[#E84356]/10"
                  : initiative.supportGotten > 40 &&
                    initiative.supportGotten < 70
                  ? "bg-[#DDA63A]/10"
                  : "bg-[#4C9F38]/10"
              } ${
                initiative.supportGotten < 40
                  ? "text-[#E84356]"
                  : initiative.supportGotten > 40 &&
                    initiative.supportGotten < 70
                  ? "text-[#DDA63A]"
                  : "text-[#4C9F38]"
              } w-[74px] h-[74px] disabled:opacity-100 `}
              disabled
            >
              {initiative.supportGotten}%
            </Button>
            <Button
              className="h-fit w-full text-[12px] bg-dark text-light max-w-[200px] disabled:opacity-100"
              disabled
            >
              <Messages1 size="25" />
              <span>{initiative.supportNeeded} support needed</span>
            </Button>
            {initiative.status !== "in review" && (
              <Button
                className="h-12  max-w-[200px] py-4 text-lg w-full rounded-full"
                isLoading={isSupportingProposal}
                onClick={() => supportProposal()}
              >
                Support
              </Button>
            )}
          </div>
        </div>

        {/* SHARE */}
        <Share
          shareableURL={
            frontendURL +
            `/democracy/initiative/share/${initiative.initiative_code}`
          }
        />

        {/* FOLLOW */}
        <div>
          <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
            Follow
          </h2>
          <Button
            className="bg-transparent border border-primary mt-3 text-primary hover:text-light w-full max-w-[200px]"
            onClick={handleFollow}
            disabled={isFollowingInitiative}
            isLoading={isFollowingInitiative}
          >
            {initiative.userFollowing.following === true
              ? "Unfollow this Initiative"
              : "Follow this Initiative"}
          </Button>
        </div>
      </div>

      {/* DELETE ALERT */}
      <ALert
        message="Are you sure you want to delete this Initiative"
        description="This action cannot be undone. This will permanently delete your initiative."
        action={handleDelete}
        isOpen={alertOpen}
        close={closeAlert}
        loadingAction={isDeletingProposal}
      />
    </div>
  );
};
export default InitiativeInfo;
