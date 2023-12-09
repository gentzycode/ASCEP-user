import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Form } from "../ui/form";
import { FormInput } from "../custom";
import { Button } from "../ui/button";
import { editProfileSchema } from "@/schemas/SettingsSchema";
import { useUpdateProfile } from "@/api/auth";
import { ChangeEvent, useRef, useState } from "react";

export default function EditProfile({
  defaultValues,
}: {
  defaultValues: UserData;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [renderedImg, setRenderedImg] = useState<string | ArrayBuffer | null>(
    null
  );

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setSelectedImage(file);

    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();

      reader.onloadend = () => {
        // Set the selected image as a data URL
        setRenderedImg(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const { mutate, isLoading } = useUpdateProfile();

  function onSubmit(values: z.infer<typeof editProfileSchema>) {
    console.log(values);

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (selectedImage) {
      formData.append("profile_picture", selectedImage);
    }

    mutate(formData);
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        {renderedImg || defaultValues.profile_picture ? (
          <img
            src={(renderedImg as string) || defaultValues.profile_picture}
            className="w-[109px] h-[109px] rounded-full"
            alt="profile-photo"
          />
        ) : (
          <div className="flex items-center justify-center w-[109px] h-[109px] rounded-full bg-primary ">
            <p className="text-2xl font-bold ">
              {defaultValues?.firstname[0]} {defaultValues?.lastname[0]}
            </p>
          </div>
        )}

        <button
          onClick={() => inputRef.current?.click()}
          className="px-3 py-2 text-sm font-medium rounded-full active:opacity-60 text-brand_green2 bg-faded_green"
        >
          Change Profile picture
        </button>

        <input
          onChange={handleFileSelection}
          className="hidden"
          ref={inputRef}
          type="file"
          accept="image/*"
        />
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center justify-between ">
            <p className="text-subtle_text">First Name</p>
            <div className=" w-full max-w-[350px]">
              <FormInput
                name="firstname"
                label="First Name"
                control={control}
                placeholder="Enter password"
                errors={errors}
              />
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <p className="text-subtle_text">Last Name</p>
            <div className=" w-full max-w-[350px]">
              <FormInput
                name="lastname"
                label="Last Name"
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
                name="mobile"
                label="Phone number"
                control={control}
                placeholder="Enter phone number"
                errors={errors}
              />

              {/* <div className="flex justify-end">
                <p className="font-medium underline text-primary">
                  Change Phone number
                </p>
              </div> */}
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Button isLoading={isLoading}>Update Profile</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
