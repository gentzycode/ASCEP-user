import { Send } from "iconsax-react";
import { Input, InputProps } from "../ui/input";
import { LiaCommentsSolid } from "react-icons/lia";
import { FaSpinner } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { commentInputSchema } from "@/schemas/GeneralSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

interface CommentInputProps extends InputProps {
  isLoading?: boolean;
  isSent?: boolean;
  handleSend: (arg: z.infer<typeof commentInputSchema>) => void;
}

export default function CommentInput({
  handleSend,
  isLoading,
  isSent,
  ...props
}: CommentInputProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<z.infer<typeof commentInputSchema>>({
    resolver: zodResolver(commentInputSchema),
    defaultValues: {
      content: props.defaultValue as string,
    },
  });

  useEffect(() => {
    if (isSent) resetField("content");
  }, [isSent]);
  return (
    <div className="relative">
      <div className="absolute left-0 h-full p-3">
        <div className="flex gap-1 items-center bg-dark rounded-[10px]  h-full text-white px-3 ">
          <LiaCommentsSolid size={16} />
          <p className="text-xs">
            2 <span className="hidden md:inline-block">Comments</span>
          </p>
        </div>
      </div>
      <Input
        {...register("content")}
        className={`bg-[#fff] pl-[70px] md:pl-[135px] pr-16 text-base text-text focus-visible:ring-0 focus-visible:ring-primary border-none focus:border-none focus-visible:ring-offset-0 rounded-[20px] h-[50px] placeholder:text-base  placeholder:font-medium shadow-sm ${
          errors.content
            ? "placeholder:text-error placeholder:text-sm "
            : "placeholder:text-subtle_text/30"
        }`}
        placeholder={errors?.content?.message || props.placeholder}
      />
      <div className="absolute top-0 right-0 flex items-center h-full px-4 cursor-pointer">
        {isLoading ? (
          <FaSpinner className="text-xl animate-spin text-primary" />
        ) : (
          <Send
            onClick={handleSubmit(handleSend)}
            className="text-dark text-xl md:text-[30px] "
            variant="Bold"
          />
        )}
      </div>
    </div>
  );
}
