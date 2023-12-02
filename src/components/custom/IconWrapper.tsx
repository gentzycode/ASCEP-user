import { HTMLProps, PropsWithChildren, ReactNode } from "react";

interface IconWrapperProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export default function IconWrapper({ children, ...props }: IconWrapperProps) {
  return (
    <div
      {...props}
      className="w-10 h-10 rounded-full bg-[#6B6B6B]/10 flex justify-center items-center cursor-pointer"
    >
      {children}
    </div>
  );
}
