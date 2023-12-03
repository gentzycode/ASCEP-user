/* eslint-disable @typescript-eslint/ban-ts-comment */
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { changePasswordSchema } from "@/schemas/SettingsSchema";
import { Form } from "../ui/form";
import { FormInput } from "../custom";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

export default function ChangePassword() {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    console.log(values);

    toast({
      title: "Success",
      description: "Password has been changed",
      variant: "success",
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">Old Password</p>
          <div className=" w-full max-w-[350px]">
            <FormInput
              name="oldPassword"
              label="Old Password"
              control={control}
              placeholder="Enter password"
              type="password"
              errors={errors}
            />
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">New Password</p>
          <div className=" w-full max-w-[350px]">
            <FormInput
              name="newPassword"
              label="New Password"
              control={control}
              placeholder="Enter password"
              type="password"
              errors={errors}
            />
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">Re-enter New Password</p>
          <div className=" w-full max-w-[350px]">
            <FormInput
              name="confirmPassword"
              label="Old Password"
              control={control}
              placeholder="Enter password"
              type="password"
              errors={errors}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium underline text-primary">Reset password</p>

          <Button>Update Password</Button>
        </div>
      </form>
    </Form>
  );
}
