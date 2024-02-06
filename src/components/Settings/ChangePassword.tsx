/* eslint-disable @typescript-eslint/ban-ts-comment */
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { changePasswordSchema } from "@/schemas/SettingsSchema";
import { Form } from "../ui/form";
import { FormInput } from "../custom";
import { Button } from "../ui/button";
import { useChangePassword } from "@/api/auth";
import { useEffect } from "react";
import { useSettingsContext } from "@/providers/SettingsProvider";

export default function ChangePassword() {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate, isLoading, isSuccess } = useChangePassword();

  const { setActiveOption } = useSettingsContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    if (isSuccess) {
      reset();
      setActiveOption("User Profile");
    }
  }, [isSuccess]);

  function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    mutate({ newPassword: values.newPassword });
  }
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* <div className="flex flex-col justify-between md:items-center md:flex-row ">
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
        </div> */}
        <div className="flex flex-col justify-between md:items-center md:flex-row ">
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
        <div className="flex flex-col justify-between md:items-center md:flex-row ">
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

        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <p className="font-medium underline text-primary">Reset password</p>

          <Button isLoading={isLoading}>Update Password</Button>
        </div>
      </form>
    </Form>
  );
}
