import { IconWrapper } from "@/components/custom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CardEdit,
  Dislike,
  DocumentCopy,
  Facebook,
  Like1,
  Messages1,
  Whatsapp,
} from "iconsax-react";
import { Link } from "react-router-dom";

interface DebateInfoProps {}
const DebateInfo: React.FC<DebateInfoProps> = () => {
  return (
    <div className="flex justify-start gap-10 lg:flex-row flex-col">
      <div className=" w-full lg:w-fit">
        <h1 className="text-[20px] text-dark">
          Metro at night (on weekends). Is it positive?
        </h1>
        <div className="flex justify-start items-center gap-6 my-4 flex-wrap">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/images/avatar.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="text-dark text-[14px] -ml-4">Dexter Olaniyi</h2>
          <p className="text-[12px] text-base-400 my-3 ">2023-10-28</p>
          <div className="flex items-center gap-3 rounded-[10px] px-3 py-1 text-white bg-dark text-xs w-fit">
            <Messages1 size={20} />3 Comments
          </div>
        </div>

        <p className="max-w-[900px] text-justify">
          This is a debate that has been going on for a long time and it is the
          possibility of opening the metro on weekends at night. It would be
          important to know if it is a positive measure or too expensive for
          what it reports to the city. is a debate that has been going on for a
          long time and it is the possibility of opening the metro on weekends
          at night We do not need too high a frequency, but we do not need more
          than 20 minutes, because if we had to change trains, it would drive
          many people back. It would be interesting, if someone knows a little
          more about the subject, to know the cons that this would have, because
          I believe that currently, there is no metro in the world that is open
          at night, so I do not think it is an easy task.
        </p>

        <div className="my-6 flex gap-[4px]">
          {Array.from(["1", "2", "3", "+3"]).map((num, index) => {
            return (
              <Button
                className={`w-[50px] rounded-lg hover:bg-current`}
                key={index}
              >
                {num}
              </Button>
            );
          })}
        </div>
        <div className="flex gap-[8px] flex-wrap">
          {["Urbanism", "Transport", "Metro"].map((tag, index) => (
            <Button
              key={index}
              className="h-fit text-[12px] text-dark bg-light_grey px-[20px]"
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      <div className="w-full  md:w-[400px] flex justify-start flex-col gap-12">
        {/* AUTHOR */}
        <div>
          <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
            Author
          </h2>
          <Button className="text-dark text-[16px] h-fit w-fit my-4 px-8 justify-center gap-3 flex rounded-lg">
            <span>Edit</span>
            <CardEdit />
          </Button>
        </div>

        {/* SUPPORT */}
        <div>
          <div className="flex justify-start items-center gap-8">
            <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit">
              Support
            </h2>
            <h3 className="capitalize text-dark text-[14px] ">4 votes</h3>
          </div>
          <div className="flex gap-4 my-4">
            <IconWrapper className="w-[72px] h-[72px] bg-[#31D0AA]/10 text-[#31D0AA]  flex gap-1">
              <Like1 />
              83%
            </IconWrapper>
            <IconWrapper className="w-[72px] h-[72px]  bg-[#E43F40]/10 text-[#E43F40]   flex gap-1">
              <Dislike />
              83%
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
