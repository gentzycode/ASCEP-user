import { HTMLProps, ReactNode } from "react";

interface IconWrapperProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export default function IconWrapper({
  children,
  className,
  ...props
}: IconWrapperProps) {
  return (
    <div
      className={
        "w-10 h-10 bg-[#6B6B6B]/10 flex justify-center items-center rounded-[20px] " +
        className
      }
      {...props}
    >
      {children}
    </div>
  );
}
