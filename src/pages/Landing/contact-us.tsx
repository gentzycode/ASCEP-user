import {
  ContactFormSection,
  ContactHeading,
  ContactInfo,
  Footer,
  NavBar,
} from "@/components/Landing";
import useDisclosure from "@/hooks/useDisclosure";
import { useRef, useState } from "react";

export default function ContactUs() {
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
      ref={parentRef}
      onScroll={handleScroll}
      className={`w-full h-screen  bg-dark ${
        isOpen ? "overflow-y-hidden" : "overflow-y-auto"
      } `}
    >
      {/* <div className="absolute w-full">
        <NavBar />
      </div> */}
      <NavBar
        scrollPosition={scrollPosition}
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
      />

      <div className="relative z-10 space-y-20 md:space-y-40">
        <ContactHeading />
        <ContactInfo />
        <ContactFormSection />
        <Footer />
      </div>
    </div>
  );
}
