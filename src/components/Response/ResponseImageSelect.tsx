import { useState } from "react";

interface ResponseImageSelectProps {
  images: ReportImage[];
}

export default function ResponseImageSelect({
  images,
}: ResponseImageSelectProps) {
  const [selectedImg, setSelectedImg] = useState(images[0].image_url);
  return (
    <div className="grid grid-cols-11 h-[300px]  gap-4 ">
      <div className=" col-span-6  h-[300px]">
        <img
          src={selectedImg}
          className="object-cover w-full h-full rounded-[40px] "
          alt=""
        />
      </div>
      <div className="relative grid h-full grid-cols-2 col-span-5 grid-rows-2 gap-4 overflow-y-auto ">
        {images.map((img) => (
          <img
            onClick={() => setSelectedImg(img.image_url)}
            src={img.image_url}
            alt="image"
            key={img.image_url}
            className={`border-2 cursor-pointer border-primary rounded-xl h-full w-full object-cover object-center ${
              selectedImg === img.image_url ? "border-2 border-primary " : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// const imgs = [
//   {
//     id: 1,
//     img: "/images/response-img.png",
//   },
//   {
//     id: 2,
//     img: "/images/response-img.png",
//   },
//   {
//     id: 3,
//     img: "/images/response-img.png",
//   },
//   {
//     id: 4,
//     img: "/images/response-img.png",
//   },
//   {
//     id: 5,
//     img: "/images/response-img.png",
//   },
//   {
//     id: 6,
//     img: "/images/response-img.png",
//   },
//   {
//     id: 8,
//     img: "/images/response-img.png",
//   },
//   {
//     id: 9,
//     img: "/images/response-img.png",
//   },
// ];
