import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { createPostSchema } from "@/schemas/SettingsSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { Form } from "../ui/form";
import { FormInput } from "../custom";
import { FaPlus } from "react-icons/fa";
import { useGetAllCategories } from "@/api/category";
import { useGetAllSDGs } from "@/api/sdg";
import { useNavigate } from "react-router-dom";

interface CreatePostModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function CreateReportModal({
  isOpen,
  onClose,
}: CreatePostModalProps) {
  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
  });

  const navigate = useNavigate();

  const { data: allSDGs } = useGetAllSDGs();
  const { data: allCategories } = useGetAllCategories();
  console.log(allSDGs);
  console.log(allCategories);

  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  function onSubmit(values: z.infer<typeof createPostSchema>) {
    console.log(values);

    toast({
      title: "Success",
      description: "Password has been changed",
      variant: "success",
    });
    onClose();

    setTimeout(() => {
      navigate("/response/activity");
    }, 1000);
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="min-w-[700px]"
        style={{ borderRadius: 40, padding: 32 }}
      >
        <h4 className="pb-3 border-b border-dark/10 ">Create a post</h4>

        <div className="pt-8 space-y-8">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Image</p>

                <div className=" w-full max-w-[350px]">
                  <Button className="w-14 " type="button">
                    <FaPlus />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Title</p>
                <div className=" w-full max-w-[350px]">
                  <FormInput
                    name="title"
                    label="Title"
                    control={control}
                    placeholder="Enter title"
                    errors={errors}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Category</p>
                <div className=" w-full max-w-[350px]">
                  <FormInput
                    name="category"
                    label="Category"
                    control={control}
                    placeholder="Enter category"
                    errors={errors}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Location</p>
                <div className=" w-full max-w-[350px]">
                  <FormInput
                    name="location"
                    label="Location"
                    control={control}
                    placeholder="Enter location"
                    type="password"
                    errors={errors}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Button className="w-[180px]">Create</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
