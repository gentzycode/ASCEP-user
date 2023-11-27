import FormInput from "@/components/custom/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function HomePage() {
  const form = useForm();
  return (
    <div className="flex flex-col items-center p-12 ">
      <h1 className="h1">Index Page </h1>
      <Button
        variant="outline-primary"
        leftIcon={
          <span className="font-normal material-symbols-outlined">mail</span>
        }
      >
        Prophet Bestman
      </Button>

      <Form {...form}>
        <div className="w-[400px]">
          <FormInput
            name="username"
            control={form.control}
            placeholder="First Name"
            type="password"
          />
        </div>
      </Form>
    </div>
  );
}
