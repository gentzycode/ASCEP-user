import {
  AboutUsSection,
  BannerSection,
  CallToAction,
  Faq,
  NavBar,
  ServicesSection,
} from "@/components/Landing";
import Testimonials from "@/components/Landing/Testimonials";

export default function LandingPage() {
  return (
    <div className="relative w-full h-screen space-y-40 overflow-y-auto bg-dark ">
      <div className="relative z-10 ">
        <img
          className="absolute top-0 w-full"
          src="/images/landing/gradient1.svg"
          alt=""
        />
        <NavBar />
        <BannerSection />
      </div>
      <AboutUsSection />
      <ServicesSection />
      <CallToAction />
      <Faq />
      <Testimonials />
    </div>
  );
}
