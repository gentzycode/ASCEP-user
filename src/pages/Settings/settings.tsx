import {
  ProfileHeader,
  SettingsHeader,
  SettingsOptions,
  UserProfile,
} from "@/components/Settings";

export default function SettingsPage() {
  return (
    <div className="w-full px-8 pt-8 space-y-5  bg-[#F9F6FB] overflow-x-hidden h-screen overflow-y-auto">
      {/* <SettingsHeader /> */}

      <ProfileHeader />

      <div className="relative grid grid-cols-12 gap-6 pt-28 ">
        <SettingsOptions />
        <UserProfile />
      </div>
    </div>
  );
}
