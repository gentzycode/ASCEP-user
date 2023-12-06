import { CardBackBtn, CustomPinInput } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { useForgotPasswordContext } from "@/providers/ForgotPasswordProvider";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setotp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);

  const { next, prev, setResetPasswordData, resetPasswordData } =
    useForgotPasswordContext();

  const handleOtpChange = (value: string) => {
    setOtpError(null);
    setotp(value);
  };

  function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (otp.length < 6) {
      setOtpError("Enter a 6 digit code");
    } else {
      setOtpError(null);

      next();
      setResetPasswordData({ ...resetPasswordData, token: otp });
    }
  }

  return (
    <div className="space-y-7">
      <CardBackBtn onClick={prev} />
      <h2 className="text-[30px] text-center text-dark">Verify OTP</h2>

      <p className="font-medium text-center text-text">
        Enter the six (6) Digit code that was sent to your email
      </p>

      <form onSubmit={onSubmit} className="space-y-[30px]">
        <div className="flex justify-center">
          <CustomPinInput
            length={6}
            onChange={(e) => handleOtpChange(e)}
            error={otpError}
          />
        </div>
        <Button type="submit" className="w-full">
          Get Started
        </Button>

        <div className="flex items-center justify-center w-full gap-1 text-xs text-center">
          <p>Don’t have an account? </p>
          <Link to="/auth/signup" className="font-bold">
            Signup now
          </Link>
        </div>
      </form>
    </div>
  );
}
