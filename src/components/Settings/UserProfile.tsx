import { useGetUserProfile } from "@/api/auth";

export default function UserProfile() {
  const { data } = useGetUserProfile();
  return (
    <div className="space-y-6">
      <ProfileRow
        title="Full name"
        value={`${data?.firstname} ${data?.lastname}`}
      />
      <ProfileRow title="Email" value={data?.email || ""} />
      <ProfileRow title="Phone number" value={data?.mobile || ""} />
      <ProfileRow title="Username" value={data?.username || ""} />
      <ProfileRow title="Role" value={data?.roleDetail.name || ""} />
      <ProfileRow
        title="Date Joined"
        value={
          data?.date_joined ? new Date(data!.date_joined)?.toDateString() : ""
        }
      />
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
