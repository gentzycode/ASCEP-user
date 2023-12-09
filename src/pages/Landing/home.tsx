import { AboutUsSection, BannerSection, NavBar } from "@/components/Landing";

export default function LandingPage() {
  return (
    <div className="relative w-full h-screen overflow-y-auto bg-secondary ">
      <div className="relative z-10 ">
        <img
          className="absolute top-0 w-full"
          src="/public/images/landing/gradient1.svg"
          alt=""
        />
        <NavBar />
        <BannerSection />
      </div>
      <AboutUsSection />
    </div>
  );
}
