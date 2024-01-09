import { VscQuote } from "react-icons/vsc";

export default function TestimonialQuote({ active }: { active: boolean }) {
  return (
    <div
      className={`p-5 md:p-8 rounded-[50px] text-start  ${
        active
          ? "xl:bg-primary testimonial-gradient"
          : "bg-primary xl:testimonial-gradient"
      }  `}
      style={{
        direction: "ltr",
      }}
    >
      <VscQuote className="text-5xl sm:text-[70px] md:text-[120px] mb-4 md:mb-7 text-dark  " />

      <div className="mb-10 text-base lg:text-xl text-[#4F4F4F]  ">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p>
          {" "}
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </div>

      <div className="flex items-center w-full gap-3">
        <div className="w-16 h-16">
          <img src="/images/profile-pic.png" alt="user-pic" />
        </div>

        <div>
          <p className="m-0 text-lg font-bold leading-none lg:text-2xl">
            Dexter Olaniyi
          </p>
          <p className="text-xs ">Medical Doctor</p>
        </div>
      </div>
    </div>
  );
}
