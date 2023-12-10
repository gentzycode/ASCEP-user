import {
  AboutUsSection,
  BannerSection,
  CallToAction,
  NavBar,
  ServicesSection,
} from "@/components/Landing";

export default function LandingPage() {
  return (
    <div className="relative w-full h-screen space-y-40 overflow-y-auto bg-dark ">
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
      <ServicesSection />
      <CallToAction />
    </div>
  );
}
