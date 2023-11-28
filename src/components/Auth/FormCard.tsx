import React, { PropsWithChildren } from "react";

export default function FormCard({ children }: PropsWithChildren) {
  return (
    <div
      className="p-[50px] bg-white rounded-[40px]"
      style={{
        width: "490px",
      }}
    >
      {children}
    </div>
  );
}
