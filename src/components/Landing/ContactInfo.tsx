import { GrLocation } from "react-icons/gr";

export default function ContactInfo() {
  return (
    <div className="relative ">
      <div className="bg-[#7878781A] px-[120px] pt-[96px] pb-[317px] grid grid-cols-2 gap-[96px] text-[#F9F6FB]">
        <div>
          <p>Title Text</p>
          <p className="text-[36px]">Lorem Ipsum is simply.</p>
          <p className="mt-5 text-xl">
            You can drop by our any of our office locations
          </p>
        </div>

        <div className="space-y-12">
          <div className="flex items-start gap-4">
            <GrLocation className="text-xl " />
            <div>
              <p className="text-xl leading-none">West Africa</p>
              <p>27, Alara Street, Off Commercial Avenue, Sabo-Yaba, Lagos.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <GrLocation className="text-xl " />
            <div>
              <p className="text-xl leading-none">East Africa</p>
              <p>27, Alara Street, Off Commercial Avenue, Sabo-Yaba, Lagos.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[100px]  h-[492px] -mt-[253px]  ">
        <img
          className="object-cover w-full h-full"
          src="/images/landing/contact-info-banner.png"
          alt=""
        />
      </div>
    </div>
  );
}
