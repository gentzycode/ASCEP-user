import { Dislike, Like1, Messages1 } from "iconsax-react";
import { IconWrapper } from "../../custom";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";

interface DebatesCardViewCardProps {
  infoUrl: string;
}
const DebatesCardViewCard: React.FC<DebatesCardViewCardProps> = ({
  infoUrl,
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
        <div className="p-8">
          <Link to={infoUrl}>
            <h1 className="text-[20px] text-dark hover:underline">
              Metro at night (on weekends). Is it positive?
            </h1>
          </Link>
          <p className="text-[12px] text-base-400 my-3 ">2023-10-28</p>
          <p className="text-14px text-transparent h-[65px] pb-10 bg-gradient-to-t to-[#64748B] to-70% from-[#f0f2f4] bg-clip-text">
            This is a debate that has been going on for a long time and it is
            the possibility of opening the metro on weekends at night. It would
            be important to know if it is a positive measure or too expensive
            for what it reports to the city. is a debate that has been going on
            for a long time and it is the possibility of opening the metro on
            weekends at night
          </p>

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
      </div>
      <div className="bg-[#FFFFFF] shadow-xl flex lg:flex-col justify-center items-center  rounded-xl px-4 gap-4 py-3 ">
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
          <Messages1 />
          Comments
        </div>
      </div>
    </div>
  );
};

export default DebatesCardViewCard;
