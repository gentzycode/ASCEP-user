import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function CallToAction() {
  return (
    <div className="px-[100px] pb-10">
      <div className="bg-[rgba(120,120,120,0.1)] rounded-[40px]  grid grid-cols-2 ">
        <div className="px-[70px] space-y-10 flex flex-col justify-center">
          <h3 className="text-[40px] text-white font-medium ">
            Engage with the ASCEP platform today
          </h3>

          <div className="flex gap-8">
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
            className="mt-[70px] rounded-br-[40px]"
            src="/images/landing/response-screenshot-2.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
