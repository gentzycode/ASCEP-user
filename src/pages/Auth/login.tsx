import { useLogin } from "@/api/auth";
import { FormCard } from "@/components/Auth";
import { FormInput } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { loginSchema } from "@/schemas/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

export default function LoginPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isLoading } = useLogin();

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate(values);
  }

  return (
    <div>
      <img src="/images/logo.png" alt="logo" className="h-[70px] mb-12" />
      <FormCard>
        <div className="space-y-7 mb-7">
          <h2 className="text-[30px] text-center text-dark">Welcome back 😊</h2>
          <p className="font-medium text-center text-text">
            Hey, 👋🏼 Enter your details below to login to your account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <FormInput
              name="username"
              label="Username"
              control={control}
              placeholder="Enter username"
              errors={errors}
            />
            <FormInput
              name="password"
              label="Password"
              control={control}
              placeholder="Enter Password"
              errors={errors}
              type="password"
            />

            <div className="font-semibold cursor-pointer text-end">
              <Link to="/auth/forgot-password">Forgot Password?</Link>
            </div>

            <Button isLoading={isLoading} type="submit" className="w-full">
              Login
            </Button>

            <div className="flex items-center justify-center w-full gap-1 text-xs text-center">
              <p>Don’t have an account? </p>
              <Link to="/auth/signup" className="font-bold">
                Signup now
              </Link>
            </div>
          </form>
        </Form>
      </FormCard>
    </div>
  );
}
