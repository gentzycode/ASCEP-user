import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqItem({ title }: { title: string }) {
  return (
    <AccordionItem
      value={title}
      className="border-none bg-[#7878781A] rounded-[30px]  px-6 py-4"
    >
      <AccordionTrigger className="text-2xl text-white hover:no-underline">
        {title}
      </AccordionTrigger>
      <AccordionContent className="text-[#EDEDED]/40 text-lg ">
        Our citizen engagement platform allows users to report incidents,
        request and receive information and participate in civic
        decision-making. It provides a seamlesss and user-friendly experience to
        empower citizens and enhance government transparency.{" "}
      </AccordionContent>
    </AccordionItem>
  );
}
