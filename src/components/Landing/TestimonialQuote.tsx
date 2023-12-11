import { VscQuote } from "react-icons/vsc";

export default function TestimonialQuote({ active }: { active: boolean }) {
  return (
    <div
      className={`p-8 rounded-[50px] text-start  ${
        active ? "bg-primary" : "testimonial-gradient"
      }  `}
      style={{
        direction: "ltr",
      }}
    >
      <VscQuote className="text-[120px] mb-7 text-dark  " />

      <div className="mb-10 text-xl text-[#4F4F4F]  ">
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
          <p className="m-0 text-2xl font-bold leading-none">Dexter Olaniyi</p>
          <p className="text--[10px] ">Medical Doctor</p>
        </div>
      </div>
    </div>
  );
}
