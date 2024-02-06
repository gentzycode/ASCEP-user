import { useState } from "react";

interface ResponseImageSelectProps {
  images: ReportImage[];
}

export default function ResponseImageSelect({
  images,
}: ResponseImageSelectProps) {
  const [selectedImg, setSelectedImg] = useState(images[0].image_url);
  return (
    <div className="md:grid grid-cols-11 md:h-[300px] space-y-3 gap-4 ">
      <div className=" col-span-6 h-[300px]">
        <img
          src={selectedImg}
          className="object-cover w-full h-full rounded-[40px] "
          alt=""
        />
      </div>

      <div className="grid grid-cols-2 col-span-5 gap-2 md:gap-4 md:h-auto max-h-[250px] md:max-h-[300px] overflow-y-auto">
        {images.map((img) => (
          <img
            onClick={() => setSelectedImg(img.image_url)}
            src={img.image_url}
            alt="image"
            key={img.image_url}
            className={`border-2 cursor-pointer  rounded-xl w-full object-cover object-center h-[135px] md:h-[150px]  ${
              selectedImg === img.image_url
                ? "border-[3px] border-primary "
                : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
