import { ReactNode } from "react";

interface FormCardProps {
  children: ReactNode;
  className?: string;
}

export default function FormCard({ children, className }: FormCardProps) {
  return (
    <div
      className={"p-[50px] bg-white rounded-[40px] " + className}
      style={{
        width: "490px",
      }}
    >
      {children}
    </div>
  );
}
