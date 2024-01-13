import IconWrapper from "@/components/custom/IconWrapper 2";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Messages1, Moneys } from "iconsax-react";
import { SDGCard, TagDisplay, TargetDisplay } from "..";

interface InvestmentInfoProp {
  scrollToComments: () => void;
}

const proposalSDGs = [
  {
    sdgs_id: 1,
    proposal_id: 50,
    sdgs: {
      title: "No Poverty",
      banner:
        "https://res.cloudinary.com/djewdwjfh/image/upload/v1701525241/ascep/sdgs_banner/r4ps4eqn8salyrmdgl0v.png",
      id: 1,
    },
  },
  {
    sdgs_id: 2,
    proposal_id: 50,
    sdgs: {
      title: "Zero Hunger",
      banner:
        "https://res.cloudinary.com/djewdwjfh/image/upload/v1701525284/ascep/sdgs_banner/txtmrimdragt6vnll2jm.png",
      id: 2,
    },
  },
];

const proposalTarget = [
  {
    target_id: 3,
    proposal_id: 50,
    targetInfo: {
      code: "2.1",
      id: 3,
    },
  },
];

const proposalTag = [
  {
    id: 43,
    tag_name: "Enugu",
    proposal_id: 50,
  },
  {
    id: 44,
    tag_name: "Anambra",
    proposal_id: 50,
  },
  {
    id: 45,
    tag_name: "Road construction",
    proposal_id: 50,
  },
];

const InvestmentInfo: React.FC<InvestmentInfoProp> = ({ scrollToComments }) => {
  return (
    <div className="flex justify-start gap-10 xl:flex-row flex-col">
      <div className=" w-full xl:min-w-[700px] flex flex-col gap-6">
        <h1 className="text-2xl lg:text-3xl text-text">
          Strategic plan for a 100% green city
        </h1>
        <div className="flex justify-start items-center gap-6 flex-wrap">
          <Avatar className="h-12 w-12">
            <AvatarImage src={undefined} />
            <AvatarFallback className="uppercase font-[700]">AB</AvatarFallback>
          </Avatar>
          <h2 className="text-dark text-[14px] -ml-4">Dexter Olaniyi</h2>
          <p className="text-[12px] text-base-400 my-3 ">2023-10-28</p>
          <div
            className="flex items-center gap-3 rounded-[10px] px-3 py-1 text-white bg-dark text-xs w-fit cursor-pointer"
            onClick={scrollToComments}
          >
            <Messages1 size={20} />
            100 Comments
          </div>
          <div className="bg-[#27AE60]/10 text-[#27AE60] text-base py-1 px-3 rounded-full">
            Published
          </div>
        </div>

        {/* IMAGE */}
        <div className="w-full max-w-[700px] relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden my-8">
          <img
            src="/images/democracy/invest.png"
            className="absolute top-0 left-0 w-full h-full"
            alt=""
          />
        </div>

        {/* CODE */}
        <h2 className="text-subtitle_text text-lg lg:text-xl">
          Investment project code: 3
        </h2>
        {/* DESCRIPTION */}

        <p className="text-subtitle_text text-lg lg:text-xl">
          Social emergency financial aid is not just welfare benefits. They form
          part of the benefits implemented by the social protection system to
          overcome situations of social difficulty. In accordance with the
          provisions of Law 11/2003 on Social Services, these economic benefits,
          together with the techniques and materials, will be the actions
          carried out to achieve, re-establish or improve their welfare. <br />{" "}
          Based on data from the National Statistics Institute's Living
          Conditions Survey, it is estimated that 1% of the inhabitants of the
          municipality of "cannot afford a meal of meat, chicken or fish at
          least every two days", some 32,000 people. If we take into account
          that less than 14,000 people receive the Minimum Income of Insertion,
          we see that the population that cannot afford a basic diet is more
          than double that which receives economic aid from the Autonomous
          Community. This shows that the Community's aid does not reach all the
          people who need it either.
        </p>

        {/* MAP */}
        <div className="w-full max-w-[700px] relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden my-8">
          <img
            src="/images/democracy/map.png"
            alt="map"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        {/* SDGs */}
        {proposalSDGs.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {proposalSDGs.map((SDGs, i) => (
              <SDGCard SDG={SDGs.sdgs} key={SDGs.sdgs_id} index={i} />
            ))}
          </div>
        )}

        {/* TARGETS */}
        {proposalTarget.length > 0 && (
          <div className="flex gap-[8px] flex-wrap">
            {proposalTarget.map((target, i) => (
              <TargetDisplay
                target={target.targetInfo}
                key={target.target_id}
                index={i}
              />
            ))}
          </div>
        )}

        {/* TAGS */}
        {proposalTag.length > 0 && (
          <div className="flex gap-[8px] flex-wrap">
            {proposalTag.map((tag, i) => (
              <TagDisplay tag={tag.tag_name} key={tag.id} index={i} />
            ))}
          </div>
        )}
      </div>

      <div className="w-full  md:w-[300px] flex justify-start flex-col gap-10">
        <div className="w-[300px] space-y-3">
          <p className="text-subtle_text text-lg md:text-xl">
            Total budget for State
          </p>
          <div className="bg-dark rounded-xl px-3 py-1 flex justify-between items-center gap-3 w-full">
            <div>
              <h3 className="text-lg text-light">Anambra</h3>
              <h3 className="text-base text-[#F9F6FB] font-normal">
                ₦600, 000,000
              </h3>
            </div>
            <IconWrapper className="p-4 w-fit h-fit bg-[#FFC334]/10 text-primary">
              <Moneys size="25" />
            </IconWrapper>
          </div>
        </div>

        <div>
          <p className="text-subtle_text text-lg md:text-xl">
            Total price for investment
          </p>
          <p className="text-subtle_text text-lg md:text-xl">₦10, 000</p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentInfo;
