import { IconWrapper } from "@/components/custom";
import { Separator } from "@/components/ui/separator";
import { FooterLinks, SocialLinks } from "@/utils/NavigationData";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-dark p-8">
      <div className=" lg:flex items-center justify-between">
        <h1 className="text-white text-2xl my-5">ASCEP</h1>

        <div className="flex gap-8 flex-wrap">
          <div className="flex flex-col gap-4 md:flex-row md:items-center ">
            {FooterLinks.map((link) => (
              <Link to={link.path} key={link.title} className="text-white">
                {link.title}
              </Link>
            ))}
          </div>
          <div className="flex gap-2 items-center justify-center h-fit flex-wrap">
            {SocialLinks.map((link, i) => (
              <Link to={link.path} key={i} className="text-white">
                <IconWrapper>{link.Icon}</IconWrapper>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Separator orientation="horizontal" className="my-10" />
        <div className="flex justify-center flex-col-reverse lg:flex-row items-center gap-16">
          <h5 className="text-[#fff] text-base">
            &copy; 2023 ASCEP. All rights reserved.
          </h5>
          <div className="flex justify-center gap-2 flex-wrap items-center">
            <Link to="#">
              <p className="text-[#fff] text-sm lg:text-base">Privacy Policy</p>
            </Link>
            <Link to="#">
              <p className="text-[#fff] text-sm lg:text-base">
                Terms of Service
              </p>
            </Link>
            <Link to="#">
              <p className="text-[#fff] text-sm lg:text-base">
                Cookies Settings
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
