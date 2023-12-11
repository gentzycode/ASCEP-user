import {
  AboutUsSection,
  BannerSection,
  CallToAction,
  Faq,
  Footer,
  NavBar,
  ServicesSection,
  Testimonials,
} from "@/components/Landing";

export default function LandingPage() {
  return (
    <div className="w-full h-screen space-y-40 overflow-y-auto bg-dark">
      <div className="relative ">
        <img
          className="absolute top-0 w-full"
          src="/images/landing/gradient1.svg"
          alt=""
        />
        <div className="relative z-10">
          <NavBar />
          <BannerSection />
        </div>
      </div>
      <AboutUsSection />
      <ServicesSection />
      <CallToAction />
      <Faq />
      <Testimonials />
      <Footer />
    </div>
  );
}
