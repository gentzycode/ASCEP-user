import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function CallToAction() {
  return (
    <div className="section-padding  min-h-[377px]">
      <div className="bg-[rgba(120,120,120,0.1)] rounded-3xl sm:rounded-[40px]  sm:px-0  pt-10 sm:pt-20 lg:pt-10 flex flex-col gap-4 lg:grid grid-cols-2 ">
        <div className="px-6 sm:px-10 xl:px-[70px] space-y-10 flex flex-col justify-center lg:pb-10">
          <h3 className="text-2xl sm:text-[40px] text-white font-medium  leading-tight text-center lg:text-start ">
            Engage with the ASCEP platform today
          </h3>

          <div className="flex flex-col justify-center gap-4 mx-auto sm:flex-row xl:gap-8 lg:justify-start">
            <Link to="/home/contact-us">
              <Button variant="outline-primary" className="w-[175px]">
                Contact Us
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button className="w-[175px]">Get Started</Button>
            </Link>
          </div>
        </div>

        <div>
          <img
            className=" mt-[70px] md:rounded-br-[40px] rounded-br-[16px] rounded-tl-[16px]"
            src="/images/landing/response-screenshot-2.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
