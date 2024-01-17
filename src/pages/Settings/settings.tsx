import { useGetUserProfile } from "@/api/auth";
import {
  ActiveSettingsOption,
  ProfileHeader,
  SettingsOptions,
} from "@/components/Settings";
import { PageFetchError, PageLoader } from "@/components/custom";
import { useAuthContext } from "@/providers/AuthProvider";
import SettingsProvider from "@/providers/SettingsProvider";

export default function SettingsPage() {
  const { data, isLoading, isError } = useGetUserProfile();
  const { isLoggedIn } = useAuthContext();

  console.log(isLoggedIn);

  if (!isLoggedIn)
    return (
      <div className="items-center justify-center h-screen">
        <h1>Login to access settings</h1>
      </div>
    );

  return (
    <SettingsProvider>
      {isLoading ? (
        <PageLoader />
      ) : data !== null ? (
        <div className="w-full px-4 md:px-8 py-8 space-y-5  bg-[#F9F6FB] overflow-x-hidden  overflow-y-auto">
          <ProfileHeader />

          <div className="relative grid grid-cols-12 gap-6 pt-28 ">
            <SettingsOptions />
            <ActiveSettingsOption />
          </div>
        </div>
      ) : (
        isError && <PageFetchError />
      )}
    </SettingsProvider>
  );
}
