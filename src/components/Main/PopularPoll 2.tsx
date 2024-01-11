import { Dislike, Like1 } from "iconsax-react";
import { IconWrapper } from "../custom";
import PollParty from "./PollParty";

export default function PopularPoll() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-10 bg-white p-6 rounded-[40px] ">
        <div className="mb-11">
          <h4 className="text-dark">
            Metro at night (on weekends). Is it positive?
          </h4>
          <p className="text-sm font-light text-subtle_text">2023-10-28</p>
        </div>

        <p className="text-[#64748B] font-medium text-sm ">
          This is a debate that has been going on for a long time and it is the
          possibility of opening the metro on weekends at night. It would be
          important to know if it is a positive measure or too expensive for
          what it reports to the city. is a debate that has been going on for a
          long time and it is the possibility of opening the metro on weekends
          at night
        </p>

        <div className="flex items-center gap-8 mt-4">
          <div className="flex gap-[6px]">
            <PollParty text="NP" className="bg-[#E84356]/10 text-[#E84356]" />
            <PollParty text="ZH" className="bg-[#DDA63A]/10 text-[#DDA63A]" />
            <PollParty text="GHAW" className="bg-[#4C9F38]/10 text-[#4C9F38]" />
            <PollParty text="+3" className="ml-1 text-white bg-dark" />
          </div>

          <div className="flex gap-2 font-semibold text-dark">
            <div className="bg-dark/10 rounded-[10px] px-5 py-[6px] text-xs ">
              Urbanism
            </div>
            <div className="bg-dark/10 rounded-[10px] px-5 py-[6px] text-xs ">
              Transport
            </div>
            <div className="bg-dark/10 rounded-[10px] px-5 py-[6px] text-xs ">
              Metro
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 bg-white p-6 rounded-[40px] flex flex-col items-center gap-4 ">
        <IconWrapper className="w-[72px] h-[72px] bg-[#31D0AA]/10 text-[#31D0AA]  ">
          <div className="flex items-center gap-1">
            <Like1 />
            83%
          </div>
        </IconWrapper>

        <IconWrapper className="w-[72px] h-[72px] bg-[#E43F40]/10 text-[#E43F40]  ">
          <div className="flex items-center gap-1">
            <Dislike />
            83%
          </div>
        </IconWrapper>

        <div className="flex items-center gap-2 rounded-[10px] px-2 py-1 text-white bg-dark text-xs ">
          <span className="text-sm material-symbols-outlined">forum</span>
          Comments
        </div>
      </div>
    </div>
  );
}
