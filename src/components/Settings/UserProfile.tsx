export default function UserProfile() {
  return (
    <div className="col-span-7 bg-white p-6 rounded-[40px]">
      <p className="pb-4 border-b border-[#F0F0F0] text-2xl font-bold text-dark mb-4">
        User Profile
      </p>

      <div className="space-y-6">
        <ProfileRow title="Full name" value="Dexter Olaniyi" />
        <ProfileRow title="Email" value="dexterolaniyi@demo.com" />
        <ProfileRow title="Phone number" value="07086245441" />
        <ProfileRow title="Username" value="DexOla" />
        <ProfileRow title="Role" value="User" />
        <ProfileRow title="Date Joined" value="Aug 21st, 2023 | 12:55 AM" />
      </div>
    </div>
  );
}

function ProfileRow({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex items-center justify-between font-medium">
      <p className="text-subtle_text ">{title}</p>
      <p className="text-dark">{value}</p>
    </div>
  );
}
