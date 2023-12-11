import { useForgotPassword } from "@/api/auth";
import { CardBackBtn, FormInput } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { forgotPasswordSchema } from "@/schemas/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string | null>(null);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = form;

  const { isLoading, isSuccess, isError } = useForgotPassword(email);

  useEffect(() => {
    if (isSuccess || isError) setEmail(null);
  }, [isSuccess, isError]);

  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    setEmail(data.email);
  };
  return (
    <div className="space-y-7">
      <CardBackBtn onClick={() => navigate(-1)} />
      <h2 className="text-[30px] text-center text-dark">Forgot Password?</h2>

      <p className="font-medium text-center text-text">
        Lets help you recover it, Enter your email Address to continue
      </p>

      <Form {...form}>
        <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="email"
            label="Email"
            control={control}
            placeholder="Enter email"
            errors={errors}
          />

          <Button isLoading={isLoading} type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
