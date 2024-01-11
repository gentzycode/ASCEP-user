import { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function ServicesSection() {
  const [selected, setSelected] = useState<Service>(services[0]);
  return (
    <div
      id="services"
      className="flex flex-col items-center w-full grid-cols-10 lg:grid section-padding gap-14"
    >
      <div className="col-span-4 max-w-[500px] xl:max-w-max text-center space-y-[30px] flex-col w-full flex justify-center">
        <div className="mb-2 text-lg text-center text-primary">
          OUR SERVICES
        </div>
        {services.map((service) => (
          <div key={service.title}>
            {service.title === selected.title ? (
              <div className="  space-y-[30px] ">
                <Button className="w-full h-[60px] text-3xl">
                  {service.title}
                </Button>

                <p className="text-subtitle_text">{service.subtitle}</p>
              </div>
            ) : (
              <p
                className="text-white text-[29px] cursor-pointer "
                onClick={() => setSelected(service)}
              >
                {service.title}
              </p>
            )}
          </div>
        ))}

        {/* <p className="text-white text-[29px]">ASCEP Dialogue</p>
        <p className="text-white text-[29px]">ASCEP Democracy</p> */}
      </div>

      <div className="bg-[#7878781A] rounded-3xl  lg:rounded-[40px] p-4  sm:p-12 flex flex-col col-span-6 justify-center items-center">
        <img src={selected.image} className="h-[290px]  mb-8 " alt="" />

        <p className="text-center text-primary mb-9">{selected.text}</p>
        <Link to={selected.link}>
          <Button className="w-[175px]">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}

interface Service {
  title: string;
  subtitle: string;
  text: string;
  image: string;
  link: string;
}

const services = [
  {
    title: "ASEP Response",
    subtitle:
      "Empowering Citizens to Report Incidents, Share Valuable Info, and Participate in Surveys",
    text: "ASCEP Response is a powerful crowdsourcing and incident reporting platform that allows citizens to report incidents and contribute to public safety. With its user-fiendly interfance and seamless integration, citizens can easily submit incident reports and provide valuable information to authorities.",
    image: "images/landing/ascep-response.png",
    link: "/response",
  },
  {
    title: "ASEP Dialogue",
    subtitle:
      "Empowering Citizens to Report Incidents, Share Valuable Info, and Participate in Surveys",
    text: "ASCEP Response is a powerful crowdsourcing and incident reporting platform that allows citizens to report incidents and contribute to public safety. With its user-fiendly interfance and seamless integration, citizens can easily submit incident reports and provide valuable information to authorities.",
    image: "images/landing/ascep-dialogue.png",
    link: "/dialogue",
  },
  {
    title: "ASEP Democracy",
    subtitle:
      "Empowering Citizens to Report Incidents, Share Valuable Info, and Participate in Surveys",
    text: "ASCEP Response is a powerful crowdsourcing and incident reporting platform that allows citizens to report incidents and contribute to public safety. With its user-fiendly interfance and seamless integration, citizens can easily submit incident reports and provide valuable information to authorities.",
    image: "images/landing/ascep-democracy.png",
    link: "/democracy",
  },
];
