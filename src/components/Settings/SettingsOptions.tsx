import { useAuthContext } from "@/providers/AuthProvider";
import { useSettingsContext } from "@/providers/SettingsProvider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ArrowRight2 } from "iconsax-react";
import { UserProfile } from ".";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import TwoFactorAuth from "./TwoFactorAuth";
import TwoFactorAuthOTP from "./TwoFactorAuthOTP";
import Activities from "./Activities";
import { useAppContext } from "@/contexts/AppContext";

export default function SettingsOptions() {
  const { activeOption, setActiveOption } = useSettingsContext();
  const { logout } = useAuthContext();
  const { user } = useAppContext();

  return (
    <>
      <div className="col-span-12 md:col-span-5 bg-white p-4 md:p-6 rounded-[24px] md:rounded-[40px] h-fit ">
        <div className="hidden w-full md:inline-block">
          {options?.map((option) => (
            <div
              key={option.title}
              className={`flex cursor-pointer items-center justify-between py-4 border-b border-[#F0F0F0] ${
                activeOption === option.title ? "opacity-100" : "opacity-30"
              } `}
              onClick={() => setActiveOption(option.title)}
            >
              <div className=" spacey-y-8">
                <p className="text-sm font-bold text-dark">{option.title}</p>
                <p className="text-[12px] text-dark/40">{option.subtitle}</p>
              </div>
              {activeOption === option.title && <ArrowRight2 size={16} />}
            </div>
          ))}

          <div
            onClick={logout}
            className="flex items-center justify-between py-4 border-b border-[#F0F0F0]"
          >
            <div className="cursor-pointer spacey-y-8">
              <p className="text-sm font-bold text-[#E43F40]">Sign out</p>
              <p className="text-[10px] text-[#E43F40]/50">
                Logout of User’s Account
              </p>
            </div>
            <ArrowRight2 size={16} />
          </div>
        </div>
        <Accordion
          type="single"
          collapsible
          className="inline-block w-full space-y-2 md:hidden"
        >
          {options.map((option) => (
            <AccordionItem
              value={option.title}
              key={option.title}
              className="py-2 border-b border-[#F0F0F0]"
            >
              <AccordionTrigger
                onClick={() => setActiveOption(option.title)}
                className="flex items-center w-full border-b-0"
              >
                <div className="w-full spacey-y-8 text-start">
                  <p className="text-sm font-bold text-dark">{option.title}</p>
                  <p className="text-[12px] text-dark/40">{option.subtitle}</p>
                </div>
                <ArrowRight2 size={16} />
              </AccordionTrigger>
              <AccordionContent className="py-5 border-t-0">
                {activeOption === "User Profile" && <UserProfile />}
                {activeOption === "Change Password" && <ChangePassword />}
                {activeOption === "Edit Profile" && user && (
                  <EditProfile defaultValues={user} />
                )}
                {activeOption === "Enable 2FA" && <TwoFactorAuth />}
                {activeOption === "Verify 2FA OTP" && <TwoFactorAuthOTP />}
                {activeOption === "Activities" && <Activities />}
              </AccordionContent>
            </AccordionItem>
          ))}

          <div
            onClick={logout}
            className="flex items-center justify-between py-4 border-b border-[#F0F0F0]"
          >
            <div className="cursor-pointer spacey-y-8">
              <p className="text-sm font-bold text-[#E43F40]">Sign out</p>
              <p className="text-[10px] text-[#E43F40]/50">
                Logout of User’s Account
              </p>
            </div>
            <ArrowRight2 size={16} />
          </div>
        </Accordion>
      </div>
    </>
  );
}

const options: SettingsOptionObj[] = [
  {
    title: "User Profile",
    subtitle: "View Profile",
  },
  {
    title: "Change Password",
    subtitle: "Change account password",
  },
  {
    title: "Enable 2FA",
    subtitle: "Secure Account with Two-Factor Authentication",
  },
  {
    title: "Activities",
    subtitle: "Monitor activities along medules",
  },
];
