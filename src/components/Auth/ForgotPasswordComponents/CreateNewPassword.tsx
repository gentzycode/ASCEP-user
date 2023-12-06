import { useResetPassword } from "@/api/auth";
import { CardBackBtn, FormInput } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForgotPasswordContext } from "@/providers/ForgotPasswordProvider";
import { newPasswordSchema } from "@/schemas/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";

export default function CreateNewPassword() {
  const { prev, resetPasswordData } = useForgotPasswordContext();

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = form;

  const { mutate, isLoading } = useResetPassword();

  const onSubmit = (data: z.infer<typeof newPasswordSchema>) => {
    mutate({
      email: resetPasswordData?.email,
      token: resetPasswordData?.token,
      password: data.password,
    });
  };

  return (
    <div className="space-y-7">
      <CardBackBtn onClick={prev} />

      <div>
        <h2 className="text-[30px] text-center text-dark mb-4">
          Create New Password
        </h2>

        <p className="font-medium text-center text-text">
          Set a new password you wont easily forget
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="password"
            control={control}
            placeholder="Enter password"
            label="Password"
            type="password"
            errors={errors}
          />

          <FormInput
            name="confirmPassword"
            control={control}
            placeholder="Re-enter password"
            label="Password"
            type="password"
            errors={errors}
          />
          <Button isLoading={isLoading} type="submit" className="w-full">
            Get Started
          </Button>

          <div className="flex items-center justify-center w-full gap-1 text-xs text-center">
            <p>Don’t have an account? </p>
            <Link to="/auth/signupx" className="font-bold">
              Signup now
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
