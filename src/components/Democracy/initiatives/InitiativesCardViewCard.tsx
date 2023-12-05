import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Notification, Messages1 } from "iconsax-react";

interface InitiativesCardViewCardProps {
  initiatives: InitiativesType;
}

const InitiativesCardViewCard: React.FC<InitiativesCardViewCardProps> = ({
  initiatives,
}) => {
  const bgColors = {
    red: "rgba(232, 67, 86, 0.10)",
    yellow: "rgba(221, 166, 58, 0.10)",
    green: "rgba(76,159, 56, 0.10)",
    black: "#292925",
  };
  const textColors = {
    red: "#E84356",
    yellow: "#DDA63A",
    green: "#4C9F38",
    black: "#F9F6FB",
  };

  return (
    <div className=" flex flex-col gap-3 max-w-[600px] ">
      {/* TOP CON */}
      <div className="bg-[#FFFFFF] shadow-xl flex flex-col justify-start rounded-xl overflow-hidden">
        {/* image */}
        <div className="relative h-[100px]  w-full">
          <img
            src="/images/card-image.png"
            alt="image"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <div>
            <h1 className="text-[20px] text-dark">{initiatives.title}</h1>
            {/* user info */}
            <div className="flex gap-3 my-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/images/avatar.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-dark text-[14px]">{initiatives.user}</h2>
                <h3 className="text-[12px] text-subtle_text">
                  {initiatives.email}
                </h3>
              </div>
            </div>
            <div className="flex justify-start gap-4">
              <p className="text-[12px] text-base-400 my-3 ">
                {initiatives.date}
              </p>
              <p className="text-[12px] text-base-400 my-3 capitalize">
                {initiatives.status}
              </p>
            </div>
            <p className="text-14px text-transparent h-[80px] pb-10 bg-gradient-to-t to-[#64748B] to-70% from-[#f0f2f4] bg-clip-text">
              {initiatives.content}
            </p>
          </div>

          <div className="my-6 flex justify-between gap-1 flex-wrap">
            <Button className="bg-dark text-light capitalize text-[12px]">
              <Notification size="25" />
              <span>{initiatives.follower} followers</span>
            </Button>
            <Button className="bg-dark text-light capitalize text-[12px]">
              <Messages1 size="25" />
              <span>{initiatives.comments} comments</span>
            </Button>
          </div>
          <div className="flex gap-[8px] flex-wrap">
            {initiatives.tags.map((tag, index) => (
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

      {/* BOTTOM CON */}
      <div
        className="bg-[#FFFFFF] shadow-xl flex
       justify-center items-center  rounded-xl px-4 gap-4 py-4 "
      >
        <Button
          className={`h-[74px] hover:bg-inherit px-8 w-fit`}
          style={{ color: textColors["red"], backgroundColor: bgColors["red"] }}
        >
          1/2000
        </Button>
        <div className="flex flex-col gap-2">
          <Button className="h-fit py-2 text-[12px] bg-dark text-light">
            <Messages1 size="20" />
            <span>1999 support needed</span>
          </Button>
          <Button className="h-fit text-[16px] w-full rounded-full">
            Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InitiativesCardViewCard;
