import { Button } from "../ui/button";

export default function ProfileHeader() {
  return (
    <div
      className="relative h-[141px] w-full flex justify-end items-center p-5 "
      style={{
        backgroundImage: `url("/images/cover-photo.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Button className="px-12"> Edit Profile</Button>

      <div className="absolute -bottom-[120px] left-16 flex gap-5 items-end">
        <div className="rounded-full border-[#F9F6FB] border-[10px] w-[200px] h-[200px] ">
          <img src="/images/profile-large.png" alt="profile-photo" />
        </div>

        <div className="pb-12">
          <p className="text-3xl font-bold text-text">Dexter Olaniyi</p>
          <p className="text-sm text-subtle_text">dexterolaniyi@demo.com</p>
        </div>
      </div>
    </div>
  );
}
