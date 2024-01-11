export default function UserProfile() {
  return (
    <div className="space-y-6">
      <ProfileRow title="Full name" value="Dexter Olaniyi" />
      <ProfileRow title="Email" value="dexterolaniyi@demo.com" />
      <ProfileRow title="Phone number" value="07086245441" />
      <ProfileRow title="Username" value="DexOla" />
      <ProfileRow title="Role" value="User" />
      <ProfileRow title="Date Joined" value="Aug 21st, 2023 | 12:55 AM" />
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
