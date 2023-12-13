import { Button } from "../ui/button";
import { CustomPinInput } from "../custom";
import { useState } from "react";
import { useSettingsContext } from "@/providers/SettingsProvider";
import useCountdown from "@/hooks/useCountdown";
import {
  useGetUserProfile,
  useResend2faToken,
  useVerify2faToken,
  useVerifyDisable2faToken,
} from "@/api/auth";

export default function TwoFactorAuthOTP() {
  const [otp, setotp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);

  const { timeLimit } = useSettingsContext();

  const { data } = useGetUserProfile();
  const { minutes, remainingSeconds, time } = useCountdown(timeLimit);

  const { mutate: resend, isLoading: resending } = useResend2faToken();

  const { mutate: verify, isLoading } = useVerify2faToken();
  const { mutate: verifyDisable, isLoading: disabling } =
    useVerifyDisable2faToken();

  const handleOtpChange = (value: string) => {
    setOtpError(null);
    setotp(value);
  };

  function onSubmit() {
    if (otp.length < 6) {
      setOtpError("Enter a 6 digit code");
    } else {
      setOtpError(null);
      data?.twoFA?.verified ? verifyDisable(otp) : verify(otp);
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-dark">
        Enter the OTP we sent to {data?.email}
      </p>

      <form className="space-y-6">
        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">Verify OTP</p>
          <div className=" w-full max-w-[350px] flex justify-center">
            <CustomPinInput
              length={6}
              onChange={(e) => handleOtpChange(e)}
              error={otpError}
            />
          </div>
        </div>
      </form>

      {/* <p className="text-sm text-subtle_text">
        Didnt Receive OTP? <strong>Resend (09)</strong>
      </p> */}
      {timeLimit > 0 && (
        <div className="flex gap-1 text-sm font-bold text-dark">
          {time > 0 ? (
            <p>
              Didnt Receive OTP? resend OTP in {minutes} min {remainingSeconds}{" "}
              sec
            </p>
          ) : (
            <Button
              isLoading={resending}
              onClick={() => resend()}
              size="xs"
              type="button"
            >
              Resend
            </Button>
          )}
        </div>
      )}

      <div className="flex items-center justify-end">
        <Button
          isLoading={isLoading || disabling}
          onClick={onSubmit}
          className="px-20"
        >
          Verify
        </Button>
      </div>
    </div>
  );
}
