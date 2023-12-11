import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { IconWrapper } from "../custom";
import { RiTwitterXFill } from "react-icons/ri";

export default function Footer() {
  return (
    <div className="px-40 footer-pattern bg-black/30">
      <div className="flex justify-between py-24 text-white border-b border-white/10">
        <h3 className="text-3xl">ASCEP</h3>

        <div className="flex gap-28">
          <p>About us</p>
          <p>Services</p>
          <p>F.A.Q</p>
        </div>

        <div className="flex gap-3">
          <IconWrapper className="w-12 h-12 text-xl text-white rounded-full bg-dark">
            <FaFacebookF />
          </IconWrapper>
          <IconWrapper className="w-12 h-12 text-xl text-white rounded-full bg-dark">
            <RiTwitterXFill />
          </IconWrapper>
          <IconWrapper className="w-12 h-12 text-xl text-white rounded-full bg-dark">
            <FaYoutube />
          </IconWrapper>
          <IconWrapper className="w-12 h-12 text-xl text-white rounded-full bg-dark">
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
