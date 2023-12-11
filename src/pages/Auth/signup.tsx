import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";

import { FormCard } from "@/components/Auth";
import { FormInput } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signupSchema } from "@/schemas/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/api/auth";

export default function SignupPage() {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isLoading } = useRegister();

  function onSubmit(values: z.infer<typeof signupSchema>) {
    mutate(values);
  }
  return (
    <div>
      <img src="/images/logo.png" alt="logo" className="h-[70px]   mb-12" />

      <FormCard>
        <div className="space-y-7">
          <h2 className="text-[30px] text-center text-dark">
            Welcome to ASCEP
          </h2>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-[30px]">
              <FormInput
                name="firstname"
                label="First Name"
                control={control}
                placeholder="First Name"
                errors={errors}
              />
              <FormInput
                name="lastname"
                label="Last Name"
                control={control}
                placeholder="Last Name"
                errors={errors}
              />
              <FormInput
                name="email"
                label="Email"
                control={control}
                placeholder="Enter email"
                errors={errors}
              />
              <FormInput
                name="mobile"
                label="Phone Number"
                control={control}
                placeholder="Phone number"
                errors={errors}
                type=""
              />
              <FormInput
                name="username"
                label="Username"
                control={control}
                placeholder="Username"
                errors={errors}
              />
              <FormInput
                name="password"
                label="Password"
                control={control}
                placeholder="Enter password"
                type="password"
                errors={errors}
              />

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
          </Form>
        </div>
      </FormCard>
    </div>
  );
}
