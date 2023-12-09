import { useGetUserProfile } from "@/api/auth";
import {
  ActiveSettingsOption,
  ProfileHeader,
  SettingsOptions,
} from "@/components/Settings";
import { PageFetchError, PageLoader } from "@/components/custom";
import SettingsProvider from "@/providers/SettingsProvider";

export default function SettingsPage() {
  const { data, isLoading } = useGetUserProfile();

  return (
    <SettingsProvider>
      {isLoading ? (
        <PageLoader />
      ) : data !== null ? (
        <div className="w-full px-8 py-8 space-y-5  bg-[#F9F6FB] overflow-x-hidden  overflow-y-auto">
          <ProfileHeader />

          <div className="relative grid grid-cols-12 gap-6 pt-28 ">
            <SettingsOptions />
            <ActiveSettingsOption />
          </div>
        </div>
      ) : (
        <PageFetchError />
      )}
    </SettingsProvider>
  );
}
