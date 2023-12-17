import { useState } from "react";
import TwoFactorAuthEmailForm from "./TwoFactorAuthEmailForm";
import Select2FAType from "./Select2FAType";

export default function TwoFactorAuth() {
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-6">
      {step === 1 && <Select2FAType next={setStep} />}
      {step === 2 && <TwoFactorAuthEmailForm />}
    </div>
  );
}
