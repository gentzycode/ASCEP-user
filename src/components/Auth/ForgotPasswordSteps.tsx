import { useForgotPasswordContext } from "@/providers/ForgotPasswordProvider";
import {
  CreateNewPassword,
  ForgotPassword,
  VerifyOtp,
} from "./ForgotPasswordComponents";

export default function ForgotPasswordSteps() {
  const { step } = useForgotPasswordContext();

  return (
    <div>
      {step === 1 && <ForgotPassword />}
      {step === 2 && <VerifyOtp />}
      {step === 3 && <CreateNewPassword />}
    </div>
  );
}
