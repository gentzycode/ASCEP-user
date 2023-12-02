import { Button } from "../ui/button";

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
              ? "bg-[rgba(232,67,86,0.10)]"
              : proposal.percentage > 40 && proposal.percentage < 70
              ? "bg-[rgba(221,166,58,0.10)]"
              : "bg-[rgba(76,159,56,0.10)]"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
            >
              <path
                d="M11.2072 12.181H7.54053V9.51432H12.2072V6.84766H14.8739V12.181H13.2072L12.2072 13.181L11.2072 12.181Z"
                stroke="#F9F6FB"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.54053 1.51465H12.2072V9.51465H5.87386L4.54053 10.848L3.20719 9.51465H1.54053V1.51465Z"
                stroke="#F9F6FB"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.20703 6.84831H6.20703M4.20703 4.18164H8.20703"
                stroke="#F9F6FB"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
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
