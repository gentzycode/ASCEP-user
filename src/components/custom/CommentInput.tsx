import { Send } from "iconsax-react";
import { Input, InputProps } from "../ui/input";
import { LiaCommentsSolid } from "react-icons/lia";

export default function CommentInput(props: InputProps) {
  return (
    <div className="relative">
      <div className="absolute left-0 h-full p-3">
        <div className="flex gap-1 items-center bg-dark rounded-[10px]  h-full text-white px-3 ">
          <LiaCommentsSolid size={16} />
          <p className="text-xs">2 Comments</p>
        </div>
      </div>
      <Input
        className="bg-[#fff] pl-[135px] text-base text-text focus-visible:ring-0 focus-visible:ring-primary border-none focus:border-none focus-visible:ring-offset-0 rounded-[20px] h-[50px] placeholder:text-base placeholder:text-subtle_text/30 placeholder:font-medium shadow-sm"
        placeholder={props.placeholder}
      />
      <div className="absolute top-0 right-0 flex items-center h-full px-4 cursor-pointer">
        <Send className="text-dark" size="30" variant="Bold" />
      </div>
    </div>
  );
}
