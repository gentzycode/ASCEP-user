import { IconWrapper } from "@/components/custom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formattedDate } from "@/utils/helper";
import {
  CardEdit,
  Dislike,
  Flag,
  Like1,
  Messages1,
  Trash,
} from "iconsax-react";
import { Link } from "react-router-dom";
import { SDGCard, Share, TagDisplay, TargetDisplay } from "..";
import { useDeleteDebate, useVoteDebate } from "@/api/democracy/debates";
import ROUTES from "@/utils/routesNames";
import ALert from "@/components/custom/Alert";
import useDisclosure from "@/hooks/useDisclosure";
import { frontendURL } from "@/api/baseUrl";
import { useAuthContext } from "@/providers/AuthProvider";

interface DebateInfoProps {
  debate: DebateType;
  scrollToComments: () => void;
}
const DebateInfo: React.FC<DebateInfoProps> = ({
  debate,
  scrollToComments,
}) => {
  const { isLoggedIn,  } = useAuthContext();

  const { mutate: voteDebate, isLoading: isVoting } = useVoteDebate();

  const { mutateAsync: deleteDebate, isLoading: isDeletingDebate } =
    useDeleteDebate(debate.id);

  const {
    isOpen: alertOpen,
    onOpen: openAlert,
    onClose: closeAlert,
  } = useDisclosure();

  const handleDelete = async () => {
    await deleteDebate();
    closeAlert();
  };

  const {
    title,
    author,
    createdAt,
    debateSDGs,
    debateTag,
    debateTarget,
    description,
    userVoted,
    total_comments_cache,
  } = debate;

  return (
    <div className="flex justify-start gap-10 lg:flex-row flex-col">
      <div className=" w-full xl:min-w-[700px] flex flex-col gap-6">
        {/* MAIN INFO */}
        <div>
          <h1 className="text-[20px] text-dark">{title}</h1>
          <div className="flex justify-start items-center gap-6 my-4 flex-wrap">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={
                  author.profile_picture ? author.profile_picture : undefined
                }
              />
              <AvatarFallback className="uppercase font-[700]">
                {author.username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-dark text-[14px] -ml-4">{author.username}</h2>
            <p className="text-[12px] text-base-400 my-3 ">
              {formattedDate(createdAt)}
            </p>
            <div
              className="flex items-center gap-3 rounded-[10px] px-3 py-1 text-white bg-dark text-xs w-fit cursor-pointer"
              onClick={scrollToComments}
            >
              <Messages1 size={20} />
              {total_comments_cache} Comments
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>

        {/* SDGs */}
        {debateSDGs.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {debate.debateSDGs.map((SDGs, i) => (
              <SDGCard SDG={SDGs.sdgs} key={SDGs.sdgs_id} index={i} />
            ))}
          </div>
        )}

        {/* TARGETS */}
        {debateTarget.length > 0 && (
          <div className="flex gap-[8px] flex-wrap">
            {debate.debateTarget.map((target, i) => (
              <TargetDisplay
                target={target.targetInfo}
                key={target.target_id}
                index={i}
              />
            ))}
          </div>
        )}

        {/* TAGS */}
        {debateTag.length > 0 && (
          <div className="flex gap-[8px] flex-wrap">
            {debate.debateTag.map((tag, i) => (
              <TagDisplay tag={tag.tag_name} key={tag.id} index={i} />
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
            {debate.user_id === debate.author.id && (
              <div>
                <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
                  Author
                </h2>
                <Link to={ROUTES.EDIT_DEBATE_ROUTE(debate.id)}>
                  <Button className="text-dark text-base h-fit my-4 px-8 py-3 w-full   justify-center gap-3 flex rounded-lg max-w-[200px]">
                    <span>Edit</span>
                    <CardEdit />
                  </Button>
                </Link>
                <Button
                  className="text-red-500 border border-red-500 hover:text-light text-base bg-transparent hover:bg-red-400 h-fit my-4 px-8 py-3 justify-center gap-3 flex rounded-lg w-full max-w-[200px]"
                  onClick={openAlert}
                >
                  <span>Delete Debate</span>
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
              {debate.total_votes_cache} votes
            </h3>
          </div>

          {/* LIKE AND DISLIKE */}
          <div className="flex gap-4 my-4">
            <Button
              className="w-[72px] h-[72px] p-0 bg-transparent hover:bg-transparent"
              isLoading={isVoting}
            >
              <IconWrapper
                className={`${
                  userVoted.reactionType === "like"
                    ? "bg-[#31D0AA]/10 text-[#31D0AA]"
                    : "bg-subtle_text text-light"
                } h-full w-full flex gap-1`}
                onClick={() =>
                  voteDebate({ type: "like", debate_id: debate.id })
                }
              >
                <Like1 />
                {debate.likePercentage}%
              </IconWrapper>
            </Button>

            <Button
              className="w-[72px] h-[72px] p-0 bg-transparent hover:bg-transparent"
              isLoading={isVoting}
            >
              <IconWrapper
                className={`${
                  userVoted.reactionType === "dislike"
                    ? " bg-[#E43F40]/10 text-[#E43F40]"
                    : "bg-subtle_text text-light"
                } w-full h-full    flex gap-1`}
                onClick={() =>
                  voteDebate({ type: "dislike", debate_id: debate.id })
                }
              >
                <Dislike />
                {debate.dislikePercentage}%
              </IconWrapper>
            </Button>
          </div>

        </div>

        {/* SHARE */}
        <Share
          shareableURL={
            frontendURL + `/democracy/debate/share/${debate.shareable_id}`
          }
        />

        {/* DELETE ALERT */}
        <ALert
          message="Are you sure you want to delete this debate"
          description="This action cannot be undone. This will permanently delete your debate."
          action={handleDelete}
          isOpen={alertOpen}
          close={closeAlert}
          loadingAction={isDeletingDebate}
        />
      </div>
    </div>
  );
};
export default DebateInfo;
