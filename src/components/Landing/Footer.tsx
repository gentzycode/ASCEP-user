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
    <div className="px-40 footer-pattern bg-black/30">
      <div className="flex justify-between py-24 text-white border-b border-white/10">
        <h3 className="text-3xl">ASCEP</h3>

        <div className="flex gap-24">
          {navLinks.map((link) => (
            <p
              className="font-normal text-white cursor-pointer"
              onClick={() => scrollToSection(link.link)}
            >
              {link.name}
            </p>
          ))}
        </div>

        <div className="flex gap-3">
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

      <div className="flex py-10 text-lg font-light text-white justify-evenly">
        <p>@ 2023 ASCEP. All rights reserved.</p>

        <div className="flex gap-4 ">
          <p className="underline cursor-pointer">Privacy Policy</p>
          <p className="underline cursor-pointer">Terms of Service </p>
          <p className="underline cursor-pointer">Cookies Settings</p>
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
