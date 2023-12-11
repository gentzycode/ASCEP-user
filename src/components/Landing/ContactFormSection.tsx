/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { FormInput } from "../custom";
import { Form } from "../ui/form";
import FormTextArea from "../custom/FormTextArea";
import { Button } from "../ui/button";

export default function ContactFormSection() {
  const form = useForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const submitForm = (e: any) => {
    console.log(e);
  };
  return (
    <div className="grid grid-cols-2 gap-16 px-[100px] ">
      <div className="flex flex-col justify-center p-12">
        <div className="mb-12 space-y-5">
          <p className="text-lg uppercase text-primary">Send us a message</p>
          <p className="text-2xl text-[#6B6B6B]">
            Our friendly team would love to hear from you.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <FormInput
                name="firstname"
                control={control}
                errors={errors}
                label="First Name"
                placeholder="First Name"
                className="h-12"
              />
              <FormInput
                name="lastname"
                control={control}
                errors={errors}
                label="Last Name"
                placeholder="Last Name"
                className="h-12"
              />
            </div>

            <FormInput
              name="email"
              control={control}
              errors={errors}
              label="Email"
              placeholder="Email eg. you@company.com"
              className="h-12"
            />
            <FormInput
              name="mobile"
              control={control}
              errors={errors}
              label="Phone number"
              placeholder="Phone number eg. you@company.com"
              className="h-12"
            />

            <FormTextArea
              name="message"
              control={control}
              errors={errors}
              label="Message"
              height={200}
              placeholder="This is the active field of a text box"
            />

            <div className="flex items-center mb-8 space-x-3">
              <Checkbox className="w-6 h-6 bg-white rounded-md " id="terms1" />
              <label htmlFor="terms1" className="text-lg text-[#667085] ">
                You agree to our friendly{" "}
                <span className="underline">privacy policy.</span>
              </label>
            </div>

            <Button className="w-full ">Send Message</Button>
          </form>
        </Form>
      </div>

      <div className="">
        <img
          className="h-[800px] object-cover"
          src="/images/landing/map.png"
          alt=""
        />
      </div>
    </div>
  );
}
