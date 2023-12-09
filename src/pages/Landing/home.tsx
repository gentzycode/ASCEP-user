import { BannerSection, NavBar } from "@/components/Landing";

export default function LandingPage() {
  return (
    <div className="relative w-full h-screen bg-secondary ">
      <img
        className="absolute w-full"
        src="/public/images/landing/gradient1.svg"
        alt=""
      />

      <div className="relative z-10 h-full overflow-y-auto">
        <NavBar />
        <BannerSection />
      </div>
    </div>
  );
}
