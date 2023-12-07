/* eslint-disable @typescript-eslint/no-explicit-any */
type SettingsOption =
  | "User Profile"
  | "Change Password"
  | "Enable 2FA"
  | "Verify 2FA OTP"
  | "Activities"
  | "Edit Profile";

interface SettingsContextType {
  activeOption: SettingsOption;
  setActiveOption: (arg: SettingsOption) => void;
  setTwoFactorAuth: (arg: boolean) => void;
  twoFactorAuth: boolean;
}

interface SettingsOptionObj {
  title: SettingsOption;
  subtitle: string;
}

interface UserData {
  id: number;
  email: string;
  username: string;
  bio: any;
  role: number;
  dob: any;
  last_login: string;
  date_joined: string;
  profile_picture: any;
  analytic: any;
  twoFA: any;
  roleDetail: RoleDetail;
}

interface RoleDetail {
  id: number;
  name: string;
  rolePermission: any[];
}
