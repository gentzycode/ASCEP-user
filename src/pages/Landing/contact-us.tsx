import {
  ContactFormSection,
  ContactHeading,
  ContactInfo,
  Footer,
  NavBar,
} from "@/components/Landing";

export default function ContactUs() {
  return (
    <div className="relative w-full h-screen space-y-40 overflow-y-auto bg-dark">
      <div className="absolute w-full">
        <NavBar />
      </div>

      {/* <div className="space-y-40"> */}
      <ContactHeading />
      <ContactInfo />
      <ContactFormSection />
      <Footer />
      {/* </div> */}
    </div>
  );
}
