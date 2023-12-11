import { Link, useLocation, useNavigate } from "react-router-dom";

import { FormCard } from "@/components/Auth";
import { CardBackBtn, CustomPinInput } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { SyntheticEvent, useEffect, useState } from "react";
import useCountdown from "@/hooks/useCountdown";
import { useResendOTP, useVerifyEmail } from "@/api/auth";

export default function OTPPage() {
  const [otp, setotp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  const { state } = useLocation();

  const { minutes, remainingSeconds, time } = useCountdown(state.timeLimit);
  const { isLoading: resending, isSuccess } = useResendOTP(email);

  const { mutate: verifyEmail, isLoading } = useVerifyEmail();

  useEffect(() => {
    if (isSuccess) setEmail(null);
  }, [isSuccess]);

  function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (otp.length < 6) {
      setOtpError("Enter a 6 digit code");
    } else {
      setOtpError(null);
    }
    verifyEmail({
      email: state.email,
      token: otp,
    });
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
          <CardBackBtn onClick={() => navigate(-1)} />
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

            {state.timeLimit > 0 && (
              <div className="flex gap-1 text-sm font-bold text-dark">
                {time > 0 ? (
                  <p>
                    You can resend OTP in {minutes} min {remainingSeconds} sec
                  </p>
                ) : (
                  <Button
                    isLoading={resending}
                    onClick={() => setEmail(state.email)}
                    size="xs"
                    type="button"
                  >
                    Resend
                  </Button>
                )}
              </div>
            )}

            <Button isLoading={isLoading} type="submit" className="w-full">
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
