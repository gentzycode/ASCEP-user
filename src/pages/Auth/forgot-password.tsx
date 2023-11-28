import { FormCard } from "@/components/Auth";
import ForgotPasswordSteps from "@/components/Auth/ForgotPasswordSteps";
import ForgotPasswordProvider from "@/providers/ForgotPasswordProvider";

export default function ForgotPasswordPage() {
  return (
    <div>
      <img src="/images/logo.png" alt="logo" className="h-[70px]   mb-12" />

      <FormCard>
        <ForgotPasswordProvider>
          <ForgotPasswordSteps />
        </ForgotPasswordProvider>
      </FormCard>
    </div>
  );
}
