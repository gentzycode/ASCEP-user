import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiFilterAlt } from "react-icons/bi";
import { ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { CloseCircle } from "iconsax-react";

interface GroupedFiltersButtonProps {
  variant?: "primary" | "secondary" | "pill";
  children: ReactNode;
}
export default function GroupedFiltersButton({
  variant,
  children,
}: GroupedFiltersButtonProps) {
  return (
    <>
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={variant || "primary"}
              className="rounded-[10px] h-7 "
            >
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
      </div>

      <div className="block md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant={variant || "primary"}
              className="rounded-[10px] h-7 "
            >
              <span className="sr-only">Open menu</span>
              <BiFilterAlt size={16} />
              <p className="text-xs font-semibold">Filter</p>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="rounded-t-[45px]">
            <div className="w-full max-w-sm mx-auto">
              <DrawerHeader className="flex items-center justify-between">
                <DrawerTitle>Filter</DrawerTitle>

                <DrawerClose asChild>
                  <CloseCircle size="24" className="text-dark" />
                </DrawerClose>
              </DrawerHeader>
              <div className="">{children}</div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
