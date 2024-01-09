import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { IconWrapper } from "../custom";
import { RiTwitterXFill } from "react-icons/ri";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="px-10 lg:px-40 footer-pattern bg-black/30">
      <div className="justify-between space-y-6 text-white border-b py-14 lg:py-24 lg:flex border-white/10">
        <h3 className="text-3xl text-center lg:text-start">ASCEP</h3>

        <div className="flex justify-between max-w-[500px] mx-auto lg:justify-end lg:gap-24">
          {navLinks.map((link) => (
            <p
              className="font-normal text-white cursor-pointer"
              onClick={() => scrollToSection(link.link)}
            >
              {link.name}
            </p>
          ))}
        </div>

        <div className="flex justify-center gap-3">
          <IconWrapper className="w-10 h-10 text-lg text-white rounded-full bg-dark">
            <FaFacebookF />
          </IconWrapper>
          <IconWrapper className="w-10 h-10 text-lg text-white rounded-full bg-dark">
            <RiTwitterXFill />
          </IconWrapper>
          <IconWrapper className="w-10 h-10 text-lg text-white rounded-full bg-dark">
            <FaYoutube />
          </IconWrapper>
          <IconWrapper className="w-10 h-10 text-lg text-white rounded-full bg-dark">
            <FaLinkedinIn />
          </IconWrapper>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 py-10 text-base font-light text-white md:text-lg lg:flex-row justify-evenly">
        <p className="font-light">@ 2023 ASCEP. All rights reserved.</p>

        <div className="flex flex-col items-center gap-4 sm:flex-row ">
          <p className="font-light underline cursor-pointer">Privacy Policy</p>
          <p className="font-light underline cursor-pointer">
            Terms of Service{" "}
          </p>
          <p className="font-light underline cursor-pointer">
            Cookies Settings
          </p>
        </div>
      </div>
    </div>
  );
}

const navLinks = [
  {
    name: "About us",
    link: "about-us",
  },
  {
    name: "Services",
    link: "services",
  },
  {
    name: "F.A.Q",
    link: "faq",
  },
];
