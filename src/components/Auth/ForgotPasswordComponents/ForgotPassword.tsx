import { CardBackBtn, FormInput } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForgotPasswordContext } from "@/providers/ForgotPasswordProvider";
import { forgotPasswordSchema } from "@/schemas/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ForgotPassword() {
  const { next, prev } = useForgotPasswordContext();
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    console.log(data);
    next();
  };
  return (
    <div className="space-y-7">
      <CardBackBtn onClick={prev} />
      <h2 className="text-[30px] text-center text-dark">Forgot Password?</h2>

      <p className="font-medium text-center text-text">
        Lets help you recover it, Enter your email Address to continue
      </p>

      <Form {...form}>
        <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="email"
            control={control}
            placeholder="Enter email"
            errors={errors}
          />

          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
