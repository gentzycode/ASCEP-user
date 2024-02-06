import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formattedDate } from "@/utils/helper";
import { CardEdit, Messages1, Trash } from "iconsax-react";

interface ProposalTopicInfoProp {
  topic: ProposalTopicType;
  scrollToComments: () => void;
  onOpen: () => void;
}
const ProposalTopicInfo: React.FC<ProposalTopicInfoProp> = ({
  topic,
  scrollToComments,
  onOpen,
}) => {
  return (
    <div className="flex justify-start gap-10 xl:flex-row flex-col">
      <div className=" w-full xl:min-w-[700px] flex flex-col gap-6">
      <h1 className="text-2xl lg:text-3xl text-dark py-3">{topic.title}</h1>
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
          <p className="text-text text-base md:text-xl text-justify py-10 max-w-[900px]">
            {topic.content}
          </p>
        </div>
      </div>
      <div className="w-full  md:w-[300px] flex justify-start flex-col gap-10">
        {/* AUTHOR */}
        {topic.user_id === topic.creator.id && (
          <div>
            <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
              Author
            </h2>
            <Button
              className="text-dark text-base h-fit  my-4 px-8  py-3 justify-center gap-3 flex rounded-lg w-full max-w-[200px]"
              onClick={onOpen}
            >
              <span>Edit Topic</span>
              <CardEdit />
            </Button>
            <Button className="text-light text-base bg-red-500 hover:bg-red-400 h-fit my-4 px-8 py-3 justify-center gap-3 flex rounded-lg w-full max-w-[200px]">
              <span>Delete Topic</span>
              <Trash />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalTopicInfo;
