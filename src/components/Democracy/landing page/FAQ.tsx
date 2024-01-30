import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_DATA } from "@/utils/FAQData";

const FAQ = () => {
  return (
    <div className="my-10 max-w-[900px]">
      <h1 className="text-center text-text text-xl md:text-3xl py-4">FAQs</h1>
      <p className="text-center text-text text-base md:text-lg">
        Find answers to common questions about our citizen engagement platform
        and its features.
      </p>

      <Accordion
        type="single"
        collapsible
        className="w-full gap-4 flex flex-col pt-9 "
      >
        {FAQ_DATA.map((faq, i) => {
          return (
            <AccordionItem
              value={faq.heading}
              key={i}
              className="bg-white rounded-2xl"
            >
              <AccordionTrigger className="text-text text-base p-4 hover:no-underline text-left">
                {faq.heading}
              </AccordionTrigger>
              <AccordionContent className="text-base text-text p-4 text-justify">
                {faq.content}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default FAQ;
