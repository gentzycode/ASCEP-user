import { useAuthContext } from "@/providers/AuthProvider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  ArrowDown2,
  ArrowRight2,
  Notification,
  SearchNormal1,
} from "iconsax-react";
import { IconWrapper } from "../custom";
import { useAppContext } from "@/contexts/AppContext";

export default function UserDropdown() {
  const { logout } = useAuthContext();
  const { user } = useAppContext();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-6">
          <IconWrapper className="rounded-full cursor-pointer">
            <SearchNormal1 size="20" color="black" />
          </IconWrapper>
          <IconWrapper className="rounded-full cursor-pointer">
            <Notification size="20" color="black" />
          </IconWrapper>

          {user && (
            <div className="flex items-center gap-3 cursor-pointer">
              <img src="/images/profile-pic.png" className="w-10 h-10" alt="" />
              <div>
                <p className="text-sm font-bold">
                  {user?.firstname
                    ? `${user.firstname} ${user.lastname}`
                    : user?.username}
                </p>
                <p className="text-sm text-subtle_text">{user.email}</p>
              </div>
              <ArrowDown2 size="20" color="black" />
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex flex-col gap-4 px-6 bg-white w-80 rounded-xl"
      >
        <div
          onClick={logout}
          className="flex items-center justify-between py-4"
        >
          <div className="cursor-pointer spacey-y-8">
            <p className="text-sm font-bold text-[#E43F40]">Sign out</p>
            <p className="text-[10px] text-[#E43F40]/50">
              Logout of User’s Account
            </p>
          </div>
          <ArrowRight2 size={16} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
