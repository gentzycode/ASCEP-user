import { HTMLProps } from "react";

interface PollPartyProps extends HTMLProps<HTMLDivElement> {
  text: string;
}

export default function PollParty({
  text,
  className,
  ...props
}: PollPartyProps) {
  return (
    <div
      className={`w-[50px] font-semibold text-sm h-[50px] rounded-[10px] flex justify-center items-center ${className}`}
      {...props}
    >
      {text}
    </div>
  );
}
