import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FormInput } from "../custom";
import { Form } from "../ui/form";
import { twoFactorAuthSchema } from "@/schemas/SettingsSchema";
import { Button } from "../ui/button";
import { useSettingsContext } from "@/providers/SettingsProvider";

export default function TwoFactorAuth() {
  const { setActiveOption } = useSettingsContext();
  const form = useForm<z.infer<typeof twoFactorAuthSchema>>({
    resolver: zodResolver(twoFactorAuthSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  function onSubmit(values: z.infer<typeof twoFactorAuthSchema>) {
    console.log(values);

    setActiveOption("Verify 2FA OTP");
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-dark">
        Enable two step authentication to secure your account from unwanted
        access
      </p>

      <Form {...form}>
        <form className="space-y-6">
          <div className="flex items-center justify-between ">
            <p className="text-subtle_text">Verify Email</p>
            <div className=" w-full max-w-[350px]">
              <FormInput
                name="email"
                label="Email"
                control={control}
                placeholder="Enter email"
                errors={errors}
              />
            </div>
          </div>
        </form>
      </Form>

      <p className="text-sm text-subtle_text">
        A mail will be sent to your mail box fro validation
      </p>

      <div className="flex items-center justify-end">
        <Button onClick={handleSubmit(onSubmit)} className="px-20">
          Enable 2FA
        </Button>
      </div>
    </div>
  );
}
