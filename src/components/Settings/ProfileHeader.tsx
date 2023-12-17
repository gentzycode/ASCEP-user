import { useSettingsContext } from "@/providers/SettingsProvider";
import { Button } from "../ui/button";
import { useGetUserProfile } from "@/api/auth";

export default function ProfileHeader() {
  const { setActiveOption } = useSettingsContext();
  const { data } = useGetUserProfile();

  return (
    <div
      className="relative h-[141px] w-full flex justify-end items-center p-5 "
      style={{
        backgroundImage: `url("/images/cover-photo.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Button onClick={() => setActiveOption("Edit Profile")} className="px-12">
        Edit Profile
      </Button>

      <div className="absolute -bottom-[120px] left-16 flex gap-5 items-end">
        <div className="rounded-full border-[#F9F6FB] border-[10px] w-[200px] h-[200px] ">
          {data?.profile_picture ? (
            <img
              src={data.profile_picture}
              className="object-cover w-full h-full rounded-full"
              alt="profile-photo"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full rounded-full bg-primary ">
              <p className="h3">
                {data?.firstname[0]} {data?.lastname[0]}
              </p>
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
    </div>
  );
}
