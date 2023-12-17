import { Button } from "../../components/ui/button";
import { CardBackBtn, CustomPinInput } from "../../components/custom";
import { useState } from "react";
import { useLogin2fa } from "@/api/auth";
import { FormCard } from "@/components/Auth";
import { useLocation, useNavigate } from "react-router-dom";

export default function TwoFactorAuthLogin() {
  const [otp, setotp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);

  const { state } = useLocation();

  const navigate = useNavigate();

  const { mutate: login, isLoading } = useLogin2fa();

  const handleOtpChange = (value: string) => {
    setOtpError(null);
    setotp(value);
  };

  function onSubmit() {
    if (otp.length < 6) {
      setOtpError("Enter a 6 digit code");
    } else {
      setOtpError(null);
      const payload = {
        email: state.email,
        token: otp,
      };
      login(payload);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      <div>
        <img src="/images/logo.png" alt="logo" className="h-[70px] " />
      </div>

      <FormCard className="my-auto space-y-6">
        <CardBackBtn onClick={() => navigate(-1)} />
        <div className="space-y-7 mb-7">
          <h2 className="text-[30px] text-center text-dark">
            Two Factor Authentication
          </h2>
          <p className="font-medium text-center text-text">
            Enter the token sent to your email to login
          </p>
        </div>
        <div className="space-y-6">
          <form className="space-y-6">
            <CustomPinInput
              length={6}
              onChange={(e) => handleOtpChange(e)}
              error={otpError}
            />
          </form>

          <Button isLoading={isLoading} onClick={onSubmit} className="w-full">
            Login
          </Button>
        </div>
      </FormCard>
    </div>
  );
}
