import { Link, useNavigate } from "react-router-dom";

import { FormCard } from "@/components/Auth";
import { CardBackBtn, CustomPinInput } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { SyntheticEvent, useState } from "react";

export default function OTPPage() {
  const [otp, setotp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);

  const navigate = useNavigate();

  function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (otp.length < 5) {
      setOtpError("Enter a 5 digit code");
    } else {
      setOtpError(null);
      navigate("/auth/login");
    }
    console.log(otp);
  }
  const handleOtpChange = (value: string) => {
    setOtpError(null);
    setotp(value);
  };
  return (
    <div>
      <img src="/images/logo.png" alt="logo" className="h-[70px]   mb-12" />

      <FormCard>
        <div className="space-y-7">
          <CardBackBtn onClick={() => navigate("/auth/signup")} />
          <h2 className="text-[30px] text-center text-dark">Verify OTP</h2>

          <p className="font-medium text-center text-text">
            Enter the five (5) Digit code that was sent to your email
          </p>

          <form onSubmit={onSubmit} className="space-y-[30px]">
            <div className="flex justify-center">
              <CustomPinInput
                length={5}
                onChange={(e) => handleOtpChange(e)}
                error={otpError}
              />
            </div>
            <Button type="submit" className="w-full">
              Get Started
            </Button>

            <div className="flex items-center justify-center w-full gap-1 text-xs text-center">
              <p>Have an account? </p>
              <Link to="/auth/login" className="font-bold">
                Login now
              </Link>
            </div>
          </form>
        </div>
      </FormCard>
    </div>
  );
}
