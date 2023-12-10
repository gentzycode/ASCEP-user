import { IconWrapper } from "@/components/custom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formattedDate } from "@/utils/helper";
import {
  CardEdit,
  Dislike,
  DocumentCopy,
  Facebook,
  Flag,
  Like1,
  Messages1,
  Whatsapp,
} from "iconsax-react";
import { Link } from "react-router-dom";
import { DebateSDGs } from "..";

interface DebateInfoProps {
  debate: DebateType;
}
const DebateInfo: React.FC<DebateInfoProps> = ({ debate }) => {
  return (
    <div className="flex justify-start gap-10 lg:flex-row flex-col">
      <div className=" w-full lg:min-w-[550px] lg:w-fit flex flex-col gap-6">
        {/* MAIN INFO */}
        <div>
          <h1 className="text-[20px] text-dark">{debate.title}</h1>
          <div className="flex justify-start items-center gap-6 my-4 flex-wrap">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={
                  debate.author.profile_picture
                    ? debate.author.profile_picture
                    : undefined
                }
              />
              <AvatarFallback className="uppercase font-[700]">
                {debate.author.username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-dark text-[14px] -ml-4">
              {debate.author.username}
            </h2>
            <p className="text-[12px] text-base-400 my-3 ">
              {formattedDate(debate.createdAt)}
            </p>
            <div className="flex items-center gap-3 rounded-[10px] px-3 py-1 text-white bg-dark text-xs w-fit">
              <Messages1 size={20} />
              {debate.total_comments_cache} Comments
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: debate.description }} />
        </div>

        {/* SDGs */}
        {debate.debateSDGs.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {debate.debateSDGs.map((SDGs) => (
              <DebateSDGs SDGs={SDGs} key={SDGs.sdgs_id} />
            ))}
          </div>
        )}

        {/* TARGETS */}
        {debate.debateTarget.length > 0 && (
          <div className="flex gap-[8px] flex-wrap">
            {debate.debateTarget.map((target) => (
              <Button
                key={target.target_id}
                className="h-fit text-[12px] text-dark bg-light_grey px-[25px]"
              >
                Traget {target.targetInfo.code}
              </Button>
            ))}
          </div>
        )}

        {/* TAGS */}
        {debate.debateTag.length > 0 && (
          <div className="flex gap-[8px] flex-wrap">
            {debate.debateTag.map((tag) => (
              <Button
                key={tag.id}
                className="h-fit text-[12px] text-dark bg-light_grey px-[20px]"
              >
                {tag.tag_name}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="w-full  md:w-[400px] flex justify-start flex-col gap-10">
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
            <Button className="text-dark text-[16px] h-fit w-fit my-4 px-8 justify-center gap-3 flex rounded-lg">
              <span>Edit</span>
              <CardEdit />
            </Button>
          </div>
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
          <div className="flex gap-4 my-4">
            <IconWrapper className="w-[72px] h-[72px] bg-[#31D0AA]/10 text-[#31D0AA]  flex gap-1">
              <Like1 />
              {debate.likePercentage}%
            </IconWrapper>
            <IconWrapper className="w-[72px] h-[72px]  bg-[#E43F40]/10 text-[#E43F40]   flex gap-1">
              <Dislike />
              {debate.dislikePercentage}%
            </IconWrapper>
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
      </div>
    </div>
  );
};
export default DebateInfo;
