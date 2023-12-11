import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { createPostSchema } from "@/schemas/SettingsSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { Form } from "../ui/form";
import { FormInput, SDGMultiSelect } from "../custom";
import { FaPlus } from "react-icons/fa";
// import { useGetAllCategories } from "@/api/category";
// import { useGetAllSDGs } from "@/api/sdg";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useRef, useState } from "react";

interface CreatePostModalProps {
  onClose: () => void;
  isOpen: boolean;
}

interface SelectedImage {
  image: File;
  byteArray: ArrayBuffer | string | null;
}

export default function CreateReportModal({
  isOpen,
  onClose,
}: CreatePostModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
  });

  const navigate = useNavigate();

  // const { data: allSDGs } = useGetAllSDGs();
  // const { data: allCategories } = useGetAllCategories();

  // console.log(allSDGs);
  // console.log(allCategories);

  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  console.log(errors);

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

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImages([
          ...selectedImages,
          { image: file, byteArray: reader.result },
        ]);
      };

      reader.readAsDataURL(file);
    }
  };
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

                <div className=" w-full max-w-[350px] flex gap-2">
                  {selectedImages.map((image, i) => (
                    <img
                      key={i}
                      src={image.byteArray as string}
                      className="object-cover rounded-xl w-14 h-15"
                      alt=""
                    />
                  ))}

                  <Button
                    onClick={() => inputRef.current?.click()}
                    className="w-14 "
                    type="button"
                  >
                    <FaPlus />
                  </Button>
                  <input
                    onChange={handleFileSelection}
                    className="hidden"
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                  />
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
                  {/* <FormInput
                    name="location"
                    label="Location"
                    control={control}
                    placeholder="Enter location"
                    type="password"
                    errors={errors}
                  /> */}

                  <SDGMultiSelect
                  // // control={control}
                  // name="location"
                  // placeholder="Select SDGs"
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
