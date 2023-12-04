import { useAuthContext } from "@/providers/AuthProvider";
import { useSettingsContext } from "@/providers/SettingsProvider";
import { ArrowRight2 } from "iconsax-react";

export default function SettingsOptions() {
  const { activeOption, setActiveOption } = useSettingsContext();
  const { logout } = useAuthContext();

  return (
    <div className="col-span-5 bg-white p-6 rounded-[40px] h-fit">
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
