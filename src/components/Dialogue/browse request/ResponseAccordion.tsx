import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDisclosure from "@/hooks/useDisclosure";
import { AccordionHeader } from "@radix-ui/react-accordion";
import { ReactNode } from "react";
import { ReplyModal } from "..";
import { Separator } from "@/components/ui/separator";
import { More } from "iconsax-react";
import { format } from "date-fns";
import { useAuthContext } from "@/providers/AuthProvider";
import { useAppContext } from "@/contexts/AppContext";

interface ResponseAccordionProp {
  response: RequestResponseType;
}

const ResponseAccordion: React.FC<ResponseAccordionProp> = ({ response }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { authority, createdAt, response_text, id, user } = response;
  return (
    <div>
      <Accordion type="multiple" className="w-full space-y-10 pt-9 ">
        <AccordionItem
          value={id}
          className="bg-white rounded-2xl border-t border-l border-r border-b-0 group  even:border-primary odd:border-royal_blue py-4  "
        >
          <AccordionHeader className="flex justify-between items-center px-4">
            <p className="text-text text-base">
              <span className="group-even:text-primary odd:text-royal_blue">
                {user.username}
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
              {response_text}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ReplyModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default ResponseAccordion;

export const actions = [
  "Write a reply",
  " Report",
  "Request review",
  //   "delete request ",
  //   "Collapse all",
  //   "copy link ",
];
interface ActionOptionProp {
  trigger: ReactNode;
  openModal: () => void;
}
export const ActionOption: React.FC<ActionOptionProp> = ({
  trigger,
  openModal,
}) => {
  const { isLoggedIn } = useAuthContext();
  const { handleOpenModal } = useAppContext();

  const handleModalOpen = () => {
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
              onClick={action === "Write a reply" ? handleModalOpen : () => {}}
            >
              {action}
            </li>
          ))}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
