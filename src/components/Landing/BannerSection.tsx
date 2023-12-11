import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function BannerSection() {
  return (
    <div className="px-[100px] grid grid-cols-2">
      <div className="flex flex-col justify-center space-y-8">
        <h1 className="leading-tight text-white font-medium text-[60px]">
          Empowering Citizens through Digital Engagement
        </h1>

        <p className="text-2xl text-subtitle_text">
          Gift yourself, your family, a friend or a boo a Bion card to manage
          their spendings
        </p>

        <div className="flex gap-8">
          <Link to="/auth/signup">
            <Button className="w-[175px]">Get Started</Button>
          </Link>

          <Button className="w-[175px]" variant="outline-primary">
            Learn more
          </Button>
        </div>
      </div>

      <div className="flex justify-end">
        <img src="/images/landing/landing-banner.svg" alt="" />
      </div>
    </div>
  );
}
