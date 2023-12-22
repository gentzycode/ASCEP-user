import { useGetProposalTopicInfo } from "@/api/democracy/proposals";
import { ProposalTopicComments } from "@/components/Democracy";
import { IconWrapper } from "@/components/custom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formattedDate } from "@/utils/helper";
import { Danger, Messages1 } from "iconsax-react";
import { useRef } from "react";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";

interface ProposalTopicInfoPageProps {}
const ProposalTopicInfoPage: React.FC<ProposalTopicInfoPageProps> = () => {
  const { topicId } = useParams();
  const {
    data: topic,
    isLoading: isLoadingTopic,
    isFetching: isFetchingTopic,
    isError,
    refetch,
  } = useGetProposalTopicInfo(topicId!);

  const commentsSectionRef = useRef<HTMLDivElement | null>(null);
  const scrollToComments = () => {
    commentsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      {/* ERROR */}
      {isError && (
        <div className="flex items-center flex-wrap justify-between border-2 border-primary rounded-md p-2 bg-[#F59E0B]/10 my-10">
          <div className="flex justify-start items-center gap-1">
            <IconWrapper className="text-primary rounded-full">
              <Danger size="32" />
            </IconWrapper>
            <p className="text-[16px]">No topic Found</p>
          </div>
        </div>
      )}
      {/* LOADING */}
      {isLoadingTopic && (
        <div className="w-full flex justify-center">
          <IconWrapper className=" text-primary my-10 w-fit h-full rounded-full">
            <FaSpinner className="animate-spin text-[100px]" />
          </IconWrapper>
        </div>
      )}
      {topic && (
        <div className="">
          <h1 className="text-xl md:text-2xl text-dark my-2">{topic.title}</h1>
          <div className="flex justify-start items-center gap-6 flex-wrap">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={
                  topic.creator.profile_picture
                    ? topic.creator.profile_picture
                    : undefined
                }
              />
              <AvatarFallback className="uppercase font-[700]">
                {topic?.creator.username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-dark text-[14px] -ml-4">
              {topic.creator.username}
            </h2>
            <p className="text-[12px] text-base-400 my-3 ">
              {formattedDate(topic?.created_at)}
            </p>
            <div
              className="flex items-center gap-3 rounded-[10px] px-3 py-1 text-white bg-dark text-xs w-fit cursor-pointer"
              onClick={scrollToComments}
            >
              <Messages1 size={20} />
              {topic.total_comment_cache} Comments
            </div>
          </div>
          <div>
            <p className="text-text text-base md:text-xl text-justify py-10 max-w-[900px]">{topic.content}</p>
          </div>
        </div>
      )}

      {/*COMMENTS */}
      <div
        className="my-10 w-full max-w-[700px]"
        id="comments"
        ref={commentsSectionRef}
      >
        <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
          Comments
        </h2>
        <div className="flex gap-10 flex-col mt-10">
          {topic && <ProposalTopicComments />}
        </div>
      </div>
    </div>
  );
};
export default ProposalTopicInfoPage;
