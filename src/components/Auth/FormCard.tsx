import { ReactNode } from "react";

interface FormCardProps {
  children: ReactNode;
  className?: string;
}

export default function FormCard({ children, className }: FormCardProps) {
  return (
    <div
      className={
        "p-6 md:p-[50px] bg-white rounded-3xl md:rounded-[40px] w-full max-w-[490px] " +
        className
      }
      // style={{
      //   width: "490px",
      // }}
    >
      {children}
    </div>
  );
}
