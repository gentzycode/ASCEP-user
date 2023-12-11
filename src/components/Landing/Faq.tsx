import { Accordion } from "@radix-ui/react-accordion";
import FaqItem from "./FaqItem";

export default function Faq() {
  return (
    <div id="faq" className="px-[100px] ">
      <div className="flex justify-center text-center mb-[60px]">
        <div className="w-full max-w-[735px] ">
          <p className="text-lg text-primary">FAQs</p>
          <p className="text-2xl text-subtle_text">
            Find answers to common questions about our citizen engagement
            platform and its features.
          </p>
        </div>
      </div>

      <Accordion type="single" className="space-y-6">
        <FaqItem title="How does it work?" />
        <FaqItem title="Is it free?" />
        <FaqItem title="How can I join?" />
        <FaqItem title="Can I report anonymously?" />
        <FaqItem title="How is my data used?" />
        <FaqItem title="Is there a mobile application?" />
      </Accordion>
    </div>
  );
}
