import { UserProfile } from ".";
import { useSettingsContext } from "@/providers/SettingsProvider";
import ChangePassword from "./ChangePassword";

export default function ActiveSettingsOption() {
  const { activeOption } = useSettingsContext();

  return (
    <div className="col-span-7 bg-white p-6 rounded-[40px]">
      <p className="pb-4 border-b border-[#F0F0F0] text-[24px] font-bold text-dark mb-4">
        {activeOption}
      </p>
      {activeOption === "User Profile" && <UserProfile />}
      {activeOption === "Change Password" && <ChangePassword />}
    </div>
  );
}
