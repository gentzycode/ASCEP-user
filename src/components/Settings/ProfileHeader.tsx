import { useSettingsContext } from "@/providers/SettingsProvider";
import { Button } from "../ui/button";
import useScreenWidth from "@/hooks/useScreenWidth";
import { useAppContext } from "@/contexts/AppContext";

export default function ProfileHeader() {
  const { setActiveOption } = useSettingsContext();
  const { user: data } = useAppContext();
  const { screenWidth } = useScreenWidth();

  return (
    <div
      className="relative h-[141px] w-full flex justify-end items-center p-5 "
      style={{
        backgroundImage: `url("/images/cover-photo.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Button
        size={screenWidth > 758 ? "default" : "sm"}
        onClick={() => setActiveOption("Edit Profile")}
        className="px-12"
      >
        Edit Profile
      </Button>

      {data && (
        <div className="absolute top-[50px] sm:-bottom-[120px] left-0  sm:left-16 flex flex-col sm:flex-row gap-2 sm:gap-5 sm:items-end">
          <div className="rounded-full border-[#F9F6FB] border-[6px] sm:border-[10px] w-[120px] sm:w-[200px] h-[120px] sm:h-[200px] ">
            {data?.profile_picture ? (
              <img
                src={data.profile_picture}
                className="object-cover w-full h-full rounded-full"
                alt="profile-photo"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full rounded-full bg-primary ">
                {/* <p className="h3">
                  {data?.firstname[0]} {data?.lastname[0]}
                </p> */}
              </div>
            )}
          </div>

          <div className="pb-12">
            <p className="text-3xl font-bold text-text">
              {data?.firstname} {data?.lastname}
            </p>
            <p className="text-sm text-subtle_text">{data?.email}</p>
          </div>
        </div>
      )}
    </div>
  );
}
