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
import { useRef, useState } from "react";

export default function LandingPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const parentRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const parentElement = parentRef.current;
    if (parentElement) {
      const scrollPosition = parentElement.scrollTop;
      setScrollPosition(scrollPosition);
    }
  };

  return (
    <div
      className={`w-full h-screen  bg-dark ${
        isOpen ? "overflow-y-hidden" : "overflow-y-auto"
      } `}
      ref={parentRef}
      onScroll={handleScroll}
    >
      {/* <div className="relative "> */}
      <img
        className="absolute top-0 w-full overflow-scroll"
        src="/images/landing/gradient1.svg"
        alt=""
      />
      {/* <div className="relative z-10"> */}
      <NavBar
        scrollPosition={scrollPosition}
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
      />

      {/* </div> */}
      {/* </div> */}
      <div className="relative z-10 space-y-40">
        <BannerSection />
        <AboutUsSection />
        <ServicesSection />
        <CallToAction />
        <Faq />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}
