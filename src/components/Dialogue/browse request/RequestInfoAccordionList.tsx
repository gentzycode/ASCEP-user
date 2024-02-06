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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";
import useDisclosure from "@/hooks/useDisclosure";
import { format } from "date-fns";
import { ReplyModal } from "..";
import { useAuthContext } from "@/providers/AuthProvider";
import { useAppContext } from "@/contexts/AppContext";

interface RequestInfoAccordionListProp {
  request: RequestType;
}
const RequestInfoAccordionList: React.FC<RequestInfoAccordionListProp> = ({
  request,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { author, createdAt, description, id } = request;
  return (
    <div className="mt-10">
      <Accordion type="multiple" className="w-full space-y-10 pt-9 ">
        <AccordionItem
          value={id}
          className="bg-white rounded-2xl border-t border-l border-r border-b-0 group  even:border-primary odd:border-royal_blue py-4  "
        >
          <AccordionHeader className="flex justify-between items-center px-4">
            <p className="text-text text-base">
              <span className="group-even:text-primary odd:text-royal_blue">
                {author.username}
              </span>{" "}
              on {format(new Date(createdAt), "do  MMMM yyyy")}
            </p>
            <div className="flex gap-3 items-center">
              <AccordionTrigger className=" h-fit p-0" />
              <ActionOption
                openModal={onOpen}
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
              {description}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ReplyModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default RequestInfoAccordionList;

interface ActionOptionProp {
  trigger: ReactNode;
  openModal: () => void;
}

export const actions = [
  "Write a reply",
  " Report",
  "Request review",
  // "delete request ",
  // "Collapse all",
  // "copy link ",
];
export const ActionOption: React.FC<ActionOptionProp> = ({
  trigger,
  openModal,
}) => {
  const { isLoggedIn } = useAuthContext();
  const { handleOpenModal } = useAppContext();

  const ModalOpen = () => {
    if (!isLoggedIn) {
      handleOpenModal();
    } else {
      openModal();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-max bg-[#FFC334]">
        <ul className="list-none py-2 px-4 space-y-2 text-text ">
          {actions.map((action, i) => (
            <li
              key={i}
              className="border-b last:border-none border-text py-2 cursor-pointer"
              onClick={action === "Write a reply" ? ModalOpen : () => {}}
            >
              {action}
            </li>
          ))}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
