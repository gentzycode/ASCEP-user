import { PropsWithChildren, createContext, useContext, useState } from "react";

interface ForgotPasswordContextType {
  step: number;
  next: () => void;
  prev: () => void;
  resetPasswordData: ForgotPasswordCredentials | null;
  setResetPasswordData: (args: ForgotPasswordCredentials) => void;
}

const ForgotPasswordContext = createContext<ForgotPasswordContextType>({
  step: 1,
  next: () => {},
  prev: () => {},
  resetPasswordData: null,
  setResetPasswordData: () => {},
});

export const useForgotPasswordContext = () => useContext(ForgotPasswordContext);

export default function ForgotPasswordProvider({
  children,
}: PropsWithChildren) {
  const [step, setStep] = useState(1);
  const [resetPasswordData, setResetPasswordData] =
    useState<ForgotPasswordCredentials | null>(null);

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  return (
    <ForgotPasswordContext.Provider
      value={{ step, next, prev, resetPasswordData, setResetPasswordData }}
    >
      {children}
    </ForgotPasswordContext.Provider>
  );
}
