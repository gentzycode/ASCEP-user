import { Button } from "../ui/button";
import { CustomPinInput } from "../custom";
import { useState } from "react";
import { useSettingsContext } from "@/providers/SettingsProvider";
import { useToast } from "../ui/use-toast";

export default function TwoFactorAuthOTP() {
  const [otp, setotp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);

  const { setActiveOption, twoFactorAuth, setTwoFactorAuth } =
    useSettingsContext();
  const { toast } = useToast();

  const handleOtpChange = (value: string) => {
    setOtpError(null);
    setotp(value);
  };

  function onSubmit() {
    if (otp.length < 5) {
      setOtpError("Enter a 5 digit code");
    } else {
      setOtpError(null);
    }

    setTwoFactorAuth(!twoFactorAuth);

    toast({
      title: "Success!",
      description: twoFactorAuth ? "2FA Disabled" : "2FA Enabled",
      variant: "success",
    });

    setActiveOption("Enable 2FA");
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-dark">
        Enter the OTP we sent to Johndoe@demo.com
      </p>

      <form className="space-y-6">
        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">Verify OTP</p>
          <div className=" w-full max-w-[350px] flex justify-center">
            <CustomPinInput
              length={5}
              onChange={(e) => handleOtpChange(e)}
              error={otpError}
            />
          </div>
        </div>
      </form>

      <p className="text-sm text-subtle_text">
        Didnt Receive OTP? <strong>Resend (09)</strong>
      </p>

      <div className="flex items-center justify-end">
        <Button onClick={onSubmit} className="px-20">
          Verify
        </Button>
      </div>
    </div>
  );
}
