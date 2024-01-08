import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiFilterAlt } from "react-icons/bi";
import { ReactNode } from "react";

interface GroupedFiltersButtonProps {
  variant?: "primary" | "secondary" | "pill";
  children: ReactNode;
}
export default function GroupedFiltersButton({
  variant,
  children,
}: GroupedFiltersButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant || "primary"} className="rounded-[10px] h-7 ">
          <span className="sr-only">Open menu</span>
          <BiFilterAlt size={16} />
          <p className="text-xs font-semibold">Filter</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="px-2 font-normal text-subtle_text rounded-[26px] "
        align="end"
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
