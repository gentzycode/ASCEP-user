import { Button } from "../ui/button";

export default function ServicesSection() {
  return (
    <div id="services" className="grid grid-cols-10 px-[100px] gap-14">
      <div className="col-span-4 text-center space-y-[30px] flex-col flex justify-center">
        <div className="mb-2 text-lg text-center text-primary">
          OUR SERVICES
        </div>

        <Button className="w-full h-[60px] text-3xl">ASEP Response</Button>

        <p className="text-subtitle_text">
          Empowering Citizens to Report Incidents, Share Valuable Info, and
          Participate in Surveys
        </p>

        <p className="text-white text-[29px]">ASCEP Dialogue</p>
        <p className="text-white text-[29px]">ASCEP Democracy</p>
      </div>

      <div className="bg-[#7878781A] rounded-[40px] p-12 flex flex-col col-span-6 justify-center items-center">
        <img
          src="images/landing/response-screenshot.png"
          className="h-[290px]  mb-8 "
          alt=""
        />

        <p className="text-center text-primary mb-9">
          ASCEP Response is a powerful crowdsourcing and incident reporting
          platform that allows citizens to report incidents and contribute to
          public safety. With its user-fiendly interfance and seamless
          integration, citizens can easily submit incident reports and provide
          valuable information to authorities.
        </p>
        <Button className="w-[175px] ">Get Started</Button>
      </div>
    </div>
  );
}
