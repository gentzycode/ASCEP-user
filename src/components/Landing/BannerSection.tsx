import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function BannerSection() {
  return (
    <div className="grid gap-10 py-10 section-padding md:gap-0 lg:grid-cols-2">
      <div className="flex flex-col justify-center space-y-8">
        <h1 className="leading-tight text-white font-medium sm:text-[52px] text-[40px] xl:text-[60px]">
          Empowering Citizens through Digital Engagement
        </h1>

        <p className="text-2xl text-subtitle_text">
          Connect, voice opinions, and influence policy decisions in a unified,
          accessible digital democracy platform.
        </p>

        <div className="flex justify-center gap-6 sm:justify-start md:gap-8">
          <Link to="/auth/signup">
            <Button className="w-[175px]">Get Started</Button>
          </Link>
          {/* 
          <Button className="w-[175px]" variant="outline-primary">
            Learn more
          </Button> */}
        </div>
      </div>

      <div className="flex justify-center lg:justify-end">
        <img src="/images/landing/landing-banner.svg" alt="" />
      </div>
    </div>
  );
}
