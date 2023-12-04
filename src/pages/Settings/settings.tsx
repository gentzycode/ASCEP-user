import {
  ActiveSettingsOption,
  ProfileHeader,
  SettingsOptions,
} from "@/components/Settings";
import SettingsProvider from "@/providers/SettingsProvider";

export default function SettingsPage() {
  return (
    <SettingsProvider>
      <div className="w-full px-8 py-8 space-y-5  bg-[#F9F6FB] overflow-x-hidden h-screen overflow-y-auto">
        <ProfileHeader />

        <div className="relative grid grid-cols-12 gap-6 pt-28 ">
          <SettingsOptions />
          <ActiveSettingsOption />
        </div>
      </div>
    </SettingsProvider>
  );
}
