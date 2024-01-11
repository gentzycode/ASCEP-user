import { IconWrapper } from "@/components/custom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ROUTES from "@/utils/routesNames";
import { Messages1, Moneys } from "iconsax-react";
import { Link } from "react-router-dom";

interface InvestmentCardProp {}
const InvestmentCard: React.FC<InvestmentCardProp> = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* TOP */}
      <div className="rounded-3xl overflow-hidden shadow-lg">
        <div className="w-full relative h-[100px]">
          <img
            src="/images/democracy/investment.png"
            alt=""
            className="absolute w-full h-full top-0 left-0 object-cover"
          />
        </div>
        <div className="bg-dark rounded-none p-3 flex justify-between items-center gap-3 w-full">
          <div>
            <h3 className="text-lg text-light">Awka</h3>
            <h3 className="text-base text-[#F9F6FB] font-normal">₦60, 000</h3>
          </div>
          <IconWrapper className="p-4 w-fit h-fit bg-[#FFC334]/10 text-primary">
            <Moneys size="25" />
          </IconWrapper>
        </div>
        <div className="bg-[#fff] p-4">
          <Link to={ROUTES.INVESTMENT_INFO_ROUTE("1")}>
            <h1 className="text-[20px] text-dark hover:underline">
              Strategic plan for a 100% green city
            </h1>
          </Link>
          {/* user info */}
          <div className="flex gap-3 my-2">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/images/avatar.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-dark text-[14px]">Dexter Olaniyi</h2>
              <h3 className="text-[12px] text-subtle_text">
                Dexterola@gmail.com
              </h3>
            </div>
          </div>
          <p className="text-[12px] text-base-400 my-3 ">2023-10-28</p>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col gap-3 bg-[#fff] p-4 rounded-3xl shadow-lg">
        <Button
          className="h-fit py-2 text-[12px] bg-dark text-light disabled:opacity-100"
          disabled
        >
          <Messages1 size="20" />
          <span>3 Comments</span>
        </Button>
        <Button
          className={`h-[50px] hover:bg-inherit px-8 disabled:opacity-100 w-full`}
          disabled
        >
          Read More
        </Button>
      </div>
    </div>
  );
};

export default InvestmentCard;
