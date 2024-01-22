interface PartialUser extends Partial<UserData> {
  profile_picture: string;
  firstname: string;
  lastname: string;
  username?: string;
}

interface UserAvatarProps {
  size: number;
  user: PartialUser;
}

export default function UserAvatar({ size, user }: UserAvatarProps) {
  return (
    <div
      style={{
        height: size,
        width: size,
      }}
    >
      {user?.profile_picture ? (
        <img
          style={{
            height: size,
            width: size,
          }}
          src={user.profile_picture}
          className="object-cover w-full h-full rounded-full"
          alt="profile-photo"
        />
      ) : (
        <div
          style={{
            height: size,
            width: size,
            fontSize: size / 2.5,
          }}
          className="flex items-center justify-center w-full h-full font-semibold rounded-full bg-primary "
        >
          {user?.firstname && user?.lastname ? (
            <p>
              {user?.firstname[0]}
              {user?.lastname[0]}
            </p>
          ) : (
            <p>{user?.username && user?.username[0]}</p>
          )}
        </div>
      )}
    </div>
  );
}
