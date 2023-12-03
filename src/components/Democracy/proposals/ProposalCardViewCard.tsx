import { Messages1 } from "iconsax-react";
import { Button } from "../../ui/button";

interface ProposalCardViewCardProps {
  proposal: ProposalType;
}

const ProposalCardViewCard: React.FC<ProposalCardViewCardProps> = ({
  proposal,
}) => {
  const bgColors = [
    "rgba(232, 67, 86, 0.10)",
    "rgba(221, 166, 58, 0.10)",
    "rgba(76,159, 56, 0.10)",
    "#292925",
  ];
  const textColors = ["#E84356", "#DDA63A", "#4C9F38", "#F9F6FB"];
  return (
    <div className="col-span-1 flex flex-col lg:flex-row gap-3">
      <div className="bg-[#FFFFFF] shadow-xl flex flex-col md:flex-row justify-start rounded-xl overflow-hidden">
        <div className="relative h-[100px] md:h-full w-full">
          <img
            src="/images/card-image.png"
            alt="image"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <div>
            <h1 className="text-[20px] text-dark">{proposal.title}</h1>
            <p className="text-[12px] text-base-400 my-3 ">{proposal.date}</p>
            <p className="text-14px text-transparent h-[65px] pb-10 bg-gradient-to-t to-[#64748B] to-70% from-[#f0f2f4] bg-clip-text">
              {proposal.content}
            </p>
          </div>

          <div className="my-6 flex gap-[4px]">
            {Array.from(["1", "2", "3", "+3"]).map((num, index) => {
              return (
                <Button
                  className={`w-[50px] rounded-lg hover:bg-current`}
                  key={index}
                  style={{
                    backgroundColor: `${bgColors[index]}`,
                    color: `${textColors[index]}`,
                    opacity: "10",
                  }}
                >
                  {num}
                </Button>
              );
            })}
          </div>
          <div className="flex gap-[8px] flex-wrap">
            {proposal.tags.map((tag, index) => (
              <Button
                key={index}
                className="h-fit text-[12px] text-dark bg-light_grey px-[20px]"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div
        className="bg-[#FFFFFF] shadow-xl flex lg:flex-col
   justify-center items-center  rounded-xl px-4 gap-4 py-3 "
      >
        <Button
          className={`${
            proposal.percentage < 40
              ? "bg-[#E84356]/10"
              : proposal.percentage > 40 && proposal.percentage < 70
              ? "bg-[#DDA63A]/10"
              : "bg-[#4C9F38]/10"
          } ${
            proposal.percentage < 40
              ? "text-[#E84356]"
              : proposal.percentage > 40 && proposal.percentage < 70
              ? "text-[#DDA63A]"
              : "text-[#4C9F38]"
          } w-[74px] h-[74px] hover:bg-inherit `}
        >
          {proposal.percentage}%
        </Button>
        <div className="flex flex-col gap-2">
          <Button className="h-fit text-[12px] bg-dark text-light">
            <Messages1 size="25" />
            <span>5 support needed</span>
          </Button>
          <Button className="h-fit text-[16px] w-full rounded-full">
            Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProposalCardViewCard;
