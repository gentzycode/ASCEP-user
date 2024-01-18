import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { CategoriesMultiSelect, FormInput, SDGMultiSelect } from "../custom";
import { FaPlus } from "react-icons/fa";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import FormTextArea from "../custom/FormTextArea";
import { createPostSchema } from "@/schemas/ResponseSchema";
import { appendObjectToFormData } from "@/utils/helper";
import { useCreateReport } from "@/api/response";
import SelectLocation from "./SelectLocation";
import { useToast } from "../ui/use-toast";

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
  const [selectedCategories, setSelectedCategories] = useState<
    CollectionData[]
  >([]);
  const [selectedSDGs, setSelectedSDGs] = useState<SDGData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<WardsType | null>(
    null
  );
  const [locationError, setLocationError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isLoading, isSuccess } = useCreateReport();

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  function onSubmit(values: z.infer<typeof createPostSchema>) {
    if (!selectedLocation) {
      setLocationError("Select a location to continue");
      return;
    }
    const payload = {
      ...values,
      location: {
        latitude: selectedLocation?.latitude,
        longitude: selectedLocation?.longitude,
      },
      images: selectedImages.map((image) => image.image),
      categories: selectedCategories.map((category) => category.id),
      sdgs: selectedSDGs.map((sdg) => sdg.id),
      location_meta: `${selectedLocation?.lga}, ${selectedLocation.state}`,
    };
    const formData = new FormData();

    appendObjectToFormData(formData, payload);
    mutate(formData);
  }

  const { toast } = useToast();

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];

    if (file.size > 1024 * 1024) {
      toast({
        title: "Error",
        description: "File to large",
        variant: "error",
      });

      return;
    }

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
        className="w-[90%]  max-h-[700px] overflow-y-auto  lg:min-w-[700px]"
        style={{ borderRadius: 40, padding: 32 }}
      >
        <h4 className="pb-3 border-b border-dark/10 ">Create a report</h4>

        <div className="pt-8 space-y-8">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="items-center justify-between space-y-2 md:flex ">
                <p className="text-subtle_text">Image</p>

                <div className=" w-full max-w-[350px] flex gap-2">
                  {selectedImages.map((image, i) => (
                    <img
                      key={i}
                      src={image.byteArray as string}
                      className="object-cover rounded-xl w-14 h-14"
                      alt=""
                    />
                  ))}

                  <Button
                    onClick={() => inputRef.current?.click()}
                    className="w-14 "
                    type="button"
                    disabled={selectedImages.length > 4}
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
              <div className="items-center justify-between space-y-2 md:flex ">
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
              <div className="items-center justify-between space-y-2 md:flex ">
                <p className="text-subtle_text">Category</p>
                <div className=" w-full max-w-[350px]">
                  <CategoriesMultiSelect
                    selected={selectedCategories}
                    setSelected={setSelectedCategories}
                  />
                </div>
              </div>
              <div className="items-center justify-between space-y-2 md:flex ">
                <p className="text-subtle_text">Link to SDG (Optional)</p>
                <div className=" w-full max-w-[350px]">
                  <SDGMultiSelect
                    selected={selectedSDGs}
                    setSelected={setSelectedSDGs}
                  />
                </div>
              </div>

              <div className="items-center justify-between space-y-2 md:flex ">
                <p className="text-subtle_text">Location</p>

                <div className=" w-full max-w-[350px]">
                  <SelectLocation onSelect={setSelectedLocation} />
                  <p className="px-4 text-[11px] font-normal text-red-500">
                    {locationError}
                  </p>
                </div>
              </div>
              <div className="items-center justify-between space-y-2 md:flex ">
                <p className="text-subtle_text">More details</p>
                <div className=" w-full max-w-[350px]">
                  <FormTextArea
                    name="description"
                    label="More details"
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Button isLoading={isLoading} className="w-[180px]">
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
