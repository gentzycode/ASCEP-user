import { ReactNode } from "react";
import { IconWrapper } from "../custom";

interface MainStatsCardProps {
  icon: ReactNode;
  title: string;
  count: number;
}

export default function MainStatsCard({
  icon,
  count,
  title,
}: MainStatsCardProps) {
  return (
    <div className="flex items-center p-6 bg-secondary rounded-[20px] gap-[18px]">
      <IconWrapper className="w-[50px] bg-[#FFC3341A] h-[50px] rounded-xl">
        <div className="text-primary text-[24px]">{icon}</div>
      </IconWrapper>
      <div>
        <h3 className="text-2xl font-bold text-white">{count}</h3>
        <p className="text-[#F9F6FB]/50 text-sm">{title}</p>
      </div>
    </div>
  );
}
