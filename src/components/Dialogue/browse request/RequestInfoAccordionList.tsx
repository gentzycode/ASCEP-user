import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { AccordionHeader } from "@radix-ui/react-accordion";
import { More } from "iconsax-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";

const Requests = [
  {
    id: "1",
    author: "J Roberts",
    date: "30 December 2023.",
    request:
      "Dear Norfolk Constabulary,Request a fleet list of all marked and unmarked vehicles based at Broadland Gate Police Base including information as to their make and model and what departments, units or teams they are assigned to please. Also request information as to whether emergency response teams and neighbourhood policing teams are based at this facility? Yours faithfully, Danny Chatfield",
  },
  {
    id: "2",
    author: "Norfolk Constabulary",
    date: "30 December 2023",
    request:
      "Dear Norfolk Constabulary,Request a fleet list of all marked and unmarked vehicles based at Broadland Gate Police Base including information as to their make and model and what departments, units or teams they are assigned to please. Also request information as to whether emergency response teams and neighbourhood policing teams are based at this facility? Yours faithfully, Danny Chatfield",
  },
  { id: "3", author: "Goodness", date: "30 December 2023.", request: "" },
  { id: "4", author: "Prophet", date: "30 December 2023.", request: "" },
  { id: "5", author: "Success", date: "30 December 2023.", request: "" },
];

interface RequestInfoAccordionListProp {}
const RequestInfoAccordionList: React.FC<RequestInfoAccordionListProp> = () => {
  return (
    <div className="my-10">
      <Accordion
        type="multiple"
        // collapsible
        className="w-full space-y-10 pt-9 "
      >
        {Requests.map((request, i) => {
          return (
            <AccordionItem
              value={request.id}
              key={i}
              className="bg-white rounded-2xl border-t border-l border-r border-b-0 group  even:border-primary odd:border-royal_blue py-4  "
            >
              <AccordionHeader className="flex justify-between items-center px-4">
                <p className="text-text text-base">
                  <span className="group-even:text-primary odd:text-royal_blue">
                    {request.author}
                  </span>{" "}
                  on {request.date}
                </p>
                <div className="flex gap-3 items-center">
                  <AccordionTrigger className=" h-fit p-0" />
                  <ActionOption
                    trigger={
                      <More
                        size="25"
                        className="text-text bg-transparent cursor-pointer"
                      />
                    }
                  ></ActionOption>
                </div>
              </AccordionHeader>
              <AccordionContent className="py-4">
                <Separator className="group-even:bg-primary group-odd:bg-royal_blue" />
                <p className="text-base text-text text-justify p-4">
                  {request.request}
                </p>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default RequestInfoAccordionList;

interface ActionOptionProp {
  trigger: ReactNode;
}

const actions = [
  "Write a reply",
  " Report",
  "Request review",
  "delete request ",
  "Collapse all",
  "copy link ",
];
const ActionOption: React.FC<ActionOptionProp> = ({ trigger }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-max bg-[#FFC334]">
        <ul className="list-none py-2 px-4 space-y-2 text-text ">
          {actions.map((action, i) => (
            <li key={i} className="border-b last:border-none border-text py-2">{action}</li>
          ))}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
