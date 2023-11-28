import { ArrowLeft2 } from "iconsax-react";
import { MouseEventHandler } from "react";

export default function CardBackBtn({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className="flex items-center bg-[#959697]/10 rounded-[20px] w-fit text-[#959697] pr-5 pl-3 py-3 cursor-pointer gap-2"
      onClick={onClick}
    >
      <ArrowLeft2 size={20} />
      <p>Back</p>
    </div>
  );
}
