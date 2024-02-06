import { ForgotPasswordSteps, FormCard } from "@/components/Auth";
import ForgotPasswordProvider from "@/providers/ForgotPasswordProvider";

export default function ForgotPasswordPage() {
  return (
    <div>
      <img src="/images/logo.png" alt="logo" className="h-[70px]   mb-12" />

      <div className="flex justify-center md:justify-start">
        <FormCard>
          <ForgotPasswordProvider>
            <ForgotPasswordSteps />
          </ForgotPasswordProvider>
        </FormCard>
      </div>
    </div>
  );
}
