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
import useDisclosure from "@/hooks/useDisclosure";

export default function LandingPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div
      className={`w-full h-screen space-y-40 bg-dark ${
        isOpen ? "overflow-y-hidden" : "overflow-y-auto"
      } `}
    >
      <div className="relative ">
        <img
          className="absolute top-0 w-full"
          src="/images/landing/gradient1.svg"
          alt=""
        />
        <div className="relative z-10">
          <NavBar onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
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
