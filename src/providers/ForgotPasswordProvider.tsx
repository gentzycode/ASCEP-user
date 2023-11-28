import { PropsWithChildren, createContext, useContext, useState } from "react";

const ForgotPasswordContext = createContext({
  step: 1,
  next: () => {},
  prev: () => {},
});

export const useForgotPasswordContext = () => useContext(ForgotPasswordContext);

export default function ForgotPasswordProvider({
  children,
}: PropsWithChildren) {
  const [step, setStep] = useState(1);

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  return (
    <ForgotPasswordContext.Provider value={{ step, next, prev }}>
      {children}
    </ForgotPasswordContext.Provider>
  );
}
