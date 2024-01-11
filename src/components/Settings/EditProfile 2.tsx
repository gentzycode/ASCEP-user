import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Form } from "../ui/form";
import { FormInput } from "../custom";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { editProfileSchema } from "@/schemas/SettingsSchema";

export default function EditProfile() {
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
  });

  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  function onSubmit(values: z.infer<typeof editProfileSchema>) {
    console.log(values);

    toast({
      title: "Success!",
      description: "Profile updated",
      variant: "success",
    });
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <img
          src="/images/profile-large.png"
          className="w-[109px] h-[109px] rounded-full"
          alt="profile-photo"
        />

        <button className="px-3 py-2 text-sm font-medium rounded-full text-brand_green2 bg-faded_green">
          Change Profile picture
        </button>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center justify-between ">
            <p className="text-subtle_text">Full Name</p>
            <div className=" w-full max-w-[350px]">
              <FormInput
                name="fullName"
                label="Full Name"
                control={control}
                placeholder="Enter password"
                errors={errors}
              />
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <p className="text-subtle_text">Email</p>
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
          <div className="flex items-center justify-between ">
            <p className="text-subtle_text">Username</p>
            <div className=" w-full max-w-[350px]">
              <FormInput
                name="username"
                label="Username"
                control={control}
                placeholder="Enter username"
                errors={errors}
              />
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <p className="text-subtle_text">Phone number</p>
            <div className=" w-full max-w-[350px] ">
              <FormInput
                name="phone"
                label="Phone number"
                control={control}
                placeholder="Enter phone number"
                errors={errors}
              />

              <div className="flex justify-end">
                <p className="font-medium underline text-primary">
                  Change Phone number
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Button>Update Profile</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
